#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DocsStack } from '../lib/docs-stack';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();
new DocsStack(app, 'DataProductsDocumentation', {
  env: {
    region: 'us-east-1'
  }
});

new PipelineStack(app, 'PipelineStack', {
  env: {
    region: 'us-east-1'
  }
});
