#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import * as dotenv from "dotenv";
import { CdkPipelinesDemoPipeline } from "../lib/cdkpipelines-demo-pipeline";

dotenv.config();

const app = new cdk.App();

new CdkPipelinesDemoPipeline(app, "CdkpipelinesDemoPipeline", {
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_ACCOUNT,
  },
  github: {
    tokenSecret: "github/oauth-token",
    repo: "cdkpipelines-demo",
    owner: "joerx",
  },
});
