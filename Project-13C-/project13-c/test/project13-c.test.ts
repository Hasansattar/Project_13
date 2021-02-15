import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Project13C from '../lib/project13-c-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Project13C.Project13CStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
