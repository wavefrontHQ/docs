---
title: What is Wavefront?
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_introduction.html
summary: Learn about Wavefront, its architecture, and its interfaces.
---
Wavefront is a high-performance streaming analytics platform that helps you monitor and optimize your environment. Wavefront is unique because it can scale to very high data ingestion rates and query loads. That means you can collect data from many services and sources across your entire application stack, and can look at details for earlier data collected by Wavefront.

## What Can Wavefront Do?

After you've sent your data to Wavefront, you can view them in custom dashboards, alert on problem values, and perform anomaly detection and forecasting.

### Charts and Dashboards

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">Visualize the information in <a href="ui_examine_data.html"> <strong>dashboards and charts</strong></a>.
<ul>
<li>Use filters and functions to see exactly what you’re interested in. For example, combine multiple time series using aggregation functions such as sum() or avg().</li>
<li>Combine functions, and show or hide some of the information - or use dashboard variables to change the focus of a dashboard. For example, a variable might allow you to show the production or development environment.</li>
<li>Select one of several **chart types** (line plot, point plot, table, etc.)</ul></td>
<td width="50%"><img src="/images/intro_query.png" alt="simple v1 chart"/></td>
</tr>
</tbody>
</table>

### Alerts

<table style="width: 100%;">
<tbody>
<tr><td width="50%">To detect problems, You can <a href="alerts.html"> <strong>create alerts</strong></a> directly from charts and specify
<ul>
<li>For example, assume in your environment you need to know:
<li>When the CPU reaches a certain threshold. </li>
<li>Who should be notified and how (email, Pagerduty, etc). </li>
<li>What the alert severity is, and when the alert resolves</li>
</ul>
After you've set up an alert with that information, we'll send an alert notifications that include details and a chart image. See the example on the right. </td>
<td width="50%"><img src="/images/alert_notification_example.png" alt="simple v1 chart"/></td>
</tr>
</tbody>
</table>

### Queries

<table style="width: 100%;">
<tbody>
<tr><td width="50%">The <a href="label_reference%20page.html"><strong>Wavefront query language</strong></a> allows you to extract exactly the information you need. With filters and functions you can customize your charts so the signal becomes visible in the noise. <br>
<br>
You can work with Chart Builder (shown on the right) or, for access to all supported functions, use Query Editor.
</td>
<td width="50%"><img src="/images/chart_builder.png" alt="chart builder"/></td>
</tr>
</tbody>
</table>

### Anomaly Detection and Forecasting

<table style="width: 100%;">
<tbody>
<tr><td width="50%">Use <a href="ai_genie.html"> <strong>AI Genie</strong></a> for anomaly detection and forecasting. </td>
<td width="50%"><img src="/images/ai_genie_for_intro.png" alt="ai genie forecasting"/>  </td>
</tr>

</tbody>
</table>

### Distributed Tracing

<table style="width: 100%;">
<tbody>
<tr><td width="50%">Use <a href="tracing_basics.html"> <strong>Distributed Tracing</strong></a> to work with a service map, examine traces and spans, and drill down into problem areas. </td>
<td width="50%"><img src="/images/tracing_for_intro.png" alt="service map"/>  </td>
</tr>

</tbody>
</table>


## How Can I Get Data Into Wavefront?

Wavefront works with time-series (metric) data, and also with traces and spans, and with histograms from diverse sources.
* **Cloud:** Perform minimal setup to let Wavefront to access the data in your cloud environment. The result is direct ingestion of cloud services data such as Amazon Web Services or Google Cloud Platform.
* **Integrations:** For other data sources, we support over 200 integrations. You modify a simple configuration file and you’re good to go.
* **Start Where You Are:** If your environment already has a metrics infrastructure, you can do some pre-processing on the data so they correspond to the Wavefront Data Format, and send them directly to the Wavefront proxy.
* **Direct Ingestion:** For some use cases, [direct ingestion](direct_ingestion.html) is the best approach. Consider the [proxy benefits](proxies.html#proxy-benefits) before you select direct ingestion.
* **Histograms:** For high-velocity metrics, [Wavefront histograms](proxies_histograms.html) might be the best solution.
* **Traces and Spans:** For traces, we support Jaeger and Zipkin or any applications that are instrumented with the OpenTracing library. You can also send custom traces using one of our SDKs.

For an introduction, watch this video by Wavefront co-founder Clement Pang.

<p><a href="https://www.youtube.com/watch?v=lhrtPSqn8-c&index=2&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_data_into_wavefront.png" style="width: 700px;" alt="getting data into wavefront"/></a>
</p>

## What Are Supported Interfaces?

Different users interact with Wavefront in different ways:

* Most users access the **graphical user interface** (GUI) from a browser. You log in to the Wavefront UI from a standard web browser, in many cases using an SSO solution.  The UI supports different time windows -- even an entire year. Wavefront supports Chrome, Firefox, and Safari.
* The Chart Builder and Query Builder interfaces to the query language allow you to fine-tune your charts and alerts. Start with the [Query Language Reference](query_language_reference.html) and click any function on that page for details and examples.
* The [Wavefront REST API](wavefront_api.html) allows you to perform UI actions programmatically. The API is based on Swagger, so you can generate the client of your choice.
* For **Distributed Tracing**, we make a large sets of SDKs available in Github.

## What's the Architecture?

The Wavefront Service runs the metrics collection engine. The service runs in the cloud and accepts data from the Wavefront proxy or through direct ingestion.

* If you have a custom application, you can send your metrics to the proxy or directly to the service  -- as long as the data is in one of the supported data formats.
   For example, if your environment already includes a metrics collection infrastructure, you can do some pre-processing on the data and send them to the proxy.
* If you're interested in on-prem telemetry you have several options:
  - Send data from your application code to the proxy using a **metrics library**. This works well both for metrics and for traces and spans.
  - Set up a **collector** agent such as Telegraf, collects data from you host or infrastructure and sends those data to the proxy.
  - The proxy can also ingest metrics from your log files. See [Log Data Metrics Integration](integrations_log_data.html)
* With cloud services, Wavefront pulls the data from your cloud provider (after minimal setup). We support all major cloud providers.

![Wavefront architecture](images/wavefront_architecture.svg)
