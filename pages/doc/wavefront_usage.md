---
title: Monitoring Wavefront Usage
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_usage.html
summary: Monitor usage with ingestion policies and usage dashboards.
---

You can look at the performance of your Wavefront instance using [wftop](), [Wavefront spy](wavefront_monitoring_spy.html), and the [Slow Queries dashboard](wavefront_monitoring.html#examine-slow-queries). In addition, you can find out usage on a per-user basis using ingestion policies and the usage dashboards.


## Combine Users in an Ingestion Policy

Ingestion policies allow you to group users and then examine their usage in the Usage Dashboard for your cluster. For example, you could create a policy, add all users that joined in the last 6 months, and examine whether they show unusually high usage. If yes, you could provide additional training.
* Users who are SuperAdmin can create ingestion policies and add user accounts or service accounts.
* Each user can belong to only one policy at a time. That way, you never count usage of a user twice.
* You can add accounts and service accounts to the same policy.

### Create an Ingestion Policy

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon, select **Ingestion Policy**
3. Click **Create Policy**.
4. In the dialog, specify the name and optionally a description, one or more users, and one or more service accounts and click **Create**.
   Each account can only belong to one policy. If an account is greyed out in the pulldown menu, it already belongs to another policy.

## Examine Usage

You examine usage for users in different policies or for individual users from the Usage dashboard.
