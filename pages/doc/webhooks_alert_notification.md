---
title: Using Alert Targets to Integrate Alerts with Notification Systems
keywords: alert targets
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: webhooks_alert_notification.html
summary: Learn how to use alert targets to integrate alerts and notification systems.
---

You can use Wavefront alert targets to integrate alerts with many types of notification systems. Use one of the following alert target types:

* A webhook alert target is a user-defined HTTP
callback that is triggered when an alert changes state. When the state change occurs, Wavefront makes an HTTP POST request to the URL that you configured for the webhook.

* An Email alert target allows you to specify the attributes of an email that is sent when an alert is triggered. The email can include a POST body with details about the alert.

* A PargerDuty alert target allows you to specify a PagerDuty key and a POST body to use when an alert is triggered.

The POST data that you can include with each type of alert are passed as a JSON payload.

For maximum flexibility and control, you can create alert targets from scratch. You can also use one of the predefined integrations that use alert notification.

* This page explains how to create and configure different alert targets, including webhooks and webhook payloads. You can use webhook templates, variables, and functions to construct virtually any type of payload.

* Wavefront provides predefined integrations for several notification systems such as Slack, PagerDuty, HipChat, and VictorOps. Follow the instructions in the in-product integration. Here's a list of all [in-product integrations](integrations_list.html).

To view and manage alert targets, select **Browse > Alert Targets**.

## Prerequisites

If you use a webhook alert target, the webhook url must be publicly accessible.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view alert targets, you must have [Alert Management permission](permissions_overview.html) to manage alert targets. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>

## Creating an Alert Target

The process for creating an alert target is fairly similar for the different targets. A few fields on the Alert Target page change if you change the Type.

1.  Select **Browse > Alert Targets**.
1.  Click the **Create Alert Target** button.
1.  From the **Type** pull-down menu, select the alert target type
1.  Fill in the properties. Certain properties are available only for certain alert target types.
    <table>
    <tbody>
    <thead>
    <tr><th>Property</th><th colspan="2">Description</th></tr>
    </thead>
    <tr>
    <td>Name</td>
    <td colspan="2">Name of the alert target. Pick a name that is simple and that makes it easy to identify the alert target's purpose.</td>
    </tr>
    <tr>
      <td>Description</td>
      <td colspan="2">Description of the alert target. Required. </td>
    </tr>
    <tr>
    <td>Triggers</td>
    <td colspan="2">One or more <a href="alerts_states_lifecycle.html">alert state changes</a> that trigger the alert target. The options are:
    <ul>
    <li>Alert Firing - Trigger when the alert is firing.</li>
    <li>Alert Status Updated - Trigger when the status of an open alert changes. For example, a new source satisfies the alert condition and joins the set of affected sources.</li>
    <li>Alert Resolved - Trigger when the alert is resolved.</li>
    <li>Alert Affected by Maintenance Window - Trigger when the alert is affected by a maintenance window.</li>
    <li>Alert Snoozed - Trigger when the alert is snoozed.</li>
    <li>Alert Has No Data - Trigger when the series that is referenced in the alert condition is not reporting data.</li>
    <li>Alert Has No Data Resolved - Trigger when the series that is referenced in the alert condition starts reporting data after having no data.</li>
    <li>Alert Entered Maintenance From No Data - Trigger when the series that is referenced in the alert condition is not reporting data and is affected by a  maintenance window.</li>
    </ul>    </td>
    </tr>
    <tr>
    <td rowspan="3">Webhook Alert Target Type </td>
    <td>URL </td>
    <td>REST endpoint of the receiving application, e.g. Slack.</td>
    </tr>
    <tr>
      <td>Content Type</td>
      <td>Content type of the POST body:
        <ul>
          <li>application/json</li>
          <li>text/html</li>
          <li>text/plain</li>
          <li>application/x-www-form-urlencoded</li>
      </ul></td>
    </tr>
    <tr>
      <td>Custom Headers </td>
      <td>Name and value of one or more HTTP headers to pass in the POST request.</td>
    </tr>

    <tr>
      <td rowspan="2">Email Alert Target Type </td>
      <td markdown="span">Email Address List </td>
      <td markdown="span">One or more addresses, separated by commas. </td>
    </tr>
    <tr>
      <td markdown="span">Email Subject </td>
      <td markdown="span">Subject of all emails from this alert target. </td>
    </tr>
    <tr>
      <td>Pagerduty Alert Target Type </td>
      <td markdown="span">Pagerduty key </td>
      <td markdown="span">Key for the PagerDuty application. </td>
    </tr>
    <tr>
    <td>Alert Target POST Body Template</td>
    <td colspan="2" markdown="span">Template for a payload that the alert target sends sends in the POST request. Click Template to select a template that is appropriate for the alert target type, and enter the information. </td>
    </tr>
    </tbody>
    </table>
1. Select **Alert Target POST** click **Template**, and select a template type (Default, Slack, VictorOps, or HipChat).
1. Customize the template as described in the next section.
1. Click **Save** to add the alert target and make it visible on the Alert Targets page.

## Customizing Alert Target Templates

Wavefront alert target templates support [Mustache syntax](https://mustache.github.io/) and a set of payload [variables](#payload-variables) and [functions](#payload-functions).

### Payload Variables

You can customize the payload using properties and iterators that characterize the alert that is triggering the alert target.

The iterator categories are: `failing`, `inMaintenance`, `newlyFailing`, and `recovered`. The iterators return three types of objects:

- `host` - Affected source (host). Returned by `XXXHosts` iterators.
- series - Returned by `XXXSeries` iterators.
  - `host` - Affected source (host).
  - `label` - Metric or aggregation.
  - `tags` - Point tags on the series.
- alert series - Returned by `XXXAlertSeries` iterators.
  - `host` - Affected source (host).
  - `label` - Metric or aggregation.
  - `tags` - Point tags on the series.
  - `observed` - Number of points returned by the alert condition.
  - `firing` - Number of points that satisfy the alert condition.
  - `stats` - Series statistics: `first`, `last`, `min`, `max`, and `mean`. These are values for the Display Expression associated with the alert. If you do not set the Display Expression, the iterator returns the only the value that is associated with the alert condition. Because the condition that triggers the alert is always either 0 or 1, that information is usually not useful.


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
<td markdown="span">`additionalInformation`</td>
<td>Text in the Additional Information section of the alert.</td>
</tr>
<tr>
<td markdown="span">`alertId`</td>
<td>ID of the alert that triggered the alert target.</td>
</tr>
<tr>
<td markdown="span">`alertTags`</td>
<td>List of tags associated with the alert that triggered the alert target.</td>
</tr>
<tr>
<td markdown="span">`condition`</td>
<td>Alert condition query.</td>
</tr>
<tr>
<td markdown="span">`createdTime`</td>
<td>Time the alert was created.</td>
</tr>
<tr>
<td markdown="span">`endedTime`</td>
<td>Time the alert ended (resolved).</td>
</tr>
<tr>
<td markdown="span">`errorMessage`</td>
<td>Message that is returned if condition query processing results in an error. This usually occurs when the alert is in an invalid state.</td>
</tr>
<tr>
<td markdown="span">`failingAlertSeries`</td>
<td>Iterator for alert series that are failing.
</td>
</tr>
<tr>
<td markdown="span">`failingHosts`</td>
<td>Iterator for sources that are failing.</td>
</tr>
<tr>
<td markdown="span">`failingSeries`</td>
<td>Iterator for series that are failing.</td>
</tr>
<tr>
<td markdown="span">`hostFailingMessage`</td>
<td>List of sources (hosts) that are failing, displayed as a message.</td>
</tr>
<tr>
<td markdown="span">`inMaintenanceAlertSeries`</td>
<td>Iterator for alert series whose sources are in a maintenance window.</td>
</tr>
<tr>
<td markdown="span">`inMaintenanceSeries`</td>
<td>Iterator for series whose sources are in a maintenance window. </td>
</tr>
<tr>
<td markdown="span">`inMaintenanceHosts`</td>
<td>Iterator for sources that are in a maintenance window.</td>
</tr>
<tr>
<td markdown="span">`name`</td>
<td>Name of the alert.</td>
</tr>
<tr>
<td markdown="span">`newlyFailingAlertSeries`</td>
<td markdown="span">Iterator for alert series that are newly affected and added to the `failingAlertSeries` list.</td>
</tr>
<tr>
<td markdown="span">`newlyFailingSeries`</td>
<td markdown="span">Iterator for series that are newly affected and added to the `failingSeries` list.</td>
</tr>
<tr>
<td markdown="span">`newlyFailingHosts`</td>
<td markdown="span">Iterator for sources that are newly affected and added to the `failingHosts` list.</td>
</tr>
<tr>
<td markdown="span">`notificationId`</td>
<td>Unique ID of each notification sent to the alert target.</td>
</tr>
<tr>
<td markdown="span">`reason`</td>
<td>Trigger that caused the alert target to send the notification, e.g. Alert Opened or Alert Snoozed.</td>
</tr>
<tr>
<td markdown="span">`recoveredAlertSeries`</td>
<td>Iterator for alert series identifiers that recovered from the alert.</td>
</tr>
<tr>
<td markdown="span">`recoveredSeries`</td>
<td>Iterator for series that recovered from the alert.</td>
</tr>
<tr>
<td markdown="span">`recoveredHosts`</td>
<td>Iterator for sources that recovered from the alert.</td>
</tr>
<tr>
<td markdown="span">`severity`</td>
<td>Alert severity (e.g. INFO, SMOKE, WARN, SEVERE).</td>
</tr>
<tr>
<td markdown="span">`severityInfo`</td>
<td>A flag set to True if alert severity is set to INFO.</td>
</tr>
<tr>
<td markdown="span">`severitySmoke`</td>
<td>A flag set to True if alert severity is set to SMOKE.</td>
</tr>
<tr>
<td markdown="span">`severitySevere`</td>
<td>A flag set to True if alert severity is set to SEVERE.</td>
</tr>
<tr>
<td markdown="span">`severityWarn`</td>
<td>A flag set to True if alert severity is set to WARN.</td>
</tr>
<tr>
<td markdown="span">`sinceTime`</td>
<td>Time elapsed since the alert started firing.</td>
</tr>
<tr>
<td markdown="span">`snoozedUntilTime`</td>
<td>Time when a snoozed alert is scheduled to be unsnoozed.</td>
</tr>
<tr>
<td markdown="span">`startedTime`</td>
<td>Time the alert started firing.</td>
</tr>
<tr>
<td markdown="span">`subject`</td>
<td>Subject of the payload (usually for email). By default the subject concatenates alert severity, alert trigger, and alert name.</td>
</tr>
<tr>
<td markdown="span">`url`</td>
<td>Link to a chart that shows alert firing events or resolved events along with the alert condition.</td>
</tr>
</tbody>
</table>

#### Example

Here is a sample webhook alert target template:

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

Because an alert has a time window, a series does not have a single value when the threshold is crossed. For example, the alert may specify that the alert should fire when a condition is true for 10 minutes. During that 10 minute period, the series will likely have multiple values.

Sometimes you want to know the value of a series when an alert is triggered. For example, if the alert threshold is 80, you might want to know if the value was 81 or 91 on crossing the threshold. You might also want access to the value in the alert notification.

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

This template might yield the following message:

{% raw %}
```handlebars
"failingAlertSeries": [
{"Source": "raspberrypi", "Label": "humidity", "Tags": {}, "Observed": 5, "Firing": 2, "First": 46.6, "Last": 46.0, "Min": 46.0, "Max": 46.6, "Mean": 46.279999999999994}}]
```
{% endraw %}

### Payload Functions

Payload functions let you set limits on the number of items returned by iterators. The default value for each limit is 500. A limit must be set before iteration or it does not take effect.

The order of the limit settings determines limit precedence. For example, if you set `setDefaultIterationLimit` and then you set `setFailingLimit`, then  `setFailingLimit` overwrites the `setDefaultIterationLimit` setting.

The `failingLimit` property applies to all iterators in the `failing` category: `failingAlertSeries`, `failingSeries`, and `failingHosts`.

For a payload function example, see [Setting and Testing Iteration Limits](#setting-and-testing-iteration-limits).

{% include note.html content="If the application that is being integrated requires the full list of items (e.g. `failingHosts`) you can retrieve the `alertId` from the notification and use the Wavefront API to get the full list of items." %}

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
<td markdown="span">Sets the limit for the number of items returned by `failingAlertSeries`, `failingHosts`, and `failingSeries`.
</td>
</tr>
<tr>
<td markdown="span">`setInMaintenanceLimit`</td>
<td markdown="span">Sets the limit for the number of items returned by `inMaintenanceAlertSeries`, `inMaintenanceHosts`, and `inMaintenanceSeries`.
</td>
</tr>
<tr>
<td markdown="span">`setNewlyFailingLimit`</td>
<td markdown="span">Sets the limit for the number of items returned by `newlyFailingAlertSeries`, `newlyFailingHosts`, and `newlyFailingSeries`.
</td>
</tr>
<tr>
<td markdown="span">`setRecoveredLimit`</td>
<td markdown="span">Sets the limit for the number of items returned by `recoveredAlertSeries`, `recoveredHosts`, and `recoveredSeries`.
</td>
</tr>
<tr>
<td markdown="span">`getIterationLimit`</td>
<td markdown="span">Gets the value of an iteration limit. Valid values are: `defaultIterationLimit`, `failingLimit`, `inMaintenanceLimit`, `newlyFailingLimit`, and `recoveredLimit`.
</td>
</tr>
<tr>
<td markdown="span">`iterationLimitExceed`</td>
<td markdown="span">Checks whether the number of the result returned is limited by an iteration limit. Valid values are: `failingLimitExceed`, `inMaintenanceLimitExceed`, `newlyFailingLimitExceed`, and `recoveredLimitExceed`.
</td>
</tr>
</tbody>
</table>

#### Example: Setting and Testing Iteration Limits

Suppose you have 8 failing sources: "source1", "source2", "source3", "source4", "source5", "source6", "source7", "source8". You set `setDefaultIterationLimit` to 5 in the first line of the following template:

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

The template with these settings results in the following payload for the 8 failing sources:

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

`failingHosts` iterates only up to `failingLimit`, which is 5 in this case. `failingLimitExceed` is `true` because the number of failing sources exceeds the limit.

In contrast, if the `failingLimit` is 10, the payload is the following for 8 failing sources:

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

For this case (limit 10, failing sources 8) `failingLimitExceed` is `false` because the number the failing sources does not exceed the limit set.

## Testing an Alert Target

Test your alert target to ensure that it works properly. To test an alert target, the three dots to the left of the alert target and click **Test**.

  ![alert target test](images/alert_target_test.png)

## Querying Responses of Webhook Alert Targets

Wavefront exposes response codes from webooks alert target calls as metrics:

```
~alert.webhooks.<webhook_id>.1xx
~alert.webhooks.<webhook_id>.2xx
~alert.webhooks.<webhook_id>.3xx
~alert.webhooks.<webhook_id>.4xx
~alert.webhooks.<webhook_id>.5xx
```

**Note** Wavefront does not expose response codes from the simpler alert targets (Email and PagerDuty).

The response codes indicate if a webhook call was successful and if the webhook generated a notification. You can query these metrics to  determine if any webhooks are generating a problem response code. The metrics have the point tag `name = <webhook_name>` so you can determine all the response codes for a particular webhook alert target:

```
ts(~alert.webhooks.*.*, name=<webhook_name>)
```

If the response code of the webhook is anything other than 2xx, Wavefront creates an event with the name `<webhook_id>.<webhook_name>.<response_code>`.


## Editing an Alert Target

To edit a alert, click the alert target name in the Alert Targets browser or click the three dots to the left of the alert target and select **Edit**.

## Deleting  Alert Targets

You can delete one or more alert targets by checking the checkboxes next to the alert targets and clicking the Trash icon <i class="fa fa-trash"/> at the top of the Alert Targets page. The trash icon is grayed out if you don't have permission to delete any of the selected alert targets.

To delete one alert target, use the trash icon or click the three dots to the left of the alert target and select **Delete**.

## Finding an Alert Target ID

Each alert target has a unique ID that the system generates when you first create the alert target. To find the ID:

1. Click **Browse > Alert Targets**.
1. In the Name column, note the ID of the alert target under the description.

   ![webhook ID](images/webhook_id.png)

## Adding an Alert Target to a Wavefront Alert

To add an alert target to an alert:

1. Click **Alerts**, locate the alert on the Alerts page, and click the alert name.
1. Scroll down to the **Targets** section.
1. In the **Alert Target** field, start typing. A dropdown list appears that contains all available Wavefront alert targets that can be integrated to your alert.
1. Select the alert target that you want to add, and click **Save**.
