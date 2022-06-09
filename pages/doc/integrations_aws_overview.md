---
title: AWS Integration Overview
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_aws_overview.html
summary: Understand setup and services in the AWS integration.
---
Amazon Web Services (AWS) is a collection of cloud-computing services that provide an on-demand computing platform. The Amazon Web Services integration allows you to ingest metrics directly from AWS.

You can use the Amazon Web Services integration for initial setup, but additional steps might be needed for some of the services. This page gives an overview.

{% include note.html content="You must have the [**Proxy Management** permission](permissions_overview.html) to set up an AWS integration. If you do not have permission, the UI menu selections, buttons, and links you use to perform the tasks are not visible." %}

## Basics

The AWS integration ingests data from many Amazon and AWS products including:

- **[CloudWatch](http://aws.amazon.com/cloudwatch)** -- retrieves AWS [metric and
dimension](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CW_Support_For_AWS.html) data. Includes some metrics for Amazon Relational Database (RDS).
- **[CloudTrail](http://aws.amazon.com/cloudtrail)** -- retrieves EC2 event information and creates Tanzu Observability by Wavefront System events that represent the AWS events.
- **[AWS Metrics+](integrations_aws_metrics.html#aws-metrics-data)** -- retrieves additional metrics using AWS APIs other than CloudWatch. Data include EBS volume data and  EC2 instance metadata like tags. You can investigate billing data  and the number of reserved instances. Be sure to enable AWS+ metrics because it allows Tanzu Observability by Wavefront to optimize its use of CloudWatch, and saves money on CloudWatch calls as a result.

{% include tip.html content="See [AWS CloudWatch, CloudTrail, and Metrics+ Integrations](integrations_aws_metrics.html)." %}

### Establish a Trust Relationship

Adding an AWS integration requires establishing a trust relationship between Amazon and Tanzu Observability by specifying account information. You have to do that only once, and you have 2 options:

* [Give Global Read-Only Access](#give-read-only-access-to-your-amazon-account-and-get-the-role-arn)
* [Give Limited Access](#giving-limited-access)

After you've set up the integration, you can examine metrics from all AWS services that you subscribe to from Tanzu Observability. The integration includes a predefined dashboard for each service. You can clone and modify the system dashboards, or create your own custom dashboard.

<!--### Use Internal Metrics to Monitor AWS Integrations

You can use some Tanzu Observability by Wavefront internal metrics to [monitor your AWS Integration](wavefront_monitoring.html#aws-integration).-->

### AWS Dashboards

If you set up an [Amazon Web Services integration](integrations.html), Tanzu Observability installs AWS overview dashboards Summary, Pricing, and Billing and the AWS service-specific dashboards: EC2, ECS, ELB, DynamoDB, Lambda, Redshift, and so on. All AWS dashboards have a tag `~integration.aws.<service>`. For example: `~integration.aws.ec2`, `~integration.aws.lambda`, etc.

{% include shared/system_dashboard.html %}


## Giving Tanzu Observability Access to Your AWS Account

Data flows from AWS only if the account has the required access. You have several options:

<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr>
<td>ReadOnlyAccess policy (most services)</td>
<td markdown="span">In most cases, it makes sense to give the `ReadOnlyAccess` policy to the Amazon account.</td></tr>
<tr>
<td markdown="span">Access to Service Limit metrics</td>
<td markdown="span">If you want to collect Service Limit metrics:
  - You need at least the Business-level AWS Support plan
  - Grant the `AWSSupportAccess` policy (in addition to the `ReadOnlyAccess` policy)</td>
</tr>
<tr>
<td markdown="span">Create IAM policy to specify limited access</td>
<td markdown="span">Explicitly specify the access settings in a custom IAM policy, as discussed in [Giving Limited Access](#create-iam-policy-to-specify-limited-access).</td>
</tr>
</tbody>
</table>


### Give Read-Only Access to Your Amazon Account and Get the Role ARN

To grant Tanzu Observability with read-only access to your Amazon account, you need to provide an account ID and external ID. While the account ID is a constant value - the ID (in our case - the Wavefront ID) to which you want to grant access to your resources, the external ID is not a constant value. The external ID is a secret identifier that is known by you and Tanzu Observability by Wavefront (the third-party). The external ID is time-sensitive and regenerated each time you reopen the AWS Integration setup page, and you cannot reuse it.

For information about external IDs and how they are used in AWS, see [How to Use External ID When Granting Access to Your AWS Resources](https://aws.amazon.com/blogs/security/how-to-use-external-id-when-granting-access-to-your-aws-resources/).

#### GUI Method

<p><span style="font-size: medium; font-weight: 500">Step 1: Get the Account ID and the External ID</span></p>

To set up the integration, you need an account ID and an external ID. To get the account ID and the external ID, do the following:

1. Log in to your Wavefront cluster.
2. Click **Integrations** on the toolbar and click the **Amazon Web Services** integration tile. 
3. Click the **Set up integration** button.
4. Click the **CloudWatch and Metrics+** or **CloudWatch, Metrics+, and CloudTrail** tile and click **Next**. 
5. Click the **How to get Role ARN** link and click the **AWS UI Method** tab.
6. Copy the **Account ID** and the **external ID** displayed in the instructions.
     
<p><span style="font-size: medium; font-weight: 500">Step 2: Create a Role in AWS</span></p>

1. Log in to your AWS account.
1. Search for the **IAM** (AWS Identity and Access Management) service and click it.
1. Under **Access management** on the left, click **Roles**.
1. Click **Create role**.
1. Click the **AWS account** tile, and select the **Another AWS account** radio button.
1. Enter the Wavefront account information.           
   - **Account ID** - The identifier of the Wavefront account to which you want to grant access.   
   - Select the option **Require external ID** and provide the external ID. 
     
1. Click **Next**.
1. On the **Add permissions** screen, search for, and select the **ReadOnlyAccess** check box.
1. Click **Next**.
1. In the **Role name** text box, provide a unique name of the role and click **Create role**.
1. On the **Roles** page, click the newly created role.
1. Copy the **ARN** value, so that you can use it when you configure your AWS integration.

#### CLI Method

1. Log in to your AWS account, and open the [AWS Command Line Interface](https://aws.amazon.com/cli/).
2. Create a role in AWS.
   
      1. In a new web browser tab, log in to your Wavefront cluster and click **Integrations** on the toolbar.
      1. In the Featured section, click the **Amazon Web Services** tile.
      1. Click the **Setup** tab and click **Add Integration**.   
      1. Click the **CloudWatch and Metrics+** or **CloudWatch, Metrics+, and CloudTrail** tile and click **Next**.
      1. Click the **How to get Role ARN?** link.
      1. On the **AWS CLI Method** tab, under **Step 1** of the interactive help page, enter the stack and role names.
         ![Screenshot of the AWS CLI method interactive help page.](images/aws-rolearn-cli-method.png)
      1. Copy the command displayed in **Step 2** of the interactive help page. 
      1. Run the copied command in the [AWS CLI](https://aws.amazon.com/cli/).
3. In the [AWS CLI](https://aws.amazon.com/cli/) retrieve the Role ARN by running the command:

   ```aws iam get-role --role-name <role name>
   ``` 
   Here, `<role name>` is the name of the role you just created, for example `wavefront`.
   
   In the output, the Role ARN is listed as a value of the `"Arn"` property.
   
4. Copy the **Role ARN** value, so that you can use it (i.e. paste it in the **Role ARN" from Amazon IAM** text box) when you configure your AWS integration.   

      
### Giving Limited Access

Instead of giving global read-only access, you can give more limited access.

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
    <td>Retrieves EC2 event information and creates Tanzu Observability System events </td>
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

## Managing an AWS Integration

You can set up an AWS integration, enable and disable it, and delete it. After you set up an AWS integration, you can register more services to it. You can also [add and manage AWS integrations by using the Wavefront REST API](integrations_aws_overview_API.html).

### Set up an AWS Integration

To set up an AWS integration, you must have a [Role ARN](#give-read-only-access-to-your-amazon-account-and-get-the-role-arn) handy. 

1. Log in to your Wavefront instance and click **Integrations** on the toolbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. Click the **Set up integration** button.   
1. Select the AWS services to register and click **Next**.
   * **CloudWatch and Metrics+**
   * **CloudWatch, Metrics+, and CloudTrail**

1. Configure the integration properties:
     - **Name** - Name to identify the integration.
     - **Role ARN from Amazon IAM** - The Role ARN from your Amazon account.
1. If you selected to configure **CloudWatch, Metrics+, and CloudTrail**, you must also provide the CloudTrail settings.
    <table>
    <tbody>
    <thead>
    <tr><th width="25%">Option</th><th width="75%">Description</th></tr>
    </thead>
    <tr>
    <td><strong>Bucket Name</strong></td>
    <td>Enter the S3 bucket containing CloudTrail logs.<p> In your AWS account, go to <stong>CloudTrail &gt; Trails</stong> to see the bucket name.</p>
    </td>
    </tr>
    <tr>
    <td>(Optional) <strong>Prefix</strong></td>
    <td>A log file prefix specified when you created the CloudTrail. <p>The default prefix is <code>AWSLogs</code>. If you use a custom prefix, you must put it here without using a forward slash at the end of the prefix, i.e. a trailing slash.</p>
    </td>
    </tr>
    <tr>
    <td><strong>CloudTrail Region</strong></td>
    <td>AWS Region where the CloudTrail logs reside.
    </td>
    </tr>
    </tbody>
    </table>
     
     
1. Click **Register**. 

The integration is added to the Amazon Web Services Integrations list. If you want to configure allow lists and service refresh rate for the CloudWatch integration, follow the instructions in [Configuring CloudWatch Data Ingestion](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion).


### Register Additional Amazon Web Services

After you set up the AWS integration with a [Role ARN](#give-read-only-access-to-your-amazon-account-and-get-the-role-arn), you can additionally register more Amazon Web services.

1. In your Wavefront instance, click **Integrations** on the toolbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. On the **Overview** tab, click the ellipsis icon next to an instance, click **Add** and select an option.
   * To register an AWS Metrics+ service, select **AWS Metrics+**, and configure the following integration properties:
      
      1. **Name** -- Name to identify the integration.
      2. **Role ARN** -- Select the Role ARN of your Amazon account from the drop-down menu.
   
   * To register a CloudTrail service, select **CloudTrail**, and configure the following integration properties:
      
      1. **Name** - Name to identify the integration.
      2. **Role ARN** -- Select the Role ARN of your Amazon account from the drop-down menu.
      3. **Bucket Name** -- The S3 bucket that contains CloudTrail logs. 
         
         In AWS, go to **CloudTrail** &gt;**Trails** to see the bucket name.
         
      4. **Prefix** -- A log file prefix specified when you created the CloudTrail. 
         
         The default prefix is `AWSLogs`. If you use a custom prefix, you must put it here without using a forward slash at the end of the prefix, i.e. a trailing slash.
         
      5. **Region** -- AWS Region where the CloudTrail logs reside.
       
   * To register a CloudWatch service, select **Register CloudWatch**, and configure the following integration properties:
   
      1. **Name** -- Name to identify the integration.
      2. **Role ARN** -- Select the Role ARN of your Amazon account from the drop-down menu.
      3. Allow Lists and Service Refresh Rate -- see [Configuring CloudWatch Data Ingestion](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion).
     
1.  Click **Register**. The selected integrations are created and added to the Cloud Integrations list.

### Enable and Disable AWS Integrations

Tanzu Observability automatically disables integrations that are experiencing errors due to invalid credentials. To enable an integration after the credential has been corrected or to manually disable an integration:

1. In your Wavefront instance, click **Integrations** on the toolbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. On the **Overview** tab search for the instance that you want to enable or disable.
1. In the row that contains the integration that you want to enable or disable, click the ellipsis icon, and select an option.
   * **Enable** > **[Service Name]** 
   * **Disable** > **[Service Name]**
   
   You can select to enable and disable a CloudWatch, Metrics+, or CloudTrail service.


### Delete AWS Integrations

You can delete an AWS integration if you no longer need it. New metrics will no longer be fetched from the AWS integration that you deleted. However, existing metrics are not affected.

1. In your Wavefront instance, click **Integrations** on the toolbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. On the **Overview** tab search for and select the instance that you want to delete.
1. Click the **Delete** button and confirm.

In addition, you can also delete a single service within an integration instance.

1. In the row that contains the integration service that you want to delete, click the ellipsis icon, and select **Delete** > **[Service Name]**.
1. Confirm the deletion.


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
