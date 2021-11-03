---
title: Amazon ECS Integration
tags: [integrations list]
permalink: amazon_ecs.html
summary: Learn about the Wavefront Amazon ECS Integration.
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

See [Telegraf documentation](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/ecs/README.md) for Metrics.

|Metric Name|Description|
| :--- | :--- |
|aws.ecs.cpureservation.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.ecs.cpuutilization.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.ecs.memoryreservation.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.ecs.memoryutilization.*|Statistics: average, maximum, minimum, samplecount, sum|
|telegraf.ecs.container.blkio.io.service.bytes.recursive.async||
|telegraf.ecs.container.blkio.io.service.bytes.recursive.read||
|telegraf.ecs.container.blkio.io.service.bytes.recursive.sync||
|telegraf.ecs.container.blkio.io.service.bytes.recursive.total||
|telegraf.ecs.container.blkio.io.service.bytes.recursive.write||
|telegraf.ecs.container.blkio.io.serviced.recursive.async||
|telegraf.ecs.container.blkio.io.serviced.recursive.read||
|telegraf.ecs.container.blkio.io.serviced.recursive.sync||
|telegraf.ecs.container.blkio.io.serviced.recursive.total||
|telegraf.ecs.container.blkio.io.serviced.recursive.write||
|telegraf.ecs.container.cpu.throttling.periods||
|telegraf.ecs.container.cpu.throttling.throttled.periods||
|telegraf.ecs.container.cpu.throttling.throttled.time||
|telegraf.ecs.container.cpu.usage.in.kernelmode||
|telegraf.ecs.container.cpu.usage.in.usermode||
|telegraf.ecs.container.cpu.usage.percent||
|telegraf.ecs.container.cpu.usage.system||
|telegraf.ecs.container.cpu.usage.total||
|telegraf.ecs.container.mem.active.anon||
|telegraf.ecs.container.mem.active.file||
|telegraf.ecs.container.mem.cache||
|telegraf.ecs.container.mem.hierarchical.memory.limit||
|telegraf.ecs.container.mem.inactive.anon||
|telegraf.ecs.container.mem.inactive.file||
|telegraf.ecs.container.mem.limit||
|telegraf.ecs.container.mem.mapped.file||
|telegraf.ecs.container.mem.max.usage||
|telegraf.ecs.container.mem.pgfault||
|telegraf.ecs.container.mem.pgmajfault||
|telegraf.ecs.container.mem.pgpgin||
|telegraf.ecs.container.mem.pgpgout||
|telegraf.ecs.container.mem.rss||
|telegraf.ecs.container.mem.rss.huge||
|telegraf.ecs.container.mem.total.active.anon||
|telegraf.ecs.container.mem.total.active.file||
|telegraf.ecs.container.mem.total.cache||
|telegraf.ecs.container.mem.total.inactive.anon||
|telegraf.ecs.container.mem.total.inactive.file||
|telegraf.ecs.container.mem.total.mapped.file||
|telegraf.ecs.container.mem.total.pgfault||
|telegraf.ecs.container.mem.total.pgmajfault||
|telegraf.ecs.container.mem.total.pgpgin||
|telegraf.ecs.container.mem.total.pgpgout||
|telegraf.ecs.container.mem.total.rss||
|telegraf.ecs.container.mem.total.rss.huge||
|telegraf.ecs.container.mem.total.unevictable||
|telegraf.ecs.container.mem.total.writeback||
|telegraf.ecs.container.mem.unevictable||
|telegraf.ecs.container.mem.usage||
|telegraf.ecs.container.mem.usage.percent||
|telegraf.ecs.container.mem.writeback||
|telegraf.ecs.container.meta.limit.cpu||
|telegraf.ecs.container.meta.limit.mem||
|telegraf.ecs.container.net.rx.bytes||
|telegraf.ecs.container.net.rx.dropped||
|telegraf.ecs.container.net.rx.errors||
|telegraf.ecs.container.net.rx.packets||
|telegraf.ecs.container.net.tx.bytes||
|telegraf.ecs.container.net.tx.dropped||
|telegraf.ecs.container.net.tx.errors||
|telegraf.ecs.container.net.tx.packets||
|telegraf.ecs.task.limit.cpu||
|telegraf.ecs.task.limit.mem||

