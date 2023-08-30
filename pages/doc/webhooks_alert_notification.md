---
title: Create and Manage Custom Alert Targets
keywords: alert targets
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: webhooks_alert_notification.html
summary: Create custom alert targets to receive alert notifications on different messaging platforms.
---

You can create custom alert targets to configure alert notifications for a variety of messaging platforms (email, pager services) and communication channels. You can route notifications for the same alert to different targets based on a point tag.
​
​
{% include note.html content="While every user can view alert targets, you must have the [**Alerts** permission](permissions_overview.html) to create and manage alert targets. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible." %}
​
​
## Learn About Alert Targets
​
This page explains how to create and manage a custom alert target.
​
* You can further [customize the contents](alert_target_customizing.html) of the alert notifications using Mustache syntax.
​
* Our blog post [Engineering Tips Series: How Wavefront's DevOps Team Uses Alert Targets to Provide Exceptional Quality of Services to Customers](https://tanzu.vmware.com/content/vmware-aria-operations-for-applications-blog/engineering-tips-series-how-wavefront-s-devops-team-uses-alert-targets-to-provide-exceptional-quality-of-services-to-customers) explains how alert targets help us to keep things running smoothly.
​
* For the following integrations, you can follow the steps in the integration. Log in to your service instance or look at the following pages:
  - [PagerDuty Integration](pagerduty.html)
  - [VictorOps Integration](victorops.html)
  - [Slack Integration](slack.html)

​
## Why Alert Targets?
​
Alert targets specify when and how to send notifications.
​
During alert creation, you can specify an email address or a PagerDuty key in the target list. You implicitly use built-in alert targets. These simple alert targets:
​
* Cause notifications to be sent whenever the alert is firing, updated, resolved, snoozed, or in a maintenance window.
* Provide internal templates for the notification contents. These internal templates are maintained by us, and may change from release to release.
​
For more flexibility, you can create custom alert targets that specify.
* Where to send notifications
* What kind of information
* Notification format
* Which alert events should trigger notifications.
​
For example, you could use a custom alert target to:
​
* Expand (or limit) the set of triggering events for notifications.
* Configure different contents for notifications triggered by different events.
* Associate a short name with a long list of email addresses or a lengthy PagerDuty key.
​

## View Custom Alert Targets
​
**To view alert targets**: 

* Select **Alerting > Alert Targets** from the toolbar.

![An annotated screenshot of the Alert Targets browser page with what an you do on this page. The information is in a bullet list below.](images/alert-targets-annotated.png)

On the **Alert Targets** browser page, you can:

* Search for and apply filters to the alert targets so that you can narrow down the results.
* Share, save, and clear search results.
* Browse through a list of saved searches.
* Hide or show the filters and the saved searches list displayed on the left by clicking the **Filters** button.
* Sort the alert targets by last updated date or by target name in descending or ascending order.
* Show the details for all alert targets by turning on the **Expand All** toggle. By default, this setting is turned off.
* Show the details for a specific alert target by clicking the arrow next to the check box of the target.
* Edit, test, or delete a single alert target by clicking the ellipsis icon and selecting the respective option from the menu.
* Select the check boxes of multiple alert targets and delete them by clicking the **Delete** button.


<a id="creating-an-alert-target"></a>
<a id="creating-a-webhook"></a>


## Create a Custom Alert Target

The process for creating an alert target is similar for the different types of targets. Setting the **Type** changes which fields are displayed.

**To create an alert target**:

1.  Select **Alerting > Alert Targets** from the toolbar.
1.  Click the **Create Alert Target** button.
1.  Fill in the properties that are common to all alert targets.
    <table>
    <tbody>
    <thead>
    <tr><th width="20%">Property</th><th width="80%">Description</th></tr>
    </thead>
    <tr>
    <td><strong>Name</strong></td>
    <td>Name of the alert target. Pick a name that is simple and that makes it easy to identify the alert target's purpose.</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td>Description of the alert target. </td>
    </tr>
    <tr>
    <td><strong>Triggers</strong></td>
    <td>One or more <a href="alerts_states_lifecycle.html">alert state changes</a> that trigger the alert target. The options are:
    <ul>
    <li><strong>Alert Firing</strong> - Trigger when the alert transitions from checking to firing.</li>
    <li><strong>Alert Snoozed</strong> - Trigger when the alert is snoozed.</li>
    <li><strong>Alert Status Updated</strong> - Trigger when at least one time series changes category while the alert continues firing. For example, an individual time series could start to fail (satisfy the alert condition during the <strong>Trigger Window</strong> time window) or could recover (stop satisfying the alert condition during the <strong>Resolve Window</strong> time window).</li>
    <li><strong>Alert in Maintenance</strong> - Trigger when a firing alert is affected by a maintenance window.</li>
    <li><strong>Alert Resolved</strong> - Trigger when the alert resolves.</li>
    <li><strong>Alert Has No Data</strong> - Trigger when the time series associated with the alert have all stopped reporting data.</li>    
    <li><strong>Alert No Data Resolved</strong> - Trigger when at least one time series associated with the alert has started reporting data, while all other time series are still reporting no data.</li>
    <li><strong>Alert No Data Maintenance</strong> - Trigger when none of the alert's time series are reporting data, and the alert is affected by a maintenance window.</li>
    </ul>
    </td></tr>
    </tbody>
    </table>

1.  From the **Type** drop-down menu, select the alert target type:
    <table>
    <tbody>
    <thead>
    <tr><th width="20%">Property</th><th width="80%">Description</th></tr>
    </thead>
    <tr>
    <td><strong>Webhook</strong></td>
    <td>Alert target for sending notifications to messaging platforms such as Slack or VictorOps. This alert target defines the HTTP callback (POST request and URL) that is triggered when an alert changes state. </td>
    </tr>
    <tr>
    <td><strong>Email</strong></td>
    <td>Alert target for sending notifications to email systems. This alert target specifies the attributes of the email messages to be sent when an alert changes state.</td>
    </tr>
    <tr>
    <td><strong>PagerDuty</strong></td>
    <td>Alert target for sending notifications to PagerDuty. This alert target specifies the PagerDuty key and a POST body to use when an alert changes state.</td>
    </tr>
    </tbody>
    </table>

1.  Fill in the type-specific properties.
* For type **Webhook**, set these properties:
      <table>
      <tbody>
      <thead>
      <tr><th width="20%">Webhook Property</th><th width="80%">Description</th></tr>
      </thead>
      <tr>
      <td><strong>URL</strong> </td>
      <td markdown="span">REST endpoint of the messaging platform to receive the alert notification. You can follow the setup steps in [Slack Integration](slack.html) or [VictorOps Integration](victorops.html) to obtain a notification URL. The notification URL must be publicly accessible. </td>
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
        <td markdown="span">Template describing the contents of the alert notification. Click **Template** and select the template that corresponds your messaging platform: **Slack** or **VictorOps**. Or, select **Generic Webhook** to see all of the available content options combined in a single template.</td>
      </tr>
      </tbody>
      </table>
* For type **Email**, set these properties:
      <table>
      <tbody>
      <thead>
      <tr><th width="20%">Email Property</th><th width="80%">Description</th></tr>
      </thead>
      <tr>
        <td><strong>HTML Format</strong> </td>
        <td>Specifies whether the email platform should interpret the message body as HTML or plain text. When checked (the default), messages are interpreted as HTML. It is your responsibility to coordinate this setting with the chosen <strong>Body Template</strong> option.  </td>
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
        <td markdown="span">Template describing the contents of the alert notification. Click **Template** and select the template that corresponds to your email formatting preference: **HTML Email** or **Plain Text**. It is your responsibility to coordinate this option with the **HTML Format** setting.</td>
      </tr>
      </tbody>
      </table>
* For type **PagerDuty**, set these properties:
      <table>
      <tbody>
      <thead>
      <tr><th width="20%">PagerDuty Property</th><th width="80%">Description</th></tr>
      </thead>
      <tr>
        <td><strong>PagerDuty Key</strong> </td>
        <td markdown="span">API integration key for the PagerDuty application. Follow the setup steps in [PagerDuty Integration](pagerduty.html) to obtain the key.</td>
      </tr>
      <tr>
        <td><strong>Body Template</strong> </td>
        <td markdown="span">Template describing the contents of the alert notification's subject line. Click **Template** and select the **PagerDuty Subject** template.</td>
      </tr>
      </tbody>
      </table>
<a name="alert_route"></a>
1. If you want to send notifications to different targets for different point tags, you can specify them under **Recipients**.
  * The **Default Recipients** field specifies recipients that get all alerts.
  * The **Routing** field allows you to specify the following key/value pairs:

        |**key** |**value** |
        |source|&lt;source name&gt; |
        |metric|&lt;metric name&gt;|
        |&lt;point tag name&gt;|&lt;point tag value&gt;|

    {% include note.html content="You must specify either default recipients or recipients determined by routing." %}

    The screenshot below shows this for alert targets of type email.

    ![alert route example](images/alert_route_example.png)

1. Optionally, customize the **Body Template** using the variables and functions described in [Customizing Alert Notifications](alert_target_customizing.html).
1. Click **Save** to add the alert target and make it visible on the Alert Targets page.
1. Test your new alert target, and then [add it to an alert](#add-a-custom-alert-target-to-an-alert).


## Test a Custom Alert Target

Test your alert target to make sure that it works properly.

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<strong>To test an alert target</strong>:
<ol><li>Select <strong>Alerting > Alert Targets</strong> from the toolbar, and find the target on the <strong>Alert Targets</strong> page. </li>
<li>Click the ellipsis icon to the left of the alert target and select <strong>Test</strong>.</li></ol></td>
<td width="40%"><img src="images/alert_target_test.png" alt="ellipsis menu, test selected"></td>
</tr>
</tbody>
</table>


## Add a Custom Alert Target to an Alert

**To add a custom alert target to a new or existing alert**:

1. Go to the [**Create Alert** or **Edit Alert** page](alerts_manage.html) page.
1. Scroll down to the **Recipients** section.
1. Start typing in the **Recipients** field. A drop-down list appears. 
   
   This list contains all available alert targets that can be integrated to your alert.

1. Select the alert target that you want to add, and click **Save**.


## Edit a Custom Alert Target

You can edit a custom alert target at any time.

**To edit an alert target**:

* Click the alert target name in the **Alert Targets** browser. 
  
  You can also click the ellipsis icon on the left of the alert target and select **Edit**.

## Delete Custom Alert Targets

You can delete one or more custom alert targets.

**To delete many alert targets**:
* Select the check boxes next to the alert targets that you want to delete and click the **Delete** button on the top of the **Alert Targets** page. 

  The button is grayed out if you don't have permission to delete any of the selected alert targets.

**To delete a single alert target**:

* Click the ellipsis icon to the left of the alert target and select **Delete**.


## Find an Alert Target ID

Each custom alert target has a unique ID that the system generates when you first create the alert target. To find the ID:

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<strong>To create a dashboard</strong>:
<ol><li>Select <strong>Alerting > Alert Targets</strong> from the toolbar. </li>
<li>In the Name column, note the ID of the alert target under the description.</li></ol></td>
<td width="40%"><img src="/images/webhook_id.png" alt="showing ID under alert name"></td>
</tr>
</tbody>
</table>

## Add Custom Alert Routes

By default, an alert notification is sent to all recipients that are specified in the alert target. It's possible to customize an alert target, for example:
* If source=host1, send an email to userA and userB.
* If source=host2, send an email to userX

You can customize for each target type, and can route the notification based on `metric`, `source`, or a point tag key. See [Step 6](#alert_route) in **Create an Alert Target** above.

### Content of Routed Notifications

Routed notifications differ from non-routed notifications:

* If you don't use routing, all recipients receive a notification that starts when the triggering condition was met.

* If you use alert routing, each recipient receives a notification when the triggering condition for that route was met, but the notification points to the whole alert.

Consider this example:
1. An alert monitors CPU in a dev environment and a prod environment.
2. You specify two alert targets:
   * Target 1 sends a notification to mngr@example.com when the alert is triggered, that is, when CPU on either dev or prod goes above the threshold.
   * Target 2 sends a notification to usr@example.com when `env=dev`, that is, when CPU goes above the threshold on any hosts in the dev environment.
3. When the prod environment goes above the threshold, mngr@example.com receives a notification.
4. When the dev environment goes above the threshold, usr@example.com receives a notification, and the notification window starts when the alert fired, that is, when the CPU went above the threshold for prod.

  It's easy to find the information for dev in the chart associated with the notification because there's a second event that shows when the alert was updated.




## Query Responses of Webhook Alert Targets

Response codes from webhooks alert target calls are exposed as metrics:

```
~alert.webhooks.<webhook_id>.1xx
~alert.webhooks.<webhook_id>.2xx
~alert.webhooks.<webhook_id>.3xx
~alert.webhooks.<webhook_id>.4xx
~alert.webhooks.<webhook_id>.5xx
```
{% include note.html content="Response codes from the simpler alert targets (Email and PagerDuty) are not exposed." %}

The response codes indicate if a webhook call was successful and if the webhook generated a notification. You can query these metrics to  determine if any webhooks are generating a problem response code. The metrics have the point tag `name = <webhook_name>` so you can determine all the response codes for a particular webhook alert target:

```
cs(~alert.webhooks.*.*, name=<webhook_name>)
```

If the response code of the webhook is anything other than 2xx, we create an event with the name `<webhook_id>.<webhook_name>.<response_code>`.

{% include note.html content="With the 2023-31.x release, you can also use `cs(~alert.webhooks.*)` in alerts. " %}
