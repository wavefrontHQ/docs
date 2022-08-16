---
title: Examine Usage with Ingestion Policies
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: ingestion_policies.html
summary: Monitor usage with ingestion policies, usage dashboards, and alerts.
---

In addition to the dashboard for monitoring your [overall usage](examine_usage.html), Tanzu Observability by Wavefront supports ingestion policies for monitoring your usage by accounts, groups, sources, metric namespaces, and point tags. For example, it might be valuable to understand the ingestion rates by the different teams or by the different sources.


By creating an ingestion policy, you combine a set of accounts, groups, sources, metric namespaces, and point tags. Then, you can monitor their PPS usage from the ingestion policy dashboard, which shows:
- the P95 PPS usage out of a certain limit for the policy
- the month-over-month percentage change in the PPS usage for the policy
- the hourly PPS usage for the current billing period
- the accounts that ingest most data
- the usage by ingestion mechanism (proxy and direct ingestions)
- the usage by ingestion type (time series, histograms, and delta counters)

{% include note.html content="All users can view the ingestion policies. Only Super Admin users can create and manage ingestion policies."%}

For performance monitoring of your Wavefront instance, you can use [wftop, Wavefront spy](wavefront_monitoring_spy.html), the [Slow Query dashboard](monitoring_overview.html#find-slow-queries-and-improve-dashboard-response), and the [Wavefront Usage integration](wavefront_monitoring.html).

## Ingestion Policy Basics

Ingestion policies allow you to combine user and service accounts, groups, sources, metric namespaces, or point tags, so that you can monitor their usage of the Wavefront service. For example, you can create a policy for all accounts that joined in the last 6 months. You can also create a policy for one or more sources. Also, you can set a Points per Second (PPS) limit for the policy and create an alert, so that you can receive notifications if the PPS usage exceeds certain thresholds of the limit.

Tracking the PPS usage by ingestion policies can help you understand how the overall usage is distributed and weather or not particular team will need more PPS in the future or need to reduce their overhead ingestions.

The policy scope can be accounts, groups, sources, namespaces, or point tags.
* Once you set the scope, you cannot change it.
* You can change only the object assigned to the policy in accordance with the scope.
* Each account or object can belong to more than one policy.

## Permissions

* Only Super Admin users can create and edit ingestion policies.
* Only Super Admin users can edit or delete alerts associated with ingestions policies. The **Alerts** permission does not apply to ingestion policy alerts.
* All users can view the ingestion policies, the ingestion policy dashboards, and the ingestion policy alerts.

## Create an Ingestion Policy

### Step 0: Start the Ingestion Policy Creation

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.
3. Click the **Ingestion Policies** tab and click **New Ingestion Policy**.

### Step 1: Specify the Scope and PPS Limit

In the **Data** panel, specify the scope and, optionally, a PPS limit and click **Next**.
1. Select the **Scope** of the policy and enter the objects from that scope that you want to assign to the policy.
  
    <table style="width: 100%;">
    <tbody>
    <thead>
    <tr><th width="30%">Scope</th><th width="70%">Description</th></tr>
    </thead>
    <tr>
    <td><strong>Accounts</strong></td>
    <td>Individual <a href="authorization-faq.html#what-are-user--service-accounts">user and service accounts</a>.</td></tr>
    <tr>
    <td><strong>Groups</strong></td>
    <td><a href="users_roles.html#create-a-group">Groups</a> of user and service accounts.</td>
    </tr>
    <tr>
    <td><strong>Sources</strong></td>
    <td><a href="sources_managing.html">Sources</a> that emit metrics. You can assign exact source names and names with wildcards, for example, <code>appServer1</code> and <code>appServer*</code>.</td>
    </tr>
    <tr>
    <td><strong>Namespaces</strong></td>
    <td><a href="metrics_managing.html#metrics-browser">Namespaces</a> that group metrics in a hierarchy defined by a name prefix. You can assign exact metric names and namespaces, for example, <code>request.</code> and <code>requests</code>. You can assign names with wildcards, for example, <code>cpuloadavg*</code> and <code>cpu.*</code>.</td>
    </tr>
    <tr>
    <td><strong>Point Tags</strong></td>
    <td><a href="metrics_managing.html#time-series-with-tags">Point tags</a> that are optional key-value pairs associated with a metric, for example, <code>env="dev"</code>.
    <p>If you assign more than one point tag, you must select the match criterion - can be either <b>Has tags</b> (individual point tags) or <b>Has all these tags</b> (a combination of point tags).</p></td>
    </tr>
    </tbody>
    </table>

    After you create the policy, you cannot change the scope. You can change only the assigned objects from that scope.
2. Choose whether you want to set a PPS limit for the policy. If you select **Set PPS Limit**, you must enter the PPS limit number in the **PPS per billing period** text box.
   
    The limit becomes visible in the ingestion policy dashboard charts. If you set a PPS limit, you must create the ingestion policy alert in the next steps.
   
### Step 2: Configure the Ingestion Policy Alert

{% include note.html content="If you didn't choose to set a PPS limit, this step is skipped."%}

If you set a PPS limit for the ingestion policy, Tanzu Observability creates an ingestion policy alert that queries the PPS usage by the policy as a percentage of the PPS limit.

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

## Edit an Ingestion Policy

After you create an ingestion policy, if you need, for example, to increase the PPS limit or add accounts or point tags, you can edit the policy. 

{% include note.html content="You cannot change the policy scope. You can change only the assigned objects from that scope."%}

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.
3. On the **Ingestion Policies** tab, click the ellipsis icon next to the policy that you want to edit and select **Edit**.
4. In each panel, apply the necessary changes and click **Next**, and in the **Policy Name and Description** panel, click **Save**.

{% include note.html content="Removing the PPS limit dissociates the alert from the ingestion policy and deletes the alert."%}

When you edit an ingestion policy, you create a new version of that policy.

## View Ingestion Policy History

To access the version history of an ingestion policy, on the **Ingestion Policies** page, click the ellipsis icon next the policy and select **Versions**.

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<br/>
Ingestion policy version history shows:
<ul>
<li>The changes that have been made to an ingestion policy over time.</li>
<li>Which user made the changes.</li>
<li>The date and time the changes were made.</li>
<li>A description of the changes.</li></ul>
</td>
<td width="40%"><img src="images/ip_new_hires.png" alt="alert history selected in menu"></td>
</tr>
</tbody>
</table>

## Delete an Ingestion Policy

If you no longer need an ingestion policy, for example, after a reorganization in your company, you might want to remove an ingestion policy.

{% include note.html content="Deleting an ingestion policy cannot be undone. Deleting an ingestion policy with a PPS limit, also deletes its associated alert."%}

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.
3. On the **Ingestion Policies** tab, click the ellipsis icon next to the policy that you want to delete, select **Delete** and confirm.

## Examine Ingestion Policy Usage

All users can examine the ingestion policy dashboards to understand their usage over time.

1. Log in to your Wavefront instance.
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
