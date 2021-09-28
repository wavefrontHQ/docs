---
title: AWS Integration Overview
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_aws_overview.html
summary: Understand setup and services in the AWS integration
---
Amazon Web Services (AWS), is a collection of cloud-computing services that provide an on-demand computing platform. The Wavefront Amazon Web Services integration allows you to ingest metrics directly from AWS.

You can use the Wavefront Amazon Web Services integration for initial setup, but additional steps might be needed for some of the services. This page gives an overview.

{% include shared/badge.html content="You must have [Proxy Management permission](permissions_overview.html) to set up an AWS integration. If you do not have permission, the UI menu selections, buttons, and links you use to perform the tasks are not visible." %}

## Basics

The AWS integration ingests data from many Amazon and AWS products including:

- **[CloudWatch](http://aws.amazon.com/cloudwatch)** - retrieves AWS [metric and
dimension](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CW_Support_For_AWS.html) data. Includes some metrics for Amazon Relational Database (RDS).
- **[CloudTrail](http://aws.amazon.com/cloudtrail)** - retrieves EC2 event information and creates Wavefront System events that represent the AWS events.
- **[AWS Metrics+](integrations_aws_metrics.html#aws-metrics-data)** - retrieves additional metrics using AWS APIs other than CloudWatch. Data include EBS volume data and  EC2 instance metadata like tags. You can investigate billing data  and the number of reserved instances. Be sure to enable AWS+ metrics because it allows Wavefront to optimize its use of Cloudwatch, and saves money on Cloudwatch calls as a result.

{% include tip.html content="See [AWS CloudWatch, CloudTrail, and Metrics+ Integrations](integrations_aws_metrics.html)" %}

### Establish a Trust Relationship

Adding an AWS integration requires establishing a trust relationship between Amazon and Wavefront by specifying account information. You have to do that only once, and have 2 options:

* [Give Wavefront Global Read-Only Access](#giving-wavefront-global-read-only-access)
* [Give Wavefront Limited Access](#giving-wavefront-limited-access)

After you've set up the integration, you can examine metrics from all AWS services that you subscribe to from Wavefront. The integration includes a predefined dashboard for each service. You can clone and modify Wavefront dashboards, or create your own custom dashboard.

### Use Internal Metrics to Monitor AWS Integrations

You can use some Wavefront internal metrics to [monitor your AWS Integration](wavefront_monitoring.html#aws-integration).

### AWS Dashboards

If you set up an [Amazon Web Services integration](integrations.html), Wavefront installs AWS overview dashboards Summary, Pricing, and Billing and the AWS service-specific dashboards: EC2, ECS, ELB, DynamoDB, Lambda, and Redshift, and so on. All AWS dashboards have a tag `~integration.aws.<service>`. For example: `~integration.aws.ec2`, `~integration.aws.lambda`, etc.

{% include shared/system_dashboard.html %}

## Managing an AWS Integration

From the page of the integration you select, you can add an AWS integration, enable and disable it, and delete an AWS integration.

### Adding an AWS Integration

1. Log in to your Wavefront cluster and click **Integrations** on the taskbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. Click the **Setup** tab.
1. Click **Set Up Amazon Integration** and click **Add Integration**.
1. Follow the instructions in the right panel to give Wavefront read-only access to your Amazon account.
1.  Configure the integration properties:
     - **Name** - Name to identify the integration.
     - **Role ARN** - Role ARN from Amazon account.
     - **Bucket Name** - The S3 bucket containing CloudTrail logs. In your AWS account, go to **CloudTrail** &gt;**Trails** to see the bucket name.
     - **Prefix** - A log file prefix specified when you created the CloudTrail.
     - **CloudTrail Region** - AWS Region where the CloudTrail logs reside.
1.  Click **Set Up**. The integration is added to the Amazon Web Services Integrations list. If you want to configure whitelists and refresh rate for the CloudWatch integration, click the **CloudWatch** link in the Types column and follow the instructions in [Configuring CloudWatch Data Ingestion](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion).


### Enabling and Disabling AWS Integrations

Wavefront automatically disables integrations that are experiencing errors due to invalid credentials. To enable an integration after the credential has been corrected or to manually disable an integration:

1. In Wavefront, click **Integrations** on the taskbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. Click the **Setup** tab.
1. Click the **Advanced** link.
1. In the row that contains the integration that you want to enable or disable, click the three dots and select **Enable** or **Disable**.

## Giving Wavefront Global Read-Only Access

Data flows from AWS to Wavefront only if the account has the required access. You have several options:

<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr>
<td>ReadOnlyAccess policy (most services)</td>
<td markdown="span">In most cases, it makes sense to give the Wavefront account the `ReadOnlyAccess` policy to the Amazon account.</td></tr>
<tr>
<td markdown="span">Access to Service Limit metrics</td>
<td markdown="span">If you want to collect Service Limit metrics:
  - You need at least the Business-level AWS Support plan
  - Grant the `AWSSupportAccess` policy (in addition to the `ReadOnlyAccess` policy)</td>
</tr>
<tr>
<td markdown="span">Create IAM policy to specify limited access</td>
<td markdown="span">Explicitly specify the access settings in a custom IAM policy, as discussed in [Giving Wavefront Limited Access](integrations_aws_metrics.html#giving-wavefront-limited-access).</td>
</tr>
</tbody>
</table>


### Give Wavefront Read-Only Access to Your Amazon Account

1. In your Amazon Identity & Access Management settings, grant Wavefront read-only access to your Amazon account.
   1. Select **Roles** and click **Create new role**. The role creation wizard starts.
   1. Select **Role for cross-account access**.
   1. Select **Provide access between your AWS account and a 3rd party AWS account**.
   1. Enter Wavefront account info:
      - Account ID - Account ID.
      - Require MFA - unchecked
   1. Click **Next Step**.
   1. On the Attach Policy screen, select the **ReadOnlyAccess** check box and click **Next Step**.
   1. For Role name, enter **wavefront** and click **Create role**.
   1. Click the **wavefront** role.
   1. Copy the Role ARN value.
1. In Wavefront, click **Integrations** in the taskbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. On the **Setup** tab, click the **Advanced** link at the bottom.
1. In the Cloud Integration page, click **Add Amazon Web Services** and select an option:
   - **Register AWS Metrics+**
   - **Register CloudTrail**
   - **Register CloudWatch**
1.  Configure the integration properties:
     - **Common Properties** -- Apply to AWS Metrics+, CloudTrail, and CloudWatch.
         - **Name** - Name to identify the integration.
         - **Role ARN** - Role ARN from Amazon account.
     - **CloudTrail Properties** -- Apply to CloudTrail only.
         - **Bucket Name -** The S3 bucket that contains CloudTrail logs. In AWS, go to **CloudTrail** &gt;**Trails** to see the bucket name.
         - **Prefix** - A log file prefix specified when you created the CloudTrail.
     - **CloudWatch** -- Apply to CloudWatch only.
         - Whitelists and Service Refresh Rate - see [Configuring CloudWatch Data Ingestion](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion).
1.  Click **Save**. The selected integrations are created and added to the Cloud Integrations list.

## Giving Wavefront Limited Access

Instead of giving Wavefront read-only access, you can instead give more limited access.

The required permissions depend on the integration and on the service you want to monitor, as shown in the following table:
<table>
<thead>
<tr><th width="20%">Integration</th><th width="45%">Description</th><th width="35%">Required Permissions</th></tr>
</thead>
<tr>
    <td>CloudWatch</td>
    <td>Retrieves AWS metric and dimension data. </td>
    <td>ListMetrics<br />
      GetMetric*<br />
    </td>
</tr>
<tr>
    <td>CloudTrail <br /></td>
    <td>Retrieves EC2 event information and creates Wavefront System events </td>
    <td>List and Get permissions on the S3 bucket where the logs are delivered.
    </td>
</tr>
<tr>
    <td>AWS Metrics+ </td>
    <td>Retrieves additional metrics, tags and other metadata using AWS APIs.<ul>
    <li>The <strong>es:</strong> permissions are needed if you want to extract AWS tags and associate them (as tags) with metrics. These permissions are especially useful when you're using ElasticSearch. </li>
    <li>The <strong>iam:</strong> permission is needed if you want to pull not only numeric account IDs but also the corresponding human-readable account IDs.   </li>
    </ul> </td>
    <td>ec2:DescribeVolumes<br />
      ec2:DescribeInstances<br />
    ec2:DescribeReservedInstances <br />
    rds:DescribeDBClusters<br />
    sqs:ListQueue*<br />
    sqs:GetQueue*<br />
    dynamodb:ListTables<br />
    dynamodb:DescribeTable<br />
    eks:Describe*<br />
    eks:List*<br />
    es:ListDomainNames<br />
    es:DescribeElasticsearchDomain<br />
    es:listTags<br />
    iam:ListAccountAliases
    </td>
</tr>
<tr>
    <td>AWS Metrics+ <br>Service Limit Metrics</td>
    <td>Retrieves Trusted Advisor service limit metrics using AWS APIs. Requires at least a Business Level AWS Support plan.  </td>
    <td>support:DescribeTrustedAdvisorChecks<br />
support:RefreshTrustedAdvisorCheck<br />
support:DescribeTrustedAdvisorCheckResult<br /></td>
</tr>
</table>

### Create IAM Policy to Specify Limited Access

You can explicitly specify the access permissions in a custom IAM policy, as shown in the following example snippet.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "cloudwatch:GetMetric*",
                "cloudwatch:ListMetrics",
                "ec2:Describe*",
                "s3:List*",
                "s3:Get*",
                "rds:DescribeDBClusters",
                "sqs:ListQueue*",
                "sqs:GetQueue*",
                "dynamodb:ListTables",
                "dynamodb:DescribeTable",
                "eks:Describe*",
                "eks:List*",
                "support:DescribeTrustedAdvisorChecks",
                "support:RefreshTrustedAdvisorCheck",
                "support:DescribeTrustedAdvisorCheckResult",
                "es:ListDomainNames",
                "es:DescribeElasticsearchDomain",
                "es:ListTags",
                "iam:ListAccountAliases"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```

## Viewing AWS Metrics

You can view AWS metrics by selecting **Browse &gt; Metrics** and searching for metrics beginning with `aws.`:

![aws metrics](images/aws_metrics.png)

You can drill into the folder for a specific service and click a metric to navigate to a chart that displays that set of data. For example, clicking clicking the folder `aws.ec2.`, then the metric `aws.ec2.cpuutilization`, and then refining the query by the `Region` point tag and the `topk` function yields the following chart:

![aws cpu utilization](images/aws_cpu_utilization.png)

### AWS Aggregate Metrics

All AWS metrics return the following aggregate metrics: average, maximum, minimum, sample count, and sum. To view the aggregate metrics,

1.  Search for a specific metric, for example `aws.ec2.cpuutilization`:

    ![aws cpu utilization folder](images/aws_cpu_utilization_metric.png)

2.  Click the metric folder, for example `aws.ec2.cpuutilization.`, to display the aggregate metrics:

    ![aws cpu utilization aggregate metrics](images/aws_cpu_utilization_aggregate_metrics.png)
