---
title: Hello Wavefront - AWS Integration Tutorial
keywords:
tags: [tutorials]
sidebar: doc_sidebar
permalink: hello_wavefront_aws_tutorial.html
summary: Configure Wavefront with Amazon Web Services (AWS).
---

In this tutorial, you use the Wavefront Amazon Web Services (AWS) integration to query and send data of the applications that run on your AWS instance to Wavefront. It's an easy setup. You don't have to install anything or make changes to your application code. Wavefront supports other cloud integrations, such as Google Cloud Platform (GCP), Microsoft Azure, and many other integrations. See [List of Wavefront Integrations](label_integrations%20list.html).

{% include tip.html content="If you are trying this tutorial to understand how to send data to Wavefront using an integration and don't have an application deployed on AWS, follow the optional step." %}

## Step 1: Log In To Wavefront

Log in to your Wavefront account and follow these steps:

1. In your web browser, go to your Wavefront cluster and log in.
1. From the taskbar, click **Integrations**.
1. Select the **Amazon Web Services (AWS)** tile.
    <!--![Highlight the AWS integration on the Wavefront Integrations page.](images/hello_tutorial_aws_integration_tile.png)-->
1. Click the **Setup** tab and click **Add Integration**.
    ![Highlights the Add Integration button on the AWS integration's Setup tab.](images/hello_tutorial_aws_add_integration.png)

You need the **Account ID** and **External ID** printed under **How to get Role ARN** for the next step. 

## Step 2: Configuring Your AWS Account

Follow these steps:

1. On a web browser tab, navigate to Amazon Web Services (AWS) and log in to your AWS account. <br/>If you don't have an account, you can create a new account.
1. Search for the **IAM** (AWS Identity and Access Management) service and click it to open the service.
1. Click **Roles** on the left panel and click **Create role**.
1. Create an AWS account:
    1. Select **Another AWS Account**.
    1. Enter the **Account ID**: Copy the **Account ID** value shown in the Wavefront AWS integration instructions and paste it here.
        ![A diagram that shows where the account ID is on the Wavefront integration and an arrow pointing how to copy and paste on the AWS account.](images/hello_tutorial_aws_account_ID.png)
    1. Select **Require external ID**.
    1. Enter the **External ID**. Copy the **External ID** value shown in the Wavefront AWS integration instructions and paste it here.
        ![A diagram that shows where the external ID is on the Wavefront integration and an arrow pointing how to copy and paste on the AWS account.](images/hello_tutorial_aws_external_ID.png)
    1. Click **Next: Permissions**.
1. Set Permissions:
    1. Search for the **ReadOnlyAccess** permission and select it.
        {% include note.html content="You get many results when you search for ReadOnlyAccess. Scroll down until you find what is shown in the screenshot below."%}
        ![A screenshot that shows the ReadOnlyAccess permission selected.](images/hello_tutorial_readonly_permission.png)
    1. Click **Next: Tags**. You don't have to set any tags. 
  
1. Click **Next: Review**.
1. Set the **Role Name** as Wavefront and click **Create role**.
1. Once the lists of roles appear, click on wavefront (the role you just created), and copy the **Role ARN** value.

## Step 3: Configure the Wavefront AWS Integrations

Go back to the Wavefront cluster where you opened the AWS integration tile previously, and follow these steps:

1. Paste the **Role ARN** value you copied in the previous step for **“Role ARN” from Amazon IAM**.
1. Click **Register**.
    ![Screenshot of the AWS integration's configure section. The Register button is highlighted in red.](images/hell_tutorial_configure_aws_integration.png)

Wavefront is now able to connect to your AWS instance and get data. Once the data starts flowing to Wavefront, you can visualize them. It will take a few minutes for the data to show in Wavefront.

## Step 4: (Optional) Launch an EC2 Instance

Don't have an application running on your AWS instance? Follow these steps. If you already have an application running on the AWS instance, move to the next step and see how you can visualize your data.

1. Go back to your AWS account, search for the **EC2** service, and click it to open the service.
1. Select **Launch Instance** and click **Launch Instance**.
    ![Screenshot showing the launch instance.](images/hello_tutorial_launch_instance.png)
1. Select **Free tier only** on the left panel and click **Select** on the image you want to run.
      {% include important.html content="You may still be charged for the use of some AWS products unless your infrastructure and service choices remain within the free usage tier. Therefore, make sure it is free to use." %}
1. Follow the steps to launch the instance.
1. You can select **proceed without a key pair** when prompted to select or create a new key pair.
      {% include important.html content="When you select **proceed without a key pair**, you are not able to SSH into the EC2 instance you deploy. Only use it for this trial, as it is not a recommended approach for a production environment" %}

Once the instance is launched, you can see the metrics and data in Wavefront after a few minutes.

## Step 5: See Metrics and Visualize Data

Once the data starts flowing into Wavefront, you can see them:

<p><span style="font-size: large; font-weight: 500">View Metrics</span></p>
On the Wavefront Cluster, go to the AWS integration, and select the **Metrics** tab.
You see charts with the metrics collected from your AWS instance. If you used the optional step above and launched a free tier EC2 instance, some of your charts will not have data.
Example:
![Screenshots of the AWS metrics once the data starts to flow to Wavefront.](images/hello_tutorial_aws_metrics.png)

<br/>
<p><span style="font-size: large; font-weight: 500">View Data on Dashboards</span></p>
Wavefront includes pre-defined dashboards for AWS that help you analyze and gather data that is useful to you.
1. Click **Dashboards**, and you see a list of dashboards.
    ![Screenshot of all the predefined dashboards available for Wavefront.](images/hello_tutorial_aws_dahsboards.png)
1. From the Summary dashboard, you can easily navigate to all other AWS dashboards. 
    ![Screenshot of the predefined AWS summary dahsboard](images/hello_tutorial_aws_summary_dashboard.png)
{% include note.html content="You can't edit the queries in the charts of these dashboards. If you want to customize the queries, you need to clone the dashboard and then update the queries in the charts. See [Edit or Clone a Dashboard](ui_dashboards.html#edit-or-clone-a-dashboard)" %}

## Next Steps

* For more information on the AWS integration, see [Amazon Web Services Integration](amazon_cloudfront.html).
* Try out the [Dashboards and Alerts Tutorial](tutorial_getting_started.html).
