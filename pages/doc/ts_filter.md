---
title: filter Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_filter.html
summary: Reference to the filter() function
---
## Summary
```
filter(<expression> [, <metricName>|source=<sourceName>|tagk=<pointTagKey>])
```
Filters the expression to display only the time series that match the specified metric, source, or point tag. To filter by a particular source or point tag, specify `source=` or `tagk=`, respectively. You can specify only one filtering parameter per function call.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>Expression that you want to filter.</td>
</tr>
<tr>
<td>&lt;metricName&gt;&vert;source=&vert;tagk=</td>
<td>The metric, source or point tag to filter by. </td></tr>
</tbody>
</table>

## Description

The `filter()` function filters the expression to display only the time series that match the specified metric, source, or point tag. To filter by a particular source or point tag, specify `source=` or `tagk=`, respectively. Set `pointTagKey` to the unique point tag key to filter by.

You can specify only one filtering parameter (metric, source, or point tag) per function call. To filter by multiple parameters, use a `filter()` call for each parameter. `filter()` is similar to `retainSeries()`, but does not support matching a source tag.

<!---The following content from QL Reference - need to verify this is still true.

### Source and Source Tag Filters

Each unique metric measures the performance of one or more sources of data. When no source or source tag filters are applied to a ts() expression, the associated chart displays a data stream for each unique time series. You can limit the resulting data streams to a single reporting source using source filters, either by using `source=` as part of the `ts()` expression itself, or by using the `filter()` function. Apply quotes around the source name to avoid edge case errors.

While `source=` filters allow you to limit the resulting data to a single source, source tag filters allow you to limit the resulting data to a set of arbitrary sources. You [apply source tags](https://docs.wavefront.com/proxies_configuring.html#sending-source-tags-and-source-descriptions-through-the-wavefront-proxy) to a source from the **Sources** page or with an API call.

When you apply a source tag to a source, that source is grouped with other sources that include the same source tag. You can then use a source tag filter in a `ts()` expression by typing `tag=` followed by the name of the source tag. The data displayed on the chart updates to display only those reporting sources that are included in the specified source tag. Adding a set of quotes around the source tag name avoids edge case errors. -->


### Point Tag Filters

Use point tags to add extra dimensions to individual data values. While source tags are great for filtering your data to just the sources that are important to your use case, they do not store historical data. If your company uses a cloud-computing platform, then you might see instances constantly being re-provisioned as they are spun up and shut down. In those cases, historical data can be very important.

Point tags are tied to individual data values, and allow you to create queries based on historical data. Point tags are expressed as `<pointTagKey> = <pointTagValue>`. The `pointTagKey` and `pointTagValue` are unique to each customer. For example, let’s say that source `app-1` is reporting data values for application `BLUE` to metric `cpu.loadavg.1m`. However the next day `app-1` is re-provisioned and is now reporting data values for application `RED`. The data values reported by `app-1` can include a `pointTagKey` of  `app` and a `pointTagValue` of `red` and `blue`. You could then construct the following query to only see data values for application `blue`:
```
ts(“cpu.loadavg.1m”, source=“app-1” and app=“blue”)
```

## Examples

The following example filters the disk space used metrics to show only the data for `app-10`. The advantage of using `filter()` is that it's very clear that the filtering is going on; that helps other users understand your query.

![filter example](images/ts_filter.png)
