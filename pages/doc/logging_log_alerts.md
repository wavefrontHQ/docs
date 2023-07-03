---
title: Manage Alerts for Logs (Beta)
tags: [logs]
sidebar: doc_sidebar
permalink: logging_alerts.html
summary: Learn how you can create, snooze and delete a log alert.
---

{% include important.html content="Logs (Beta) is enabled only for selected customers. To participate, contact your account representative or [technical support](wavefront_support_feedback.html#support)."%}

You can create alerts for your logs data and get an email notifications when the alert conditions are met.

## Log Alerts Browser

You can create a log alert and manage the log alerts you created on the Log Alerts Browser.

![An annotated screenshot of the log alert browser.](images/logging_log_alerts_borwser.png)

## Create an Alert

Follow these steps to create a log alert:

1. In a web browser, log in to your product instance as a user with the **Logs** permission.
1. On the toolbar, click **Logs (Beta)** > **Log Alerts**.
1. Click **Create Log Alert** in the top-right corner.

### Step 1: Filter the data

1. Enter a name for the query and filter the logs data you want to create the alert.
    * Use a word or phrase in the logs. Select **Text Contains** and enter the text.
    * Use Tags: Click **Add**, select the option you want to filter the data on, and select the tags.
        {% include note.html content="The tags you see here are the log attributes you send. See [Log Attributes](logging_overview.html#log-attributes) for details." %}

        <table style="width: 100%;">
            <thead>
                <tr>
                    <th width="20%">
                        Property
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
                        You can use the following filters to get the log data and create the alert.
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
                        The tags you see here are the log attributes you send. See [Log Attributes](logging_overview.html#log-attributes) for details.
                                
                    </td>
                </tr>
            </tbody>
        </table>

1. If you add more than one tag, select one of the following options:
    * **All**: The logs alert you create fires only when all the filters in the query are met.
    * **Any**: The log alert fires if a filter in the query is met.

1. Click **Next** to add the alert conditions.

### Step 2: Define the Alert Conditions
Define the alert condition. You can configure the alert to fire in real-time, or you can configure the alert to fire when the alert conditions are met for the selected time range.

* Fire real-time alerts:  
    1. Click the drop-down for **Trigger Condition** and select **Real Time**.
    1. Select the **Alert Condition**.

* Fire alerts when the alert condition is met.
    1. Click the drop-down for **Trigger Condition** and select a time window. For example, select **5 minutes**.
    1. Click **+ Logs Tag** to select a tag and group the logs that you get after you filter log data using the query.
    1. Define the alert condition that needs to be met for the time window you selected. Select the alert condition :
        <table style="width: 100%;">
            <thead>
                <tr>
                    <th width="20%">
                        Alert Condition
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

Click **Next** to add a recipient who can receive email notifications when the alert fires..

### Step 3: Add a Recipient to the Alert

1. Click **+ email**, and enter the email address of the users who need to receive notifications when the alert fires.
1. Click **Next** to customize the message sent to the recipients.

### Step 4: (Optional) Customize the Alert Firing Message

You can customize the alert firing message and add additional information to help users understand why the alert fired.

* Add additional information that is useful to the alert recipient for **Recommendations**. This field supports Markdown. Click **Preview** to preview the Markdown output.
* Customize the logs data sent in the message using **Message to include**.
    * **All logs**: The message includes all the logs data that was filtered using the query.
    * To send specific logs data, select **Custom Fields**, select how you want view the logs data (in the JSON or table format), and select the log attributes you want to send with the message using the dropdown.
* Add **Notification Metadata**. **NEED MORE INFO!!!!**

After you customize the message, click **Next** to name and activate the log alert.

### Step 5: Name and Activate the Logs Alert

1. Enter the **Alert name**.
1. Optionally, add a **Description** to your log alert. This field supports Markdown. Click **Preview** to preview the Markdown output.
1. Click **Activate** to create the alert.

{% include note.html content="If the name you gave the query in step 1 already exists, you see an error. To activate the log alert, you need to go to step 1 and enter a new name." %}

Once the log alert is successfully created, you are redirected back to the Log Alerts Browser page. You can search for your alert and see the status and firing details of the alert.

## Edit a Log Alert


## Snooze a Log Alert

## Delete a Log

## Log Alert FAQs

### What are the log alert limits?

Operations for Applications uses VMware Aira Operations for logs. See the limitations listed on the [Operations for logs documentation (scroll to Limits)](https://developer.vmware.com/apis/vmware-aria-operations-for-logs/latest/) when creating and managing log alerts.
