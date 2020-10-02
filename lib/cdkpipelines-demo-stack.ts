import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as path from "path";
import { CfnOutput } from "@aws-cdk/core";

/**
 * This stack contains the actual application - a simple lambda function and REST Api 
 * in this example.
 */
export class CdkpipelinesDemoStack extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "Lambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "handler.handler",
      code: lambda.Code.fromAsset(path.resolve(__dirname, "lambda")),
    });

    const gw = new apigw.LambdaRestApi(this, "Gateway", {
      description: "Example API",
      handler,
    });

    this.urlOutput = new CfnOutput(this, "url", {
      value: gw.url,
    });
  }
}
