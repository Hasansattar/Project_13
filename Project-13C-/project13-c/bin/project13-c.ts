#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Project13CStack } from '../lib/project13-c-stack';

const app = new cdk.App();
new Project13CStack(app, 'Project13CStack');
