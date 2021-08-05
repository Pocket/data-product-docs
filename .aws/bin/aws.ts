#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DocsStack } from '../lib/docs-stack';

const app = new cdk.App();
new DocsStack(app, 'DataProductsDocumentation', {
  env: {
    region: 'us-west-2'
  }
});
