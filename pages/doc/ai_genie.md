---
title: Forecasting and Anomaly Detection with AI Genie
keywords: machine learning, ai
tags: [charts]
sidebar: doc_sidebar
published: true
permalink: ai_genie.html
summary: Learn how to use AI Genie for forecasting and anomaly detection
---

{% include note.html content="AI Genie will be deprecated and replaced by another Wavefront functionality within the course of the next releases." %}


Wavefront users are responsible for finding anomalies in their data. That task becomes harder as the amount of data increases. Wavefront already includes [anomaly detection based on statistical functions](https://docs.wavefront.com/query_language_statistical_functions_anomalies.html) such as standard deviation. AI Genie takes a different approach, offering anomaly detection based on forecasting.

Wavefront chief architect and co-founder talks about AI Genie in the following two videos:
<table style="width: 100%;">
<tbody>
<tr>
<td width="50%"><a href="https://youtu.be/XiSkNETTfCI" target="_blank"><img src="/images/v_anomaly_detection.png" alt="ai genie anomaly detection"/></a></td>
<td width="50%"><a href="https://youtu.be/ypyyg0CElE4" target="_blank"><img src="/images/v_anomaly_forecasting.png"  alt="ai genie forecasting"/></a></td>
</tr>
</tbody>
</table>

**Note:** With release 2019.18, Wavefront introduced a different algorithm to perform forecasting and we now use this algorithm for forecasting in AI Genie. You can also call the corresponding [nnforecast](ts_nnforecast.html) function explicitly.

## AI Genie Use Cases

AI Genie offers an alternate view of your chart data that is focused on anomaly detection and forecasting and that supports two main use cases, anomaly detection and forecasting.

### Anomaly Detection Use Case

Assume that SRE Robin has received an alert that an application is slow.
1. Robin reviews the dashboard that monitors the application but cannot immediately see a problem.
2. Robin switches to AI Genie, sees that an area is highlighted and filters to see only the anomalous behavior.
3. Robin shares the results with the team, and creates an alert for anomalies on this time series to ensure the team is notified in case of similar problems.

![anomaly intro](images/anomaly_simple.png)

### Forecasting Use Case

Assume that Jo, an application developer, works on the backend database technology. In the company environment, each instance of the application is dedicated to a different customer, so the instances can be sized independently depending on customer usage.

1. Jo needs to know several weeks ahead of time when the instance has to be expanded and uses Wavefront to look at a chart that shows usage of a service over the last few weeks.
2. Next, Jo switches to AI Genie and selects **Forecasting** to see how the Wavefront AI algorithms predict usage levels for the next week.
3. Jo can adjust the forecast period to 1 month or 3 month and select a conservative or aggressive confidence factor.
4. When a service looks as if it will no longer meet customer requirements in the future, Jo can initiate a change request to scale the cluster during the next change window. Jo can also save the chart with the metric to a new dashboard -- that dashboard will be useful later for exploration of other metrics associated with the same change window.

![forecasting](images/ai_genie_forecast.png)


## How to Use AI Genie

You can access AI Genie from any chart and display and customize the Anomaly Detection and Forecast pages.

To access AI Genie:
1. Click **Open AI Genie** next to the query.

   ![open genie](images/open_ai_genie.png)
   AI Genie opens in a new browser tab, with Anomaly Detection selected initially.
2. With **Anomaly Detection** selected, you can customize the Display Settings, Historical Sample Size, and Sensitivity. You can focus on individual time series just as you do for other charts.
   For sensitivity, **High** means that there's a 67% chance that the data is anomalous, **Medium** means there's a 95% chance, and **Low** means there's a 99% chance.
   <!--Margarita: I can't find the Save as new alert menu - tested in Nimba, demo.wavefront.com and my trial version, only learn more is available at the bottom of the page. Deleted the step-->
3. Select **Forecasting** to explore forecasting for the current set of time series. You can customize the forecast period and confidence.
   - The selected forecast period determines the time window that the chart displays. We reserve 1/3 of the chart for the forecast, and two thirds of the chart for the history of the metric.
   - If you display confidence bands, they change as you select a different confidence factor.

   If Wavefront cannot find enough historical data to produce a forecast for the requested period, then AI Genie shows no results.
