---
title: Metrics and the Metrics Browser
keywords: metrics
tags: [administration]
sidebar: doc_sidebar
permalink: metrics_managing.html
summary: Understand metrics structure and how to explore metrics in the Metrics Browser
---

Tanzu Observability (formerly known as VMware Aria Operations for Applications) provides observability for several different [metric types](metric_types.html) including time series metrics, delta counters, histograms, and traces/spans. This page looks at the anatomy of a time series metric and shows you how to explore it in the Metrics Browser.

## Videos

The following videos get you started. Note that these videos were created in 2020 and some of the information in them might have changed. They also use the 2020 version of the UI.


<table style="width: 100%;">
<tbody>
<tr>
<td><strong><font color="#0091DA" size="3">Browsing Your Data</font></strong><br>
<br>
<iframe id="kmsembed-1_ai5iua3f" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_ai5iua3f/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0"></iframe>
</td>
<td><br>
<p>90-second video that shows how you can find and examine metrics from the Sources browser and from the Metrics browser. </p><p>You can also watch the video <a href="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_ai5iua3f/uiConfId/49694343/pbc/252649793/st/0" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">About Cardinality</font></strong><br><br/>
<iframe id="kmsembed-1_824wsz3p" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_824wsz3p/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0"></iframe>
</td>
<td><br><p>Wavefront co-founder Clement Pang explains why the concept of cardinality is so important for observability, what high cardinality means, and why we deal so well with high cardinality input. You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_824wsz3p" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p> </td>
</tr>
</tbody>
</table>


You can also watch the following videos to learn more about working with metrics:
* [Tagging your Data](https://vmwaretv.vmware.com/media/t/1_3igakxnb)
* [Time Series and Interpolation](https://vmwaretv.vmware.com/media/t/1_afml14zm)
* [How to Ingest Data](https://vmwaretv.vmware.com/media/t/1_nc4kmszz)
* [Delta Counters](https://vmwaretv.vmware.com/media/t/1_khsugqea)

## Time Series Metric Structure

A time series has, at a minimum, the metric name, value/timestamp, and source. In many cases, the metric is ingested with additional information represented as tags.

### Simple Time Series

Here's one example that shows the minimum elements of a time series.

![metric, value, timestamp, source](images/metric_anatomy_simple.png)

Each time series is a unique combination of:

* **Metric name**--Describes the metric. There's often a hierarchy of metrics, each with a corresponding time series.
* **Value & Timestamp**--Value at the specified time.
* **Source**--The source of the metric. Host, VM, etc. In contrast to some other observability platforms, this dimension is always part of the metric.

Here's a screenshot of the time series that is shown in the diagram above in a chart.

![screenshot of simple time series corresponding to the metric, value, timestamp, and source used above](images/metric_simple_screenshot.png)

### Time Series with Tags

In most cases, the time series includes one or more tags to allow a more fine-grained analysis. The `~sample` data you can find on each service instance include point tags for environment and availability zone.

![metric, value, timestamp, source, point tag](images/metric_anatomy_with_tag.png)

Point tags offer a powerful way of labeling data so that you can slice and dice it in almost any way you can imagine. For example, you can use point tags, to label a point’s datacenter, version, etc. and can then group by datacenter or version.

You use point tags to add extra dimensions to your data, and can then focus your exploration just on that dimension.[Fine Tune Queries with Point Tags](query_language_point_tags.html) explains how to use point tags.

Here's a screenshot of the time series that includes point tags in a chart.

![screenshot of time series corresponding to the metric, source, and point tag used in diagram above](images/metric_simple_screenshot.png)

### How Filtering with Tags Improves Usability

How the point tag filters are useful becomes obvious when the `source=` filter is removed. The result of all time series for `~sample.disk.space.used` is visually confusing.

![screenshot of time series ~sample.disk.space.used showing many lines](images/metrics_without_filter.png)

When you add filters for `env` and `az`, the information makes sense.

![screenshot of time series ~sample.disk.space.used filtered by az and env showing fewer lines](images/metrics_with_filter.png)

## Obsolete Metrics

If a metric stops sending data points for a certain period of time (obsolescence period), it becomes **obsolete**. 

{% include note.html content="The obsolescence period for metrics and sources (by default 2 weeks) might vary because it depends on the configuration of your cluster. You can see your current configuration by looking into the Advanced settings of any [chart](ui_charts.html#include-metrics-that-stopped-reporting) or [dashboard](ui_dashboards.html#set-dashboard-display-preferences-and-settings). To change this configuration, contact [Technical Support](wavefront_support_feedback.html)."%}

In the Metrics browser and Query Editor, obsolete metrics are no longer shown in the autocomplete drop-down lists.

## Metrics Browser

Select **Browse > Metrics** to display the Metrics Browser. Use the Metrics Browser to find metrics that are actively sending data points.

{% include note.html content="The Metrics Browser filters out the obsolete metrics." %}

![An annotated screenshot of the Metrics Browser. The information is listed below.](images/metrics_browser.png)

On the Metrics Browser, you can:
* Drill down and go up the hierarchy.
* Filter by name or source.
* Hide and redisplay individual metrics or metrics namespaces to unclutter your page.
* View the metric type in terms of retention period - persistent or ephemeral.
* Convert persistent metrics to ephemeral and the reverse.
* Create a chart or dashboard for an individual metric or for the current set of metrics.
* View the sources and point tags for an individual metric.

{% include tip.html content="If you select **Browse > Delta Counters** you can use the same browser to examine [delta counters](delta_counters.html). The only difference is that counters are persistent and not convertible to ephemeral." %}

### Hide and Redisplay Metrics

While [obsolete metrics](metrics_managing.html#obsolete-metrics) are automatically hidden, you can manually hide metrics from the Metrics browser. Manually hiding metrics does not permanently delete a metric or metric namespace.

{% include shared/permissions.html entity="metrics" entitymgmt="Metrics" %}

{% include note.html content="Hidden metrics are removed from the autocomplete drop-down lists, but you can still use these metrics in queries as long as data points exist." %}

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<strong>To hide one or more metrics:</strong>
<ol>
<li>Select <strong>Browse > Metrics</strong>.</li>
<li>Click the <strong>Manage Hidden Metrics</strong> button.</li>
<li>In the dialog box, type a complete metric name (e.g. <code>requests.latency</code>) or a metric prefix (e.g. <code>requests.</code>, <code>cpu.loadavg.</code>).
<ul>
<li>This field does not support auto-complete, so you have to type the entire metric name or metric prefix.</li>
<li>The text is case sensitive.</li>
<li>Wildcards are not supported. The star <code>*</code> character is considered part of the text string.</li>
</ul></li>
<li>Press Enter to add the metric(s) to the list and click <strong>Save</strong>.</li>
</ol> </td>
<td width="40%"><img src="/images/hide_metrics.png" alt="hide metrics"></td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<strong>To view hidden metrics:</strong>
<ol>
<li>Select <strong>Browse > Metrics</strong>.</li>
<li>Click the <strong>Manage Hidden Metrics</strong> button.</li>
<li>Click the <strong>Unhide</strong> button to the right of the metric or metric prefix to unhide and click <strong>Save</strong>.</li>
</ol>
The selected metrics and metric prefixes appear again as long as they are not obsolete.
</td>
<td width="40%"><img src="images/viewing_hidden_metrics.png" alt="view hidden metrics"></td>
</tr>
</tbody>
</table>

### Change the Retention Period of Metrics

With the 2024-05 release, we introduce **ephemeral** metrics, which have short [retention period](terms_of_service.html#data-retention). By default, all ingested metrics are persistent but are convertible to ephemeral.

Converting persistent metrics to ephemeral can significantly improve the [query performance](query_language_performance.html) and reduce the [cardinality](cardinality.html).

{% include note.html content="To change the retention period of a metric or metrics namespace, you must be a Super Admin user with [enabled Super Admin mode](users_account_managing.html#enable-or-disable-super-admin-mode)." %}

{% include important.html content="Converting a persistent metric to ephemeral **permanently deletes** the data points of this metric that are older than 28 days." %}

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<ol>
<li>Select <strong>Browse > Metrics</strong>.</li>
<li>Click the <strong>Change Ephemerality</strong> button.</li>
<li>To convert a persistent metric or metrics namespace to ephemeral, in the <strong>Select Metric Prefix</strong> text box, enter the target metric name or namespace prefix, and press Enter.
<p>The metric name or namespace prefix appears in the <strong>Ephemeral Metrics</strong> table below. You can repeat this step for multiple metrics and metrics namespaces.</p></li>
<li>To convert an ephemeral metric or metrics namespace to persistent, in the <strong>Ephemeral Metrics</strong> table, locate the target metric or namespace prefix and click the corresponding <strong>Convert to Persistent Metric</strong> action.<p>The metric name or namespace prefix disappears from the <strong>Ephemeral Metrics</strong> table. You can repeat this step for multiple metrics and metrics namespaces.</p></li>
<li>Click <strong>Save</strong>.</li>
</ol> </td>
<td width="40%"><img src="/images/change_ephemerality.png" alt="A screenshot of the Change Ephemerality dialog box."></td>
</tr>
</tbody>
</table>

Changing the retention period of a metric or metrics namespace creates a [System event](events.html):
* Converting a persistent metric to ephemeral creates a System event with the name `Ephemeral Prefix: Added <metric_name>`.
* Converting an ephemeral metric to persistent creates a System event with the name `Ephemeral Prefix: Removed <metric_name>`.

## Learn More!

* [Optimizing the Data Shape to Improve Performance](optimize_data_shape.html)
* See the KB article [Migrating Objects or Data Between Environments](https://vmwaoa.zendesk.com/hc/en-us/articles/21153594484493-Migrating-Objects-or-Data-Between-VMware-Aria-Operations-for-Applications-Environments) if your company has several service instances.
