---
title: Hello Wavefront!
keywords:
tags: [tutorials]
sidebar: doc_sidebar
permalink: hello_wavefront_aws_tutorial.html
summary: Get Data into Wavefront from a Windows host or AWS.
---

Learn how to easily set up a Windows or AWS integration so that you can send data from your system to Wavefront.

## Video: Windows Integration

Watch the following video to learn how to ingest Windows host metrics into Wavefront. You can also watch the video <a href="https://bcove.video/3rXZ1RY" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.

<p>
<iframe src="https://bcove.video/3rXZ1RY" width="700" height="400" allowfullscreen="true" alt="Setting up a Windows integration"></iframe>
</p>


## Tutorial: AWS Integration

In this tutorial, you use the Wavefront Amazon Web Services (AWS) integration to:
* Send data of the applications and services that run on your AWS account to Wavefront.
* Visualize the data and identify problem areas once the data is in Wavefront.

It's an easy setup. You don't have to install anything or make changes to your application code.

Wavefront supports other cloud integrations, such as Google Cloud Platform (GCP), Microsoft Azure, and many other integrations. See [List of Wavefront Integrations](label_integrations%20list.html).

{% include tip.html content="If you are trying this tutorial to understand how to send data to Wavefront using an integration and don't have an application deployed on AWS, follow the optional step." %}

### Step 1: Log In To Wavefront

Follow these steps:

1. In your web browser, go to your Wavefront cluster (https://www.&lt;enter_cluster_name&gt;.waverfront.com), and log in. <br/>If you don’t have a cluster, [sign up for a free trial](https://tanzu.vmware.com/observability).
1. From the taskbar, click **Integrations**.
1. Select the **Amazon Web Services (AWS)** tile.
    <!--![Highlight the AWS integration on the Wavefront Integrations page.](images/hello_tutorial_aws_integration_tile.png)-->
1. Click the **Setup** tab and click **Add Integration**.
    ![Highlights the Add Integration button on the AWS integration's Setup tab.](images/hello_tutorial_aws_add_integration.png)

You need the **Account ID** and **External ID** printed under **How to get Role ARN** for the next step.

### Step 2: Create a Wavefront ReadOnly Role in Your AWS Account

{{site.data.alerts.note}}
<p>For this step, you need to log in to your <a href="https://aws.amazon.com/">AWS account</a>. Create a new AWS account if you don’t have one.</p>
{{site.data.alerts.end}}

Follow these steps:

1. On a web browser tab, log in to your AWS account.
1. Search for the **IAM** (AWS Identity and Access Management) service and click it to open the service.
1. Click **Roles** on the left panel and click **Create role**.
1. Create an AWS account:
    1. Select **Another AWS Account**.
    1. Enter the **Account ID**: Copy the **Account ID** value shown in the Wavefront AWS integration instructions and paste it here.
        ![A diagram that shows where the account ID is on the Wavefront integration and an arrow pointing how to copy and paste on the AWS account.](images/hello_tutorial_aws_account_ID.png)
    1. Select **Require external ID**.
        ![A screenshot of the external ID option selected.](images/hello_tutorial_aws_external_ID_selected.png)
    1. Enter the **External ID**. Copy the **External ID** value shown in the Wavefront AWS integration instructions and paste it here.
        ![A diagram that shows where the external ID is on the Wavefront integration and an arrow pointing how to copy and paste on the AWS account.](images/hello_tutorial_aws_external_ID.png)
    1. Click **Next: Permissions**.
1. Set Permissions:
    1. Search for the **ReadOnlyAccess** permission and select it.
        {% include note.html content="You get many results when you search for ReadOnlyAccess. Scroll down until you find ReadOnlyAccess, as shown in the screenshot below."%}
        ![A screenshot that shows the ReadOnlyAccess permission selected.](images/hello_tutorial_readonly_permission.png)
    1. Click **Next: Tags**. You don't have to set any tags.

1. Click **Next: Review**.
1. Set the **Role Name** as wavefront.
1. Click **Create role**.
1. Once the list of roles appears, click on wavefront (the role you just created), and copy the **Role ARN** value.

{% include note.html content="See [Giving Wavefront Limited Access](integrations_aws_overview.html#giving-wavefront-limited-access) if you want to specify a more restrictive IAM policy for Wavefront." %}

### Step 3: Configure the Wavefront AWS Integration

Go back to the Wavefront cluster where you opened the AWS integration tile previously, and follow these steps:

1. Paste the **Role ARN** value you copied in the previous step as the value for **“Role ARN” from Amazon IAM**.
1. Click **Register**.
    ![Screenshot of the AWS integration's configure section. The Register button is highlighted in red.](images/hell_tutorial_configure_aws_integration.png)

Wavefront can now connect to your AWS account and get data. Once the data starts flowing to Wavefront, you can visualize them. It will take a few minutes for the data to show in Wavefront.

### Step 4: (Optional) Launch an EC2 Instance

Don't have an application running on your AWS account? Follow the steps given below.
If you already have an application running on the AWS account, move to the next step and see how you can visualize your data.

1. Go back to your AWS account, search for the **EC2** service, and click it to open the service.
1. Follow the AWS documentation on [Launching an Amazon EC2 Instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-launch-instance).

<!--
1. Select **Launch Instance** and click **Launch Instance**.
    ![Screenshot showing the launch instance.](images/hello_tutorial_launch_instance.png)
1. Select **Free tier only** on the left panel and click **Select** on the image you want to run.
      {% include important.html content="You may still be charged for the use of some AWS products unless your infrastructure and service choices remain within the free usage tier. Therefore, make sure it is free to use." %}
1. Follow the steps to launch the instance.
1. You can select **proceed without a key pair** when prompted to select or create a new key pair.
      {% include important.html content="When you select **proceed without a key pair**, you are not able to SSH into the EC2 instance you deploy. Only use it for this tutorial, as it is not a recommended approach." %}
-->
Once the instance is launched, you start to see the data in Wavefront after a few minutes.

### Step 5: See Metrics and Visualize Data

Once the data starts flowing into Wavefront, you can see metrics and visualize data on dashboards:

<p><span style="font-size: large; font-weight: 500">View Metrics</span></p>
1. On the Wavefront Cluster, go to the AWS integration.
1. Select the **Metrics** tab.

You see charts with the metrics collected from your AWS account.

Example:
![Screenshots of the AWS metrics once the data starts to flow to Wavefront.](images/hello_tutorial_aws_metrics.png)
{% include note.html content="You see **No Data** if Wavefront can't find any metrics to match the queries in the chart." %}

<br/>
<p><span style="font-size: large; font-weight: 500">View Data on Dashboards</span></p>
Wavefront includes pre-defined dashboards for AWS that help you analyze and gather data.
1. Click **Dashboards**, to see a list of dashboards.
    ![Screenshot of all the predefined dashboards available for Wavefront.](images/hello_tutorial_aws_dahsboards.png)
1. Click **AWS: Summary**. From the Summary dashboard, you can easily navigate to all other AWS dashboards.
    {% include note.html content="You need to configure your AWS account preferences to send billing metrics to Wavefront. See [Configuring CloudWatch Billing Metrics](integrations_aws_metrics.html#configuring-cloudwatch-billing-metrics)." %}
    ![Screenshot of the predefined AWS summary dahsboard](images/hello_tutorial_aws_summary_dashboard.png)
{% include tip.html content="You can't edit the queries in these charts. If you want to customize the queries, you need to clone the dashboard and then update the queries in the charts. See [Edit or Clone a Dashboard](ui_dashboards.html#edit-or-clone-a-dashboard)" %}


## Next Steps

* For more information on the AWS integration, see [Amazon Web Services Integration](amazon_cloudfront.html).
* Try out the [DashboardsTutorial](tutorial_dashboards.html).
* [Learn about the metrics](wavefront_monitoring.html#aws-integration) that help you monitor CloudWatch requests, API requests, the point rate, and events coming in from your AWS integration.
