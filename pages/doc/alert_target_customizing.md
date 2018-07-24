---
title: Customizing Alert Target Templates
keywords: alert targets
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alert_target_customizing.html
summary: Learn how to customize alert target templates.
---

A custom alert target provides a template for specifying the contents of the notifications to be sent when an alert changes state.
The template is a blueprint for extracting various pieces of information from the alert and assembling them into the notification.

You typically customize a template by starting with the default template for the alert target type, and then editing that template. Wavefront alert target templates support [Mustache syntax](https://mustache.github.io/).

**Note** For general information about setting up custom alert targets, see [Creating and Managing Custom Alert Targets](webhooks_alert_notification.html).

## Alert Target Variables

An alert target template uses variables to request pieces of information from an alert. Some variables return individual values, while others (iterators) return a list of values.

The iterator categories are:
* `failing`
* `inMaintenance`
* `newlyFailing`
* `recovered`

The iterators return three types of objects:

- hosts - Affected source (host). The only value returned by `XXXHosts` iterators such as `failingHosts` or `newlyFailingHosts`.
- series - Returned by `XXXSeries` iterators such as `failingSeries` or `newlyFailingSeries`.
  - `host` - Affected source (host).
  - `label` - Metric or aggregation.
  - `tags` - Point tags on the series.
- alert series - Returned by `XXXAlertSeries` iterators such as `failingAlertSeries` or `newlyFailingAlertSeries`. You can further customize objects of type alert series, but not the other object types.
  - `host` - Affected source (host).
  - `label` - Metric or aggregation.
  - `tags` - Point tags on the series.
  - `observed` - Number of points returned by the alert condition.
  - `firing` - Number of points that satisfy the alert condition.
  - `stats` - Series statistics: `first`, `last`, `min`, `max`, and `mean`. These are values for the Display Expression associated with the alert. If you do not set the Display Expression, the iterator returns only the value that is associated with the alert condition. Because the condition that triggers the alert is always either 0 or not 0, that information is usually not useful.

Only the `XXXAlertSeries` and `XXXfailingSeries` iterators iterate through an empty source (host).

Alert targets support the following customization variables:
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
<td markdown="span">`hostsFailingMessage`</td>
<td>List of sources (hosts) that are failing, displayed as a message.</td>
</tr>
<tr>
<td markdown="span">`imageLinks`</td>
<td markdown="span">Iterator for URLs to [chart images](alerts.html#chart-images-in-alert-notifications). Currently returns only a single URL to the chart image showing the alert's display expression at the time the alert fired or was updated.</td>
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

### Example Webhook Template

Here is a sample webhook alert target template:

{% raw %}
```handlebars
{
  "alertId": "{{{alertId}}}",
  "notificationId": "{{{notificationId}}}",
  "imageLinks": "{{{imageLinks}}}",  
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
  "hostsFailingMessage": "{{#jsonEscape}}{{{hostsFailingMessage}}}{{/jsonEscape}}",
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

Here is a sample alert target output generated with the template:

{% raw %}
```handlebars
{
  "alertId": "1460761882996",
  "notificationId": "66dc2064-6bc1-437e-abe0-7c41afcd4aab",
  "imageLinks": "[https://yourcompany.wavefront.com/api/v2/image/RPx3zR7u2X"],  
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
  "hostsFailingMessage": "localhost (~agent.points.2878.received)",
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

### Example: Accessing Series Values

Because an alert has a time window, a series does not have a single value when the threshold is crossed. For example, the alert might be set up to fire when a condition is true for 10 minutes. During a 10 minute period where the condition is true, the series likely have multiple values.

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

## Alert Target Customization Functions

Customization functions let you set limits on the number of items returned by iterators. The service you use for notification might have a limit on the number of characters, and using customization functions helps you not exceed the limit.

The default value for each limit you can set with a customization function is 500. You must set the limit before iteration or the limit does not take effect.

The order of the limit settings determines limit precedence. For example, if you first set `setDefaultIterationLimit` and then you set `setFailingLimit`, then  `setFailingLimit` overwrites the `setDefaultIterationLimit` setting.

The `failingLimit` property applies to all iterators in the `failing` category: `failingAlertSeries`, `failingSeries`, and `failingHosts`.

See [Setting and Testing Iteration Limits](#setting-and-testing-iteration-limits) for an example.

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
<td markdown="span">`getIterationLimit`</td>
<td markdown="span">Gets the value of an iteration limit. Valid values are: `defaultIterationLimit`, `failingLimit`, `inMaintenanceLimit`, `newlyFailingLimit`, and `recoveredLimit`.
</td>
</tr>
<tr>
<td markdown="span">`iterationLimitExceed`</td>
<td markdown="span">Checks whether the number of the result returned is limited by an iteration limit. Valid values are: `failingLimitExceed`, `inMaintenanceLimitExceed`, `newlyFailingLimitExceed`, and `recoveredLimitExceed`.
</td>
</tr>
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
</tbody>
</table>

### Example: Setting and Testing Iteration Limits

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

## Alert Target Utility Functions

Alert target utility functions allow you to make the output of the alert target more readable. If you send the notification to a system that uses JSON, you can use `jsonEscape`. If the system uses XML, you can use `xml11Escape` or `xml10Escape`.

<table>
<colgroup>
<col width="18%"/>
<col width="50%"/>
<col width="32%"/>
</colgroup>
<thead>
<tr><th>Function</th><th>Definition</th><th>Example</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`jsonEscape`</td>
<td markdown="span">Escapes the characters in a string using Json string rules.
Escapes any values it finds into their Json string form. Deals correctly with quotes and control-chars (tab, backslash, cr, ff, etc) so, for example, a tab becomes the characters `\\` and `t`.</td>
<td markdown="span">Input: `He didn't say, "Stop!"`\\
Output: `He didn't say, \"Stop!\"`</td>
</tr>
<tr>
<td markdown="span">`xml11Escape`</td>
<td>Escapes the characters in a String using XML entities.<div>
XML 1.1 can represent certain control characters, but it cannot represent the null byte or unpaired Unicode surrogate codepoints, even after escaping. <code>escapeXml11</code> removes characters that do not fit in the following ranges:</div>
<code>[#x1-#xD7FF]|[#xE000-#xFFFD]|[#x10000-#x10FFFF]
</code>
<div>
`escapeXml11` escapes characters in the following ranges:
</div>
<code>[#x1-#x8]|[#xB-#xC]|[#xE-#x1F]|[#x7F-#x84]|[#x86-#x9F]
</code></td>
<td markdown="span"> Input: `"bread" & "chocolate"`\\
Output: `&quot;bread&quot; &amp; &quot;chocolate&quot;`</td>
</tr>
<tr>
<td markdown="span">`xml10Escape`</td>
<td><div>Escapes the characters in a string using XML entities.
XML 1.0 is a text-only format, it cannot represent control characters or unpaired Unicode surrogate codepoints, even after escaping.</div>
<div>
<code>escapeXml10</code> removes characters that do not fit in the following ranges:
<code>
#x9|#xA|#xD|[#x20-#xD7FF]|[#xE000-#xFFFD]|[#x10000-#x10FFFF]

</code></div>
<div>
<code>escapeXml10</code> escapes characters in the following ranges:
<code>
[#x7F-#x84]|[#x86-#x9F]</code></div></td>
<td markdown="span">Input: `"bread" & "chocolate"`\\
Output: `&quot;bread&quot; &amp; &quot;chocolate&quot;`</td>
</tr>
<tr>
<td markdown="span">`trimTrailingComma`
</td>
<td markdown="span">Retain the string content up to the last comma.
Often used with webhook templates with iterators to remove the extra comma of the last item.
</td>
<td markdown="span">
Input:\\
`"(Host: , Label: 3.0, Tags: , Observed: 5 Firing: 5, First: , Last: , Min: , Max: , Mean: ),   "`\\
Output:\\
`"(Host: , Label: 3.0, Tags: , Observed: 5 Firing: 5, First: , Last: , Min: , Max: , Mean: )"`
</td>
</tr>
</tbody>
</table>

## Adding Chart Images to Older Custom Alert Targets

As of 2018-26.x, the predefined template for a custom HTML email target or a custom Slack target automatically includes the `imageLinks` variable for producing a [chart image](alerts.html#chart-images-in-alert-notifications) in alert notifications. However, if you created a custom email alert target or a custom Slack alert target before 2018-26.x, you must explicitly update the alert target's template in order to include a chart image in the alert notifications.

**Note** You do not need to update pre-existing custom alert targets of type PagerDuty. All PagerDuty notifications sent in 2018-26.x or later will include chart images. 

### Updating a Pre-Existing Custom Email Alert Target

To update a custom email alert target that was created before 2018-26.x, you can: 

1. Click the name of the pre-existing alert target in the Alert Targets browser, or click the three dots to the left of the alert target and select **Edit**.
1. Select **HTML Format** to cause the target's notifications to be interpreted as HTML instead of plain text. (All custom email alert targets created before 2018-26.x are formatted as plain text.)
1. In the **Body Template** box, insert a snippet such as the following at an appropriate place in the template: 

    {% raw %}
    ```handlebars
    {{#imageLinks}}
    <img src="{{{.}}}" />
    {{/imageLinks}} 
    ```
    {% endraw %}
    

The inserted snippet causes the notification to include an HTML `<img src= >` tag in which the `src` is set to the URL for the chart image that was generated for the alert. (Without the `<img src= >` tag, the value returned by the `imageLinks` iterator would be displayed as a URL instead of an image.)


### Updating an Pre-Existing Custom Alert Target for Slack

To update the template for a custom Slack alert target that was created before 2018-26.x, you can:

1. Click the name of the pre-existing alert target in the Alert Targets browser, or click the three dots to the left of the alert target and select **Edit**.
1. In a separate browser tab, connect to your Wavefront service and create a new custom alert target of type **Webhook** with the **Slack** template.
2. In the newly created template, find and copy the section enclosed in the following lines:
    {% raw %}
    ```handlebars
    {{#imageLinks}}
      ...
    {{/imageLinks}} 
    ```
    {% endraw %}
  
4. Paste the copied section into template of the pre-existing alert target.
