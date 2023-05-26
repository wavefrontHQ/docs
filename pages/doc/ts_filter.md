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
filter(<tsExpression>, <filter1> [and|or [not] <filter2>] ... )

where <filterN> is:
    <metricName> | source="<sourceName>" | <pointTagKey>="<pointTagValue>" | sourceTags
```
Filters the expression to display only the time series that match one or more filters, which might be any combination of metric names, source names, or point tags.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="40%">Parameter</th><th width="60%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series you want to filter.</td>
</tr>
<tr>
<td>&lt;metricName&gt;&vert;source=&vert;tag=&vert;&lt;pointTagKey&gt;&vert;sourceTags</td>
<td markdown="span">A metric, source, source tag, or point tag to filter by. You must specify at least one filter, which can be of any type. Use Boolean operators to combine multiple filters. For example, <br>**(source=app-1 or source=app-2) and env=dev**.</td></tr>
</tbody>
</table>

## Description

The `filter()` function filters the expression to display only the time series that match the specified metric, source, point tag, or combination of these filters.

`filter()` is similar to `retainSeries()`, but does not support matching a source tag.

The advantage of using `filter()` is that it's very clear that the filtering is going on; that helps other users understand your query.


### Point Tag Filters

Use point tags to add extra dimensions to individual data values. While source tags are great for filtering your data to just the sources that are important to your use case, they do not store historical data. If your company uses a cloud-computing platform, then you might see instances constantly being re-provisioned as they are spun up and shut down. In those cases, historical data can be very important.

Point tags are tied to individual data values, and allow you to create queries based on historical data. Point tags are expressed as `<pointTagKey> = <pointTagValue>`. The `pointTagKey` and `pointTagValue` are unique to each customer. For example, let’s say that source `app-1` is reporting data values for application `BLUE` to metric `cpu.loadavg.1m`. However the next day `app-1` is re-provisioned and is now reporting data values for application `RED`. The data values reported by `app-1` can include a `pointTagKey` of  `app` and a `pointTagValue` of `red` and `blue`. You could then construct the following query to only see data values for application `blue`:
```
ts(“cpu.loadavg.1m”, source=“app-1” and app=“blue”)
```

### Source Tag Filters

Without using `filter()` you can focus your search using `sourceTags` like this:

```
sum(ts(collector.points.reported, tag=prod and (tag=sf or tag=ny)), sourceTags)
```

This query returns the sum for all time series with points that are tagged with `prod` and also with either `sf` or `la`, and groups the result by source tag, so you see 3 lines, one for each tag.

If you only want to see the `sf` and `la` lines (don't want to see the `prod` tag) you can fine-tune the query by using `filter()` and including `not` with the `sourceTags` filter:

```
filter(sum(ts(collector.points.reported, tag=prod and (tag=sf or tag=ny)), sourceTags), not tag=prod)
```


## Examples

The following example filters the disk space used metrics to show only the data for certain sources. We use a wildcard character to get both app-2 and app-20 `app-2*`.

The advantage of using `filter()` is that it's very clear that the filtering is going on; that helps other users understand your query.

![filter example](images/ts_filter.png)
