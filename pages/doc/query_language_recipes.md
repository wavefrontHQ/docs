---
title: Query Language Recipes
keywords: query language
tags: [query language, best practice]
sidebar: doc_sidebar
permalink: query_language_recipes.html
summary: Recipes for Common Queries
---
The Wavefront Customers Success team has found that customers want certain information from their data. For example, customers are interested in the point rate received or queued, or in the moving average or moving median.

This page gives some recipes. You can generate several of these recipes interactively using the [Query Wizard](query_language_query_wizard.html). We have a separate set of [Alert Recipes](alert_recipes.html) but you can use many of queries in the recipes here in alerts.

**Note:** For improved legibility, we've included some line breaks in the query examples.

## Queries for Comparing Time Series

The following recipes show how to compare time series.

### Show Ratio Between Two Time Series

You can divide two time series to produce one series that's the ratio of the two series. This division might result in `NO DATA` if [the series dont match](query_language_series_matching.html).

The following sample query gets the ration between the bytes sent and the bytes received for `app-1`.
```
(ts(~sample.network.bytes.sent, source="app-1"))/
(ts(~sample.network.bytes.recv, source="app-1"))
```

### Correlate Time Series with Different Scale

If you want to see shape correlations between data lines of very different scale,  use `normalize()` to scale every data line so that it has a minimum of 0 and a maximum of 1.0.

The following sample query allows you to see whether there's a relationship between the CPU load and the bytes that are sent:
```
(ts(~sample.network.bytes.sent, source="app-5"))/(ts(~sample.cpu.loadavg.1m,, source="app-5"))
```

### Predict Intersection

If one time series is increasing and another is decreasing, you can predict the intersection using a function like the following:

~~~
if(abs((ts(~sample.network.bytes.sent, env="dev")) - (ts(~sample.network.bytes.recv)))
< abs(lag(1m, (ts(~sample.network.bytes.sent, env="dev")))
- lag(1m, (ts(~sample.network.bytes.recv)))), abs((ts(~sample.network.bytes.sent, env="dev"))
- (ts(~sample.network.bytes.recv)))/(abs(((ts(~sample.network.bytes.sent, env="dev"))
- lag(1m,(ts(~sample.network.bytes.sent, env="dev"))))
- ((ts(~sample.network.bytes.recv))
- lag(1m,(ts(~sample.network.bytes.recv)))))),-1)
~~~


## Queries with a Time Focus

You can calculate continuous aggregation:
* Over a sliding time window using one of the moving window functions. For example, the average for the last 24 hours.
* Over a fixed-size time window, for example, the average for each day (e.g. Jan 3, Jan 4, etc.)

You can learn about [Using Moving and Tumbling Time Windows to Highlight Trends](query_language_windows_trends.html). The focus of this section is on examples.

### Counter Resets in a Moving Time Window

To count the number of times a counter has reset within a moving time window, you can use the `flapping` function.

The following simple example shows the counter resets for network bytes sent for `app-2`.

`flapping(5m, (ts(~sample.network.bytes.sent, source=app-2)))`

### Sum of Values over X Time
Use `msum` to plot the sum of values over last 24 hours.

The following query shows the sum of the bytes received for `app-2`and `app-20`.

`msum(24h, ts(~sample.network.bytes.recv, source="app-2*"))`

### Last Data Point During X Time
At times, you might need the last data point in the past week or past day. That information can be useful when comparing time series. Use a query like the following, which returns the last number of bytes received for `app-2` during the last week.

`at("now",last(1w, ts(~sample.network.bytes.recv, source="app-2")))`

### Display the Daily Average
You display the daily average using a tumbling, not a moving time window, as in the following query (which uses some variables):

|rate|`sum(rate(ts(~proxy.points.2878.received)))`|
|mavg|`mavg(24h,${rate})`|
|daily average|`next(24h,if(hour("US/Pacific") = 0,${mavg})`|

For more details, see [Display Daily Average](query_language_windows_trends.html#display-daily-average).


## Data Pipeline Queries

Data pipeline queries allow you to determine whether data is flowing to the proxies or to the Wavefront service. You can also examine the point rate and potentially set an alert.

### Point Rate for All Proxies

Point rate per second received across all Wavefront proxies:

`sum(rate(ts(~proxy.points.*.received)))`

Point rate sent to the Wavefront service by all Wavefront proxies:

`sum(rate(ts(~proxy.points.*.received)))`

Point rate queued across all Wavefront proxies:

`sum(rate(ts(~proxy.points.*.queued)))`

Point rate blocked across all Wavefront proxies. Points might be blocked due to invalid characters, bad format, etc.

`sum(rate(ts(~proxy.points.*.blocked)))`

Total points that are collected by the Wavefront service. The `~collector` service acts as a entry point to Wavefront, and these metrics monitor the data processed at the collector.

`sum(rate(ts(~collector.points.valid)))`

### Point Rate for Each Proxy

Point rate received at each Wavefront proxy:

`sum(rate(ts(~proxy.points.*.received)),sources)`

Point rate sent to the Wavefront service by each Wavefront proxy:

`sum(rate(ts(~proxy.points.*.sent)),sources)`

Points queued at each Wavefront proxy:

`sum(rate(ts(~proxy.points.*.queued)),sources)`

Point rate blocked at each Wavefront proxy. Points might be blocked due to invalid characters, bad format, etc.

`sum(rate(ts(~proxy.points.*.blocked)),sources)`

## Queries for Examining Time Series

Wavefront supports [AI Genie](ai_genie.html) for automatic anomaly detection based on a machine learning algorithm. You can instead perform [anomaly detection with functions and statistical functions](query_language_statistical_functions_anomalies.html). This section gives some examples.

### Range

Use `between()` to determine whether a set of datapoints is in a specified range.

The following function returns 1 if CPU usage percentage for `app-2` is is equal to or between the 0 and .5. If greater than .5, it returns 0.

`between((ts(~sample.cpu.usage.percentage, source="app-2")),0,.5)`

### Variance

Use `variance()` to find out how how volatile your data is.

`variance((ts(~sample.network.bytes.sent)))`

### Top or Bottom Time Series

If you're interested in, for example, the top 3 time series or the bottom 3 time series, evaluated at the current time, use the `topk()` and `bottomk()` functions. Wavefront v2 dashboards offer a special chart to visualize the top series.

`topk(70000,(ts(~sample.network.bytes.sent, source="app-10")))`

`bottomk(30000,(ts(~sample.network.bytes.sent, source="app-10")))`

Wavefront v2 dashboards include a chart to visualize the top series. The new [read-only integration dashboards](2018.42.x_release_notes.html#aws-dashboards-preview)

![topk chart](/images/topk_chart.png)

### Rate of Change

Use `lag()` to enable comparison of an expression with its own past behavior. In effect, you timeshift an expression's data points by a specified time period.

The following example compares the bytes sent with the bytes sent 15 minutes ago:

~~~
(ts(~sample.network.bytes.sent, env="dev"))
/ lag(15m, (ts(~sample.network.bytes.sent, env="dev")))
~~~

## Queries for Standard Deviation and IQR.

We already have a page that discusses [anomaly detection with functions and statistical functions](query_language_statistical_functions_anomalies.html) in some detail. This page gives some examples.

### Standard Deviation from Self

Display the number of standard deviations that each series varies from its historic self, that is, standard deviation from the mean, like this:

~~~
((ts(~sample.network.bytes.sent, source="app-10"))
- mavg(5d, (ts(~sample.network.bytes.sent, source="app-10"))))
/ sqrt(mvar(5d, (ts(~sample.network.bytes.sent, source="app-10"))))
~~~

### Standard Deviation from All Series

Displays the number of standard deviations from the group of series. (Standard deviation from the mean) RK>>don't understand this.

```
((ts(~sample.network.bytes.sent, env="dev"))
- avg((ts(~sample.network.bytes.sent, env="dev"))))
/ sqrt(variance((ts(~sample.network.bytes.sent, env="dev"))))
```

### Interquartile Range from Self

The interquartile range (IQR) is the difference between the upper (75th percentile) and lower (25th percentile) quartiles, and describes the middle 50% of values when ordered from lowest to highest. The IQR can be a better measure of spread than the range because it is not affected by outliers. Like mean and standard deviation, median and IQR measure the central tendency and spread, but are robust against outliers and non-normal data.

The following example displays the number of IQR's each series varies from its historic self:

~~~
abs(((ts(~sample.network.bytes.sent, source="app-10"))
- mmedian(5m, (ts(~sample.network.bytes.sent, source="app-10"))))
/ (mpercentile(5m, 75, (ts(~sample.network.bytes.sent, source="app-10")))
- mpercentile(5m, 25, (ts(~sample.network.bytes.sent, source="app-10")))))
~~~

### Interquartile Range from All Series

You can display the IQR of all series, that is, of the polulation, like this:

```
abs(((ts(~sample.network.bytes.sent, env="dev"))
- percentile(50, (ts(~sample.network.bytes.sent, env="dev"))))
/ (percentile(75, (ts(~sample.network.bytes.sent, env="dev")))
- percentile( 25, (ts(~sample.network.bytes.sent, env="dev")))))
```
