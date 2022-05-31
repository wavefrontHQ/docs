---
title: Metrics and the Metrics Browser
keywords: metrics
tags: [administration]
sidebar: doc_sidebar
permalink: metrics_managing.html
summary: Understand metrics structure and how to explore metrics in the Metrics Browser
---

Tanzu Observability by Wavefront provides observability for several different [metric types](metric_types.html) including time series metrics, delta counters, histograms, and traces/spans. This page looks at the anatomy of a time series metric and shows you how to explore it in the Metrics Browser.

## Videos

The following videos get you started:



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
<td><br><p>Wavefront chief architect and co-founder Clement Pang explains why the concept of cardinality is so important for observability, what high cardinality means, and why we deal so well with high cardinality input. You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_824wsz3p" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p> </td>
</tr>
</tbody>
</table>


You can also watch the following videos to learn more about working with metrics:
* [Tagging your Data with Wavefront](https://vmwaretv.vmware.com/media/t/1_3igakxnb)
* [Time Series and Interpolation](https://vmwaretv.vmware.com/media/t/1_afml14zm)
* [Getting Data Into Wavefront](https://vmwaretv.vmware.com/media/t/1_nc4kmszz)
* [Delta Counters in Wavefront](https://vmwaretv.vmware.com/media/t/1_khsugqea)

## Time Series Metric Structure

A Wavefront time series has, at a minimum, the metric name, value/timestamp, and source. In many cases, the metric is ingested with additional information represented as tags.

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

In most cases, the time series includes one or more tags to allow a more fine-grained analysis. The  `~sample` data you can find on each Wavefront instance, include point tags for environment and availability zone.

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


## Metrics Browser

Select **Browse > Metrics** to display the Metrics Browser. Use the Metrics Browser to find metrics that sent at least one data point within the last four weeks.

To make search easier, you can
* Drill down and go up the hierarchy.
* Filter by source.
* Hide and redisplay metrics or groups of metrics to unclutter your page.

{% include tip.html content="If you select **Browse > Delta Counters** you can use the same browser to examine [delta counters](delta_counters.html)." %}

![metrics browser with pointers to folder & chart icon for selection, source filter, and info button which displays sources and point tags for a metric](images/metrics_browser.png)

### Examine Metrics

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<strong>To examine metrics</strong>
<ol>
<li>Select <strong>Browse > Metrics</strong></li>
<li>Select folder icons to drill down to individual metrics.</li>
<li>With a metric selected, click <strong>Expand Info</strong> to show sources and point tags for that metric.</li>
<li>Click the metric name to show a chart with that metric.</li>
</ol></td>
<td width="40%"><img src="/images/browse_metrics.png" alt="browse metrics"></td>
</tr>
</tbody>
</table>


## Hide and Redisplay Metrics

You can manually hide metrics from the Metrics browser. Those metrics become unavailable from the auto-complete menu as well. Manually hiding metrics does not permanently delete a metric or metric namespace.

{% include shared/permissions.html entity="metrics" entitymgmt="Metric" %}

{% include tip.html content="While hidden metrics are removed from the autocomplete dropdown, those metrics can still be used in a query as long as data points exist." %}

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<strong>To hide one or more metrics:</strong>
<ol>
<li>Select <strong>Browse > Metrics</strong></li>
<li>Click the <strong>Manage Hidden Metrics</strong> button</li>
<li>In the dialog type a complete metrics name (e.g. <code>requests.latency</code>) or a metric prefix (e.g. <code>requests.</code>, <code>cpu.loadavg.</code>).
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
<li>Select <strong>Browse > Metrics</strong></li>
<li>Click the <strong>Manage Hidden Metrics</strong> button.</li>
<li>Click the <strong>Unhide</strong> button to the right of the metric or metric prefix to unhide and click <strong>Save</strong>.</li>
</ol>
The selected metrics and metric prefixes appear again as long as they have had at least 1 reported data value in the last 4 weeks. </td>
<td width="40%"><img src="images/viewing_hidden_metrics.png" alt="view hidden metrics"></td>
</tr>
</tbody>
</table>

## Learn More!

* [Optimizing the Data Shape to Improve Performance](optimize_data_shape.html)
* See the KB article [Migrating Objects or Data Between Environments](https://help.wavefront.com/hc/en-us/articles/360053164791-Migrating-Objects-or-Data-Between-Tanzu-Observability-Environments) if your company has several Wavefront instances.
