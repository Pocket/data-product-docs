import * as cdk from '@aws-cdk/core';
import {CfnOutput} from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3'
import * as s3Deployment from '@aws-cdk/aws-s3-deployment'
import * as cloudfront from '@aws-cdk/aws-cloudfront'
import {OriginProtocolPolicy} from '@aws-cdk/aws-cloudfront'
import {CacheControl} from "@aws-cdk/aws-s3-deployment/lib/bucket-deployment";
import {IBucket} from "@aws-cdk/aws-s3";

export class DocsStack extends cdk.Stack {
  public readonly bucket: IBucket;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, "bucket", {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
    });

    const distribution = new cloudfront.CloudFrontWebDistribution(this, "distribution", {
      originConfigs: [
        {
          customOriginSource: {
            domainName: this.bucket.bucketWebsiteDomainName,
            originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
          },
          behaviors : [ {
            isDefaultBehavior: true,
          }]
        }
      ]
    });

    new CfnOutput(this, 's3Url', {
      value: this.bucket.bucketWebsiteDomainName
    });

    new CfnOutput(this, 'cdnUrl', {
      value: distribution.distributionDomainName
    });
  }
}
