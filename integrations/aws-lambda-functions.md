---
title: AWS Lambda Functions Integration
tags: [integrations list]
permalink: aws-lambda-functions.html
summary: Learn about the AWS Lambda Functions Integration.
---

This page provides an overview of what you can do with the AWS Lambda Functions integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the AWS Lambda Functions integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **AWS Lambda Functions** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

# AWS Lambda Functions Integration

In a Function-as-a-Service (FaaS) environment, also called a serverless environment, code runs in response to events. AWS Lambda is one implementation of this paradigm: After you define a Lambda function, the AWS Lambda service will run it in response to events. Because Lambda functions are stateless, AWS Lambda can run as many copies of the function as needed, rapidly scaling up or scaling down in response to incoming events.

This integration allows you to instrument your Lambda function to report custom metrics to Operations for Applications. Additionally, this integration reports the following standard metrics about your Lambda functions:

- **aws.lambda.wf.invocations.count**: Lambda function invocations (Delta Counter)
- **aws.lambda.wf.errors.count**: Lambda function errors (Delta Counter)
- **aws.lambda.wf.coldstarts.count**: Lambda function cold starts (Delta Counter)
- **aws.lambda.wf.duration.value**: Execution time of the Lambda function handler in milliseconds (Gauge)

The Lambda wrapper also adds the following point tags automatically to all metrics sent to Operations for Applications:
- **LambdaArn**: ARN (Amazon Resource Name) of the Lambda function.
- **Region**: AWS Region of the Lambda function.
- **accountId**: AWS Account ID from which the Lambda function was invoked.
- **ExecutedVersion**: Version of the Lambda function.
- **FunctionName**: Name of the Lambda function.
- **Resource**: Name and version/alias of the Lambda function. (Ex: DemoLambdaFunc:aliasProd)
- **EventSourceMappings**: AWS Event source mapping Id. (Set in case of Lambda invocation by AWS poll-based Services)

In addition to setting up the metrics, this integration also installs a dashboard:  
{% include image.md src="images/dashboard_1.png" width="80" %}
{% include image.md src="images/dashboard_2.png" width="80" %}




