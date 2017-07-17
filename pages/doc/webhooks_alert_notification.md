---
title: Using Webhooks to Integrate Alerts with Notification Systems
keywords: webhooks
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: webhooks_alert_notification.html
summary: Learn how to use webhooks to integrate alerts and notification systems.
---

Wavefront uses webhooks to integrate alerts with many types of notification systems. A webhook is a user-defined HTTP
callback triggered when an alert changes state. When the state change occurs, Wavefront makes an HTTP POST
request to the URL configured for the webhook that contains data passed as a JSON payload.

This section describes how to create and configure webhooks and webhook payloads. You can use webhook templates, variables, and functions to construct virtually any type of payload. 

To integrate alerts with Slack, PagerDuty, HipChat, or VictorOps, follow the instructions in the [in-product integrations](integrations.html). Wavefront provides webhook templates for each of these systems.

To view and manage webhooks, select **Browse > Webhooks**.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view webhooks, you must have [Alert Management permission](permissions_overview.html) to manage webhooks. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>

## Creating a Webhook

To create a webhook:

1.  Select **Browse > Webhooks**.
1.  Click the **Create Webhook** button.
1.  Fill in the webhook properties.
    <table>
    <tbody>
    <thead>
    <tr><th>Property</th><th>Description</th></tr>
    </thead>
    <tr>
    <td>Name</td>
    <td>The name of the webhook. The name should be simple while still making it easy to identify its purpose.</td>
    </tr>
    <tr>
    <td>Triggers</td>
    <td>A set of one or more <a href="alerts_states_lifecycle.html">alert state changes</a> that trigger the webhook. The options are:
    <ul>
    <li>Alert Opened - When the alert is opened (fired).</li>
    <li>Alert Status Updated - When the status of an open alert changes. For example, a new source satisfies the alert condition and joins the set of affected sources.</li>
    <li>Alert Resolved - When the alert is resolved.</li>
    <li>Alert Affected by Maintenance Window - When the alert is affected by a maintenance window.</li>
    <li>Alert Snoozed - When the alert is snoozed.</li>
    <li>Alert Has No Data - When the series referenced in the alert condition is not reporting data.</li>
    <li>Alert Has No Data Resolved - When the series referenced in the alert condition has started reporting data after having no data.</li>
    <li>Alert Entered Maintenance From No Data - When the series referenced in the alert condition is not reporting data and is affected by a  maintenance window.</li>
    </ul>
    </td>
    </tr>
    <tr>
    <td>URL</td>
    <td>The REST endpoint of the receiving application, e.g. Slack.</td>
    </tr>
    <tr>
    <td>Content Type</td>
    <td>The content type of the POST body:
    <ul>
    <li>application/json</li>
    <li>text/html</li>
    <li>text/plain</li>
    <li>application/x-www-form-urlencoded</li>
    </ul>
    </td>
    </tr>
    <tr>
    <td>Custom Headers</td>
    <td>The name and value of one or more HTTP header to pass in the POST request.</td>
    </tr>
    <tr>
    <td>Webhook POST Body Template</td>
    <td markdown="span">Template for a payload that the webhook sends in the POST request.</td>
    </tr>
    <tr>
    <td>Description</td>
    <td>The purpose of the webhook.</td>
    </tr>
    </tbody>
    </table>
1. Select **Webhook POST Body Template > Template > \<template_type\>**, where \<template_type\> is Default, Slack, VictorOps, and HipChat.
1. Customize the template as described in the next section.
1. Click **Save**. The webhook is added to the Webhooks page.

## Customizing Webhook Templates
 
Wavefront webhook templates support [Mustache syntax](https://mustache.github.io/) and a set of payload [variables](#payload-variables) and [functions](#payload-functions).

### Payload Variables

You can customize the payload using properties and iterators that characterize the alert triggering the webhook. 

The categories of iterators are: `failing`, `inMaintenance`, `newlyFailing`, and `recovered`. The iterators return three types of objects:

- `host` - the affected source (host). Returned by `XXXHosts` iterators.
- series - Returned by `XXXSeries` iterators.
  - `host` - the affected source (host).
  - `label` - the metric or aggregation.
  - `tags` - the point tags on the series.
- alert series - Returned by `XXXAlertSeries` iterators.
  - `host` - the affected source (host).
  - `label` - the metric or aggregation.
  - `tags` - the point tags on the series.
  - `observed` - the number of points returned by the alert condition.
  - `firing` - the number of points that satisfy the alert condition.
  - `stats` - series statistics: `first`, `last`, `min`, `max`, and `mean`. These are values for the [Display Expression](alerts_managing.html#properties) associated with the alert. If Display Expression is not set, `stats` returns the value associated with the condition, which is sometimes not meaningful. For example:
    `ts(something.metric) > 30`. The stats values will be either 1 or 0.

Only the `failingAlertSeries` and `failingSeries` iterators iterate through an empty source (host).

<table>
<colgroup>
<col width="25%"/>
<col width="75%"/>
</colgroup>
<thead>
<tr><th>Variable</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`alertId`</td>
<td>The ID of the alert that triggered the webhook.</td>
</tr>
<tr>
<td markdown="span">`alertTags`</td>
<td>A list of tags associated with the alert that triggered the webhook.</td>
</tr>
<tr>
<td markdown="span">`condition`</td>
<td>The alert condition query.</td>
</tr>
<tr>
<td markdown="span">`createdTime`</td>
<td>Time the alert was created.</td>
</tr>
<tr>
<td markdown="span">`endedTime`</td>
<td>Time the alert ended(resolved).</td>
</tr>
<tr>
<td markdown="span">`errorMessage`</td>
<td>The message if there is an error while processing the condition query. This usually occurs when the alert is in an invalid state.</td>
</tr>
<tr>
<td markdown="span">`failingAlertSeries`</td>
<td>An iterator for alert series that are failing.
</td>
</tr>
<tr>
<td markdown="span">`failingHosts`</td>
<td>An iterator for sources that are failing.</td>
</tr>
<tr>
<td markdown="span">`failingSeries`</td>
<td>An iterator for series that are failing.</td>
</tr>
<tr>
<td markdown="span">`hostFailingMessage`</td>
<td>The list of sources (hosts) that are failing displayed as a message.</td>
</tr>
<tr>
<td markdown="span">`inMaintenanceAlertSeries`</td>
<td>An iterator for alert series whose sources are in a maintenance window.</td>
</tr>
<tr>
<td markdown="span">`inMaintenanceSeries`</td>
<td>An iterator for series whose sources are in a maintenance window. </td>
</tr>
<tr>
<td markdown="span">`inMaintenanceHosts`</td>
<td>An iterator for sources that are in a maintenance window.</td>
</tr>
<tr>
<td markdown="span">`name`</td>
<td>The name of the alert.</td>
</tr>
<tr>
<td markdown="span">`newlyFailingAlertSeries`</td>
<td markdown="span">An iterator for alert series that are newly affected and added to the `failingAlertSeries` list.</td>
</tr>
<tr>
<td markdown="span">`newlyFailingSeries`</td>
<td markdown="span">An iterator for series that are newly affected and added to the `failingSeries` list.</td>
</tr>
<tr>
<td markdown="span">`newlyFailingHosts`</td>
<td markdown="span">An iterator for sources that are newly affected and added to the `failingHosts` list.</td>
</tr>
<tr>
<td markdown="span">`notificationId`</td>
<td>A unique ID of each notification sent to the webhook.</td>
</tr>
<tr>
<td markdown="span">`reason`</td>
<td>Trigger that caused the webhook to send the notification: e.g. Alert Opened or Alert Snoozed.</td>
</tr>
<tr>
<td markdown="span">`recoveredAlertSeries`</td>
<td>An iterator for alert series identifiers that recovered from the alert.</td>
</tr>
<tr>
<td markdown="span">`recoveredSeries`</td>
<td>An iterator for series that recovered from the alert.</td>
</tr>
<tr>
<td markdown="span">`recoveredHosts`</td>
<td>An iterator for sources that recovered from the alert.</td>
</tr>
<tr>
<td markdown="span">`severity`</td>
<td>The alert severity (e.g. INFO, SMOKE, WARN, SEVERE).</td>
</tr>
<tr>
<td markdown="span">`severityInfo`</td>
<td>A flag set to True if the alert severity is set to INFO.</td>
</tr>
<tr>
<td markdown="span">`severitySmoke`</td>
<td>A flag set to True if the alert severity is set to SMOKE.</td>
</tr>
<tr>
<td markdown="span">`severitySevere`</td>
<td>A flag set to True if the alert severity is set to SEVERE.</td>
</tr>
<tr>
<td markdown="span">`severityWarn`</td>
<td>A flag set to True if the alert severity is set to WARN.</td>
</tr>
<tr>
<td markdown="span">`sinceTime`</td>
<td>Time elapsed since the alert started firing.</td>
</tr>
<tr>
<td markdown="span">`snoozedUntilTime`</td>
<td>Time that a snoozed alert is scheduled to be unsnoozed.</td>
</tr>
<tr>
<td markdown="span">`startedTime`</td>
<td>Time the alert started firing.</td>
</tr>
<tr>
<td markdown="span">`subject`</td>
<td>The subject of the payload (usually for email). By default it concatenates the alert severity, alert trigger, and alert name.</td>
</tr>
<tr>
<td markdown="span">`url`</td>
<td>A link to a chart that shows the alert firing or resolved events along with the alert condition.</td>
</tr>
</tbody>
</table>

#### Example

Here is a sample template:

{% raw %}
```handlebars
{
  "alertId": "{{{alertId}}}",  
  "notificationId": "{{{notificationId}}}",  
  "reason": "{{{reason}}}",  
  "name": "{{#jsonEscape}}{{{name}}}{{/jsonEscape}}",  
  "severity": "{{{severity}}}",  
  "severitySmoke": {{severitySmoke}},  
  "severityInfo": {{severityInfo}},  
  "severityWarn": {{severityWarn}},  
  "severitySevere": {{severitySevere}},  
  "condition": "{{#jsonEscape}}{{{condition}}}{{/jsonEscape}}",  
  "url": "{{{url}}}",  
  "createdTime": "{{{createdTime}}}",  
  "startedTime": "{{{startedTime}}}",  
  "sinceTime": "{{{sinceTime}}}",  
  "endedTime": "{{{endedTime}}}",  
  "snoozedUntilTime": "{{{snoozedUntilTime}}}",  
  "subject": "{{#jsonEscape}}{{{subject}}}{{/jsonEscape}}",  
  "sourcesFailingMessage": "{{#jsonEscape}}{{{sourcesFailingMessage}}}{{/jsonEscape}}",  
  "errorMessage": "{{#jsonEscape}}{{{errorMessage}}}{{/jsonEscape}}",  
  "additionalInformation": "{{#jsonEscape}}{{{additionalInformation}}}{{/jsonEscape}}",  
  "failingSources": [  
    {{#trimTrailingComma}}  
      {{#failingHosts}}  
        "{{{.}}}",  
      {{/failingHosts}}  
    {{/trimTrailingComma}}  
  ],  
  "inMaintenanceSources": [  
    {{#trimTrailingComma}}  
      {{#inMaintenanceHosts}}  
        "{{{.}}}",  
      {{/inMaintenanceHosts}}  
    {{/trimTrailingComma}}  
  ],  
  "newlyFailingSources": [  
    {{#trimTrailingComma}}  
      {{#newlyFailingHosts}}  
        "{{{.}}}",  
      {{/newlyFailingHosts}}  
    {{/trimTrailingComma}}  
  ],  
  "recoveredSources": [  
    {{#trimTrailingComma}}  
      {{#recoveredHosts}}  
        "{{{.}}}",  
      {{/recoveredHosts}}  
    {{/trimTrailingComma}}  
  ],  
  "failingSeries": [  
    {{#trimTrailingComma}}  
      {{#failingSeries}}  
        {{{.}}},  
      {{/failingSeries}}  
    {{/trimTrailingComma}}  
  ],  
  "inMaintenanceSeries": [  
    {{#trimTrailingComma}}  
      {{#inMaintenanceSeries}}  
        {{{.}}},  
      {{/inMaintenanceSeries}}  
    {{/trimTrailingComma}}  
  ],  
  "newlyFailingSeries": [  
    {{#trimTrailingComma}}  
      {{#newlyFailingSeries}}  
        {{{.}}},  
      {{/newlyFailingSeries}}  
    {{/trimTrailingComma}}  
  ],  
  "recoveredSeries": [  
    {{#trimTrailingComma}}  
      {{#recoveredSeries}}  
        {{{.}}},  
      {{/recoveredSeries}}  
    {{/trimTrailingComma}}  
  ]  
}
```
{% endraw %}

Here is a sample payload for the template:

{% raw %}
```handlebars
{
  "alertId": "1460761882996",
  "notificationId": "66dc2064-6bc1-437e-abe0-7c41afcd4aab",
  "reason": "ALERT_OPENED",
  "name": "Alert on Data rate (Test)",
  "severity": "SMOKE",
  "severitySmoke": true,
  "severityInfo": false,
  "severityWarn": false,
  "severitySevere": false,
  "condition": "rate(ts(~agent.points.2878.received)) > 4",
  "url": "https://yourcompany.wavefront.com/u/LPc1zR8k9X",
  "createdTime": "04/15/2016 23:11:22 0000",
  "startedTime": "09/12/2016 21:47:39 0000",
  "sinceTime": "09/12/2016 21:45:39 0000",
  "endedTime": "",
  "snoozedUntilTime": "",
  "subject": "[SMOKE] OPENED: Alert on Data rate ( Test)",
  "sourcesFailingMessage": "localhost (~agent.points.2878.received)",
  "errorMessage": "",
  "additionalInformation": "An alert to test a webhook integration with HipChat",
  "failingSources": ["localhost"],
  "inMaintenanceSources": [],
  "newlyFailingSources": ["localhost"],
  "recoveredSources": [],
  "failingSeries": [["localhost", "~agent.points.2878.received", []]],
  "inMaintenanceSeries": [],
  "newlyFailingSeries": [["localhost", "~agent.points.2878.received", []]],
  "recoveredSeries": []
  }
```
{% endraw %}

#### Example: Accessing Series Values

Sometimes you want to know the value of a series when an alert is triggered. For example, if the alert threshold is 80, you want to know on crossing the threshold if the value was 81 or 91. Furthermore you would like access to the value in the alert notification. Since an alert has a time window, a series does not have a single value when the threshold is crossed. For example, the alert may specify that the alert should fire when a condition is true for 10 minutes. During that 10 minute period, the series will likely have multiple values. 

You can use the `failingAlertSeries` iterator to access series statistics&mdash;`first`, `last`, `min`, `max`, and `mean`&mdash;of the series values. The `last` statistic is automatically appended to email and PagerDuty messages.


The following template illustrates how to use the `failingAlertSeries` iterator to retrieve series statistics:

{% raw %}
```handlebars
"failingAlertSeries": [
  {{#trimTrailingComma}}
    {{#failingAlertSeries}}
      "Source: {{host}}, Label: {{label}}, Tags: {{tags}}, Observed: {{observed}}, Firing: {{firing}},
      First: {{stats.first}}, Last: {{stats.last}}, Min: {{stats.min}}, Max: {{stats.max}}, Mean: {{stats.mean}}",
    {{/failingAlertSeries}}
  {{/trimTrailingComma}}
]
```
{% endraw %}

This template could yield the following message:

{% raw %}
```handlebars
"failingAlertSeries": [
{"Source": "raspberrypi", "Label": "humidity", "Tags": {}, "Observed": 5, "Firing": 2, "First": 46.6, "Last": 46.0, "Min": 46.0, "Max": 46.6, "Mean": 46.279999999999994}}]
```
{% endraw %}

### Payload Functions
 
Payload functions let you set limits on the number of items returned by iterators. The default value for each limit is 500. For a limit to take effect, the limit must be set before iteration. 

The order of the limit settings determines limit precedence. For example, setting `setDefaultIterationLimit` after setting `setFailingLimit` overwrites the `setFailingLimit` setting. 

The `failingLimit` property applies to all iterators in the `failing` category: `failingAlertSeries`, `failingSeries`, and `failingHosts`.

For a payload function example, see [Setting and Testing Iteration Limits](#setting-and-testing-iteration-limits).

{% include note.html content="If the application that is being integrated needs the full list of items (e.g. `failingHosts`) you can retrieve the `alertId` from the notification and use the Wavefront API to get the full list of items." %}

<table>
<colgroup>
<col width="25%"/>
<col width="75%"/>
</colgroup>
<thead>
<tr><th>Function</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`setDefaultIterationLimit`</td>
<td>Sets all limits to the same value.
</td>
</tr>
<tr>
<td markdown="span">`setFailingLimit`</td>
<td markdown="span">Set the limit for the number of items returned by `failingAlertSeries`, `failingHosts`, and `failingSeries`.
</td>
</tr>
<tr>
<td markdown="span">`setInMaintenanceLimit`</td>
<td markdown="span">Set the limit for the number of items returned by `inMaintenanceAlertSeries`, `inMaintenanceHosts`, and `inMaintenanceSeries`.
</td>
</tr>
<tr>
<td markdown="span">`setNewlyFailingLimit`</td>
<td markdown="span">Set the limit for the number of items returned by `newlyFailingAlertSeries`, `newlyFailingHosts`, and `newlyFailingSeries`.
</td>
</tr>
<tr>
<td markdown="span">`setRecoveredLimit`</td>
<td markdown="span">Set the limit for the number of items returned by `recoveredAlertSeries`, `recoveredHosts`, and `recoveredSeries`.
</td>
</tr>
<tr>
<td markdown="span">`getIterationLimit`</td>
<td markdown="span">Gets the value of an iteration limit. Valid values are: `defaultIterationLimit`, `failingLimit`, `inMaintenanceLimit`, `newlyFailingLimit`, and `recoveredLimit`.
</td>
</tr>
<tr>
<td markdown="span">`iterationLimitExceed`</td>
<td markdown="span">Check whether an iteration limit is limiting the number of the result returned. Valid values are: `failingLimitExceed`, `inMaintenanceLimitExceed`, `newlyFailingLimitExceed`, and `recoveredLimitExceed`.
</td>
</tr>
</tbody>
</table>

#### Example: Setting and Testing Iteration Limits

Suppose you have 8 failing sources: "source1", "source2", "source3", "source4", "source5", "source6", "source7", "source8". Setting `setDefaultIterationLimit` to 5 in the following template:

{% raw %}
```handlebars
{{#setDefaultIterationLimit}}5{{/setDefaultIterationLimit}}
{
  "getIterationLimit": {
     "defaultIterationLimit": "{{{defaultIterationLimit}}}",
     "failingLimit": "{{{failingLimit}}}",
     "inMaintenanceLimit": "{{{inMaintenanceLimit}}}",
     "newlyFailingLimit": "{{{newlyFailingLimit}}}",
     "recoveredLimit": "{{{recoveredLimit}}}"
   },
   "iterationLimitExceed": {
     "failingLimitExceed": "{{{failingLimitExceed}}}",
     "inMaintenanceLimitExceed": "{{{inMaintenanceLimitExceed}}}",
     "newlyFailingLimitExceed": ""{{{newlyFailingLimitExceed}}}",
     "recoveredLimitExceed": "{{{recoveredLimitExceed}}}"
   },
  "alertId": "{{{alertId}}}",
  "alertTags": "[
    {{#trimTrailingComma}}
      {{#alertTags}}
        "{{#jsonEscape}}{{{.}}}{{/jsonEscape}}",
      {{/alertTags}}
    {{/trimTrailingComma}}
  ],
  ...
  "failingSources": [  
    {{#trimTrailingComma}}  
      {{#failingHosts}}  
        "{{{.}}}",  
      {{/failingHosts}}  
    {{/trimTrailingComma}}  
  ], 
  "failingSeries": [  
    {{#trimTrailingComma}}  
      {{#failingSeries}}  
        {{{.}}},  
      {{/failingSeries}}  
    {{/trimTrailingComma}}  
  ]
}
```
{% endraw %}

Results in the following payload:

{% raw %}
```handlebars
{
 "getIterationLimit": {
   "defaultIterationLimit": "5",
   "failingLimit": "5",
   "inMaintenanceLimit": "5",
   "newlyFailingLimit": "5",
   "recoveredLimit": "5"
 },
 "iterationLimitExceed": {
   "failingLimitExceed": "true",
   "inMaintenanceLimitExceed": "false",
   "newlyFailingLimitExceed": "false",
   "recoveredLimitExceed": "false"
 },
 "alertId": "1492543979795",
 "alertTags": [production, mysql],
 ...
 "failingSources": ["source5", "source4", "source7", "source6", "source1"],
 "failingSeries": [[null,"3.0",[]]]
}
```
{% endraw %}

`failingHosts` iterates only up to `failingLimit`, which in this case is 5. `failingLimitExceed` is `true` because the number the failing sources exceeds the limit set. In the case in which the limit is 10, the payload is:

{% raw %}
```handlebars
{ 
  "getIterationLimit": {
    "defaultIterationLimit": "10",
    "failingLimit": "10",
    "inMaintenanceLimit": "10",
    "newlyFailingLimit": "10",
    "recoveredLimit": "10"
  },
  "iterationLimitExceed": {
    "failingLimitExceed": "false",
    "inMaintenanceLimitExceed": "false",
    "newlyFailingLimitExceed": "false",
    "recoveredLimitExceed": "false"
  },
  "alertId": "1492543979795",
  "alertTags": [production, mysql],
  ...
  "failingSources": ["source5", "source4", "source7", "source6", "source1", "source3", "source2", "source8"],
  "failingSeries": [[null,"3.0",[]]]
}
```
{% endraw %}

 `failingLimitExceed` is `false` because the number the failing sources does not exceed the limit set.

## Testing a Webhook

To check that a webhook is functioning properly you may want to test it first. To test a webhook, select ![action_menu](images/action_menu.png#inline) **> Test** at the far right of the webhook.

## Querying Webhook Responses

In order to determine if a webhook call was successful and a notification was generated via the webhook, Wavefront exposes response codes from webhook calls as metrics:

```
alert.webhooks.<webhook_id>.1xx
alert.webhooks.<webhook_id>.2xx
alert.webhooks.<webhook_id>.3xx
alert.webhooks.<webhook_id>.4xx
alert.webhooks.<webhook_id>.5xx
```

By querying these metrics, you can determine which webhooks are generating a problem response code. The metrics have the point tag `name = <webhook_name>` so you can determine all the response codes for a particular webhook:

```
ts(alert.webhooks.*.*, name=<webhook_name>)
```

If the response code of the webhook is anything other than 2xx, an event with the name `<webhook_id>.<webhook_name>.<response_code>` is created.


## Editing a Webhook

To edit a webhook, click the webhook name in the Webhooks browser or select ![action_menu](images/action_menu.png#inline) **> Edit** at the far right of the webhook. 
  
## Deleting  Webhooks

You can delete one or more webhooks by checking the checkboxes next to the webhooks and clicking the Trash icon <i class="fa fa-trash"/> at the top of the Webhooks page. The Trash icon is grayed out if any of the selected webhooks cannot be deleted. 

To delete one webhook, select ![action menu](images/action_menu.png#inline) **> Delete** at the far right of the webhook.

## Finding a Webhook ID

Each webhook has a unique system generated ID. Such IDs are used when adding a webhook as an [alert target](alerts_managing.html#alert-properties). To find the ID:

1. Click **Browse > Webhooks**.
1. Search for the webhook. In the Name column, note the ID of the webhook under the webhook description. 

   ![webhook ID](images/webhook_id.png)

## Adding a Webhook to a Wavefront Alert

To add a webhook as the target of an alert:

1. Click **Alerts** or select **Browse > Alerts**.
1. Locate the alert in the Alerts page and click the alert name.
1. Scroll down to the **Targets** field. 
1. Add the keyword **webhook** to the targets list. A dropdown list displays containing all the available webhooks present in Wavefront that can be integrated to your alert. The ID and the webhook URL for each webhook is listed.
1. Locate and select the ID of the webhook noted in Finding a Webhook ID.
1. Click **Save**.








