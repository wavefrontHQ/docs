---
title: Creating and Managing Custom Alert Targets
keywords: alert targets
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: webhooks_alert_notification.html
summary: Learn how to create custom alert targets to receive alert notifications on different messaging platforms.
---

You can create custom alert targets to configure alert notifications for a variety of messaging platforms, including email, pager services, and communication channels. 

This page provides general steps for creating and managing a custom alert target. 

* As a convenience, you can follow the steps in [PagerDuty Integration](pagerduty.html), [VictorOps Integration](victorops.html), [Slack Integration](slack.html), or [HipChat Integration](hipchat.html) to configure custom alert targets specifically for these messaging platforms. (You can check for additional integrations [here](label_integrations.html).)

* See [Customizing Alert Target Templates](alert_target_customizing.html) for specific details about customizing the contents of alert notifications.

* Our blog post [Engineering Tips Series: How Wavefront's Devops Team Uses Alert Targets to Provide Exceptional Quality of Services to Customers](https://www.wavefront.com/engineering-tips-series-wavefronts-devops-team-uses-alert-targets-provide-exceptional-quality-services-customers/) explains how alert targets help Wavefront to keep things running smoothly.

<div markdown="span" class="alert alert-info" role="alert"><strong>Note</strong> While every Wavefront user can view alert targets, you must have [Alert Management permission](permissions_overview.html) to create and manage alert targets. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>

## About Alert Targets

Alert targets specify when and how to send notifications in response to alert activity. You implicitly use Wavefront's built-in alert targets when you specify an email address or a PagerDuty key in the target list of an alert. These simple alert targets:

* Cause notifications to be sent whenever the alert is firing, updated, resolved, snoozed or in a maintenance window. 
* Provide internal templates that compose and format the notification contents. These internal templates are maintained by Wavefront, and may change from release to release.

You can create custom alert targets when you need more flexibility about where you want notifications to be sent, what kind of information you want in them, how you want them to be formatted, and which alert events should trigger them. For example, you could use a custom alert target to:

* Expand (or limit) the set of triggering events for notifications.
* Configure different contents for notifications triggered by different events.
* Associate a short name with a long list of email addresses or a lengthy PagerDuty key.

**Note:** You always use a custom alert target for sending notifications to a webhook-based messaging platform such as Slack, HipChat, or VictorOps. 


## Viewing Custom Alert Targets

To view alert targets, select **Browse > Alert Targets**.



## Creating a Custom Alert Target

The process for creating an alert target is similar for the different types of targets. Setting the **Type** causes a few different fields to be displayed.

1.  Select **Browse > Alert Targets**.
1.  Click the **Create Alert Target** button.
1.  Fill in the properties that are common to all alert targets. 
    <table>
    <tbody>
    <thead>
    <tr><th>Property</th><th colspan="2">Description</th></tr>
    </thead>
    <tr>
    <td><strong>Name</strong></td>
    <td colspan="2">Name of the alert target. Pick a name that is simple and that makes it easy to identify the alert target's purpose.</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="2">Description of the alert target. </td>
    </tr>
    <tr>
    <td><strong>Triggers</strong></td>
    <td colspan="2">One or more <a href="alerts_states_lifecycle.html">alert state changes</a> that trigger the alert target. The options are:
    <ul>
    <li><strong>Alert Firing</strong> - Trigger when the alert is firing.</li>
    <li><strong>Alert Status Updated</strong> - Trigger when the status of an open alert changes. For example, a new source satisfies the alert condition and joins the set of affected sources.</li>
    <li><strong>Alert Resolved</strong> - Trigger when the alert is resolved.</li>
    <li><strong>Alert Affected by Maintenance Window</strong> - Trigger when the alert is affected by a maintenance window.</li>
    <li><strong>Alert Snoozed</strong> - Trigger when the alert is snoozed.</li>
    <li><strong>Alert Has No Data</strong> - Trigger when the series that is referenced in the alert condition is not reporting data.</li>
    <li><strong>Alert Has No Data Resolved</strong> - Trigger when the series that is referenced in the alert condition starts reporting data after having no data.</li>
    <li><strong>Alert Entered Maintenance From No Data</strong> - Trigger when the series that is referenced in the alert condition is not reporting data and is affected by a  maintenance window.</li>
    </ul>
    </td></tr>
    </tbody>
    </table>

1.  From the **Type** pull-down menu, select the alert target type:
    <table>
    <tbody>
    <thead>
    <tr><th>Type</th><th colspan="2">Description</th></tr>
    </thead>
    <tr>
    <td><strong>Webhook</strong></td>
    <td colspan="2">Alert target for sending notifications to messaging platforms such as Slack, VictorOps, or HipChat. This alert target defines the HTTP callback (POST request and URL) that is triggered when an alert changes state. </td>
    </tr>
    <tr>
    <td><strong>Email</strong></td>
    <td colspan="2">Alert target for sending notifications to email systems. This alert target specifies the attributes of the email messages to be sent when an alert changes state.</td>
    </tr>
    <tr>
    <td><strong>PagerDuty</strong></td>
    <td colspan="2">Alert target for sending notifications to PagerDuty. This alert target specifies the PagerDuty key and a POST body to use when an alert changes state.</td>
    </tr>
    </tbody>
    </table>

1.  Fill in the type-specific properties.
* For type **Webhook**, set these properties:
      <table>
      <tbody>
      <thead>
      <tr><th>Webhook Property</th><th>Description</th></tr>
      </thead>
      <tr>
      <td><strong>URL</strong> </td>
      <td markdown="span">REST endpoint of the messaging platform to receive the alert notification. You can follow the setup steps in [Slack Integration](slack.html), [VictorOps Integration](victorops.html), or [HipChat Integration](hipchat.html) to obtain a notification URL. The notification URL must be publicly accessible. </td>
      </tr>
      <tr>
        <td><strong>Content Type</strong></td>
        <td>Content type of the POST body:
          <ul>
            <li>application/json</li>
            <li>text/html</li>
            <li>text/plain</li>
            <li>application/x-www-form-urlencoded</li>
        </ul></td>
      </tr>
      <tr>
        <td><strong>Custom Headers</strong> </td>
        <td>Name and value of one or more HTTP headers to pass in the POST request.</td>
      </tr>
      <tr>
        <td><strong>Body Template</strong> </td>
        <td markdown="span">Template describing the contents of the alert notification. Click **Template** and select the template that corresponds your messaging platform: **Slack**, **VictorOps**, or **HipChat**. Or, select **Webhook Default** to see all of the available content options combined in a single template.</td>
      </tr>
      </tbody>
      </table>
* For type **Email**, set these properties:
      <table>
      <tbody>
      <thead>
      <tr><th>Email Property</th><th>Description</th></tr>
      </thead>
      <tr>  
        <td><strong>HTML Format</strong> </td>
        <td>Specifies whether to interpret the message body as HTML or plain text. When checked (the default), messages are interpreted as HTML.   </td>
      </tr>
      <tr>  
        <td><strong>Email Address List</strong> </td>
        <td>One or more valid email addresses, separated by commas. </td>
      </tr>
      <tr>
        <td><strong>Email Subject</strong> </td>
        <td>Subject of all emails from this alert target. </td>
      </tr>
      <tr>
        <td><strong>Body Template</strong> </td>
        <td markdown="span">Template describing the contents of the alert notification. Click **Template** and select the **HTML Email Default** template.</td>
      </tr>
      </tbody>
      </table>
* For type **PagerDuty**, set these properties:
      <table>
      <tbody>
      <thead>
      <tr><th>PagerDuty Property</th><th>Description</th></tr>
      </thead>
      <tr>  
        <td><strong>Pagerduty key</strong> </td>
        <td markdown="span">API integraton key for the PagerDuty application. Follow the setup steps in [PagerDuty Integration](pagerduty.html) to obtain the key.</td>
      </tr> 
      <tr>
        <td><strong>Body Template</strong> </td>
        <td markdown="span">Template describing the contents of the alert notification. Click **Template** and select the **PagerDuty Default** template.</td>
      </tr>
      </tbody>
      </table>

1. Optionally customize the **Body Template** using the variables and functions described in [Customizing Alert Target Templates](alert_target_customizing.html).
1. Click **Save** to add the alert target and make it visible on the Alert Targets page.
1. [Test](#testing-an-alert-target) your new alert target, and then [add it to an alert](#adding-a-custom-alert-target-to-a-wavefront-alert).


## Testing a Custom Alert Target

Test your alert target to ensure that it works properly. 

1. Select **Browse > Alert Targets** and find the target on the Alert Targets page.
1. Click the three dots to the left of the alert target and select **Test**.

  ![alert target test](images/alert_target_test.png)

## Adding a Custom Alert Target to a Wavefront Alert

To add a custom alert target to a new or existing alert:

1. Display the [Create Alert](alerts.html#creating-an-alert) page or the [Edit Alert](alerts.html#editing-an-alert) page.
1. Scroll down to the **Target List** section.
1. In the **Alert Target** field, start typing. A dropdown list appears that contains all available Wavefront alert targets that can be integrated to your alert.
1. Select the alert target that you want to add, and click **Save**.



## Editing a Custom Alert Target

You can change a custom alert target at any time.

To edit a alert, click the alert target name in the Alert Targets browser or click the three dots to the left of the alert target and select **Edit**.

## Deleting  Custom Alert Targets

You can delete one or more custom alert targets by checking the checkboxes next to the alert targets and clicking the Trash icon <i class="fa fa-trash"/> at the top of the Alert Targets page. The trash icon is grayed out if you don't have permission to delete any of the selected alert targets.

To delete one alert target, use the trash icon or click the three dots to the left of the alert target and select **Delete**.

## Finding an Alert Target ID

Each custom alert target has a unique ID that the system generates when you first create the alert target. To find the ID:

1. Click **Browse > Alert Targets**.
1. In the Name column, note the ID of the alert target under the description.

   ![webhook ID](images/webhook_id.png)


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
