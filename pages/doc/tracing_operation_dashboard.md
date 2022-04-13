---
title: Operation Dashboard
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_operation_dashboard.html
summary: Identify potential hot spots of operations.
---

Use the Operation Dashboard to identify potential hot spots in each operation, such as the GET operation of the beachshirts application's shopping service. From the Operation Dashboard you can then drill down to the Traces Browser.

## Explore the Default Operation Dashboard

The default, read-only dashboard lets you explore RED metrics of an operation, however, you can't make changes to the dashboard.

See the Operation Dashboard:

* Option 1:
  1. In your web browser, go to your Wavefront instance and log in. 
  1. From the toolbar, select **Applications** > **Operation Dashboard**.

* Option 2:
  Drill down to the Operation Dashboard from the tracing traffic on the application map.

* Option 3:
  Drill down to the Operation Dashboard from the traces browser, click on a trace, click on a span from a specific operation, and click **Go to Operation Dashboard**.

![examine services](images/tracing_operations_dashboard.png)

On the dashboard for a particular service, you can:
* Select the time and time zone in the toolbar to customize the chart time properties.
* Filter the metrics based on the operation, application, service, spankind, HTTP status code, cluster, shard, or source.
* Select **Detailed View** or **Summarized View** to change the level of detail for charts.
* Use <img src="images/tracing_link_icon.png"
style="vertical-align:text-bottom;width:25px" alt="icon to click to get the link"/> to get a link and share what you’re seeing right now (NON-LIVE display) with other users.
* Navigate to the Traces Browser.
  * Click **See all operation traces**.
  * Select a region of the histogram chart and click **Search Traces** to view the traces for the selected duration.
  * Click the vertical ellipsis in the top right of any chart, click **Traces**, and click a service.
    {% include note.html content="If you don’t see **Traces**, check whether your metrics include `application` and `service point` tags.<br/><br/> These tags are defined when you instrument your application for tracing via [Application tags](trace_data_details.html#application-tags). If your application is already sending this data to the Wavefront service via the Wavefront proxy, you can add point tags using [Wavefront proxy preprocessor rules](proxies_preprocessor_rules.html#addtag-and-addtagifnotexists)." %}

## Custom Operation Dashboard

The standard dashboard for operations is read-only. To create a customizable copy:

1. Click the ellipsis icon and select **Clone**.
2. In the cloned dashboard, add your own charts or customize the RED metrics charts.

After you save the clone, click **Dashboard** on the toolbar and search for your dashboard by its  name. You can use it to drill down to the Traces Browser.

## Save Charts in the Operation Dashboard

View queries used in the charts of the default Operation Dashboard and save these charts to your dashboard.

<table style="width: 100%;">
  <tr>
    <td width="45%">
      <ol>
        <li>
          Click the chart name to view the chart in edit mode and to view the query used in the chart.
        </li>
        <li>
          Click <strong>Save</strong>.
        </li>
        <li>
          Save the chart to a dashboard:
          <ul>
            <li>
              To save to an existing dashboard, start typing the name of the dashboard, select a dashboard, and click <strong>Insert</strong>.
            </li>
            <li>
              Click <strong>Save to New Dashboard</strong>, enter the dashboard name and URL, and click <strong>Create</strong>. Specify only the URL string; do not include https://.
            </li>
          </ul>
        </li>
        <li>
          When the target dashboard opens in edit mode, click and drag the chart to the location of your choice and click <strong>Save</strong> at the top.
        </li>
      </ol>
    </td>
    <td markdown="span" width="55%">
      ![Save the chart to a dashboard](/images/tracing_save_charts_to_dashboard.png)
    </td>
  </tr>
</table>
