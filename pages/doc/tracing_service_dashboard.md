---
title: Service Dashboard
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_service_dashboard.html
summary: Identify potential hot spots of a service.
---

Use the Service Dashboard to identify potential hot spots, and then drill down to the Traces Browser.

## Explore the Default Service Dashboard

The default, read-only dashboard for a service lets you explore that service, however, you can't make changes to the dashboard.

See the Service Dashboard:

* Option 1:
  1. In your web browser, go to your Wavefront instance and log in.
  1. From the taskbar, click **Applications** > **Service Dashboard**.

* Option 2:
  Drill down to the Service Dashboard from the application map, table view, or grid view.

![examine services](images/tracing_services.png)

{% include note.html content="You can add these charts to a dashboard and customize them using [Tracing Templates](ui_dashboards.html#create-a-dashboard-from-a-tracing-template). " %}

On the dashboard for a particular service, you can:
* Select the time and time zone in the taskbar to customize the chart time properties.
* Use the **Jump To** drop-down menu to select a dashboard section:
  - Select **Overview** to examine the RED metrics that are derived from all of the spans for the service. These metrics reflect the health of the service.
  - Select an individual component to examine metrics for just that component of the service. A component could be an instrumented framework (e.g., **Jersey**) or the runtime system (e.g., **JVM**).
  - Select **System** if your environment uses Telegraf and you want to view CPU usage, memory usage, and disk usage.
* Filter the metrics based on the cluster, shard, or source.
* Select **Detailed View** or **Summarized View** to change the level of detail for charts.
<a name="Tracesbrowser"></a>
* Examine the TopK charts to find out which operations are potential hot spots. The bars represent operations that execute in this component of the service.
* Use the link icon <img src="images/tracing_link_icon.png"
style="vertical-align:text-bottom;width:25px" alt="icon to click to get the link"/> to get a link and share what you’re seeing right now (NON-LIVE display) with other users.
* Navigate to the Traces Browser.
  * Click a bar on a histogram.
  * Select a region of the histogram chart and click **Search Traces** to view the traces for the selected duration.
  * Click a bar on a TopK chart.
  * Click the vertical ellipsis in the top right of any chart, click **Traces**, and click a service.
    {% include note.html content="If you don’t see **Traces**, check whether your metrics include `application` and `service point` tags.<br/><br/> These tags are defined when you instrument your application for tracing via [Application tags](trace_data_details.html#application-tags). If your application is already sending this data to the Wavefront service via the Wavefront proxy, you can add point tags using [Wavefront proxy preprocessor rules](proxies_preprocessor_rules.html#addtag-and-addtagifnotexists)." %}

## Custom Service Dashboard

The standard dashboard for services is read-only. To create a customizable copy:

1. Click **Clone** from the ellipsis menu.
2. In the cloned dashboard, add your own charts or customize the RED metrics charts.

After you save the clone, click **Dashboard** on the taskbar and search for your dashboard by its  name. You can use it to drill down to the Traces Browser.

## Save Charts in the Service Dashboard

View queries used in the charts of the default Service Dashboard and save these charts to your dashboard.

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

## Troubleshooting

**Don't see RED metrics or see incorrect RED metrics on your charts?**

Starting with [release 2020-26.x](2020.26.x_release_notes.html), the **span.kind** filter is introduced to the default Service Dashboard. As a result, if the spans from your OpenTracing application don't have the `span.kind` point tag, the RED metrics you see on the default Service Dashboard will be incorrect, or you will not see RED metrics on your charts.

The OpenTracing SDK and Wavefront proxy versions listed below add the `span.kind` tag to the spans. Use the recommended versions to see accurate data on the default Service Dashboard.

{% include note.html content="If you are using [Wavefront Sender SDKs](tracing_instrumenting_frameworks.html#instrument-your-application-with-wavefront-sender-sdks) and sending data via the Wavefront proxy, make sure to update to the latest proxy version."%}

<table style="width: 80%;">

  <thead>
  <tr>
    <th width="50%">SDK or Proxy</th>
    <th width="30%">Version</th>
  </tr>
  </thead>
  <tr>
    <td markdown="span">[Wavefront proxy](proxies_installing.html)</td>
    <td>7.0 or later</td>
  </tr>
  <tr>
    <td markdown="span">[Java OpenTracing SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java)</td>
    <td>v2.1.1 or later</td>
  </tr>
  <tr>
    <td markdown="span">[Go OpenTracing SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-go)</td>
    <td>v0.9.0 or later</td>
  </tr>
  <tr>
    <td markdown="span">[Python OpenTracing SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-python)</td>
    <td>v2.0.0 or later</td>
  </tr>
  <tr>
    <td markdown="span">[C# OpenTracing SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-csharp)</td>
    <td>v2.0.0 or later</td>
  </tr>
  <tr>
    <td markdown="span">[Java Tracing Agent](https://github.com/wavefrontHQ/wavefront-opentracing-bundle-java)</td>
    <td>v1.2.0 or later</td>
  </tr>
</table>
