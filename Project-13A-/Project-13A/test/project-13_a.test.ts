import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Project13A from '../lib/project-13_a-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Project13A.Project13AStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
