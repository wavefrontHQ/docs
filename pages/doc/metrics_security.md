---
title: Managing Metrics Security Policy Rules
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: metrics_security.html
summary: Limit access to metrics with policy rules.
---

In a large enterprise, certain data are confidential. Wavefront allows you to limit who can see or modify data in several ways. 
* **Permissions** are **global** settings.
  - Some permissions limit who can modify Wavefront objects. For example, only users with **Dashboards** permission can modify dashboards.
  -  Other permissions make certain information completely invisible. For example, only uses with SAML IDP Admin permission can see the **Self Service SAML** menu or access that page.
* **Access Control** allows administrators with the right permissions fine-grained control over individual dashboards or alerts. For example, it's possible to limit view and modify access to a Finance_2020 dashboard to the Finance department.
* **Metrics Security Policy Rules** support even fine-grained control. For example, you can give access to the Finance_2020 dashboard to the Finance team, but you can set up policy rules so that certain metrics are visible only to the leadership team.

{% include note.html content="Only a Super Admin user or a user with Metrics permission can create and manage Metrics Security Policy rules." %}

## How Metrics Security Policy Rules Protect Sensitive Data

Metrics security rules allow fine-grained support for limiting access to sensitive data.

### Block or Allow Access

Wavefront supports rules that block access and rules that allow access. When an account attempts to access data, the backend looks at the rules in priority order.

For example, assume you have two rules:
* Rule 1 blocks access to all data that start with `revenue*` to all users.
* Rule 2 allows access to data that start with `revenue*` to users in the Finance group.

In that case, all users in the Finance group can access data that start with `revenue*`.

If you reverse the rule order, you block access to all users, and even the users in the Finance group can no longer access the `revenue*` data.


### Sensitive Data Become Invisible

Data protected by a metrics security policy rule can become completely invisible to users:

* Not visible in charts. The chart either includes a warning that some metrics are protected, or, if all metrics are protected, the chart shows only the message on a white background.
* Not visible in alerts. The alert fires based on the complete set of metrics, but if certain users don't have access to some of the metrics they do not see them in alert notifications or alert charts. A checkbox allows administrators to hide alert details to avoid confusion.
* Not visible in auto-complete in Chart Builder, Query Editor, Metrics browser, etc.

For alerts, it can be confusing if a user receives a notification and cannot actually see all the metrics that (together) caused the alert. There's a new option that sends a simplified alert notification that doesn't include the potentially confusing image.

## Best Practices for Policy Rules

Before you start, consider best practices.

### Block, Allow, and Other Options

Wavefront offers a lot of flexibility in rule creation:

![Annotated Edit Rule screenshot. Highlights Press Enter in Prefix / Source and Point Tag section](images/metrics_s_edit_rule.png)

**Metrics Dimensions** allow you to determine what to filter or allow.
{% include tip.html content="Press enter after adding a metrics dimension." %}
  - Specify one or more metric prefixes. You can specify exact match (e.g. `requests` or `request.`) or wildcard match (e.g. `*.cpuloadav*`, `cpu.*`).
  - Optionally specify sources or point tag to narrow down the metrics. For example, you could block visibility into production environments for some developers, or block some development environments for contractors.
  - For sources and point tags, you can select `or` or `and`.
* **Access** allows you to allow or block access, either for accounts and/or groups or for roles. You can specify more than one account, group, or role

### Rule Priority and Rule Pairs

Rules are evaluated in priority order. In many cases, it's useful to think of pairs of rules, for example:

* First block access to all metrics for a group (Priority 2)
* Allow access to a small set of metrics (e.g. `*developer*`) for that group (Priority 1)

Because Priority 1 overrides Priority 2, the group has access to a small set of metrics. If you flip the Priority, then the group has no access to any metrics.

## Example: Limited Access for Engineering

Consider this simplistic example:

* An environment include metrics that the developer team needs to see and some financial metrics that only the CFO and finance team should see.
* Your main priority is to protect the sensitive metrics, so you create 2 rules:
  1. `Block All Metrics` blocks all metrics for users in the Developer group.
  2. `Allow Infra and Related Metrics` gives the Developer group access to the metrics that they need to see.

![two rules, described above, shown in UI](images/m_security_rules.png)



## Create a Metrics Security Policy Rule

When you create a Metrics Security Policy rule, you specify the metrics you want to protect (or make available) and the account, group, or role that should have access (or no access) to those metrics.

{% include note.html content="Only the Super Admin user or user with **Metrics** permissions can view, create, and manage metrics security policy rules. " %}

1. From the gear icon, select **Metrics Security Policy** and click **Create Rule**
2. In the **Create Rule** dialog, specify the rule parameters.
  1. Specify a descriptive name. Users might later modify the rule, so a clear name is essential.
  2. Add a description. The description is visible only when you edit the rule. The name is visible on the Metrics Security Policy page.
  3. Specify the metrics that you want to protect (or make available) by using a metrics prefix. You can specify the metric (e.g. `~sample.network.bytes.sent`) or a wildcard match (e.g. `~sample.network.bytes.*` or `~sample.network.*`)
     {% include tip.html content="Press enter after adding a metrics dimension." %}
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
