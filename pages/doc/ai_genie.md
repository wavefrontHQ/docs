---
title: Forecasting and Anomaly Detection with AI Genie - Beta
keywords: machine learning, ai
tags: [charts]
sidebar: doc_sidebar
toc_level: 2
permalink: ai_genie.html
summary: Learn how to use AI Genie for forecasting and anomaly detection
---

Wavefront users are responsible for finding anomalies in their data. That task becomes harder as the amount of data increases. Wavefront already includes [anomaly detection based on statistical functions](https://docs.wavefront.com/query_language_statistical_functions_anomalies.html) such as standard deviation. The AI Genie offering takes a different approach, offering anomaly detection based on forecasting.

## AI Genie Use Cases

AI Genie offers an alternate view of your chart data that is focused on anomaly detection and forecasting and supports two main use cases.

### Anomaly Detection Use Case

Assume that SRE Robin has received an alert that an application is slow.
1. Robin reviews the dashboard that monitors the application, but cannot immediately see a problem.
2. Robin switches to AI Genie, sees that an area is highlighted, and filters to see only the anomalous behavior.
3. Robin shares the results with the team, and creates an alert for anomalies on this time series to ensure the team is notified in case of similar problems.

![anomaly intro](images/anomaly_simple.png)

### Forecast Prediction Use Case

Assume that Jo, a application developer, works on the backend database technology. In the company environment, each instance of the application is dedicated to a different customer, so the instances can be sized independently depending on customer usage.

1. Scott needs to know several weeks ahead of time when the instance has to be expanded, and starts by using Wavefront to look at a chart that shows usage of the service over the last few weeks.
2. Next, Scott switches to AI Genie and selects **Forecasting** to see how the Wavefront AI algorithms predict what saturation levels will look like for the next four weeks.
3. Scott adjusts the historic sample size to 5 weeks, and selects a conservative confidence factor. Even with conservative forecasting, it's pretty clear that saturation will be above 90% in 25 days.
4. Scott initiates a change request to scale the cluster during the next change window. He also saves the chart to a new dashboard so he can use it later to explore other metrics associated with the same change window.

## How to Use AI Genie

It's easy to access AI Genie from any chart and to display and customize the Anomaly Detection and Forecast pages.

To access AI Genie:
1. Hover over the query and click **Open AI Genie** below the query.

   ![open genie](images/open_ai_genie.png)
   AI Genie opens in a new browser tab, with Anomaly Detection selected initially.
2. With Anomaly Detection selected, you can customize the Display Settings, Historical Sample Size, and Sensitivity. You can focus on individual time series just as you do for other charts.
3. Click **Save To > Save as New Alert** to save the anomaly query as an alert.
   When the Create Alert page displays, you see that the `anomalous` function is part of the query. You do some alert customization, but several settings are optimized for anomaly detection.

   ![anomaly alert](images/anomaly_save_as_alert.png)
3. Select **Forecasting** to explore forecasting for this set of time series. You can customize the historical sample size and confidence. If you display confidence bands, they change as you select a different confidence factor.
