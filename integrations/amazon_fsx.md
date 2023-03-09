---
title: Amazon FSx Integration
tags: [integrations list]
permalink: amazon_fsx.html
summary: Learn about the Wavefront Amazon FSx Integration.
---
## Amazon Web Services Integration

The Amazon Web Services integration is full-featured implementation offering pre-defined dashboards and alert conditions and is fully configurable.

### Dashboards

[[applicationName]] provides Amazon Web Services overview dashboards **Summary**, **Pricing**, and **Billing** and the service-specific dashboards for the following products:

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

[[applicationName]] ingests Amazon Web Services metrics using the CloudWatch, CloudTrail, and AWS service APIs. For details on the metrics and how to configure ingestion, see [AWS Metrics Integration](https://docs.wavefront.com/integrations_aws_metrics.html).

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



## Amazon Web Services Integrations



### Add an Amazon Cloud Integration

Setting up an Amazon cloud integration requires establishing a trust relationship between Amazon and Tanzu Observability by Wavefront. 

You start by granting Wavefront [read-only access to your Amazon account](https://docs.wavefront.com/integrations_aws_overview.html#give-read-only-access-to-your-amazon-account-and-get-the-role-arn) or by giving [limited access](https://docs.wavefront.com/integrations_aws_overview.html#giving-limited-access).

Then, you register the integration by providing the necessary information. See [AWS Integration Overview](https://docs.wavefront.com/integrations_aws_overview.html) for information about setting up and managing the AWS Cloud integration.





<h2>Alerts</h2>  <ul><li markdown="span"><b>EC2 Instance CPU Usage Too High</b>:Alert reports when the EC2 instance CPU utilization constantly exceeds the defined limit.</li><li markdown="span"><b>EC2 Instance Status Check Failed</b>:Alert reports when the EC2 status check constantly fails.</li></ul>


|Metric Name|Description|
| :--- | :--- |
|aws.fsx.compressionratio.*| The ratio of compressed storage usage to uncompressed storage usage on the OpenZFS file system.<br>Statistics: average, maximum, minimum, samplecount, sum|
|aws.fsx.datareadbytes.*| The number of bytes for read operations on the FSx file system.<br>Statistics: average, maximum, minimum, samplecount, sum|
|aws.fsx.datareadoperations.*| The number of read operations on the FSx file system.<br>Statistics: average, maximum, minimum, samplecount, sum|
|aws.fsx.datawritebytes.*| The number of bytes for write operations on the FSx file system.<br>Statistics: average, maximum, minimum, samplecount, sum|
|aws.fsx.datawriteoperations.*| The number of write operations on the FSx file system.<br>Statistics: average, maximum, minimum, samplecount, sum|
|aws.fsx.freedatastoragecapacity.*| The amount of available storage capacity on Lustre file system.<br>Statistics: average, maximum, minimum, samplecount, sum|
|aws.fsx.freestoragecapacity.*| The number of bytes of storage capacity on Windows File Server file system.<br>Statistics: average, minimum|
|aws.fsx.logicaldatastored.*| The total number of bytes of logical data stored on the NetApp ONTAP file system, on both the primary (SSD) tier and the capacity pool tier.<br>Statistics: average, maximum, minimum|
|aws.fsx.metadataoperations.*| The number of metadata operations on the Lustre, Windows File Server, and NetApp ONTAP file systems.<br>Statistics: average, maximum, minimum, samplecount, sum|
|aws.fsx.nfsbadcalls.*| The number of calls rejected by NFS server Remote Procedure Call (RPC) mechanism on the OpenZFS file system.<br>Statistics: average, maximum, minimum, samplecount, sum|
|aws.fsx.storagecapacity.*| The total storage capacity on the OpenZFS file system, equal to the sum of used and available storage capacity.<br>Statistics: average, maximum, minimum, samplecount, sum|
|aws.fsx.storageused.*| The total number of bytes of physical data stored on the NetApp ONTAP file system.<br>Statistics: average, maximum, minimum|
|aws.fsx.usedstoragecapacity.*| The amount of storage used on the OpenZFS file system.<br>Statistics: average, maximum, minimum, samplecount, sum|
|aws.fsx.filesused.*| The number of files (or inodes) used on the NetApp ONTAP volume.<br>Statistics: average, maximum, minimum|
|aws.fsx.filescapacity.*| The total number of inodes that can be created on the NetApp ONTAP volume.<br>Statistics: maximum|
|aws.fsx.physicaldiskusage.*| The amount of storage physically occupied by the Lustre file system data (compressed).<br>Statistics: average, maximum, minimum, samplecount, sum|
|aws.fsx.logicaldiskusage.*| The amount of logical data stored (uncompressed) stored on the Lustre file system.<br>Statistics: average, maximum, minimum, samplecount, sum|

