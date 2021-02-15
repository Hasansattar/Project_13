import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

export class Project13CStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-lolly-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
           
        },
      },
      xrayEnabled: true,
    });
    
    const lollyLambda = new lambda.Function(this, 'AppSyncNotesHandlerlolly', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset('lambda'),
      memorySize: 1024
    });
    const lambdaDs = api.addLambdaDataSource('lambdaDatasourcelolly',  lollyLambda);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getLolly"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addLolly"
    });

     
     
    const lollyTable = new ddb.Table(this, 'CDKLollyTable', {
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });
    lollyTable.grantFullAccess(lollyLambda)
    lollyLambda.addEnvironment('VIRTUAL_LOLLY_TABLE', lollyTable.tableName);

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || ''
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region
    });
  
  
  }
}
