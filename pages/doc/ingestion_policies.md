---
title: Monitor Usage with Ingestion Policies
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: ingestion_policies.html
summary: Monitor ingestion rates by policies and configure ingestion limits with alerts.
---

In addition to the dashboard for monitoring your [overall usage](examine_usage.html) of VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront), you can use ingestion policies for monitoring usage by specific accounts, groups, sources, metric namespaces, or point tags. For example, it might be valuable to understand the ingestion rates of the different teams in your organization or by the different sources and manage their consumption, cost, overage, etc.

By creating an ingestion policy, you combine a set of accounts, groups, sources, metric namespaces, or point tags. Optionally, you can set a Points per Second (PPS) limit for the ingestion policy and associate it with an alert. After you create an ingestion policy, you can start monitoring the ingestion policy dashboard, which shows:
- The P95 PPS usage per [billing period](glossary.html#b) since the creation of the policy.
- The PPS limit with the associated alert, if configured.
- The percentage change in the PPS usage per billing period.
- The hourly PPS usage.
- The accounts that ingest most data.
- The ingestion by ingestion type (proxy and direct ingestions).
- The ingestion by data type (time series, histograms, and delta counters).

{% include important.html content="Ingestion policies **do not** support metrics from external services. You **CANNOT** use ingestion policies to monitor PPS usage for services such as the Amazon Web Services, Google Cloud Platform, Microsoft Azure, Snowflake, VMware vRealize Operations Cloud, New Relic, Datadog, and AppDynamics integrations."%}

For performance monitoring of your Operations for Applications instance, you can use [wftop and spy](wavefront_monitoring_spy.html), the [Slow Query dashboard](monitoring_overview.html#find-slow-queries-and-improve-dashboard-response), and the [Usage integration](wavefront_monitoring.html).

## Ingestion Policy Basics

Ingestion policies allow you to combine user and service accounts, groups, sources, metric namespaces, or point tags, so that you can monitor their usage of the Operations for Applications service. For example, you can create a policy for a group of new hires. You can also create a policy for one or more source virtual machines. Also, you can set a Points per Second (PPS) limit for the policy and create an alert, so that you can receive notifications if the PPS usage exceeds certain thresholds of the limit.

Tracking the PPS usage by ingestion policy can help you understand how the overall usage is distributed and whether a particular team will need more PPS in the future or will need to reduce their overhead ingestions.

The policy scope can be accounts, groups, sources, namespaces, or point tags.
* Once you set the scope, you cannot change it.
* You can change the accounts or objects assigned to the policy only from the selected scope.
* A given account or object can belong to more than one policy.

{% include note.html content="All users can view the ingestion policies and the ingestion policy dashboards. Only users with the [**Ingestion Policies** permission](permissions_overview.html) can create, edit, revert, and delete ingestion policies."%}

## Create an Ingestion Policy

### Step 0: Start the Ingestion Policy Creation

1. Log in to your service instance as a user with the **Ingestion Policies** permission.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Ingestion Policies**.
3. Click **New Ingestion Policy**.

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
    <td>Individual <a href="authorization-faq.html#what-are-user--service-accounts">user and service accounts</a>.</li></ul></td></tr>
    <tr>
    <td><strong>Groups</strong></td>
    <td><a href="users_roles.html#create-a-group">Groups</a> of user and service accounts, including the <strong>Everyone</strong> and <strong>Service Accounts</strong> system groups.</li></ul>
    </td>
    </tr>
    <tr>
    <td><strong>Sources</strong></td>
    <td><a href="sources_managing.html">Sources</a> that emit metrics. You can assign exact source names and names with wildcards, for example, <code>appServer1</code> and <code>appServer*</code>.</td>
    </tr>
    <tr>
    <td><strong>Namespaces</strong></td>
    <td><a href="metrics_managing.html#metrics-browser">Namespaces</a> that group metrics in a hierarchy defined by a name prefix. You can assign exact metric names and namespaces, for example, <code>request.</code> and <code>requests</code>. You can also assign names with wildcards, for example, <code>cpuloadavg*</code> and <code>cpu.*</code>.</td>
    </tr>
    <tr>
    <td><strong>Point Tags</strong></td>
    <td><a href="metrics_managing.html#time-series-with-tags">Point tags</a> that are optional key-value pairs associated with a metric. You must assign exact tag keys with exact tag values or wildcards, for example, <code>env="dev"</code> or <code>env="*"</code>.
    <p>If you assign a combination of point tags, you must select the match criterion - can be either <b>Has tags</b> (logical OR) or <b>Has all these tags</b> (logical AND).</p></td>
    </tr>
    </tbody>
    </table>
    
    {% include note.html content="After you create the policy, you cannot change the scope. You can change only the assigned accounts or objects from that scope."%}
2. Choose whether you want to set a PPS limit for the policy. If you select **Set PPS Limit**, you must enter the PPS limit number in the **PPS per billing period** text box.
   
    The limit becomes visible in the ingestion policy dashboard charts. If you set a PPS limit, you must create the ingestion policy alert in the next steps.
   
### Step 2: Configure the Ingestion Policy Alert

{% include note.html content="If you didn't choose to set a PPS limit, this step is skipped."%}

If you set a PPS limit for the ingestion policy, Operations for Applications creates an ingestion policy alert that queries the PPS usage by the policy as a percentage of the PPS limit.

1. In the **Conditions** panel, configure the [thresholds and severities](alerts_manage.html#step-2-specify-thresholds-and-severities).
   1. Select the comparison operator for the alert condition. In most cases, you alert when the usage is **greater than** a specified threshold percentage of the PPS limit.
   2. For at least one severity, specify a threshold percentage of the PPS limit and click **Next**.
   
       The threshold percentage becomes visible in the ingestion policy alert chart.
       
       You can skip the other settings in the **Conditions** panel.
2. Optionally, in the **Recipients** panel, specify [who will receive the alert notifications](alerts_manage.html#step-3-specify-recipients) and click **Next**.
3. In the **Alert Name and Tags** panel, enter a name for the alert and, optionally, [tags](tags_overview.html#object-tags-tags-on-alerts-dashboards-events-and-sources) and click **Next**.

After you create the ingestion policy, you can view the associated alert on the corresponding ingestion policy dashboard and on the Alerts Browser page.

{% include note.html content="You can edit or delete an ingestion policy alert only by editing or deleting the corresponding ingesting policy."%}
    
### Step 3: Name and Activate the Ingestion Policy
In the **Create** panel, enter a name for the policy and, optionally, a description and click **Create**.

## Edit an Ingestion Policy

After you create an ingestion policy, if you need, for example, to increase the PPS limit, or assign more accounts or point tags, you can edit the policy. 

{% include note.html content="You cannot change the policy scope. You can change only the assigned objects from that scope."%}

1. Log in to your service instance as a user with the **Ingestion Policies** permission.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Ingestion Policies**.
3. Click the ellipsis icon next to the policy that you want to edit and select **Edit**.
4. Enter the necessary changes and click **Save**.

{% include note.html content="Removing the PPS limit dissociates the corresponding alert from the ingestion policy and deletes the alert."%}

## View Ingestion Policy History and Revert to a Previous Version

Every time a user with the **Ingestion Policies** permission edits an ingestion policy, they create a new version of that policy. All users can see the details of each version of the policy. Users with the **Ingestion Policies** permission can also revert the policy to an exact copy or to an edited copy of an earlier version. Reverting a policy to an earlier version creates a new version of that policy.

<table style="width: 100%;">
<tbody>
<tr>
<td width="70%">
To access the version history of an ingestion policy:
<ol>
<li>Log in to your service instance.</li>
<li>From the gear icon on the toolbar, select <strong>Ingestion Policies</strong>.</li>
<li>Click the ellipsis icon next to the target policy and select <strong>Versions</strong>.</li>
</ol>
</td>
<td width="30%"><img src="images/ip_new_hires.png" alt="alert history selected in menu"></td>
</tr>
</tbody>
</table>

The **Earlier Versions** page shows the details of each version of the policy.

![An annotated screenshot of the history page with the list of versions. the annotations are explained below.](images/IP_history.png)

On this page, you can:

* Open the current policy dashboard by clicking the current version number.
* See the user who updated the policy and created a specific version, when was the policy updated, and what was updated in the policy.

If you have the **Ingestion Policies** permission, you can also:
* Revert the policy to an exact copy of an earlier version, that is, create a new version that is an exact copy of the selected version.
* Edit a copy of an earlier version and revert the policy to it, that is, create a new version that is an edited copy of the selected version.


## Delete an Ingestion Policy

If you no longer need an ingestion policy, for example, after a reorganization in your company, you might want to delete an ingestion policy.

{% include note.html content="Deleting an ingestion policy cannot be undone. Deleting an ingestion policy with a PPS limit, also deletes its associated alert."%}

1. Log in to your service instance as a user with the **Ingestion Policies** permission.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Ingestion Policies**.
3. Click the ellipsis icon next to the policy that you want to delete, select **Delete**, and confirm.

## Examine the Service Usage by Ingestion Policy

All users can view the ingestion policies and examine the ingestion policy dashboards to understand their PPS usage over time.

1. Log in to your service instance.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Ingestion Policies**.

    The **Ingestion Policies** page shows all existing ingesting policies.

    ![Ingestion policies page](images/ingestion_policies.png)

    For each policy you can see:

    - The state of the policy, i.e. whether the limit is exceeded, or the limit is not reached or not set.
    - The name of the policy. If you click the name, you can examine the respective ingestion policy dashboard.
    - The current usage vs limit for the current billing period.
    - The usage trend for the current billing period.
    - The PPS limit, if set.
    - Whether the ingestion policy has an alert associated with it.
    - Date, time, and account of the last update.
3. Click the name of the policy in which you are interested and examine the policy dashboard.

    The ingestion policy dashboard contains the **Ingestion Summary** and **Optimize Usage** sections. If the ingestion policy has a PPS limit, the dashboard also includes the **Alert** section.

    ![Usage summary per ingestion policy](images/IP_dashboard.png)

    - In the **Ingestion Summary** section of the dashboard, you can see the following list of charts:

      <table style="width: 100%;">
      <tbody>
      <thead>
      <tr><th width="30%">Chart</th><th width="70%">Description</th></tr>
      </thead>
      <tr>
      <td><strong>P95 Usage vs Limit</strong></td>
      <td>Shows the 95th percentile PPS usage by the policy out of the PPS limit for the selected billing period.</td></tr>
      <tr>
      <td><strong>Current Period vs Previous Period</strong></td>
      <td>Shows the percentage change in the usage for the selected billing period compared to the billing period before that. A positive value indicates a usage increase whereas a negative value indicates a usage decrease.</td>
      </tr>
      <tr>
      <td><strong>Hourly Usage</strong></td>
      <td>Shows the hourly PPS usage over the selected billing period. The red line represents the PPS limit for the policy.</td>
      </tr>
      <tr>
      <td><strong>Last 12 Months Usage</strong></td>
      <td>Shows the hourly PPS usage over the last 12 months. The red line represents the PPS limit for the policy.</td>
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

    - If the ingestion policy has a PPS limit, the dashboard also includes the **Alert** section that provides details about the associated alert.
 


In addition, the Operations for Applications Usage integration includes the [Operations for Applications Ingestion Policy Explorer Dashboard](wavefront_monitoring.html#operations-for-applications-ingestion-policy-explorer-dashboard), which provides a granular breakdown of the ingestion across your organization by ingestion policies, accounts, sources, and types.

## Example: Monitor Which Teams Are Responsible for How Much Ingested Data

Consider the following example. You are administering an Operations for Applications service instance for two big teams, `IT Team1` and `IT Team2`, and you want to monitor how much data each of the team uses. `IT Team1` usually needs more PPS data, and you have only 10,000 of committed PPS on a monthly basis.

You can create an ingestion policy for each team to monitor how much data each team uses per month. You can also set a PPS limit for each ingestion policy and if a team consumes more than expected, you will receive an alert notification, so that you can provide additional training on how to use ingested data wisely. 

## Learn More!

[Improve PPS and Prevent Overage](wavefront_usage_info.html) explains how to use tools and dashboards to learn how much data is coming in, who is sending the data, how to get alerted if ingested data get close to monthly contracted usage, and how to optimize your ingestion rate. 
