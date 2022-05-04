---
title: AWS CloudWatch, CloudTrail, and Metrics+ Integrations
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_aws_metrics.html
summary: Monitor CloudWatch, CloudTrail, and Metrics+ with Tanzu Observability by Wavefront.
---
Amazon Web Services (AWS) is a collection of cloud-computing services that provide an on-demand computing platform. The Amazon Web Services integration allows you to ingest metrics directly from AWS. The Amazon Web Services built-in integration is part of the setup, but the additional steps in this document are needed to complete and customize integration setup.

{% include note.html content="You must have the [**Proxy Management** permission](permissions_overview.html) to set up an AWS integration. If you do not have permission, the UI menu selections, buttons, and links you use to perform the tasks are not visible." %}

You have to set up your Tanzu Observability by Wavefront account with the correct permissions.
* From within the integration or explicitly, you can [Give Global Read-Only Access](integrations_aws_overview.html#give-read-only-access-to-your-amazon-account-and-get-the-role-arn)
* As an alternative, you can [Create an IAM Policy to Specify Limited Access](integrations_aws_overview.html#create-iam-policy-to-specify-limited-access)


## Supported AWS Integrations

The AWS integration ingests data from many products and provides dashboards for each. See any integration page for [a list of dashboards](amazon_cloudtrail.html#dashboards). The following products are of special interest to most customers:

- **[CloudWatch](http://aws.amazon.com/cloudwatch)** -- retrieves AWS [metric and
dimension](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CW_Support_For_AWS.html) data. Includes some metrics for Amazon Relational Database (RDS).
- **[CloudTrail](http://aws.amazon.com/cloudtrail)** -- retrieves EC2 event information and creates Tanzu Observability System events that represent the AWS events.
- **[AWS Metrics+](integrations_aws_metrics.html#aws-metrics-data)** -- retrieves additional metrics using AWS APIs other than CloudWatch. Data include EBS volume data and  EC2 instance metadata like tags. You can investigate billing data  and the number of reserved instances. Be sure to enable AWS+ metrics because it allows Tanzu Observability to optimize its use of CloudWatch, and saves money on CloudWatch calls as a result.


## CloudWatch Integration Details

Tanzu Observability retrieves AWS metric and dimension data from AWS services using the AWS CloudWatch API. The complete list of metrics and dimensions that can be retrieved from AWS CloudWatch is available at [Amazon CloudWatch Metrics and Dimensions Reference](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CW_Support_For_AWS.html). In addition, you can publish [custom AWS metrics](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html) that can also be ingested by the CloudWatch integration.

<a name="configure"></a>

### Configuring CloudWatch Data Ingestion

You can configure which instances and volumes to ingest metrics from, which metrics to ingest, and the rate at which Tanzu Observability fetches metrics.
{% include tip.html content="The following examples are supported only for EC2 and EBS metrics." %}

To configure CloudWatch ingestion:

1. Log in to your Wavefront cluster and click **Integrations** on the toolbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. Click the **Setup** tab.
1. In the Types column, click the **CloudWatch** link in the row of the integration you want to configure.
1. Configure ingestion properties:
    - **Instance and Volume Allow List** fields -- Add instances and volumes to an allow list by specifying [EC2 tags](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html), defined on the instances and volumes. The allow lists should be in JSON format, for example, `{"organization":"yourcompany"}`. When specified as a comma-separated list, the tags are OR'd. To use instance and volume allow lists, you must also add an [AWS Metrics+](#aws-metrics-data) integration because the AWS tags are imported from the EC2 service. If you don't specify any tags, Tanzu Observability imports metrics from *all* instances and volumes.
    - **Metric Allow List** field -- Adds metrics to an allow list by specifying a regular expression. The regular expression must be a complete match of the entire metric name. For example, if you only want CloudWatch data for `elb` and `rds` (which come under `aws.rds`), then use a regular expression such as: `^aws.(elb|rds).*$`. If you do not specify a regular expression, _all_ CloudWatch metrics are retrieved.
    - **Point Tag Allow List** -- Adds AWS point tags to an allow list by specifying a regular expression. If you do not specify a regular expression, no point tags are added to metrics.
    - **Service Refresh Rate** -- Number of minutes between requesting metrics. Default: 5.
    - **Products** -- Allows you to filter the list of AWS products for which you want to collect metrics by using the CloudWatch integration. The default is **All**. Click **Custom** to see the list of AWS products and to filter them according to your needs.
1. Click **Save**.


<a name="aws_sources"></a>

### CloudWatch Sources and Source Tags

Tanzu Observability automatically sets each metric's source field and adds source tags to each AWS source, as follows:

**Metric Source Field**

Tanzu Observability sets the value of the AWS metric [`source`](wavefront_data_format.html) field by service:

- **EC2** - the value of the **hostname**, **host**, or **name** [EC2 tags](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html), if the tags exist and you have an EC2 integration. Otherwise, the source is set to the Amazon instance ID.
- **EBS** - the Amazon instance ID of the EC2 instance the volume is attached to.
- All other services - the value of the *first* CloudWatch dimension. The supported dimensions appear at the bottom of the Amazon service metric documentation topic. For example, see [Amazon EC2 Dimensions](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ec2-metricscollected.html#ec2-metric-dimensions).

**Source Tags**

AWS sources are assigned source tags that identify their originating service following this pattern: `~integration.aws.<service>`, for example, `~integration.aws.ec2`.

### CloudWatch Point Tags

Tanzu Observability adds the following point tags to CloudWatch metrics:

- `accountId` - the Amazon account that reported the metric.
- `Region` - The region in which the service is running. Added to EC2 and EBS metrics only.
- CloudWatch dimensions. The dimensions vary by service. For example, for AWS S3, the `BucketName` dimension is added as a point tag.

### CloudWatch Pricing

Standard AWS CloudWatch pricing applies each time Tanzu Observability requests metrics using the CloudWatch API. For pricing information, see [AWS \| Amazon CloudWatch \| Pricing](http://aws.amazon.com/cloudwatch/pricing). After selecting a region, you can find the current expected price under **Amazon CloudWatch API Requests**. In addition, custom metrics have a premium price; see the **Amazon CloudWatch Custom Metrics** section of the pricing page. To limit cost, by default Tanzu Observability queries the API every 5 minutes. However, you can [change the refresh rate](#configuring-cloudwatch-data-ingestion), which will change the cost.

As an alternative to using the CloudWatch API for EC2 metrics, you can collect these metrics using [a Telegraf collector](telegraf.html) on each AWS instance. In this case, to prevent CloudWatch from requesting those metrics, you should set the **Metric Allow List** property to allow all metrics except EC2. For example:

```
^aws.(billing|instance|sqs|sns|reservedInstance|ebs|route53.health|ec2.status|elb|s3).*$
```

By default, the number of unique metrics that can be retrieved from CloudWatch are limited to 10K to cap the AWS CloudWatch bill.

### Configuring CloudWatch Billing Metrics

The AWS Billing and Cost Management service sends [billing metrics](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/billing-metricscollected.html) to CloudWatch. You configure AWS to produce `aws.billing.*` metrics by selecting the **Receive Billing Alerts** check box on the **Preferences** tab in the [AWS Billing and Cost Management console](http://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/monitor-charges.html):

![aws billing](images/aws_billing.png)

Tanzu Observability reports the single metric `aws.billing.estimatedcharges`. The `source` field and `ServiceName` point tag identify the AWS services. For the total estimated charge metric, `source` is set to `usd` and `ServiceName` is empty. Tanzu Observability also provides the point tags `accountId`, `Currency`, `LinkedAccount`, and `Region`. Billing metrics are typically reported every 4 hours.

### AWS Usage Metrics

As part of CloudWatch we collect metrics that let you check if throttling is happening and get the number of API calls.

  - `aws.usage.throttlecount` - Understand whether throttling is happening at the AWS end.
  - `aws.usage.callcount.*` - Get the number of API calls that goes to AWS. If you know the Service Quota, you can easily calculate the percentage of usages and trigger an alert if the percentage reaches a defined threshold.

## CloudTrail Events, Metrics, and Point Tags

We retrieve CloudTrail event information stored in JSON-formatted log files in an S3 bucket. The CloudTrail integration parses the files for all events that result from an operation that is not a describe, get, or list, and creates a Tanzu Observability [System event](events.html).

In the [Events browser](events.html) the events are named **AWS Action: \<Operation\>** and have the event tag `aws.cloudtrail.ec2`. For example:

![aws start instance](images/aws_start_instances.png)

Starting with release 2018.22.x, we group AWS CloudTrail events by the minute and report the metrics. We also support several point tags that allow you to filter the events.

### CloudTrail Metrics

Each metrics starts with `aws.cloudtrail.event.`, followed by one of the EC2 operation names.

The EC2 operations include:
- **\[Run\|Start\|Stop\|Terminate\|Monitor\|Unmonitor\]Instances**
- **\[Attach\|Detach\]Volume**
- **DeleteNetworkInterface**
- **AuthorizeSecurityGroupIngress**
- **CreateSecurityGroup**
- **RequestSpotInstances**
- **CancelSpotInstanceRequests**
- **ModifyInstanceAttribute**
- **CreateTags**
- **\[Create\|Delete\]KeyPair**
- **DeregisterImage**

As a result, the metrics include, for example `aws.cloudtrail.event.Start` or `aws.cloudtrail.event.CreateTags`.

In addition, the metric `aws.cloudtrail.event.total-per-minute` reports the per-minute count of *all* AWS API calls recorded by the AWS CloudTrail integration.

### Point Tags for Filtering CloudTrail Metrics

You can use the following point tags to filter the metrics.

<table>
<tbody>
<thead>
<tr><th width="30%">Point tag</th><th width="50%">Description</th><th width="20%">Example</th></tr>
</thead>
<tr>
<td>eventType</td>
<td>The type of event that generated the event record.
</td>
<td>AwsApiCall, AwsServiceEvent </td></tr>
<tr>
<td>eventSource</td>
<td>The service that the request was made to.</td>
<td>ec2.amazonaws.com</td></tr>
<tr>
<td>Region</td>
<td>The AWS region that the request was made to.
</td>
<td>us-east-2</td></tr>
<tr>
<td>accountId</td>
<td>The account ID that you specified when you set up the AWS CloudTrail integration.
</td>
<td>User42</td></tr>
<tr>
<td>bucket</td>
<td>Bucket that you specified when you set up the AWS CloudTrail integration.
</td>
<td>A random number</td></tr>
</tbody>
</table>

## AWS Metrics+ Data

AWS Metrics+ are metrics retrieved using AWS metrics API calls other than CloudWatch.
Unless otherwise indicated, Tanzu Observability sets the value of the AWS Metrics+ `source` field to the AWS instance ID. If an EBS volume is detached, its source field is set to the volume ID. The metrics include:

- `aws.instance.price` - EC2 instances and how much they cost per hour. This metric includes the point tags `availabilityZone`, `instanceID`, `instanceLifecycle`, `instanceType`, and `operatingSystem`.
- `aws.reservedinstance.count` - Number of reserved instances in each availability zone by each instance type. This metric includes the point tags `availabilityZone`, `instanceID`, `instanceType`, and `operatingSystem`. This metric appears only if your account has reserved instances.
- EBS metrics - EBS metrics include the point tags `instanceID`, `Region`, `State`, `Status`, `volumeId`, and `volumeType` (see [Amazon EBS Volume Types](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumeTypes.html)). The `Status` can be `attached`, `detaching`, or `attaching`. The `State` can be `available` (detached) or `in-use` (attached).
  - `aws.ebs.volumesize` - The volume size of the elastic block store.
  - `aws.ebs.volumeiops` - The volume I/O operations of the elastic block store.
- SQS - [AWS SQS](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/sqs-metricscollected.html) metrics retrieved every minute from the SQS service.
  - `aws.sqs.approximatenumberofmessagesnotvisible` - The number of messages that are "in flight." Messages are considered in flight if they have been sent to a client but have not yet been deleted or have not yet reached the end of their visibility window.
  - `aws.sqs.approximatenumberofmessagesdelayed` - The number of messages in the queue that are delayed and not available for reading immediately. This can happen when the queue is configured as a delay queue or when a message has been sent with a delay parameter.
  - `aws.sqs.approximatenumberofmessages` aliased to the CloudWatch metric `aws.sqs.approximatenumberofmessagesvisible` - The number of messages available for retrieval from the queue.
- Pricing Metrics - Capture the current pricing of EC2 instances. These metrics are available as a preview and subject to change. These metrics have the point tags  `instanceType`, `operatingSystem`, `Region`, `purchaseOption` (All Upfront, Partial Upfront, No Upfront), `leaseContractLength` (1 or 3 years), and `offeringClass` (standard or convertible)). The `source` field is set to the display name of the region. For example, if `Region=us-west2`, then `source=us west (oregon)`.
  - `~sample.aws.ec2.on-demand.price.hourly` - The hourly price (in US$) of an on-demand instance.
  - `~sample.aws.ec2.reserved.price.upfront` - The up-front payment (in US$) for a reservation.  This metric reports `0` when `purchaseOption` is No Upfront.
  - `~sample.aws.ec2.reserved.price.hourly` - The hourly payment (in US$) for a reservation. This metric reports `0` when the `purchaseOption` is All Upfront.
- RDS Metrics -give insight into Amazon Relational Database Service (RDS)
  - `aws.rds.allocatedstorage` - The amount of storage (in gigabytes) allocated for the database instance.
  - `aws.rds.capacity` - For Amazon Aurora only, RDS capacity.
  - `aws.rds.backtrackconsumedchangerecords` - For Amazon Aurora only, the number of change records stored for Backtrack.

- Service Limit Metrics - Capture the current resource limits and usage for your AWS account. These metrics include the point tags `Region` and `category`.
  - `aws.limits.<resource>.limit` - The current limit for an AWS resource in a particular region.
  - `aws.limits.<resource>.usage` - The current usage of an AWS resource in a particular region.

    {% include note.html content="To examine these metrics, your account needs at least the Business-level AWS Support plan because the integration uses the Support API to pull service limits. You also need both ReadOnlyAccess and AWSSupportAccess. See [Giving Tanzu Observability Read-Only Access](integrations_aws_overview.html#giving-tanzu-observability-access-to-your-aws-account) for details." %}
    


<!--## AWS Metrics+ Trusted Advisor Service Limits

Each AWS account has limits on the number of resources that are available to you for each AWS service. You can monitor and manage your resource usage and limits using the AWS service limit metrics in Wavefront.

If you have an account with the required permissions, you can view the [available service limits](https://console.aws.amazon.com/trustedadvisor/home#/category/service-limits) in the AWS Trusted Advisor console.


### Example Queries for Service Limits

Here are a few sample queries:

To visualize your limits for EC2 On-Demand Instances per region, you can run the following query:

```
ts(aws.limits.on_demand_instances_*.limit)
```
To visualize your usage for EC2 On-Demand Instances per region, you can run the following query:

```
ts(aws.limits.on_demand_instances_*.usage)
```

### Example Alert for Trusted Advisor Service Limits

Sample alerts from the Wavefront Ops team are [on this page](aws_trusted_advisor_alerts.html).

The following alert is a simple illustration for how alerts like this work.

You can set up an alert to notify you when data reach a certain threshold.

The following chart sets up variables for on-demand instances limit and on-demand instance usage. The visible query shows the percentage.

![chart for service limits query](images/service_limit_chart.png)

We can create a [multi-threshold alert](alerts_manage.html#create-a-multi-threshold-alert) for this query that:

* Fires if the condition has been true for the last 30 minutes.
* Notifies `SEVERE` targets if the value is greater than 90.
* Notifies `WARN` targets if the value is greater than 80.

![service limits alarm](images/service_limit_alert.png)

## Learn More!

See the KB article [Ingesting CloudWatch NeptuneDB metrics into Wavefront](https://help.wavefront.com/hc/en-us/articles/360060711332-Ingesting-Cloudwatch-NeptuneDB-metrics-into-Wavefront-)-->
