---
title: Examine the Wavefront Usage with Ingestion Policies
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: ingestion_policies.html
summary: Monitor usage with ingestion policies and usage dashboards.
---

As a Wavefront Super Admin, you're interested in usage patterns for the whole company, but also for different teams in the company. You can create ingestion policies and assign user accounts or groups to each policy to see which teams use which part of total ingestion.

You can examine the performance of your Wavefront instance using [wftop](), [Wavefront spy](wavefront_monitoring_spy.html), and the [Slow Queries dashboard](wavefront_monitoring.html#examine-slow-queries). In addition, you can find out usage on a per-account or per-group basis using ingestion policies.

**Note:** When you create a new ingestion policy, it can take a few minutes for the data to become available in the Wavefront Usage dashboard.

## Ingestion Policy Basics

Ingestion policies allow you to group user accounts, service accounts or groups and then examine their usage for your cluster. For example, you can create a policy, add all accounts that joined in the last 6 months, or create a policy for a whole team, for example the Finance team, and examine whether they show unusually high usage because they're not yet experienced. If yes, you could provide additional training. You can also set a Points per Second (PPS) limit to an ingestion policy, so that you can track how much of the PPS is used and whether the users or team will need more PPS in the future.

### Permissions

Users with **Accounts, Groups & Roles** permission can create ingestion policies and add user accounts or user groups to the policies.
* Each account can belong to more than one policies at a time.
* You can assign many service accounts and user accounts to the same ingestion policy.
* You can assign many user and service accounts groups to the same ingestion policy.
* Once you set the scope to accounts or groups, you cannot edit it. You can create a policy with scope which can be either accounts or groups.

## Create an Ingestion Policy

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Usage Portal**
3. Click the **Ingestion Policies** tab, and click **New Ingestion Policy**.
4. In the **Data** panel:
   1. Choose the **Scope** of the policy.
  
      This can be either **Accounts** or **Groups**.
   2. Depending on your choice, enter either the user and service accounts or user and service account groups to assign to the ingestion policy.
   3. Select whether you want to set a PPS limit. 
      If you choose to set a PPS limit, you must enter the points per second limit number in the **PPS per billing period** text box.
   4. Click **Next**.
   5. Enter the name of the policy and click **Create**.

## Edit a Policy

After you create an ingestion policy, if you need, for example, to add a bigger PPS limit, you can edit the policy. 

{% include note.html content="You cannot edit the scope of the policy."%}

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Usage Portal**
3. On the **Ingestion Policies** tab, click the ellipsis icon next to the policy that you want to edit and click **Edit**.
4. Apply the necessary changes, and click **Save**.


## Delete Policies

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Usage Portal**
3. On the **Ingestion Policies** tab, select the check boxes of the ingestion policies that you want to delete, click **Delete** and confirm.

## See the Ingestion Policies a Proxy Belongs to

1. Log in to your Wavefront instance as a Super Admin user.
2. Click **Browse > Proxies**.
3. For each proxy the **Ingestion Policies** column shows a list of policies. If the proxy belongs to many policies, hover over the three dots and you'll see the ingestion policies in a tooltip.

`MARGARITA: How is this information useful?`


## Examine Usage

As an administrator, you examine usage for user accounts or user groups assigned to different ingestion policies or for individual accounts by clicking the name of the policy.

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Usage Portal**
3. On the **Ingestion Policies** tab, click the name of the policy you are interested in.

   ![Ingestion policy name link](images/ingestion_policy_team.png)

Explore the usage for the specific ingestion policy.

In the **Ingestion Summary** section of the dashboard, you can see the following list of charts:

* **Usage Limit** 

  Shows the total usage out of the committed usage.
  
* **Hourly Usage** 
  
  Shows the hourly PPS. The red line represents the commit level. If the hourly usage exceeds the committed rate with more than 5% for a given month, you will incur overage charges.

* **Month Over Month Change** 

   Shows a comparison res the current month with the previous month.

* **Last 12 Months Usage** 
   
  Shows your billed usage over the last year. The red line represents your commit level.

In the **Optimize Usage** section of the dashboard, you can see a list of charts that lets you investigate further which accounts contribute the most and which are the top increasing metrics, so that you can investigate usage patterns.

 ![Usage summary per ingestion policy](images/usage_summary_per_policy.png)


## Example: Monitor Which Teams Are Responsible for How Much Ingested Data

Consider the following example. You are administering a Wavefront cluster for two big teams, `IT Team1` and `IT Team2`, and you want to monitor how much data each of the team uses. `IT Team1` usually needs more PPS data, and you have only 10K of committed PPS on a monthly basis.

You can create an ingestion policy for each team to monitor how much data each team uses per month. You can also set PPS limits for each ingestion policy and if a team consumes more than expected, you can provide additional training on how to use ingested data wisely. 

Our Customer Success Team has put together KB articles that drill down into adoption info.

* [How to Track Adoption in Your Company with Usage Metadata](https://help.wavefront.com/hc/en-us/articles/360058526192-How-to-Track-Tanzu-Observability-Adoption-with-Usage-Metadata).
* [How to Identify Unused Data](https://help.wavefront.com/hc/en-us/articles/360058084372-How-to-Identify-Unused-Data).
* [How to Optimize Your Ingestion Rate PPS](https://help.wavefront.com/hc/en-us/articles/360057995092-How-to-Optimize-Your-Ingestion-Rate-PPS-).
* [How to Request a PPS Add-On to Current Committed Rate](https://help.wavefront.com/hc/en-us/articles/4402939921044-How-to-request-a-PPS-add-on-to-current-committed-rate).
