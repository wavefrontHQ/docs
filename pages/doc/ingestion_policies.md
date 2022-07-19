---
title: Examine Usage with Ingestion Policies
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: ingestion_policies.html
summary: Monitor usage with ingestion policies, usage dashboards, and alerts.
---

As a Super Admin user, you're interested in usage patterns for the whole organization, but also for different teams in the organization. For such cases, Tanzu Observability by Wavefront supports ingestion policies. You can create different ingestion policies and assign accounts or groups to each policy to see which teams use which part of total ingestion.

{% include note.html content="You must be a Super Admin to view the Usage Portal and manage ingestion policies."%}

By using ingestion policies, you can monitor the usage for a combination of accounts or groups. You can examine:
- the total usage out of a certain limit for the policy
- the month-over-month percentage change in the total usage for the policy
- the hourly usage for the current billing month
- the accounts that ingest most data
- the usage by ingestion mechanism (proxy and direct ingestions)
- the usage by ingestion type (time series, histograms, and delta counters)

To examine the performance of your Wavefront instance, you can use [wftop, Wavefront spy](wavefront_monitoring_spy.html), the [Slow Query dashboard](monitoring_overview.html#find-slow-queries-and-improve-dashboard-response), and the [Wavefront Usage integration](wavefront_monitoring.html).

## Ingestion Policy Basics

Ingestion policies allow you to combine user and service accounts or groups, so that you can examine their usage of the Wavefront service. For example, you can create a policy for all accounts that joined in the last 6 months. You can also create a policy for a whole team, for example the Finance team, and monitor whether they show unusually high usage because they're not yet experienced. In such a case, you can provide additional training, for example. Also, you can set a Points per Second (PPS) limit and create an associated alert for an ingestion policy, so that you can receive notifications and track how much of the PPS is used and whether the users or the team will need more PPS in the future.

The policy scope can be either accounts or groups.
* Once you set the scope to accounts or groups, you cannot change it.
* Each account or group can belong to more than one policy at a time.
* You can assign many user and service accounts to the same ingestion policy.
* You can assign many groups to the same ingestion policy.

## Permissions

* Only Super Admin users can view, create, and edit ingestion policies.
* All users can view the alerts associated with ingestions policies. 
* Only Super Admin users can edit or delete alerts associated with ingestions policies. The **Alerts** permission does not apply to ingestion policy alerts.

## Create an Ingestion Policy

### Step 0: Start the Ingestion Policy Creation

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.
3. Click the **Ingestion Policies** tab and click **New Ingestion Policy**.

### Step 1: Specify the Scope and PPS Limit

In the **Data** panel, specify the user and service accounts or groups and, optionally, a PPS limit and click **Next**.
1. Choose the **Scope** of the policy, either **Accounts** or **Groups**, and select the user and service accounts or the groups that you want to assign to the policy.
  
    After you create the policy, you cannot change the scope. You can change only the assigned accounts or groups depending on the scope.
2. Choose whether you want to set a PPS limit for the policy. If you select **Set PPS Limit**, you must enter the PPS limit number in the **PPS per billing period** text box.
   
    The limit becomes visible in the ingestion policy dashboard charts. If you set a PPS limit, you must create the ingestion policy alert in the next steps.
   
### Step 2: Configure the Ingestion Policy Alert

{% include note.html content="If you didn't choose to set a PPS limit, this step is skipped."%}

If you set a PPS limit for the ingestion policy, Tanzu Observability creates an ingestion policy alert that queries the percentage of the PPS limit used by the accounts assigned to the policy.

1. In the **Conditions** panel, configure the [thresholds and severities](alerts_manage.html#step-2-specify-thresholds-and-severities).
   1. Select the comparison operator for the alert condition. In most cases, you alert when the usage is **greater than** a specified threshold percentage of the PPS limit.
   2. For at least one severity, specify a threshold percentage of the PPS limit and click **Next**.
   
       The threshold percentage becomes visible in the ingestion policy alert chart.
       
       You can skip the other settings.
2. Optionally, in the **Recipients** panel, specify [who will receive the alert notifications](alerts_manage.html#step-3-specify-recipients) and click **Next**.
3. In the **Alert Name and Tags** panel, enter a name for the alert and, optionally, [tags](tags_overview.html#object-tags-tags-on-alerts-dashboards-events-and-sources) and click **Next**.

After you create the ingestion policy, the associated alert will be available on the ingestion policy dashboard and on the Alerts page.
     
### Step 3: Name and Activate the Ingestion Policy
In the **Create** panel, enter a name for the policy and, optionally, a description and click **Create**.

If a user assigned to an ingestion policy is ingesting data through a Wavefront proxy, the proxy is also associated with the ingestion policy. You can [see the ingestion policies to which a proxy belongs](#see-the-ingestion-policies-to-which-a-proxy-belongs).

## Edit an Ingestion Policy

After you create an ingestion policy, if you need, for example, to increase the PPS limit or add accounts, you can edit the policy. 

{% include note.html content="You cannot change the policy scope from accounts to groups or the reverse."%}

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.
3. On the **Ingestion Policies** tab, click the ellipsis icon next to the policy that you want to edit and select **Edit**.
4. In each panel, apply the necessary changes and click **Next**, and in the **Policy Name and Description** panel, click **Save**.

{% include note.html content="Removing the PPS limit dissociates the alert from the ingestion policy and deletes the alert."%}

## Delete an Ingestion Policy

If you no longer need an ingestion policy, for example, after a reorganization in your company, you might want to remove an ingestion policy.

{% include note.html content="Deleting an ingestion policy cannot be undone. Deleting an ingestion policy with a PPS limit, also deletes its associated alert."%}

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.
3. On the **Ingestion Policies** tab, click the ellipsis icon next to the policy that you want to delete, select **Delete** and confirm.

## See the Ingestion Policies to Which a Proxy Belongs

1. Log in to your Wavefront instance as a Super Admin user.
2. Click **Browse > Proxies**.
   
   For each proxy, the **Ingestion Policies** column shows a list of policies. 

   If the proxy belongs to many policies, hover over the three horizontal dots and you'll see the rest of the ingestion policies in a tooltip.

## Examine Ingestion Policy Usage

As a Super Admin user, you can examine the usage by the accounts or groups assigned to an ingestion policy from the ingestion policy dashboard.

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.
3. On the **Ingestion Policies** tab, click the name of the policy in which you are interested.

![Ingestion policies page](images/ingestion_policies.png)

The ingestion policy dashboard consists of the following sections:

- In the **Ingestion Summary** section of the dashboard, you can see the following list of charts:

  <table style="width: 100%;">
  <tbody>
  <thead>
  <tr><th width="30%">Chart</th><th width="70%">Description</th></tr>
  </thead>
  <tr>
  <td><strong>Usage Limit</strong></td>
  <td>Shows the usage for the selected month out of the PPS limit set for the ingestion policy.</td></tr>
  <tr>
  <td><strong>Previous Month to Selected Month</strong></td>
  <td>Shows a comparison of the selected month's usage with the previous month's usage.</td>
  </tr>
  <tr>
  <td><strong>Hourly Usage</strong></td>
  <td>Shows the hourly PPS. The red line represents the PPS limit for the policy.</td>
  </tr>
  </tbody>
  </table>

- In the **Optimize Usage** section of the dashboard, you can see a list of charts that lets you investigate usage further by accounts, ingestion mechanisms, and data types.

  <table style="width: 100%;">
  <tbody>
  <thead>
  <tr><th width="30%">Chart</th><th width="70%">Description</th></tr>
  </thead>
  <tr>
  <td><strong>Top Accounts Contributing to Ingestion</strong></td>
  <td>Shows which accounts contribute the most.</td></tr>
  <tr>
  <td><strong>Usage by Ingestion Source</strong></td>
  <td>Shows the usage by ingestion mechanism - proxy and direct ingestions.</td>
  </tr>
  <tr>
  <td><strong>Usage by Ingestion Type</strong></td>
  <td>Shows the usage by data type - time series, histograms, and delta counters.</td>
  </tr>
  </tbody>
  </table>

- If the ingestion policy has a PPS limit with an alert, the dashboard includes the **Alert** section that provides details about the associated alert.
 
 ![Usage summary per ingestion policy](images/IP_dashboard.png)

## Example: Monitor Which Teams Are Responsible for How Much Ingested Data

Consider the following example. You are administering a Wavefront instance for two big teams, `IT Team1` and `IT Team2`, and you want to monitor how much data each of the team uses. `IT Team1` usually needs more PPS data, and you have only 10,000 of committed PPS on a monthly basis.

You can create an ingestion policy for each team to monitor how much data each team uses per month. You can also set a PPS limit for each ingestion policy and if a team consumes more than expected, you will receive an alert notification, so that you can provide additional training on how to use ingested data wisely. 

## Learn More!

You can additionally drill down and get a better understanding of the usage per account by using the [Wavefront Ingestion Policy Explorer dashboard](wavefront_monitoring.html).

[Improve PPS and Prevent Overage](wavefront_usage_info.html) explains how to use tools and dashboards to learn how much data is coming in, who is sending the data, how to get alerted if ingested data get close to monthly contracted usage, and how to optimize your ingestion rate. 
