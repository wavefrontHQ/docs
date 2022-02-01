---
title: Dynatrace Integration
tags: [integrations list]
permalink: dynatrace.html
summary: Learn about the Wavefront Dynatrace Integration.
---
## Dynatrace Integration

Dynatrace is an AI-powered, full-stack, automated performance management solution. This integration collects the metrics from a Dynatrace SaaS environment and sends them to Wavefront.
## Dynatrace Integration



[[dynatraceSetup]]





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

