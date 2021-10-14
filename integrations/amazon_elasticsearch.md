---
title: Amazon Elasticsearch Integration
tags: [integrations list]
permalink: amazon_elasticsearch.html
summary: Learn about the Wavefront Amazon Elasticsearch Integration.
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

