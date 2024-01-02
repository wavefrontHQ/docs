---
title: Security Policy Rules
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: security_policy.html
summary: Use security policies to to control access to metrics (time series, histograms, RED metrics and delta counters) and traces.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for **original** subscribers. For VMware Cloud services subscriptions, see [Metrics Security Policy Rules in Operations for Applications on VMware Cloud Services](csp_metrics_security.html)."%}

You can create security policies on VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) to protect your metrics and security data.

<img src="images/security_policies_overview.png" alt="An overview image that shows metrics and traces security policies." style="width:70%; max-width:1000">

In a large enterprise, certain data is confidential. Our service allows you to limit who can see or modify data in several ways.
* **Permissions** are **global** settings.
  - Some permissions limit who can modify objects (e.g. proxies or events). For example, users with **Dashboards** permission can modify all dashboards.
  -  Other permissions make certain information completely invisible. For example, only users with **SAML IdP Admin** permission can see the **Self Service SAML** menu or access that page.
* **Access Control** allows administrators with the right permissions fine-grained control over individual dashboards or alerts. For example, it's possible to limit view and modify access to a Finance_2020 dashboard to just the Finance department.
* **Metrics Security** supports even finer-grained control. In the example above, access to the Finance_2020 dashboard is limited to the Finance department. With metrics security, you can limit access to confidential time series, histogram, and delta counter metrics to the leadership team.
* **Traces Security** supports finer-grained control and limit access to confidential trace data from applications or services.

{% include important.html content="This feature is not available on all service instances." %}


## Block or Allow Access to Sensitive Data

With a security policy, you can block or allow access:
* To metrics, optionally filtered by source or point tag
* To traces, optionally filtered by source or point tag
* Based on groups, roles, and individual users.

When an account attempts to access metrics or traces, the backend looks at the rules in priority order. Higher priority rules overwrite lower priority rules.

### Metrics

For example, assume you have two metrics security rules:

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

### Traces

For example, assume you have two traces security rules:

<table>
<tbody>
<thead>
<tr><th width="30%">Name</th><th width="15%">Priority</th><th width="30%">Traces</th><th width="30%">Accounts</th></tr>
</thead>
<tr>
<td markdown="span">BlockPaymentService</td>
<td>2</td>
<td>All spans that include the <code>myapp.payment*</code> data.</td>
<td>All accounts</td>
</tr>
<tr>
<td markdown="span">AllowPaymentData</td>
<td>1</td>
<td>All spans that include the <code>myapp.payment*</code> data.</td>
<td>All accounts in Finance group</td>
</tr>
</tbody>
</table>

After the rules are in force, only the users in the Finance group: 

* See the payment service on the Application Status page.
* See the RED metrics for the Payment service on the Operations Dashboard.
* See the trace data that includes the payments service on the Traces Browser.

## Rule Priority and Rule Pairs

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

## Metrics Security Policy

You can block sensitive  metrics data from time series, histograms, RED metrics and delta counters so they don't show on charts and dashboards, and alerts.

{% include note.html content="Only a Super Admin user or users with **Metrics**  or **Applications** permission can view, create, and manage metrics security policy. " %}

### Video: Metrics Security Policy

Watch this <a href="ttps://vmwaretv.vmware.com/media/t/1_3ea13tor" target="_blank">video<img src="/images/video_camera.png" alt="video camera icon"/></a> for an overview. Note that this video was created in 2020 and some of the information in it might have changed. It also uses the 2020 version of the UI.

<p>
<iframe id="kmsembed-1_3ea13tor" width="700" height="400" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_3ea13tor/uiConfId/49694343/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" referrerPolicy="no-referrer-when-downgrade"></iframe></td>
</p>


### Sensitive Data Become Invisible

Data protected by a metrics security policy rule can become invisible to users.

* **Not visible in charts**. The chart either includes a warning that some metrics are protected, or, if all metrics are protected, the chart shows only the message.
* **Not visible in alerts** (if **Secure Metrics Details** is selected for the alert). The alert fires based on the complete set of metrics, and the complete set is shown in notification images by default. A check box allows administrators to [hide alert details](alerts_notifications.html#alert-notification-with-secured-metrics-details) so that confidential metrics are not shown.
* **Not visible in auto-complete** in Chart Builder, Query Editor, Metrics browser, etc.

### Alert Notifications

To protect metrics or RED metrics from inclusion in alert notifications, use the **Secure Metrics Details** check box. Operations for Applications looks at all metrics when determining when an alert status should change and shows them in alert notifications. When the check box is selected, [details are not shown](alerts_notifications.html#alert-notification-with-secured-metrics-details) in the notification.

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


### Create a Metrics Security Policy Rule

Privileged users can create rules, change rule priority, and change the scope of each rule.

{% include note.html content="Only a Super Admin user or users with **Metrics** or **Applications** permission can view, create, and manage a metrics security policy. " %}

#### Plan Your Strategy

Before you create rules, plan your strategy.

* **Metrics Dimensions** allow you to determine what to block or allow.
  - Specify one or more metric prefixes. You can specify an exact match (e.g. `requests` or `request.`) or a wildcard match (e.g. `*.cpu.loadavg.*`, `cpu.*`).
  - Specify a combination of metric sources or point tags to narrow down the metrics. For example, you can block visibility into production environments for some developers, or you can block some development environments metrics for contractors.
* **Access** allows you to allow or block access for a combination of accounts, groups, or roles.

See the Examples further below.

#### Create One or More Rules

You create a metrics security policy rule following these steps. See the annotated screenshot below for an example.

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Security Policy** and click **Create Rule**.
1. Make sure you are on the **Metrics Security Policy** tab. 
1. In the **Create Rule** dialog, specify the rule parameters.
  1. Specify a meaningful name and, optionally, a description. 
      
      Users might later modify the rule, so a clear name is essential. The description is visible only when you edit the rule. The name is visible on the Metrics Security Policy page.

  1. Specify and describe the metrics:
     * You can specify the full metric name or use a wildcard character in metric names, sources, or point tags. The wildcard character alone (`*`) means all metrics.
     * Specify key=value pairs, for example, `source="app-24"` or `env=dev`.
     * If you want to specify multiple key=value pairs, select whether you want to combine them with `and` or `or` using the dropdown menu on the right.
  1. Specify the Access definition for the rule.
     1. Select **Allow** or **Block** from the menu.
     2. Specify accounts, groups, or roles.
  1. Click **OK.**


Here's an annotated screenshot that shows the main actions:

![Annotated Edit Rule screenshot. Highlights Press Enter in Prefix / Source and Point Tag section](images/metrics_s_edit_rule.png)

### Example for Metrics Security Policies

Before you start, plan your strategy. Here are some common scenarios.

#### Example: Restrict Access to Confidential Metrics

This example restricts access to specific ranges of highly-sensitive metrics, say revenue numbers, to select groups of users.

![Screenshot of policy rules, where the finance group can access revenue numbers.](images/metrics_security_restrict.png)

The image above shows how to restrict metrics starting with `revenue.*` to  be accessible only by members of the group `Finance`. The policy grants all users access to all other metrics.

* When the metric `revenue.saas` is queried by a user in the `Finance` group, this access matches Rule 1 (**Finance Group can access Revenue**). The rule grants the access, so the metric is shown to the user and no other rules are consulted.

* When the metric `revenue.saas` is queried by a user **not** in the `Finance` group, the access does **not** match Rule 1. The engine moves on to Rule 2 (**No one else can access Revenue**), which matches because all users belong to the Everyone group. Because the rule denies the access, the metric is not shown to the user. No other rules are consulted.

#### Example: Restrict Access for a Group of Users

This example restricts access for a group of users, making only a subset of the metrics in the system available to them.

![Screenshot of policy rules making only a subset of the metrics available to a group of users.](images/metrics_security_group.png)

The image above shows how to restricts access for users in the group `Contractors`. Those users can only query metrics tagged with the point tag `env=dev`. This policy imposes no restrictions on any other groups.

* When a user belonging to group `Contractors` runs a query for `cpu.usage` tagged with `env=dev`, this access matches Rule 1 (**Contractors can access dev environment metrics**) and access is granted.
* But when the user issues a query for `cpu.usage` tagged with `env=prod`, this access does not match Rule 1. Rule 2 (**Contractors cannot access any other metrics**) acts as a catch-all for users of group `Contractors` and denies them access to this metric.


{% include note.html content="Because the first rule (**Contractors can access dev environment metrics**) uses only point tags/sources as metrics dimensions, the users in the Contractors group will not see metrics in the Metrics Browser and when they create queries, autocomplete will not work for them."%}

#### Example: Restrict Access for a User Role

This example restricts access for a specific user when the restrict rule is applied to a user role. The metrics security rules take into account both direct and indirect roles.

![Screenshot of a policy rule restricting access for a single user](images/metrics-security-policy-retail.png)

The image above shows how to restrict access for a user with the role `Operator`. The user cannot access any metrics.

By applying the above security policy:

* When a user who is in the `retail` group runs a query for metrics tagged with the `env=retail` point tag, access is granted.
* A user who is assigned with the `Operator` role (either directly or indirectly, coming from other user groups) cannot access any metrics at all, because Rule 2 (**Block all data**) is applied.

#### Example: Restrict Access to All Except Specific Metrics

This example restricts access to all metrics except for two specific groups of metrics that are additionally narrowed down by specifying tags. 

![Screenshot of a policy rule restricting access to all metrics except for a specific group of metrics](images/metrics-security-policy-block-all.png)

The image above shows how to restrict access for a specific user. The user cannot access any metrics except the ones specified in the first two rules. This Metrics Security Policy can also be applied to a user group.

* Rule 3 (**Block all**) restricts access to all existing metrics for the user. 
* Rule 2 (**Allow by tag**) provides access to all metrics that start with the prefix `customer.` and `customerStatus=ACTIVE` tag. 
* Rule 1 (**Allow by tag for K8s integration**) provides access to all metrics with the `kubernetes.` prefix for a specific cluster.

 When you apply the above security policy, the user *CAN* see all metrics starting with the `customer.` and `kubernetes.` prefixes in the Metrics Browser. Also, the user *CAN* explore and create charts with the `customer.*` metrics having the `customerStatus=ACTIVE` tag and the `kubernetes.` metrics for the specific cluster. Autocomplete will work of these metrics.


#### Example: Strictly Limit Access on a Need-to-Know Basis

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


## Traces Security Policies

You can block applications or services information from specific users so they don't see the data on the application status page, traces browser, application map, or operations dashboards.

{% include note.html content="Only a Super Admin user or users with **Metrics** or **Applications** permission can view, create, and manage a traces security policy. " %}

### Sensitive Data Become Invisible

Data protected by a traces security policy rule can become invisible to users.

* **Not visible on the Traces Browser**. If you are blocked from an application or service, you don't see the respective traces on the traces browser.
* **Not visible on the Application Status page**. You don't see the services that are blocked on this page for the table, app map, and grid view.
* **Not visible on the Service Dashboard**. The charts generated on the Service Dashboard does not have any data because the RED metrics related to the application or service are blocked.
  {% include note.html content="If you clone the out-of-the-box Service dashboard and don't update the queries in the charts, the tracing security policies do not apply to the cloned dashboard or the charts." %}
* **Not visible on the Operation Dashboard**. The charts generated on the Operations Dashboard does not have any data because the RED metrics related to the operations of the application or service are blocked.
  {% include note.html content="If you clone the out-of-the-box Operations dashboard and don't update the queries in the charts, the tracing security policies do not apply to the cloned dashboard or the charts." %}

### Create a Traces Security Policy Rule 

You create a traces security policy rule following these steps. See the annotated screenshot below for an example.

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Security Policy** and click **Create Rule**.
1. Make sure you are on the **Traces Security Policy** tab. 
1. In the **Create Rule** dialog, specify the rule parameters.
  1. Specify a meaningful name and, optionally, a description. 
      
      Users might later modify the rule, so a clear name is essential. The description is visible only when you edit the rule. The name is visible on the Security Policy page.

  1. Specify and describe the application or service:
     * You can specify the full application, service, and operation name or use a wildcard character in application name, service names, sources, or point tags. The wildcard character alone (`*`) means all traces.
     * Specify key=value pairs, for example, `source="app-24"` or `env=dev`.
     * If you want to specify multiple key=value pairs, select whether you want to combine them with `and` or `or` using the dropdown menu on the right.

     <a name="prefixes"></a>

     For example, assume that you have the following:
     * A `supermarket` application with the `vegetablesGreen`, `vegetablesRed`, `fruits`, and `dairy` services.
     * The `vegetablesGreen` service has the `add` and `purchased` operations.
     * Another application named `supermarket200`.
    
      <table style = "width: 100%;">
      <tr>
        <th width = "20%">Tracing Prefix</th>
        <th width = "20%">Example</th>
        <th width = "60%">Description</th>
      </tr>
      <tr>
        <td markdown="span">
          `applicationName*`
        </td>
        <td markdown="span">
          `supermarket*`
        </td>
        <td markdown="span">
          Using this prefix format, you can allow or block the trace data of all the applications that start with `supermarket`. In this example, trace data of the `supermarket` and `supermarket200` applications and their services can be blocked or shown to specific users.
        </td>
      </tr>
      <tr>
        <td markdown="span">
          `applicationName.*`
        </td>
        <td markdown="span">
          `supermarket.*`
        </td>
        <td markdown="span">
          Using this prefix format, you can allow or block the trace data of all the services in the `supermarket` application. It includes the `vegetablesGreen`, `vegetablesRed`, `fruits`, and `dairy` services. 
        </td>
      </tr>
      <tr>
        <td markdown="span">
          `applicationName.serviceName*`
        </td>
        <td markdown="span">
          `supermarket.vegtables*`
        </td>
        <td markdown="span">
          Using this prefix format, you can block or allow the trace operations data of all the services that start with `vegetables`. In this example, the traces operation data of the `vegetablesGreen` and `vegetablesRed` services can be blocked or shown to specific users. 
        </td>
      </tr>
      <tr>
        <td markdown="span">
          `applicationName.serviceName.*`
        </td>
        <td markdown="span">
          `supermarket.vegtablesGreen.*`
        </td>
        <td markdown="span">
          Using this prefix format, you can allow or block the traces operations data of the `supermarket` applications `egtablesGreen` service, which includes the `add` and `purchased` operations.
        </td>
      </tr>
    </table>
  1. Specify the Access definition for the rule.
     1. Select **Allow** or **Block** from the menu.
     2. Specify accounts, groups, or roles.
  1. Click **OK.**


Here's an annotated screenshot that shows the main actions:

![Annotated create traces security rule screenshot](images/traces_security_policy_create_rule.png)

### Examples of Traces Security Policy

In this example, you have a traces security policy created to block trace data from the RiderApp's passenger service for the everyone user group. When the traces security policy is in place:
* Users who belong to the everyone user group won't see the passenger service data on the traces browser, service dashboard, operations dashboard, and application status page.
* Super Admin users can see all the data.

![A screenshot of the traces security policy created to block the user group everyone from seeing data of the RiderApp's passenger service.](images/traces_security_policy_example.png)

The screenshots below show you how the blocked trace data does not show up for a user in the everyone user group and how the data shows up for a Super Admin user.

* Traces Browser: The Super Admin user can see the passenger service on the traces browser, while the other user can not see the passenger service on the traces browser.
  ![A screenshot of how the Super Admin user and a user that belongs to the everyone group sees data on the traces browser.](images/traces_security_policy_example_traces_browser.png)


* Application Map: The Super Admin user can see the passenger service on the application map, while the other user can not see the passenger service on the application map.
  ![A screenshot of how the Super Admin user and a user that belongs to the everyone group sees data on the application map.](images/traces_security_policy_example_service_map.png)


## Manage Multiple Security Policy Rules

The following annotated screenshot gives an overview of rule management options:

![screenshot, annotated with the items explained below](images/metrics_security_annotated.png)

<!---Have to change screenshot to show Save instead of Apply--->

{% include note.html content="With the 2023-45.x release, the metrics security policy moved to a new framework. Therefore, new updates you make to your security policy start from version 1 on the **Version History** page. For details, see [2023-45.x Release Notes](wavefront_release_notes.html#2023-45x-release-notes)." %}

Here's a tour:

1. Click **Version History** to:
  * Revert to an earlier version of the policy.
  * Look at information on who last edited the security policy and when that happened.
1. Examine the **Metric Prefix** column to see the metrics affected by a rule.
1. Look at the **Access** column to see whether the rule allows or blocks access.
1. Select the check box to the left of a rule to select it, then use the icons above to clone or delete the selected rule.
1. Select the check boxes to the left of multiple rules to select them, use the icons to indicate changes, and click **Save** to commit the changes.
1. Click the six-dot icon to explicitly drag a rule where you want it and change the rule prioritization.
1. If you've moved, cloned, or deleted one or more rules, use the **Undo** button to undo the change, or **Redo** to revert the undo.