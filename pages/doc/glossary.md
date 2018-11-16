---
title: Glossary
keywords: alerts
tags: [getting started]
sidebar: doc_sidebar
permalink: glossary.html
summary: Learn about Wavefront terms.
---

This glossary introduces common Wavefront terms. Click the links or search this doc set for details.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="5%">&nbsp;</th><th width="15%">Term</th><th width="80%">Definition</th></tr>
</thead>
<tr>
<td><strong><big>A</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<!--
<tr>
<td>&nbsp;</td>
<td markdown="span">**Access management**</td>
<td>By default, Wavefront users can access objects based on their permissions. Wavefront allows administrators to limit access to Wavefront objects (initially dashboards). With this strict security setting, only the creator (e.g. dashboard creator) and invited users/groups have access to new objects.
</td>
</tr>
-->
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Alert**](alerts.html)</td>
<td markdown="span">An alert defines the *condition* under which metric values indicate a system problem and one or more *alert targets*. When the condition evaluates to true or false for a specified period of time, the alert sends an alert notification to the alert target(s).
</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Alert notification</td>
<td markdown="span">When an alert fires, Wavefront sends an alert notification to the alert target you specified when you created the alert. You can [customize **alert notifications**](alert_target_customizing.html).</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Alert target</td>
<td markdown="span">Specifies when and how to send notifications in response to alert activity. You can use our built-in alert targets by specifying an email address or a PagerDuty key in the alert, or you can create a [**custom alert target**](webhooks_alert_notification.html).</td>
</tr>
<tr>
<td><strong><big>B</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Bucket size</td>
<td markdown="span">In Wavefront charts, point buckets represent data that have been summarized over a certain length of time. [**Chart resolution**](charts_customizing.html#chart-resolution) is the bucket time interval, and it displays in the Horizontal Scale field in the lower-left corner of a chart.</td>
</tr>
<tr>
<td><strong><big>C</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Chart**](charts.html)</td>
<td markdown="span">Charts allow you to view and examine your telemetry data. Wavefront supports a rich set of chart types and chart configuration options. You can interact directly with charts–-zoom in, zoom out, change the time window, and so on, and share a link to the chart. </td>
</tr>
<tr>
<td markdown="span">&nbsp;</td>
<td markdown="span">Collector agent</td>
<td>Many Wavefront customers set up their environment to use a collector agent such as Telegraf for data collection. The collector agent sends the metrics to the Wavefront proxy. We support integrations for commonly used collector agents. </td>
</tr>
<tr>
<td markdown="span">&nbsp;</td>
<td markdown="span">[**Continuous time series**](query_language_reference.html#discrete-versus-continuous-time-series)</td>
<td>A time series that contains one data point per second. Because Wavefront accepts and stores data at up to 1 second resolution, a continuous time series has a data value for each moment in time that can be represented on the X-axis of a chart. <strong>See also:</strong> Discrete time series.</td>
</tr>
<tr>
<td><strong><big>D</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Dashboard**](dashboards.html)</td>
<td>Dashboards allow you to group and prioritize a set of charts. All charts in a dashboard share certain display preferences and dashboard variables. All Wavefront users have permission to search and interact with dashboards. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Dashboard variable**](dashboards_variables.html)</td>
<td>A dashboard variable allows you to dynamically change the components of a query. Dashboard variables can contain metric names, filters, advanced functions, and strings. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Delta counter**](delta_counters.html)</td>
<td>Wavefront delta counters make counter functionality available for serverless Function-as-a-Service environments and some other use cases. Delta counters are useful if you want to combine points that come in at the same time from several sources.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Derived metrics**](derived_metrics.html)</td>
<td>The derived metrics functionality allows you to run a query and ingest it back into Wavefront. All users can then use the result of the query, that is, the derived metric, in their queries.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Direct ingestion**](direct_ingestion.html)</td>
<td>The direct data ingestion mechanism supports sending data directly to the Wavefront service instead of a Wavefront proxy. While the Wavefront proxy has many benefits, direct data ingestion can be the best approach for some use cases.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Discrete time series**](query_language_reference.html#discrete-versus-continuous-time-series)</td>
<td>A time series whose data points are separated by time intervals that are greater than one second. These longer intervals may be due to reporting that is infrequent, irregular, or interrupted. <strong>See also:</strong> Continuous time series.</td>
</tr>
<tr>
<td><strong><big>E</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Embedded chart**](charts_embedding.html)</td>
<td>You can embed an interactive chart outside of Wavefront. When you use the UI, we generate an HTML code snippet and you can adjust the width and height.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Event**](events.html)</td>
<td>An event is a record that something of interest has happened. For example, the event might show that an alert has changed state. Wavefront supports system events and user events.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**External link**](external_links_managing.html)</td>
<td>External links allow you to go from a Wavefront chart to an external system such as a log. You can in effect connect your streaming metrics to logs and other external info. </td>
</tr>
<tr>
<td><strong><big>H</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Histogram (distribution)**](proxies_histograms.html)</td>
<td>Wavefront histograms let you compute, store, and use distributions of metrics rather than single metrics. Wavefront creates histogram distributions by aggregating metrics into bins.You can send histograms to a histogram proxy port or directly to the Wavefront service. </td>
</tr>
<tr>
<td><strong><big>I</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Integration**](integrations.html)</td>
<td markdown="span">Integrations are one easy way to get data from external systems into Wavefront. Wavefront supports [**over 160 integrations**](label_integrations%20list.html) with common Web, cloud, monitoring, and other applications and services.  For cloud integrations such as AWS, setup is automated. For other integrations, you follow setup steps which usually involve changes to a configuration file. </td>
</tr>
<tr>
<td><strong><big>M</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Maintenance window**](maintenance_windows_managing.html)</td>
<td>You can create a maintenance window to prevent alerts from firing. That's useful if you expect to perform disruptive operations that result in conditions where alerts would fire.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Multi-tenant SSO**](authentication.html#multi-tenant-authentication)</td>
<td>If a Wavefront customers uses an Identity Provider (IP), all users authenticate with that IP and see the same information by default. Multi-tenant SSO allows customers to request multiple tenants, each with a tenant administrator. Tenant administrators can invite other users. Users who authenticate to the IP can then access the tenant(s) to which they have been invited. </td>
</tr>
<tr>
<td><strong><big>O</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Object tag**](tags_overview.html#managing-object-tags)</td>
<td>Object tags help you filter your display. You apply an object tag to Wavfront UI objects such as dashboards. You can later find and display groups of objects based on their object tag. </td>
</tr>
<tr>
<td><strong><big>P</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Permission**](permissions_overview.html)</td>
<td>Wavefront permissions determine the tasks that a user can perform.</td></tr>
<!--
You can manage authorization with user-level permissions or user and group-level permission. For more fine-grained authorization control, you can perform access management for objects such as dashboards.</td>
</tr>
-->
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Point tag**](query_language_point_tags.html)</td>
<td>Point tags are key-value pairs (strings) that are associated with a point. Point tags allow you to fine-tune your queries so the output shows only the information you're interested in.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Proxy**](proxies.html)</td>
<td markdown="span">A Wavefront proxy ingests metrics and forwards them to the Wavefront service in a secure, fast, and reliable manner. Using a Wavefront proxy has several benefits, but you can also send data to Wavefront using *direct ingestion*. </td>
</tr>
<tr>
<td><strong><big>S</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**SDK**](tracing_instrumenting_frameworks.html)</td>
<td>An SDK (software development kit) is a library that you can include with your application code. Wavefront supports a variety of _observability SDKs_ in various programming languages to enable you to instrument applications to report telemetry data to Wavefront. High-level observability SDKs collect and report predefined metrics, histograms, and trace data from specific frameworks used in your application. Mid-level observability SDKs enable you to define, collect, and report your own types of telemetry data from your business operations.
Lower-level observability SDKs enable you to instrument your application by sending raw telemetry data to Wavefront. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Source**](sources_managing.html)</td>
<td>A source is a unique application, host, container, or instance that emits metrics. In contrast to other platforms, each Wavefront metric explicitly includes the source. For cloud integrations, the source is extracted from service properties or dimensions. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Source tag**](source_tags.html)</td>
<td>Source tags allow you to group your sources. For example, you can tag production hosts and development hosts with different source tags, and later run a query over only one group of sources. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Span**](tracing_basics.html#wavefront-trace-data)</td>
<td>A span is a named, timed operation that represents a contiguous segment of work in a trace.  </td>
</tr>
<tr>
<td><strong><big>T</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Tag**](tags_overview.html)</td>
<td>Tags allows you to group and filter information or UI objects. Wavefront includes several types of tags for filtering metrics, sources, and events, supressing alerts during maingenance windows, and customizing your display. <strong>See also:</strong> Point tag, Source tag. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Telemetry data</td>
<td>Refers to all data you can store and analyze with the Wavefront observability platform. Metrics (including delta counters), histograms, and tracing spans are collectively described as telemetry data.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Tenant</td>
<td> If your company has several teams, and if each team wants to work independently, you can request a multi-tenant SSO setup. Afterwards, users can be invited to individual tenants only - and users who belong to multiple teams can be invited to multiple tenants. <strong>See also:</strong> Multi-tenant SSO. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Time series</td>
<td>Collection of unique data points over time. The data points are related to a specific metrics on specific source, with specific point tags. In Wavefront query language, you use a ts() function to describe a time series. <strong>See also:</strong> Continuous time series and Discrete time series.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Trace**](tracing_basics.html#wavefront-trace-data)</td>
<td>A trace allows you to follow and examine a transaction or workflow in your application. As a result, you might be able to locate errors in context or improve execution speed. In [OpenTracing](https://opentracing.io/), a trace is a directed, acyclic graph of spans.</td>
</tr>
<tr>
<td><strong><big>W</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Wavefront service</td>
<td>The Wavefront service runs the metrics collection engine. It can receive telemetry data from a Wavefront proxy or through direct ingestion. </td>
</tr>
</tbody>
</table>
