---
title: Dynatrace Integration
tags: [integrations list]
permalink: dynatrace.html
summary: Learn about the Wavefront Dynatrace Integration.
---
## Dynatrace Integration

Dynatrace is an AI-powered, full-stack, automated performance management solution. This integration collects the metrics from a Dynatrace SaaS environment and sends them to Wavefront.
## Dynatrace Integration



### Add a Dynatrace Integration

The Dynatrace integration is an AI-powered, full-stack, automated performance management solution. This integration collects the metrics from a Dynatrace SaaS environment and sends them to Tanzu Observability by Wavefront.

**Limitations**

In this initial release of the Dynatrace integration, we have the following limitations:

* Billing metrics are not allowed and fetched with this release.
* If the point tags are with Annotations Key Length Limit greater than 64, the metrics associated with the corresponding point tag will be dropped.


**Obtain the Environment ID and Generate an API Token**

To set up the Dynatrace integration, you must provide the environment ID and a valid API token. 

1. Log in to your Dynatrace account.
2. Click the user icon in the header, and from the context menu, select your user name.
3. Under the **Environment access and settings** section, click the name of the environment that you want to monitor.
4. Copy the **Environment ID** shown in the URL of the form https://<code>your-environment-id</code>.live.dynatrace.com and paste it in a text file. 
5. Click **Access Tokens** in the navigation menu.
6. In the **Access Tokens** page, click the **Generate new token** button.
7. In the **Token name** text box, enter the name for the API token.
8. From the list of scopes, select **Read metrics (metrics.read)** and click the **Generate** button.
9. Copy the generated token by clicking the **Copy** button and paste it in a text file.

**Register the Dynatrace Integration**

After you copy the environment ID and the generated API token, follow these steps:

1. In the **Name** text box, enter a meaningful name.
2. In the **Environment ID** text box, provide the environment ID.
3. In the **API Token** text box, provide the API token.
  
   The API Token is securely stored and never exposed except for read-only access to fetch data from the Dynatrace Operations server.
   
4. (Optional) In the **Metric Allow List** text box, add metrics to an allow list by entering a regular expression. For example:
    * To fetch only Apache Tomcat and Oracle WebLogic metrics, enter: <code>^dynatrace.(.*)(tomcat|weblogic).*$</code>
    * To fetch only Kubernetes metrics, enter: <code>^dynatrace.(.*)(cloud.kubernetes).*$</code>
    * To fetch only host performance metrics, enter: <code>^dynatrace.(.*)(host).*$</code>
    * To fetch only Synthetic metrics, enter: <code>^dynatrace.(.*)(synthetic).*$</code>
5. (Optional) Change the **Service Refresh Rate**. The default is `5` minutes.
6. Click **Register**.






## Metrics

See [Dynatrace documentation](https://www.dynatrace.com/support/help/how-to-use-dynatrace/metrics/built-in-metrics/) for Metrics and Metrics descriptions.  

|Metric Name|Description|
| :--- | :--- |
|dynatrace.builtin.synthetic.browser.actionDuration.load|Action duration - load action [browser monitor]|
|dynatrace.builtin.synthetic.browser.actionDuration.load.geo|Action duration - load action (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.availability.location.total|Availability rate (by location) [browser monitor]|
|dynatrace.builtin.synthetic.browser.availability.location.totalWoMaintenanceWindow|Availability rate - excluding maintenance windows (by location) [browser monitor]|
|dynatrace.builtin.synthetic.browser.cumulativeLayoutShift.load|Cumulative layout shift - load action [browser monitor]|
|dynatrace.builtin.synthetic.browser.cumulativeLayoutShift.load.geo|Cumulative layout shift - load action (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.domInteractive.load|DOM interactive - load action [browser monitor]|
|dynatrace.builtin.synthetic.browser.domInteractive.load.geo|DOM interactive - load action (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.errorCodes|Error details (by error code) [browser monitor]|
|dynatrace.builtin.synthetic.browser.errorCodes.geo|Error details (by geolocation, error code) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.actionDuration.load|Action duration - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.actionDuration.load.geo|Action duration - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.cumulativeLayoutShift.load|Cumulative layout shift - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.cumulativeLayoutShift.load.geo|Cumulative layout shift - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.domInteractive.load|DOM interactive - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.domInteractive.load.geo|DOM interactive - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.errorCodes|Error details (by event, error code) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.errorCodes.geo|Error details (by event, geolocation, error code) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.failure|Failed events count (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.failure.geo|Failed events count (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.firstByte.load|Time to first byte - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.firstByte.load.geo|Time to first byte - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.largestContentfulPaint.load|Largest contentful paint - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.largestContentfulPaint.load.geo|Largest contentful paint - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.loadEventEnd.load|Load event end - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.loadEventEnd.load.geo|Load event end - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.loadEventStart.load|Load event start - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.loadEventStart.load.geo|Load event start - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.networkContribution.load|Network contribution - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.networkContribution.load.geo|Network contribution - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.responseEnd.load|Response end - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.responseEnd.load.geo|Response end - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.serverContribution.load|Server contribution - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.serverContribution.load.geo|Server contribution - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.speedIndex.load|Speed index - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.speedIndex.load.geo|Speed index - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.success|Successful events count (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.success.geo|Successful events count (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.total|Total events count (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.total.geo|Total events count (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.totalDuration|Total duration (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.totalDuration.geo|Total duration (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.visuallyComplete.load|Visually complete - load action (by event) [browser monitor]|
|dynatrace.builtin.synthetic.browser.event.visuallyComplete.load.geo|Visually complete - load action (by event, geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.failure|Failed executions count [browser monitor]|
|dynatrace.builtin.synthetic.browser.failure.geo|Failed executions count (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.firstByte.load|Time to first byte - load action [browser monitor]|
|dynatrace.builtin.synthetic.browser.firstByte.load.geo|Time to first byte - load action (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.largestContentfulPaint.load|Largest contentful paint - load action [browser monitor]|
|dynatrace.builtin.synthetic.browser.largestContentfulPaint.load.geo|Largest contentful paint - load action (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.loadEventEnd.load|Load event end - load action [browser monitor]|
|dynatrace.builtin.synthetic.browser.loadEventEnd.load.geo|Load event end - load action (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.loadEventStart.load|Load event start - load action [browser monitor]	|
|dynatrace.builtin.synthetic.browser.loadEventStart.load.geo|Load event start - load action (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.networkContribution.load|Network contribution - load action [browser monitor]|
|dynatrace.builtin.synthetic.browser.networkContribution.load.geo|Network contribution - load action (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.responseEnd.load|Response end - load action [browser monitor]|
|dynatrace.builtin.synthetic.browser.responseEnd.load.geo|Response end - load action (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.serverContribution.load|Server contribution - load action [browser monitor]|
|dynatrace.builtin.synthetic.browser.serverContribution.load.geo|Server contribution - load action (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.speedIndex.load|Speed index - load action [browser monitor]|
|dynatrace.builtin.synthetic.browser.speedIndex.load.geo|Speed index - load action (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.success|Successful executions count [browser monitor]|
|dynatrace.builtin.synthetic.browser.success.geo|Successful executions count (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.total|Total executions count [browser monitor]|
|dynatrace.builtin.synthetic.browser.total.geo|Total executions count (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.totalDuration|Total duration [browser monitor]|
|dynatrace.builtin.synthetic.browser.totalDuration.geo|Total duration (by geolocation) [browser monitor]|
|dynatrace.builtin.synthetic.browser.visuallyComplete.load|Visually complete - load action [browser monitor]|
|dynatrace.builtin.synthetic.browser.visuallyComplete.load.geo|Visually complete - load action (by geolocation) [browser monitor]|

