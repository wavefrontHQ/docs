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

You typically customize a template by starting with the default template for the alert target type, and then editing that template. 

**Note** For general information about setting up custom alert targets, see [Creating and Managing Custom Alert Targets](webhooks_alert_notification.html).

## About Alert Target Templates

The template defined by a custom alert target describes the contents of the notifications that will be sent whenever an alert transition triggers an event of interest. A template identifies the information you want to extract from the transitioned alert, and embeds that information within structures that can be interpreted by the receiving messaging platform. For example:

* A template for a Slack alert target specifies the JSON structure that will be POSTed to the Slack endpoint, and specifies the alert information to be included within that structure. The alert information is inserted as values of Slack-defined JSON attributes.

* A template for an HTML email alert target specifies the HTML structure that will be sent as the message body, and specifies the alert information to be included within that structure. The alert information is inserted as avlues of HTML elements and attributes.

A custom alert target's template uses [Mustache](https://mustache.github.io/) to combine literal text with Wavefront-defined _variables_ and _functions_ to produce the structures to be sent to the receiving messaging platform.

### Predefined Templates
Wavefront provides a predefined template for each type of custom alert target. You can use the predefined template as is, or you can customize it to add, remove, or rearrange alert information and structural elements. You can even use a predefined template as a guide for composing your own template. 

You can display a predefined template in the **Body Template** field of the [Create Alert Target](webhooks_alert_notification.html#creating-a-custom-alert-target) page by clicking **Template** and selecting one of the predefined templates. The list of available predefined templates is determined by the custom alert target's **Type**.

You can inspect a predefined template to see:

* The Wavefront-defined [variables](#template-variables) and [functions](#template-functions) that extract information from the alert. 

* The structural elements in which the extracted information is embedded. These are JSON attributes, HTML elements, or plain text, depending on the  messaging platform to which notifications will be sent.

The predefined Slack, HipChat, and VictorOps templates contain JSON attributes defined by the messaging platform. You can consult the product documentation for the platform to learn more about these attributes.  

**Note** The predefined Webhook Generic template contains JSON attributes that do not conform to any particular message platform's Webhook endpoint specification. This template simply demonstrates how to access the different kinds of alert information for a Webhook endpoint.

### Template Variables

Wavefront defines template variables for accessing information about [the alert](#obtaining-information-about-the-alert) and about [the time series tested by the alert](#obtaining-information-about-the-alerts-time-series). When the alert triggers a notification, Wavefront replaces the variables in the template with strings that represent the requested values. 

The way you use a variable depends on whether it is:
* A property, which accesses a single value. For example, `alertID` accesses a single string representing the alert's unique ID.
* An iterator, which accesses a value that is a list of elements. For example, `alertTags` accesses a list of 0 or more strings representing tags associated with the alert.

The following snippet shows the basic [Mustache](https://mustache.github.io/) syntax for a property and an iterator:
 
{% raw %}
```handlebars
{{{alertId}}}     {{! a property}}
     
{{#alertTags}}    {{! an iterator}}
    {{{.}}}
{{/alertTags}}
```
{% endraw %}

Mustache supports several variations in each case, but this example shows the most commonly used syntax in the alert target templates:

* Each property is enclosed in 3 pairs of curly braces. (In HTML email templates, you can use 2 pairs of curly braces around a property.)

* Each iterator is used in a Mustache _section_, with the iterator's name appearing on either end. Because an iterator successively visits each element in its list, you can use {% raw %} `{{{.}}}` {% endraw %} within the section to indicate the element currently being visited. (In the predefined templates, iterator sections contain literal text and functions to format the visited elements.) 

### Template Functions

Wavefront defines template functions for performing various tasks, such as [tailoring the notification content to the trigger type](#functions-for-tailoring-content-to-the-trigger-type), [limiting the number of elements an iterator can return](#functions-for-limiting-list-sizes), and [assisting with JSON or XML formatting](utility-functions-for-readability). 

The following snippet shows the basic [Mustache](https://mustache.github.io/) syntax for two functions:
 
{% raw %}
```handlebars
{{! a function}}
{{#setDefaultIterationLimit}}5{{/setDefaultIterationLimit}}   

{{! another function}}
{{#isAlertOpened}}               
    {{! Message content }}
{{/isAlertOpened}}
```
{% endraw %}

Like iterators, a function is used in a Mustache section, with the function's name appearing on either end. You include function input within the section.

## Obtaining Information About the Alert



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
<td>Iterator returning a list of tags associated with the alert that triggered the alert target.</td>
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
<td markdown="span">`imageLinks`</td>
<td markdown="span">Iterator for URLs to [chart images](alerts.html#chart-images-in-alert-notifications). Currently returns only a single URL to the chart image showing the alert's display expression at the time the alert fired or was updated.</td>
</tr>
<tr>
<td markdown="span">`name`</td>
<td>Name of the alert.</td>
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

### Example Template and Output 

This excerpt from the Generic Webhook alert target template shows variables that access information about the alert:

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
  "additionalInformation": "{{#jsonEscape}}{{{additionalInformation}}}{{/jsonEscape}}"
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
  "additionalInformation": "An alert to test a webhook integration with HipChat"
  }
```
{% endraw %}


## Obtaining Information About the Alert's Time Series



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
</tbody>
</table>

### Example Template and Output 

This excerpt from the Generic Webhook alert target template shows iterators that access information about the time series tested by the alert:

{% raw %}
```handlebars
{
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
  "failingSources": ["localhost"],
  "inMaintenanceSources": [],
  "newlyFailingSources": ["localhost"],
  "recoveredSources": [],
  "failingSeries": ["localhost", "~agent.points.2878.received", []],
  "inMaintenanceSeries": [],
  "newlyFailingSeries": ["localhost", "~agent.points.2878.received", []],
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
    "Source: raspberrypi, Label: humidity, Tags: {env=production, az=us-west-2}, 
Observed: 5, Firing: 2, First: 46.6, Last: 46.0, Min: 46.0, Max: 46.6, Mean: 46.279999999999994"]
```
{% endraw %}

## Functions for Tailoring Content to the Trigger Type

You can use the following functions to provide different notification content for different types of trigger.

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
<td markdown="span">`isAlertOpened`</td>
<td markdown="span"> Outputs the contents of the section only if the alert is firing.
</td>
</tr>
<tr>
<td markdown="span">`isAlertUpdated`</td>
<td markdown="span"> Outputs the contents of the section only if the alert is updated.
</td>
</tr>
<tr>
<td markdown="span">`isAlertResolved`</td>
<td markdown="span"> Outputs the contents of the section only if the alert is resolved.
</td>
</tr>
<tr>
<td markdown="span">`isAlertMaintenance`</td>
<td markdown="span"> Outputs the contents of the section only if one or more sources associated with the alert are in an ongoing maintenance window.
</td>
</tr>
<tr>
<td markdown="span">`isAlertSnoozed`</td>
<td markdown="span"> Outputs the contents of the section only if the alert has been snoozed.
</td>
</tr>
</tbody>
</table>

## Functions for Limiting List Sizes

If your messaging platform imposes a limit on the overall number of characters in a notification, you can avoid exceeding this limit by setting a limit on the number of items returned by iterators.

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
  "alertTags": [
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
 "alertTags": ["production", "mysql"],
 ...
 "failingSources": ["source5", "source4", "source7", "source6", "source1"],
 "failingSeries": [null,"3.0",[]]
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
  "failingSeries": [null,"3.0",[]]
}
```
{% endraw %}

For this case (limit 10, failing sources 8) `failingLimitExceed` is `false` because the number the failing sources does not exceed the limit set.

## Utility Functions for Readability

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

To update a custom email alert target that was created before 2018-26.x: 

1. Open the custom alert target for [editing](webhooks_alert_notification.html#editing-a-custom-alert-target).
1. Select **HTML Format**. (All custom email alert targets created before 2018-26.x are plain text.)
1. In the **Body Template** box, insert a snippet such as the following: 

    {% raw %}
    ```handlebars
    {{#imageLinks}}
    <img src="{{{.}}}" />
    {{/imageLinks}} 
    ```
    {% endraw %}
    

Subsequent email notifications will now include a chart image that is generated for the alert. (Without the HTML `<img src= >` tag, the value returned by the `imageLinks` iterator would be displayed as a URL to a chart image, and not as an image.)


### Updating an Pre-Existing Custom Alert Target for Slack

To update the template for a custom Slack alert target that was created before 2018-26.x:

1. Open the custom alert target for [editing](webhooks_alert_notification.html#editing-a-custom-alert-target).
1. In a separate browser tab, connect to your Wavefront service and create a new custom alert target of type **Webhook** with the **Slack** template.
1. In the newly created template, find and copy the section enclosed in the following lines:
    {% raw %}
    ```handlebars
    {{#imageLinks}}
      ...
    {{/imageLinks}} 
    ```
    {% endraw %}
  
4. Paste the copied section into template of the pre-existing alert target.
