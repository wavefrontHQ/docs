---
title: AWS Lambda Functions Integration
tags: [integrations list]
permalink: aws-lambda-functions.html
summary: Learn about the AWS Lambda Functions Integration.
---
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

## AWS Lambda Functions Setup

Operations for Applications provides Lambda function wrappers, which allow you to send custom metrics from your Lambda functions and collect standard Lambda metrics for Python, Go and Node.js.

### Configure Wavefront Lambda Wrapper
The Wavefront AWS Lambda function wrappers use the following environment variables:

- **WAVEFRONT_URL**: `https://YOUR_CLUSTER.wavefront.com`
- **WAVEFRONT_API_TOKEN**: `YOUR_API_TOKEN API token with Direct Data Ingestion permission).
- **REPORT_STANDARD_METRICS**: Optional. Set to False to omit reporting standard Lambda metrics.

### Python Lambda Wrapper
To report metrics from your Python Lambda functions, use the [Wavefront Python Lambda Wrapper](https://github.com/wavefrontHQ/wavefront-lambda-python).

#### Install wavefront_lambda{% raw %}
```
pip install wavefront_lambda
```
{% endraw %}

#### Usage
Decorate your Python AWS Lambda function handler with `@wavefront_lambda.wrapper`:{% raw %}
```
import wavefront_lambda

@wavefront_lambda.wrapper
def handler(event, context):
    # your code
```
{% endraw %}

### Go Lambda Wrapper
To report metrics from your Go Lambda functions, use the [Wavefront Go Lambda Wrapper](https://github.com/wavefrontHQ/wavefront-lambda-go).

#### Install wavefront-lambda{% raw %}
```
go get github.com/wavefronthq/wavefront-lambda-go
```
{% endraw %}

#### Usage
Wrap your Go AWS Lambda function handler with `wflambda.Wrapper`:{% raw %}
```
package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/rcrowley/go-metrics"
	"github.com/wavefronthq/go-metrics-wavefront"
	"github.com/wavefronthq/wavefront-lambda-go"
)

func HandleLambdaRequest() {
	// your code
}

func main() {
	// Wrap your Lambda function handler with wflambda.Wrapper
	lambda.Start(wflambda.Wrapper(HandleLambdaRequest))
}
```
{% endraw %}

### Node.js Lambda Wrapper
To report metrics from your Node.js Lambda functions, use the [Wavefront Node.js Lambda Wrapper](https://github.com/wavefrontHQ/wavefront-lambda-nodejs).

#### Install wavefront-lambda{% raw %}
```
npm install wavefront-lambda
```
{% endraw %}

#### Usage
Wrap your Node.js AWS Lambda function handler with `wavefrontLambda.wrapper`:
{% raw %}
```
const wavefrontLambda = require('wavefront-lambda')
const metrics = require('wavefrontmetrics');

exports.myHandler = wavefrontLambda.wrapper( function(event, context, callback) {
                //your code
});
```
{% endraw %}



