import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as actions from "@aws-cdk/aws-codepipeline-actions";
import { Construct, SecretValue, Stack, StackProps } from "@aws-cdk/core";
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { CkdPipelinesDemoStage } from "./cdkpipelines-demo-stage";

export interface CdkPipelinesDemoPipelineProps extends StackProps {
  github: {
    tokenSecret: string;
    repo: string;
    owner: string;
  };
}

export class CdkPipelinesDemoPipeline extends Stack {
  constructor(scope: Construct, id: string, props: CdkPipelinesDemoPipelineProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const pipeline = new CdkPipeline(this, "Pipeline", {
      pipelineName: "MyDemoPipeline",
      cloudAssemblyArtifact,

      sourceAction: new actions.GitHubSourceAction({
        actionName: "GitHub",
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager(props.github.tokenSecret),
        owner: props.github.owner,
        repo: props.github.repo,
      }),

      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: "npm run build",
      }),
    });

    pipeline.addApplicationStage(
      new CkdPipelinesDemoStage(this, "PreProd", {
        env: {
          account: props.env?.account,
          region: props.env?.region,
        },
      })
    );
  }
}
