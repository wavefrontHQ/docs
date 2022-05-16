---
title: Examine Usage with Ingestion Policies
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: ingestion_policies.html
summary: Monitor usage with ingestion policies and usage dashboards.
---

As a Super Admin user, you're interested in usage patterns for the whole organization, but also for different teams in the organization. For such cases, Tanzu Observability by Wavefront supports ingestion policies. You can create different ingestion policies and assign accounts or groups to each policy to see which teams use which part of total ingestion.

{% include note.html content="You must be a Super Admin to view the Usage Portal and manage ingestion policies."%}

You can examine the performance of your Wavefront instance using [wftop, Wavefront spy](wavefront_monitoring_spy.html), the [Slow Query dashboard](monitoring_overview.html#find-slow-queries-and-improve-dashboard-response), and the [Wavefront Usage integration](wavefront_monitoring.html). By using ingestion policies, you can monitor the total usage out of the committed usage, the hourly usage, and the top accounts contributing to ingestion.


## Ingestion Policy Basics

Ingestion policies allow you to group user accounts and service accounts or any user or service accounts groups and then examine their usage for your Wavefront instance. For example, you can create a policy, add all accounts that joined in the last 6 months, or create a policy for a whole team, for example the Finance team, and examine whether they show unusually high usage because they're not yet experienced. In such a case, you can provide additional training. You can also set a Points per Second (PPS) limit to an ingestion policy, so that you can track how much of the PPS is used and whether the users or the team will need more PPS in the future.

{% include note.html content="When you set a PPS limit for an ingestion policy and the PPS usage is higher than the limit, no changes or implications occur. For example, if a team uses more PPS than the PPS limit set for an ingestion policy, you can increase the PPS limit or provide a training for the users who ingest more data. The system doesn't block or prevent certain users or groups from ingesting more data. "%}

### Permissions

Super Admin users (users who have all permissions) can create ingestion policies and add accounts or groups to these policies.

* Each account can belong to more than one policy at a time.
* You can assign many service accounts and user accounts to the same ingestion policy.
* You can assign many user and service accounts groups to the same ingestion policy.
* Once you set the scope to accounts or groups, you cannot edit it. You can create a policy with scope which can be either accounts or groups.


### Create an Ingestion Policy

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.
3. Click the **Ingestion Policies** tab, and click **New Ingestion Policy**.
4. In the **Data** panel:
   1. Choose the **Scope** of the policy.
  
      This can be either **Accounts** or **Groups**. After you create the policy, you cannot edit the scope.
   2. Depending on your choice of scope, enter either the user and service accounts or the groups that you want to assign to the policy.
   3. Select whether you want to set a PPS limit. 
      If you choose to set a PPS limit, you must enter the points per second limit number in the **PPS per billing period** text box.
   4. Click **Next**.
5. Enter the name of the policy and, optionally, a description and click **Create**.

If a user starts ingesting data through a Wavefront Proxy, you can see the ingestion policies to which a proxy belongs from the [Proxies browser](#see-the-ingestion-policies-to-which-a-proxy-belongs) page.

### Edit an Ingestion Policy

After you create an ingestion policy, if you need, for example, to increase the PPS limit, you can edit the policy. 

{% include note.html content="You cannot edit the scope of the policy."%}

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.
3. On the **Ingestion Policies** tab, click the ellipsis icon next to the policy that you want to edit and click **Edit**.
4. Apply the necessary changes, and click **Save**.


### Delete Ingestion Policies

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.
3. On the **Ingestion Policies** tab, click the ellipsis icon next to the policy that you want to delete, click **Delete** and confirm.

### See the Ingestion Policies to Which a Proxy Belongs

1. Log in to your Wavefront instance as a Super Admin user.
2. Click **Browse > Proxies**.
   
   For each proxy the **Ingestion Policies** column shows a list of policies. 

   If the proxy belongs to many policies, hover over the three horizontal dots and you'll see the rest of the ingestion policies in a tooltip.


## Examine Usage

As a Super Admin user, you can examine the usage for accounts or groups assigned to different ingestion policies by clicking the name of the policy.

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.
3. On the **Ingestion Policies** tab, click the name of the policy in which you are interested.

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
<td>Shows the usage for the selected month out of the PPS limit set for the ingestion policy.</td></tr>
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

Consider the following example. You are administering a Wavefront instance for two big teams, `IT Team1` and `IT Team2`, and you want to monitor how much data each of the team uses. `IT Team1` usually needs more PPS data, and you have only 10,000 of committed PPS on a monthly basis.

You can create an ingestion policy for each team to monitor how much data each team uses per month. You can also set a PPS limit for each ingestion policy and if a team consumes more than expected, you can provide additional training on how to use ingested data wisely. 

## Learn More!

You can additionally drill down and get a better understanding of the usage per account by using the [Wavefront Ingestion Policy Explorer dashboard](wavefront_monitoring.html).

[Find Actionable Usage Information](wavefront_usage_info.html) explains how to use tools and dashboards to learn how much data is coming in, who is sending the data, how to get alerted if ingested data get close to monthly contracted usage, and how to optimize your ingestion rate. 

Our Customer Success Team has put together KB articles that drill down into adoption info.

* [How to Track Adoption in Your Company with Usage Metadata](https://help.wavefront.com/hc/en-us/articles/360058526192-How-to-Track-Tanzu-Observability-Adoption-with-Usage-Metadata).
* [How to Request a PPS Add-On to Current Committed Rate](https://help.wavefront.com/hc/en-us/articles/4402939921044-How-to-request-a-PPS-add-on-to-current-committed-rate).
