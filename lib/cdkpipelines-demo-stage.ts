import { CfnOutput, Construct, StackProps, Stage, StageProps } from "@aws-cdk/core";
import { CdkPipeline } from "@aws-cdk/pipelines";
import { CdkpipelinesDemoStack } from "./cdkpipelines-demo-stack";

export class CkdPipelinesDemoStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new CdkpipelinesDemoStack(this, "WebService");

    this.urlOutput = service.urlOutput;
  }
}
