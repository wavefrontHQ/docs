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

The Logs Browser supports in-depth exploration of your logs. You can zoom into a time window, and you can filter and search your logs, so you see exactly what you're interested in.

To use the Logs Browser:

1. Configure your application and the log shipper to [send logs to Tanzu Observability](logging_send_logs.html).
1. In your web browser, log in to your Wavefront instance.
1. On the toolbar, click **Logs**.

On the Logs Browser, you can filter and examine logs for a selected period.

![An annotated screenshot of the Logs Browser.](images/logs_browser.png)

* On the toolbar, you can set the time window and time zone for which you want to filter the logs.
* From the predefined **Source** and **All Tags** filters, you can select tag key-value pairs, which you want to include or exclude from the logs search result. The include and exclude filters that you select are added to the search bar.
* In the search bar, you can manually enter tag key-value pairs as include and exclude filters. You can also add filters for including and excluding keywords from the logs messages.
* On the logs histogram chart, you can see how many logs matching the search filters were sent in each time bucket. You can zoom in on smaller time windows. You can group the logs by the values of a selected tag.
* The logs tables lists the logs matching the search filters for the selected time window. You can click a log to see the log message and tags. Each log is marked with one of the following colors.
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
      Logs that have the term <code>warn</code> or <code>warning</code>.
    </td>
  </tr>
  <tr>
    <td>
      <img src="images/logs_color_critical.png"/>
    </td>
    <td>
      Logs that have the term <code>critical</code>.
    </td>
  </tr>
  <tr>
    <td>
      <img src="images/logs_color_debug.png"/>
    </td>
    <td>
      Logs that have the term <code>debug</code>.
    </td>
  </tr>
  <tr>
    <td>
      <img src="images/logs_color_trace.png"/>
    </td>
    <td>
      Logs that have the term <code>trace</code>.
    </td>
  </tr>
  <tr>
    <td>
      <img src="images/logs_error_light_theme_warning.png"/>  Light theme
      &nbsp; <img src="images/logs_error_dark_theme_warning.png"/>  Dark theme
    </td>
    <td>
      Logs that have the term <code>error</code>.
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

When auto-search is off, after you change the time window or the search filters, you need to click **Search** to get the search results. Otherwise, the search runs each time you change the time window or the filters in the search bar, but that might slow things down.

Each user can enable or disable auto-search, as follows:

<table>
<tr>
  <td>
  <ol>
  <li>In the top right of the toolbar, click the **Auto-Search** drop-down menu.</li>
  <li>Select <strong>On</strong> or <strong>Off</strong> </li>
  </ol>
  </td>
  <td>
    <img src="images/auto_search.png"/>
  </td>
</tr>
</table>

## Search and Filter Logs

It's cumbersome to examine all of your logs, but you can customize what the Logs Browser shows. Follow these steps to search and filter logs:

### Set the Time Window
You can narrow down the logs list to show only logs from a particular time window.

![An annotated screenshot of the Logs Browser.](images/logs_time.png)

* From the **Timezone** drop-down, you can select your preferred time zone. The Timestamp values of the logs convert to the time zone that you selected.
* From the **Time window picker**, you can select either a preset time or custom start and end dates and times.
* You can hover over the area above the right side of the logs histogram and adjust the time window. For example, click the minus(**-**) icon to zoom out, or click **30m** to show the logs from the last 30 minutes.

### Add Search Filters
You can narrow down the logs list to show only logs that match certain filter expressions. The supported filter expressions are:
<table style="width: 100%;">
  <tr>
    <th width="35%">
      Filter Expression
    </th>
    <th width="65%">
      Description
    </th>
  </tr>
  <tr>
    <td>
      <code>&lt;tag_key&gt; = &lt;tag_value&gt;</code>
    </td>
    <td>
      Include tag filter, which retrieves only the logs that have the specified tag key-value pair.
      <ul>
      <li>If you add multiple include tag filters with different tag keys, the logical operator between them is <code>AND</code>.</li>
      <li>If you add multiple include tag filters with the same tag key but different tag values, the logical operator between them is <code>OR</code>.</li>
      </ul>
      <p>For example, if you add the following combination of filters:<br/>
      <code>source = app1 source = app2 region = us1 region = us2 service = auth</code><br/>
      We parse them as follows:<br/>
      <code>(source = app1 OR source = app2) AND (region = us1 OR region = us2) AND service = auth</code>
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <code>&lt;tag_key&gt; != &lt;tag_value&gt;</code>
    </td>
    <td>
      <p>Exclude tag filter, which retrieves only the logs that don't have the specified tag key-value pair.</p>
      <p>If you add multiple exclude tag filters, the logical operator between them is <code>AND</code>.</p>      
    </td>
  </tr>
  <tr>
    <td>
      <code>message = &lt;keyword&gt;</code>
    </td>
    <td>
      <p>Include message filter, which retrieves only the logs that have the specified <code>keyword</code>.</p>
      <p>If you add multiple include message filters, the logical operator between them is <code>AND</code>.</p> 
    </td>
  </tr>
  <tr>
    <td>
      <code>message != &lt;keyword&gt;</code>
    </td>
    <td>
    <p>Exclude message filter, which retrieves only the logs that don't have the specified <code>keyword</code>.</p>
    <p>If you add multiple exclude message filters, the logical operator between them is <code>AND</code>.</p> 
    </td>
  </tr>
</table>

You can add search filters by using the predefined filters in the left panel and by directly entering filters in the search bar.

<table style="width: 100%;">
  <tr>
    <td>
      <p>To add a <code>source</code> tag filter:
      <ol>
      <li>Click the <strong>Source</strong> filter in the left panel.</li>
      <li>Locate the target value and select the equal (=) or not-equal (!=) sign for that value.
      {% include note.html content="The predefined <strong>Source</strong> filter lists only the <code>source</code> values that exist in the system for the selected time window. The list also shows the number of logs with each <code>source</code> value."%}</li>
      <li>If you want to add more <code>source</code> tag filters, you must enter the filter expressions directly in the search bar, for example, enter <code>source=myapp</code> and press Enter.</li>
      </ol></p>
    </td>
    <td>
      <img src="images/logs_source_filter.png"/>
    </td>
  </tr>
  <tr>
    <td>
      <p>To add any other tag filter:
      <ol>
      <li>Click the <strong>All Tags</strong> filter in the left panel.</li>
      <li>Expand the target tag key.</li>
      {% include note.html content="The predefined <strong>All Tags</strong> filter lists all tag keys that exist in the system for the logs retention period."%}
      <li>Locate the target tag value and select the equal (=) or not-equal (!=) sign for that value.
      {% include note.html content="The predefined <strong>All Tags</strong> filter lists only the tag values that exist in the system for the selected time window. The list also shows the number of logs for each tag value."%}</li>
      </ol></p>
    </td>
    <td>
      <img src="images/logs_source_filter.png"/>
    </td>
  </tr>
  <tr>
    <td>
      <p>To add a message filter: 
      <ol>
      <li>In the search bar, enter the target keyword or expression.</li>
      <li>Press Enter.</li>
      </ol></p>
      <p>This results in an include message filter but you can edit it to an exclude type. Alternatively, you can enter the entire exclude message filter expression in the search bar.</p>
      <p>For example, if you enter <code>=hello</code> and press Enter, the resulting search filter <code>message = =hello</code>.</p>
    </td>
    <td>
      <img src="images/logs_source_filter.png"/>
    </td>
  </tr>
  <tr>
    <td>
      To edit or delete a search filter:
      <ol>
      <li>In the search bar, click the target filter expression.</li>
      <li>Make your changes or delete the filter.
      <ul>
      <li>To change the tag value, from the drop-down menu, select the new value.</li>
      <li>To change it to an include filter, click the <strong>Filter By</strong> option.</li>
      <li>To change it to an exclude filter, select the <strong>Exclude</strong> option.</li>
      </ul></li>
      </ol>
    </td>
    <td>
      <img src="images/logs_source_filter.png"/>
    </td>
  </tr>
  </table>












a 
[source](logging_overview.html#whats-a-tanzu-observability-log) value.

  
  

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

Enable scroll auto-load to load logs as you scroll through the results, as follows:
  1. Click **Options** above the log results table (top right).
  1. Turn on **Scroll Auto-Load**.
  ![a screenshot of the steps mentioned above](images/logging_scroll_auto_load.png)


## Drill Down from the Logs Histogram Chart

The histogram chart at the top of the Logs Browser shows the number of logs distributed over the selected time window. The chart consists of 60 buckets. With a 15-minute time window, each bar on the chart shows the number of logs for each 15-second time interval.

If you notice a spike--which means that more logs were sent--you can zoom in on the chart to analyze the data. As you zoom in, the table with the logs data below the chart shows the data for the new time window.

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
