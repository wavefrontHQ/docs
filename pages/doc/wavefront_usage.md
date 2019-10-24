---
title: Examine Ingestion Breakdown
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_usage.html
summary: Monitor usage with ingestion policies and usage dashboards.
---

As a Wavefront administrator, you might be curious who is sending high amounts of data to the Wavefront instance. You can create ingestion policies and assign users to each policy to find potential problem accounts.

You can look at the performance of your Wavefront instance using [wftop](), [Wavefront spy](wavefront_monitoring_spy.html), and the [Slow Queries dashboard](wavefront_monitoring.html#examine-slow-queries). In addition, you can find out usage on a per-user basis using ingestion policies and the usage dashboards.

## Ingestion Policy Basics

Ingestion policies allow you to group users and then examine their usage in the **Wavefront Ingestion (PPS) Usage Breakdown** for your cluster. For example, you can create a policy, add all users that joined in the last 6 months, and examine whether they show unusually high usage because they're not yet experienced. If yes, you could provide additional training.

Users who are Super Admin can create ingestion policies and add user accounts or service accounts.
* Each user can belong to only one policy at a time. That way, you never count usage of a user twice.
* You can add accounts and service accounts to the same policy.

## Create an Ingestion Policy

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon, select **Ingestion Policies**
3. Click **Create Policy**.
4. In the dialog:
   1. Specify the name and optionally a description.
   2. Specify users, service accounts, or both.
   3. Click **Create**.

Each account can only belong to one policy. If an account is greyed out in the pulldown menu, it already belongs to another policy.

## Examine Usage

You examine usage for users in different policies or for individual users from the Usage dashboard.

1. Find the Wavefront Usage integration.
   1. Select **Integrations** in the menu bar, type **Wavefront Usage**, and select the integration.
   2. Click **Dashboards** and select **Wavefront Ingestion (PPS) Usage Breakdown**.
2. Use the dashboard to explore the policies.

Here's a simple example we've used in our demos:

![ingestion breakdown](images/ingestion_usage_breakdown.png)
