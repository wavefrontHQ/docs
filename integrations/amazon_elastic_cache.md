---
title: Amazon ElasticCache Integration
tags: [integrations list]
permalink: amazon_elastic_cache.html
summary: Learn about the Wavefront Amazon ElasticCache Integration.
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



### Add an Amazon Cloud Integration

Setting up an Amazon cloud integration requires establishing a trust relationship between Amazon and Wavefront.

You start by granting Wavefront read-only access to your Amazon account or by giving Wavefront limited access.

* [Giving Wavefront Global Read-Only Access](https://docs.wavefront.com/integrations_aws_overview.html#give-wavefront-read-only-access-to-your-amazon-account-and-get-the-role-arn)
* [Giving Wavefront Limited Access](https://docs.wavefront.com/integrations_aws_overview.html#giving-wavefront-limited-access)












## Metrics

See [AWS documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) for Metrics descriptions.  

|Metric Name|Description|
| :--- | :--- |
|aws.elasticache.bytesusedforcache.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.cachehits.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.cachemisses.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.cpuutilization.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.currconnections.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.curritems.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.enginecpuutilization.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.evictions.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.freeablememory.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.gettypecmds.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.hashbasedcmds.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.ismaster.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.keybasedcmds.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.masterlinkhealthstatus.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.networkbytesin.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.networkbytesout.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.networkpacketsin.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.networkpacketsout.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.newconnections.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.reclaimed.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.replicationbytes.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.replicationlag.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.saveinprogress.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.setbasedcmds.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.settypecmds.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.sortedsetbasedcmds.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.stringbasedcmds.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.elasticache.swapusage.*|Statistics: average, maximum, minimum, samplecount, sum|

