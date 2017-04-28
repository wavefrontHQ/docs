---
title: Wavefront Data Naming
keywords: data
tags: [data]
sidebar: doc_sidebar
permalink: wavefront_data_naming.html
summary: Learn about best practices for naming data sent to Wavefront and naming Wavefront entities.
---
There are different places where you can express your data schema&mdash;metric names, source names, and point, alert, event, and source tags. How should you be using these fields? While Wavefront doesn't place any restrictions on usage (there are restrictions on what characters can be used in metrics and tags), here are some common best practices when naming these entities:

- **Metric names** should reflect a class of comparable data across different sources or different points. There are exceptions, such as when you have pre-aggregated data (such as total datacenter power usage, or business analytics that are reported out of a 3rd party system), but most system- and application-level metric names should be mappable to sources.
  - `cpu.idle` is a good metric name because you can reasonably compare it across different sources, visualize them together, etc.
  - `cpu.idle.source124` is a poor metric name because it's tied to a single source, and can't be compared across different sources.
  - `dc.power.usage` is a good metric name because you can compare power usage across different data centers (as long as you send the various datacenter names in as the source names).
- **Source names** should reflect a unique entity that is emitting metrics. Wavefront assumes that source names are unique in order to show you the full list of sources, do default queries, etc. For example, if you have the same machine name in different data centers, and don't separate them when sending data to Wavefront (for example, by prefixing the source names with the datacenter), you will often get confusing results on simple queries, like time series that oscillate between different values seemingly randomly, or unexpected averaging of points between the multiple sources. If you have higher-level pre-aggregated data (for example, a datacenter-wide metric like power usage), you could use the name of the datacenter as well.
- **Point tags** represent conceptual attributes tied to a data point and change quite frequently (< 1 month), perhaps going back and forth over several values at any given time. For example, the front-end client service making a given set of requests, or the underlying physical server that the data is coming from (if source is being used to describe the source name of the virtual machine). Also see [Point Tags in Queries](query_language_point_tags.html). Here are some use cases for point tags:
  - A back-end service that handles requests from two different client pools and you want to view the back-end request data for one of those clients.
  - You send data with the source name of the virtual machine, but also want to record what physical server that VM was running on at the time, and the VM shifts from one physical server to another every few days.
  - You run two instances of the same application on the same source and want to differentiate the metrics for the two instances.
- **Alert, event, and source tags** represent conceptual attributes that can be tied to an alert, event, or source and change at very infrequent (> 1 month) intervals. For example, the specific hardware on a source, the geographical location, perhaps the role of a source (production vs. staging vs. development), or the version of application software of that source (such as the JVM version, or OS version, or proprietary application version).  Alert, event, and source tags (or _entity_ tags) can be attached to multiple alerts, events, and sources.  You can add and remove such tags through API calls or through the Alert, Event, and Sources pages and use them in queries to select groups of related entities.

  Wavefront does not retain the history of alert, event, and source tags. For example, the machine `web004.pax.wavefront.com` might have the source tags `java-17`, `build-24`, and `dc-pax`. If you remove the `build-24` tag from `web004.pax.wavefront.com` and replace it with the `build-25`, queries filtered by `build-24` will no longer match web004.pax.wavefront.com. In other words, only current alert, event, and source tags affect queries because these tags are tied only to those entities, not to data.

For more information on tags, see [Organizing with Tags](tags_overview.html).
