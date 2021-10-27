---
title: AWS Integration Overview
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_aws_overview.html
summary: Understand setup and services in the AWS integration
---
Amazon Web Services (AWS) is a collection of cloud-computing services that provide an on-demand computing platform. The Wavefront Amazon Web Services integration allows you to ingest metrics directly from AWS.

You can use the Wavefront Amazon Web Services integration for initial setup, but additional steps might be needed for some of the services. This page gives an overview.

{% include shared/badge.html content="You must have the [**Proxy Management** permission](permissions_overview.html) to set up an AWS integration. If you do not have permission, the UI menu selections, buttons, and links you use to perform the tasks are not visible." %}

## Basics

The AWS integration ingests data from many Amazon and AWS products including:

- **[CloudWatch](http://aws.amazon.com/cloudwatch)** - retrieves AWS [metric and
dimension](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CW_Support_For_AWS.html) data. Includes some metrics for Amazon Relational Database (RDS).
- **[CloudTrail](http://aws.amazon.com/cloudtrail)** - retrieves EC2 event information and creates Wavefront System events that represent the AWS events.
- **[AWS Metrics+](integrations_aws_metrics.html#aws-metrics-data)** - retrieves additional metrics using AWS APIs other than CloudWatch. Data include EBS volume data and  EC2 instance metadata like tags. You can investigate billing data  and the number of reserved instances. Be sure to enable AWS+ metrics because it allows Wavefront to optimize its use of CloudWatch, and saves money on CloudWatch calls as a result.

{% include tip.html content="See [AWS CloudWatch, CloudTrail, and Metrics+ Integrations](integrations_aws_metrics.html)" %}

### Establish a Trust Relationship

Adding an AWS integration requires establishing a trust relationship between Amazon and Wavefront by specifying account information. You have to do that only once, and you have 2 options:

* [Give Wavefront Global Read-Only Access](#giving-wavefront-global-read-only-access)
* [Give Wavefront Limited Access](#giving-wavefront-limited-access)

After you've set up the integration, you can examine metrics from all AWS services that you subscribe to from Wavefront. The integration includes a predefined dashboard for each service. You can clone and modify Wavefront dashboards, or create your own custom dashboard.

### Use Internal Metrics to Monitor AWS Integrations

You can use some Wavefront internal metrics to [monitor your AWS Integration](wavefront_monitoring.html#aws-integration).

### AWS Dashboards

If you set up an [Amazon Web Services integration](integrations.html), Wavefront installs AWS overview dashboards Summary, Pricing, and Billing and the AWS service-specific dashboards: EC2, ECS, ELB, DynamoDB, Lambda, and Redshift, and so on. All AWS dashboards have a tag `~integration.aws.<service>`. For example: `~integration.aws.ec2`, `~integration.aws.lambda`, etc.

{% include shared/system_dashboard.html %}

## Managing an AWS Integration

From the page of the integration you select, you can add an AWS integration, enable and disable it, and delete an AWS integration. You can also [add and manage AWS integrations by using the Wavefront REST API](integrations_aws_overview_API.html).

### Add an AWS Integration


1. Log in to your Wavefront cluster and click **Integrations** on the taskbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. Click the **Setup** tab.
1. Click **Set Up Amazon Integration** and click **Add Integration**.
1. Click **How to get Role ARN** and follow the instructions on the right to give Wavefront read-only access to your Amazon account.
1. Configure the integration properties:
     - **Name** - Name to identify the integration.
     - **Role ARN** - Role ARN from your Amazon account.
1. (Optional) If you want to configure a CloudTrail integration, click **Show Advanced Options**.
     - **Bucket Name** - Enter the S3 bucket containing CloudTrail logs. 
     
        In your AWS account, go to **CloudTrail** &gt;**Trails** to see the bucket name.
        
     - **Prefix** - A log file prefix specified when you created the CloudTrail. 
     
        The default prefix is `AWSLogs`. If you use a custom prefix, you must put it here without using a forward slashes.
        
     - **CloudTrail Region** - AWS Region where the CloudTrail logs reside.
     
1. Click **Set Up**. The integration is added to the Amazon Web Services Integrations list. If you want to configure whitelists and refresh rate for the CloudWatch integration, click the **CloudWatch** link in the Types column and follow the instructions in [Configuring CloudWatch Data Ingestion](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion).

### Enable and Disable AWS Integrations

Wavefront automatically disables integrations that are experiencing errors due to invalid credentials. To enable an integration after the credential has been corrected or to manually disable an integration:

1. In Wavefront, click **Integrations** on the taskbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. Click the **Setup** tab.
1. Click the **Advanced** link.
1. In the row that contains the integration that you want to enable or disable, click the ellipsis icon, and select **Enable** or **Disable**.


### Register Additional Amazon Web Services

After you set up the AWS integration with the Role ARN, you can additionally register more Amazon Web services.

1. In Wavefront, click **Integrations** on the taskbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. Click the **Setup** tab.
1. Click the **Advanced** link.
1. In the Cloud Integration page, click **Add Amazon Web Services** and select an option:
   * To register an AWS Metrics+ service, select **Register AWS Metrics+**, and configure the following integration properties:
      
      1. **Name** -- Name to identify the integration.
      2. **Role ARN** -- Role ARN from Amazon account.
   
   * To register a CloudTrail service, select **Register CloudTrail**, and configure the following integration properties:
      
      1. **Name** - Name to identify the integration.
      2. **Role ARN** -- Role ARN from Amazon account.
      3. **Bucket Name** -- The S3 bucket that contains CloudTrail logs. 
         
         In AWS, go to **CloudTrail** &gt;**Trails** to see the bucket name.
         
      4. **Prefix** -- A log file prefix specified when you created the CloudTrail. 
         
         The default prefix is `AWSLogs`. If you use a custom prefix, you must put it here without using a forward slashes.
         
      5. **Region** -- AWS Region where the CloudTrail logs reside.
       
   * To register a CloudWatch service, select **Register CloudWatch**, and configure the following integration properties:
   
      1. **Name** -- Name to identify the integration.
      2. **Role ARN** -- Role ARN from Amazon account.
      3. Allow Lists and Service Refresh Rate -- see [Configuring CloudWatch Data Ingestion](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion).
     
1.  Click **Save**. The selected integrations are created and added to the Cloud Integrations list.

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
<td markdown="span">Explicitly specify the access settings in a custom IAM policy, as discussed in [Giving Wavefront Limited Access](integrations_aws_overview.html#create-iam-policy-to-specify-limited-access).</td>
</tr>
</tbody>
</table>


### Give Wavefront Read-Only Access to Your Amazon Account

When you set up an AWS integration and grant Wavefront with limited or read-only access to your Amazon account, you need to provide an account ID and external ID. While the account ID is a constant value - the ID (in our case - Wavefront) to which you want to grant access to your resources, the external ID is not a constant value. The external ID is a secret identifier that is known by you and Wavefront (the third-party). The external ID is regenerated each time you reopen the AWS Integration setup page, and you cannot reuse it.

For information about External IDs and how they are used in AWS, see [How to Use External ID When Granting Access to Your AWS Resources](https://aws.amazon.com/blogs/security/how-to-use-external-id-when-granting-access-to-your-aws-resources/).


1. Log in to your AWS account.
1. Search for the **IAM** (AWS Identity and Access Management) service and click it.
1. Under **Access management** on the left, click **Roles**.
1. Click **Create role**.
1. Click the **Another AWS account** tile.
1. Enter the Wavefront account info:
   - Account ID - The account ID to which you want to grant access to your resources.
      
     The account ID is displayed on the Wavefront AWS Integration Setup page, after you click **How to get Role ARN**.
      
   - Select the option **Require external ID** and provide the external ID displayed on the Wavefront AWS Integration Setup page, after you click **How to get Role ARN**.
1. Click **Next: Permissions**.
1. On the **Attach permission policies** screen, search for and select the **ReadOnlyAccess** check box.
1. Click **Next: Tags** and skip the step by clicking **Next: Review**.
1. In the **Role name** text box, enter **Wavefront** and click **Create role**.
1. On the **Roles** page, click the newly created **Wavefront** role.
1. Copy the **Role ARN** value.
   

## Giving Wavefront Limited Access

Instead of giving Wavefront read-only access, you can give more limited access.

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

You can drill into the folder for a specific service and click a metric to navigate to a chart that displays that set of data. For example, clicking the folder `aws.ec2.`, then the metric `aws.ec2.cpuutilization`, and then refining the query by the `Region` point tag and the `topk` function yields the following chart:

![aws cpu utilization](images/aws_cpu_utilization.png)

### AWS Aggregate Metrics

All AWS metrics return the following aggregate metrics: average, maximum, minimum, sample count, and sum. To view the aggregate metrics,

1.  Search for a specific metric, for example `aws.ec2.cpuutilization`:

    ![aws cpu utilization folder](images/aws_cpu_utilization_metric.png)

2.  Click the metric folder, for example `aws.ec2.cpuutilization.`, to display the aggregate metrics:

    ![aws cpu utilization aggregate metrics](images/aws_cpu_utilization_aggregate_metrics.png)
