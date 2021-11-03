---
title: Examine Ingestion Breakdown
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: ingestion_policies.html
summary: Monitor usage with ingestion policies and usage dashboards.
---

As a Wavefront Super Admin, you're interested in usage patterns for the whole company, but also for different teams in the company. You can create ingestion policies and assign user accounts or groups to each policy to see which teams use which part of total ingestion.

You can examine the performance of your Wavefront instance using [wftop](), [Wavefront spy](wavefront_monitoring_spy.html), and the [Slow Queries dashboard](wavefront_monitoring.html#examine-slow-queries). In addition, you can find out usage on a per-account or per-group basis using ingestion policies.

**Note:** When you create a new ingestion policy, it can take a few minutes for the data to become available in the Wavefront Usage dashboard.

## Ingestion Policy Basics

Ingestion policies allow you to group user accounts or user groups and then examine their usage for your cluster. For example, you can create a policy, add all accounts that joined in the last 6 months, and examine whether they show unusually high usage because they're not yet experienced. If yes, you could provide additional training. You can also set a Points per Second (PPS) limit to an ingestion policy, so that you can track how much of the PPS is used and whether you will need more PPS in the future.

### Permissions

Users with **Accounts, Groups & Roles** permission can create ingestion policies and add user accounts, service accounts, or groups to the policies.
* Each account can belong to only one policy at a time. That way, you never count usage of an account twice.
* You can add user accounts and service accounts to the same policy.
* Once you set the scope to user accounts or to user groups, you cannot edit it. This means, that if you decide that you want an ingestion policy to be assigned to specific accounts, when you edit the policy, you cannot change the scope to user groups.


## Create an Ingestion Policy

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Usage Portal**
3. Click the **Ingestion Policies** tab, and click **New Ingestion Policy**.
4. In the **Data** panel:
   1. Choose the **Scope** of the policy.
  
      This can be either **Accounts** or **Groups**.
   2. Depending your choice, enter the user accounts or user groups to assign to the ingestion policy.
   3. Select whether you want to set a PPS limit. 
      If you choose to set a PPS limit, you must enter the points per second limit number in the **PPS per billing period** text box.
   4. Click **Next**.
   5. Enter the name of the policy and click **Create**.

Each user account or user group can only belong to one policy. If an account is greyed out in the drop-down menu, it already belongs to another policy.

## Examine Usage

You examine usage for accounts in different policies or for individual accounts from the Ingestion Breakdown dashboard.

### Administrators

Administrators with **Accounts, Groups & Roles** permission can go the Ingestion Breakdown dashboard directly from the Ingestion Policies page.

![ingestion breakdown link](images/ingestion_breakdown_dashboard_link.png)

### All Users

All users can go to the Ingestion Breakdown dashboard and explore the policies.

1. Find the Wavefront Usage integration.
   1. Click **Integrations** in the taskbar, type **Wavefront Usage**, and click the integration tile.
   2. Click **Dashboards** and select **Wavefront Ingestion Policy Explorer**.
2. Use the dashboard to explore the policies.

Here's a simple example we've used in our demos:

![ingestion breakdown](images/ingestion_usage_breakdown.png)

## Export Usage Data

You can export usage data in CSV format. Click the ellipsis icon in the top right and select **Export CSV**. The resulting file has all the information available in the current dashboard. Use the time picker to change the information you export.

![export ingestion data](images/export_ingestion_data.png)
