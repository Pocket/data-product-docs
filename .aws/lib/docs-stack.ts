import * as cdk from '@aws-cdk/core';
import {CfnOutput} from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3'
import * as s3Deployment from '@aws-cdk/aws-s3-deployment'
import * as cloudfront from '@aws-cdk/aws-cloudfront'
import {OriginProtocolPolicy} from '@aws-cdk/aws-cloudfront'
import {CacheControl} from "@aws-cdk/aws-s3-deployment/lib/bucket-deployment";

export class DocsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "bucket", {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
    });

    const distribution = new cloudfront.CloudFrontWebDistribution(this, "distribution", {
      originConfigs: [
        {
          customOriginSource: {
            domainName: bucket.bucketWebsiteDomainName,
            originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
          },
          behaviors : [ {
            isDefaultBehavior: true,
          }]
        }
      ]
    });

    const deployment = new s3Deployment.BucketDeployment(this, "deployment", {
      sources: [s3Deployment.Source.asset("./site")],
      destinationBucket: bucket,
      distribution: distribution,
      distributionPaths: ['/*'],
      cacheControl: [
        CacheControl.maxAge(cdk.Duration.minutes(10)),
        CacheControl.sMaxAge(cdk.Duration.days(30)),
      ]
    });

    new CfnOutput(this, 's3Url', {
      value: bucket.bucketWebsiteDomainName
    });

    new CfnOutput(this, 'cdnUrl', {
      value: distribution.distributionDomainName
    });
  }
}
