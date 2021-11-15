---
title: Amazon RDS Integration
tags: [integrations list]
permalink: amazon_rds.html
summary: Learn about the Wavefront Amazon RDS Integration.
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
|aws.rds.activetransactions.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.allocatedstorage| Amount of storage (in gigabytes) to be initially allocated for the database instance.|
|aws.rds.aurorabinlogreplicalag.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.aurorareplicalag.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.aurorareplicalagmaximum.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.aurorareplicalagminimum.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.backupretentionperiodstorageused.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.binlogdiskusage.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.blockedtransactions.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.buffercachehitratio.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.burstbalance.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.capacity| Maximum size.|
|aws.rds.commitlatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.committhroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.cpucreditbalance.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.cpucreditusage.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.cpusurpluscreditbalance.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.cpusurpluscreditscharged.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.cpuutilization.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.databaseconnections.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.dbload.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.dbloadcpu.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.dbloadnoncpu.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.ddllatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.ddlthroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.deadlocks.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.deletelatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.deletethroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.diskqueuedepth.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.dmllatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.dmlthroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.engineuptime.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.failedsqlserveragentjobscount.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.freeablememory.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.freelocalstorage.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.freestoragespace.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.insertlatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.insertthroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.loginfailures.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.lvmreadiops.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.lvmwriteiops.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.maximumusedtransactionids.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.networkreceivethroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.networkthroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.networktransmitthroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.oldestreplicationslotlag.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.queries.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.rdstoaurorapostgresqlreplicalag.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.readiops.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.readlatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.readthroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.replicationslotdiskusage.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.resultsetcachehitratio.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.selectlatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.selectthroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.serverlessdatabasecapacity.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.snapshotstorageused.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.swapusage.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.totalbackupstoragebilled.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.transactionlogsdiskusage.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.transactionlogsgeneration.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.updatelatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.updatethroughput.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.volumebytesused.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.volumereadiops.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.volumewriteiops.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.writeiops.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.writelatency.*|Statistics: average, maximum, minimum, samplecount, sum|
|aws.rds.writethroughput.*|Statistics: average, maximum, minimum, samplecount, sum|

