---
title: Hello Wavefront!
keywords:
tags: [tutorials]
sidebar: doc_sidebar
permalink: hello_wavefront_aws_tutorial.html
summary: Get data from a Windows host or Amazon Web Services.
---

Learn how to easily set up the Windows and Amazon Web Services integrations so that you can send data from your system to Tanzu Observability by Wavefront.

## Video: Windows Integration

Watch the following video to learn how to ingest Windows host metrics. You can also watch the video <a href="https://bcove.video/3rXZ1RY" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.

<p>
<iframe src="https://bcove.video/3rXZ1RY" width="700" height="400" allowfullscreen="true" alt="Setting up a Windows integration"></iframe>
</p>


## Tutorial: AWS Integration

In this tutorial, you use the Amazon Web Services (AWS) integration to:
* Send data of the applications and services that run on your AWS account to Tanzu Observability by Wavefront.
* Visualize the data and identify problem areas once the data is in the Tanzu Observability by Wavefront GUI.

It's an easy setup. You don't have to install anything or make changes to your application code.

We support other cloud integrations, such as Google Cloud Platform (GCP), Microsoft Azure, and many other integrations. See [List of Wavefront Integrations](label_integrations%20list.html).

{% include tip.html content="If you are trying this tutorial to understand how to send data by using an integration and don't have an application deployed on AWS, follow the optional step." %}

### Step 1: Log In to Your Wavefront Instance

Follow these steps:

1. In a web browser, go to your Wavefront instance (https://www.&lt;enter_cluster_name&gt;.waverfront.com), and log in. <br/>If you don’t have a cluster, [sign up for a free trial](https://tanzu.vmware.com/observability).
1. Click **Integrations** on the toolbar
1. Under Featured, click the **Amazon Web Services (AWS)** tile.
    <!--![Highlight the AWS integration on the Wavefront Integrations page.](images/hello_tutorial_aws_integration_tile.png)-->
1. Click the **Setup** tab and click **Add Integration**.
    ![Highlights the Add Integration button on the AWS integration's Setup tab.](images/hello_tutorial_aws_add_integration.png)
1. Click the **CloudWatch & Metrics+** tile and click **Next**.
1. Click the **How to get Role ARN** link and click the **AWS UI Method** tab.

You need the **Account ID** and **External ID** displayed under **How to get Role ARN** for the next step.

### Step 2: Create a Wavefront Read-Only Role in Your AWS Account

{{site.data.alerts.note}}
<p>For this step, you need to log in to your <a href="https://aws.amazon.com/">AWS account</a>. Create a new AWS account if you don’t have one.</p>
{{site.data.alerts.end}}

Follow these steps:

1. In a web browser, log in to your AWS account.
1. Search for the **IAM** (AWS Identity and Access Management) service and click it to open the service.
1. Click **Roles** in the left panel and click **Create role**.
1. Create an AWS account:
    1. Click the **AWS Account** tile and select the **Another AWS account** radio button.
    1. Enter the **Account ID**. 
    
       Copy the **Account ID** value shown in the AWS integration setup instructions and paste it here.
        ![A diagram that shows where the account ID is on the Wavefront integration and an arrow pointing how to copy and paste on the AWS account.](images/hello_tutorial_aws_account_ID.png)
    1. Select **Require external ID**.
        ![A screenshot of the external ID option selected.](images/hello_tutorial_aws_external_ID_selected.png)
    1. Enter the **External ID**. 
    
       Copy the **External ID** value shown in the AWS integration setup instructions and paste it here.
        ![A diagram that shows where the external ID is on the Wavefront integration and an arrow pointing how to copy and paste on the AWS account.](images/hello_tutorial_aws_external_ID.png)
    1. Click **Next**.
1. Set Permissions:
    1. Search for the **ReadOnlyAccess** permission and select it.
        {% include note.html content="You get many results when you search for ReadOnlyAccess. Scroll down until you find ReadOnlyAccess, as shown in the screenshot below."%}
        ![A screenshot that shows the ReadOnlyAccess permission selected.](images/hello_tutorial_readonly_permission.png)
    1. Click **Next**.

1. Set the **Role name** as `wavefront`.
1. Click **Create role**.
1. Once the list of roles appears, click `wavefront` (the role you just created), and copy the **ARN** value.

{% include note.html content="See [Giving Wavefront Limited Access](integrations_aws_overview.html#giving-wavefront-limited-access) if you want to specify a more restrictive IAM policy for Wavefront." %}

### Step 3: Configure the AWS Integration

Go back to the Wavefront cluster where you opened the AWS integration tile, and follow these steps:

1. Provide a name for the integration.
1. Paste the **Role ARN** value you copied in the previous step as the value for **“Role ARN” from Amazon IAM**.
1. Click **Register**.

Tanzu Observability by Wavefront can now connect to your AWS account and get data. Once the data starts flowing, you can visualize them. It will take a few minutes for the data to show.

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

Once the data starts flowing, you can see metrics and visualize data on dashboards:

<p><span style="font-size: large; font-weight: 500">View Metrics</span></p>
1. In your Wavefront instance, go to the AWS integration.
1. Click the **Metrics** tab.

You see charts with the metrics collected from your AWS account.

Example:
![Screenshots of the AWS metrics once the data starts to flow to Wavefront.](images/hello_tutorial_aws_metrics.png)
{% include note.html content="You see **No Data** if Wavefront can't find any metrics to match the queries in the chart." %}

<br/>
<p><span style="font-size: large; font-weight: 500">View Data on Dashboards</span></p>
Tanzu Observability includes system dashboards for the AWS integration that help you analyze and gather data.
1. To see a list of the system dashboards, click **Dashboards**.
    ![Screenshot of all the predefined dashboards available for Wavefront.](images/hello_tutorial_aws_dahsboards.png)
1. Click **AWS: Summary**. From the Summary dashboard, you can easily navigate to all other AWS dashboards.
    {% include note.html content="You need to configure your AWS account preferences to send billing metrics. See [Configuring CloudWatch Billing Metrics](integrations_aws_metrics.html#configuring-cloudwatch-billing-metrics)." %}
    ![Screenshot of the predefined AWS summary dashboard](images/hello_tutorial_aws_summary_dashboard.png)
{% include tip.html content="You can't edit the dashboards and the queries in the charts. If you want to customize the dashboards or the queries, you must clone the dashboard and then update the queries in the charts. See [Edit or Clone a Dashboard](ui_dashboards.html#edit-or-clone-a-dashboard)." %}


## Next Steps

* For more information on the AWS integration, see [Amazon Web Services Integration](integrations_aws_overview.html).
* You can even try to [setup and manage the AWS integration by using the API](integrations_aws_overview_API.html).
* Try out the [Dashboards Tutorial](tutorial_dashboards.html).
