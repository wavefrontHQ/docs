---
title: Manage Alerts for Logs
tags: [logs]
sidebar: doc_sidebar
permalink: logging_log_alerts.html
summary: Learn how you can create, snooze and delete a logs alert.
---

{% include important.html content="Our service retains logs for 30 days during the Logs free trial or retains logs for 7 days when on the freemium subscription! To retain logs for a longer period, contact your account representative or [technical support](wavefront_support_feedback.html#support)."%}

You can create alerts for your logs data and see the firing events of an alert.

<!-- Add this after email notification and remove the line above

You can create alerts for your logs data and get email notifications when the alert conditions are met.
-->

{{site.data.alerts.note}}
  <ul>
      <li>
          You need the <b>Logs</b> permission to view the logs alerts.
      </li>
      <li>
          You need the <b>Alerts</b> and <b>Logs</b> permissions to create and manage logs alerts.
      </li>
  </ul>
  <p>For details, see how to manage <a href="users_roles.html">roles, groups, and permissions</a>.</p>
  {{site.data.alerts.end}}

## Alerts Browser

Use the Alerts Browser to create and manage your logs alerts. To see the logs alerts you created, click the **Logs Alerts** tab.

![An annotated screenshot of the logs alerts on the Alerts Browser.](images/logging_log_alerts_browser.png)

## Create a Logs Alert

Follow these steps to create a logs alert:

{% include note.html content="You can only create 500 log alerts. If you reach the log alert limit and need to create a new log alert, you need to delete an existing log alert so you can create a new log alert." %}

### Go to the Alert Browser
1.	Log in to your product instance as a user with the **Alerts** and **Logs** permissions.
2.	On the toolbar, click **Alerting** > **All Alerts**.
3.	Click **Create Logs Alert**.

### Step 1: Filter the Data

Use the filters to query the logs data:

1. Enter a unique name for the query.
1. Filter the logs data for which you want to create the alert. There are two types of query filters:
    * Use a word or phrase in the log message:
        1. Next to **Text Contains**, click **Search Logs for Text Containing**.
        1. Enter the text and press Enter. 
        1. To add more filters like this, click the **+** icon next to the filter.
    * Use tags: 
        1. Next to **Filters**, click **Add**.
        1. Select **Filter by Operator**.
        1. Click the **Choose Filter** drop-down menu, select the tag key, and select the tag value.
        1. To add more filters like this, click the **+** icon next to the filter.

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
                        If you select more than one value for a filter, the alert fires when any of the specified values in a filter is in a log and when the alert condition is met.
                        <ul>
                            <li>
                                Contains: You get the logs that include the tag values you define.
                            </li>
                            <li>
                                Does not contain: You get the logs that don't include the tag values you define.
                            </li>
                            <li>
                                Starts with: You get the logs that have tag values that start with the tag value you selected.
                            </li>
                            <li>
                                Does not start with: You get the logs that have tag values that don't start with the tag value you selected.
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>
                        <b> Tags </b>
                    </td>
                    <td markdown="span">
                        Select a tag key and the corresponding tag values from the drop-down list.
                        The tags you see here are the log attributes you send. See [Log Attributes](logging_overview.html#log-attributes) for details.
                                
                    </td>
                </tr>
            </tbody>
        </table>

1. If you add more than one **Filter by Operator**, select one of the following options:
    * **All**: The logs alert you create fires only when all the filters in the query are met.
    * **Any**: The logs alert fires if a filter in the query is met.

1. Click **Next**.

Example:

Get the logs that have any of the following data:
* If the access_token_length value is 4600.
* If the access_token_length value does not start with 1278.

![A screenshot of the query that is described in this example.](images/logging_log_alert_filter_the_data.png)

### Step 2: Define the Alert Conditions
You can configure the alert to fire in real time, or you can configure the alert to fire when the alert conditions are met for the selected time window.

* Fire alerts in real time, when a log matches the query:  
    1. Click the drop-down menu for **Trigger Condition** and select **Real Time**.
    1. Select the severity for the **Alert Condition**.
    1. Click **Next**.

* Fire alerts when the alert condition is met for a specified time window.
    1. Click the drop-down menu for **Trigger Condition** and select a time window. For example, select **5 minutes**.
    1. (Optional) You can group the logs data you see on the chart. For **Group By**, click **+ Logs Tag** to select a tag and group the logs.
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
                        The alert fires when the number of logs for the selected time window is greater than the alert threshold you define.  
                    </td>
                </tr>
                <tr>
                    <td>
                        Unique count
                    </td>
                    <td>
                        The alert fires when the number of logs that includes the tag you selected is greater than or less than the alert threshold you define.          
                    </td>
                </tr>
                <tr>
                    <td>
                        Average
                    </td>
                    <td>
                       The alert fires when the average number of logs that includes the tag you selected is greater than or less than the alert threshold you define.             
                    </td>
                </tr>
                <tr>
                    <td>
                           Maximum
                    </td>
                    <td>
                        The alert fires when the maximum number of logs that includes the tag you selected is greater than or less than the alert threshold you define.       
                    </td>
                </tr>
                <tr>
                    <td>
                        Minimum
                    </td>
                    <td>
                         The alert fires when the minimum number of logs that includes the tag you selected is greater than or less than the alert threshold you define.          
                    </td>
                </tr>
                <tr>
                    <td>
                        Sum
                    </td>
                    <td>
                        The alert fires when the sum of the logs that includes the tag you selected is greater than or less than the alert threshold you define.             
                    </td>
                </tr>
                    
            </tbody>
         </table>

    1. Click **Next**.

Example:
The alert fires if the alert conditions you set are true for 5 minutes:
* Critical state if the number of logs is great than 4.
* Info state if the number of logs is greater than 1.

![A screenshot of the alert conditions explained above](images/logging_log_laerts_alert_condtion.png)

### Step 3: Add a Recipient to the Alert

Email and Webhook notifications are coming soon to Logs Alerts!

{% include note.html content="Currently, you won't get an email when your logs alert fires. To see the details of a logs alert or when it fired during the last 30 days, click **Alerting > All Alerts**, click the **Logs Alert** tab, click the logs alert you are interested in, and click **Show Firings**." %}


<!-- Add after this is added back it the UI

1. Click **+ email**, and enter the email addresses of the users who need to receive notifications when the alert fires.
1. Click **Next**.

-->

### Step 4: (Optional) Customize the Alert Firing Message

You can customize the alert firing message and add information to help users understand why the alert fired.

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
                        <b> Recommendations </b>   
                    </td>
                    <td markdown="span">
                         Add information that is useful to the alert recipient. This field supports Markdown. You can click **Preview** to preview the Markdown output.
                    </td>
                </tr>
                <tr>
                    <td>
                        <b> Notification Metadata </b>   
                    </td>
                    <td markdown="span">
                        Add **key**-**value** pairs to send additional information in the logs alert firing message.
                    </td>
                </tr>
            </tbody>
        </table>



<!--

##Include later on, once the feature is back.


                <tr>
                    <td>
                        <b> Message Includes </b>
                    </td>
                    <td>
                        Customize the logs data sent in the message.
                        <ul>
                            <li>
                                To include all the logs data that was filtered using the query in the message, select <b>All logs</b>. 
                            </li>
                            <li>
                                To send specific logs data, select <b>Custom Fields</b>. Select how you want to view the logs data (in the JSON or table format), and select the log attributes you want to send with the message using the drop-down menu.
                            </li>
                        </ul>
                    </td>
                </tr>

--> 

After you customize the message, click **Next**.

### Step 5: Name and Activate the Logs Alert

1. Enter the **Alert name**.
1. (Optional) Add a **Description** to your logs alert. This field supports Markdown. You can click **Preview** to preview the Markdown output.
1. Click **Activate** to create the alert.

{% include note.html content="If the name you gave the query in step 1 or if the alert name you gave in this steps already exists, you see an error. To activate the logs alert, you need to go to Step 1 and enter a new name." %}

Example:
![A screenshot of the section to name and adda  description to the alert.](images/logging_log_laert_name_the_alert.png)

Once the logs alert is successfully created, you are redirected back to the Alerts Browser page. To see the logs alert you created, search for your alert, and see the status and firing details of the alert.

## See Logs Alerts that Fired

Follow these steps to see the firings of a logs alert. You see up to five firing events in the last thirty days.

1. On the Alerts Browser, click the **Logs Alerts** tab.
1. Search for the alert you want to edit.
    You can search for the alert by name, status, severity, or a saved search.
1. Click the alert name.
1. Click **Show Firings** at any time to see when the alert fired and fine-tune the behavior based on that information. 
    ![a screenshot highlighting the show alert firing button](images/logging_log_alerts_show_firings.png)
    
The **Recent Firings** pane shows the last five firing events in the last thirty days. Don't see any data? That is because the logs alert did not fire in the last thirty days.   
Example:
![screenshot of alert firing timeline you see when you click Show Firings.](images/logging_log_alerts_hide_alert_firings.png)

## Edit a Logs Alert

Users with the **Alerts** and **Logs** permissions can update a logs alert at any time. Follow these steps to update the logs alert.

1. On the Alerts Browser, click the **Logs Alerts** tab.
1. Search for the alert you want to edit.
    You can search for the alert by name, status, severity, or a saved search.
1. Click the alert name.
1. Click on the section you want to make changes.
1. Once all the changes are made, click **Save** in the top right.

{% include warning.html content="If you navigate away from the page or close the browser tab without saving, your changes are lost!"%}

## Snooze and Unsnooze a Logs Alert

### Snooze a Logs Alert
If you are running tests and don't want a logs alert to fire, follow these steps to pause the logs alert from firing for a specified time window:

1. On the Alerts Browser, click the **Logs Alerts** tab. 
1. Select the check box next to the logs alert. You can select more than one logs alert.
1. Click **Snooze** and select how long you want to snooze the alert.
![a screenshot that shows the snooze drop down times.](images/logging_log_alert_snooze.png)

### Unsnooze a Logs Alert

Follow these steps once you are done with your testing, and you want a logs alert to fire if the conditions in the logs alert is met.

1. On the Alerts Browser, click the **Logs Alerts** tab.
1. Filter the logs alerts you snoozed using the **Snoozed** **Status**.
1. Select the check box next to the logs alert. You can select more than one logs alert.
1. Click **Unsnooze**. The logs alert changes to the **Checking** state.
![a screenshot that shows the unsnooze button.](images/logging_log_alert_unsnooze.png)

## Delete a Logs Alert

Follow these steps to delete a logs alert you no longer need:

1. On the Alerts Browser, click the **Logs Alerts** tab.
1. Select the check box next to the logs alert. You can select more than one logs alert.
1. Click **Delete**. Once deleted you don't see the logs alert.
![a screenshot that shows the delete button.](images/logging_log_alert_delete.png)

## Logs Alert FAQs

### What are the logs alert limits?

Operations for Applications uses VMware Aria Operations for logs. See the limitations listed on the [Operations for logs documentation (scroll to Limits)](https://developer.vmware.com/apis/vmware-aria-operations-for-logs/latest/) when creating and managing logs alerts.
