#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Project13AStack } from '../lib/project-13_a-stack';

const app = new cdk.App();
new Project13AStack(app, 'Project13AStack');
