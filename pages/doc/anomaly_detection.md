---
title: Anomaly Detection on Charts
keywords: anomaly detection
tags: [charts]
sidebar: doc_sidebar
permalink: anomaly_detection.html
summary: Learn how you can detect anomalies with Wavefront
---

Wavefront users are responsible for finding anomalies in their data. That task becomes harder as the amount of data increases. Wavefront already includes [anomaly detection based on statistical functions](query_language_statistical_functions_anomalies.html), such as standard deviation. Anomaly detection takes a different approach, offering anomaly detection based on neural network powered [forecasting](ts_nnforecast.html) methodology.

{% include note.html content="We will enable anomaly detection for all customers over the course of the coming releases." %}
  
## Anomaly Detection Use Case

Anomaly Detection offers a way of showing anomalies on the chart.

Assume that SRE Robin has received an alert that an application is slow.

1. Robin reviews the dashboard that monitors the application but cannot immediately see a problem.
2. Robin turns on the anomaly detection functionality, sees that an area is highlighted, and filters to see only the anomalous behavior.
3. Robin shares the results with the team, and creates an alert for anomalies on this time series to ensure the team is notified in case of similar problems.

![anomaly intro](images/anomaly_simple.png)

## How to Use Anomaly Detection

Currently, Anomaly Detection is available for Line Plot charts.

1. Enable Anomaly Detection from two places:

   1. By turning Anomaly Detection on from the top-right menu, under the Wavefront toolbar.

      ![Turn on anomaly detection from the Wavefront toolbar](images/turn-on-anomaly-detection-toolbar.png)
   
   2. By clicking the **Anomaly Detection** tab in the Chart Editor and turning anomaly detection **On**.
  
      ![Anomaly detection tab is selected from in the Chart Editor](images/anomaly-detection-tab.png)


2. On the **Anomaly Detection** tab, with **Anomaly Detection** turned on, you can customize the Display Settings, Historical Sample Size, Anomaly Type, and Sensitivity. 

   * **Display Settings** -- Select this option to filter out all the series that don’t have anomalies. 
       This option is useful for visualizing series with anomalies better.
   * **Historical Sample Size** -- Allows you to define the size of the history window where chart forecasting is done.
       The size of a history window defines a granular time bucket to compare the chart behavior for finding anomalies. If you want to look for seasonal anomalies, select the appropriate history window, such as one week or one month. One-day historical sample size window helps you detect hourly anomalies.
   *  **Anomaly Type** -- Allows you to filter out the anomalies that are higher or lower than expected, or both.
   *  **Sensitivity** -- Select high, medium or low sensitivity.
        **High** means that there's a 67% chance that the data is anomalous, **Medium** means there's a 95% chance, and **Low** means there's a 99% chance. 

## Anomaly Highlighting

On the chart, the anomalies are highlighted with a square purple border or a cycle purple border. Square purple borders are used to highlight large anomalies and  cycle purple borders are used to highlight small anomalies. 

![Anomalies highlighted with square purple borders for large anomalies and cycle purple borders for the small anomalies](images/anomaly_hightlighting.png)

In anomaly detection mode, you can highlight an anomaly. On top of the chart, you can see the amount of the anomalies on the current chart. When you click it, a drop-down menu appears. This drop-down menu contains the series with anomalies, where each series contains anomalies sorted by time in that series.

![Anomaly highlighting and drop-down menu available for selecting a certain anomaly or a series.](images/single_anomaly_highlighting.png)

When you select a series, you will filter out all other series and the chart shrinks for better visualization of the anomalies.

If you select a specific anomaly, the anomaly is highlighted red on the chart. 

![Anomaly highlighted in red](images/anomaly_hightlighted_red.png)
