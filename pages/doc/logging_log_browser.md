---
title: Find and Examine Logs in the Log Browser (Beta)
keywords: data, logs
tags: [logs]
sidebar: doc_sidebar
permalink: logging_log_browser.html
summary: Learn how to filter and explore logs in the Log Browser.
---

{% include important.html content="Tanzu Observability Logs (Beta) is enabled only for selected customers. To participate, contact your Tanzu Observability account representative."%}

If you notice anomalies on your metrics charts or see that a service on the application map has large latency value, use the Log Browser to troubleshoot your issues.

## Get Started with the Log Browser

The Log Browser supports in-depth exploration of your logs. You can zoom into a time window from the chart, and you can search or filter your logs so you see exactly what you're interested in.

To use the Log Browser:

1. Configure your application and the log shipper to [send logs to Tanzu Observability](logging_send_logs.html).
1. In your web browser, log in to your Wavefront instance.
1. On the toolbar, click **Logs**.

The Log Browser offers the following information and options.

![An annotated screenshot of the Log Browser.](images/logging_log_browser_annotated_screen.png)

* In the toolbar you can set the time window and time zone.
* In the search bar, you can explicitly add filter expressions. When you select expressions in the filter pane, those items are added to the search bar.
* In the log histogram chart, you can see how many logs were sent in each time bucket and zoom in on smaller time windows.
* In the filter pane, you can specify filters and tags.
<!--TBD: List of items as text to improve accessibility--->


The information in the Log Details table is color-coded. The following screenshot shows several log entries. The color corresponding to the text found in the log is to the left of the date.

![a screenshot of the logs table with the different colors at the beginning of the log message row.](images/logging_logs_table_colors.png)

The following table maps colors to logs:
<!---TBD: Is it useful to give this list? Will any of our users look at it or will they just look at the GUI?--->
<table style="width: 100%;">
  <tr>
    <th width="35%">
      Color
    </th>
    <th width="65%">
      Description
    </th>
  </tr>
  <tr>
    <td>
      <img src="images/logs_yellow_warning.png"/>
    </td>
    <td>
      Logs that have the term warn or warning.
    </td>
  </tr>
  <tr>
    <td>
      <img src="images/logs_color_critical.png"/>
    </td>
    <td>
      Logs that have the term critical.
    </td>
  </tr>
  <tr>
    <td>
      <img src="images/logs_color_debug.png"/>
    </td>
    <td>
      Logs that have the term debug.
    </td>
  </tr>
  <tr>
    <td>
      <img src="images/logs_color_trace.png"/>
    </td>
    <td>
      Logs that have the term trace.
    </td>
  </tr>
  <tr>
    <td>
      <img src="images/logs_error_light_theme_warning.png"/>  Light theme
      &nbsp; <img src="images/logs_error_dark_theme_warning.png"/>  Dark theme
    </td>
    <td>
      Logs that have the term error.
    </td>
  </tr>
  <tr>
    <td>
      <img src="images/logs_no_term_light_theme.png"/>  Light theme &nbsp;
      <img src="images/logs_no_term_dark_theme.png"/>  Dark theme
    </td>
    <td>
      Logs that don't have any of the above terms.
    </td>
  </tr>
</table>




## Enable or Disable Auto-Search

When auto-search is off, you need to click **Search** to get the search results.
Otherwise, the search runs each time you add a source, tag, or text to the search bar. That might slow things down.

Each user can enable or disable auto search, as follows:

<table>
<tr>
  <td>
  <ol>
  <li>In the top right of the toolbar, select the Auto-Search box.</li>
  <li>Pick <strong>On</strong> or <strong>Off</strong> </li>
  </ol>
  </td>
  <td>
    <img src="images/auto_search.png"/>
  </td>
</tr>
</table>





## Search and Filter Logs

It's cumbersome to examine all logs for a time window, but you can customize what the Log Browser shows. Follow these steps to search and filter logs:

1. (Optional) Click the date picker to select a time window you want to see logs for.
1. To get the list of logs you want, you have these options:
  * From the **Source** drop-down menu, select a [source](logging_overview.html#whats-a-tanzu-observability-log). You can filter logs by only one source.
  * In the **All Tags** list, click a tag and select a value from the list. You can filter logs by a combination of tags.
  * In the search bar, enter a word or expression and click **Search** or press Enter if you're using the Keyboard to navigate. You can filter logs by a combination of words and expressions in the log messages.
  <br/>**Example: Combination of search terms**:
    ![Shows the error word on the search bad and the logs that contain the word error in them with error highlighted on the log messages](images/logging_search_key_word.png)

1. When you see the logs on the Log Browser, you can refine the search results.

### Search Example
<ul>
        <li>
          If you type in a word(s) or type in <code>message={word(s)}</code>, you see search for <code>message={word(s)}</code>. <br/>For example, if you type <code>warn</code> or <code>message=warn</code>, you see the search results for <code>message=warn</code>.
        </li>
        <li>
          If you type <code>=error</code> on the search bar, you see search results for <code>message= =error</code>.
        </li>
        <li>
          If you type <code>hello=</code> on the search bar, you see search results for <code>message= hello=</code>.
        </li>
</ul>

### Exclude or Include Logs from Search Results

You streamline what you see in the Log Browser by excluding tags, text, or a source.

* Click the equal (=) or not equal sign (≠) next to a **Source** or tag value.
* Click a filter on the search bar and click the **Filter** or **Exclude** option.
* Double click a word, or select words on the **Message** column, and click **Exclude** or **Include**.

**Exclude Option Example**:

Click the application filter on the search bar, and click **Exclude application: wavefront**.
![screenshot of the pop up that pops up when you edit a filter](images/logging_edit_filter_pop_up.png)


## Enable or Disable Auto-Load During Scroll

When you search and filter logs, you can decide how you want to scroll through the results:

By default, you have to click **Load More Results** to load the next set of results.
  ![a screenshot showing the load more results text](images/logging_load_more_results.png)

Enable scroll auto load to load logs as you scroll through the results, as follows:
  1. Click **Options** above the log results table (top right).
  1. Turn on **Scroll Auto-Load**.
  ![a screenshot of the steps mentioned above](images/logging_scroll_auto_load.png)


## Drill Down from the Log Chart

The histogram chart at the top of the Log Browser shows the number of logs distributed over the selected time window. The chart consists of 60 buckets. With a 15-minute time window, each bar on the chart shows the number of logs for each 15-second time interval.

If you notice a spike--which means that more logs were sent--you can zoom in on the chart to analyze the data. As you zoom in, the table with the log data below the chart shows the data for the new time window.

Let's look at an example:

1. In the screenshot below, the histogram chart has three spikes.
    ![a screenshot of the Log Browser that shows a histogram with 3 spikes.](images/logging_histogram_spikes.png)
1. If you want to zoom in to the time window of the last spike, drag-select the area of interest.
    ![a screenshot of selecting the area on the histogram to to zoom in.](images/logging_histogram_zoomed_in.png)

   The chart shows the data for the zoomed-in time window and the logs in the log table below are updated to correspond to the new time window.
    ![a screenshot of the zoomed in histogram](images/logging_histogram_zoomed_in_data.png)
1. Click the minus (-) icon or one of the preset time windows (e.g. 30m) to zoom out.
    ![a screenshot with the zoom out options highlighted with a red box](images/logging_histogram_zoom_out.png)

## Customize the Log Details Table

The log details table has the **Timestamp**, **Source**, and **Message** columns by default. Follow these steps to add columns.

1. Click the add columns icon in the top left of the table.
    ![a screenshot of the table with the add column button highlighted](images/logging_log_table_add_column.png)
1. Select the columns that you want to add. The options you see are the tags you defined during log shipper configuration.

Here's an example that shows how to add the **tag** column to the table.

![a screenshot of the add column options.](images/logging_log_table_select_columns.png)


## Next Steps

* [Get started with logs](logging_overview.html)
* [Send logs to Tanzu Observability](logging_send_logs.html)
* Learn about [proxy configurations and proxy preprocessor rules](logging_proxy_configurations.html)
* [Get answers to FAQs](logging_faq.html)

<!---
[Try out the demo app tutorial on GitHub](https://github.com/wavefrontHQ/demo-app) to send logs to Tanzu Observability.
--->
