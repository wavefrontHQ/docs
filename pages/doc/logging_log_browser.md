---
title: Find and Examine Logs in the Log Browser
keywords: data, logs
tags: [logs]
sidebar: doc_sidebar
permalink: logging_log_browser.html
summary: Learn how to filter and search logs sent to Tanzu Observability by Wavefront.
---
Did you notice anomalies on your metrics charts or noticed that a service on the application map has large latency value? Use the Log Browser to search and filter logs, and troubleshoot your issues.

## Get Started with the Log Browser

To use the Log Browser:

1. Configure your application and the log shipper to [send logs to Tanzu Observability](#logging_send_logs.html).
1. In your web browser, go to your Wavefront instance and log in.
1. From the toolbar, select **Logs**. You are taken to the Log Browser.

![An annotated screenshot of the Log Browser.](images/logging_log_browser_annotated_screen.png)

{%include note.html content="Tanzu Observability retains logs for 7, 15, or 30 days, based on your settings. To keep log data for longer, contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support)."%}

## Enable or Disable Auto-Search

Auto search is a user-level setting, and you can enable or disable auto search.

* When auto-search is disabled, you need to click **Search** to get the search results.
* When auto-search is enabled, the search runs each time you add a source, tag, or keyword to the search bar.

## Search and Filter Logs

Follow these steps to search and filter logs:

1. Click the date picker to select a time window you want to see logs. The default time window is 15 minutes.
1. To get the list of logs you want, you have these options:
  * Click **Source** and select a [source](logging_overview.html#whats-a-log) from the list.
  * Click on a tag and select a value from the list.
  * Type in a keyword on the search bar, and click **Search** or press Enter when [using the Keyboard to navigate](wavefront_keyboard_shortcuts.html#keyboard-shortcuts-and-their-usage). The keyword is highlighted.
    <br/>Example:
    ![Shows the error keyword on the search bad and the logs that contain the word error in them with error highlighted on the log messages](images/logging_search_key_word.png)
1. When you see the logs on the Log Browser, you can filter logs using source, tags, and keywords, to refine the search results further.

## Exclude Logs from Search Results

You streamline what you see in the Log Browser by excluding tags, keywords, or a source. 

* Click the not equal sign (≠) next to a **Source** or tag value.
* Click on a keyword on the search bar, and click **Exclude** > **Apply** > **Search**.
* Double click a keyword on the **Message** column, and click **Exclude**.

Example: 
* Click service, and click ≠ next to telegraph.
* If you had the keyword warn on the search bar, click the word, and click **Exclude** > **Apply**.
* Click **Search** to get the search results.
![shows the example described in text](images/logging_not_include_search.png)
    
## Use The Histogram to Drill Down

At the top of the Log Browser is a histogram that shows the number of logs distributed throughout a time window. The histogram chart is broken into 60 buckets. Therefore, if you have the default 15-minute time window, the bars on the chart show the number of logs for 15-second time intervals.

If you notice a spike in the data, you can zoom in on the chart to analyze the data. When you zoom in, the table with the log data updates so it only has the data for the new time window.

Let's look at an example:

1. In the screenshot below, there are three spikes on the histogram chart.
    ![a screenshot of the Log Browser that shows a histogram with 3 spikes.](images/logging_histogram_spikes.png)
1. You see that the last spike is higher than the other two spikes. To zoom in to that specific time window, place your cursor at the beginning of the time window you want, and click and drag. 
    ![a screenshot of selecting the area on the histogram to to zoom in.](images/logging_histogram_zoomed_in.png)

1. Now, you see the data for the zoomed-in time window. The logs in the log table below are updated to fit the new time window.
    ![a screenshot of the zoomed in histogram](images/logging_histogram_zoomed_in_data.png)
1. Click the button with the (-) icon or the predefined time windows to zoom out of the histogram.
    ![a screenshot with the zoom out options highlighted with a red box](images/logging_histogram_zoom_out.png)

## Customize the Log Data Table

You see the log details in the table below the histogram chart. The data on the table is color-coordinated, so you can spot logs that need attention at a glance.

<table style="width: 100%;">
  <tr>
    <th width="20%">
      Color
    </th>
    <th width="80%">
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

The logs data table has the Timestamp, Source, and Message columns by default. Follow these steps to add other columns with additional data from your logs.

1. Click the add columns icon on the table.
    ![a screenshot of the table with the add column button highlighted](images/logging_log_table_add_column.png)
1. Select the columns that you want to add. The column options you see are the tags you defined when sending the data to Tanzu Observability.
    <br/> Example: Add the **tag** column.
    ![a screenshot of the add column options.](images/logging_log_table_select_columns.png)
    

## Next Steps

* Get an overview on how to [send logs to Tanzu Observability](logging_send_logs.html).
* [Try the tutorial](logging_kubernetes_tutorial.html) to send logs to Tanzu Observability and search for logs on the Logs Browser.
    
