---
title: Glossary
keywords: alerts
tags: [getting started]
sidebar: doc_sidebar
permalink: glossary.html
summary: Learn how we use technical terms.
---

This Tanzu Observability by Wavefront glossary defines technical terms that are commonly used in the documentation or in the product. Click the links or search this documentation for details. 

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="5%">&nbsp;</th><th width="15%">Term</th><th width="80%">Definition</th></tr>
</thead>
<tr>
<td><strong><big>A</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>

<tr>
<td>&nbsp;</td>
<td markdown="span">[**Access management**](access.html)</td>
<td>By default, users can access objects based on their <strong>global permission</strong>. For example, users with <strong>Dashboard</strong> permission view and modify all dashboard. Access adds a more fine-grained layer of per-object ACL. A dashboard or alert creator can give only a certain user or group of users view or view and modify access to that object.
</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Alert**](alerts.html)</td>
<td markdown="span">An alert defines the *condition* under which metric values indicate a system problem and one or more *alert targets*. When the condition evaluates to true or false for a specified period of time, the alert sends an alert notification to the alert target(s).
</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Alert notification</td>
<td markdown="span">When an alert fires, an alert notification is sent to the alert target you specified when you created the alert. You can [customize **alert notifications**](alert_target_customizing.html).</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Alert target</td>
<td markdown="span">Specifies when and how to send notifications in response to alert activity. You can use our built-in alert targets by specifying an email address or a PagerDuty key in the alert, or you can create a [**custom alert target**](webhooks_alert_notification.html).</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Application tags**](tracing_instrumenting_frameworks.html#application-tags)</td>
<td markdown="span">Application tags describe the architecture of an application that was instrumented for tracing. Application tags are span tags with the names <code>application</code>, <code>service</code>, <code>cluster</code>, and <code>shard</code>. You can use application tags to aggregate and filter trace data at different levels of granularity.</td>
</tr>
<tr>
<td><strong><big>B</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Bucket size</td>
<td markdown="span">Point buckets in charts represent data that have been summarized over a certain length of time. [**Chart resolution**](ui_charts.html#chart-resolution) is the bucket time interval, and it displays in the Horizontal Scale field in the lower-left corner of a chart.</td>
</tr>
<tr>
<td><strong><big>C</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Chart**](ui_charts.html)</td>
<td markdown="span">Charts allow you to view and examine your telemetry data. We support a rich set of chart types and chart configuration options. You can interact directly with charts–-zoom in, zoom out, change the time window, and so on, and share a link to the chart. </td>
</tr>
<tr>
<td markdown="span">&nbsp;</td>
<td markdown="span">Collector agent</td>
<td>A collector agent such as Telegraf for data collection is often part of the data ingestion pipeline. The collector agent sends the metrics to the Wavefront proxy. We support integrations for commonly used collector agents. </td>
</tr>
<tr>
<td markdown="span">&nbsp;</td>
<td markdown="span">[**Continuous time series**](query_language_discrete_continuous.html)</td>
<td>A time series that contains one data point per second. Because the Wavefront service accepts and stores data at up to 1 second resolution, a continuous time series has a data value for each moment in time that can be represented on the X-axis of a chart. <strong>See also:</strong> Discrete time series.</td>
</tr>
<tr>
<td markdown="span">&nbsp;</td>
<td markdown="span">[**Counter**](delta_counters.html)</td>
<td><strong>A cumulative counter, or simply counter, is a monotonically increasing counter. These counters are useful for aggregating metric information such as the number of hits on a web page, how many users log into a portal, etc. They're usually used with `rate()` or a similar function. See also:<strong>Delta counter.</strong></td>
</tr>
<tr>
<td><strong><big>D</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Dashboard**](ui_dashboards.html)</td>
<td>Dashboards allow you to group and prioritize a set of charts. All charts in a dashboard share certain display preferences and dashboard variables.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Dashboard variable**](dashboards_variables.html)</td>
<td>A dashboard variable allows you to dynamically change the components of a query. Dashboard variables can contain metric names, filters, advanced functions, and strings. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Delta counter**](delta_counters.html)</td>
<td>Delta counters bin metrics to a minute timestamp and they treat write operations to the same bin as deltas. Delta counters are especially useful in serverless Function-as-a-Service environments or if you want to combine points that come in at the same time from several sources. Use a `cs()` query to have your metric treated as a delta counter. See also:<strong>Delta counter.</strong></td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Derived metrics**](derived_metrics.html)</td>
<td>The derived metrics functionality allows you to run a query and ingest it back into the product. All users can then use the result of the query, that is, the derived metric, in their queries.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Direct ingestion**](direct_ingestion.html)</td>
<td>The direct data ingestion mechanism supports sending data directly to the Wavefront service instead of a Wavefront proxy. While the Wavefront proxy has many benefits, direct data ingestion can be the best approach for some use cases.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Discrete time series**](query_language_discrete_continuous.html)</td>
<td>A time series whose data points are separated by time intervals that are greater than one second. These longer intervals may be due to reporting that is infrequent, irregular, or interrupted. <strong>See also:</strong> Continuous time series.</td>
</tr>
<tr>
<td><strong><big>E</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Embedded chart**](ui_sharing.html#embed-a-chart-in-other-uis)</td>
<td>You can embed an interactive chart in a product or web page. When you use the UI, we generate an HTML code snippet and you can adjust the width and height.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Event**](events.html)</td>
<td>An event is a record that something of interest has happened. For example, the event might show that an alert has changed state. We supports system events and user events.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Expression**](query_language_reference.html#query-expressions)</td>
<td>An expression describes data of a particular type: time series, histograms, events, traces, or spans. Expressions can be complete queries or building blocks of queries. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**External link**](external_links_managing.html)</td>
<td>External links allow you to go from a chart to an external system such as a log. You can in effect connect your streaming metrics to logs and other external info. </td>
</tr>
<tr>
<td><strong><big>H</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Histogram (distribution)**](proxies_histograms.html)</td>
<td>A Wavefront histogram is a series of distributions that the Wavefront service has computed from the data points of a time series. Each distribution summarizes the points in a particular time interval (minute, hour, or day) by organizing their values into bins (value ranges). You can send histograms to a histogram proxy port or directly to the Wavefront service. </td>
</tr>
<tr>
<td><strong><big>I</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Integration**](integrations.html)</td>
<td markdown="span">Integrations are one easy way to set up a data pipeline from an external system. We support [**over 200 integrations**](label_integrations%20list.html) with common Web, cloud, monitoring, and other applications and services.  For cloud integrations such as AWS, setup is automated. For other integrations, you follow setup steps which usually involve changes to a configuration file. </td>
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
<td markdown="span">Metadata</td>
<td>Metadata is a collection of values that uniquely describes a particular set of observability data, but which are not themselves part of the data set. For example, every time series is uniquely described by its metric name, source name, and point tags.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">**Metric**</td>
<td>Metrics are data points that measure the same thing over time. They are well suited for gaining a real-time and historical understanding of system health and trends. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Multi-tenant SSO**](authentication.html#multi-tenant-authentication)</td>
<td>If one of our customers uses an Identity Provider (IP), all users authenticate with that IP and see the same information by default. Multi-tenant SSO allows customers to request multiple tenants, each with a tenant administrator. Tenant administrators can invite other users. Users who authenticate to the IP can then access the tenant(s) to which they have been invited. </td>
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
<td>&nbsp;</td>
<td markdown="span">[**Operation**](tracing_basics.html#wavefront-trace-data)</td>
<td>An operation is a distinct segment of work that a microservice performs. An operation's name is typically the name of a function, method, or procedure that the microservice invokes. An operation might be part of a higher-level request or transaction, and might invoke other, lower-level operations. When you instrument an operation for distributed tracing, each invocation of the operation emits a span.
</td>
</tr>
<tr>
<td><strong><big>P</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Permission**](permissions_overview.html)</td>
<td>Permissions determine the tasks that a user can perform.</td></tr>
You can manage authorization with user-level permissions or user and group-level permission. For more fine-grained authorization control, you can perform access management for objects such as dashboards.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Point tag**](query_language_point_tags.html)</td>
<td>Point tags are key-value pairs (strings) that are associated with a point. Point tags allow you to fine-tune your queries so the output shows only the information you're interested in.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">**PPS**</td>
<td markdown="span">Points per Seconds. Telemetry data points per second ingested by the Wavefront service. All customers are billed based on their PPS. We support dashboards and tools to <a href="https://docs.wavefront.com/wavefront_usage_info.html">Find Actionable Usage Information</a>  </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Proxy**](proxies.html)</td>
<td markdown="span">A Wavefront proxy ingests metrics and forwards them to the Wavefront service in a secure, fast, and reliable manner. Using a Wavefront proxy has several benefits, but you can also send data to the Wavefront service using direct ingestion. </td>
</tr>
<tr>
<td><strong><big>Q</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Query</td>
<td markdown="span">Queries are requests that you submit to find and visualize data. A query consists of expressions built from the [Wavefront Query Language (WQL)](query_language_reference.html). You can compose queries with the [Chart Builder](chart_builder.html) UI, or you can write queries directly in [Query Editor](query_editor.html). Queries let you retrieve and transform ingested data, as well as create and display synthetic data for the duration of the query.</td>
</tr>
<tr>
<td><strong><big>R</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**RED metrics**](trace_data_details.html#red-metrics-derived-from-spans)</td>
<td>RED metrics are key health metrics for applications that are instrumented for distributed tracing. RED metrics measure the Request Rate (number of requests per minute), Errors (number of failed requests per minute), and Duration of the spans that are generated by an application or one of its services. <strong>See also:</strong> Span RED metrics, Trace RED metrics.</td>
</tr>
<tr>
<td><strong><big>S</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Sampling**](trace_data_sampling.html)</td>
<td>Sampling is a technique for limiting the volume of trace data that is actually sent to to the Wavefront service for storage and visualization. A sampling strategy is a policy for deciding which traces to send. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**SDK**](wavefront_sdks.html)</td>
<td>An SDK (software development kit) is a library that you can include with your application code. We support observability SDKs in different programming languages and for different types of data (metrics and traces).</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Source**](sources_managing.html)</td>
<td>A source is a unique application, host, container, or instance that emits observability data. A source is part of the unique metadata that identifies a data set. For cloud integrations, the source is extracted automatically from service properties or dimensions. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Source tag**](tags_overview.html#source-tags)</td>
<td>Source tags allow you to group your sources. For example, you can tag production hosts and development hosts with different source tags, and later run a query over only one group of sources. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Span**](tracing_basics.html#wavefront-trace-data)</td>
<td>A span is a named, timed representation of a contiguous segment of work in a trace. Every span corresponds to a unique invocation of an operation in an instrumented application, and belongs to exactly one trace.    </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Span RED metrics**](trace_data_details.html#span-red-metrics-and-trace-red-metrics)</td>
<td>Span RED metrics measure the individual operations that originated in a service or application that was instrumented for tracing. For example, a span RED metric for a <code>delivery</code> service might measure the number of calls per minute to the <code>dispatch</code> operation. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Span tag**](trace_data_details.html#span-tags)</td>
<td>Span tags are key-value pairs (strings) that are associated with a span. Certain span tags are required for a span to be valid. An application can be instrumented to include custom span tags, as well.</td>
</tr>
<tr>
<td><strong><big>T</big></strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td></tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Tag**](tags_overview.html)</td>
<td>Tags are metadata that is associated with your observability data. You can use tags to filter the results of a query, or to apply an operation to a group of objects (such as suppressing a group of alerts during a maintenance window). We support several types of tags, including source tags, point tags, event tags, alert tags, and span tags. <strong>See also:</strong> Point tag, Source tag. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Telemetry data</td>
<td>See Observability data.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Tenant</td>
<td> If your company has several teams, and if each team wants to work independently, you can request a multi-tenant SSO setup. Afterwards, users can be invited to individual tenants only - and users who belong to multiple teams can be invited to multiple tenants. <strong>See also:</strong> Multi-tenant SSO. </td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">Time series</td>
<td markdown="span">A time series is a data set that consists of a sequence of data points over time. Each data point in a time series combines a single data value with a unique timestamp. Every time series is identified by unique metadata (combination of metric name, source name, and point tag values). In the Wavefront query language, you use the [ts() function](ts_function.html) to describe and visualize a time series. <strong>See also:</strong> Continuous time series and Discrete time series.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Trace**](tracing_basics.html#wavefront-trace-data)</td>
<td markdown="span">A trace allows you to follow and examine a transaction or workflow in your application. As a result, you might be able to locate errors in context or improve execution speed. In [OpenTracing](https://opentracing.io/), a trace is a directed, acyclic graph of spans.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td markdown="span">[**Trace RED metrics**](trace_data_details.html#span-red-metrics-and-trace-red-metrics)</td>
<td>Trace RED metrics measure the traces that start with a given root operation in a service or application that has been instrumented for tracing. For example, a trace RED metric for a service might measure the number of traces that each start with a call to the <code>orderShirts</code> operation.
</td>
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
