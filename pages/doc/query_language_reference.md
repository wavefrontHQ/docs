---
title: Wavefront Query Language Reference
keywords: query language, queries, functions, expressions, operators, variables, aggregations, conditional, rounding, missing data, metadata, mathematical, event
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_reference.html
summary: Learn about the query syntax, operators, and functions supported by Wavefront Query Language.
---
## Query Elements
<table style="width: 100%;">
<colgroup>
<col width="15%" />
<col width="85%" />
</colgroup>
<thead>
<tr>
<th>Term</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><span style="color:#3a0699;font-weight:bold">metric</span></td>
<td>The name of a metric. For example: <code>cpu.load.metric</code>
</td></tr>
<tr>
<td><span style="color:#3a0699;font-weight:bold">source</span></td>
<td>Source (usually host) that emitted the metric. Specify source names with the keyword <strong><code>source</code></strong>.
For example:
<pre>source=appServer15</pre>
</td></tr>
<tr>
<td><span style="color:#3a0699;font-weight:bold">source tag</span></td>
<td>A type of source metadata. Specify source tags with the keyword <strong><code>tag</code></strong>.
For example: <pre>tag=app.*</pre>
</td></tr>
<tr>
<td><span style="color:#3a0699;font-weight:bold">point tag</span></td>
<td>A type of custom metric metadata. Point tags have keys and values.
For example: <pre>region=us-west-2b</pre>
</td></tr>
<tr>
<td><span style="color:#3a0699;font-weight:bold">timeWindow</span></td>
<td>A measure of time, expressed as an integer number of units. You can specify:
<ul>
<li>Seconds, minutes, hours, days or weeks (1s, 1m, 1h, 1d, 1w). For example, <strong>3h</strong> specifies 3 hours.</li>
<li> Time relative to the window length of the chart you are currently looking at (1vw).
If you are looking at a 30 minute window, <strong>1vw</strong> is one view-window length, and therefore equivalent to <strong>30m</strong>. </li>
<li>Time relative to the bucket size of the chart (1bw). Wavefront calculates bucket size based on the view window length and screen resolution. You can see bucket size at the bottom left of each chart.</li>
</ul>
The default unit is minutes if the unit is not specified.
</td></tr>
<tr>
<td><span style="color:#3a0699;font-weight:bold">expression</span></td>
<td>An expression consisting of a ts() expression, constant, or combination of ts() expressions and constants. See
 <a href="#expressions">Expressions</a>.
</td></tr>
</tbody>
</table>

See [Organizing with Tags](tags_overview.html) for information on the different types of tags and how to use them.

**Note**: Do not use names of functions such as `default` or `sum` or other query language elements to name a metric, source, source tag, point tag, or point tag value. If you must, surround the element with double quotes. For example, if you're using a point tag named `default`, use `"default"`.

## Expressions
An <span style="color:#3a0699;font-weight:bold">expression</span> may be a ts() expression, a constant, or an arithmetic or Boolean combination of a ts() expressions and constants.
<table style="width: 100%;">
<colgroup>
<col width="15%" />
<col width="85%" />
</colgroup>
<thead>
<tr>
<th>Term</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><span style="color:#3a0699;font-weight:bold">ts() expression</span></td>
<td>
Returns all points that match a metric name, filtered by source names, alert names, source tags, alert tags, and point tags.
<ul>
<li>
Syntax:
<pre>ts(&lt;metricName&gt;,
  [<strong>source=</strong>&lt;sourceName&gt;] [and|or]
  [<strong>tag</strong>=&lt;sourceTagName&gt;] [and|or]
  [&lt;<strong>pointTagKey1</strong>&gt;=&lt;pointTagValue1&gt;[and|or] ... &lt;<strong>pointTagKeyN</strong>&gt;=&lt;pointTagValueN&gt;])
</pre>
</li>
<li markdown="span">For metric, source, source tag, and point tag naming conventions, see [Wavefront Data Format](wavefront_data_format.html).</li>
<li>Sources, source tags, alert names, alert tags, and point tags are optional. For example, to return points from all sources sending the <strong>my.metric</strong> metric, specify ts(<strong>my.metric</strong>).</li>
</ul>
</td>
</tr>

<tr>
<td><span style="color:#3a0699;font-weight:bold">constant</span></td>
<td>
A number such as <code>5.01</code>, <code>10000</code>, or <code>40</code>. Constants can be plotted by themselves and composed in <strong>expressions</strong> using arithmetic operators.
<ul>
<li markdown="span"> You can use [SI prefixes](https://en.wikipedia.org/wiki/Metric_prefix)(k, M, G, T, P, E, Z, Y) to scale constants by multiples of 1000.  G (billion) and T (trillion) are useful when working with network and I/O metrics. </li>
<li>Example. Typing <code>1M</code> is equivalent to typing <code>1000000</code></li>
<li>Example. Typing <code>7.2k</code> is equivalent to typing <code>7200</code></li>
</ul>
</td>
</tr>

<tr>
<td><span style="color:#3a0699;font-weight:bold">wildcard</span></td>
<td>
Matches strings in metric names, source names, alert names, source tags, alert tags, and point tags.
<ul>
<li>A wildcard is represented with a <strong>"&#42;"</strong> character. Wavefront supports no other wildcard characters. </li>
<li>Example. When filtering sources, match all sources starting with <code>"app-1"</code> (namely, <code>app-10</code>, <code>app-11</code>, <code>app-12</code>, and so on):
<pre>source=app-1&#42;</pre> </li>
<li>Example. When filtering point tags, match the time series that have <code>&lt;pointTagKey&gt;</code> with any value, and filter out any time series without <code>&lt;pointTagKey&gt;</code>:
<pre>&lt;pointTagKey&gt;="&#42;"</pre> </li>
<li>Example. When filtering point tags, find any time series that do not have the specified point tag.
<pre>not &lt;pointTagKey&gt;="&#42;"</pre></li>
</ul>
</td>
</tr>
</tbody>
</table>

## Operators

All operations between expressions are subject to the matching processes described in [Series Matching](query_language_series_matching.html)​. The result is always interpolated.

<ul>
<li>Boolean operators - combine ts() expressions and constants and the filtering performed by source names, alert names, source tags, alert tags, and point tags.</li>
<ul>
<li markdown="span">`and`: Returns 1 if both arguments are nonzero. Otherwise, returns 0.</li>
<li markdown="span">`or`: Returns 1 if at least one argument is nonzero. Otherwise, returns 0. </li>
<li markdown="span">`not`: Use this operator to exclude a source, tag, or metric. See the examples below.</li>
<li markdown="span">`[and]`, `[or]`: Perform strict 'inner join' versions of the Boolean operators. Strict operators match metric|source|point tag combinations on both sides of the operator and filter out unmatched combinations.</li></ul>
<li>Arithmetic operators</li>
<ul><li markdown="span">`+`, `-`, `*`, `/`: Match metric, source, and point tag combinations on both sides of an <span style="color:#3a0699;font-weight:bold">expression</span>. If either side of the <span style="color:#3a0699;font-weight:bold">expression</span> is a 'singleton' -- that is, a single metric, source, or point tag combination--it automatically matches up with every element on the other side of the <span style="color:#3a0699;font-weight:bold">expression</span>.</li>
<li markdown="span">`[+]`, `[-]`, `[*]`, `[/]`: Perform strict 'inner join' versions of the arithmetic operators. <span>Strict operators match metric|source|point tag combinations on both sides of the operator and filter out unmatched combinations.</li></ul>
<li>Comparison operators</li>
<ul><li markdown="span">`<`, `<=`, `>`, `>=`, `!=`, `=`: Returns 1 if the condition is true. Otherwise returns 0. Double equals (==) is not a supported Wavefront operator.</li>
<li markdown="span">`[<]`, `[<=]`, `[>]`, `[>=]`, `[=]`, `[!=]`: Perform strict 'inner join' versions of the comparison operators. Strict operators match metric|source|point tag combinations on both sides of the operator and filter out unmatched combinations.</li></ul>
<li>Examples</li>
<ul>
<li markdown="span">`(ts(my.metric) > 10) and (ts(my.metric) < 20)` returns 1 if `my.metric` is between 10 and 20. Otherwise, returns 0.</li>
<li markdown="span">`ts(cpu.load.1m, tag=prod and tag=db)` returns `cpu.load.1m` for all sources tagged with both `prod` and `db`.</li>
<li markdown="span">`ts(db.query.rate, tag=db and not source=db5.wavefront.com)` returns `db.query.rate` for all sources tagged with `db`, except for the `db5.wavefront.com` source.</li>
<li markdown="span">`ts("smp-fax*.count" and not "smp-fax*.metrics.wavefront.", source="-eq*"` returns all metrics that match `"smp-fax*.count"` except for those matching `"smp-fax*.metrics.wavefront.*"` for any sources that start with `-eq`.</li>
</ul>
</ul>

## Tags in Queries
Tags can help you organize your data and filter them, either in the UI or in a query. Here's an overview. See [Organizing with Tags](tags_overview.html) for details.
* Source tags allow you to group sources. For example, if you have two sources, `appServer15` and `appServer16` you can add the source tag `app` to both sources to specify that both are app servers.  You can then query `ts(cpu.load.metric, tag=app)` instead of `ts(cpu.load.metric, source=appServer15 or source=appServer16)`
* Point tags are an additional way to describe metrics. For example, assume your data include the point tag `region` with value `us-west-2a` and `us-west-2b`.
* Alert tags allow you to group alerts.

## Variables in Queries
We support variables in several ways:
* A *query line variable* allows you to refer to a query line as a variable in another query field within the same chart. The query line variable name is the same as the query line name and is referenced in another query field with the syntax `${queryLineName}`. For example, if you have a query line named `queryLine1` with `ts(requests.latency)` as the expression, you can enter `${queryLine1}` in a another query field to reference `ts(requests.latency)`. The query line being referenced must be a complete expression. If a query line variable and dashboard variable have the same name, the query line variable overrides the dashboard variable.
* An *alias* defines any ts() expression as an alias within that single query line using a SQL-style "as" expression. The syntax of an alias is: expression as `<aliasName>`. If you specify expression as `myAlias`, you reference the alias as `$myAlias`. You can use `$myAlias` multiple times in that query line, and define multiple aliases within a query line.
  - Use names that are three letters or longer.
  - You can't use the SI prefixes (such as k, G, or T) as alias names.
  - Numeric characters are allowed only at the end of the alias name (`$test123` is ok, but `$1test` or `$test4test` is not).
* A *dashboard variable* can be used within any query line in every chart contained in a specific dashboard. A dashboard variable can replace any string of text--in contrast, a query line variable and alias must be a complete expression. If you define `dashvar` in a dashboard, you refer to `${dashvar}` within any query line. You can use aliases, query line variables, and dashboard variables in the same query line. You can even use the same variable name for a dashboard and an alias (though we don't recommend it). See [Dashboard Variables](dashboards_variables.html).

<span id="aggregate"></span>

## Aggregation Functions
Aggregation functions are a way to combine (aggregate) multiple time series into a single result series. Wavefront provides two types of aggregation functions differ in how they handle data points that do not line up:
* Standard aggregation functions interpolate values wherever necessary in each input series. Then the aggregation function itself is applied to the interpolated series.
* Raw aggregation functions do not interpolate the underlying series before aggregation.

All aggregation functions provide parameters for filtering the set of input series, as well as 'group by' parameters for returning separate results for groups of input series that share common metric names, source names, source tags, point tags, and point-tag values.

See [Aggregating Data Values Across Time Series](#aggregating-data-values-across-time-series).

<table style="width: 100%;">
<colgroup>
<col width="45%" />
<col width="55%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="ts_sum.html">sum(<strong>&lt;expression&gt;</strong> &lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong> &rbrack;)</a></td>
<td>Returns the sum of the time series described by <strong>expression</strong>.
The results might be computed from real reported values and interpolated values.</td>
</tr>
<tr>
<td><a href="ts_rawsum.html"> rawsum(<strong>&lt;expression&gt;</strong> &lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the raw sum of the time series described by <strong>expression</strong>.
The results are computed from real reported data values only, with no interpolated values.</td>
</tr>
<tr>
<td><a href="ts_avg.html"> avg(<strong>&lt;expression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the average (mean) of the time series described by <strong>expression</strong>.
The results might be computed from real reported values and interpolated values.  </td>
</tr>
<tr>
<td><a href="ts_rawavg.html"> rawavg(<strong>&lt;expression&gt;</strong> &lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the raw average (mean) of the time series described by <strong>expression</strong>.
The results are computed from real reported data values only, with no interpolated values. </td>
</tr>
<tr>
<td><a href="ts_min.html"> min(<strong>&lt;expression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the lowest value across the time series described by <strong>expression</strong>. The results might be computed from real reported values and interpolated values.  </td>
</tr>
<tr>
<td><a href="ts_rawmin.html"> rawmin(<strong>&lt;expression&gt;</strong>&lbrack;,<strong> metrics|sources| sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the lowest value across the time series described by <strong>expression</strong>. The results are computed from real reported data values only, with no interpolated values. </td>
</tr>
<tr>
<td><a href="ts_max.html"> max(<strong>&lt;expression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the highest value across the time series described by <strong>expression</strong>. The results might be computed from real reported values and interpolated values. </td>
</tr>
<tr>
<td><a href="ts_rawmax.html"> rawmax(<strong>&lt;expression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the highest value across the time series described by <strong>expression</strong>. The results are computed from real reported data values only, with no interpolated values. </td>
</tr>
<tr>
<td><a href="ts_count.html">count(<strong>&lt;expression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the number of reporting time series described by <strong>expression</strong>,
where a time series is counted as reporting even if it has interpolated values. </td>
</tr>
<tr>
<td><a href="ts_rawcount.html"> rawcount(<strong>&lt;expression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the number of reporting time series described by <strong>expression</strong>, where a time series is counted as reporting at a given moment only if it has a real data value, instead of an interpolated value. </td>
</tr>
<tr>
<td><a href="ts_variance.html"> variance(<strong>&lt;expression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the variance based on the time series described by <strong>expression</strong>.
The results might be computed from real reported values and interpolated values.  </td>
</tr>
<tr>
<td><a href="ts_rawvariance.html"> rawvariance(<strong>&lt;expression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the variance across the time series described by <strong>expression</strong>. The results are computed from real reported data values only, with no interpolated values. </td>
</tr>
<tr>
<td><a href="ts_percentile.html"> percentile(<strong>&lt;percentage&gt;</strong><strong>&lt;expression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the estimated percentile for the specified <strong>percentage</strong>, across the time series described by <strong>expression</strong>.
The results might be computed from real reported values and interpolated values.</td>
</tr>
<tr>
<td><a href="ts_rawpercentile.html"> rawpercentile(<strong>&lt;percentage&gt;</strong>,<strong>&lt;expression&gt;</strong>&lbrack; ,<strong>metrics|sources| sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the estimated percentile for the specified <strong>percentage</strong>, across the time series described by <strong>expression</strong>.
The results are computed from real reported data values only, with no interpolated values. </td>
</tr>
</tbody>
</table>



<span id="filter"></span>

## Filtering and Comparison Functions
<table style="width: 100%;">
<colgroup>
<col width="33%" />
<col width="67%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td markdown="span"><a href="ts_highpass.html"> highpass(<strong>&lt;expression1&gt;</strong>, <strong>&lt;expression2&gt;</strong>[, inner])</a></td>
<td>Returns only the points in <strong>expression2</strong> that are above <strong>expression1</strong>. <strong>expression1</strong> can be a constant.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_lowpass.html"> lowpass(<strong>&lt;expression1&gt;</strong>, <strong>&lt;expression2&gt;</strong>[, inner])</a></td>
<td>Returns only the points in <strong>expression2</strong> that are below <strong>expression1</strong>. <strong>expression1</strong> can be a constant.</td>
</tr>
<tr>
<td><a href="ts_min.html">min(<strong>&lt;expression1&gt;</strong>, <strong>&lt;expression2&gt;</strong>)</a></td>
<td>Returns the lower of the two values in <strong>expression1</strong> and <strong>expression2</strong>. For example: <strong>min(160, ts(my.metric))</strong> returns 160 if <strong>my.metric</strong> is &gt; 160. If <strong>my.metric</strong> is &lt; 160, returns the value of <strong>my.metric</strong>.</td>
</tr>
<tr>
<td><a href="ts_max.html">max(<strong>&lt;expression1&gt;</strong>, <strong>&lt;expression2&gt;</strong>)</a></td>
<td>Returns the higher of the two values in <strong>expression1</strong> and  <strong>expression2</strong>. For example: <strong>max(160, ts(my.metric))</strong> returns 160 if <strong>my.metric</strong> is &lt; 160. If <strong>my.metric</strong> is &gt; 160, returns the value of <strong>my.metric</strong>.</td>
</tr>
<tr>
<td><a href="ts_between.html">between(<strong>&lt;expression&gt;</strong>, <strong>&lt;lower&gt;</strong>, <strong>&lt;upper&gt;</strong>)</a></td>
<td>Returns 1 if <strong>expression</strong> is &gt;= <strong>lower</strong> and &lt;= <strong>upper</strong>. Otherwise, returns 0. This function outputs continuous time series.</td>
</tr>
<tr>
<td><a href="ts_downsample.html">downsample(<strong>&lt;timeWindow&gt;</strong>, <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the values in <strong>expression</strong> that occur in each time window. For example: <strong>downsample(30m, ts(my.metric))</strong> returns the values of <strong>my.metric</strong> every half hour.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_align.html"> align(<strong>&lt;timeWindow&gt;</strong>,<strong>[mean|median|min|max|first|last|sum|count,]</strong> <strong>&lt;expression&gt;</strong>)</a></td>
<td>Groups the data values of a time series into buckets of size <strong>timeWindow</strong>, and returns one displayed value per bucket. Each returned value is the result of combining the data values in a bucket using the specified summarization method.</td>
</tr>
<tr>
<td><a href="ts_topk.html">topk(<strong>&lt;numberOfTimeSeries&gt;</strong>,  <strong>[mean|median|min|max|sum|count, [&lt;timeWindow&gt;,]]</strong> <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the top <strong>numberOfTimeSeries</strong> series described by <strong>expression</strong>. Ranking for a series is based on its last displayed data value or on data values summarized over a time window.</td>
</tr>
<tr>
<td><a href="ts_bottomk.html">bottomk(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>[mean|median|min|max|sum|count, [&lt;timeWindow&gt;,]]</strong> <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the bottom <strong>numberOfTimeSeries</strong> series described by <strong>expression</strong>. Ranking for a series is based on its last displayed data value or on data values summarized over a time window.</td>
</tr>
<tr>
<td><a href="ts_top.html">top(<strong>&lt;numberOfTimeSeries&gt;</strong>,  <strong>[mean|median|min|max|sum|count, [&lt;timeWindow&gt;,]]</strong> <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns 1 for the top <strong>numberOfTimeSeries</strong> series described by <strong>expression</strong>, and 0 for the remaining series. Ranking for a series is based on its last displayed data value or on data values summarized over a time window.</td>
</tr>
<tr>
<td><a href="ts_bottom.html">bottom(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>[mean|median|min|max|sum|count, [&lt;timeWindow&gt;,]]</strong> <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns 1 for the bottom <strong>numberOfTimeSeries</strong> series described by <strong>expression</strong>, and 0 for the remaining series. Ranking for a series is based on its last displayed data value or on data values summarized over a time window.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_filter.html">filter(<strong>&lt;expression&gt;</strong> <strong>[, &lt;metric&gt;|source=|tagk=]</strong>)</a></td>
<td>Retains only the time series in  <strong>expression</strong> that match the specified metric, source, or point tag. No key is required to filter a time series. <strong>filter()</strong> is similar to <strong>retainSeries()</strong>, but does not support matching a source tag.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_retainSeries.html">retainSeries(<strong>&lt;expression&gt; [, &lt;metric&gt;|source=|tag=|tagk=]</strong>)</a></td>
<td>Retains only the time series in <strong>expression</strong> that match the specified metric, source, source tag, or point tag. No key is required to retain a time series. </td>
</tr>
<tr>
<td markdown="span"><a href="ts_removeSeries.html">removeSeries(<strong>&lt;expression&gt; [, &lt;metric&gt;|source=|tag=|tagk=]</strong>)</a></td>
<td>Suppresses any time series in <strong>expression</strong> that matches the specified metric, source, source tag, or point tag. No key is required to remove a time series.
</td>
</tr>
<tr>
<td><a href="ts_sample.html">sample(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>&lt;expression&gt;)</strong></a></td>
<td>Returns a non-random sample set of <strong>numberOfTimeSeries</strong> time series based on <strong>expression</strong>. Repeated calls display the same sample set as long as the underlying set of time series stays the same. </td>
</tr>
<tr>
<td><a href="ts_random.html">random(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns a random set of <strong>numberOfTimeSeries</strong> time series based on <strong>expression</strong>. Repeated calls always display different sample sets.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_limit.html">limit(<strong>&lt;numberOfTimeSeries&gt;[, &lt;offsetNumber&gt;],  &lt;expression&gt;</strong>)</a></td>
<td>Returns <strong>numberOfTimeSeries</strong> time series. Use the optional <strong>offsetNumber</strong> to specify an index to start with. </td>
</tr>
<tr>
<td><a href="ts_hideBefore.html"> hideBefore(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Hides data before a specified time. For example, <strong>hideBefore(10m)</strong> hides data that’s older than 10 minutes.  </td>
</tr>
<tr><td><a href="ts_hideAfter.html"> hideAfter(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Hides data after a specified time. For example, <strong>hideAfter(10m)</strong> hides data that’s newer than 10 minutes ago. </td>
</tr>
</tbody>
</table>


## Standard Time Functions
<table style="width: 100%;">
<colgroup>
<col width="33%" />
<col width="67%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="ts_rate.html">rate(&lbrack;<strong>&lt;timeWindow&gt;</strong>&rbrack;, <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the per-second change of the time series described by <strong>expression</strong>. Recommended for counter metrics that report only increasing data values over regular time intervals. Handles counter resets.</td>
</tr>
<tr>
<td><a href="ts_deriv.html">deriv(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the per-second change of the time series described by <strong>expression</strong>. Appropriate for metrics that report increasing or decreasing data values.</td>
</tr>
<tr>
<td><a href="ts_ratediff.html">ratediff(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the differences between adjacent values in each time series described by <strong>expression</strong>. Recommended for counter metrics that report only increasing data values over irregular time intervals. Handles counter resets.</td>
</tr>
<tr>
<td><a href="ts_lag.html">lag(<strong>&lt;timeWindow&gt;</strong>, <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns earlier data values from the time series described by <strong>expression</strong>, time-shifting the values by <strong>timeWindow</strong> to enable you to compare a time series with its own past behavior. </td>
</tr>
<tr>
<td><a href="ts_lead.html">lead(<strong>&lt;timeWindow&gt;</strong>, <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns later data values from the time series described by <strong>expression</strong>, time-shifting the values by <strong>timeWindow</strong> to enable you to compare a time series with its own subsequent or forecasted behavior. </td>
</tr>
<tr>
<td><a href="ts_at.html">at(<strong>&lt;timeWindow&gt;</strong>, <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns a data value reported at a particular time by the time series described by <strong>expression</strong>. The returned value is displayed continuously across the chart, so you can use it as a reference value for comparing against other queries. </td>
</tr>
<tr>
<td><a href="ts_year.html">year(<strong>&lt;timezone&gt;</strong>)</a></td>
<td>Returns the year in the specified time zone. Years are returned as 4-digit numbers in the Gregorian calendar.</td>
</tr>
<tr>
<td><a href="ts_month.html">month(<strong>&lt;timezone&gt;</strong>)</a></td>
<td>Returns the month of the year in the specified time zone. Months are returned as whole numbers from 1 (January) through 12 (December).</td>
</tr>
<tr>
<td><a href="ts_dayOfYear.html">dayOfYear(<strong>&lt;timezone&gt;</strong>)</a></td>
<td>Returns the day of the year in the specified time zone. Days of the year are returned as whole numbers from 1 to 366.</td>
</tr>
<tr>
<td><a href="ts_day.html">day(<strong>&lt;timezone&gt;</strong>)</a></td>
<td>Returns the day of the month in the specified time zone. Days of the month are returned as whole numbers from 1 to 31.</td>
</tr>
<tr>
<td><a href="ts_weekday.html">weekday(<strong>&lt;timezone&gt;</strong>)</a></td>
<td>Returns the day of the week in the specified time zone. Days of the week are returned as whole numbers from 1 (Monday) to 7 (Sunday).</td>
</tr>
<tr>
<td><a href="ts_hour.html">hour(<strong>&lt;timezone&gt;</strong>)</a></td>
<td>Returns the hour within the day in the specified time zone. Hours are returned as decimal values from 0.0 to 24.0. </td>
</tr>
<tr>
<td><a href="ts_isToday.html">isToday(<strong>&lt;timezone&gt;</strong>)</a></td>
<td>Tests for the current day in the specified time zone. Return values are 1 for times during the current day, or 0 for times before or after today. </td>
</tr>
<tr>
<td><a href="ts_timestamp.html">timestamp(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the timestamps associated with the reported data values in the time series described by <strong>expression</strong>. </td>
</tr>
<tr>
<td><a href="ts_time.html">time()</a></td>
<td>Returns the epoch seconds representing each point in time.</td>
</tr>
</tbody>
</table>

<span id="moving"></span>

## Moving Window Time Functions

Moving window time functions allow you to calculate continuous aggregation over sliding windows. For further information, see [Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html).

These functions output continuous time series, with the exception of `integral()`.

<table style="width: 100%;">
<colgroup>
<col width="33%" />
<col width="67%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="ts_mavg.html">mavg(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns the moving average of each series for the specified time window.</td>
</tr>
<tr>
<td><a href="ts_msum.html">msum(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns the moving sum of each series for the specified time window. Don't confuse this function with mcount(), which returns the <em>number of data points</em>.</td>
</tr>
<tr>
<td><a href="ts_mmedian.html">mmedian(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns the moving median of each series for the specified time window.</td>
</tr>
<tr>
<td><a href="ts_mvar.html">mvar(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns the moving variance of each series for the specified time window. </td>
</tr>
<tr>
<td><a href="ts_mcount.html"> mcount(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns the number of data points reported by each time series over the specified time window. </td>
</tr>
<tr>
<td><a href="ts_mmin.html">mmin(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns the minimum of each series for the specified time window. </td>
</tr>
<tr>
<td><a href="ts_mmax.html">mmax(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns the maximum of each series for the specified time window.</td>
</tr>
<tr>
<td><a href="ts_mpercentile.html">mpercentile(<strong>&lt;timeWindow&gt;, &lt;percentileValue&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns the <strong>percentile</strong> of each series for the specified time window. The percentile value must be greater than <strong>0</strong> and less than <strong>100</strong>. </td>
</tr>
<tr>
<td><a href="ts_mseriescount.html"> mseriescount(<strong>&lt;timeWindow&gt;, &lt;expression&gt; &lbrack;,&lt;metrics&gt; |sources|sourceTags|pointTags|&lt;pointTagKey&gt;&rbrack;</strong>)</a></td>
<td>Returns the aggregated number of series reporting during the specified time window. </td>
</tr>
<tr>
<td><a href="ts_mdiff.html">mdiff(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns the difference between the current value of the expression and the expression's value at the point in time that is <strong>timeWindow</strong> ago. This function doesn't interpolate the points before doing the subtraction.
</td>
</tr>
<tr>
<td><a href="ts_mcorr.html">mcorr(<strong>&lt;timeWindow&gt;, &lt;expression1&gt;, &lt;expression2&gt;  &lbrack;,inner&rbrack;</strong>)</a></td>
<td>Returns the moving correlation between two expressions for a specified time window.</td>
</tr>
<tr>
<td><a href="ts_integrate.html">integrate(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns the moving integration for the specified expression for the specified time window.</td>
</tr>
<tr>
<td><a href="ts_integral.html">integral(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the moving sum over time for the given expression over the time window of the current chart window.</td>
</tr>
<tr>
<td><a href="ts_flapping.html">flapping(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns the number of times a counter has reset within the specified time window.</td>
</tr>
<tr>
<td><a href="ts_any.html">any(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns 1 if the expression has been non-zero at <em>any</em> time during the specified time window. Otherwise, returns 0.</td>
</tr>
<tr>
<td><a href="ts_all.html">all(<strong>&lt;timeWindow&gt;, &lt;expression&gt;</strong>)</a></td>
<td>Returns 1 if the expression has been non-zero at <em>every</em> point in time during the time window. Otherwise, returns 0.</td>
</tr>
</tbody>
</table>


## Conditional Functions
<table style="width: 100%;">
<colgroup>
<col width="33%" />
<col width="67%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="ts_if.html">if(<strong>&lt;conditionalExpression&gt;</strong>, <strong>&lt;thenExpression&gt;</strong> &lbrack;, <strong>&lt;elseExpression&gt;</strong>&rbrack;)</a></td>
<td>Returns points from <strong>thenExpression</strong> only while <strong>conditionalExpression</strong> &gt; 0. Otherwise, returns points from <strong>elseExpression</strong>, if it is specified. <strong>conditionalExpression</strong> must evaluate to a series of numeric values, and typically includes numeric comparisons or transformations of time series. When both <strong>thenExpression</strong> and <strong>elseExpression</strong> return data, if() performs <a href="query_language_series_matching.html">series matching</a> against <strong>conditionalExpression</strong>.
</td>
</tr>
</tbody>
</table>

## Rounding Functions

<table style="width: 100%;">
<colgroup>
<col width="33%" />
<col width="67%" />
</colgroup>
<tbody>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tr>
<td><a href="ts_round.html">round(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the nearest integer for each data value in the specified time series.
</td>
</tr>
<tr>
<td><a href="ts_ceil.html">ceil(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the ceiling for the specified time series, by rounding any data values with decimals up to the next largest integer.</td>
</tr>
<tr>
<td><a href="ts_floor.html">floor(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the floor for the specified time series, by rounding any data values with decimals down to the next smallest integer.</td>
</tr>
</tbody>
</table>

## Missing Data Functions

Missing data functions allow you to interpolate missing data with points based on other points in a series.

<table style="width: 100%;">
<colgroup>
<col width="33%" />
<col width="67%" />
</colgroup>
<tbody>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tr>
<td><a href="ts_default.html">default(&lbrack;<strong>&lt;timeWindow&gt;,</strong> &rbrack;<strong>&lt;delayTime&gt;</strong> <strong>&lt;defaultValue&gt;</strong>, <strong>&lt;expression&gt;</strong>)</a>
</td>
<td>Fills in gaps in <strong>expression</strong> with <strong>defaultValue</strong> (whether that's a constant or an expression). The optional <strong>timeWindow</strong> parameter fills in the specified period of time after each existing point (for example, <strong>5m</strong> for 5 minutes). Without this argument, all gaps are filled in. The optional <strong>delayTime</strong> parameter specifies the amount of time that must pass without a reported value in order for the default value to be applied.</td>
</tr>
<tr>
<td><a href="ts_last.html">last(&lbrack;<strong>&lt;timeWindow&gt;,</strong> &rbrack; <strong>&lt;expression&gt;</strong>)</a>
</td>
<td>Fills in gaps in <strong>expression</strong> with the last known value of <strong>expression</strong>. Use the optional <strong>timeWindow</strong> parameter to fill in a specified time period after each existing point.</td>
</tr>
<tr>
<td><a href="ts_next.html">next(&lbrack;<strong>&lt;timeWindow&gt;,</strong> &rbrack; <strong>&lt;expression&gt;</strong>)</a>
</td>
<td>Fills in gaps in <strong>expression</strong> with the next known value of <strong>expression</strong>. Use the optional <strong>timeWindow</strong> parameter to fill in a specified time period before the first data point after the missing data.</td>
</tr>
<tr>
<td><a href="ts_interpolate.html">interpolate(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Fills in gaps in <strong>expression</strong> with a continuous linear interpolation of points.</td>
</tr>
</tbody>
</table>

## Metadata Functions

Metadata functions help users rename a metric, source, or create a synthetic point tag on a metric. There are three ways to formulate the alias:

- Node index - Extract a string component based on a <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span>. Components are identified by the default delimiter "." or a delimiter specified in <span style="color:#757575;font-weight:bold">delimiterDefinition</span>.
- Regular expression replacement - Identify the string using a regular expression and replacement string using a replacement pattern.
- String substitution - Replace a metric or source in an expression with a replacement string.

<table style="width: 100%;">
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="ts_aliasMetric.html"> aliasMetric(<strong>&lt;expression&gt;</strong>&lbrack;,<strong>metric|source|&lbrace;tagk,&lt;pointTagKey&gt;&rbrace;</strong>,&rbrack;&lbrack;zeroBasedNodeIndex&lbrack; delimiterDefinition&rbrack; | <strong>"&lt;regexSearchPattern&gt;", "&lt;replacementPattern&gt;" | "&lt;replacementString&gt;")</strong>&rbrack;</a></td>
<td markdown="span">Extracts a string from an existing metric name, source name, or point tag value and renames the metric in the expression with that string. If you don't specify the <strong>metric|source|{tagk, &lt;pointTagKey&gt;}</strong> parameter, it defaults to <strong>source</strong>. </td>
</tr>
<tr>
<td><a href="ts_aliasSource.html"> aliasSource(<strong>expression</strong>&lbrack;,<strong>metric|source|&lbrace;tagk,&lt;pointTagKey&gt;&rbrace;</strong>,&rbrack; &lbrack;zeroBasedNodeIndex&lbrack; delimiterDefinition&rbrack; | <strong>"regexSearchPattern", "replacementPattern" | "replacementString")</strong>&rbrack;</a></td>
<td markdown="span">Replaces one or more source names in a ts() expression with a string extracted from the metric name(s), source name(s), or point tag value(s).
</td>
</tr>
<tr>
<td><a href="ts_taggify.html"> taggify(<strong>expression</strong>,<strong>metric|source|&lbrace;tagk,&lt;pointTagKey&gt;&rbrace;</strong>,&lt;newPointTagKey&gt;, &lbrack;zeroBasedNodeIndex&lbrack; delimiterDefinition&rbrack; | <strong>"regexSearchPattern", "replacementPattern" | "replacementString")</strong>&rbrack;</a>
</td>
<td markdown="span">Lets you extract a string from an existing metric name, source name, or point tag value and create a synthetic point tag key value for that query.
</td>
</tr>
</tbody>
</table>

**Examples**

- Node index: `aliasMetric(ts(cpu.loadavg.1m, source), 1)` the extracted string is selected by node index. The metric `cpu.loadavg.1m` has 3 components. Setting `zeroBasedNodeIndex` to `1` extracts the second component (`loadavg`).
- Node index with delimiter: `cpu-loadavg-1m` sets `delimiterDefinition` to `-`.
- String substitution:
  - Original: `max(ts(customer.alerts.active), metrics)`
  - Renamed: `aliasMetric(${original}, "Total Number Of Alerts")`, replaces the metric `customer.alerts.active` with `"Total Number Of Alerts"`.

## Exponential and Trigonometric Functions
<table style="width: 100%;">
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="ts_sqrt.html">sqrt(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the square root of each data value described by the expression.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_pow.html">pow(<strong>&lt;baseExpression&gt;</strong>, <strong>&lt;exponentExpression&gt;</strong>[, inner])</a></td>
<td>Raises the base expression to the power of the exponent expression. </td>
</tr>
<tr>
<td><a href="ts_exp.html">exp(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the natural exponential for each data value described by the expression.</td>
</tr>
<tr>
<td><a href="ts_log.html">log(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the natural log of each data value described by the expression.</td>
</tr>
<tr>
<td><a href="ts_log10.html">log10(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the log base 10 of each data value described by the expression.</td>
</tr>
<tr>
<td>sin(<strong>&lt;expression&gt;</strong>), cos(<strong>&lt;expression&gt;</strong>), tan(<strong>&lt;expression&gt;</strong>),<br/>asin(<strong>&lt;expression&gt;</strong>), acos(<strong>&lt;expression&gt;</strong>),<br/>atan(<strong>&lt;expression&gt;</strong>),
atan2(<strong>&lt;y-expression&gt;, &lt;x-expression&gt;</strong>),<br/>sinh(<strong>&lt;expression&gt;</strong>), cosh(<strong>&lt;expression&gt;</strong>), tanh(<strong>&lt;expression&gt;</strong>)</td>
<td>Performs the specified trigonometric function on each data value described by the expression. <br>See <a href="ts_trig.html">Trigonometric Functions</a> for details.</td>
</tr>
<tr>
<td>toDegrees(<strong>&lt;numRadians&gt;</strong>), <br>toRadians(<strong>&lt;numDegrees&gt;</strong>)</td>
<td>Converts radians to degrees, and vice versa. <br>See <a href="ts_trig_utilities.html">Trigonometric Utility Functions</a> for details.</td>
</tr>
</tbody>
</table>

## Predictive and Histogram Functions

<table style="width: 100%;">
<colgroup>
<col width="45%" />
<col width="55%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="ts_anomalous.html">anomalous(<strong>&lt;testWindow&gt;</strong>, &lbrack;<strong>&lt;confidenceFactor&gt;</strong>,&rbrack; &lbrack;<strong>&lt;historyWindow&gt;</strong>, &lbrack;<strong>&lt;alignWindow&gt;</strong>,&rbrack;&rbrack; <strong>&lt;expression&gt;</strong>)</a>
</td>
<td>Returns the percentage of anomalous points in each time series described by the expression. Anomalous points have values that fall outside an expected range, as determined by <strong>confidenceFactor</strong>. </td>
</tr>

<tr>
<td><a href="ts_hw.html">hw(<strong>&lt;historyLength&gt;</strong>, <strong>&lt;seasonLength&gt;</strong>, <strong>&lt;samplingRate&gt;</strong>, <strong>&lt;expression&gt;</strong> &lbrack;<strong>&lt;alpha&gt;, &lt;beta&gt;, &lt;gamma&gt;</strong>&rbrack;)</a>
</td>
<td>Returns a smoothed version of each time series described by the expression, and forecasts its future points using the Holt-Winters triple exponential smoothing algorithm for seasonal data.</td>
</tr>
<tr>
<td>forecast(<strong>&lt;expression&gt;</strong>)
</td>
<td>Forecasts future data values for each time series described by the expression. The chart's bucket size affects how the amount of data used in the predictions. A larger bucket size produces faster, but less detailed, results. </td>
</tr>
<tr>
<td>hs(<strong>&lt;histogram_metric&gt;</strong>)
</td>
<td>Returns a histogram metric, which you can <a href="proxies_histograms.html#histogram-functions">query with</a> certain other query language functions. See <a href="proxies_histograms.html">Wavefront Histograms</a> for details.</td>
</tr>
</tbody>
</table>

## Event Functions

You can use event functions to [display events in charts](charts_events_displaying.html), for example, to inform other users about reasons for an event. Other event functions help you filter events, so that only events you're interested in are displayed. Some `events()` functions return synthetic events. These events are displayed by the query, but not stored in Wavefront.

See [Basic events() Queries](events_queries.html). See [Advanced events() Queries](events_queries_advanced.html) for details about the different kinds of `events()` functions.


<table style="width: 100%;">
<colgroup>
<col width="33%" />
<col width="67%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td>events(<strong>&lt;filters&gt;</strong>)</td>
<td>Returns the set of events that match <strong>&lt;filters&gt;</strong>. See <a href="events_queries.html#event-filters">Event Filters</a> for a list of available filters. The returned set of events can be passed as an argument to functions that accept events. When passed to a chart query, displays the events. The chart must contain at least 1 ts() expression for events to display.</td></tr>
<tr>
<td>count(<strong>&lt;events&gt;</strong>)</td>
<td>Converts <strong>&lt;events&gt;</strong> into a single time series, where every data point represents the number of events that started at that time minus the number of events that ended at that time. Instantaneous events are represented as a single &quot;0&quot; value: 1 started minus 1 ended (instantaneous events are defined as events having their end time equal to their start time).</td>
</tr>
<tr>
<td>ongoing(<strong>&lt;events&gt;</strong>)</td>
<td>Returns a continuous time series representing the number of ongoing events at any given moment within the query time window. See <a href="events_queries.html#when-does-an-event-query-return-events">When Does an Event Query Return Events?</a> for some background information.</td>
</tr>
<tr>
<td>closed(<strong>&lt;events&gt;</strong>)</td>
<td>Returns events that have ended and instantaneous events that occurred in the past.</td>
</tr>
<tr>
<td>until(<strong>&lt;events&gt;</strong>)</td>
<td>Returns synthetic events that start at the beginning of epoch time (Jan 1, 1970) and end where the input events start.</td>
</tr>
<tr>
<td>after(<strong>&lt;events&gt;</strong>)</td>
<td>Returns synthetic ongoing events that start the moment the input events end.</td>
</tr>
<tr>
<td>since(<strong>&lt;events&gt;</strong>)</td>
<td>Returns synthetic events with the same start time and no end time (converts all input events to ongoing events).</td>
</tr>
<tr>
<td>since(<strong>timeWindow</strong>)</td>
<td>Creates a single synthetic event that started <strong>timeWindow</strong> ago and ended &quot;now&quot;. Specify <strong>timeWindow</strong> in seconds, minutes, hours, days or weeks (e.g., <strong> 1s, 1m, 1h, 1d, 1w</strong>. Default is minutes.</td>
</tr>
<tr>
<td>timespan(<strong>startTimestamp</strong>, <strong>endTimestamp</strong>)</td>
<td>Creates a single synthetic event with the specified start and end timestamps. A timestamp can be expressed in epoch seconds or using a time expression such as "5 minutes ago". Example: timespan("5 minutes ago", "2 minutes ago").</td>
</tr>
<tr>
<td>first(<strong>&lt;events&gt;</strong>)</td>
<td>Returns a single event with the earliest start time.</td>
</tr>
<tr>
<td>last(<strong>&lt;events&gt;</strong>)</td>
<td>Returns a single event with the latest start time.</td>
</tr>
<tr>
<td>firstEnding(<strong>&lt;events&gt;</strong>)</td>
<td>Returns a single event with the earliest end time.</td>
</tr>
<tr>
<td>lastEnding(<strong>&lt;events&gt;</strong>)</td>
<td>Returns a single event with the latest end time.</td>
</tr>
</tbody>
</table>

The following example shows a query you could use to filter the events in your charts.

```
events(type=alert, name="disk space is low", alertTag=MicroService.App1.*)
```
See [Event Filters](events_queries.html#event-filters) for details on filters.

## <span id="misc"></span>Miscellaneous Functions
<table style="width: 100%;">
<colgroup>
<col width="33%" />
<col width="67%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<a href="ts_collect.html">collect(<strong>&lt;expression1&gt;</strong>, <strong>&lt;expression2&gt;</strong> &lsqb;, <strong>&lt;expression3&gt;, ...</strong>&rsqb;)</a>
</td>
<td>Returns a single ts() expression that is the combination of two or more ts() expressions.</td>
</tr>
<tr>
<td>
<a href="ts_exists.html">exists(<strong>&lt;expression&gt;</strong>)</a>
</td>
<td>Returns 1 if any time series described by the expression exists, and returns 0 otherwise.
A time series exists if it has reported a data value in the last 4 weeks.  </td>
</tr>
<tr>
<td>
<a href="ts_abs.html">abs(<strong>&lt;expression&gt;</strong>)</a>
</td>
<td>Returns the absolute value of the time series described by the expression.</td>
</tr>
<tr>
<td>
<a href="ts_random.html">random()</a>
</td>
<td>Returns random values between 0.0 and 1.0. Repeated calls display different random values.</td>
</tr>
<tr>
<td>
<a href="ts_normalize.html">normalize(<strong>&lt;expression&gt;</strong>)</a>
</td>
<td>Normalizes each time series described by the expression, so that its values are scaled between 0 and 1.0.
</td>
</tr>
<tr>
<td>
<a href="ts_haversine.html">haversine(<strong>&lt;lat1&gt;, &lt;long1&gt;, &lt;lat2&gt;,&lt;long2&gt;</strong>)</a>
</td>
<td>Returns the distance between a pair of coordinates.
</td>
</tr>
<tr>
<td><a href="ts_bestEffort.html">bestEffort(<strong>&lt;expression&gt;</strong>)</a>
</td>
<td>Wrapping any query expression in <strong>bestEffort()</strong> tells Wavefront to use conservative targets for scheduling workloads. That means we limit thread use and asynchronous operations.
</td>
</tr>
</tbody>
</table>


## Discrete Versus Continuous Time Series

Many Wavefront queries operate on and return data as one or more time series. Each time series is a unique sequence of data points that consists of a data value and a timestamp.

* A _discrete time series_ consists of data points separated by time intervals that are greater than one second. A discrete time series might have:
  * A data-reporting interval that is infrequent (e.g., 1 point per minute) or irregular (e.g., whenever a user logs in)
  * Gaps where values are missing due to reporting interruptions (e.g., intermittent server or network downtime)

* A _continuous time series_ contains one data point per second. Because Wavefront accepts and stores data at up to 1 second resolution, a continuous time series has a data value corresponding to every moment in time that can be represented on the X-axis of a chart.

For example, the following chart shows a point plot for the results of two queries. The query labeled **Discrete** returns multiple time series, each consisting of data points that occur 1 minute apart (at 9:30, 9:31, 9:32, and so on). The query labeled **Continuous** returns the constant value `160` for every second in the chart.


![discrete continuous](images/query_language_discrete_continuous.png)

A discrete time series is still discrete, even if you use a line plot to display it. The following chart shows the same queries, but with the points connected by lines in the display. (By default, gaps larger than 60 seconds would be shown as dotted lines.)

![discrete continuous lineplot](images/query_language_discrete_continuous_lineplot.png)


### Functions that Preserve Discrete Data

Most query language functions that operate on a discrete time series return a new time series that is also discrete.

Some functions operate on an input time series to produce a new series with the same number of data points at exactly the same times, but with values resulting from some calculation.  The result time series will have the same intervals and gaps as the original input time series did. For example:
* The [`floor()`](ts_floor.html) function visits each point in a given time series, rounds the point's data value down to the nearest integer, and assigns the result of that calculation to a new point with a matching timestamp.

Some functions operate on an input time series to produce a new series that has fewer data points. The points in the result series might have different timestamps, different values, or both, and the series typically has wider intervals and gaps. For example:
* The [`align()`](ts_align.html) function groups the input data points into “buckets”, and returns a new series that consists of one data point per bucket.
* The [`lowpass()`](ts_lowpass.html) function returns a new series that consists of data points that match just the input points whose values fall below a specified threshold.



### Functions that Create Continuous Data

Certain query language functions and expressions return a new time series that is guaranteed to be continuous (have one data point per second).

Some functions and expressions produce a continuous time series in which a constant value is assigned to every possible data point. For example:
* The expression `160` assigns the value `160` to every data point in a continuous result series.
* The [`at()`](ts_at.html) function obtains a value from a past data point in an input time series, and assigns that value to every data point in a continuous result series.

Some functions produce a continuous time series by calculating a value from the timestamp of each data point. For example:
* The [`dayOfYear()`](ts_dayOfYear.html) function produces a time series by correlating every second of a time line with the day of the year it falls on.

### Functions that Use Interpolation to Create Continuous Data

Certain functions produce a continuous time series by starting with data points from a discrete time series, and inserting additional points (1 per second) to fill in the intervals and gaps. You see data every second regardless of the reporting interval of the underlying input data. The process is called _interpolation_. In the following video, Wavefrount co-founder Clement Pang explains how it works:

<p><a href="https://youtu.be/9LnDszVrJs4" target="_blank"><img src="/images/v_interpolation.png" style="width: 700px;" alt="time series and interpolation"/></a>
</p>

For example:
* The [`last()`](ts_last.html) function produces a new time series that consists of the actual, reported data points from the input series, plus points that are added by interpolation between them. Each interpolated point has the same value as the last reported point before it.

Here's a point plot showing a discrete series (the red dots) and the points (blue dots) produced by applying `last()`. The points of the discrete series are reported once a minute, and the points between them are all interpolated.

![continuous last](images/query_language_continuous_last.png)

Different functions use different techniques to calculate the values of interpolated points. For example:
* When the `last()` function inserts a new point with a particular timestamp, the value assigned to that point is taken from the last actual, reported point before it.
* When the [`interpolate()`](ts_interpolate.html) function inserts a new point with a particular timestamp, the value assigned to that point is an estimate of what the input series would have reported at that time, based on the values of the actual, reported points on either side.

**Note:** Interpolation is used for different purposes by different functions. For example:
* Functions such as `last()`, `interpolate()`, and the others [summarized below](#summary-of-functions-that-return-continuous-time-series) use interpolation to fill in all gaps to produce a result series that is guaranteed to be continuous.
* Standard aggregation functions such as [`sum()`](ts_sum.html) and [`avg()`](ts_avg.html) use interpolation to fill in specific gaps in an input series before including that series in the aggregation. The result series produced by an aggregation function is normally discrete. See [Standard Versus Raw Aggregate Functions](query_language_aggregate_functions.html).

### Summary of Functions that Return Continuous Time Series

The following functions always return continuous time series, even when they operate on an input series that is discrete:

* [Moving time windows](#moving-window-time-functions) except [`integral()`](ts_integral.html).
* Missing data functions: [`default()`](ts_default.html), [`last()`](ts_last.html), [`next()`](ts_next.html), [`interpolate()`](ts_interpolate.html)
* `if()` function, when `expression` is not a constant time series.
* [`between()`](ts_between.html), [`ongoing()`](ts_ongoing.html), [`exists()`](ts_exists.html), and [`random()`](ts_random.html) functions.
* Calendar/clock standard time functions: [`year()`](ts_year.html), [`month()`](ts_month.html), [`dayOfYear()`](ts_dayOfYear.html), [`day()`](ts_day.html), [`weekday()`](ts_weekday.html), [`hour()`](ts_hour.html), [`time()`](ts_time.html)
* Constant time series functions and expressions: [`at()`](ts_at.html), [`top()`](ts_top.html), [`bottom()`](ts_bottom.html), `<number>`

## Aggregating Data Values Across Time Series

You can use aggregation functions to combine values from multiple time series. An aggregation function returns a series of data points whose values are calculated from corresponding points in two or more input time series. The function's name indicates the way each return value is calculated. For example, `sum()` returns a series of totals, `max()` returns a series of maximums, `avg()` returns a series of means, and so on.

### Filtering the Input Series
You use an expression to describe the set of time series to be aggregated. When using a ts() expression, you can include filters to narrow the set. For example, if multiple sources are reporting the metric `~sample.cpu.loadavg.1m`:
* `sum(ts(~sample.cpu.loadavg.1m))` shows the sum of the values reported for the metric from all sources.
* `sum(ts(~sample.cpu.loadavg.1m, source=app-1*))` shows the sum of the values reported for the metric, but only from sources that match `app-1*`.
* `sum(ts(~sample.cpu.loadavg.1m, source=app-1*, env=prod))` further filters the input series to those with the point tag `env=prod`.

### Aggregating Data Points That Line Up

The easiest way to see the results of an aggregation function is when all of the input series report their data points at exactly the same time. This causes the points at any given timestamp to all line up. The aggregation function operates on the values in each lineup of points, and returns each result in a point at the corresponding timestamp.

For example, consider the two time series in the following chart. The reporting interval for these series is 1 minute, and the points in these series "line up" at each 1-minute mark on the x-axis. We use a point plot to reveal the correspondences between reported points.

![agg lineup](images/query_language_agg_lineup.png)

Now we use the `sum()` function to aggregate these two time series. Each blue point produced by `sum()` is the result of adding the data values reported by the input series at the same minute.

![agg lineup sum](images/query_language_agg_lineup_sum.png)


### Aggregating When Data Points Do Not Line Up

In many cases, the set of time series you specify to an aggregation function will have data points that do _not_ "line up" at corresponding moments in time. For example:
* All input series might report data points regularly, but some might report at a longer or shorter interval than the others.
* One input series might report at irregular times that don't match the reporting times of any other input series.
* One otherwise regular input series might have gaps due to reporting interruptions (e.g., intermittent server or network downtime) which are not experienced by the other input series.

Wavefront provides two kinds of aggregation functions for handling this situation:
* [_Standard aggregation functions_](#standard-aggregation-functions-interpolation) fill in the gaps in each input series by interpolating values, and therefore operate on interpolated values as well as actual reported data points.
* [_Raw aggregation functions_](#raw-aggregation-functions-no-interpolation) do not interpolate the underlying series before aggregation, but rather operate only on actual reported data points.


### Standard Aggregation Functions (Interpolation)

To see how standard aggregation functions work, let's start with a pair of series with reporting intervals that do not line up. In the following chart, `series 1` reports once a minute, and `series 2` reports once every 2.5 minutes. Both series have data points aligned at 4:25 and again at 4:30. Between these times, we see unaligned data points -- 4 points from `series 1`, and one point (at 4:27:30) from `series 2`.

![agg mismatch](images/query_language_agg_mismatch.png)

Now we use the `sum()` function (a standard aggregation function) to aggregate these two time series. In the following chart, we see that `sum()` produces a result for _every_ moment in time that a data point is reported by _at least one_ input series. Whenever both series report a data point at the same time (for example, 4:25), `sum()` returns a data point whose value is the sum of both reported points (169.05 + 162 = 331.05).

![agg mismatch sum](images/query_language_agg_mismatch_sum.png)

The result at 4:26 is more interesting. At this moment in time, `sum()` returns the value 328.430, although there is only a single input data value (164) at that time, reported by `series 1`. `sum()` produces the return value by adding 164 to an _interpolated_ value from `series 2`. Interpolation inserts an implicit point into `series 2` at 4:26, and assigns an estimated value to that point based on the values of the actual, reported points on either side (at 4:25 and 4:27:30). `sum()` uses the estimated value (in this case, 164.43) to calculate the value returned at 4:26.

**Requirements for Interpolation**

Wavefront interpolates a value into an input time series only under the following circumstances:

* When at least one other input time series reports a real data value at the same moment in time. In our example, no values are interpolated at, say, 4:26:30, because neither input series reports a point at that time.

* When the time series has an actual reported value on either side of it. Sometimes this cannot occur, for example, when a new data point has not been reported yet at the right edge of a live-view chart. In this case, Wavefront inserts implicit points wherever needed, and assigns the last known reported value in the time series to those implicit points.
(The last known reported value must be reported within the last 15% of the query time in the chart window.)


### Raw Aggregation Functions (No Interpolation)

You can use raw aggregation functions instead of standard aggregation functions if you want the results to be based on actual reported values, without any interpolated values. For example, you might use raw aggregation results as a way of detecting when one or more input time series fail to report a value.

Let's see how the raw aggregation function `rawsum()` treats the two sample time series from the previous section. The following chart shows that `rawsum()`, like `sum()`, produces a result for _every_ moment in time that a data point is reported by _at least one_ input series.

Unlike `sum()`, `rawsum()` produces its results by adding up just the actual values at each reporting moment. At 4:26, for example, `rawsum()` returns 164.00, which is the only value reported at this time. No values from `series 2` are present at that time, and none are interpolated.

![raw agg mismatch sum](images/query_language_rawagg_mismatch_sum.png)

Whenever both series report a data point at the same time (for example, 4:25), `rawsum()` returns a data point whose value is the sum of both reported points (169.05 + 162 = 331.05).

### Grouping the Results of Aggregation

Each aggregation function accepts a 'group by' parameter that allows you to subdivide the input time series into groups, and request separate aggregates for each group. The chart displays a separate line corresponding to each group. For example, you can use a 'group by' parameter with `sum()` or `rawsum()` produce a separate subtotal for each group of time series that are reported from a common source. The chart for such a query displays one line corresponding to each source. When used without a 'group by' parameter, an aggregation function returns a single series of results.

<table>
<tbody>
<thead>
<tr><th width="20%">'Group By' Parameter</th><th width="50%">Description</th><th width="30%">Example</th></tr>
</thead>
<tr>
<td markdown="span">**metrics**</td>
<td>Group the series with the same metric name.</td>
<td markdown="span">`sum(ts(cpu.loadavg.1m), metrics)`</td>
</tr>

<tr>
<td markdown="span">**sources**</td>
<td>Group the series that are reported from the same source.</td>
<td markdown="span">`sum(ts(cpu.loadavg.1m), sources)`</td>
</tr>

<tr>
<td markdown="span">**sourceTags**</td>
<td markdown="span">Group the series that are reported from sources with the same source tag names. **A source tag is used only if it is explicitly specified in the ts() expression,** such as `prod` and `db`.</td>
<td markdown="span">`sum(ts(cpu.loadavg.1m, tag=prod or tag=db),sourceTags)`</td>
</tr>

<tr>
<td markdown="span">**pointTags**</td>
<td>Group the series by all available point tag keys.</td>
<td markdown="span">`sum(ts(cpu.loadavg.1m), pointTags)`</td>
</tr>

<tr>
<td markdown="span">**&lt;pointTagKey&gt;**</td>
<td markdown="span">Group the series with common values for a particular point tag key. Specify the point tag key by name, such as `region`.</td>
<td markdown="span">`sum(ts(cpu.loadavg.1m), region)`</td>
</tr>
</tbody>
</table>
