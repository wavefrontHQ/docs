---
title: Examine the Wavefront Usage Per Ingestion Policy
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

In the **Optimize Usage** section of the dashboard, you can see a list of charts that lets you investigate further which accounts contribute the most, which are the top metrics by namespace, and which are the top increasing metrics, so that you can investigate usage patterns.

 ![Usage summary per ingestion policy](images/usage_summary_per_policy.png)
