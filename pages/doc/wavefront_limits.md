---
title: Limits and Best Practices
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_limits.html
summary: Limits and recommendations to promote efficient resource use.
---
For best performance and cost reduction, Wavefront supports limits. Some limits are recommendations--if your environment exceeds the limits, you'll see significant performance issues. Other limits result in an error if you exceed the limit.

{% include note.html content="If you see errors because of limits, get in touch. You might need changes to the sizing your your cluster or to your approch to querying. " %}


## Concurrent Query Limits

Starting with release 2020.22x, Wavefront enforces the following concurrent query limits. The limits are subject to change without notice.

-	**Per Customer Concurrent Query Limit**. Starting with release 2020.22.x, Wavefront enforces a limit on concurrent queries for each customer cluster. The default is 1000. If you are getting repeated errors that your cluster is exceeding this limit, contact us.

-	**Per User Concurrent Query Limit**. Starting with release 2020.22.x, Wavefront enforces a limit on per-user concurrent queries. The default limit is 100. Contact us if you believe that the setting doesn’t make sense for one of your users (for example, one of your processes) and we’ll discuss options with you.

- **Per Query Server Concurrent Query Limit**  ??Should customers see errors related with this??

<!---From Data Format topic, remove there if we want to keep this here--->
## Wavefront Data Format Best Practices

Follow best practices for improved query execution speed and meaningful results.

* Make the metrics the most stable part of your data:
  - Do not include source names in the metric name. Wavefront captures sources separately.
  - Do not include data or timestamps in the metric name. Each point has an associated timestamp.
* Aim for a metric hierarchy:
  - Partition the top level of the metric hierarchy by including at least one dot.
  - Organize metric names in a meaningful hierarchy from most general to most specific (i.e. `system.cpu0.loadavg.1m` instead of `1m.loadavg.cpu0.system`)
* For best performance, keep the number of distinct time series per metric and host to under 1000.

See [Wavefront Data Naming](wavefront_data_naming.html) for more best practices.

## More Info

You can examine what's going on with your cluster in several ways:

* [Monitor and troubleshoot your Wavefront instance](wavefront_monitoring.html)
* [Examine ingestion breakdown and export usage data](ingestion_policies.html)
* [Use Wavefront Top or Spy to Investigate Traffic](wavefront_monitoring_spy.html)
