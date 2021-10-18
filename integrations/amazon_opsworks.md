---
title: Amazon OpsWorks Integration
tags: [integrations list]
permalink: amazon_opsworks.html
summary: Learn about the Wavefront Amazon OpsWorks Integration.
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

You start by granting Wavefront read-only access to your Amazon account or by giving Wavefront limited access.

* [Giving Wavefront Global Read-Only Access](https://docs.wavefront.com/integrations_aws_overview.html#giving-wavefront-global-read-only-access)
* [Giving Wavefront Limited Access](https://docs.wavefront.com/integrations_aws_overview.html#giving-wavefront-limited-access)





undefined






## Metrics

See [AWS documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) for Metrics descriptions.  

|Metric Name|Description|
| :--- | :--- |
|aws.opsworks.cpu_idle| Percentage of time that the CPU is idle.|
|aws.opsworks.cpu_nice| Percentage of time that the CPU is handling processes with a positive nice value, which have a lower scheduling priority.|
|aws.opsworks.cpu_steal| Percentage of time that an instance is waiting for the hypervisor to allocate physical CPU resources.|
|aws.opsworks.cpu_system| Percentage of time that the CPU is handling system operations.|
|aws.opsworks.cpu_user| Percentage of time that the CPU is handling user operations.|
|aws.opsworks.cpu_waitio| Percentage of time that the CPU is waiting for input/output operations.|
|aws.opsworks.load_1| Load averaged over a one-minute window.|
|aws.opsworks.load_15| Load averaged over a 15-minute window.|
|aws.opsworks.load_5| Load averaged over a 5-minute window.|
|aws.opsworks.memory_buffers| Amount of buffered memory.|
|aws.opsworks.memory_cached| Amount of cached memory.|
|aws.opsworks.memory_free| Amount of free memory.|
|aws.opsworks.memory_swap| Amount of swap space.|
|aws.opsworks.memory_total| Total amount of memory.|
|aws.opsworks.memory_used| Amount of memory in use.|
|aws.opsworks.procs| Number of active processes.|

