#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Project13BStack } from '../lib/project-13_b-stack';

const app = new cdk.App();
new Project13BStack(app, 'Project13BStack');
