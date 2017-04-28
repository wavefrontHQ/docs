---
title: Managing Webhooks
keywords: webhooks
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: webhooks_managing.html
summary: Learn how to create webhooks and integrate them with alerts.
---
A webhook is a user-defined HTTP callback. A webhook is usually triggered when a particular event occurs at the source
site. When the event occurs, the source site makes an HTTP POST request to the URL configured for the webhook that
contains data either passed as simple POST keys and values or in some other format such as JSON.

To view and manage webhooks, select **Browse > Webhooks**.

{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}

## Creating a Webhook

To create a webhook:

1.  Select **Browse > Webhooks**.
1.  Click the **Create Webhook** button:
1.  Fill in the webhook properties.

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
    <td markdown="span">A template for a payload that the webhook sends in the POST request.</td>
    </tr>
    <tr>
    <td>Description</td>
    <td>Information to describe the purpose of the webhook.</td>
    </tr>
    </tbody>
    </table>

1. Select **Webhook POST Body Template > Template > \<Template Type\>**, where \<Template Type\> is Default, Slack, VictorOps, and HipChat.
1. Customize the template as described in the next section.
1. Click **Save**. The webhook is added to the Webhooks page.

## Customizing a Webhook Template
 
Wavefront webhook templates support [Mustache syntax](https://mustache.github.io/) and a set of [payload functions](#payload-functions) and [payload variables](#payload-variables).

### Payload Functions
 
Payload functions allow you to set limits on the number of items returned in lists available to webhook payloads. The default value for each limit is 500. For a limit to take effect, the limit must be set before iteration. 

The order of the limit settings determines limit precedence. For example, setting `setDefaultIterationLimit` after setting `setFailingLimit` overwrites the `setFailingLimit` setting. 

For an example of how the payload functions work, see [Setting and Testing Iteration Limits](#setting-and-testing-iteration-limits).

{% include note.html content="If the application that is being integrated needs to get the full list of items (e.g. `failingSources`) then the `alertId` can be retrieved from the notification and a call performed using the Wavefront API to get the full list of items." %}

<table>
<thead>
<tr><th>Function</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td>setDefaultIterationLimit
</td>
<td>Sets all limits to the same value.
</td>
</tr>
<tr>
<td>setFailingLimit
</td>
<td markdown="span">Set the limit for the number of items returned by `failingSources` and `failingSeries`.
</td>
</tr>
<tr>
<td>setInMaintenanceLimit
</td>
<td markdown="span">Set the limit for the number of items returned by `inMaintenanceSources` and `inMaintenanceSeries`.
</td>
</tr>
<tr>
<td>setNewlyFailingLimit
</td>
<td markdown="span">Set the limit for the number of items returned by `newlyFailingSources` and `newlyFailingSeries`.
</td>
</tr>
<tr>
<td>setRecoveredLimit
</td>
<td markdown="span">Set the limit for the number of items returned by `recoveredSources` and `recoveredSeries`.
</td>
</tr>
<tr>
<td>getIterationLimit
</td>
<td markdown="span">Gets the value of an iteration limit. Valid values are: `defaultIterationLimit`, `failingLimit`, `inMaintenanceLimit`, `newlyFailingLimit`, and `recoveredLimit`.
</td>
</tr>
<tr>
<td>iterationLimitExceed
</td>
<td markdown="span">Check whether an iteration limit is limiting the number of the result returned. Valid values are: `failingLimitExceed`, `inMaintenanceLimitExceed`, `newlyFailingLimitExceed`, and `recoveredLimitExceed`.
</td>
</tr>
</tbody>
</table>

### Payload Variables

You can customize the payload using variables that characterize the alert triggering the webhook:

<table>
<thead>
<tr><th>Variable</th><th>Definition</th></tr>
</thead>
<tbody>
<tr>
<td>alertId</td>
<td>The ID of the alert that triggered the webhook.</td>
</tr>
<tr>
<td>alertTags</td>
<td>The tags associated with the alert that triggered the webhook.</td>
</tr>
<tr>
<td>notificationId</td>
<td>A unique ID created for each notification sent to the webhook.</td>
</tr>
<tr>
<td>reason</td>
<td>The trigger that caused the webhook to send the notification: e.g. Alert Opened or Alert Snoozed, etc.</td>
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
<td>A link to the chart that shows the alert firing or resolved events along with the alert condition.</td>
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
<td>A list of sources that are failing.</td>
</tr>
<tr>
<td>inMaintenanceSources</td>
<td>A list of sources that are in a maintenance window.</td>
</tr>
<tr>
<td>newlyFailingSources</td>
<td markdown="span">A list of sources that are newly affected and are added to the `failingSources` list.</td>
</tr>
<tr>
<td>recoveredSources</td>
<td>A list of sources that recovered from the alert.</td>
</tr>
<tr>
<td>failingSeries</td>
<td>A list of series that are failing.</td>
</tr>
<tr>
<td>inMaintenanceSeries</td>
<td>A list of series for which the sources are in maintenance window.</td>
</tr>
<tr>
<td>newlyFailingSeries</td>
<td markdown="span">A list of series that are newly affected and are added to the `failingSeries` list.</td>
</tr>
<tr>
<td>recoveredSeries</td>
<td>A list of series that recovered from the alert.</td>
</tr>
</tbody>
</table>

### Example Payloads

#### Example 1

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


#### Setting and Testing Iteration Limits

Suppose you have 8 failing hosts: "host1", "host2", "host3", "host4", "host5", "host6", "host7", "host8".  Setting `failingLimit` to 5 results in the following payload:

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
 "failingSources": ["host5", "host4", "host7", "host6", "host1"],
 "failingSeries": [[null,"3.0",[]]]
}
```
{% endraw %}

`failingSources` iterates only up to `failingLimit`, which in this case is 5. `failingLimitExceed` is true because the number the failing sources exceeds the limit set. In the case in which the limit is 10, the payload is:

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
  "failingSources": ["host5", "host4", "host7", "host6", "host1", "host3", "host2", "host8"],
  "failingSeries": [[null,"3.0",[]]]
}
```
{% endraw %}

## Testing a Webhook

To check that a webhook is functioning properly you may want to test it first. To test a webhook, select ![action_menu](images/action_menu.png#inline) **> Test** at the far right of the webhook.

## Editing a Webhook
To edit a webhook, click the webhook name in the Webhooks browser or select ![action_menu](images/action_menu.png#inline) **> Edit** at the far right of the webhook. 
  
## Deleting  Webhooks

You can delete one or more webhooks by checking the checkboxes next to the webhooks and clicking the Trash icon <i class="fa fa-trash"/> at the top of the Webhooks page. The Trash icon is grayed out if any of the selected webhooks cannot be deleted. To delete a single webhook, select ![action menu](images/action_menu.png#inline) **> Delete** at the far right of the webhook.

## Finding a Webhook ID
Each webhook has a unique system generated ID. Such IDs are used when adding a webhook as an [alert target](alerts_creating.html#alert-properties). To find the ID:

1. Click **Browse > Webhooks**.
1. Search for the webhook. In the Name column, note the ID of the webhook under the webhook description. 

   ![webhook ID](images/webhook_id.png)

## Adding a Webhook to a Wavefront Alert
To add a webhook as the target of an alert:

1. Click **Alerts** or select **Browse > Alerts**.
1. Locate the alert in the Alerts page and click the alert name.
1. Scroll down to the **Targets** field. 
1. Add the keyword **webhook** to the targets list. A dropdown list displays containing all the available webhooks present in Wavefront that can be integrated to your alert. The ID and the webhook URL for each webhook is listed.
1. Locate and select the ID of the webhook noted in [Finding a Webhook ID](#finding-a-webhook-id).
1. Click **Save**.

