---
title: Examine the Wavefront Usage with Ingestion Policies
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: ingestion_policies.html
summary: Examine who is using what by creating ingestion policies and setting limits with alerts.
---

As a Wavefront Super Admin, you're interested in usage patterns for the whole company, but also for different teams in the company. You can create ingestion policies and assign accounts or groups to each policy to see which teams use which part of the total ingestion.

You can examine the performance of your Wavefront instance using [wftop, Wavefront spy](wavefront_monitoring_spy.html), the [Slow Query dashboard](monitoring_overview.html#find-slow-queries-and-improve-dashboard-response), and the [Wavefront Usage integration](wavefront_monitoring.html). By using ingestion policies, you can monitor the total usage out of the committed usage, the hourly usage, and the top accounts contributing to ingestion.

{% include note.html content="The new Usage Portal and Ingestion Policy functionality is currently available to some of our customers. It will become available to all customers within the next releases."%}

## Ingestion Policy Basics

Ingestion policies allow you to group user and service accounts or groups, so that you can examine their usage for your cluster. For example, you can create a policy for all accounts that joined in the last 6 months, or create a policy for a whole team, for example the Finance team, and monitor whether they show unusually high usage because they're not yet experienced. In such a case, you can provide additional training. Also, you can set a Points per Second (PPS) limit to an ingestion policy with an associated alert, so that you can receive notifications and track how much of the PPS is used and whether the users or the team will need more PPS in the future.

* The policy scope can be either accounts or groups. Once you set the scope to accounts or groups, you cannot edit it, you can only add and remove accounts or groups from the selected scope.
* Each account or group can belong to more than one policy at a time.
* You can assign many user and service accounts to the same ingestion policy.
* You can assign many groups to the same ingestion policy.

## Permissions

* Only Super Admin users can create, view, and edit ingestion policies.
* All users can view the alerts associated with ingestions policies but only Super Admin users can edit or delete these alerts.

## Create an Ingestion Policy

### Step 0: Start the Ingestion Policy Creation

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Usage Portal**.
3. Click the **Ingestion Policies** tab, and click **New Ingestion Policy**.

### Step 1: Specify the Scope

In the **Data** panel, assign the user and service accounts or groups and, optionally, specify a PPS limit, and click **Next**.
1. Choose the **Scope** of the policy, either **Accounts** or **Groups**, and enter the user and service accounts or the groups that you want to assign to the policy.
  
    After you create the policy, you cannot edit the scope. You can only change the assigned accounts or groups to the policy.
2. Choose whether you want to set a PPS limit. If you select **set a PPS limit**, you must enter the points per second limit number in the **PPS per billing period** text box.
   
    The limit becomes visible in the ingestion policy dashboard charts. If you set a PPS limit, you must create the ingestion policy alert in the next steps.
   
### Step 2: Create the Ingestion Policy Alert (If you set a PPS limit)
The steps for creating an ingestion policy alert are similar to the steps for [creating a general alert](alerts_manage.html#create-alert-tutorial).

1. In the **Conditions** panel, configure thresholds and severities.
   1. Select the alert condition operator. You can alert when the usage is greater than or less than a specified threshold.
   2. Specify a threshold percentage of the PPS limit for at least one severity and click **Next**.
   
       The threshold percentage becomes visible in the ingestion policy alert chart.
2. In the **Recipients** panel, configure the notifications recipients for each severity that you set and click **Next**.
3. In the **Activate** panel, enter a name for the alert and, optionally, alert tags and click **Next**.
       
### Step 3: Name and Activate the Ingestion Policy
In the **Create** panel, enter a name for the policy and, optionally, a description and click **Create**.

If a user starts ingesting data into Wavefront through a Wavefront Proxy, you can see the ingestion policies to which a proxy belongs from the [Proxies browser](#see-the-ingestion-policies-to-which-a-proxy-belongs) page.

## Edit an Ingestion Policy

After you create an ingestion policy, if you need, for example, to increase the PPS limit, you can edit the policy. 

{% include note.html content="You cannot edit the scope of the policy. You can only add and remove accounts or groups depending on the scope."%}

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Usage Portal**.
3. On the **Ingestion Policies** tab, click the ellipsis icon next to the policy that you want to edit and click **Edit**.
4. Apply the necessary changes, and in the **Create** panel, click **Save**.

### Delete Ingestion Policies

{% include note.html content="Deleting an ingestion policy with a PPS limit, also deletes its associated alert if exists."%}

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Usage Portal**.
3. On the **Ingestion Policies** tab, click the ellipsis icon next to the policy that you want to delete, click **Delete** and confirm.

### See the Ingestion Policies to Which a Proxy Belongs

1. Log in to your Wavefront instance as a Super Admin user.
2. Click **Browse > Proxies**.
   
   For each proxy the **Ingestion Policies** column shows a list of policies. 

   If the proxy belongs to many policies, hover over the three horizontal dots and you'll see the rest of the ingestion policies in a tooltip.


## Examine Usage

As a Super Admin user, you can examine the usage for accounts or groups assigned to different ingestion policies by clicking the name of the policy.

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Usage Portal**.
3. On the **Ingestion Policies** tab, click the name of the policy you are interested in.

   ![Ingestion policy name link](images/ingestion_policy_team.png)

Explore the usage for the specific ingestion policy.

In the **Ingestion Summary** section of the dashboard, you can see the following list of charts:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Chart</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td><strong>Usage Limit</strong></td>
<td>Shows the total usage out of the committed usage.</td></tr>
<tr>
<td><strong>Previous Month to Selected Month</strong></td>
<td>Shows a comparison of the current month with the previous month.</td>
</tr>
<tr>
<td><strong>Hourly Usage</strong></td>
<td>Shows the hourly PPS. The red line represents the commit level. If the hourly usage exceeds the committed rate with more than 5% for a given month, you will incur overage charges.</td>
</tr>
</tbody>
</table>


In the **Optimize Usage** section of the dashboard, you can see a list of charts that lets you investigate further which accounts contribute the most, what is the usage by ingestion source and ingestion type, so that you can investigate usage patterns.

 ![Usage summary per ingestion policy](images/usage_summary_per_policy.png)


## Example: Monitor Which Teams Are Responsible for How Much Ingested Data

Consider the following example. You are administering a Wavefront cluster for two big teams, `IT Team1` and `IT Team2`, and you want to monitor how much data each of the team uses. `IT Team1` usually needs more PPS data, and you have only 10,000 of committed PPS on a monthly basis.

You can create an ingestion policy for each team to monitor how much data each team uses per month. You can also set a PPS limit for each ingestion policy and if a team consumes more than expected, you can provide additional training on how to use ingested data wisely. 

## Learn More!

You can additionally drill down and get a better understanding of the usage per account by using the [Wavefront Ingestion Policy Explorer dashboard](wavefront_monitoring.html). 

Our Customer Success Team has put together KB articles that drill down into adoption info.

* [How to Track Adoption in Your Company with Usage Metadata](https://help.wavefront.com/hc/en-us/articles/360058526192-How-to-Track-Tanzu-Observability-Adoption-with-Usage-Metadata).
* [How to Identify Unused Data](https://help.wavefront.com/hc/en-us/articles/360058084372-How-to-Identify-Unused-Data).
* [How to Optimize Your Ingestion Rate PPS](https://help.wavefront.com/hc/en-us/articles/360057995092-How-to-Optimize-Your-Ingestion-Rate-PPS-).
* [How to Request a PPS Add-On to Current Committed Rate](https://help.wavefront.com/hc/en-us/articles/4402939921044-How-to-request-a-PPS-add-on-to-current-committed-rate).
