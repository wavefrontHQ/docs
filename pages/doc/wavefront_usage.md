---
title: Examine Ingestion Breakdown
tags: [administration, dashboards]
sidebar: doc_sidebar
published: false
permalink: wavefront_usage.html
summary: Monitor usage with ingestion policies and usage dashboards.
---
<!---Renamed this file to ingestion_policies.md/html--->

As a Wavefront administrator, you're interested in usage patterns for the whole company, but also for different teams in the company. You can create ingestion policies and assign users to each policy to see which teams use which part of total ingestion. You can even drill down to individual users from the Ingestion Breakdown dashboard.

You can examine the performance of your Wavefront instance using [wftop](), [Wavefront spy](wavefront_monitoring_spy.html), and the [Slow Queries dashboard](wavefront_monitoring.html#examine-slow-queries). In addition, you can find out usage on a per-user basis using ingestion policies and the usage dashboards.

## Ingestion Policy Basics

Ingestion policies allow you to group users and then examine their usage in the **Wavefront Ingestion Policy Explorer** for your cluster. For example, you can create a policy, add all users that joined in the last 6 months, and examine whether they show unusually high usage because they're not yet experienced. If yes, you could provide additional training.

### Permissions

Users with **Accounts&Groups** permissions can create ingestion policies and add user accounts or service accounts.
* Each user can belong to only one policy at a time. That way, you never count usage of a user twice.
* You can add accounts and service accounts to the same policy.

### Unassigned Policy

The Ingestion Breakdown dashboard includes an **Unassigned** policy that shows the total for all users who aren't in an ingestion policy that you created.

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

You examine usage for users in different policies or for individual users from the Ingestion Breakdown dashboard.

### Administrators

Administrators with **Accounts&Groups** permissions can go the Ingestion Breakdown dashboard directy from the Ingestion Policies page.

![ingestion breakdown link](images/ingestion_breakdown_dashboard_link.png)

### All Users

All users can go to the

1. Find the Wavefront Usage integration.
   1. Select **Integrations** in the menu bar, type **Wavefront Usage**, and select the integration.
   2. Click **Dashboards** and select **Wavefront Ingestion Policy Explorer**.
2. Use the dashboard to explore the policies.

Here's a simple example we've used in our demos:

![ingestion breakdown](images/ingestion_usage_breakdown.png)
