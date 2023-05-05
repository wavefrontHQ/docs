---
title: Metrics Security Policy Rules
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_metrics_security.html
summary: Use metrics security to control access to time series, histograms, and delta counters.
---

In a large enterprise, certain data is confidential. VMware Aria Operations for Applications allows you to limit who can see or modify data in several ways.
* **Permissions** are **global** settings.
  - Some permissions limit who can modify objects (e.g. proxies or events). For example, users with the **Dashboards** permission can modify all dashboards.
  - Other permissions make certain information completely invisible. For example, only users with **Ingestion Policies** permission can see the **Ingestion Policies** menu or access that page.
* **Access Control** allows users with the **Super Admin** service role to perform fine-grained control over individual dashboards or alerts. For example, it's possible to limit view and modify access to a Finance_2020 dashboard to just the Finance department.
* **Metrics Security** supports even finer-grained control. In the example above, access to the Finance_2020 dashboard is limited to the Finance department. With metrics security, you can limit access to confidential time series, histogram, and delta counter metrics to the leadership team.

{% include important.html content="This feature is not available on all service instances." %}

{% include note.html content="Only users with the **Super Admin** service role and users with the **Metrics** permission can view, create, and manage metrics security policy. " %}

## Video: Metrics Security Policy

Watch this <a href="ttps://vmwaretv.vmware.com/media/t/1_3ea13tor" target="_blank">video<img src="/images/video_camera.png" alt="video camera icon"/></a> for an overview.

<p>
<iframe id="kmsembed-1_3ea13tor" width="700" height="400" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_3ea13tor/uiConfId/49694343/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" referrerPolicy="no-referrer-when-downgrade"></iframe></td>
</p>

## How Metrics Security Protects Sensitive Data

Metrics security policy rules allows fine-grained support for limiting access to sensitive data.

### Block or Allow Access

With a metrics security policy, you can block or allow access:
* To metrics, optionally filtered by source or point tag
* Based on groups or individual users.

When an account attempts to access metrics, the backend looks at the rules in priority order. Higher priority rules overwrite lower priority rules.

For example, assume you have two rules:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Name</th><th width="15%">Priority</th><th width="30%">Metrics</th><th width="30%">Accounts</th></tr>
</thead>
<tr>
<td markdown="span">BlockRevenueNumbers</td>
<td>2</td>
<td>All metrics that start with <code>revenue*</code></td>
<td>All accounts</td>
</tr>
<tr>
<td markdown="span">AllowRevenueFinance</td>
<td>1</td>
<td>All metrics that start with <code>revenue*</code></td>
<td>All accounts in Finance group</td>
</tr>
</tbody>
</table>

After the rules are in force, only users in the Finance group can access data that starts with `revenue*`.


### Sensitive Data Become Invisible

Data protected by a metrics security policy rule can become invisible to users.

* **Not visible in charts**. The chart either includes a warning that some metrics are protected, or, if all metrics are protected, the chart shows only the message.
* **Not visible in alerts** (if **Secure Metrics Details** is selected for the alert). The alert fires based on the complete set of metrics, and the complete set is shown in notification images by default. A check box allows administrators to [hide alert details](alerts_notifications.html#alert-notification-with-secured-metrics-details) so that confidential metrics are not shown.
* **Not visible in auto-complete** in Chart Builder, Query Editor, Metrics browser, etc.

### Rule Priority and Rule Pairs

Rules are evaluated in priority order. In many cases, it's useful to think of pairs of rules, for example:

* Create a rule that blocks access to all metrics for a user group. For example, **Block all**. This rule is with lower priority.
* Create another rule to allow access to a small set of metrics for that user group. E.g. metrics starting with the `cpu.*` prefix and that are tagged with `env=dev`, i.e. developers environment. For example **Allow CPU metrics**. This rule is with higher priority.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="35%">Name</th><th width="20%">Priority</th><th width="45%">Metrics</th></tr>
</thead>
<tr>
<td markdown="span">Allow metrics</td>
<td>1</td>
<td>Allow access to metrics starting with the <code>cpu.*</code> prefix and with point tag <code>env=dev</code>.</td>
</tr>
<tr>
<td markdown="span">Block all</td>
<td>2</td>
<td>Block all metrics</td>
</tr>
</tbody>
</table>

When you apply this policy, the users included in the user group will have access to the metrics starting with the `cpu.` prefix and point tag `env=dev`, because the **Allow metrics** rule overrides the **Block all** rule. 



See the Examples below for some scenarios.

### Alert Notifications

To protect metrics from inclusion in alert notifications, use the **Secure Metrics Details** check box. Operations for Applications looks at all metrics when determining when an alert status should change and shows them in alert notifications. When the check box is selected, [details are not shown](alerts_notifications.html#alert-notification-with-secured-metrics-details) in the notification.

### Derived Metrics and Events


The current implementation has limitations:
* Does not protect metrics in events.
* Does not protect metrics in the **Derived Metrics** browser. When you select **Browse > Derived Metrics**, you still see metrics on that page even if a metrics security policy rule blocks access for you elsewhere in the GUI.


### Warning Messages for Protected Metrics

* **Charts in Dashboard**. If certain charts in a dashboard include protected metrics, those charts display that information, as follows:
  * **Some metrics protected**. If some metrics in a chart are protected, the chart shows metrics but includes the following Warning message.
   ```
   Some metrics returned by this query might be excluded due to metrics security policy rules.
   ```
   * **All metrics protected**. If all metrics in a chart are protected, the chart shows only the following message:
   ```
   All metrics in this chart are excluded due to metrics security policy rules.
   ```
* **Chart in Edit Mode**. When you edit a chart and your query result include protected metrics, the following message is displayed below the query.

   ```
   All metrics returned by this query are excluded due to metrics security policy rules.
   ```


<!---

## Example: Limited Access for Engineering

Consider this simple example:

* An environment includes metrics that the developer team needs to see and some financial metrics that only the CFO and finance team should see.
* Your main priority is to protect the sensitive metrics, so you create 2 rules:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Name</th><th width="15%">Priority</th><th width="30%">Metrics</th><th width="30%">Accounts</th></tr>
</thead>
<tr>
<td markdown="span">Block</td>
<td>2</td>
<td>Block all metrics</td>
<td>Developer group</td>
</tr>
<tr>
<td markdown="span">Allow Infra and Related Metrics</td>
<td>1</td>
<td>Metrics with point tag env=production or env=dev (but not env=finance)</td>
<td>All accounts in Developer group.</td>
</tr>
</tbody>
</table>


![two rules, described above, shown in UI](images/m_security_rules.png)
--->


## Create a Metrics Security Policy Rule

Privileged users can create rules, change rule priority, and change the scope of each rule.

{% include note.html content="Only a Super Admin user or users with **Metrics** permission can view, create, and manage a metrics security policy. " %}

### Plan Your Strategy

Before you create rules, plan your strategy.

* **Metrics Dimensions** allow you to determine what to block or allow.
  - Specify one or more metric prefixes. You can specify an exact match (e.g. `requests` or `request.`) or a wildcard match (e.g. `*.cpu.loadavg.*`, `cpu.*`).
  - Specify a combination of metric sources or point tags to narrow down the metrics. For example, you can block visibility into production environments for some developers, or you can block some development environments metrics for contractors.
* **Access** allows you to allow or block access for a combination of user accounts or groups.

See the Examples further below.

### Create One or More Rules

You create a metrics security policy rule following these steps. See the annotated screenshot below for an example.

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Metrics Security Policy** and click **Create Rule**
2. In the **Create Rule** dialog, specify the rule parameters.
  1. Specify a meaningful name and, optionally, a description. 
      
      Users might later modify the rule, so a clear name is essential. The description is visible only when you edit the rule. The name is visible on the Metrics Security Policy page.

  4. Specify and describe the metrics:
     * You can specify the full metric name or use a wildcard character in metric names, sources, or point tags. The wildcard character alone (`*`) means all metrics.
     * Specify key=value pairs, for example, `source="app-24"` or `env=dev`.
     * If you want to specify multiple key=value pairs, select whether you want to combine them with `and` or `or` using the dropdown menu on the right.
  5. Specify the Access definition for the rule.
     1. Select **Allow** or **Block** from the menu.
     2. Specify user accounts or groups.
  3. Click **OK.**


Here's an annotated screenshot that shows the main actions:

![Annotated Edit Rule screenshot. Highlights Press Enter in Prefix / Source and Point Tag section](images/metrics_s_edit_rule.png)




## Manage Multiple Metrics Security Policy Rules

The following annotated screenshot gives an overview of rule management options:

![screenshot, annotated with the items explained below](images/metrics_security_annotated.png)

<!---Have to change screenshot to show Save instead of Apply--->

Here's a tour:

1. Click **Version History** to:
  * Revert to an earlier version of the policy.
  * Look at information on who last edited the security policy and when that happened.
1. Examine the **Metric Prefix** column to see the metrics affected by a rule.
2. Look at the **Access** column to see whether the rule allows or blocks access.
1. Select the check box to the left of a rule to select it, then use the icons above to clone or delete the selected rule.
1. Select the check boxes to the left of multiple rules to select them, use the icons to indicate changes, and click **Save** to commit the changes.
1. Click the six-dot icon to explicitly drag a rule where you want it and change the rule prioritization.
1. If you've moved, cloned, or deleted one or more rules, use the **Undo** button to undo the change, or **Redo** to revert the undo.



## Example for Metrics Security Policies

Before you start, plan your strategy. Here are some common scenarios.

### Example: Restrict Access to Confidential Metrics

This example restricts access to specific ranges of highly-sensitive metrics, say revenue numbers, to select groups of users.

![Screenshot of policy rules, where the finance group can access revenue numbers.](images/metrics_security_restrict.png)

The image above shows how to restrict metrics starting with `revenue.*` to  be accessible only by members of the group `Finance`. The policy grants all users access to all other metrics.

* When the metric `revenue.saas` is queried by a user in the `Finance` group, this access matches Rule 1 (**Finance Group can access Revenue**). The rule grants the access, so the metric is shown to the user and no other rules are consulted.

* When the metric `revenue.saas` is queried by a user **not** in the `Finance` group, the access does **not** match Rule 1. The engine moves on to Rule 2 (**No one else can access Revenue**), which matches because all users belong to the Everyone group. Because the rule denies the access, the metric is not shown to the user. No other rules are consulted.

### Example: Restrict Access for a Group of Users

This example restricts access for a group of users, making only a subset of the metrics in the system available to them.

![Screenshot of policy rules making only a subset of the metrics available to a group of users.](images/metrics_security_group.png)

The image above shows how to restricts access for users in the group `Contractors`. Those users can only query metrics tagged with the point tag `env=dev`. This policy imposes no restrictions on any other groups.

* When a user belonging to group `Contractors` runs a query for `cpu.usage` tagged with `env=dev`, this access matches Rule 1 (**Contractors can access dev environment metrics**) and access is granted.
* But when the user issues a query for `cpu.usage` tagged with `env=prod`, this access does not match Rule 1. Rule 2 (**Contractors cannot access any other metrics**) acts as a catch-all for users of group `Contractors` and denies them access to this metric.


{% include note.html content="Because the first rule (**Contractors can access dev environment metrics**) uses only point tags/sources as metrics dimensions, the users in the Contractors group will not see metrics in the Metrics Browser and when they create queries, autocomplete will not work for them."%}

### Example: Restrict Access to All Except Specific Metrics

This example restricts access to all metrics except for two specific groups of metrics that are additionally narrowed down by specifying tags. 

![Screenshot of a policy rule restricting access to all metrics except for a specific group of metrics](images/metrics-security-policy-block-all.png)

The image above shows how to restrict access for a specific user. The user cannot access any metrics except the ones specified in the first two rules. This Metrics Security Policy can also be applied to a user group.

* Rule 3 (**Block all**) restricts access to all existing metrics for the user. 
* Rule 2 (**Allow by tag**) provides access to all metrics that start with the prefix `customer.` and `customerStatus=ACTIVE` tag. 
* Rule 1 (**Allow by tag for K8s integration**) provides access to all metrics with the `kubernetes.` prefix for a specific cluster.

 When you apply the above security policy, the user *CAN* see all metrics starting with the `customer.` and `kubernetes.` prefixes in the Metrics Browser. Also, the user *CAN* explore and create charts with the `customer.*` metrics having the `customerStatus=ACTIVE` tag and the `kubernetes.` metrics for the specific cluster. Autocomplete will work of these metrics.


### Example: Strictly Limit Access on a Need-to-Know Basis

Some companies want to make metric accessible only to the team that needs to know about it. Access to metrics outside a team’s scope of work is disabled.  Only administrators are allowed access to all metrics.

![Screenshot of policy rules making a metric accessible only to the team that needs to know about it](images/metrics_security_need_to_know.png)

The image above shows how to use a set of rules to accomplish this.

* Rule 4 (**Block All Metrics by default**) applies to any access that doesn't match a higher-up rule. It denies access to all users. Users get access only when an "exception" rule with higher priority access matches.
* Rule 3 (**Allow All Metrics to Admins**) grants access to all metrics to users in the `Admins` group.
* Rule 2 (**Allow Gadgets Team access to Gadget Metrics**) grants access to any metrics starting with `gadget.*` to members of the `Gadgets` group.
* Rule 1 (**Allow Widgets Team access to Widget Metrics**) grants access to any metrics starting with `widget.*` to members of the `Widgets` group.

In this example, ordering (priority) between rules 1 and 2 does not matter because describe rules for independent metric regions.

With this policy in place:
* Members of the `Widgets` group are granted access if the metric starts with `widget.*` (Rule 1) and denied otherwise (Rule 4).
* Members of the `Gadgets` group are granted access if the metric starts with `gadget.*` (Rule 2) and denied otherwise (Rule 4).
* Members of the `Admins` group are granted access to all metrics (Rule 3).
* Users who don’t belong to the groups covered by the rules have no access.
