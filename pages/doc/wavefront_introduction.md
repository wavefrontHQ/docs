---
title: What is Wavefront?
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_introduction.html
summary: Learn about Wavefront, it's architecture, and it's interfaces.
---
Wavefront is a high-performance streaming analytics platform that helps you monitor and optimize your environment. Wavefront is unique because it can scale to very high data ingestion rates and query loads. That means you can collect data from many services and sources across your entire application stack, and can look at details for earlier data collected by Wavefront.

## What Can Wavefront Do?

After you've sent your data to Wavefront, you can view them in custom dashboards, alert on problem values, and perform anomaly detection and forecasting.

### Charts and Dashboards

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%"><strong>Visualize</strong> the information in <a href="ui_examine_data.html"> dashboards and charts</a>.
<ul>
<li>Use filters and functions to see exactly what you’re interested in. For example, combine multiple time series using aggregation functions such as sum() or avg().</li>
<li>Combine functions, and show or hide some of the information - or use dashboard variables to change the focus of a dashboard. For example, a variable might allow you to show the production or development environment.</li></ul></td>
<td width="50%"><img src="/images/intro_query.png" alt="simple v1 chart"/></td>
</tr>
</tbody>
</table>

### Alerts

<table style="width: 100%;">
<tbody>
<tr><td width="50%"><strong>Alert</strong> if there are problems. You can <a href="alerts.html"> create alerts</a> directly from charts and specify
<ul>
<li>When there's a problem, for example, when the CPU reaches a certain threshold. </li>
<li>Who should be notified and how. </li>
<li>What the alert severity is, and when the alert resolves</li>
</ul>
We'll send an alert notifications that include details and a chart image. See the example on the right. </td>
<td width="50%"><img src="/images/alert_notification_example.png" alt="simple v1 chart"/></td>
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


## How Can I Get My Data Into Wavefront

Wavefront works with time-series (metric) data, traces and spans, or histograms from diverse sources.wh
* **Cloud:** Perform minimal setup to let Wavefront to access the data in your cloud environment. The result is direct ingestion of cloud services data such as Amazon Web Services or Google Cloud Platform.
* **Integrations:** For other data sources, we support over 200 integrations. You modify a simple configuration file and you’re good to go.
* **Start Where You Are:** If your environment already has a metrics infrastructure, you can do some pre-processing on the data so they correspond to the Wavefront Data Format, and send them directly to the Wavefront proxy.
* **Direct Ingestion:** For some use cases, [direct ingestion](direct_ingestion.html) is the best approach. Consider the [proxy benefits](proxies.html#proxy-benefits) before you select direct ingestion.
* **Histograms:** For high-velocity metrics, [Wavefront histograms](proxies_histograms.html) might be the best solution.
* **Traces and Spans:** For traces, we support Jaeger and Zipkin or any applications that are instrumented with the OpenTracing library. You can also send custom traces using one of our SDKs.

For an introduction, watch this video by Wavefront Co-Founder Clement Pang.

<p><a href="https://www.youtube.com/watch?v=lhrtPSqn8-c&index=2&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_data_into_wavefront.png" style="width: 700px;" alt="getting data into wavefront"/></a>
</p>

## What Are Supported Interfaces?

Different users interact with Wavefront in different ways:

* The **user interface** (UI) is displayed in a browser. You log in to the Wavefront UI from a standard web browser, in many cases using an SSO solution.  The UI supports different time windows -- even an entire year. Wavefront supports Chrome, Firefox, and Safari.

* The [Wavefront REST API](wavefront_api.html) allows you to perform UI actions programmatically. The API is based on Swagger, so you can generate the client of your choice.
* For **Distributed Tracing**, we make a large sets of SDKs available in Github.

## What's the Architecture?

Wavefront has these main components:
* The **Wavefront service** runs the metrics collection engine.
* The **Wavefront proxy** forwards data to the Wavefront service in a secure, fast, and reliable way.
  - A **collector agent** such as Telegraf can send data to the proxy or
  - You can send your metrics directly to the proxy -- as long as the data is in one of the supported data formats. For example, if your environment already includes a metrics collection infrastructure, you can do some pre-processing on the data and send them to the proxy.
  - The proxy can also ingest metrics from your log files. See [Log Data Metrics Integration](integrations_log_data.html)

![Wavefront architecture](images/wavefront_architecture.svg)
