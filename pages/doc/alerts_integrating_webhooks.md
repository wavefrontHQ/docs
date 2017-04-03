---
title: Integrating Webhooks with Alerts
keywords: webhooks
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: alerts_integrating_webhooks.html
summary: Learn how to create webhooks and integrate them with alerts.
---

## What is a Webhook?

A webhook is a user-defined HTTP callback. A webhook is usually triggered when a particular event occurs at the source
site. When the event occurs, the source site makes an HTTP POST request to the URL configured for the webhook that
contains data either passed as simple POST keys and values or in some other format such as JSON.

To view and manage webhooks, select **Browse > Webhooks**.

{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}



## Creating a Webhook

After creating a webhook, fill in the properties. Required fields have an asterisk next to the field name:
<table>
<tbody>
<tr><th>Property</th><th>Description</th></tr>
<tr>
<td>Name</td>
<td>The name of the webhook. The name should be simple while still making it easy to identify its purpose.</td>
</tr>
<tr>
<td>Triggers</td>
<td>The set of conditions that trigger the webhook:
<ul>
<li>Alert Opened - When the alert is opened (fired).</li>
<li>Alert Status Updated - When the status of an already open/firing alert changes, e.g. a new application/source meets the alert condition and joins the set.</li>
<li>Alert Resolved - When the alert is resolved.</li>
<li>Alert Affected by Maintenance Window - When the alert is affected by a maintenance window.</li>
<li>Alert Snoozed - When the alert is snoozed.</li>
</ul>
</td>
</tr>
<tr>
<td>URL</td>
<td>The REST endpoint of the receiving application, e.g. Slack.</td>
</tr>
<tr>
<td>Content Type</td>
<td>The content type of the POST Body:
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
<td markdown="span">A template for a payload that the webhook sends in the POST request. The template supports the [Mustache syntax](https://mustache.github.io/) and a set of [payload variables](#payload-variables).</td>
</tr>
<tr>
<td>Description</td>
<td>Information to describe the purpose of the webhook.</td>
</tr>
</tbody>
</table>

## Customizing a Webhook Payload
 
Wavefront webhook templates support Mustache syntax and a set of variables that parameterize the payload.
 
### Payload Template
Below is the default POST body template that the webhook sends via HTTP POST:

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

### Example Payload

{% raw %}
```handlebars
{
  "alertId": "1460761882996",
  "notificationId": "66dc2064-6bc1-437e-abe0-7c41afcd4aab",
  "reason": "ALERT_OPENED",
  "name": "Alert on Data rate ( Test)",
  "severity": "SMOKE",
  "severitySmoke": true,
  "severityInfo": false,
  "severityWarn": false,
  "severitySevere": false,
  "condition": "rate(ts(~agent.points.2878.received)) > 4",
  "url": "https://metrics.wavefront.com/u/LPc1zR8k9X",
  "createdTime": "04/15/2016 23:11:22 0000",
  "startedTime": "09/12/2016 21:47:39 0000",
  "sinceTime": "09/12/2016 21:45:39 0000",
  "endedTime": "",
  "snoozedUntilTime": "",
  "subject": "[SMOKE] OPENED: Alert on Data rate ( Test)",
  "hostsFailingMessage": "localhost (~agent.points.2878.received)",
  "errorMessage": "",
  "additionalInformation": "An alert to test a webhook integration with Hipchat",
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

## Template Variables
The variables that you can reference in a template to customize the message are:

<table>
<tbody>
<tr><th>Variable</th><th>Definition</th></tr>
<tr>
<td>alertId</td>
<td>The ID of the alert that triggered the webhook.</td>
</tr>
<tr>
<td>notificationId</td>
<td>A unique ID created for each notification sent via webhook.</td>
</tr>
<tr>
<td>reason</td>
<td>The trigger that caused the webhook to send notification: e.g. Alert Opened or Alert Snoozed, etc.</td>
</tr>
<tr>
<td>name</td>
<td>The name of the alert.</td>
</tr>
<tr>
<td>severity</td>
<td>The alert severity (e.g. INFO, SMOKE, WARN, SEVERE).</td>
</tr>
<tr>
<td>severityInfo</td>
<td>A flag set to True if the alert severity is set to INFO.</td>
</tr>
<tr>
<td>severitySmoke</td>
<td>A flag set to True if the alert severity is set to SMOKE.</td>
</tr>
<tr>
<td>severityWarn</td>
<td>A flag set to True if the alert severity is set to WARN.</td>
</tr>
<tr>
<td>severitySevere</td>
<td>A flag set to True if the alert severity is set to SEVERE.</td>
</tr>
<tr>
<td>condition</td>
<td>The query for the alert condition.</td>
</tr>
<tr>
<td>url</td>
<td>The link to the chart that shows the alert firing or resolved events along with the alert condition.</td>
</tr>
<tr>
<td>createdTime</td>
<td>The created time for the alert.</td>
</tr>
<tr>
<td>startedTime</td>
<td>The time the alert started firing.
</td>
</tr>
<tr>
<td>sinceTime</td>
<td>Time since the alert has been firing.</td>
</tr>
<tr>
<td>endedTime</td>
<td>The time the alert ended(resolved).</td>
</tr>
<tr>
<td>snoozedUntilTime</td>
<td>The time until the (if) alert has been snoozed.</td>
</tr>
<tr>
<td>subject</td>
<td>The subject for the payload (usually for email). By default it concatenates the alert severity, alert trigger, and alert name in the subject.</td>
</tr>
<tr>
<td>hostsFailingMessage</td>
<td>The list of series that are failing displayed as a message.</td>
</tr>
<tr>
<td>errorMessage</td>
<td>The message if there is an error while processing the query. This usually occurs when the alert goes in an invalid state.</td>
</tr>
<tr>
<td>failingSources</td>
<td>A list of hosts that are failing.</td>
</tr>
<tr>
<td>inMaintenanceSources</td>
<td>A list of hosts that are in a maintenance window.</td>
</tr>
<tr>
<td>newlyFailingSources</td>
<td>A list of hosts that are newly affected and are added to the failingSources list.</td>
</tr>
<tr>
<td>recoveredSources</td>
<td>A list of hosts that recovered from the alert.</td>
</tr>
<tr>
<td>failingSeries</td>
<td>A list of series that are failing.</td>
</tr>
<tr>
<td>inMaintenanceSeries</td>
<td>A list of series for which the hosts are in maintenance window.</td>
</tr>
<tr>
<td>newlyFailingSeries</td>
<td>A list of series that are newly affected and are added to the failingSeries list.</td>
</tr>
<tr>
<td>recoveredSeries</td>
<td>A list of series that recovered from the alert.</td>
</tr>
</tbody>
</table>

## Finding a Webhook ID
Each webhook has a unique system generated ID. To find the ID:

1. Click **Browse > Webhooks**.
1. Search for the webhook you want to add to the alert. Note the ID of the webhook in the Name column under the webhook description.
 
## Adding a Webhook to a Wavefront Alert
To apply a webhook integration to an existing alert, locate that alert in the Alerts page and click the alert. If you don't have an alert that to update with the webhook integration, then create a new alert.

1. Scroll down to the **Targets** field. 
1. Add the keyword **webhook** to the targets list. A dropdown list displays containing all the available webhooks present in Wavefront that can be integrated to your alert. The ID and the webhook URL for each webhook is listed.
1. Locate and select the ID of the webhook noted in Finding a Webhook ID.
1. Click **Save**.


{% include links.html %}
