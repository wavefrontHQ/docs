---
title: Create a Logs Chart
tags: [logs]
sidebar: doc_sidebar
permalink: logging_logs_chart.html
summary: Learn how you can create charts with logs data.
---

You can view logs data on charts or you can use the logs table chart on a dashboard to preview the logs messages so you can troubleshoot faster.

## Create a Chart for Logs Data

If you have the **Logs** and **Dashboards** permissions, in the [Chart Builder](chart_builder.html) you can create logs charts. A logs chart shows the number of logs by certain criteria. For example, see the logs chart in the [Logs Browser](logging_log_browser.html).

{% include important.html content="The Chart Builder supports only one logs query per chart. If you have multiple queries, you must move the target logs query to the top as the first query in the list."%}

{% include note.html content="Node map, histogram, and heatmap are unsupported chart types for logs."%}

<table style="width: 100%;">
<tr>
  <td width="40%">
  <p>1. Select <strong>Dashboards</strong> > <strong>Create Chart</strong> on the toolbar.</p>
  <p>2. From the <strong>Data</strong> drop-down menu, select <strong>Logs (Beta)</strong>.</p>
  </td>
  <td width="60%">
    <img src="images/logs_histogram_data.png" alt="The Data drop-down menu."/>
  </td>
</tr>
<tr>
  <td width="40%">
  <p>3. From the <strong>Filters</strong> drop-down menu, add one or more tag filters.</p>
  <p>You can add include and exclude tag filters. See <a href="logging_log_browser.html#filter-types-and-logical-operators">Filter Types and Logical Operators</a> for details.</p>
  </td>
  <td width="60%">
    <img src="images/logs_histogram_filters.png" alt="The Filters drop-down menu."/>
  </td>
</tr>
<tr>
  <td width="40%">
  <p>4. Optionally, next to the <strong>Functions</strong> drop-down menu, click <strong>Count</strong>, select one or more tags by which you want to group the number of logs, and click <strong>Apply</strong>.
  To add a note with code segment in it, follow the format given below:

  {{site.data.alerts.note}}
  <ul>
    <li>
      The count function is disabled if you use the logs table chart.
    </li>
    <li>
      The logs that don't have at least one of the grouping tags are excluded from the logs chart.
    </li>
  </ul>
  {{site.data.alerts.end}}
  </p>
    </td>
  <td width="60%">
    <img src="images/logs_histogram_functions.png" alt="The Count drop-down menu."/>
  </td>
</tr>
</table>

If you select the stacked-column chart, the resulting chart shows the number of logs matching the selected filters distributed over the [selected time window](ui_charts.html#set-the-time-window-on-a-chart). The logs are grouped by the values of the selected grouping tags. You can zoom in on smaller time windows. You can also use the logs table chart to see the logs on your chart.
  ![Logs histogram chart](images/logs_histogram_chart.png)

## Logs Table Chart

To troubleshoot faster, you can have the logs data on the same dashboard that you use to monitor your application, service, sources, etc., by using the logs table chart.

<a id="create_logs_table_chart">
<p><span style="font-size: medium; font-weight: 600">Create a Logs Table Chart</span></p>

Follow these steps:

1. Select **Dashboards** > **Create Chart** on the toolbar.
1. Select the **Logs Table** chart type.
1. From the **Data** drop-down menu, select **Logs (Beta)** and add the filters that you want.
    {% include note.html content="The count function is disabled when you select the logs table chart because you don’t need to group your logs in the table view." %}
1. Click the **Format** tab to customize the data displayed on the chart.
    <table>
    <tbody>
    <thead>
    <tr><th width="20%">Option</th><th width="80%">Description</th></tr>
    </thead>
    <tr>
      <td>
        Sort by Timestamp
      </td>
      <td markdown="span">
        By default, you see the latest logs on the top of the table (**Descending**). If you want to see the oldest logs, select **Ascending**.
      </td>
    </tr>
    <tr>
      <td>
        Number of Message Lines
      </td>
      <td>
        Select the number of log lines you want to see in the Message column to get a better preview of the log message.
      </td>
    </tr>
    <tr>
      <td>
        Columns to Show in Table
      </td>
      <td markdown="span">
        Each log has required attributes, standard attributes, and custom tags. We tokenize the values of these attributes and tags so that you can filter and search logs. For more details, see [Log Attributes](logging_overview.html#log-attributes). Select the tags for which you want to see  see information in new columns.
      </td>
    </tr>
    </tbody>
    </table>
1. On the top right, click **Save**.
1. Specify the dashboard in which you want to insert the chart or create a new dashboard.

<a id="view_logs_on_the_logs_table_chart">
<p><span style="font-size: medium; font-weight: 600">View Logs on the Chart</span></p>

Once the chart is in a dashboard, you can: 

![An annotated screenshot of the logs table chart. The annotations are listed as bullets below.](images/logging_logs_chart_features.png)
* Search for keywords or phrases. You only get results for the data in the logs chart table.
* You only see the first 50 logs. To see more logs, click the ellipsis icon in the top-right corner of the chart and select **Logs (Beta)**.
* If you want to drill into a specific log, right-click the row on the table, and click **Logs (Beta)**. The tags on the log you selected carry over to the Logs Browser as filters, and you see all the logs with the same filters.
* If you want to see a specific log message while you troubleshoot and examine the other charts in the dashboard:
  * Press **Shift** + **p** to pin the log message to the chart. 
  * To close the logs detail pop-up, click the **x** in the top right corner.
* If you want to copy a log message,  press **Shift** + **c**. 

{% include note.html content="The [time window](ui_examine_data.html#set-the-time-window) determines how often the charts in a dashboard refresh. For the logs chart table, the chart reloads every 30 seconds for all time windows." %}

## Learn More!

* [Send logs](logging_send_logs.html).
* [View and browse logs](logging_log_browser.html).
* Learn how you can troubleshoot faster by [drilling into the Log Browser](logging_drill_into_logs.html) from charts, alerts, application map, and the Traces Browser.
* See [Logs troubleshooting](logging_faq.html).
