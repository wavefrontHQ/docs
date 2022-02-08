---
title: Examine Ingestion Breakdown
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: ingestion_policies.html
summary: Monitor usage with ingestion policies and usage dashboards.
---

As a Wavefront administrator, you're interested in usage patterns for the whole company, but also for different teams in the company. You can create ingestion policies and assign accounts (user or service accounts) to each policy to see which teams use which part of total ingestion. You can even drill down to individual users from the Ingestion Breakdown dashboard.

You can examine the performance of your Wavefront instance using [wftop](), [Wavefront spy](wavefront_monitoring_spy.html), and the [Slow Query  dashboard](monitoring_overview.html#find-slow-queries-and-improve-dashboard-response). In addition, you can find out usage on a per-account basis using ingestion policies and a Wavefront Usage integration dashboards.

**Note:** When you create a new ingestion policy, it can take a few minutes for the data to become available in the Wavefront Usage dashboard.

## Ingestion Policy Basics

Ingestion policies allow you to group accounts and then examine their usage in the **Wavefront Ingestion Policy Explorer** for your cluster. For example, you can create a policy, add all accounts that joined in the last 6 months, and examine whether they show unusually high usage because they're not yet experienced. If yes, you could provide additional training.

### Permissions

Users with **Accounts, Groups & Roles** permission can create ingestion policies and add user accounts or service accounts.
* Each account can belong to only one policy at a time. That way, you never count usage of an account twice.
* You can add user accounts and service accounts to the same policy.

### Unassigned Policy

The Ingestion Breakdown dashboard includes an **Unassigned** policy that shows the total for all accounts who aren't in an ingestion policy that you created.

## Create an Ingestion Policy

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Ingestion Policies**
3. Click **Create Policy**.
4. In the dialog:
   1. Specify the name and optionally a description.
   2. Specify users, service accounts, or both.
   3. Click **Create**.

Each account can only belong to one policy. If an account is greyed out in the drop-down menu, it already belongs to another policy.

## Examine Usage

You examine usage for accounts in different policies or for individual accounts from the Ingestion Breakdown dashboard.

### Administrators

Administrators with **Accounts** permission can go the Ingestion Breakdown dashboard directly from the Ingestion Policies page.

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
