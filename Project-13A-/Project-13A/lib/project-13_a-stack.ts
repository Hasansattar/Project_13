import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

export class Project13AStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here


    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-todos-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
           
        },
      },
      xrayEnabled: true,
    });
    
    const todosLambda = new lambda.Function(this, 'AppSyncNotesHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset('lambda'),
      memorySize: 1024
    });
    const lambdaDs = api.addLambdaDataSource('lambdaDatasource', todosLambda);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getTodos"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo"
    });
    const todosTable = new ddb.Table(this, 'CDKTodosTable', {
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });
    todosTable.grantFullAccess(todosLambda)
    todosLambda.addEnvironment('TODOS_TABLE', todosTable.tableName);

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
