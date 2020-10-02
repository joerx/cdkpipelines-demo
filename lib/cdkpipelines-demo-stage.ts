import { CfnOutput, Construct, StackProps, Stage, StageProps } from "@aws-cdk/core";
import { CdkpipelinesDemoStack } from "./cdkpipelines-demo-stack";

/**
 * Stage groups related parts of an app together. In this case there's only the 
 * Lambda application, but we could add additional stacks if we wanted (e.g. frontend)
 */
export class CkdPipelinesDemoStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new CdkpipelinesDemoStack(this, "WebService");

    this.urlOutput = service.urlOutput;
  }
}
