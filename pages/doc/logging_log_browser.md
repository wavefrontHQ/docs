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

* From the toolbar, you can set the time zone and time window for which you want to filter the logs.
* From the predefined **Source** and **All Tags** filters, you can select tag key-value pairs that you want to include or exclude from the logs search results. The include and exclude filters that you select are added to the search query in the search bar.
* In the search bar, you can directly enter include and exclude filters and add them to the search query.
* The logs histogram chart shows how many logs matching the search query were sent in each time bucket for the selected time window. You can zoom in on smaller time windows. You can also group the number of logs by the values of a particular tag. 
* The logs table lists the logs matching the search query for the selected time window. You can click a log to see the log message. Each log is marked with one of the following colors.
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

When auto-search is off, after you change the time window or the search query, you need to click **Search** to get the search results. Otherwise, the search runs each time you change the time window or the search query, but that might slow things down.

To enable or disable auto-search:

<table>
<tr>
  <td>
  <ol>
  <li>In the top right of the toolbar, click the <strong>Auto Search</strong> drop-down menu.</li>
  <li>Select <strong>On</strong> or <strong>Off</strong> </li>
  </ol>
  </td>
  <td>
    <img src="images/auto_search.png"/>
  </td>
</tr>
</table>

## Set the Time Window
You can narrow down the logs list to show only logs from a particular time window.

![An annotated screenshot of the Logs Browser.](images/logs_time.png)

* From the **Timezone** drop-down menu, you can select your preferred time zone, so the timestamp values of the logs convert to the time zone that you selected.
* From the **Time window picker**, you can select either a preset time or custom start and end dates and times.
* After you get the first search results, you can examine the logs histogram chart and further adjust the time window. See [Drill Down from the Logs Histogram Chart](#drill-down-from-the-logs-histogram-chart).

Each time you change the time window, the predefined **Source** and **All Tags** filters update to show only the tag values that exist within the selected time window.

If auto-search is off, after you change the time window, you must click **Search** to update the logs table and the logs histogram to show only the logs with timestamp values within the selected time window.

## Build Your Search Query
To narrow down the logs list and show only the logs that match certain criteria, you can build and run a search query in the search bar. The search query consists of one or more filter expressions.

{% include note.html content="The logical operator between the different filter types in the search query is `AND`. The logical operators between the filters of the same type is described in the following table."%}

### Filter Types and Logical Operators

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
      <li>If you add multiple include tag filters with different tag keys, the logical operator between them and is <code>AND</code>.</li>
      <li>If you add multiple include tag filters with the same tag key but different tag values, the logical operator between them is <code>OR</code> in parentheses.</li>
      </ul>
      <p>For example, if you add the following combination of filters:<br/>
      <code>source = dc1 source = dc2 region = us-west region = us-east service = auth</code><br/>
      We parse them as follows:<br/>
      <code>(source = dc1 OR source = dc2) AND (region = us-west OR region = us-east) AND service = auth</code>
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

You can add search filters from the predefined filters in the left panel and from the log viewer. You can also directly enter filter expressions in the search bar.

### Add a Tag Filter

<table style="width: 100%;">
  <tr>
    <td>
      <p>To add a tag filter from a predefined filter:
      <ol><li>Select the target tag key.
      <ul><li>To add a <code>source</code> tag filter, click the <strong>Source</strong> filter in the left panel.
      <p>The filter lists the <code>source</code> values that exist in the system for the selected time window and the current search query. For each <code>source</code> value, the list shows the number of logs matching that value.</p></li>
      <li>To add any other tag filter, click the <strong>All Tags</strong> filter in the left panel and expand the target tag key.
      <p>The filter lists all tag keys that exist in the system for the logs retention period and all tag values that exist in the system for the selected time window and the current search query. For each tag value, the list shows the number of logs matching that value.</p></li></ul>
      </li>
      <li>Select the target tag value and the filter type.
      <ul>
      <li>To add an include tag filter, select the equal (=) sign for the target tag value.</li>
      <li>To add an exclude tag filter, select the not-equal (!=) sign for the target tag value.</li>
      </ul></li>
      </ol></p>
    </td>
    <td>
      <img src="images/logs_source_filter.png"/><br/>
      <img src="images/logs_tag_filter.png"/>
    </td>
  </tr>
  <tr>
    <td>
      <p>To add a tag filter from the log viewer:
      <ol>
      <li>In the logs table, click a target log message to open it.</li>
      <li>Select the target tag key-value pair.
      <ul><li>To add a <code>source</code> tag filter, in the <strong>Source</strong> tile, click the horizontal ellipsis.</li>
      <li>To add an <code>application</code> tag filter, in the <strong>Application</strong> tile, click the horizontal ellipsis.</li>
      <li>To add any other filter, click the target tag key-value par at the bottom of the log viewer.</li>
      </ul></li>
      <li>From the drop-down menu, select <strong>Include</strong> or <strong>Exclude</strong> depending on the type of filter that you want to add.</li>
      <li>Close the log viewer.</li>
      </ol></p>
    </td>
    <td>
      <img src="images/logs_message_source.png"/><br/>
      <img src="images/logs_message_tags.png"/>
    </td>
  </tr>
  </table>
  
  {% include note.html content="You can add only one <code>source</code> tag filter from the predefined filter or from the log viewer. To add a subsequent <code>source</code> tag filter, you must enter the entire filter expression in the search bar. For example, in the search bar, enter <code>source=dc2</code> and press Enter."%}

### Add a Message Filter

<table style="width: 100%;">
<tr>
  <td>
    <p>To add a message filter from the log viewer: 
    <ol>
    <li>In the logs table, click a target log message to open it.</li>
    <li>Select the keyword for which you want to add a search filter.</li>
    <li>Select <strong>Include</strong> or <strong>Exclude</strong> depending on the type of filter that you want to add.</li>
    <li>Close the log viewer.</li>
    </ol></p>
  </td>
  <td>
    <img src="images/logs_message_add_filter.png"/>
  </td>
</tr>
  <tr>
    <td>
      <p>To add a message filter directly in the search bar: 
      <ol>
      <li>In the search bar, enter the target keyword or expression and press Enter.
      <p>You added an include message filter. For example, if you enter <code>hello</code> and press Enter, the resulting search filter is <code>message = hello</code>.</p></li>
      <li>If you want to change the filter to an exclude type, click the filter and select <strong>Exclude Expression</strong>.</li>
      </ol></p>
      <p>If you want to directly add an exclude message filter, you must enter the entire filter expression, for example, enter <code>message!=hi</code> and press Enter.</p>
    </td>
    <td>
      <img src="images/logs_message_filter.png"/>
    </td>
  </tr>
  <tr>
    <td>
      <p>The keywords that you searched are highlighted in the log messages.</p>
    </td>
    <td>
      <img src="images/logs_message_result.png"/>
    </td>
  </tr>
  </table>

### Edit or Delete a Search Filter

<table style="width: 100%;">
  <tr>
    <td>
      To edit or delete a search filter:
      <ol>
      <li>In the search bar, click the target filter expression.</li>
      <li>Edit or delete the filter expression.
      <ul>
      <li>To change the filter value, select a new tag value or edit the keyword.</li>
      <li>To change the filter to an include type, click the <strong>Filter Expression</strong> option.</li>
      <li>To change the filter to an exclude type, click the <strong>Exclude Expression</strong> option.</li>
      <li>To delete the filter, click <strong>Remove from query</strong>.</li>
      </ul></li>
      </ol>
    </td>
    <td>
      <img src="images/logs_filter_edit.png"/>
    </td>
  </tr>
  </table>

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

If you notice a spike, which means that more logs were sent, you can zoom in on the chart to examine the data. As you zoom in, the logs table below the chart shows the data for the new time window.

Let's look at an example:

1. In the screenshot below, the histogram chart has three spikes. If you want to zoom in to the time window of the last spike, drag-select the area of interest and, if auto-search is off, click **Search**.
    ![a screenshot of selecting the area on the histogram to to zoom in.](images/logging_histogram_zoomed_in.png)

   The logs histogram shows the data for the zoomed-in time window and the logs table updates to correspond to the new time window.
1. Hover over the area above the right side of the histogram, click the plus (+) icon to zoom in further as needed and, if auto-search is off, click **Search**.
    ![a screenshot with the zoom in options highlighted with a red box](images/logging_histogram_zoom_in_in.png)
    
1. To group the logs in the histogram by the values of a particular tag key, from the **Groups** drop-down menu, select the grouping tag key.
    The legend explains which color maps to which value of the grouping tag key.
    ![a screenshot with the zoom in options highlighted with a red box](images/logging_histogram_grouped.png)
    
    {% include note.html content="The logs that don't have the grouping tag key are excluded from the logs histogram. The logs table doesn't update by the selected grouping tag key."%}  

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
