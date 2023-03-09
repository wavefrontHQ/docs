---
title: BigPanda Integration
tags: [integrations list]
permalink: bigpanda.html
summary: Learn about the Wavefront BigPanda Integration.
---
## BigPanda Integration

BigPanda is an algorithmic event and alert management platform. This integration allows to create BigPanda tickets from triggered alerts in [[applicationName]]. [[applicationName]] and BigPanda both support webhooks, so you can configure an incoming webhook in BigPanda and an outgoing webhook in [[applicationName]] to pass notifications from [[applicationName]] alerts into BigPanda. A BigPanda ticket created based on alert in [[applicationName]] looks like this:

{% include image.md width="80" src="images/bigpanda_ticket.png" %}
## BigPanda Setup



### Step 1. Create a BigPanda AppKey and Bearer Token
1. Log in to your BigPanda instance.
2. Click **Integrations** and then **New Integration**.
3. Click Alerts REST API, type a name for the integration and then click Generate App Key. BigPanda generates an AppKey and a Bearer token
4. Copy the AppKey and Bearer Token and paste them into a text file or scratch pad.

Follow this [link](https://docs.bigpanda.io/reference#integrating-monitoring-systems) for more details.

### Step 2. Create a BigPanda Alert Target

{% include webhooks_create.md %}
1. In this case, URL would look like `https://api.bigpanda.io/data/v2/alerts`.
1. In the **Content Type** field, select **application/json**.
1. Add the following Custom Headers:{% raw %}
```
Authorization - Bearer {Bearer Token from Step 1}
```
{% endraw %}
1. Select **Generic Webhook Template** in **Alert Target POST Body Template**.
1. Customize the template, as follows:{% raw %}
```
{
  "app_key": "{AppKey from Step 1}",
  "host": [
    {{#trimTrailingComma}}
      {{#failingAlertSeries}}
        "Source-{{host}}",
      {{/failingAlertSeries}}
    {{/trimTrailingComma}}
  ],
  "status": {{#severitySevere}}"critical"{{/severitySevere}}{{#severityWarn}}"warning"{{/severityWarn}}{{#severityInfo}}"info"{{/severityInfo}}{{#severitySmoke}}"smoke"{{/severitySmoke}}, 
  "check": "{{#jsonEscape}}{{{name}}}{{/jsonEscape}}", 
  "description": "{{#jsonEscape}}{{{subject}}} {{{reason}}} [{{{severity}}}] {{{name}}}{{/jsonEscape}}\nMessage: \n{{#jsonEscape}}{{{errorMessage}}}{{/jsonEscape}}", 
  "additionalInformation": "{{#jsonEscape}}{{{additionalInformation}}}{{/jsonEscape}}", 
  "url": "{{{url}}}", 
  "alert_tags" : "{{#alertTags}}{{#jsonEscape}}{{{.}}}{{/jsonEscape}}|{{/alertTags}}",
  "incident_identifier": "{{host}}__{{#jsonEscape}}{{{name}}}{{/jsonEscape}}__{{#jsonEscape}}{{{condition}}}{{/jsonEscape}}",
  "host_tags": "{{tags}}", 
  "alert_severity": "{{{severity}}}", 
  "condition": "{{#jsonEscape}}{{{condition}}}{{/jsonEscape}}", 
  "createdTime": "{{{createdTime}}}",
  "startedTime": "{{{startedTime}}}",
  "sinceTime": "{{{sinceTime}}}",
  "endedTime": "{{{endedTime}}}"
}
```
{% endraw %}

1. Click **Save** to add the alert target in [[applicationName]].
1. Browse to the **Alert Target** page. In the Name column, note the ID of the alert target you just created.

### Step 4. Add the BigPanda Alert Target to [[applicationName]] Alert

{% include alerts.md %}
{% include webhooks_select.md %}




