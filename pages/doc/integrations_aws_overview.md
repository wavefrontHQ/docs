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

Before setting up the integration, you can take a look at what is included in the integration and what metrics will be collected.

![The AWS integration overview page before setup where the alerts tile is selected.](images/aws_before_setup.png)

### Establish a Trust Relationship

Adding an AWS integration requires establishing a trust relationship between Amazon and Tanzu Observability by specifying account information. You have to do that only once, and you have 2 options:

* [Give Global Read-Only Access](#give-read-only-access-to-your-amazon-account-and-get-the-role-arn)
* [Give Limited Access](#giving-limited-access)

After you set up the integration, you can examine metrics from all AWS services that you subscribe to from Tanzu Observability. The integration includes a predefined dashboard for each service. You can clone and modify the system dashboards, or create your own custom dashboards.

<!--### Use Internal Metrics to Monitor AWS Integrations

You can use some Tanzu Observability by Wavefront internal metrics to [monitor your AWS Integration](wavefront_monitoring.html#aws-integration).-->

### AWS Dashboards

If you set up an [Amazon Web Services integration](integrations.html), Tanzu Observability installs AWS overview dashboards Summary, Pricing, and Billing, as well as the AWS service-specific dashboards: EC2, ECS, ELB, DynamoDB, Lambda, Redshift, and so on. All AWS dashboards have a tag `~integration.aws.<service>`. For example: `~integration.aws.ec2`, `~integration.aws.lambda`, etc.

{% include shared/system_dashboard.html %}


![The AWS integration overview page after setup where the dashboards tab is selected.](images/aws-setup-dashboards-tab.png)


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
<td>Access to Service Limit metrics</td>
<td>If you want to collect Service Limit metrics:
   <ul><li> You need at least the Business-level AWS Support plan</li>
   <li>Grant the <code>AWSSupportAccess</code> policy (in addition to the <code>ReadOnlyAccess</code> policy)</li>
   </ul></td>
</tr>
<tr>
<td markdown="span">Create a policy to specify limited access</td>
<td markdown="span">Explicitly specify the access settings in a custom IAM policy.</td>
</tr>
</tbody>
</table>


### Give Read-Only Access to Your Amazon Account and Get the Role ARN

To grant Tanzu Observability with read-only access to your Amazon account, you need to create a role and provide an account ID and external ID. While the account ID is a constant value - the ID (in our case - the Wavefront ID) to which you want to grant access to your resources, the external ID is not a constant value. The external ID is a secret identifier that is known by you and Tanzu Observability by Wavefront (the third-party). The external ID is time-sensitive and regenerated each time you reopen the AWS Integration setup page, and you cannot reuse it.

For information about external IDs and how they are used in AWS, see [How to Use External ID When Granting Access to Your AWS Resources](https://aws.amazon.com/blogs/security/how-to-use-external-id-when-granting-access-to-your-aws-resources/).

<a name="GUI"></a> 

<p><span style="font-size: medium; font-weight: 800">GUI Method</span></p>

<a name="GetIDs"></a>


**Task 1: Get the Account ID and the External ID**

To get the account ID and the external ID, do the following:

1. Log in to your Wavefront cluster.
2. Click **Integrations** on the toolbar and click the **Amazon Web Services** integration tile. 
3. Click the **Set Up Integration** button.
4. Select which services you want to set up and click **Next**.
   * **CloudWatch & Metrics+**
   * **CloudWatch & Metrics+ & CloudTrail** 
5. Click the **How to get Role ARN** link and click the **AWS UI Method** tab.
6. Copy the **Account ID** and the **external ID** displayed in the instructions.

![The AWS setup page after clicking How to get Role ARN link and the AWS UI Method tab selected.](images/hello_tutorial_aws_integration_UI-setup.png)

<a name="CreateRole"></a>

**Task 2: Create a Role in AWS**

1. Log in to your AWS account.
1. Search for the **IAM** (AWS Identity and Access Management) service and click it.
1. Under **Access management** on the left, click **Roles**.
1. Click **Create role**.
1. Click the **AWS account** tile, and select the **Another AWS account** radio button.
1. Paste the copied Wavefront account information.           
   1. **Account ID** - The identifier of the Wavefront account to which you want to grant access.   
   2. Select the option **Require external ID** and provide the external ID. 
     
1. Click **Next**.
1. On the **Add permissions** screen, search for, and select the **ReadOnlyAccess** check box.

   You get many results when you search for ReadOnlyAccess. Scroll down and browse through the pages until you find ReadOnlyAccess or click the **Policy name** column name to get the results sorted in reverse alphabetical order.

1. Click **Next**.
1. In the **Role name** text box, provide a unique name of the role and click **Create role**.

<a name="GetRoleArn"></a>

**Task 3: Get the Role ARN**

1. On the **Roles** page, click the newly created role.
1. Copy the **ARN** value, so that you can use it when you configure your AWS integration. See Step 5 in [Set up an AWS Integration](#set-up-an-aws-integration).

<a name="CLI"></a> 
<p><span style="font-size: medium; font-weight: 800">CLI Method</span></p>

By using this method, the process for getting the account ID and the external ID as well as the creation of a role in AWS is automated.

**Task 1: Create a role in AWS**

1. Log in to your Wavefront cluster and click **Integrations** on the toolbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. Click the **Set Up Integration** button.
1. Select which services you want to set up and click **Next**.
   * **CloudWatch & Metrics+**
   * **CloudWatch & Metrics+ & CloudTrail** 
1. Click the **How to get Role ARN?** link.
1. On the **AWS CLI Method** tab, under **Step 1** of the interactive help page, enter the stack and role names.
   ![Screenshot of the AWS CLI method interactive help page.](images/aws-rolearn-cli-method.png)

1. Copy the command displayed in **Step 2** of the interactive help page. 
1. In another web browser page log in to your AWS account, open the [AWS Command Line Interface](https://aws.amazon.com/cli/), and run the copied command.

**Task 2: Get the Role ARN**

1. Copy the command displayed in **Step 3** of the interactive help page and run it in the [AWS Command Line Interface](https://aws.amazon.com/cli/).

   ```aws iam get-role --role-name wavefront
   ``` 
  
   Here, `wavefront` is the name of the role you just created.
   
   In the output, the Role ARN is listed as a value of the `"Arn"` property.
   
1. Copy the **Role ARN** value, so that you can use it (i.e. paste it in the **Role ARN" from Amazon IAM** text box) when you set up your AWS integration. See Step 5 in [Set up an AWS Integration](#set-up-an-aws-integration).

      
### Giving Limited Access

Instead of giving global read-only access, you can give Tanzu Observability more limited access. To do this, when you create a role in AWS, instead of providing **ReadOnlyAccess**, you can either create a policy with the required permissions and assign it to the role, or select an existing policy.

<a name="policy"></a>

**Task 1: Create a Policy in AWS**

To create a permission policy in AWS that you can use when you create the role with limited access, follow these steps:

1. Log in to your AWS account.
1. Search for the **IAM** (AWS Identity and Access Management) service and click it.
1. Under **Access management** on the left, click **Policies**.
1. Click **Create Policy**. 
    * On the **Visual Editor** tab, you can select a service and set the permissions manually. See [Required Permissions for Limited Access](#required_permissions).
      1. Search for and select a service.
      1. Specify the actions allowed in the selected service.
      1. Select the resources, as necessary.
      1. (Optional) Request conditions.
      
    * On the **JSON** tab, you can enter a JSON snippet. See [An Example Snippet of a Policy](#example_snippet).
  
1. Click **Next: Tags** and click **Next: Review**.
1. On the **Review policy** page provide a name and, optionally, a description of the policy and click **Create policy**.


**Task 2: Create a Role with Limited Access in AWS**

After you create the policy with the required permissions, create a role with limited access.

1. Retrieve the account ID and the external ID by following the steps in [Task 1 of the GUI method](#GetIDs).
2. Create a role in AWS.
  
    1. Log in to your AWS account.
    1. Search for the **IAM** (AWS Identity and Access Management) service and click it.
    1. Under **Access management** on the left, click **Roles**.
    1. Click **Create role**.
    1. Click the **AWS account** tile, and select the **Another AWS account** radio button.
    1. Paste the copied Wavefront account information.           
       1. **Account ID** - The identifier of the Wavefront account to which you want to grant access.   
       2. Select the option **Require external ID** and provide the external ID. 
         
    1. Click **Next**.
    1. On the **Add permissions** screen, search for, and select the check box of the policy you have created.
    1. Click **Next**.
    1. In the **Role name** text box, provide a unique name of the role and click **Create role**.

3. Get the Role ARN by following the steps in [Task 3 of the GUI method](#GetRoleArn).

<a name="required_permissions"></a>

<p>
<span style="font-size: medium; font-weight: 800">Required Permissions for Limited Access</span></p>

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

<a name="example_snippet"></a>

<p>
<span style="font-size: medium; font-weight: 800">An Example JSON Snippet of a Policy</span></p>

You can explicitly specify the limited access permissions in a custom IAM policy, as shown in the following example JSON snippet.

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

You can set up an AWS integration, enable and disable it, edit an integration, and delete it. After you set up an AWS integration, you can register more services to it. You can also [add and manage AWS integrations by using the Wavefront REST API](integrations_aws_overview_API.html).

### Set up an AWS Integration

To set up an AWS integration, you must have a **Role ARN** handy. 

1. Log in to your Wavefront instance and click **Integrations** on the toolbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. Click the **Set Up Integration** button.   
1. Select the AWS services to register and click **Next**.
   * **CloudWatch and Metrics+**
   * **CloudWatch, Metrics+, and CloudTrail**
   
   ![AWS setup page where we can click a tile.](images/aws_setup.png)
   
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
    <td>Enter the S3 bucket containing CloudTrail logs.<p> In your AWS account, go to <strong>CloudTrail &gt; Trails</strong> to see the bucket name.</p>
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

The integration is added to the Amazon Web Services Integrations list. You can now see it on the **Overview** tab and manage it from this tab. 

![Image of the overview tab of the AWS integration after we have set up several integrations.](images/aws-after-setup-overview.png)

If you want to configure allow lists and service refresh rate for the CloudWatch integration, follow the instructions in [Configuring CloudWatch Data Ingestion](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion).


### Register Additional Amazon Web Services

After you set up the AWS integration with a [Role ARN](#give-read-only-access-to-your-amazon-account-and-get-the-role-arn), you can additionally register more Amazon Web services.

1. In your Wavefront instance, click **Integrations** on the toolbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. On the **Overview** tab, click the ellipsis icon next to an instance, click **Add**, and select an option.
   * To register an AWS Metrics+ service, select **AWS Metrics+** and configure the following integration properties:
      
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
       
   * To register a CloudWatch service, select **CloudWatch**, and configure the following integration properties:
   
      1. **Name** -- Name to identify the integration.
      2. **Role ARN** -- Select the Role ARN of your Amazon account from the drop-down menu.
      3. Allow Lists and Service Refresh Rate -- see [Configuring CloudWatch Data Ingestion](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion).
     
1.  Click **Register**. 


### Enable and Disable AWS Integrations

Tanzu Observability automatically disables integrations that are experiencing errors due to invalid credentials. To enable an integration after the credential has been corrected or to manually disable an integration:

1. In your Wavefront instance, click **Integrations** on the toolbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. On the **Overview** tab search for the instance that you want to enable or disable.
1. In the row that contains the integration that you want to enable or disable, click the ellipsis icon, and select an option.
   * **Enable** > **[Service Name]** 
   * **Disable** > **[Service Name]**
   
   You can select to enable and disable a CloudWatch, Metrics+, or CloudTrail service.

### Edit an AWS Integration

You can edit your AWS integrations. You cannot edit the Role ARN, only some of the settings are editable.

1. In your Wavefront instance, click **Integrations** on the toolbar.
1. In the Featured section, click the **Amazon Web Services** tile.
1. On the **Overview** tab, click the ellipsis icon next to an instance, click **Edit**, and select an option.
   * To edit an AWS Metrics+ service, select **AWS Metrics+** and edit the name of the integration.
      
   * To edit a CloudTrail service, select **CloudTrail**, and edit the following integration properties:
      
      1. **Name** -- Name to identify the integration.
      2. **Bucket Name** -- The S3 bucket that contains CloudTrail logs. 
         
         In AWS, go to **CloudTrail** &gt;**Trails** to see the bucket name.
         
      3. **Prefix** -- A log file prefix specified when you created the CloudTrail. 
         
         The default prefix is `AWSLogs`. If you use a custom prefix, you must put it here without using a forward slash at the end of the prefix, i.e. a trailing slash.
         
      4. **Region** -- AWS Region where the CloudTrail logs reside.
       
   * To edit a CloudWatch service, select **CloudWatch**, and configure the following integration properties:
   
      1. **Name** -- Name to identify the integration.
      2. **Role ARN** -- Select the Role ARN of your Amazon account from the drop-down menu.
      3. Allow Lists, Service Refresh Rate, and Products -- see [Configuring CloudWatch Data Ingestion](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion).
     
1.  Click **Update**. 

The selected integration is edited.


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

Once metrics start flowing, you can view them on the **Metrics** tab.

You can drill down into the folder for a specific service and click a metric to navigate to a chart that displays that set of data. 

![Screenshot of the AWS metrics once the data starts to flow to Wavefront.](images/hello_tutorial_aws_metrics.png)

For example:

1. Click the folder `aws.ec2.`.
2. Click the metric `aws.ec2.cpuutilization`
3. Refine the query by the `Region` point tag and the `topk` function.

You'll see a chart similar to:

![aws cpu utilization](images/aws_cpu_utilization.png)


### AWS Aggregate Metrics

All AWS metrics return the following aggregate metrics: average, maximum, minimum, sample count, and sum. To view the aggregate metrics:

<table>
<tbody>
<tr>
<td>1. On the <strong>Metrics</strong> tab, search for a specific metric, for example <code>ec2.cpuutilization</code>:</td>
<td><img src="/images/aws_cpu_utilization_metric.png" alt="AWS CPU utilization folder. ">
</td>
</tr>
<tr>
<td>2. Click the metric folder, for example <code>aws.ec2.cpuutilization.</code>, to display the aggregate metrics:
</td>
<td><img src="/images/aws_cpu_utilization_aggregate_metrics.png" alt="AWS CPU utilization aggregate metrics. ">
</td>
</tr>
</tbody>
</table>
