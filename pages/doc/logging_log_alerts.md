---
title: Manage Alerts for Logs (Beta)
tags: [logs]
sidebar: doc_sidebar
permalink: logging_alerts.html
summary: Learn how you can create, snooze and delete a log alert.
---

{% include important.html content="Logs (Beta) is enabled only for selected customers. To participate, contact your account representative or [technical support](wavefront_support_feedback.html#support)."%}

You can create alert for your logs data and get an email notifications when the alert conditions are met.


## Create an Alert

Follow these steps to create a log alert:

1. In a web browser, log in to your product instance as user with the **Logs** permission.
1. On the toolbar, click **Logs (Beta)** > **Log Alerts**.
1. Click **Create Log Alert** in the top-right corner.
1. Specify the logs data you want to create the alert on.
    1. Enter a name for the query.
    1. Filter the logs data to capture the data you want.
        * Click **Add**, select the option you want to filter the data, and select the tags.
            {% include note.html content="The tags you see here are the log attributes you send. See [Log Attributes](logging_overview.html#log-attributes) for details." %}

         <table style="width: 100%;">
            </thead>
            <tbody>
                <tr>
                    <td>
                       <b> Filters </b>
                        
                    </td>
                    <td markdown="span">
                        You can use the following filters to get the log data you want to create the alert on.
                        * Contains
                        * Does not contain
                        * Starts with
                        * Does not start with
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