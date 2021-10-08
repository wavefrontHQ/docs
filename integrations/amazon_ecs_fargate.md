---
title: Amazon ECS (Fargate) Integration
tags: [integrations list]
permalink: amazon_ecs_fargate.html
summary: Learn about the Wavefront Amazon ECS (Fargate) Integration.
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











## Metrics

See [AWS documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) for Metrics descriptions.  

|Metric Name|Description|
| :--- | :--- |
|aws.fargate.cpu_stats.cpu_usage.total_usage| |
|aws.fargate.cpu_stats.cpu_usage.usage_in_kernelmode| |
|aws.fargate.cpu_stats.cpu_usage.usage_in_usermode| |
|aws.fargate.cpu_stats.online_cpus| |
|aws.fargate.cpu_stats.system_cpu_usage| |
|aws.fargate.cpu_stats.throttling_data.periods| |
|aws.fargate.cpu_stats.throttling_data.throttled_periods| |
|aws.fargate.cpu_stats.throttling_data.throttled_time| |
|aws.fargate.ecs.cpu_stats.cpu_usage.total_usage| |
|aws.fargate.ecs.cpu_stats.cpu_usage.usage_in_kernelmode| |
|aws.fargate.ecs.cpu_stats.cpu_usage.usage_in_usermode| |
|aws.fargate.ecs.cpu_stats.online_cpus| |
|aws.fargate.ecs.cpu_stats.system_cpu_usage| |
|aws.fargate.ecs.cpu_stats.throttling_data.periods| |
|aws.fargate.ecs.cpu_stats.throttling_data.throttled_periods| |
|aws.fargate.ecs.cpu_stats.throttling_data.throttled_time| |
|aws.fargate.ecs.memory_stats.limit| |
|aws.fargate.ecs.memory_stats.stats.active_anon| |
|aws.fargate.ecs.memory_stats.stats.active_file| |
|aws.fargate.ecs.memory_stats.stats.cache| |
|aws.fargate.ecs.memory_stats.stats.dirty| |
|aws.fargate.ecs.memory_stats.stats.hierarchical_memory_limit| |
|aws.fargate.ecs.memory_stats.stats.hierarchical_memsw_limit| |
|aws.fargate.ecs.memory_stats.stats.inactive_anon| |
|aws.fargate.ecs.memory_stats.stats.inactive_file| |
|aws.fargate.ecs.memory_stats.stats.mapped_file| |
|aws.fargate.ecs.memory_stats.stats.pgfault| |
|aws.fargate.ecs.memory_stats.stats.pgmajfault| |
|aws.fargate.ecs.memory_stats.stats.pgpgin| |
|aws.fargate.ecs.memory_stats.stats.pgpgout| |
|aws.fargate.ecs.memory_stats.stats.rss| |
|aws.fargate.ecs.memory_stats.stats.rss_huge| |
|aws.fargate.ecs.memory_stats.stats.total_active_anon| |
|aws.fargate.ecs.memory_stats.stats.total_active_file| |
|aws.fargate.ecs.memory_stats.stats.total_cache| |
|aws.fargate.ecs.memory_stats.stats.total_dirty| |
|aws.fargate.ecs.memory_stats.stats.total_inactive_anon| |
|aws.fargate.ecs.memory_stats.stats.total_inactive_file| |
|aws.fargate.ecs.memory_stats.stats.total_mapped_file| |
|aws.fargate.ecs.memory_stats.stats.total_pgfault| |
|aws.fargate.ecs.memory_stats.stats.total_pgmajfault| |
|aws.fargate.ecs.memory_stats.stats.total_pgpgin| |
|aws.fargate.ecs.memory_stats.stats.total_pgpgout| |
|aws.fargate.ecs.memory_stats.stats.total_rss| |
|aws.fargate.ecs.memory_stats.stats.total_rss_huge| |
|aws.fargate.ecs.memory_stats.stats.total_unevictable| |
|aws.fargate.ecs.memory_stats.stats.total_writeback| |
|aws.fargate.ecs.memory_stats.stats.unevictable| |
|aws.fargate.ecs.memory_stats.stats.writeback| |
|aws.fargate.ecs.memory_stats.usage| |
|aws.fargate.ecs.num_procs| |
|aws.fargate.ecs.pids_stats.current| |
|aws.fargate.ecs.precpu_stats.cpu_usage.total_usage| |
|aws.fargate.ecs.precpu_stats.cpu_usage.usage_in_kernelmode| |
|aws.fargate.ecs.precpu_stats.cpu_usage.usage_in_usermode| |
|aws.fargate.ecs.precpu_stats.online_cpus| |
|aws.fargate.ecs.precpu_stats.system_cpu_usage| |
|aws.fargate.ecs.precpu_stats.throttling_data.periods| |
|aws.fargate.ecs.precpu_stats.throttling_data.throttled_periods| |
|aws.fargate.ecs.precpu_stats.throttling_data.throttled_time| |
|aws.fargate.memory_stats.limit| |
|aws.fargate.memory_stats.stats.active_anon| |
|aws.fargate.memory_stats.stats.active_file| |
|aws.fargate.memory_stats.stats.cache| |
|aws.fargate.memory_stats.stats.dirty| |
|aws.fargate.memory_stats.stats.hierarchical_memory_limit| |
|aws.fargate.memory_stats.stats.hierarchical_memsw_limit| |
|aws.fargate.memory_stats.stats.inactive_anon| |
|aws.fargate.memory_stats.stats.inactive_file| |
|aws.fargate.memory_stats.stats.mapped_file| |
|aws.fargate.memory_stats.stats.pgfault| |
|aws.fargate.memory_stats.stats.pgmajfault| |
|aws.fargate.memory_stats.stats.pgpgin| |
|aws.fargate.memory_stats.stats.pgpgout| |
|aws.fargate.memory_stats.stats.rss| |
|aws.fargate.memory_stats.stats.rss_huge| |
|aws.fargate.memory_stats.stats.total_active_anon| |
|aws.fargate.memory_stats.stats.total_active_file| |
|aws.fargate.memory_stats.stats.total_cache| |
|aws.fargate.memory_stats.stats.total_dirty| |
|aws.fargate.memory_stats.stats.total_inactive_anon| |
|aws.fargate.memory_stats.stats.total_inactive_file| |
|aws.fargate.memory_stats.stats.total_mapped_file| |
|aws.fargate.memory_stats.stats.total_pgfault| |
|aws.fargate.memory_stats.stats.total_pgmajfault| |
|aws.fargate.memory_stats.stats.total_pgpgin| |
|aws.fargate.memory_stats.stats.total_pgpgout| |
|aws.fargate.memory_stats.stats.total_rss| |
|aws.fargate.memory_stats.stats.total_rss_huge| |
|aws.fargate.memory_stats.stats.total_unevictable| |
|aws.fargate.memory_stats.stats.total_writeback| |
|aws.fargate.memory_stats.stats.unevictable| |
|aws.fargate.memory_stats.stats.writeback| |
|aws.fargate.memory_stats.usage| |
|aws.fargate.num_procs| |
|aws.fargate.pids_stats.current| |
|aws.fargate.precpu_stats.cpu_usage.total_usage| |
|aws.fargate.precpu_stats.cpu_usage.usage_in_kernelmode| |
|aws.fargate.precpu_stats.cpu_usage.usage_in_usermode| |
|aws.fargate.precpu_stats.online_cpus| |
|aws.fargate.precpu_stats.system_cpu_usage| |
|aws.fargate.precpu_stats.throttling_data.periods| |
|aws.fargate.precpu_stats.throttling_data.throttled_periods| |
|aws.fargate.precpu_stats.throttling_data.throttled_time| |

