---
title: Wavefront Data Best Practices
keywords: data
tags: [data, best practice]
sidebar: doc_sidebar
permalink: wavefront_data_naming.html
summary: Best practices for naming data sent to Wavefront.
---
You can organize your data schema into metric names, source names, and point, alert, event, and source tags.

Wavefront doesn't place any restrictions on naming. However, you benefit from following best practices when you name Wavefront objects. See [Wavefront Data Format](wavefront_data_format.html#wavefront-data-format-fields) for details on valid characters for metric names and other names.

## Metric Names Best Practices

Metric names should reflect a class of comparable data across different sources or different points. Most system- and application-level metric names should be mappable to sources. There are exceptions such as total datacenter power usage, or business analytics that are reported out of a 3rd party system.
- `cpu.idle` is a good metric name because you can compare it across different sources, visualize them together, etc.
- `cpu.idle.source124` is a poor metric name because it's tied to a single source, and it can't be compared across different sources.
- `dc.power.usage` is a good metric name because you can compare power usage across different data centers, as long as you pass in the data center names as the source names.

Don't include a timestamp in the metric name.

## Source Names Best Practices

Source names should reflect a unique source that is emitting metrics. Wavefront assumes that source names are unique.

For example, if you have the same machine name in different data centers, and don't separate the two machines when sending data to Wavefront (for example, by prefixing the source names with the datacenter), you can get confusing query results. Time series might oscillate between different values seemingly randomly, or you might see unexpected averaging of points between multiple sources.

When it's not clear which name to use as the source name, use the most unique value for a source name. For higher-level pre-aggregated data, for example, a datacenter-wide metric like power usage, use the name of the datacenter as the name of the source.

## Point Tag Names Best Practices

Point tags represent conceptual attributes tied to a data point and change frequently (< 1 month), perhaps going back and forth over several values at any given time.  Here are some use cases for point tags:
- A back-end service handles requests from two different client pools and you want to view the back-end request data for one of those clients.
- You send data with the source name of the virtual machine, but also want to record what physical server that VM was running on. The VM shifts from one physical server to another every few days.
- You run two instances of the same application on the same source and want to differentiate the metrics for the two instances.
See [Point Tags in Queries](query_language_point_tags.html).

## Alert, Event, and Source Tag Names Best Practices

**Alert, event, and source tags** represent conceptual attributes that can be tied to an alert, event, or source and change at infrequent (> 1 month) intervals. For example, the specific hardware of a source, the geographical location, perhaps the role of a source (production vs. staging vs. development), or the version of application software of that source (such as the JVM version, or OS version, or proprietary application version).  Alert, event, and source tags (or _object_ tags) can be attached to multiple alerts, events, and sources.  You can add and remove such tags through API calls or from the Alert, Event, and Sources browser and use the tags in queries to select groups of related objects.

### Supported Characters

Tag names can contain alphanumeric (a-z, A-Z, 0-9), dash (-), underscore (_), and colon (:) characters. The space character is not supported.

### History

Wavefront does not retain the history of alert, event, and source tags. For example, the machine `web004.pax.wavefront.com` might have the source tags `java-17`, `build-24`, and `dc-pax`. If you remove the `build-24` tag from `web004.pax.wavefront.com` and replace it with `build-25`, queries filtered by `build-24` no longer match `web004.pax.wavefront.com.` In other words, only current alert, event, and source tags affect queries because these tags are tied only to those objects, not to data.

For more information on tags, see [Organizing with Tags](tags_overview.html).

## Other Data Best Practices

* [Wavefront and Cardinality](cardinality.html) has an introduction with a video.
* [Optimizing the Data Shape to Improve Performance](optimize_data_shape.html) is an in-depth discussion with examples.
* [Common Time Limits and Best Practices](limits.html) shows limits, for example, when a query times out.
* [Troubleshooting Missing Data](missing_data_troubleshooting.html) explains, for example, how you can toggle the Obsolete Metrics flag to see data that are older than 4 weeks. 
