---
title: Managing Metrics Security Policy Rules
keywords: administration
tags: [administration]
sidebar: doc_sidebar
published: false
permalink: metrics_security.html
summary: Limit access to metrics with policy rules.
---
In a large enterprise, certain data are confidential. Wavefront allows you to limit who can see or modify data in several ways.
* **Permissions** are **global** settings.
  - Some permissions limit who can modify Wavefront objects. For example, only users with **Dashboards** permission can modify dashboards.
  -  Other permissions make certain information completely invisible. For example, only uses with SAML IDP Admin permission can see the **Self Service SAML** menu or access that page.
* **Access Control** allows administrators with the right permissions fine-grained control over individual dashboards or alerts. For example, it's possible to limit view and modify access to a Finance_2020 dashboard to the Finance department.
* **Metrics Security Policy Rules** support even fine-grained control. For example, you can give access to the Finance_2020 dashboard to the Finance team, but you can set up policy rules so that certain metrics are visible only to the leadership team.

{% include note.html content="You must have Metrics permission to set up Metrics Security Policy rules. " %}

## Create a Metrics Security Policy Rule

When you create a Metrics Security Policy rule, you specify the metrics you want to protect (or make available) and the account, group, or role that should have access (or no access) to those metrics.

{% include note.html content="You must have **Metrics** permission to create a Metrics Security Policy rule." %}

1. From the gear icon, select **Metrics Security Policy** and click **Create Rule**
2. In the **Create Rule** dialog, specify the rule parameters.
  1. Specify a descriptive name. Users might later modify the rule, so a clear name is essential.
  2. Add a description. The description is visible only when you edit the rule. The name is visible on the Metrics Security Policy page.
  3. Specify the metrics that you want to protect (or make available) by using a metrics prefix. You can specify the metric (e.g. `~sample.network.bytes.sent`) or a wildcard match (e.g. `~sample.network.bytes.*` or `~sample.network.*`)
  4. Optionally, specify one or more sources and point tags.
     * Specify key=value pairs, for example, `source="app-24"` or `env=dev`.
     * If you want to specify multiple key=value pairs, select on the right whether you want to combine them with `and` or `or`.
  5. Specify the Access definition for the rule.
    1. Select **Allow** or **Block**.
    2. Select an account name, a group, or a role that you want to block or grant visibility into this metric.
  3. Click **OK.**

## Manage Metrics Security Policy Rules

The following annotated screenshot gives an overview of rule management options:

![screenshot, annotated with the items explained below](images/metrics_security_annotated.png)

* In the top row, you can click **Create Rule** and also access the Version history, which allows you to revert to an earlier version of the policy.
* Information on who last edited the security policy and when that happens is always included.
* The buttons allow you to clone or delete selected rules or to move them up or down.
* You can also hover over the six-dot icon to explicitly drag a rule where you want it.
* If you've moved, cloned, or deleted one or more rules, use the **Undo** button to undo the change, or **Redo** to revert the undo.
* The **Metric Prefix** column shows the metrics affected by a rule.
* The **Access** column shows whether the rule allows or blocks access.
