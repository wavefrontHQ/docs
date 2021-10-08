---
title: Amazon DMS Integration
tags: [integrations list]
permalink: amazon_dms.html
summary: Learn about the Wavefront Amazon DMS Integration.
---
## Amazon Web Services Integration

The Amazon Web Services integration is full-featured implementation offering pre-defined dashboards and alert conditions and is fully configurable.

### Dashboards

Wavefront provides Amazon Web Services overview dashboards **Summary**, **Pricing**, and **Billing** and the service-specific dashboards for the following products:

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

Wavefront ingests Amazon Web Services metrics using the CloudWatch, CloudTrail, and AWS service APIs. For details on the metrics and how to configure ingestion, see [AWS Metrics Integration](https://docs.wavefront.com/integrations_aws_metrics.html).

## Amazon Web Services Integrations



### Adding an Amazon Cloud Integration

Setting up an Amazon cloud integration requires establishing a trust relationship between Amazon and Wavefront.

You start by granting Wavefront read-only access to your Amazon account or by giving Wavefront the permissions listed in [Giving Wavefront Limited Access](https://docs.wavefront.com/integrations_aws_overview.html#giving-wavefront-limited-access).





undefined






## Metrics

See [AWS documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) for Metrics descriptions.   

|Metric Name|Description|
| :--- | :--- |
|aws.dms.cpuallocated| Amount of CPU assigned.|
|aws.dms.cpuutilization| Amount of CPU used.|
|aws.dms.diskqueuedepth| Number of outstanding IOs (read/write requests) waiting to access the disk.|
|aws.dms.freeablememory| Amount of available random access memory.|
|aws.dms.freestoragespace| Amount of available storage space.|
|aws.dms.memoryallocated| Amount of random access memory that is assigned.|
|aws.dms.memoryusage| Amount of random access memory that is used.|
|aws.dms.networkreceivethroughput| Incoming (Receive) network traffic on the replication instance, including both customer database traffic and AWS DMS traffic used for monitoring and replication.|
|aws.dms.networktransmitthroughput| Outgoing (Transmit) network traffic on the replication instance, including both customer database traffic and AWS DMS traffic used for monitoring and replication.|
|aws.dms.readiops| Average number of disk read I/O operations per second.|
|aws.dms.readlatency| Average amount of time taken per disk I/O (input) operation.|
|aws.dms.readthroughput| Average number of bytes read from disk per second.|
|aws.dms.swapusage| Amount of swap space used on the replication instance.|
|aws.dms.writeiops| Average number of disk write I/O operations per second.|
|aws.dms.writelatency| Average amount of time taken per disk I/O (output) operation.|
|aws.dms.writethroughput| Average number of bytes written to disk per second.|

