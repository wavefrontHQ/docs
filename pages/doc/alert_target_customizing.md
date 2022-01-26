---
title: Customizing Alert Notifications
keywords: alert targets
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alert_target_customizing.html
summary: Learn how to customize alert notifications by modifying alert target templates.
---

An alert target provides a template that specifies how Wavefront extracts information from the alert, and how to assemble the notification from the alert information.

You can customize the predefined template for the alert target type by making and saving changes. The template uses [Mustache syntax](https://mustache.github.io/) to combine literal text with Wavefront-defined _variables_ and _functions_ to produce the structures to be sent to the receiving messaging platform.

{% include note.html content="For general information about setting up custom alert targets, see [Creating and Managing Custom Alert Targets](webhooks_alert_notification.html)." %}


<!---Newly to be added since last revision:
runbookLinks
dashboardLinks
matchingMW
alertRoute
headline
createdEpoch
startedEpoch
sinceEpoch
endedEpoch
snoozedUntilEpoch
secureMetricDetails
failing
inMaintenance
newlyFailing
recovered
isAlertNoData
isAlertNoDataResolved
failingHostSize
inMaintenanceHostSize
newlyFailingHostSize
recoveredHostSize
iterationLimitMap--->

## About Alert Target Templates


The template defined by a custom alert target describes the contents of the notifications that will be sent whenever an alert transition triggers an event.

Here's what happens:
1. The alert triggers an event.
2. The alert template
   * Identifies the information you want to extract from the alert
   * Embeds that information in a formatted structure appropriate for the target's messaging platform.
3. Wavefront sends the formatted information to the target.
4. The messaging platform interprets the structure and displays it as a readable notification.

For example:

* A template for an HTML email alert target specifies the HTML structure that will be sent as the message body, and specifies the alert information to be included within that structure. Each piece of alert information is inserted as a value of an HTML element or attribute.

* A template for a Slack alert target specifies the JSON structure that will be POSTed to the Slack endpoint, and specifies the alert information to be included within that structure. Each piece of alert information is inserted as a value of a Slack-defined JSON attribute.


### Predefined Templates

Wavefront provides a predefined template for each type of custom alert target. You can use the predefined template as is, or you can customize it.

You can [inspect](#display-and-edit-predefined-templates) a predefined template to see:

* The Wavefront-defined [variables](#template-variables) and [functions](#template-functions) that extract information from the alert.

* The structural elements in which the extracted information is embedded. These are JSON attributes, HTML elements, or plain text, depending on the  messaging platform to which notifications will be sent.

The predefined Slack and VictorOps templates contain JSON attributes defined by the messaging platform. See the product documentation for the platform for details.

{% include note.html content="The predefined Webhook Generic template contains JSON attributes that do not conform to any particular message platform's Webhook endpoint specification. This template simply demonstrates how to access the different kinds of alert information for a Webhook endpoint." %}

### Template Variables

Wavefront defines template variables for accessing [information about the alert](#obtain-information-about-the-alert) and about [the time series tested by the alert](#obtain-information-about-the-alerts-time-series). When the alert triggers a notification, Wavefront replaces the variables in the template with strings that represent the requested values. 

We support property and iterator variables, which are used differently.

* A _property_ variable accesses a single value. For example, `alertID` accesses a single string that represents the alert's unique ID.

   Each property is enclosed in 3 pairs of curly braces. (In an HTML email template, you can use 2 pairs of curly braces around a property.)

  {% raw %}
  ```handlebars
  {{{alertId}}}     {{! a property}}
  ```
  {% endraw %}

* An _iterator_ variable accesses a value that is a list of elements. For example, `alertTags` accesses a list of 0 or more strings that represents tags associated with the alert.

   Each iterator is used in a Mustache _section_, with the iterator's name appearing on either end. Because an iterator successively visits each element in its list, you can use {% raw %} `{{{.}}}` {% endraw %} within the section to indicate the element currently being visited. The section normally contains additional literal text and functions to format each visited element, such as a following comma or other separator character.

  {% raw %}
  ```handlebars
  {{#alertTags}}    {{! an iterator}}
      {{{.}}}
  {{/alertTags}}
  ```
  {% endraw %}


[Mustache](https://mustache.github.io/) supports several variations in each case.



### Template Functions

Wavefront defines template functions for performing various tasks, such as [tailoring the notification content to the trigger type](#tailor-content-to-the-trigger-type), [limiting the number of elements an iterator can return](#limit-list-sizes), and [assisting with JSON or XML formatting](#utility-functions-for-readability).

The following snippet shows the basic Mustache syntax for two functions:

{% raw %}
```handlebars
{{! a function}}
{{#setDefaultIterationLimit}}5{{/setDefaultIterationLimit}}

{{! another function}}
{{#isAlertOpened}}
    ... {{! lines describing the message content }}
{{/isAlertOpened}}
```
{% endraw %}

Like iterators, a function is used in a Mustache section, with the function's name appearing on either end. The contents of the section are passed as input to the function.

## Display and Edit Predefined Templates

To display and edit a predefined template for a new or existing custom alert target:

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol><li><a href="webhooks_alert_notification.html#hcreate-a-custom-alert-target">Create</a> or <a href="webhooks_alert_notification.html#edit-a-custom-alert-target">edit</a> the custom alert target. </li>
<li>In the <strong>Body Template</strong> field, click <strong>Template</strong> and select one of the predefined templates. The alert target's type determines the available predefined templates. On the right are the choices for a custom alert target of type <strong>Email</strong>:</li>
<li>Add, remove, or rearrange alert information and structural elements of the predefined template, or replace the predefined template with a template of your own. </li>
<li>Scroll to the end of the <strong>Body Template</strong> field and click <strong>Save</strong>.</li></ol></td>
<td width="50%"><img src="images/alert_target_predefined_template.png" alt="predifined alert target screenshot"></td>
</tr>
</tbody>
</table>



## Obtain Information About the Alert

Wavefront defines variables for obtaining information about the alert as a whole, such as the alert ID, timing, severity, and so on. Each of these variables is a property unless explicitly described as an iterator.

### General Information About the Alert

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
<td>Iterator returning 0 or more tags associated with the alert that triggered the alert target.</td>
</tr>
<tr>
<td markdown="span">`condition`</td>
<td>Alert condition query.</td>
</tr>
<tr>
<td markdown="span">`errorMessage`</td>
<td><strong>Deprecated</strong>. Look at the updateMessage variable instead for information about the alert.</td>
</tr>
<tr>
<td markdown="span">`updateMessage`</td>
<td>Information about the alert, for example, information about the affected series. </td>
</tr>
<tr>
<td markdown="span">`hostsFailingMessage`</td>
<td>Message containing a list of the sources of the failing time series. These are time series for which the alert condition returned all true (non-zero) values for the duration of the <strong>Trigger Window</strong>.</td>
</tr>
<tr>
<td markdown="span">`imageLinks`</td>
<td markdown="span">Iterator returning URLs to [chart images](alerts_notifications.html#chart-images-in-alert-notifications). Currently returns 1 URL to the chart image that shows the alert's display expression at the time the alert fired or was updated.</td>
</tr>
<tr>
<td markdown="span">`name`</td>
<td>Name of the alert.</td>
</tr>
<tr>
<td markdown="span">`notificationId`</td>
<td>Unique ID of the notification being sent to the alert target.</td>
</tr>
<tr>
<td markdown="span">`reason`</td>
<td>Trigger that caused the alert target to send the notification, e.g., Alert Opened or Alert Snoozed.</td>
</tr>
<tr>
<td markdown="span">`subject`</td>
<td>Subject of the notification (usually for email). If you omit this variable, the subject is composed of the alert severity, alert trigger, and alert name.</td>
</tr>
<tr>
<td markdown="span">`url`</td>
<td markdown="span">Link that shows the alert in the [Alert Viewer](alerts.html#alert-viewer-tutorial).</td>
</tr>
<tr>
<td markdown="span">`chartUrl`</td>
<td markdown="span">Link to an [interactive chart](alerts_notifications.html#interactive-charts-linked-by-alert-notifications) that shows alert firing events or resolved events along with the alert condition.</td>
</tr>
<tr>
<td markdown="span">`matchingMW`</td>
<td markdown="span">Internal. Do not use.</td>
</tr>
<tr>
<td markdown="span">`alertRoute`</td>
<td>Route associated with alert target. Route allows you for example, to notify when a subset of hosts is failing. If defined a Webhook alert target, you can use the route in the notification template to send the alert to a different alert target. Another option to get this behavior is multiple alerts. See <a href="webhooks_alert_notification.html#add-custom-alert-routes">Add Custom Alert Routes</a> for background. </td>
</tr>
<tr>
<td markdown="span">`heading`</td>
<td>User-visible string for the alert state. Here's how the internal alert state maps to the user-visible string (in double quotes)
<ul>
<li>ALERT_OPENED: "OPENED"</li>
<li>ALERT_RESOLVED: "RECOVERED"</li>
<li>ALERT_MAINTENANCE: "SUSPENDED DUE TO MAINTENANCE"</li>
<li>ALERT_SNOOZED: "SNOOZED"</li>
<li>ALERT_INVALID: "INVALID ALERT"</li>
<li>ALERT_NO_LONGER_INVALID: "ALERT NO LONGER INVALID"</li>
<li>ALERT_TESTING: "TESTING"</li>
<li>ALERT_RETRIGGERED: "ALERT RE-TRIGGERED"</li>
<li>ALERT_NO_DATA: "ALERT NO DATA"</li>
<li>ALERT_NO_DATA_RESOLVED: "ALERT NO DATA RESOLVED"</li>
<li>ALERT_NO_DATA_MAINTENANCE: "ALERT NO DATA MAINTENANCE"</li>
</ul>
</td>
</tr>
<tr>
<td markdown="span">`secureMetricDetails`</td>
<td markdown="span">Customers set this property in environments that use Metrics Security Policies. See [Secure Metric Details](alerts_notifications.html#alert-notification-with-secured-metrics-details)</td>
</tr>
</tbody>
</table>



### Time-Related Information About the Alert

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
<td markdown="span">`createdTime`</td>
<td>Time the alert was created.</td>
</tr>
<tr>
<td markdown="span">`createdEpoch`</td>
<td>Time the alert was created, in Epoch format.</td>
</tr>
<tr>
<td markdown="span">`endedTime`</td>
<td>Time the alert ended (resolved).</td>
</tr>
<tr>
<td markdown="span">`endedEpoch`</td>
<td>Time the alert ended (resolved) in Epoch format.</td>
</tr>
<tr>
<td markdown="span">`sinceTime`</td>
<td>Time elapsed since the alert started firing.</td>
</tr>
<tr>
<td markdown="span">`sinceEpoch`</td>
<td>Time elapsed since the alert started firing, in Epoch format.</td>
</tr>
<tr>
<td markdown="span">`snoozedUntilTime`</td>
<td>Time when a snoozed alert is scheduled to be unsnoozed.</td>
</tr>
<tr>
<td markdown="span">`snoozedUntilEpoch`</td>
<td>Time when a snoozed alert is scheduled to be unsnoozed, in Epoch format.</td>
</tr>
<tr>
<td markdown="span">`startedTime`</td>
<td>Time the alert started firing.</td>
</tr>
<tr>
<td markdown="span">`startedEpoch`</td>
<td>Time the alert started firing, in Epoch format.</td>
</tr>
</tbody>
</table>

### Examples

**Example: Accessing Alert Information in a Generic Webhook Alert Target Template**

This portion of the Generic Webhook alert target template uses variables that access information about the alert.

{% raw %}
```handlebars
{
  "alertId": "{{{alertId}}}",
  "alertTags": [
    {{#trimTrailingComma}}
      {{#alertTags}}
        "{{#jsonEscape}}{{{.}}}{{/jsonEscape}}",
      {{/alertTags}}
    {{/trimTrailingComma}}
  ],
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
  "updateMessage": "{{#jsonEscape}}{{{updateMessage}}}{{/jsonEscape}}",
  "additionalInformation": "{{#jsonEscape}}{{{additionalInformation}}}{{/jsonEscape}}"
}
```
{% endraw %}

**Example: Alert Information in Output From the Sample Template**

Here is sample alert target output generated with the preceding template:

{% raw %}
```handlebars
{
  "alertId": "1460761882996",
  "alertTags": ["production", "mysql"],
  "notificationId": "66dc2064-6bc1-437e-abe0-7c41afcd4aab",
  "imageLinks": "[https://yourcompany.wavefront.com/api/v2/image/RPx3zR7u2X]",
  "reason": "ALERT_OPENED",
  "name": "Alert on Data rate (Test)",
  "severity": "SMOKE",
  "severitySmoke": true,
  "severityInfo": false,
  "severityWarn": false,
  "severitySevere": false,
  "condition": "rate(ts(~proxy.points.2878.received)) > 4",
  "url": "https://yourcompany.wavefront.com/u/LPc1zR8k9X",
  "createdTime": "04/15/2020 23:11:22 +0000",
  "startedTime": "09/12/2020 21:47:39 +0000",
  "sinceTime": "09/12/2020 21:45:39 +0000",
  "endedTime": "",
  "snoozedUntilTime": "",
  "subject": "[SMOKE] OPENED: Alert on Data rate (Test)",
  "hostsFailingMessage": "localhost (~proxy.points.2878.received)",
  "updateMessage": "Newly Affected: app-18 (~sample.cpu.loadavg.1m) [az=us-west-2][env=production] : 1.30912 db-9 (~sample.cpu.loadavg.1m) [az=us-west-2][env=production] : 1.48368 app-10 (~sample.cpu.loadavg.1m) [az=us-west-2][env=production] : 1.06334",
  "additionalInformation": "An alert to test a Webhook integration with Slack Light"
  }
```
{% endraw %}

Notice that, in a template entry such as {% raw %} `"alertId": "{{{alertId}}}"`{% endraw %}, everything except the variable is literal text that is passed through as output. So, for example:
*  `"alertId": " " `  is literal text that produces a sample JSON attribute called `"alertId"`.
* {% raw %}`{{{alertId}}}`{% endraw %} invokes the Wavefront-defined variable `alertId`, which expands to `1460761882996` in our example.


## Obtain Information About the Alert's Time Series

Wavefront defines variables for obtaining information about the time series that contributed to the alert's state change. Each of these variables is an iterator that visits the time series in a particular category, and returns one of the following kinds of information about the visited series:

* [Each series' source (host)](#list-sources-and-source-tags-of-an-alerts-time-series)
*
* [Each series' defining information](#list-the-definitions-of-an-alerts-time-series)
* A [custom combination of details](#access-a-custom-group-of-time-series-details) about each series.

The time series visited by a particular iterator are in one of the following categories:

<table id="series-category">
<colgroup>
<col width="20%"/>
<col width="80%"/>
</colgroup>
<thead>
<tr><th>Time Series Category</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td><em>Failing</em></td>
<td>The time series that caused the alert to fire or update. These are time series for which the alert condition returned all true (non-zero) values for the duration of the <strong>Alert fires</strong> time window.</td>
</tr>
<tr>
<td><em>Newly failing</em></td>
<td>Any time series that failed after the alert started firing, causing the alert to be updated. These are time series for which the alert condition returned all true (non-zero) values for the duration of the <strong>Alert fires</strong> time window, while at least one other time series continues to fail.</td>
</tr>
<tr>
<td><em>Recovered</em></td>
<td>Any previously failing time series that is no longer failing, causing the alert to be updated or possibly resolved. These are time series for which the alert condition returned all true (non-zero) values for the duration of the <strong>Alert fires</strong> time window, and then returned either false (0) values or no data for the duration of the <strong>Resolve Window</strong> time window.
</td>
</tr>
<tr>
<td><em>In maintenance</em></td>
<td markdown="span">Any time series whose source is associated with an ongoing [maintenance window](maintenance_windows_managing.html#using-maintenance-windows). These are time series that continue to be tested against the alert condition, but whose results do not change the alert's state.</td>
</tr>
</tbody>
</table>

{{site.data.alerts.note}}
The names of the iterators follow this convention: <code>&lt;seriesCategory&gt;&lt;InfoIndicator&gt;</code>. For example:
<ul>
  <li>
    <code>failingHosts</code> is an iterator that lists the <a href="#list-the-sources-of-an-alerts-time-series">host name</a> of each failing time series.
  </li>
  <li>
    <code>inMaintenanceSeries</code> is an iterator that lists the <a href="#list-the-definitions-of-an-alerts-time-series">defining information</a> of each time series whose source is in maintenance.
  </li>
  <li>
    <code>recoveredAlertSeries</code> is an iterator that can access a <a href="#access-a-custom-group-of-time-series-details">custom combination of details</a> about each recovered time series.
  </li>
</ul>
{{site.data.alerts.end}}

## Information about Alert Resolution Help

Starting with Alert v2, users can include information about the alert resolution such as a runbook. We support several variables for extracting or setting those fields.

<table id="resolution-category">
<colgroup>
<col width="20%"/>
<col width="80%"/>
</colgroup>
<thead>
<tr><th>Field</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td><em>runbookLinks</em></td>
<td>One or more URLs in which information for alert resolution is stored.</td>
</tr>
<tr>
<td><em>dashboardLinks</em></td>
<td>One or more URLs of dashboards that might help the user resolve the problem for which the alert was triggered. For example, if an alert for disk space is triggered, this could be a link to a dashboard that includes charts for disk usage. </td>
</tr>
</tbody>
</table>

## List Sources and Source Tags of an Alert's Time Series

You can use iterators to visit each time series in the indicated [category](#series-category) and return
* The string name of the series' source (host). Any time series not associated with a source is skipped.
* The string names of the source tags associated with each of sources. For example, corresponding to the `failingHosts` iterator, we support a `FailingHostSourceTags` iterator that returns the source tags associated with each failing host.


### List Sources of an Alert's Time Series

You can use iterators to visit each time series in the indicated [category](#series-category) and return the string name of the series' source (host). Any time series not associated with a source is skipped.

<table>
<colgroup>
<col width="30%"/>
<col width="70%"/>
</colgroup>
<thead>
<tr><th>Iterator</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`failingHosts`</td>
<td>Iterator that returns the source of each failing time series.</td>
</tr>
<tr>
<td markdown="span">`inMaintenanceHosts`</td>
<td>Iterator that returns each source that is in a maintenance window.</td>
</tr>
<tr>
<td markdown="span">`newlyFailingHosts`</td>
<td markdown="span">Iterator that returns the source of each time series that has failed since the previous notification. (These source names are also returned by `failingHosts`.)</td>
</tr>
<tr>
<td markdown="span">`recoveredHosts`</td>
<td>Iterator that returns the source of each time series that has recovered since the previous notification.</td>
</tr>
</tbody>
</table>


**Example: Accessing Alert Sources in a Generic Webhook Alert Target Template**

This portion of the Generic Webhook alert target template shows iterators that return the sources of the time series tested by the alert:

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
  ]
}
```
{% endraw %}

**Example: Accessing Source Tags Associated with Alert Sources in a Generic Webhook Alert Target Template**

This portion of the Generic Webhook alert target template shows iterators that return the source tags that are associated with the sources of the time series tested by the alert:

{% raw %}
```handlebars
"failingHostToSourceTags": [
    {{#trimTrailingComma}}
      {{#failingHostToSourceTags}}
        "Host: {{host}}, SourceTags: {{sourceTags}}",
      {{/failingHostToSourceTags}}
    {{/trimTrailingComma}}
  ],
  "inMaintenanceHostToSourceTags": [
    {{#trimTrailingComma}}
      {{#inMaintenanceHostToSourceTags}}
        "Host: {{host}}, SourceTags: {{sourceTags}}",
      {{/inMaintenanceHostToSourceTags}}
    {{/trimTrailingComma}}
  ],
  "newlyFailingHostToSourceTags": [
    {{#trimTrailingComma}}
      {{#newlyFailingHostToSourceTags}}
        "Host: {{host}}, SourceTags: {{sourceTags}}",
      {{/newlyFailingHostToSourceTags}}
    {{/trimTrailingComma}}
  ],
  "recoveredHostToSourceTags": [
    {{#trimTrailingComma}}
      {{#recoveredHostToSourceTags}}
        "Host: {{host}}, SourceTags: {{sourceTags}}",
      {{/recoveredHostToSourceTags}}
    {{/trimTrailingComma}}
  ],
  ```
  {% endraw %}

**Example: Alert Sources in Output From the Sample Template**

Here is a sample alert target output generated with the preceding template:

{% raw %}
```handlebars
{
  "failingSources": ["localhost", "db-1"],
  "inMaintenanceSources": ["app-3"],
  "newlyFailingSources": ["localhost", "db-1"],
  "recoveredSources": []
  }
```
{% endraw %}

Notice that the template provides literal text for enclosing each source name in quotation marks, for separating the source names with commas, and for enclosing the list in square brackets. The `trimTrailingComma` function suppresses the comma after the last source name.

### List Source Tags of an Alert's Time Series

You can use iterators to list the string names of the source tags associated with each of an alert's sources. For example, corresponding to the `failingHosts` iterator, we support a `FailingHostSourceTags` iterator that returns the source tags associated with each failing source.


<table>
<colgroup>
<col width="30%"/>
<col width="70%"/>
</colgroup>
<thead>
<tr><th>Iterator</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`failingHostSourceTags`</td>
<td>Iterator that returns source tags that are associated with the sources for each failing time series.</td>
</tr>
<tr>
<td markdown="span">`inMaintenanceHostSourceTags`</td>
<td>Iterator that returns source tags that are associated with the sources for each source that is in a maintenance window.</td>
</tr>
<tr>
<td markdown="span">`newlyFailingHostSourceTags`</td>
<td markdown="span">Iterator that returns source tags that are associated with the sources of each time series that has failed since the previous notification.</td>
</tr>
<tr>
<td markdown="span">`recoveredHostSourceTags`</td>
<td>Iterator that returns the source tags associated with the sources of each time series that has recovered since the previous notification.</td>
</tr>
</tbody>
</table>



## List the Definitions of an Alert's Time Series

You can use the following iterators to visit each time series in the indicated [category](#series-category) and return the series' defining information. The defining information for a series is a preformatted string that contains the source name, the metric name, and any point tags (shown as `<key>=<value>` pairs).

<table>
<colgroup>
<col width="25%"/>
<col width="75%"/>
</colgroup>
<thead>
<tr><th>Iterator</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`failingSeries`</td>
<td>Iterator that returns the source, metric name, and point tags of each failing time series.
</td>
</tr>
<tr>
<td markdown="span">`inMaintenanceSeries`</td>
<td>Iterator that returns the source, metric name, and point tags of each time series whose source is in a maintenance window. </td>
</tr>
<tr>
<td markdown="span">`newlyFailingSeries`</td>
<td markdown="span">Iterator that returns the source, metric name, and point tags of each time series that has failed since the previous notification.  (These series are also visited by `failingSeries`.)</td>
</tr>
<tr>
<td markdown="span">`recoveredSeries`</td>
<td>Iterator that returns the source, metric name, and point tags of each time series that has recovered since the previous notification.</td>
</tr>
</tbody>
</table>

**Example: Accessing Time Series Information in a Generic Webhook Alert Target Template**

This portion of the Generic Webhook alert target template shows iterators that return the defining information about the time series tested by the alert:

{% raw %}
```handlebars
{
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

**Example: Time Series Information in Output From The Sample Template**

Here is a sample alert target output generated with the preceding template:

{% raw %}
```handlebars
{
  "failingSeries": [
     ["localhost", "~proxy.points.2878.received", ["env=dev","az=us-west-1"]],
     ["db-1", "~proxy.points.2878.received", ["env=prod","az=us-west-2"]]
  ],
  "inMaintenanceSeries": [],
  "newlyFailingSeries": [
     ["localhost", "~proxy.points.2878.received", ["env=dev","az=us-west-1"]],
     ["db-1", "~proxy.points.2878.received", ["env=prod","az=us-west-2"]]
  ],
  "recoveredSeries": []
  }
```
{% endraw %}

The template explicitly includes literal text for enclosing the overall list of preformatted strings in square brackets, and for separating the preformatted strings with commas. The `trimTrailingComma` function suppresses the comma after the last preformatted string. The punctuation (quotation marks, comma separators, and square brackets) in each preformatted output string is generated automatically.


## Access a Custom Group of Time Series Details

You can access a custom combination of details for the time series that contributed to the alert's state change. To do so:
1. Use an [alert-series iterator](#alert-series-iterators) to visit each time series in the indicated [category](#series-category).
2. Use variable within the iterator section to access the [alert-series details](#alert-series-details) you want to include.

This technique gives you complete control over the formatting of the returned information, and allows you to access [statistics](#accessing-series-statistics) from each visited time series.

### Alert-Series Iterators

Use the following iterators to visit each time series in the indicated [category](#series-category) so you can obtain a custom group of details from each visited time series.

<table>
<colgroup>
<col width="30%"/>
<col width="70%"/>
</colgroup>
<thead>
<tr><th>Iterator</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`failingAlertSeries`</td>
<td markdown="span">Iterator that can return a custom combination of [details](#alert-series-details) for each failing time series.
</td>
</tr>
<tr>
<td markdown="span">`inMaintenanceAlertSeries`</td>
<td markdown="span">Iterator that can return a custom combination of [details](#alert-series-details) for each time series whose source is in a maintenance window.</td>
</tr>
<tr>
<td markdown="span">`newlyFailingAlertSeries`</td>
<td markdown="span">Iterator that can return a custom combination of [details](#alert-series-details) for each time series that has failed since the previous notification.  (These series are also visited by `failingAlertSeries`.)</td>
</tr>
<tr>
<td markdown="span">`recoveredAlertSeries`</td>
<td markdown="span">Iterator that can return a custom combination of [details](#alert-series-details) for each time series that has recovered since the previous notification.</td>
</tr>
</tbody>
</table>

### Alert-Series Details

Use the following variables within the section of an [alert-series iterator](#alert-series-iterators) to specify the details to be included for each visited series. You can use any subset of these variables in any order. Use literal text around these items if you want to format them with any labels, separators, or other punctuation.
<table>
<colgroup>
<col width="20%"/>
<col width="80%"/>
</colgroup>
<thead>
<tr><th>Variable</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`host`</td>
<td>Name of the source of the time series being visited.
</td>
</tr>
<tr>
<td markdown="span">`label`</td>
<td>Name of the metric of the time series being visited.
</td>
</tr>
<tr>
<td markdown="span">`tags`</td>
<td>Iterator that returns a list of the point tags associated with the time series being visited. Each point tag is formatted like this:  <code>key=value</code>. To access the value of a specific point tag, use this syntax: <code>&#123;&#123;#tags&#125;&#125;&#123;&#123;pointTagKey&#125;&#125;&#123;&#123;/tags&#125;&#125;</code>
</td>
</tr>
<tr>
<td markdown="span">`observed`</td>
<td>Number of data points returned by the visited time series during the most recent checking time window.
</td>
</tr>
<tr>
<td markdown="span">`firing`</td>
<td markdown="span">Number of data points in the visited series that are preventing the alert from resolving, during the most recent checking time window. The smaller the number, the closer the series is to recovering. This property is useful only for time series visited by `failingAlertSeries` and `newlyFailingAlertSeries`.
</td>
</tr>
<tr>
<td markdown="span">`stats`</td>
<td markdown="span">See [Alert-Series Statistics](#alert-series-statistics).
</td>
</tr>
</tbody>
</table>

**Example: Accessing Alert-Series Details in a Generic Webhook Alert Target Template**

This portion of the Generic Webhook alert target template shows how to use the `failingAlertSeries` iterator to retrieve alert-series details for each time series that failed:

{% raw %}
```handlebars
"failingAlertSeries": [
  {{#trimTrailingComma}}
    {{#failingAlertSeries}}
      "Source: {{host}}, Label: {{label}}, All Tags: {{tags}}, Env: {{#tags}}{{env}}{{/tags}}, Observed: {{observed}}, Firing: {{firing}}",
    {{/failingAlertSeries}}
  {{/trimTrailingComma}}
]
```
{% endraw %}

**Example: Alert-Series Details in Output from the Sample Template**

The preceding template might yield the following message:

{% raw %}
```handlebars
"failingAlertSeries": [
    "Source: raspberrypi, Label: humidity, All Tags: {env=production, az=us-west-2}, Env: production, Observed: 5, Firing: 2"]
```
{% endraw %}

### Alert-Series Statistics

Statistics provide a profile of the values in a time series during the checking time window immediately preceding a notification. For example, the alert might be set up to fire when a condition is true for 10 minutes. During a 10-minute period where the condition is true, a time series likely have multiple values. You can use statistics to find out, e.g., the largest of these values, or the last value to be reported during the **Alert fires** time window.

<!---
For classic alerts, statistics are normally useful only if you have set the alert's **Display Expression** field with a display expression that captures the underlying time series being tested by the condition expression. If the alert has no display expression, statistics are based on the values that are returned by the alert's condition expression. Because the condition expression returns either 0 or not 0, that information is not useful.

Multi-threshold alerts include a predefined display expression.-->

Use the following variables within the section of an [alert-series iterator](#alert-series-iterators) to specify the statistics that you want to include for each visited series. You can use any subset of these variables in any order. Use literal text around these items if you want to format them with any punctuation, separators, or labels.

<table>
<colgroup>
<col width="20%"/>
<col width="80%"/>
</colgroup>
<thead>
<tr><th>Variable</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`stats`</td>
<td markdown="span"> Set of statistics about the values in the visited time series during the checking time window preceding the notification.
</td>
</tr>
<tr>
<td markdown="span">`stats.first`</td>
<td>
First value reported within the checking time window immediately preceding the notification.
</td>
</tr>
<tr>
<td markdown="span">`stats.last`</td>
<td>
Last value reported within the checking time window immediately preceding the notification.
{% include note.html content="This value is appended to the output of `hostsFailingMessage`, which is automatically included in the built-in email and PagerDuty alert targets."%}
</td>
</tr>
<tr>
<td markdown="span">`stats.min`</td>
<td>
Minimum value reported within the checking time window immediately preceding the notification.
</td>
</tr>
<tr>
<td markdown="span">`stats.max`</td>
<td>
Maximum value reported within the checking time window immediately preceding the notification.
</td>
</tr>
<tr>
<td markdown="span">`stats.mean`</td>
<td>
Average of the values reported within the checking time window immediately preceding the notification.
</td>
</tr>
</tbody>
</table>

**Example: Accessing Alert-Series Statistics in a Generic Webhook Alert Target Template**

This portion of the Generic Webhook alert target template shows how to use the `failingAlertSeries` iterator to retrieve alert-series statistics for each time series that failed:

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

**Example: Alert-Series Statistics in Output from the Sample Template**

The preceding template might yield the following message:

{% raw %}
```handlebars
"failingAlertSeries": [
    "Source: raspberrypi, Label: humidity, Tags: {env=production, az=us-west-2}, Observed: 5, Firing: 2,
    First: 46.6, Last: 46.0, Min: 46.0, Max: 46.6, Mean: 46.279999999999994"]
```
{% endraw %}

## Tailor Content to the Trigger Type

If you want to send out different notifications for different types of triggers, you can use the following functions.
For example, you can use the same template to send out one message for a firing alert, and another message for an updated alert. You also tailor content based on the alert severity.

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
<td markdown="span"> Includes the contents of the section only if the alert has transitioned from checking to firing.
</td>
</tr>
<tr>
<td markdown="span">`isAlertUpdated`</td>
<td markdown="span"> Includes the contents of the section only if the alert is updated - that is, if the alert continues firing while an individual time series changes from recovered to failing, or from failing to recovered.
</td>
</tr>
<tr>
<td markdown="span">`isAlertResolved`</td>
<td markdown="span"> Includes the contents of the section only if the alert is fully resolved, and so has transitioned from firing to checking.
</td>
</tr>
<tr>
<td markdown="span">`isAlertMaintenance`</td>
<td markdown="span"> Includes the contents of the section only if one or more sources associated with the alert are in an ongoing maintenance window.
</td>
</tr>
<tr>
<td markdown="span">`isAlertSnoozed`</td>
<td markdown="span"> Includes the contents of the section only if the alert has been snoozed.
</td>
</tr>
<tr>
<td markdown="span">`isAlertRetriggered`</td>
<td markdown="span"> Includes the content of this section if <strong>Resend Notification</strong> is set for this alert, and if the notification is not an initial notification but a resend.
</td>
</tr>
<tr>
<td markdown="span">`isAlertNoData`</td>
<td markdown="span">Includes the content of this section if the alert query returns NO DATA.
</td>
</tr>
<tr>
<td markdown="span">`isAlertNoDataResolved`</td>
<td markdown="span">Includes the contents of the section only if the alert previously returned NO DATA, and so has data now.
</td>
</tr>
<tr>
<td markdown="span">`severityInfo`</td>
<td>Includes the contents of the section only if alert severity is set to INFO.</td>
</tr>
<tr>
<td markdown="span">`severitySmoke`</td>
<td>Includes the contents of the section only if alert severity is set to SMOKE.</td>
</tr>
<tr>
<td markdown="span">`severitySevere`</td>
<td>Includes the contents of the section only if alert severity is set to SEVERE.</td>
</tr>
<tr>
<td markdown="span">`severityWarn`</td>
<td>Includes the contents of the section only if alert severity is set to WARN.</td>
</tr>
</tbody>
</table>

**Example: Conditionalizing Content in a Plain Text Alert Target Template**


Here is an alert target template for plain text notifications that sends the text "Alert is firing!" if the alert opened, and sends different messages if the alert is updated or resolved.

{% raw %}
```handlebars
{{! Alert Opened section }}
{{#isAlertOpened}}
  Alert is firing!
{{/isAlertOpened}}

{{! Alert Updated section }}
{{#isAlertUpdated}}
  An individual time series failed or recovered while at least one other time series is firing!
{{/isAlertUpdated}}

{{! Alert Resolved section }}
{{#isAlertResolved}}
  Alert has resolved!
{{/isAlertResolved}}
```
{% endraw %}

Here is the output in a notification that was triggered by the alert firing.
{% raw %}
```handlebars
Alert is firing!
```
{% endraw %}

## Limit List Sizes

If your messaging platform imposes a limit on the number of characters in a notification, you can avoid exceeding this limit by setting a limit on the number of items returned by iterators.

The default value for each limit you can set with a customization function is 500. You must set the limit before iteration or the limit does not take effect.

The order of the limit settings determines limit precedence. For example, if you first set `setDefaultIterationLimit` and then you set `setFailingLimit`, then  `setFailingLimit` overwrites the `setDefaultIterationLimit` setting.

The `failingLimit` property applies to all iterators in the `failing` category: `failingAlertSeries`, `failingSeries`, `failingHosts`, and `failingHostsToSourceTags`.

See [Setting and Testing Iteration Limits](#example-setting-and-testing-iteration-limits) for an example.

{% include note.html content="If the application that is being integrated requires the full list of items (e.g., `failingHosts`) you can retrieve the `alertId` from the notification and use the Wavefront API to get the full list of items." %}


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
<td markdown="span">Sets the limit for the number of items returned by `failingAlertSeries`, `failingHosts`, `failingHostsToSourceTags`, and `failingSeries`.
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

**Example: Setting and Testing Iteration Limits**

Suppose you have 8 failing sources: `source1`, `source2`, `source3`, `source4`, `source5`, `source6`, `source7`, `source8`. You set `setDefaultIterationLimit` to 5 in the first line of the following template:

{% raw %}
```handlebars
{{#setDefaultIterationLimit}}5{{/setDefaultIterationLimit}}
{
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
  ]
}
```
{% endraw %}

The template with these settings produces the following output for the 8 failing sources:

{% raw %}
```handlebars
{
 "iterationLimitExceed": {
   "failingLimitExceed": "true",
   "inMaintenanceLimitExceed": "false",
   "newlyFailingLimitExceed": "false",
   "recoveredLimitExceed": "false"
 },
 "alertId": "1492543979795",
 "alertTags": ["production", "mysql"],
 ...
 "failingSources": ["source5", "source4", "source7", "source6", "source1"]
}
```
{% endraw %}

`failingHosts` iterates only up to `failingLimit`, which is 5 in this case. `failingLimitExceed` is `true` because the number of failing sources exceeds the limit.

In contrast, if the `failingLimit` is 10, the output is the following for 8 failing sources:

{% raw %}
```handlebars
{
  "alertId": "1492543979795",
  "alertTags": [production, mysql],
  ...
  "failingSources": ["source5", "source4", "source7", "source6", "source1", "source3", "source2", "source8"]
}
```
{% endraw %}

For this case (limit 10, failing sources 8) `failingLimitExceed` is `false` because the number of failing sources does not exceed the limit set.

## Utility Functions for Readability

You can use alert target utility functions to make the output of the alert target more readable. This section doesn't include examples, but many other examples include these functions.

* Use `jsonEscape` if you send notifications to a messaging platform that uses JSON.
* Use `xml11Escape` or `xml10Escape` if you send notifications to a messaging platform that uses XML.
* Use `trimTrailingComma` if you send notifications to a messaging platform that does not automatically suppress a literal comma after the final element of a list.
* Use `convertWhiteSpace` to convert characters that cause problems in a JSON file (`\t` `\n` `\x0B` `\f` `\r` etc.) to white space.
* Use `convertEpochMillisToSeconds` to convert Epoch milliseconds to seconds. This is useful if you want to create an alert target that includes a URL, which can't include milliseconds.


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
<td markdown="span">Escapes the characters in a string using JSON string rules.
Escapes any values it finds into their Json string form. Deals correctly with quotes and control-chars (tab, backslash, cr, ff, etc) so, for example, a tab becomes the characters `\\` and `t`.</td>
<td markdown="span">Input: `She didn't say, "Alert!"`\\
Output: `She didn't say, \"Alert!\"`</td>
</tr>
<tr>
<td markdown="span">`xml11Escape`</td>
<td><div>Escapes the characters in a String using XML entities.
XML 1.1 can represent certain control characters, but it cannot represent the null byte or unpaired Unicode surrogate codepoints, even after escaping.</div>
<div>
<code>
escapeXml11</code> removes characters that do not fit in the following ranges:</div>
<code>[#x1-#xD7FF]|[#xE000-#xFFFD]|[#x10000-#x10FFFF]

</code>
<div>
<code>escapeXml11</code> escapes characters in the following ranges:
</div>
<code>[#x1-#x8]|[#xB-#xC]|[#xE-#x1F]|[#x7F-#x84]|[#x86-#x9F]</code>
</td>
<td markdown="span"> Input: `"bread" & "chocolate"`\\
Output: `&quot;bread&quot; &amp; &quot;chocolate&quot;`</td>
</tr>

<tr>
<td markdown="span">`xml10Escape`</td>
<td><div>Escapes the characters in a string using XML entities.
XML 1.0 is a text-only format, it cannot represent control characters or unpaired Unicode surrogate codepoints, even after escaping.</div>
<div>
<code>
escapeXml10</code> removes characters that do not fit in the following ranges:
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
<td markdown="span">Retains the string content up to the last comma.
Often used within iterator sections to remove the extra comma after the last element visited by an iterator.
</td>
<td markdown="span">
Input:\\
`"(Host: "xyz", Label: 3.0),   "`\\
Output:\\
`"(Host: "xyz", Label: 3.0)   "`
</td>
</tr>
<tr>
<td markdown="span">`convertWhiteSpace`
</td>
<td markdown="span">Converts characters that cause problems in a JSON file (`\t` `\n` `\x0B` `\f` `\r` etc.) to white space.
</td>
<td markdown="span">
Input:\\
`Give me space! \r Now!`\\
Output:\\
`Give me space!  Now!`\\
</td>
</tr>
<tr>
<td markdown="span">`convertEpochMillisToSeconds`
</td>
<td markdown="span">Convert Epoch milliseconds to seconds. This is useful if you want to create an alert target that includes a URL. URLs can't include milliseconds.
</td>
<td markdown="span">
Input:1600273622000
Output:1600273622
</td>
</tr>
</tbody>
</table>

## Add Chart Images to Older Custom Alert Targets

The predefined template for a custom HTML email target or a custom Slack target automatically includes the `imageLinks` variable for producing a [chart image](alerts_notifications.html#chart-images-in-alert-notifications) in alert notifications. However, if you created a custom email alert target or a custom Slack alert target before 2018-26.x, you must explicitly update the alert target's template to include a chart image in the alert notifications.

{% include note.html content="You do not need to update existing custom alert targets of type PagerDuty. All PagerDuty notifications sent in 2018-26.x or later will include chart images." %}

### Update an Existing Custom Email Alert Target

To update a custom email alert target that was created before 2018-26.x:

1. Open the custom alert target for [editing](webhooks_alert_notification.html#edit-a-custom-alert-target).
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


### Update an Existing Custom Alert Target for Slack

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

## Include a Link to a Tracing Service Dashboard

If the Wavefront query in an alert has an application and service name and meets a specific alert target, you get a link to drill down to the [service dashboard](tracing_service_dashboard.html). The service dashboard lets you see RED metrics of the application or service and identify potential hot spots.

Let's walk through a scenario:

1. Create an alert target. Let's use the Generic Webhook alert target template because it includes the required settings by default:

    ![a screenshot of the Generic Webhook alert target template. The tracing dahsboard section is highlighted in red.](images/alert_target_tracing_dahsboard.png)

    {% include note.html content="If you want to include a service dashboard link in a Slack notification, email, or Pager Duty notification, you need to copy the code snippet below and add it to the respective template." %}

    <pre>
    "tracingDashboardLinks": [
      &#123;&#123;#trimTrailingComma&#125;&#125;
        &#123;&#123;&#35;tracingPageLinks&#125;&#125;
          "&#123;&#123;&#123;.&#125;&#125;&#125;",
        &#123;&#123;/tracingPageLinks&#125;&#125;
    </pre>

1. [Create an alert](alerts_manage.html) that would fire for a specific application or service and set the alert target you created.
    Here we create an alert that fires when the request rate is greater than 3 for the `beachshirts` application's `delivery` service.
    ![a screenshot of the alert.](images/alert_tracing_service_dashboard.png)

If the alert you created moves to the firing stage, Wavefront sends a notification to the users specified in the alert target. The notification includes a link to the service dashboard. For example, in this scenario, the JSON output of your notification looks like this:
```
"tracingDashboardLinks": [
  "https://<cluster_name>.wavefront.com/tracing/service/details#_v01(g:(d:1500,s:1619576595),p:(application:(v:beachshirts),service:(v:delivery)))"
]
```
The link takes you to the service dashboard of the `beachshirts` application's `delivery` service.

You also see the dashboard link in the alert. Click on the image icon to go to the service dashboard of the `beachshirts` application's `delivery` service.

![A screenshot of the alert with the tracing service dashboard icon](images/alert_with_tracing_service_dashboard_link.png)
