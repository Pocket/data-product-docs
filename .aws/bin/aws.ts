#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DocsStack } from '../lib/docs-stack';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();
const props = {
  env: {
    region: 'us-east-1'
  },
  tags: {
    service: 'DataProductDocs'
  }
}

const docStack = new DocsStack(app, 'DataProductDocs', props);
const pipelineStack = new PipelineStack(app, 'DataProductDocsPipelineStack', {...props, bucket: docStack.bucket});
