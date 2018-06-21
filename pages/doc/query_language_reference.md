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
<td>The name of the entity that emitted the metric. Specify source names with the keyword <strong><code>source</code></strong>.
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

All operations between expressions are subject to the matching processes described in [Series Matching](query_language_series_matching.html)​.

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
<li markdown="span">`ts("smp-fax*.count" and not "smp-fax*.metrics.wavefront.", source="-eq*"` returns all metrics that match `"smp-fax*.count"` except for those matching `"smp-fax*.metrics.wavefront.*"`.</li>
</ul>
</ul>

## Tags in Queries
<ul>
<li>Source tags are a way to group sources together. For example, if you have two sources, <span style="color:#d63a36;font-weight:bold">appServer15</span> and <span style="color:#d63a36;font-weight:bold">appServer16</span>, you could add the source tag <span style="color:#2770e8;font-weight:bold">app</span> to both of them to specify that they are both app servers. Source tags aid in querying by grouping sources together. You can query ts(<span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, <span style="color:#2770e8;font-weight:bold">tag=app</span>) instead of ts(<span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, <span style="color:#d63a36;font-weight:bold">source=appServer15</span> or <span style="color:#d63a36;font-weight:bold">source=appServer16</span>). Both queries yield the same result as long as the <span style="color:#d63a36;font-weight:bold">app</span> tag is added to <span style="color:#d63a36;font-weight:bold">source=appServer15</span> and <span style="color:#d63a36;font-weight:bold">source=appServer16</span>.</li>
<li>Alert tags are a way to group alerts together.</li>
<li><span style="color:#3a0699;font-weight:bold">Point tags</span> are an additional way to describe metrics. An example of a point tag is <span style="color:#3a0699;font-weight:bold">region=us-west-2b</span>.</li>
<li>Example: To query a point <span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, source <span style="color:#d63a36;font-weight:bold">app2</span>, and point tag <span style="color:#3a0699;font-weight:bold">region=us-west-2b</span>, specify ts(<span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, <span style="color:#3a0699;font-weight:bold">region=us-west-2b </span>and <span style="color:#d63a36;font-weight:bold">source=app2</span>).</li></ul>

For an overview of tags, see [Organizing with Tags](tags_overview.html).

## Variables in Queries
<ul>
<li>A <em>query line variable</em> allows you to refer to a query line as a variable in another query field within the same chart. The query line variable name is the same as the query line name and is referenced in another query field with the syntax <span style="color:#008a09;font-weight:bold">${queryLineName}</span>. For example, if you have a query line named <span style="font-weight:bold">queryLine1</span> with ts(<span style="color:#08838c;font-weight:bold">requests.latency</span>) as the <span style="color:#3a0699;font-weight:bold">expression</span>, you can enter <span style="color:#008a09;font-weight:bold">${queryLine1}</span> in a another query field to reference ts(<span style="color:#08838c;font-weight:bold">requests.latency</span>). The query line being referenced must be a complete expression. If a query line variable and dashboard variable have the same name, the query line variable overrides the dashboard variable. </li>

<li>An <em>alias</em> defines any ts() expression as an alias within that single query line using a SQL-style "as" expression. The syntax of an alias is: <span style="color:#3a0699;font-weight:bold">expression</span> <span style="font-weight:bold">as</span> <span style="color:#008a09;font-weight:bold">&lt;aliasName&gt;</span>. If you specify <span style="color:#3a0699;font-weight:bold">expression</span> <span style="font-weight:bold">as</span> <span style="color:#008a09;font-weight:bold">myAlias</span>, you reference the alias as
<span style="color:#008a09;font-weight:bold">$myAlias</span>. You can use <span style="color:#008a09;font-weight:bold">$myAlias</span> multiple times in that query line, and define multiple aliases within a query line. We recommend using alias names that are three letters or longer; specifically, you can't use the SI prefixes (such as k, G, or T) as alias names, and numeric characters are allowed only at the end of the alias name ($test123 is ok, but not $1test or $test4test).<br /></li>

<li>A <em>dashboard variable</em> is a variable that can be used within any query line in every chart contained in the dashboard. A dashboard variable can replace any string of text, as opposed to a query line variable and alias which must be a complete expression. If you define <span style="color:#008a09;font-weight:bold">dashvar</span> in a dashboard, you refer to <span style="color:#008a09;font-weight:bold">${dashvar}</span> within any query line. You can use aliases, query line variables, and dashboard variables in the same query line; indeed, you can use the same variable name for a dashboard and an alias (though we don't recommend it). See <a href="dashboards_variables.html">Dashboard Variables</a>.</li></ul>

<span id="aggregate"></span>

## Aggregation and Raw Aggregation Functions
Aggregation and raw aggregation functions provide a way to combine (aggregate) multiple series into a single series. If there are gaps of data, non-raw aggregation functions first interpolate the points of the underlying set of series (up to one day) if at least 1 known value is available. Then the aggregation function iself is applied to the interpolated series. Raw aggregation functions do not interpolate the underlying series before aggregation. Raw functions aggregate data points by time buckets. For further information, see [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).


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


### Grouping and Filtering

When aggregating, you can group or filter the results.

* When you filter, you restrict the query, for example, only to certain sources. You still get one line for aggregation function. To filter, use the element to filter by inside the parenthesis.

* You can also group the results of a query and display separate lines for the different group members. For example, when grouping by source, you get one line for each source. When grouping by source tags, you get one line for each source tag that is explicitly specified in the ts() expression.

  To group an aggregation by metrics, sources, source tags, all point tags keys, or a specific point tag key, include the <br/> \[, **metrics**\|**sources**\|**sourceTags**\|**pointTags**\|<span style="font-weight:bold">&lt;pointTagKey&gt;</span>\] keyword after the ts() expression, separated by a comma.


#### Filter Example ####

`sum(ts(~sample.cpu.loadavg.1m, source=app-1*))` shows the sum of the values reported for the metric, but only from the sources that match `app-1*`.

#### Grouping Examples ####

-   Group by metrics: `sum(ts(cpu.loadavg.1m),`**`metrics`**`)`
-   Group by sources: `sum(ts(cpu.loadavg.1m),`**`sources`**`)`
-   Group by source tags: `sum(ts(cpu.loadavg.1m, tag=prod or tag=db),`**`sourceTags`**`)`
-   Group by all available point tag keys: `sum(ts(cpu.loadavg.1m),`**`pointTags`**`)`
-   Group by the `region` point tag key: `sum(ts(cpu.loadavg.1m),`**`region`**`)`

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
<td>Returns one value in <strong>expression</strong> for each time window. For example, if you are collecting data once a minute, but you want data points to be displayed every 30 minutes (summarized by median every 30 minutes), use <strong>align(30m, median, ts(my.metric))</strong>. See <a href="query_language_align_function.html">Bucketing with <code>align()</code></a>.</td>
</tr>
<tr>
<td><a href="ts_topk.html">topk(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the top <strong>numberOfTimeSeries</strong> series in <strong>expression</strong>, based on the most recent data point.</td>
</tr>
<tr>
<td><a href="ts_bottomk.html">bottomk(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the bottom <strong>numberOfTimeSeries</strong> series in <strong>expression</strong>, based on the most recent data point.</td>
</tr>
<tr>
<td><a href="ts_top.html">top(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>&lt;expression&gt;</strong>)</a></td>
<td>Displays the top <strong>numberOfTimeSeries</strong> series in <strong>expression</strong> as 1, based on the most recent data point. Displays all other series as 0. This function outputs continuous time series.</td>
</tr>
<tr>
<td><a href="ts_bottom.html">bottom(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>&lt;expression&gt;</strong>)</a></td>
<td>Displays the bottom <strong>numberOfTimeSeries</strong> series in <strong>expression</strong> as 1, based on the most recent data point. Displays all other series as 0. This function outputs continuous time series.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_filter.html">filter(<strong>&lt;expression&gt;</strong> <strong>[, &lt;metric&gt;|source=|tagk=]</strong>)</a></td>
<td>Retains only the time series in  <strong>expression</strong> that match the specified metric, source, or point tag. No key is required to filter a metric. <strong>filter</strong> is similar to <strong>retainSeries()</strong>, but does not support matching a source tag.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_retainSeries.html">retainSeries(<strong>&lt;expression&gt; [, &lt;metric&gt;|source=|tag=|tagk=]</strong>)</a></td>
<td>Retains only the time series in <strong>expression</strong> that match the specified metric, source, source tag, or point tag. No key is required to retain a metric. </td>
</tr>
<tr>
<td markdown="span"><a href="ts_removeSeries.html">removeSeries(<strong>&lt;expression&gt; [, &lt;metric&gt;|source=|tag=|tagk=]</strong>)</a></td>
<td>Suppresses any time series in <strong>expression</strong> that matches the specified metric, source, source tag, or point tag. No key is required to remove a metric.
</td>
</tr>
<tr>
<td><a href="ts_sample.html">sample(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>&lt;expression&gt;)</strong></a></td>
<td>Displays a non-random sample set of <strong>numberOfTimeSeries</strong> time series based on <strong>expression</strong>. Repeated calls will display the same sample set as long as the underlying set of time series stays the same. </td>
</tr>
<tr>
<td><a href="ts_random.html">random(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>&lt;expression&gt;</strong>)</a></td>
<td>Displays a random set of <strong>numberOfTimeSeries</strong> time series based on <strong>expression</strong>. Repeated calls always display different sample sets.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_limit.html">limit(<strong>&lt;numberOfTimeSeries&gt;[, &lt;offsetNumber&gt;],  &lt;expression&gt;</strong>)</a></td>
<td>Displays <strong>numberOfTimeSeries</strong> time series. Use the optional <strong>offsetNumber</strong> to specify an index to start with. </td>
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
<td><a href="ts_rate.html">rate(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the per-second change of the time series described by <strong>expression</strong>. Recommended for counter metrics that report only increasing data values. Automatically handles zero-resets in counters.</td>
</tr>
<tr>
<td><a href="ts_deriv.html">deriv(<strong>&lt;expression&gt;</strong>)</a></td>
<td>Returns the per-second change of the time series described by <strong>expression</strong>. Appropriate for metrics that report increasing or decreasing data values.</td>
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
<td>Returns the moving average of each series for the specified time window.<span style="color:#757575;font-weight:bold">timeWindow</span>.</td>
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
<td><a href="ts_mcount.html"> mcount(<strong>timeWindow</strong>, <strong>expression</strong>)</a></td>
<td>Returns the number of data points for the specified time window.  If <strong>expression</strong> stops reporting data, mcount() continues to return data up to 2x the duration of the time window before returning no data. </td>
</tr>
<tr>
<td><a href="ts_mmin.html">mmin(<strong>timeWindow</strong>, <strong>expression</strong>)</a></td>
<td>Returns the minimum of each series for the specified time window. </td>
</tr>
<tr>
<td><a href="ts_mmax.html">mmax(<strong>timeWindow</strong>, <strong>expression</strong>)</a></td>
<td>Returns the maximum of each series for the specified time window.</td>
</tr>
<tr>
<td><a href="ts_mpercentile.html">mpercentile(<strong>timeWindow</strong>,<strong>percentileValue</strong>, <strong>expression</strong>)</a></td>
<td>Returns the <span>percentile</span> of each series for the specified time window. The percentile value must be greater than <strong>0</strong> and less than <strong>100</strong> </td>
</tr>
<tr>
<td><a href="ts_mseriescount.html"> mseriescount(<strong>&lt;timeWindow&gt;</strong>,<strong>&lt;expression&gt;</strong>&lbrack; ,<strong>metrics|sources| sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the aggregated number of series reporting during the specified time window. </td>
</tr>
<tr>
<td><a href="ts_mdiff.html">mdiff(<strong>timeWindow</strong>, <strong>expression</strong>)</a></td>
<td>Returns the difference between the current value of the expression and value of the expression expression's value at the point in time that is <strong>timeWindow</strong> ago. This function, does not interpolate the points before doing the subtraction.
</td>
</tr>
<tr>
<td><a href="ts_mcorr.html">mcorr(<strong>timeWindow</strong>, <strong>expression1</strong>, <strong>expression2</strong>, &lbrack;,<strong>inner</strong>&rbrack;)</a></td>
<td>Returns the moving correlation between two expressions for a specified time window.</td>
</tr>
<tr>
<td><a href="ts_integrate.html">integrate(<strong>timeWindow</strong>, <strong>expression</strong>)</a></td>
<td>Returns the moving integration for the specified expression for the specified time window.</td>
</tr>
<tr>
<td><a href="ts_integral.html">integral( <strong>expression</strong>)</a></td>
<td>Returns the moving sum over time for the given expression over the time window of the current chart window. Always starts at 0 on the left side of the chart, and shows the total accumulation over the duration of the current chart window.</td>
</tr>
<tr>
<td><a href="ts_flapping.html">flapping(<strong>timeWindow</strong>, <strong>expression</strong>)</a></td>
<td>Returns the number of times a counter has reset within the specified time window.</td>
</tr>
<tr>
<td><a href="ts_any.html">any(<strong>timeWindow</strong>, <strong>expression</strong>)</a></td>
<td>Returns 1 if the expression has been non-zero at any time during the specified time window. Otherwise, returns 0.</td>
</tr>
<tr>
<td><a href="ts_all.html">all(<strong>timeWindow</strong>, <strong>expression</strong>)</a></td>
<td>Returns 1 if the expression has been non-zero at every point in time during the time window. Otherwise, returns 0.</td>
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
<td>if(<span style="color:#3a0699;font-weight:bold">expression</span>, <span style="color:#bf4b89;font-weight:bold">ThenExpression</span>, <span style="color:#08838c;font-weight:bold">ElseExpression</span>)</td>
<td>Returns <span><span style="color:#bf4b89;font-weight:bold">ThenExpression</span> if <span style="color:#3a0699;font-weight:bold">expression</span> &gt;0. Otherwise, returns <span style="color:#08838c;font-weight:bold">ElseExpression</span>. Expects a time series expression as a first argument, and, since time series are numeric, only numeric comparisons are supported. When both <span style="color:#bf4b89;font-weight:bold">ThenExpression</span> and <span style="color:#08838c;font-weight:bold">ElseExpression</span> return data, if() performs <a href="query_language_series_matching.html">series matching</a> against <span style="color:#3a0699;font-weight:bold">expression</span>.<br /><br />
Example: If <span style="color:#3a0699;font-weight:bold">expression</span> is ts(<span style="color:#08838c;font-weight:bold">my.metric</span>) &gt;= 10</span>, if (<span style="color:#3a0699;font-weight:bold">expression</span>, ts(<span style="color:#bf4b89;font-weight:bold">my.metric</span>), ts(<span style="color:#08838c;font-weight:bold">another.metric</span>)) returns ts(<span style="color:#bf4b89;font-weight:bold">my.metric</span>) only when ts(<span style="color:#08838c;font-weight:bold">my.metric)</span> &gt;= 10; when ts(<span style="color:#08838c;font-weight:bold">my.metric)</span> &lt; 10, it returns ts(<span style="color:#08838c;font-weight:bold">another.metric</span>).<br /><br />
When <span style="color:#3a0699;font-weight:bold">expression</span> and at least one of <span style="color:#bf4b89;font-weight:bold">ThenExpression</span> or <span style="color:#08838c;font-weight:bold">ElseExpression</span> is not a constant time series, this function outputs continuous time series.

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
<td>round(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the nearest whole number to <span style="color:#3a0699;font-weight:bold">expression</span>.</td>
</tr>
<tr>
<td>ceil(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Rounds up <span style="color:#3a0699;font-weight:bold">expression</span> to the next largest whole number.</td>
</tr>
<tr>
<td>floor(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Rounds down <span style="color:#3a0699;font-weight:bold">expression</span> to the next smallest whole number.</td>
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
<td markdown="span">Returns <strong>expression</strong> with the metrics renamed with a string extracted from a metric, source, or point tag value of <strong>expression</strong>. If you don't specify the <strong>metric|source|{tagk, &lt;pointTagKey&gt;}</strong> parameter, it defaults to <strong>source</strong>. </td>
</tr>
<tr>
<td><a href="ts_aliasSource.html"> aliasSource(<strong>expression</strong>&lbrack;,<strong>metric|source|&lbrace;tagk,&lt;pointTagKey&gt;&rbrace;</strong>,&rbrack; &lbrack;zeroBasedNodeIndex&lbrack; delimiterDefinition&rbrack; | <strong>"regexSearchPattern", "replacementPattern" | "replacementString")</strong>&rbrack;</a></td>
<td markdown="span">Returns <strong>expression</strong> with the sources renamed with a string extracted from a metric, source, or point tag value of <strong>expression</strong>. If you don't specify <strong>metric|source|{tagk, &lt;pointTagKey&gt;}</strong>, the parameter defaults to <strong>source</strong>.</td>
</tr>
<tr>
<td><a href="ts_taggify.html"> taggify(<strong>expression</strong>,<strong>metric|source|&lbrace;tagk,&lt;pointTagKey&gt;&rbrace;</strong>,&lt;newPointTagKey&gt;, &lbrack;zeroBasedNodeIndex&lbrack; delimiterDefinition&rbrack; | <strong>"regexSearchPattern", "replacementPattern" | "replacementString")</strong>&rbrack;</a>
</td>
<td markdown="span">Returns <strong>expression</strong> with the source renamed with a string extracted from a metric, source, or point tag value of <strong>expression</strong>. If you don't specify <strong>metric|source|sourceTags {tagk, &lt;pointTagKey&gt;}</strong>, the parameter defaults to <strong>source</strong>.</td>
</tr>
</tbody>
</table>

### Examples

- Node index: `aliasMetric(ts(cpu.loadavg.1m, source), 1)` the extracted string is selected by node index. The metric `cpu.loadavg.1m` has 3 components. Setting `zeroBasedNodeIndex` to `1` extracts the second component (`loadavg`).
- Node index with delimiter: `cpu-loadavg-1m` sets `delimiterDefinition` to `-`.
- String substitution:
  - Original: `max(ts(customer.alerts.active), metrics)`
  - Renamed: `aliasMetric(${original}, "Total Number Of Alerts")`, replaces the metric `customer.alerts.active` with `"Total Number Of Alerts"`.

## Exponential and Trigonometric Functions
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
<td>sqrt(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the square root of <span style="color:#3a0699;font-weight:bold">expression</span>.</td>
</tr>
<tr>
<td markdown="span">pow(<span style="color:#3a0699;font-weight:bold">expression</span>, <span style="color:#bf4b89;font-weight:bold">expression</span>[, inner])</td>
<td>Raises <span style="color:#3a0699;font-weight:bold">expression</span> to the power of <span style=" color:#bf4b89;font-weight:bold">expression</span>. Wavefront does not support imaginary numbers, so pow(-1, 0.5) returns no data.</td>
</tr>
<tr>
<td>exp(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the exponential of <span style="color:#3a0699;font-weight:bold">expression</span>.</td>
</tr>
<tr>
<td>log(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the natural log of <span style="color:#3a0699;font-weight:bold">expression</span>.</td>
</tr>
<tr>
<td>log10(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the log base 10 of <span style="color:#3a0699;font-weight:bold">expression</span>.</td>
</tr>
<tr>
<td>toDegrees(numRadians), toRadians(numDegrees)</td>
<td>Convert radians to degrees, and vice versa.</td>
</tr>
<tr>
<td>sin(<span style="color:#3a0699;font-weight:bold">expression</span>), cos(<span style="color:#3a0699;font-weight:bold">expression</span>), tan(<span style="color:#3a0699;font-weight:bold">expression</span>),<br/>asin(<span style="color:#3a0699;font-weight:bold">expression</span>), acos(<span style="color:#3a0699;font-weight:bold">expression</span>),<br/>atan(<span style="color:#3a0699;font-weight:bold">expression</span>), atan2(<span style="color:#3a0699;font-weight:bold">expression</span>),<br/>sinh(<span style="color:#3a0699;font-weight:bold">expression</span>), cosh(<span style="color:#3a0699;font-weight:bold">expression</span>), tanh(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Performs the specified trigonometric function on <span style="color:#3a0699;font-weight:bold">expression</span> interpreted in radians.</td>
</tr>
</tbody>
</table>

## Predictive Functions

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
<td markdown="span">hw(<span style="color:#757575;font-weight:bold">timeWindow1</span>, <span style="color:#757575;font-weight:bold">timeWindow2</span>, <span style="color:#757575;font-weight:bold">timeWindow3</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)[, value1, value2, value3])</td>
<td>Returns a smoothed version of <span style="color:#3a0699;font-weight:bold">expression</span> and forecasts its future points using the Holt-Winters triple exponential smoothing algorithm for seasonal data. See <a href="query_language_hw_function.html">Holt-Winters Predictive Analysis</a>.
<ul>
<li><span style="color:#757575;font-weight:bold">timeWindow1</span> is the amount of data we use to smooth the series and to forecast.  </li>
<li><span style="color:#757575;font-weight:bold">timeWindow2</span> is the seasonal length of the data. </li>
<li><span style="color:#757575;font-weight:bold">timeWindow3</span> is the rate at which the expression should be sampled. </li>
<li> The optional three values are coefficients for the Holt-Winters equations, and must be decimals between 0 and 1. If no values are given, Wavefront selects them manually. </li>
</ul></td>
</tr>
</tbody>
</table>

## Event Functions

Event functions are used to [display events in charts](charts_events_displaying.html) and perform conversions on events sets.
For further information, see [Basic events() Queries](events_queries.html) and [Advanced events() Queries](events_queries_advanced.html).


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
<td>events(<span style="color:#2770e8;font-weight:bold">filters</span>)</td>
<td>Returns the set of events that match <span style="color:#2770e8;font-weight:bold">filters</span>. The available filters are <a href="#event_filters">Event Filters</a>. The returned set of events can be passed as an argument to functions that accept events. When passed to a chart query, displays the events. The chart must contain at least 1 ts() <span style="color:#3a0699;font-weight:bold">expression</span> for events to display.</td></tr>
<tr>
<td>count(<span style="color:#3a0699;font-weight:bold">events</span>)</td>
<td>Converts <span style="color:#3a0699;font-weight:bold">events</span> into a single time series, where every data point represents the number of events that started at that time minus the number of events that ended at that time. Instantaneous events are represented as a single &quot;0&quot; value: 1 started minus 1 ended (instantaneous events are defined as events having their end time equal to their start time).</td>
</tr>
<tr>
<td>ongoing(<span style="color:#3a0699;font-weight:bold">events</span>)</td>
<td>Returns a continuous time series representing the number of ongoing <span style="color:#3a0699;font-weight:bold">events</span> at any given moment within the query time window. See [When Does an Event Query Return Events?](events_queries.html#when-does-an-event-query-return-events) for some background information.</td>
</tr>
<tr>
<td>closed(<span style="color:#3a0699;font-weight:bold">events</span>)</td>
<td>Returns <span style="color:#3a0699;font-weight:bold">events</span> that have ended and instantaneous <span style="color:#3a0699;font-weight:bold">events</span> that occurred in the past.</td>
</tr>
<tr>
<td>until(<span style="color:#3a0699;font-weight:bold">events</span>)</td>
<td>Returns synthetic <span style="color:#3a0699;font-weight:bold">events</span> that start at the beginning of time (Jan 1, 1970) and end where the input <span style="color:#3a0699;font-weight:bold">events</span> start.</td>
</tr>
<tr>
<td>after(<span style="color:#3a0699;font-weight:bold">events</span>)</td>
<td>Returns synthetic ongoing <span style="color:#3a0699;font-weight:bold">events</span> that start the moment the input <span style="color:#3a0699;font-weight:bold">events</span> end.</td>
</tr>
<tr>
<td>since(<span style="color:#3a0699;font-weight:bold">events</span>)</td>
<td>Returns synthetic <span style="color:#3a0699;font-weight:bold">events</span> with the same start time and no end time (converts all input <span style="color:#3a0699;font-weight:bold">events</span> to ongoing).</td>
</tr>
<tr>
<td>since(<span style="color:#757575;font-weight:bold">timeWindow</span>)</td>
<td>Creates a single synthetic event that started <span style="color:#757575;font-weight:bold">timeWindow</span> ago and ended &quot;now&quot;. <span style="color:#757575;font-weight:bold">timeWindow</span> can be specified in seconds, minutes, hours, days or weeks (e.g., <span style="color:#757575;font-weight:bold">1s</span>, <span style="color:#757575;font-weight:bold">1m</span>, <span style="color:#757575;font-weight:bold">1h</span>, <span style="color:#757575;font-weight:bold">1d</span>, <span style="color:#757575;font-weight:bold">1w</span>). If the unit is not specified, the default is minutes.</td>
</tr>
<tr>
<td>timespan(<span style="color:#bf5700;font-weight:bold">startTimestamp</span>, <span style="color:#bf5700;font-weight:bold">endTimestamp</span>)</td>
<td>Creates a single synthetic event with the specified start and end timestamps. A timestamp can be expressed in epoch seconds or using a time expression such as "5 minutes ago". Example: timespan("5 minutes ago", "2 minutes ago").</td>
</tr>
<tr>
<td>first(<span style="color:#3a0699;font-weight:bold">events</span>)</td>
<td>Returns a single event with the earliest start time.</td>
</tr>
<tr>
<td>last(<span style="color:#3a0699;font-weight:bold">events</span>)</td>
<td>Returns a single event with the latest start time.</td>
</tr>
<tr>
<td>firstEnding(<span style="color:#3a0699;font-weight:bold">events</span>)</td>
<td>Returns a single event with the earliest end time.</td>
</tr>
<tr>
<td>lastEnding(<span style="color:#3a0699;font-weight:bold">events</span>)</td>
<td>Returns a single event with the latest end time.</td>
</tr>
</tbody>
</table>

### Example

```
events(type=alert, name="disk space is low", alertTag=MicroService.App1.*)
```

<a name="event_filters"></a>

### Event Filters

{% include shared/event_filters.html %}


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
<td>collect(<span style="color:#3a0699;font-weight:bold">expression</span>, <span style="color:#3a0699;font-weight:bold">expression2</span>, <span style="color:#3a0699;font-weight:bold">expression3</span>, ...)</td>
<td>Returns a ts() expression that is the combination of two or more ts() expressions. The returned expression includes a synthetic <code>collect_&lt;number&gt;</code> point tag, where <code>&lt;number&gt;</code> is the number of input expressions.</td>
</tr>
<tr>
<td>exists(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns 1 if at least one value in <span style=" color:#3a0699;font-weight:bold">expression</span> has been reported in the last 4 weeks. Otherwise, it returns 0. This function outputs continuous time series.</td>
</tr>
<tr>
<td>abs(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the absolute value of <span style="color:#3a0699;font-weight:bold">expression</span>.</td>
</tr>
<tr>
<td>random()</td>
<td>Returns random values between 0.0 and 1.0. If you reload a chart that uses random(), the reloaded chart returns new random values. This function outputs continuous time series.</td>
</tr>
<tr>
<td>normalize(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns every series in <span style="color:#3a0699;font-weight:bold">expression</span> scaled so it has a minimum of 0 and a maximum of 1.0.</td>
</tr>
<tr>
<td>haversine(<span style="color:#3a0699;font-weight:bold">expression1</span>, <span style="color:#3a0699;font-weight:bold">expression2</span>, <span style="color:#3a0699;font-weight:bold">expression3</span>, ...)</td>
<td>Returns the distance between coordinates. <span style="color:#3a0699;font-weight:bold">expression(s)</span> can be constants or ts() expressions.</td>
</tr>
</tbody>
</table>

## Troubleshooting

<table style="width: 100%;">
<colgroup>
<col width="30%" />
<col width="30%" />
<col width="40%" />
</colgroup>
<thead>
<tr><th>Problem</th><th>Cause</th><th>Resolution/Details</th></tr>
</thead>
<tbody>
<tr>
<td>A time series you send to Wavefront is discrete, for example, you send data points every minute, but the data appear as continuous. Continuous means that you see data every second (or time slice) regardless of the interval of the underlying data. </td>
<td>Some functions return continuous time series even if the underlying metrics are discrete. See the list on the right.
</td>
<td>The following functions return continuous time series.
<ul>
<li>Moving time windows except <code>integral</code>.</li>
<li>Missing data functions. </li>
<li>The <code>if()</code> function when <span style="color:#3a0699;font-weight:bold">expression</span> is not a constant time series  </li>
<li>The <code>ongoing()</code>, <code>exists()</code>, and <code>random()</code> functions.</li>
<li>The <code>at()</code>, <code>year()</code>, <code>month()</code>, <code>dayOfYear()</code>, <code>day()</code>, <code>weekday()</code>, <code>hour()</code>, and <code>time()</code> functions.</li>
<li>The <code>between()</code>, <code>top()</code>, and <code>bottom()</code> functions. </li>
<li>Constant time series functions: <code>at()</code>, <code>top()</code>, <code>bottom()</code>, <code>&lt;number&gt;</code></li>
</ul></td>
</tr>
<tr>
<td>After entering a query expression the following error displays: <em>Query syntax error: Missing expression argument.</em></td>
<td>An <span style="color:#3a0699;font-weight:bold">expression</span> argument to a function is not well-formed.</td>
<td>Build up the <span style="color:#3a0699;font-weight:bold">expression</span> by small steps ensuring that the expression is valid at each step.</td>
</tr>
<tr>
<td>You see the warning indicator <i class="fa-exclamation-triangle fa" style="color: red;"></i> in a chart and a warning like the following:<br /><br />
<em>The expression: ts(&lt;metric&gt;, source=&lt;source&gt;) has been pre-aligned, making it equivalent to align(120s, mean, ts(&lt;metric&gt;, source=&lt;source&gt;)) in order to improve the performance of the sum()
aggregation operation. You can wrap the expression with align() to explicitly state the periodicity
and desired summarization strategy.</em><br /><br />
</td>
<td>Assuming an original query of <code>sum(ts(&lt;metric&gt;, source=&lt;source&gt;))</code>, Wavefront has pre-aligned the series to improve performance.
</td>
<td>Depends on the use case. For details, see <a href="query_language_align_function.html">The <code>align()</code> Function</a>.
</td>
</tr>
</tbody>
</table>
