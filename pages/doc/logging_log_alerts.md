---
title: Manage Alerts for Logs (Beta)
tags: [logs]
sidebar: doc_sidebar
permalink: logging_alerts.html
summary: Learn how you can create, snooze and delete a log alert.
---

{% include important.html content="Logs (Beta) is enabled only for selected customers. To participate, contact your account representative or [technical support](wavefront_support_feedback.html#support)."%}

You can create alerts for your logs data and get email notifications when the alert conditions are met.

## Log Alerts Browser

Use the Log Alerts Browser to create and manage your log alerts.

![An annotated screenshot of the log alert browser.](images/logging_log_alerts_borwser.png)

## Create a Log Alert

Follow these steps to create a log alert:

### Step 0: Go to the Alert Browser
1.	Log in to your product instance as a user with the **Logs** permission.
2.	On the toolbar, click **Alerting** > **All Alerts**.
3.	Click the **Create Log Alert** button.

### Step 1: Filter the data

Use the filters to query the logs data:

1. Enter a unique name for the query and filter the logs data for which you want to create the alert. There are two types of query filters:
    * Use a word or phrase in the log message:
        1. Next to **Text Contains**, click **Search Logs for Text Containing**.
        1. Enter the text, and press Enter. 
        1. To add more filters like this, click the + icon next to the filter.
    * Use tags: Click **Add**, select the option you want to filter the data on, and select the tags.
        1. Next to **Filters**, click **Add**
        1. Select the **Filter by Operator**.
        1. Click the **Choose Filter** drop-down menu, select the tag key.
        1. To add more filters like this, click the + icon next to the filter.

        <table style="width: 100%;">
            <thead>
                <tr>
                    <th width="20%">
                        Settings
                    </th>
                    <th width="80%">
                        Description
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <b> Filters </b>   
                    </td>
                    <td>
                        You can use the following filter operators to get the log data and create the alert.
                        <ul>
                            <li>
                                Contains
                            </li>
                            <li>
                                Does not contain
                            </li>
                            <li>
                                Starts with
                            </li>
                            <li>
                                Does not start with
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>
                        <b> Tags </b>
                    </td>
                    <td markdown="span">
                        Select a tag key from the drop-down list.
                        The tags you see here are the log attributes you send. See [Log Attributes](logging_overview.html#log-attributes) for details.
                                
                    </td>
                </tr>
            </tbody>
        </table>

1. If you add more than one query filter, select one of the following options:
    * **All**: The logs alert you create fires only when all the filters in the query are met.
    * **Any**: The log alert fires if a filter in the query is met.

1. Click **Next** to add the alert conditions.

### Step 2: Define the Alert Conditions
You can configure the alert to fire in real-time, or you can configure the alert to fire when the alert conditions are met for the selected time window.

* Fire alerts in real time, when one or more logs match the query:  
    1. Click the drop-down menu for **Trigger Condition** and select **Real Time**.
    1. Select the severity for the **Alert Condition**.
    1. Click **Next**.

* Fire alerts when the alert condition is met for a specified time window.
    1. Click the drop-down menu for **Trigger Condition** and select a time window. For example, select **5 minutes**.
    1. (Optional) For **Group By**, click **+ Logs Tag** to select a tag and group the logs that you get after you filter log data using the query.
    1. Define the alert conditions that need to be met for the time window you selected. You must configure a threshold for at least one severity (critical, immediate, warning, or info).
        <table style="width: 100%;">
            <thead>
                <tr>
                    <th width="20%">
                        Alert Condition Type
                    </th>
                    <th width="80%">
                        Description
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Count of Events  
                    </td>
                    <td>
                        The alert fires when the number of logs for the selected time window are greater than or less than the alert threshold you define.  
                    </td>
                </tr>
                <tr>
                    <td>
                        Unique count
                    </td>
                    <td>
                        The alert fires when the number of logs that are unique from each other for the selected time window are greater than or less than the alert threshold you define.          
                    </td>
                </tr>
                <tr>
                    <td>
                        Average
                    </td>
                    <td>
                       The alert fires if the average number of logs for the selected time window is greater than or less than the alert threshold you define.             
                    </td>
                </tr>
                <tr>
                    <td>
                           Maximum
                    </td>
                    <td>
                        The alert fires when the maximum number of logs for the selected time window is greater than or less than the alert threshold you define.       
                    </td>
                </tr>
                <tr>
                    <td>
                        Minimum
                    </td>
                    <td>
                         The alert fires when the minimum number of logs for the selected time window is greater than or less than the alert threshold you define.             
                    </td>
                </tr>
                <tr>
                    <td>
                        Sum
                    </td>
                    <td>
                        The alert fires when the sum of logs for the selected time window is greater than or less than the alert threshold you define.              
                    </td>
                </tr>
                    
            </tbody>
         </table>

1. Click **Next**.

### Step 3: Add a Recipient to the Alert

1. Click **+ email**, and enter the email addresses of the users who need to receive notifications when the alert fires.
1. Click **Next**.

### Step 4: (Optional) Customize the Alert Firing Message

You can customize the alert firing message and add information to help users understand why the alert fired.

* In the **Recommendations** text box, add additional information that is useful to the alert recipient. This field supports Markdown. You can click **Preview** to preview the Markdown output.
* Use the options in the **Message Includes** section to customize the logs data sent in the message. 
Customize the logs data sent in the message using **Message to include**.
    * To include all the logs data that was filtered using the query in the message, select **All logs**. 
    * To send specific logs data, select **Custom Fields**. Select how you want view the logs data (in the JSON or table format), and select the log attributes you want to send with the message using the drop-down menu.
* Add **Notification Metadata** as **key**, **value** pairs to send additional information in the log alert firing message. 

After you customize the message, click **Next** to name and activate the log alert.

### Step 5: Name and Activate the Logs Alert

1. Enter the **Alert name**.
1. Optionally, add a **Description** to your log alert. This field supports Markdown. You can click **Preview** to preview the Markdown output.
1. Click **Activate** to create the alert.

{% include note.html content="If the name you gave the query in step 1 already exists, you see an error. To activate the log alert, you need to go to step 1 and enter a new name." %}

Once the log alert is successfully created, you are redirected back to the Log Alerts Browser page. You can search for your alert and see the status and firing details of the alert.

## Edit a Log Alert
{% include important.html content="**THIS SECTION IS WORK IN PROGRESS!!!**" %}

Users with the **Log Alerts** permission can change an alert at any time. The options are similar to what you see when you create an alert, but you can quickly focus on the things that you want to change.

### Start the Alert Edit

<table style="width: 100%;">
    <tbody>
        <tr>
            <td width="40%">
                <ol>
                    <li>
                        Click <strong>Logs &gt; Log Alerts</strong> from the toolbar to display the Log Alerts Browser. 
                    </li>
                    <li>
                        Click the alert name, or click the ellipsis icon next to the log alert and select <strong>Edit</strong>. <br><br>You can search for the alert by name, status, severity, or a saved search.
                    </li>
                </ol>
            </td>
            <td width="60%" markdown="span">
                ![screenshot ellipsis menu to the left of alert in alerts browser](images/logging_log_alert_edit_ellipsis.png) 
            </td>
        </tr>
        <tr>
            <td width="40%">
                <ol>
                    <li>
                        Make changes (see next section).
                    </li>
                    <li>
                        Click <strong>Show Firings</strong> at any time to see when the alert fired and fine-tune the behavior based on that information. If you don't see any data that's because the alert did not fire in the last 30 days.
                    </li>
                </ol>
            </td>
            <td width="60%" markdown="span">
                ![screenshot of alert firing timeline you see when you click Show Firings.](images/logging_log_alerts_show_firings.png)
            </td>
        </tr>
    </tbody>
</table>

{% include warning.html content="If you navigate away from the page or close the browser tab without saving, your changes are lost!"%}



### Change the Log Alert Properties

{% include important.html content="**THIS SECTION IS WORK IN PROGRESS!!!**" %}

You can change the alert properties when you edit the alert.

<table style="width: 100%;">
<tbody>
<tr>
<td width="55%">
<strong>Alert Name and Tags</strong><br><br>
In this section:
<ul>
<li>Change the alert name.</li>
<li>Click the X on any tag to remove it from the alert.</li>
<li>Click <strong>+Tag</strong> to add a tag to the alert. </li>
</ul>
</td>
<td width="45%" markdown="span">![screenshot ellipsis menu to the left of alert in alerts browser](images/alert_name_tags.png) </td></tr>
<tr>
<td>
<strong>Data</strong><br><br>
In this section:
<ul>
<li>Change the data to alert on.</li>
<li>Edit the existing alert query. For example, add filters to fine-tune the query. See <a href="query_language_getting_started.html">Query Language Quickstart</a> for background and a video or <a href="query_language_reference.html">Query Reference</a> if you're an advanced user.</li>
<li>Fine-tune the alert image. See the <a href="ui_chart_reference.html">Chart Reference</a> for details.</li>
</ul>
</td>
<td markdown="span">![screenshot of data section showing a single query](images/alert_edit_data.png) </td></tr>
<tr>
<td>
<strong>Conditions</strong><br><br>
In this section, you can fine-tune the alert condition and test the condition.
<ul>
<li>Change the alert threshold or thresholds and severity. </li>
<li>Change the <strong>Trigger Window</strong> and <strong>Resolve Window</strong> values. </li>
<li>Change the <strong>Checking Frequency</strong> and <strong>Evaluation Strategy</strong> values. </li>
</ul>
See <a href="alerts_manage.html#step-2-specify-thresholds-and-severities">Specify Thresholds and Severities</a> for details on each option.
</td>
<td markdown="span">![Screenshot of a few Conditions options. Details are under Create Alert.](images/edit_alert_conditions.png) </td></tr>
<tr>
<td>
<strong>Recipients</strong><br><br>
In this section, you can view, change, or add recipients of alert notifications.
<ul>
<li>Specify one or more recipient for each severity.</li>
<li>You can specify an email address, PagerDuty key, or alert target that has already been created. </li>
<li>Notifications for each severity are sent to the recipients of that severity and higher. </li>
<li>As a result, you cannot specify a recipient for multiple severities. Most likely, the recipient already receives the notification because, for example, when an alert notification is sent at the SEVERE level, it also goes to all recipients at lower levels.</li>
</ul>
</td>
<td markdown="span">![Screenshot of Recipients section with 1 email and 1 alert target included](images/edit_alert_recipients.png) </td></tr>
<tr>
<td>
<strong>Content</strong><br><br>
In this section, you can add runbook URLs and specify other information that can help with alert resolution.
<ul>
<li>The Runbook URL can point to internal information.</li>
<li>Start typing to select from dashboards in your environment. You can set environment variables for the dashboard with the <strong>Pass</strong> option. See <a href="#how-do-i-pass-values-to-triage-dashboards">How Do I Pass Values to Triage Dashboards</a>.</li>
<li>Specify other information you want included in the notification in the <strong>Additional Information</strong> section.</li>
</ul>
</td>
<td markdown="span">![Screenshot of Recipients section with 1 email and 1 alert target included](images/edit_alert_content.png) </td></tr>
</tbody>
</table>

### Save Your Changes

Click **Save** in the top right to save your changes.

{% include warning.html content="If you navigate away from the page or close the browser tab without saving, your changes are lost!"%}








## Snooze a Log Alert

## Delete a Log Alert

## Log Alert FAQs

### What are the log alert limits?

Operations for Applications uses VMware Aira Operations for logs. See the limitations listed on the [Operations for logs documentation (scroll to Limits)](https://developer.vmware.com/apis/vmware-aria-operations-for-logs/latest/) when creating and managing log alerts.
