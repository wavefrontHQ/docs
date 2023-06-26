---
title: Manage Alerts for Logs (Beta)
tags: [logs]
sidebar: doc_sidebar
permalink: logging_alerts.html
summary: Learn how you can create, snooze and delete a log alert.
---

{% include important.html content="Logs (Beta) is enabled only for selected customers. To participate, contact your account representative or [technical support](wavefront_support_feedback.html#support)."%}

You can create alerts for your logs data and get an email notifications when the alert conditions are met.


## Create an Alert

Follow these steps to create a log alert:

1. In a web browser, log in to your product instance as user with the **Logs** permission.
1. On the toolbar, click **Logs (Beta)** > **Log Alerts**.
1. Click **Create Log Alert** in the top-right corner.

### Step 1: Filter the data

Enter a name for the query and filter the logs data you want to create the alert.
* Use a word or phrase in the logs. Select **Text Contains** and enter the text.
* Use Tags: Click **Add**, select the option you want to filter the data, and select the tags.
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

### Step 2: Define the Alert Conditions
Define the alert condition. You can configure the alert to be fired in real time, or you can configure the alert to fire when the alert conditions are met for the selected time range.

* Fire real time alerts:  
    1. Click the drop down for **Trigger Condition** and select **Real Time**.
    1. Select the **Alert Condition**.

* Fire alerts when the alerts condition are met.
    1. Click the drop down for **Trigger Condition** and select a time window. For example, select **5 minutes**.
    1. Click **+ Logs Tag** to select a tag and to group the alerts. **CHECK ??**
    1. Define the alert condition that need to be met for the time window you selected. Select the alert condition :
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
                        The alert is fired when the number of logs for the selected time window are greater than or less than the alert threshold you define.  
                    </td>
                </tr>
                <tr>
                    <td>
                        Unique count
                    </td>
                    <td>
                        The alert is fired when the number of logs that are unique from each other for the selected time window are greater than or less than the alert threshold you define.          
                    </td>
                </tr>
                <tr>
                    <td>
                        Average
                    </td>
                    <td>
                       The alert is fired if the average number of logs for the selected time window is greater than or less than the alert threshold you define.             
                    </td>
                </tr>
                <tr>
                    <td>
                           Maximum
                    </td>
                    <td>
                        The alert is fired when the maximum number of logs for the selected time window is greater than or less than the alert threshold you define.       
                    </td>
                </tr>
                <tr>
                    <td>
                        Minimum
                    </td>
                    <td>
                                    
                    </td>
                </tr>
                <tr>
                    <td>
                        Sum
                    </td>
                    <td>
                                    
                    </td>
                </tr>
                    
            </tbody>
         </table>


