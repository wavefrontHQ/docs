---
title: Amazon Elasticsearch Integration
tags: [integrations list]
permalink: amazon_elasticsearch.html
summary: Learn about the Amazon Elasticsearch Integration.
---

This page provides an overview of what you can do with the Amazon Elasticsearch integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Amazon Elasticsearch integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Amazon Elasticsearch** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Amazon Web Services Integration

The Amazon Web Services integration is full-featured implementation offering pre-defined dashboards and alert conditions and is fully configurable.

### Dashboards

Operations for Applications provides Amazon Web Services overview dashboards **Summary**, **Pricing**, and **Billing** and the service-specific dashboards for the following products:

- AWS: ALB
- AWS: API Gateway
- AWS: Auto Scaling
- AWS: CloudFront
- AWS: Cloud Search
- AWS: CloudTrail
- AWS: DMS
- AWS: Direct Connect
- AWS: DynamoDB
- AWS: EBS
- AWS: EC2
- AWS: ECS (cAdvisor)
- AWS: ECS
- AWS: ECS (Fargate)
- AWS: EFS
- AWS: ELB
- AWS: EMR
- AWS: Elastic Beanstalk
- AWS: ElastiCache
- AWS: Elasticsearch
- AWS: Elastic Transcoder
- AWS: FSx
- AWS: IoT Core
- AWS: IAM Access Key Age
- AWS: Kinesis Data Stream
- AWS: Kinesis Firehose
- AWS: KMS
- AWS: Lambda
- AWS: OpsWorks
- AWS: RDS
- AWS: Redshift
- AWS: Route53
- AWS: S3
- AWS: SNS
- AWS: SQS

#### Summary Dashboard

<p>From the Summary dashboard you can easily navigate to all other AWS dashboards.</p>

{% include image.md src="images/db_aws_summary.png" width="80" %}

### Alerts

The Amazon Web Services integration dashboards contains pre-defined alert conditions embedded as queries in charts contained in the dashboards. For example:

{% include image.md src="images/alert_condition.png" width="30" %}

To create the alert, click the **Create Alert** link under the query and configure the [alert properties](https://docs.wavefront.com/alerts_manage.html) (notification targets, condition checking frequency, etc.).

### Metrics Configuration

Operations for Applications ingests Amazon Web Services metrics using the CloudWatch, CloudTrail, and AWS service APIs. For details on the metrics and how to configure ingestion, see [AWS Metrics Integration](https://docs.wavefront.com/integrations_aws_metrics.html).

### Metrics Information

You can see the information about the metrics and dimensions which are published to CloudWatch via different AWS services on the [AWS CloudWatch metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) doc site. Click a link below to see the detailed metrics information per service:

- [AWS EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html)
- [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/metrics-dimensions.html)
- [AWS SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-available-cloudwatch-metrics.html)
- [AWS EBS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using_cloudwatch_ebs.html#ebs-metrics)
- [AWS ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html)  
- [AWS ELB](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-cloudwatch-metrics.html)
- [AWS SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-monitoring-using-cloudwatch.html)
- [AWS DMS](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#CHAP_Monitoring.Metrics)  
- [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics.html#monitoring-metrics-console)
- [AWS Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/metrics-listing.html) 
- [AWS Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html)  
- [AWS API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html) 
- [AWS Kinesis Firehose](https://docs.aws.amazon.com/firehose/latest/dev/monitoring-with-cloudwatch-metrics.html)
- [AWS DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/metrics-dimensions.html)






### Add an Amazon Cloud Integration

Setting up an Amazon cloud integration requires establishing a trust relationship between Amazon and VMware Aria Operations for Applications. 

You start by granting Operations for Applications [read-only access to your Amazon account](https://docs.wavefront.com/integrations_aws_overview.html#give-read-only-access-to-your-amazon-account-and-get-the-role-arn) or by giving [limited access](https://docs.wavefront.com/integrations_aws_overview.html#giving-limited-access).

Then, you register the integration by providing the necessary information. See [AWS Integration Overview](https://docs.wavefront.com/integrations_aws_overview.html) for information about setting up and managing the AWS Cloud integration.

### Set Up AWS CloudWatch Logs

You can use an AWS Lambda function to ingest CloudWatch logs to Operations for Applications. CloudWatch provides data and actionable insights to monitor your applications and respond to system-wide performance changes. It also helps you optimize resource utilization and get a unified view of operational health. CloudWatch collects monitoring and operational data in the form of logs, metrics, and events, providing a unified view of AWS resources, applications, and services that run on AWS and on-premises servers. You can use CloudWatch to detect anomalous behavior in your environments, set alarms, visualize logs and metrics side by side, take automated actions, troubleshoot issues, and discover insights to keep applications running smoothly. To understand more about CloudWatch, see the [Amazon CloudWatch documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html).

#### Install the Wavefront Proxy

The Wavefront proxy is required to send logs from your systems to Operations for Applications. If you have not already done so, install a [Wavefront proxy](https://docs.wavefront.com/proxies_installing.html) in your AWS environment.


#### Create an AWS Lambda Function

1. Log in to the AWS Management Console, search for **Lambda**, and select it.
2. Click **Applications** on the left and click the **Create Application** button.
3. Click the **Serverless application** tab, search for **VMware-Log-Insight-Cloud**, and select it.
4. Scroll down and in the **Application settings** section in the bottom right, provide the Wavefront proxy details.
    * In the **APIToken** text box, enter <code>log-integration-token</code>.
    * In the **APIUrl** text box, enter the Wavefront proxy URL.
    * In the **NameOfFunction** text box, enter a meaningful name for the Lambda function.
5. Click **Deploy**.
6. Add a trigger from the CloudWatch log stream.
    * Navigate to your Lambda function and click it.
    * Click the **Add trigger** button and from the drop-down menu select **CloudWatch Logs**.
    * Select the **CloudWatch Logs** Log group that serves as the event source.
    * Give the filter a meaningful name and click **Add**.
      
      Once you create the trigger, your function starts sending logs from CloudWatch to our service. It takes a few minutes for the CloudWatch logs to show up.

#### View the AWS CloudWatch Logs

View logs in the [**Logs Browser**](https://docs.wavefront.com/logging_log_browser.html). It takes a few minutes for the CloudWatch logs to show up.






<h2>Alerts</h2>  <ul><li markdown="span"><b>EC2 Instance CPU Usage Too High</b>:Alert reports when the EC2 instance CPU utilization constantly exceeds the defined limit.</li><li markdown="span"><b>EC2 Instance Status Check Failed</b>:Alert reports when the EC2 status check constantly fails.</li></ul>


|Metric Name|Description|
| :--- | :--- |
|aws.es.2xx.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.3xx.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.4xx.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.5xx.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.alertingdegraded.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.alertingindexexists.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.alertingindexstatus.green.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.alertingindexstatus.red.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.alertingindexstatus.yellow.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.alertingnodesnotonschedule.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.alertingnodesonschedule.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.alertingscheduledjobenabled.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.automatedsnapshotfailure.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.clusterindexwritesblocked.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.clusterstatus.green.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.clusterstatus.red.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.clusterstatus.yellow.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.clusterusedspace.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.cpuutilization.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.deleteddocuments.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.diskqueuedepth.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.elasticsearchrequests.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.freestoragespace.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.indexinglatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.indexingrate.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.invalidhostheaderrequests.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.jvmgcoldcollectioncount.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.jvmgcoldcollectiontime.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.jvmgcyoungcollectioncount.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.jvmgcyoungcollectiontime.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.jvmmemorypressure.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.kibanahealthynodes.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.mastercpuutilization.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.masterfreestoragespace.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.masterjvmmemorypressure.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.masterreachablefromnode.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.mastersysmemoryutilization.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.nodes.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.readiops.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.readlatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.readthroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.searchabledocuments.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.searchlatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.searchrate.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.sqlfailedrequestcountbycuserr.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.sqlfailedrequestcountbysyserr.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.sqlrequestcount.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.sqlunhealthy.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.sysmemoryutilization.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolforce_mergequeue.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolforce_mergerejected.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolforce_mergethreads.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolindexqueue.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolindexrejected.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolindexthreads.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolopendistro_monitor_runnerqueue.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolopendistro_monitor_runnerrejected.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolopendistro_monitor_runnerthreads.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolsearchqueue.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolsearchrejected.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolsearchthreads.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolsql-workerqueue.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolsql-workerrejected.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolsql-workerthreads.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolwritequeue.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolwriterejected.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.threadpoolwritethreads.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.writeiops.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.writelatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.es.writethroughput.*|Statistics: average, maximum, minimum, samplecount, sum|

