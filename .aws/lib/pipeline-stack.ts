import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { App, Stack } from '@aws-cdk/core';
import * as cdk from "@aws-cdk/core";
import {IBucket} from "@aws-cdk/aws-s3";
import {CacheControl} from "@aws-cdk/aws-s3-deployment/lib/bucket-deployment";

const nodeEnv = 'prod';
const codestarConnectionArn = 'arn:aws:codestar-connections:us-east-1:996905175585:connection/5fa5aa2b-a2d2-43e3-ab5a-72ececfc1870';
const stackName = 'DataProductsDocumentation';
const runtimeVersions = {
  nodejs: 14,
};
const environmentVariables = {
  NODE_ENV: { value: nodeEnv }
};
const buildImage = codebuild.LinuxBuildImage.STANDARD_5_0;

export class PipelineStack extends Stack {
  constructor(app: App, id: string, props: cdk.StackProps & {bucket: IBucket}) {
    super(app, id, props);

    const nextBuild = new codebuild.PipelineProject(
      this,
      `${id}LambdaBuild`,
      {
        buildSpec: codebuild.BuildSpec.fromObject({
          version: '0.2',
          phases: {
            install: {
              runtimeVersions,
              commands: ['npm install --production=false'],
            },
            build: {
              commands: [
                'npm run build',
                'npm run export',
              ],
            },
          },
          artifacts: {
            'base-directory': 'out',
            files: ['**/*'],
          },
        }),
        environment: {
          environmentVariables,
          buildImage,
        },
      }
    );

    const cdkBuild = new codebuild.PipelineProject(this, `${id}CdkBuild`, {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            runtimeVersions,
            commands: [
              'cd .aws',
              'npm install --production=false',
            ],
          },
          build: {
            commands: [
              'npm run build',
              'npm run cdk synth -- -o dist',
            ],
          },
        },
        artifacts: {
          'base-directory': '.aws/dist',
          files: [`${stackName}template.json`],
        },
      }),
      environment: {
        environmentVariables,
        buildImage,
      },
    });

    const sourceOutput = new codepipeline.Artifact();
    const cdkBuildOutput = new codepipeline.Artifact('CdkBuildOutput');
    const nextBuildOutput = new codepipeline.Artifact('NextBuildOutput');

    const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipeline_actions.CodeStarConnectionsSourceAction({
              actionName: 'GithubSource',
              owner: 'Pocket',
              repo: 'data-product-docs',
              branch: 'main',
              output: sourceOutput,
              connectionArn: codestarConnectionArn,
            })
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new codepipeline_actions.CodeBuildAction({
              actionName: 'NextBuild',
              project: nextBuild,
              input: sourceOutput,
              outputs: [nextBuildOutput],
            }),
            new codepipeline_actions.CodeBuildAction({
              actionName: 'CdkBuild',
              project: cdkBuild,
              input: sourceOutput,
              outputs: [cdkBuildOutput],
            }),
          ],
        },
        {
          stageName: 'Deploy',
          actions: [
            new codepipeline_actions.CloudFormationCreateUpdateStackAction({
              actionName: 'CfnDeploy',
              templatePath: cdkBuildOutput.atPath(
                `${stackName}.template.json`
              ),
              stackName: stackName,
              adminPermissions: true,
            }),
            new codepipeline_actions.S3DeployAction({
              actionName: 'S3Deploy',
              input: nextBuildOutput,
              bucket: props.bucket,
              cacheControl: [
                CacheControl.maxAge(cdk.Duration.minutes(1)),
                // CacheControl.sMaxAge(cdk.Duration.minutes(1)),
              ]
            })
          ],
        },
      ],
    });
  }
}
