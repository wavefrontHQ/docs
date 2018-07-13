---
title: Creating and Managing Custom Alert Targets
keywords: alert targets
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: webhooks_alert_notification.html
summary: Learn how to create custom alert targets to receive alert notifications on different messaging platforms.
---

You can create custom alert targets to configure alert notifications for a variety of messaging platforms, including email, pager services, and communication channels. A custom alert target enables you to specify where you want notifications to be sent, what kind of information you want in them, how you want them to be formatted, and which alert events should trigger them. For example, you can use a custom alert target to:
* Expand (or limit) the set of triggering events for notifications sent to a particular list of email addresses. 
* Associate a short name with a lengthy PagerDuty key.
* Configure notifications for a webhook-based messaging platform such as Slack, HipChat, and VictorOps.

This page provides general steps for creating and managing a custom alert target. These steps apply to any custom alert target, including targets you create from scratch.
* You can follow the steps for the [PagerDuty integration](pagerduty.html), [VictorOps integration](victorops.html), [Slack integration](slack.html), or [HipChat integration](hipchat.html) to configure alert notifications for these messagine platforms. (You can check for additional integrations [here](label_integrations.html).)
* See [Customizing Alert Target Templates](alert_target_customizing.html) for details about customizing the contents of alert notifications.


**Note** Our blog post [Engineering Tips Series: How Wavefront's Devops Team Uses Alert Targets to Provide Exceptional Quality of Services to Customers](https://www.wavefront.com/engineering-tips-series-wavefronts-devops-team-uses-alert-targets-provide-exceptional-quality-services-customers/) explains how alert targets help Wavefront to keep things running smoothly.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view alert targets, you must have [Alert Management permission](permissions_overview.html) to create and manage alert targets. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks areß not visible.</div>

## Alert Target Types

Use one of the following alert target types:

* A webhook alert target is a user-defined HTTP
callback that is triggered when an alert changes state. When the state change occurs, Wavefront makes an HTTP POST request to the URL that you configured for the webhook.

* An Email alert target allows you to specify the attributes of an email that is sent when an alert is triggered. The email can include a POST body with details about the alert.

* A PagerDuty alert target allows you to specify a PagerDuty key and a POST body to use when an alert is triggered.

The POST data that you can include with each type of alert are passed as a JSON payload.

## Viewing Custom Alert Targets

To view alert targets, select **Browse > Alert Targets**.



## Creating a Custom Alert Target

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
    <td rowspan="4">Type: Webhook </td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    
    <tr>
    <td>URL </td>
    <td>REST endpoint of the receiving application, e.g. Slack. The webhook url must be publicly accessible.</td>
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
      <td rowspan="4"> Type: Email </td>
      <td >&nbsp;</td>
      <td>&nbsp;</td>      
    </tr>
    <tr>  
      <td markdown="span">HTML Format </td>
      <td markdown="span">Specifies the expected message formatting. When checked, messages are interpreted as HTML; otherwise plain text. </td>
    </tr>    
    <tr>  
      <td markdown="span">Email Address List </td>
      <td markdown="span">One or more addresses, separated by commas. </td>
    </tr>
    <tr>
      <td markdown="span">Email Subject </td>
      <td markdown="span">Subject of all emails from this alert target. </td>
    </tr>
    <tr>
      <td rowspan="2">Type: Pagerduty </td>
      <td >&nbsp;</td>
      <td>&nbsp;</td>          
    </tr>  
    <tr>  
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
