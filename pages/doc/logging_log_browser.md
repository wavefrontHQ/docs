---
title: Log Browser
keywords: data, logs
tags: [logs]
sidebar: doc_sidebar
permalink: logging_log_browser.html
summary: Overview of how to filter and search logs sent to Tanzu Observability by Wavefront.
---
Did you notice anomalies on your metrics charts or noticed that a service on the application map has large latency value? Use the Log Browser to search and filter logs, and troubleshoot your issues.

Once you have configured your application and log shipper to [send logs to Tanzu Observability](#logging_send_logs.html), follow these steps to navigate to the Log Browser:

1. In your web browser, go to your Wavefront instance and log in.
1. From the toolbar, select **Logs**. You are taken to the Log Browser.

![An annotated screenshot of the log browser.](images/logging_log_browser_annotated_screen.png)

{%include note.html content="Tanzu Observability retains the logs you send for 14 days. If you want to keep the data for a longer time, contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help."%}

## Search and Filter Logs

Follow the steps given below to search and filter logs:

1. Select the time window you want to see logs, using the date picker. The default time window is set to 15 minutes.
1. To get the list of logs you want:
  * Click **Source** and select a source from the list.
  * Click on a tag and select a value from the list.
  * Type in a key word on the search bar, and click **Search** or press Enter when [using the Keyboard to navigate](wavefront_keyboard_shortcuts.html#keyboard-shortcuts-and-their-usage). The logs have the key word highlighted.
    <br/>Example:
    ![Shoes the error key word on the search bad and the logs that contain the word error in them with error highlighted on the log messages](images/logging_search_key_word.png)
1. Once you see the logs on the log browser, you can filter logs using **Source**, tags, and key words on the search bar.

## Exclude Logs from Search Results

You can search or filter logs that do not include a **Source**, tag, or key word:

* Click the not equal sign (≠) next to a **Source** or tag value.
* Click on a key word on the search bar, click **Exclude** > **Apply** > **Search**.

Example: Search for logs that do not have the service telegraf and the key word warn.
![shows the example described in text](images/logging_not_include_search.png)
    
## Using The Histogram

The histogram shows how the logs are distributed throughout a time window.The histogram chart is broken in to 60 buckets. Therefore, if you select the default 15 minute time window, the bars on the chart show number of logs for 15 second time intervals. (approximately).

If you notice a spike in the data, you can zoom in on the chart to analyze the data further. When you zoom in, the table with the logs data updates so it only has the data for the new time window.

Let's look at an example:

1. In the screenshot below there are 3 spike on the histogram chart.
    ![a screenshot of the log browser that shows a histogram with 3 spikes.](images/logging_histogram_spikes.png)
1. The last spike looks higher than the rest. To zoom in to that specific time window, place your cursor at the beginning of the time window you want, and click and drag. 
    ![a screenshot of selecting the area on the histogram to to zoom in.](images/logging_histogram_zoomed_in.png)

1. Now, you see the data for the new zoomed in time window. The logs in the log table below are updated to fit the new time window.
    ![a screenshot of the zoomed in histogram](images/logging_histogram_zoomed_in_data.png)
1. Click the button with the (-) icon or the predefined time windows to zoom out of the histogram.
    ![a screenshot with the zoom out options highlighted with a red box](images/logging_histogram_zoom_out.png)

## Log Data Table Settings

The log details are shown in the table below the histogram chart. The data on the logs data table is color cordinated so you can spot logs that need attention at a glance.

<table>
  <tr>
    <th>
      Color
    </th>
    <th>
      Description
    </th>
  </tr>
  <tr>
    <td>
      Yellow
    </td>
    <td>
      Logs that have the term warn or warning.
    </td>
  </tr>
  <tr>
    <td>
      Red
    </td>
    <td>
      Logs that have the term error.
    </td>
  </tr>
  <tr>
    <td>
      Purple
    </td>
    <td>
      Logs that have the term fatal error.
    </td>
  </tr>
  <tr>
    <td>
      Blue
    </td>
    <td>
      Logs that have the term debug.
    </td>
  </tr>
  
  <tr>
    <td>
      Grey
    </td>
    <td>
      Logs that don't have any of the above terms.
    </td>
  </tr>
</table>

Example:
![a screenshot of the logs table with the different colors at the beginning of the log message row.](images/logging_logs_table_colors.png)

The logs data table has the Timestamp, Source, and Message columns. 


Follow the steps given below to add in more columns to help you get additional data on your logs.

1. Click the add columns icon on the table.
    ![a screenshot of the table with the add column button highlighted](images/logging_log_table_add_column.png)
1. Select the columns you want to add, and you see it appear on the table. The column options you see are the tags you defined when sending the data to Tanzu Observability.
    <br/> Example: Add the tag column.
    ![a screenshot of the add column options.](images/logging_log_table_select_columns.png)
