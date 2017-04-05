---
title: Wavefront Query Language Quick Reference
keywords: query language
tags: [query_language]
sidebar: doc_sidebar
permalink: query_language_reference.html
summary: Learn about the query syntax, operators, and functions supported by Wavefront Query Language.
---
## Query Elements
<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<thead>
<tr>
<th>Term</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><span style="color:#08838c;font-weight:bold">metric</span></td>
<td>The name of a metric.
Example: <span style="color:#08838c;font-weight:bold">cpu.load.metric.</span></td>
</tr>
<tr>
<td><span style="color:#d63a36;font-weight:bold">source</span></td>
<td>A string sent with a metric to identify the entity that sent the metric. Sources are identified with the keyword <span style="color:#d63a36;font-weight:bold">source</span>. Example: <span style="color:#d63a36;font-weight:bold">source=appServer15</span>.</td>
</tr>
<tr>
<td><span style="color:#2770e8;font-weight:bold">source tag</span></td>
<td>A type of source metadata. Source tags group sources together allowing more concise queries. Source tags are identified by the keyword <span style="color:#2770e8;font-weight:bold">tag</span>.
Example: <span style="color:#2770e8;font-weight:bold">tag=app</span>.</td>
</tr>
<tr>
<td><span style="color:#3a0699;font-weight:bold">point tag</span></td>
<td>A type of custom metric metadata. Point tags have keys and values. Example: <span style="color:#3a0699;font-weight:bold">region=us-west-2b</span>.</td>
</tr>
<tr>
<td><span style="color:#757575;font-weight:bold">timeWindow</span></td>
<td>A window of time specified in seconds, minutes, hours, days or weeks (<span style="color:#757575;font-weight:bold">1s</span>, <span style="color:#757575;font-weight:bold">1m</span>, <span style="color:#757575;font-weight:bold">1h</span>, <span style="color:#757575;font-weight:bold">1d</span>, <span style="color:#757575;font-weight:bold">1w</span>). If the unit is not specified, the default is minutes. Example: <span style="color:#757575;font-weight:bold">1h</span>.</td>
</tr>
</tbody>
</table>

## Expressions
<ul>
<li><span style="font-weight:bold">ts() expression</span> - Returns all time series that match a metric name, filtered by sources, source tags, and point tags.</li>
<ul>
<li markdown="span">Syntax: ts(<span style="color:#08838c;font-weight:bold">&lt;metricName&gt;</span>, [[<span style="color:#d63a36;font-weight:bold">source=&lt;sourceName&gt;</span>] [and|or] [<span style="color:#2770e8;font-weight:bold">tag=&lt;sourceTagName&gt;</span>] [and|or] [<span style="color:#3a0699;font-weight:bold">&lt;<span>pointTagKey&gt;</span>=&lt;pointTagValue&gt;]...])</li>
<li>For metric, source, source tag, and point tag naming conventions, see Wavefront Data Format.</li>
<li>Sources, source tags, and point tags are optional. For example, to return all sources sending the <span style="color:#08838c;font-weight:bold">my.metric</span> metric, specify ts(<span style="color:#08838c;font-weight:bold">my.metric</span>).</li>
</ul>
<li>constant - A number such as 5.01, 10000, or 40. Constants can be plotted by themselves and composed in <span style="color:#3a0699;font-weight:bold">expressions</span> using arithmetic operators.</li>
<ul>
<li markdown="span">[SI prefixes](https://en.wikipedia.org/wiki/Metric_prefix)(k, M, G, T, P, E, Z, Y) - Scales constants by multiples of 1000. For example, instead of typing 1000000, type 1M, and instead of typing 7200, type 7.2k. Other common prefixes are G and T (for a billion and a trillion, useful when working with network and I/O metrics).</li>
<li>Examples: 100, ts(<span style="color:#08838c;font-weight:bold">cpu.load.1m</span>), ts(1)</li>
</ul>
<li>wildcard - Matches strings in metric names, sources, source tags, and point tags. A wildcard is represented with a "&#42;" character.  Using a catch-all wildcard (example: pointTag="&#42;") when filtering by point tags yields only time series that have this point tag present (with any value), and time series that don't have this point tag ("null") are filtered out. To find time series without a specific point tag, use the not pointTag="&#42;" construct.</li>
<ul>
<li>Example: <span style="color:#d63a36;font-weight:bold">source = app-1&#42;</span> matches all sources starting with <span style="color:#d63a36;font-weight:bold">app-1</span>: <span style="color:#d63a36;font-weight:bold">app-10</span>, <span style="color:#d63a36;font-weight:bold">app-11</span>, <span style="color:#d63a36;font-weight:bold">app-12</span>, etc.</li>
</ul>
<li><span style="color:#3a0699;font-weight:bold">expression</span> - A ts() expression, constant, or arithmetic or Boolean combination of a ts() expressions and constants.</li>
</ul>

## Operators
<ul>
<li>Boolean operators - combine ts() expressions and constants and the filtering performed by sources, source tags, and point tags.</li>
<ul>
<li markdown="span">`and`: Returns 1 if both arguments are nonzero. Otherwise, returns 0.</li>
<li markdown="span">`or`: Returns 1 if at least one argument is nonzero. Otherwise, returns 0.</li>
<li markdown="span">`[and]`, `[or]`: Performs strict 'inner join' versions of the Boolean operators. Strict operators match metric|source|point tag combinations on both sides of the operator while leaving out the non-matched ones in the result.</li></ul>
<li>Arithmetic operators</li>
<ul><li markdown="span">`+`, `-`, `\*`, `/`: Matches metric, source, and point tag combinations on both sides of an <span style="color:#3a0699;font-weight:bold">expression</span>. If either side of the <span style="color:#3a0699;font-weight:bold">expression</span>is a 'singleton' -- that is, a single metric, source, or point tag combination--it automatically matches up with every element on the other side of the <span style="color:#3a0699;font-weight:bold">expression</span>.</li>
<li markdown="span">`[+]`, `[-]`, `[\*]`, `[/]`: Performs strict 'inner join' versions of the arithmetic operators. <span>Strict operators match metric|source|point tag combinations on both sides of the operator while leaving out the non-matched ones in the result.</li></ul>
<li>Comparison operators</li>
<ul><li markdown="span">`<`, `<=`, `>`, `>=`, `!=`, `=`: Returns 1 if the condition is true. Otherwise returns 0. Double equals (==) is not a supported Wavefront operator.</li>
<li markdown="span">`[<]`, `[<=]`, `[>]`, `[>=]`, `[=]`, `[!=]`: Performs strict 'inner join' versions of the comparison operators. Strict operators match metric|source|point tag combinations on both sides of the operator while leaving out the non-matched ones in the result.</li></ul>
<li>Examples</li>
<ul>
<li>ts(<span style="color:#08838c;font-weight:bold">my.metric</span>) &gt; 10) and (ts(<span style="color:#08838c;font-weight:bold">my.metric</span>) &lt; 20) returns 1 if <span style="color:#08838c;font-weight:bold">my.metric</span> is between 10 and 20. Otherwise, returns 0.</li>
<li>ts(<span style="color:#08838c;font-weight:bold">cpu.load.1m</span>, <span style="color:#2770e8;font-weight:bold">tag=prod</span> and <span style="color:#2770e8;font-weight:bold">tag=db</span>) returns <span style="color:#08838c;font-weight:bold">cpu.load.1m</span> for all sources tagged with both <span style="color:#2770e8;font-weight:bold">prod</span> and <span style="color:#2770e8;font-weight:bold">db</span>.</li>
<li>ts(<span style="color:#08838c;font-weight:bold">db.query.rate</span>, <span style="color:#2770e8;font-weight:bold">tag=db</span> and not <span style="color:#d63a36;font-weight:bold">source=db5.wavefront.com</span>) returns <span style="color:#08838c;font-weight:bold">db.query.rate</span> for all sources tagged with <span style="color:#2770e8;font-weight:bold">db</span>, except for the <span style="color:#d63a36;font-weight:bold">db5.wavefront.com</span> source.</li></ul>
<li>For further information on operator behavior in series matching, see Series Matching​.</li>
</ul>

## Tags in Queries
<ul>
<li>Source tags are a way to group sources together. For example, if you have two sources, <span style="color:#d63a36;font-weight:bold">appServer15</span> and <span style="color:#d63a36;font-weight:bold">appServer16</span>, you could add the source tag <span style="color:#2770e8;font-weight:bold">app</span> to both of them to specify that they are both app servers. Source tags aid in querying by grouping sources together. You can query ts(<span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, <span style="color:#2770e8;font-weight:bold">tag=app</span>) instead of ts(<span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, <span style="color:#d63a36;font-weight:bold">source=appServer15</span> or <span style="color:#d63a36;font-weight:bold">source=appServer16</span>). Both queries yield the same result as long as the <span style="color:#d63a36;font-weight:bold">app</span> tag is added to <span style="color:#d63a36;font-weight:bold">source=appServer15</span> and <span style="color:#d63a36;font-weight:bold">source=appServer16</span>. You add source tags to sources in the Browse &gt; Sources page and through the API.</li>
<li><span style="color:#3a0699;font-weight:bold">Point tags</span> are an additional way to describe metrics. An example of a point tag is <span style="color:#3a0699;font-weight:bold">region=us-west-2b</span>. Point tags are added to a point when points are ingested through the Wavefront proxy.</li>
<li>Example: To query a point <span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, source <span style="color:#d63a36;font-weight:bold">app2</span>, and point tag <span style="color:#3a0699;font-weight:bold">region=us-west-2b</span>, specify ts(<span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, <span style="color:#3a0699;font-weight:bold">region=us-west-2b </span>and <span style="color:#d63a36;font-weight:bold">source=app2</span>).</li></ul>

## Variables in Queries
<ul>
<li>Query line variables allow you to refer to a query line as a variable in a different query line within a chart. The query line variable name is based on the query line name. The query line name, which can be found directly to the left of the query field, is referenced in a separate query line as <span style="color:#008a09;font-weight:bold">${queryLineName}</span>. For example, if you have a query line named queryLine1 with ts(<span style="color:#08838c;font-weight:bold">requests.latency</span>) as the <span style="color:#3a0699;font-weight:bold">expression</span>, you can enter <span style="color:#008a09;font-weight:bold">${queryLine1}</span> in a separate query field in that single chart to reference ts(<span style="color:#08838c;font-weight:bold">requests.latency</span>). If a query line and dashboard variable share the same name, then the query line variable overrides the dashboard variable for that chart. The query line being referenced must be a complete expression.</li>

<li>Aliases define any ts() expression as an alias within that single query line using a SQL-style as alias. The syntax of an alias is: (<span style="color:#3a0699;font-weight:bold">expression</span> as <span style="color:#008a09;font-weight:bold">&lt;aliasName&gt;</span>). Assuming you use (<span style="color:#3a0699;font-weight:bold">expression</span> as <span style="color:#008a09;font-weight:bold">myAlias</span>) when defining the alias, you reference this alias as $myAlias. You can use $myAlias multiple times in that query line, and define multiple aliases within a query line. We recommend using alias names that are three letters or longer; specifically, you can't use the SI prefixes (such as k, G, or T) as alias names, and numeric characters are allowed only at the end of the alias name ($test123 is ok, but not $1test or $test4test). Example: (ts(requests.latency) as test - mavg(120m, $test)) / sqrt(mvar(120m, $test)).</li>

<li>Dashboard variables are defined for a dashboard and then used within any query line in every chart associated with that dashboard. Dashboard variables can replace any string of text rather than a complete expression like query line variables and aliases. If you define dashvar at the dashboard level, you can then refer to <span style="color:#008a09;font-weight:bold">${dashvar}</span> within any query line of any chart of that dashboard. You can use both aliases, query line variables, and dashboard variables in the same line; indeed, you can even use the same variable name for a dashboard and an alias (though we don't recommend it). See <a href="dashboard_variables.html">Dashboard Variables</a> for additional information about all 3 types of dashboard variables (simple, list, dynamic).</li></ul>

<span id="aggregate"></span>

## Aggregate and Raw Aggregate Functions
Aggregate and raw aggregate functions provide a way to combine (aggregate) multiple series into a single series. Standard aggregate functions first interpolate the points of the underlying set of series, and then apply the aggregate function to the interpolated series. Raw aggregate functions do not interpolate the underlying series before aggregation. Raw functions aggregate data points by time buckets.

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
<td markdown="span">sum(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the sum of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">rawsum(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the sum of all series.</td>
</tr>
<tr>
<td markdown="span">avg(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the average of all series.</td>
</tr>
<tr>
<td markdown="span">rawavg(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the average of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">min(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the lowest value of all series. </td>
</tr>
<tr>
<td markdown="span">rawmin(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the lowest value of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">max(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the highest value of all series. </td>
</tr>
<tr>
<td markdown="span">rawmax(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the highest value of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">count(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the number of series that are reporting. </td>
</tr>
<tr>
<td markdown="span">rawcount(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the number of series that are reporting. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">variance(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the variance of all series. </td>
</tr>
<tr>
<td markdown="span">rawvariance(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the variance of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">percentile(<span style="color:#d63a36;font-weight:bold">percentileValue</span>, <span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the <span style="color:#d63a36;font-weight:bold">percentileValue</span> value of all series. Example: If <span style="color:#d63a36;font-weight:bold">percentileValue is</span> 99, returns the 99th percentile value of all series.</td>
</tr>
<tr>
<td markdown="span">rawpercentile(<span style="color:#d63a36;font-weight:bold">percentileValue</span>, <span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the <span style="color:#d63a36;font-weight:bold">percentileValue</span> value of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated. Example: If <span style="color:#d63a36;font-weight:bold">percentileValue</span> is 99, returns the 99th percentile value of all series.</td>
</tr>
</tbody>
</table>

### Grouping

<span  markdown="span">When aggregating, to group by metrics, sources, source tags, point tags, or point tag key, use the [, metrics|sources|sourceTags|tags|pointTags|<span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>]</span> group by clause. The clause is applied after the ts() expression, separated by a comma. Examples:

-   Group by metrics: sum(ts(cpu.loadavg.1m), metrics)
-   Group by sources: sum(ts(cpu.loadavg.1m), sources)
-   Group by source tags: sum(ts(cpu.loadavg.1m), sourceTags)
-   Group by all available point tag keys: sum(ts(cpu.loadavg.1m), tags) or sum(ts(cpu.loadavg.1m), pointTags)
-   Group by the region point tag key:sum(ts(cpu.loadavg.1m), region)

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
<td markdown="span">highpass(<span style="color:#bf5700;font-weight:bold">expression</span>, <span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[, inner]</span>)</td>
<td>Returns only the points in <span style="color:#3a0699;font-weight:bold">expression</span> above <span style="color:#bf5700;font-weight:bold">expression</span>. <span style="color:#bf5700;font-weight:bold">expression</span> can be a constant.</td>
</tr>
<tr>
<td markdown="span">lowpass(<span style="color:#bf5700;font-weight:bold">expression</span>, <span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[, inner]</span>)</td>
<td>Returns only the points in <span style="color:#3a0699;font-weight:bold">expression</span> below <span style="color:#bf5700;font-weight:bold">expression</span>. <span style="color:#bf5700;font-weight:bold">expression</span> can be a constant.</td>
</tr>
<tr>
<td>min(<span style="color:#bf5700;font-weight:bold">expression</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the lower of the two values in <span style="color:#bf5700;font-weight:bold">expression</span> and <span style="color:#3a0699;font-weight:bold">expression</span>. Example: min(<span style="color:#bf5700;font-weight:bold">160</span>, ts(<span style="color:#08838c;font-weight:bold">my.metric</span>)) returns 160 if <span style="color:#08838c;font-weight:bold">my.metric</span> is &gt; 160. If <span style="color:#08838c;font-weight:bold">my.metric</span> is &lt; 160, returns the value of <span style="color:#08838c;font-weight:bold">my.metric</span>.</td>
</tr>
<tr>
<td>max(<span style="color:#bf5700;font-weight:bold">expression</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the higher of the two values in <span style="color:#bf5700;font-weight:bold">expression</span> and <span style="color:#3a0699;font-weight:bold">expression</span>. Example: max(<span style="color:#bf5700;font-weight:bold">160</span>, ts(<span style="color:#08838c;font-weight:bold">my.metric</span>)) returns 160 if <span style="color:#08838c;font-weight:bold">my.metric</span> is &lt; 160. If <span style="color:#08838c;font-weight:bold">my.metric</span> is &gt; 160, returns the value of <span style="color:#08838c;font-weight:bold">my.metric</span>.</td>
</tr>
<tr>
<td>between(<span style="color:#3a0699;font-weight:bold">expression</span>, <span style="color:#bf5700;font-weight:bold">lower</span>, <span style="color:#bf5700;font-weight:bold">upper</span>)</td>
<td>Returns 1 if <span style="color:#3a0699;font-weight:bold">expression</span> is &gt;= <span style="color:#bf5700;font-weight:bold">lower</span> and &lt;= <span style="color:#bf5700;font-weight:bold">upper</span>. Otherwise, returns 0.</td>
</tr>
<tr>
<td>downsample(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the values in <span style="color:#3a0699;font-weight:bold">expression</span> occurring in each <span style="color:#757575;font-weight:bold">timeWindow</span>. Example: downsample(<span><span style="color:#757575;font-weight:bold">30m</span>, ts(<span style="color:#08838c;font-weight:bold">my.metric</span>)</span> returns the values every half hour of <span style="color:#08838c;font-weight:bold">my.metric</span>.</td>
</tr>
<tr>
<td markdown="span">align(<span style="color:#757575;font-weight:bold">timeWindow</span>,<span style="color:#008a09;font-weight:bold">[mean|median|min|max|first|last|sum|count,]</span><span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns 1 value in <span style="color:#3a0699;font-weight:bold">expression</span> for each <span style="color:#757575;font-weight:bold">timeWindow</span>. Example: If you were collecting data once a minute, but wanted data points to be displayed every 30 minutes (summarized by median every 30 minutes), use align(<span style="color:#757575;font-weight:bold">30m</span>, <span style="color:#008a09;font-weight:bold">median</span>, ts(<span style="color:#08838c;font-weight:bold">my.metric</span>)).</td>
</tr>
<tr>
<td>topk(<span style="color:#008a09;font-weight:bold">&lt;numberOfTimeSeries&gt;</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the top <span style="color:#008a09;font-weight:bold">numberOfTimeSeries</span> series in <span style="color:#3a0699;font-weight:bold">expression</span> based on the most recent data point.</td>
</tr>
<tr>
<td>bottomk(<span style="color:#008a09;font-weight:bold">&lt;numberOfTimeSeries&gt;</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the bottom <span style="color:#008a09;font-weight:bold">numberOfTimeSeries</span> series in <span  style="color:#3a0699;font-weight:bold">expression</span> based on the most recent data point.</td>
</tr>
<tr>
<td>top(<span style="color:#008a09;font-weight:bold">&lt;numberOfTimeSeries&gt;</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the top <span style="color:#008a09;font-weight:bold">numberOfTimeSeries</span> series (as 1) in <span style="color:#3a0699;font-weight:bold">expression</span> based on the most recent data point. All other series are displayed as 0's.</td>
</tr>
<tr>
<td>bottom(<span style="color:#008a09;font-weight:bold">&lt;numberOfTimeSeries&gt;</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the bottom <span style="color:#008a09;font-weight:bold">numberOfTimeSeries</span> series (as 1) in <span style="color:#3a0699;font-weight:bold">expression</span> based on the most recent data point. All other series are displayed as 0's.</td>
</tr>
<tr>
<td markdown="span">filter(<span style="color:#3a0699;font-weight:bold">expression [metric|source=|tagK=]</span>)</td>
<td>Retains the specified metric|source|<span style="color:#3d3d3d;">point tag</span> in <span style="color:#3a0699;font-weight:bold">expression</span>. No key is required to filter a metric. To <span>filter</span> a particular source or point tag, specify a key of source= or tagK= respectively. Replace tagK with the point tag key to filter. You can specify only one parameter (metric|source|point tag) per function call. To specify multiple parameters, use a filter() call for each parameter. filter is similar to retainSeries, but does not support expanding a source tag.</td>
</tr>
<tr>
<td markdown="span">retainSeries(<span style="color:#3a0699;font-weight:bold">expression [ metric|source=|tag=|tagK=]</span>)</td>
<td>Retains the specified metric|source|source tag|<span style="color:#3d3d3d;">point tag</span> in <span style="color:#3a0699;font-weight:bold">expression</span>. No key is required to retain a metric. To retain a particular source, source tag, or point tag, specify a key of source=, tag=, or tagK= respectively. Replace tagK with the point tag key to retain. You can specify only one parameter (metric|source|tag|point tag) per function call. To specify multiple parameters, use a retainSeries() call for each parameter.</td>
</tr>
<tr>
<td markdown="span">removeSeries(<span style="color:#3a0699;font-weight:bold">expression [ metric|source=|tag=|tagK=]</span>)</td>
<td>Removes the specified metric|source|source tag|point tag from <span style="color:#3a0699;font-weight:bold">expression</span>. No key is required to remove a metric. To remove a particular source, source tag, or point tag, specify a key of source=, tag=, or tagK= respectively. Replace tagK with the unique point tag key to remove. You can specify only one parameter (metric|source|tag|point tag) per function call. To specify multiple parameters, use a removeSeries() call for each parameter.</td>
</tr>
<tr>
<td>sample(<span style="color:#008a09;font-weight:bold">&lt;numberOfTimeSeries&gt;</span>, <span style="color:#3a0699;font-weight:bold">expression)</span></td>
<td>Returns <span style="color:#008a09;font-weight:bold">numberOfTimeSeries</span> non-random time series based on <span style="color:#3a0699;font-weight:bold">expression</span>. This function is deterministic, as long as the underlying set of time series stays the same. The returned values may change, e.g., if a new source starts reporting the metric. You can express <span style="color:#008a09;font-weight:bold">numberOfTimeSeries</span> as a number (e.g. 10) or a percentage (e.g. 17%).</td>
</tr>
<tr>
<td>random(<span style="color:#008a09;font-weight:bold">&lt;numberOfTimeSeries&gt;</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns <span style="color:#008a09;font-weight:bold">numberOfTimeSeries</span> random time series based on <span style="color:#3a0699;font-weight:bold">expression</span>. You can express <span style="color:#008a09;font-weight:bold">numberOfTimeSeries</span> as a number (e.g. 10) or a percentage (e.g. 17%).</td>
</tr>
<tr>
<td markdown="span">limit(<span style=" color:#008a09;font-weight:bold">&lt;numberOfTimeSeries&gt;</span><span style="font-weight:bold">[, offsetNumber]</span>, <span style="color:#3a0699;font-weight:bold"> expression</span>)</td>
<td>Returns <span style="color:#008a09;font-weight:bold">numberOfTimeSeries</span>time series. You can express <span style="color:#008a09;font-weight:bold">numberOfTimeSeries</span> as a number (e.g. 10) or a percentage (e.g. 17%).</td>
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
<td>rate(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the per-second change of <span style="color:#3a0699;font-weight:bold">expression</span>; should be used on monotonic counter metrics (metrics that have values that only increase). Automatically handles zero-resets in counters.</td>
</tr>
<tr>
<td>deriv(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the per-second change of <span style="color:#3a0699;font-weight:bold">expression</span>. Does not handle zero-resets, but can be used on non-counter (decreasing) metrics.</td>
</tr>
<tr>
<td>lag(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns an <span style="color:#3a0699;font-weight:bold">expression</span> time shifted by <span style="color:#757575;font-weight:bold">timeWindow</span>, to enable comparison of an expression with its own past behavior. Example: lag(<span style="color:#757575;font-weight:bold">3h</span>, ts(<span style="color:#08838c;font-weight:bold">my.metric</span>)) returns each point from <span style="color:#3a0699;font-weight:bold">expression</span> from 3 hours ago.</td>
</tr>
<tr>
<td>at(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the value of the <span style="color:#3a0699;font-weight:bold">expression</span> from <span style="color:#757575;font-weight:bold">timeWindow</span> ago. at() only looks at a single point, and returns a flat line, across all time points. If you query at(<span style="color:#757575;font-weight:bold">2h</span>, ts(<span style="color:#08838c;font-weight:bold">my.metric</span>)), you'll see the value of ts(<span style="color:#08838c;font-weight:bold">my.metric</span>) from 2 hours ago, even if you're looking at a chart from weeks or months ago. To associate at() with a time at the beginning or end of your current chart window, replace <span style="color:#757575;font-weight:bold">timeWindow</span> with <span style="color:#757575;font-weight:bold">start</span>, <span style="color:#757575;font-weight:bold">end</span>, or <span style="color:#757575;font-weight:bold">now</span>.</td>
</tr>
<tr>
<td>year(<span style="color:#757575;font-weight:bold">"timezone"</span>)</td>
<td>Returns the 4-digit year for a <span style="color:#757575;font-weight:bold">timezone</span>. Sample timezones include <span style="color:#757575;font-weight:bold">"US/Pacific"</span> and <span style="color:#757575;font-weight:bold">"Europe/London"</span>. The list of valid <span style="color:#757575;font-weight:bold">timezones</span> is available at <a href="http://joda-time.sourceforge.net/timezones.html">http://joda-time.sourceforge.net/timezones.html</a>.</td>
</tr>
<tr>
<td>month(<span style="color:#757575;font-weight:bold">"timezone"</span>)</td>
<td>Returns the numerical month for a <span style="color:#757575;font-weight:bold">timezone</span>.</td>
</tr>
<tr>
<td>dayOfYear(<span style="color:#757575;font-weight:bold">"timezone"</span>)</td>
<td>Returns the day (within the year) for a <span style="color:#757575;font-weight:bold">timezone</span>. Always returns a value from 1 to 366.</td>
</tr>
<tr>
<td>day(<span style="color:#757575;font-weight:bold">"timezone"</span>)</td>
<td>Returns the day (within the month) for a <span style="color:#757575;font-weight:bold">timezone</span>. Always returns a whole number from 1 to 31.</td>
</tr>
<tr>
<td>weekday(<span style="color:#757575;font-weight:bold">"timezone"</span>)</td>
<td>Returns the day (within the week) for a <span style="color:#757575;font-weight:bold">timezone</span>. Always returns a whole number from 1 (Monday) to 5 (Friday) for weekdays, and 6 (Saturday) and 7 (Sunday) for weekends.</td>
</tr>
<tr>
<td>hour(<span style="color:#757575;font-weight:bold">"timezone"</span>)</td>
<td>Returns the hour (within the day) for a <span style="color:#757575;font-weight:bold">timezone</span>. Always returns a decimal value from 0.0 to 24.0.</td>
</tr>
<tr>
<td>timestamp(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the timestamp associated with the reported data point of <span style="color:#3a0699;font-weight:bold">expression</span>. To see the entire raw value of the timestamp in the legend (in epoch seconds), hold down the shift key when you hover over a point.</td>
</tr>
<tr>
<td>time()</td>
<td>Returns epoch seconds for each point in time.</td>
</tr>
</tbody>
</table>

<span id="moving"></span>

## Moving Window Time Functions
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
<td>mavg(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the moving average of each series over <span style="color:#757575;font-weight:bold">timeWindow</span>.
Example: mavg(<span style="color:#757575;font-weight:bold">60m</span>, ts(<span style="color:#08838c;font-weight:bold">my.metric</span>)) returns, at each point, the moving average over the last <span style="color:#757575;font-weight:bold">60 minutes</span> for each series in <span style="color:#3a0699;font-weight:bold">expression</span>.</td>
</tr>
<tr>
<td>msum(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the moving sum of each series over <span style="color:#757575;font-weight:bold">timeWindow</span>. Don't confuse this function with mcount(), which returns the <em>number of data points</em>. Example: msum(<span style="color:#757575;font-weight:bold">10m</span>, ts(<span style="color:#08838c;font-weight:bold">my.metric</span>)) returns, at each point, the sum of all the points over the last <span style="color:#757575;font-weight:bold">10 minutes</span> for each series in <span style="color:#3a0699;font-weight:bold">expression</span>.</td>
</tr>
<tr>
<td>mmedian(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the moving median of each series over <span style="color:#757575;font-weight:bold">timeWindow</span>.</td>
</tr>
<tr>
<td>mvar(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the moving variance of each series over <span style="color:#757575;font-weight:bold">timeWindow</span>. Example: To get the moving standard deviation, apply the sqrt function to mvar: sqrt(mvar(<span style="color:#757575;font-weight:bold">120m</span>, ts(<span style="color:#08838c;font-weight:bold">my.metric</span>))).</td>
</tr>
<tr>
<td>mcount(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the number of data points over <span style="color:#757575;font-weight:bold">timeWindow</span>. Don't confuse this with msum(), which returns the <em>sum of the data points</em>.</td>
</tr>
<tr>
<td>mmin(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the minimum of each series over <span style="color:#757575;font-weight:bold">timeWindow</span>.</td>
</tr>
<tr>
<td>mmax(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the maximum of each series over <span style="color:#757575;font-weight:bold">timeWindow</span>.</td>
</tr>
<tr>
<td>mpercentile(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#d63a36;font-weight:bold">percentileValue</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the <span>percentile</span> of each series over <span style="color:#757575;font-weight:bold">timeWindow</span>. <span style="color:#d63a36;font-weight:bold">percentileValue</span> must be &gt;= <span style="color:#d63a36;font-weight:bold">0</span> and &lt;= <span style="color:#d63a36;font-weight:bold">100</span>.</td>
</tr>
<tr>
<td markdown="span">mcorr(<span style="color:#757575;font-weight:bold"><span>timeWindow</span>, <span style="color:#3a0699;font-weight:bold"><span>expression1</span>, <span style="color:#3a0699;font-weight:bold">expression2[, inner]</span>)</td>
<td>Returns the moving correlation between two time series <span style="color:#3a0699;font-weight:bold">expressions</span> over <span style="color:#757575;font-weight:bold">timeWindow</span>.</td>
</tr>
<tr>
<td>integrate(<span style="color:#757575;font-weight:bold">timeWindow</span>,<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the moving integration on a given time series <span style="color:#3a0699;font-weight:bold">expression</span> over <span style="color:#757575;font-weight:bold">timeWindow</span>.</td>
</tr>
<tr>
<td>integral(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the moving sum over time for the given time series <span style="color:#3a0699;font-weight:bold">expression</span> over the time interval of the current chart window. Always starts at 0 on the left side of the chart showing the total accumulation over the time duration of the current chart window.</td>
</tr>
<tr>
<td>flapping(<span style="color:#757575;font-weight:bold">timeWindow</span>,<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the number of times a counter has reset within <span style="color:#757575;font-weight:bold">timeWindow</span>.</td>
</tr>
<tr>
<td>any(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns 1 if the <span style="color:#3a0699;font-weight:bold">expression</span> over <span style="color:#757575;font-weight:bold">timeWindow</span> has been non-zero at any time. Otherwise, it returns 0.</td>
</tr>
<tr>
<td>all(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns 1 if the <span style="color:#3a0699;font-weight:bold">expression</span> over <span style="color:#757575;font-weight:bold">timeWindow</span> has been non-zero at every time in that window. Otherwise, it returns 0.</td>
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
<td>Returns <span><span style="color:#bf4b89;font-weight:bold">ThenExpression</span> if <span style="color:#3a0699;font-weight:bold">expression</span> &gt;=1. Otherwise, returns <span style="color:#08838c;font-weight:bold">ElseExpression</span>. Expects a time series expression as a first argument, and, since time series are numeric, only numeric comparisons are supported.
Example: If <span style="color:#3a0699;font-weight:bold">expression</span> is ts(<span style="color:#08838c;font-weight:bold">my.metric</span>) &gt;= 10</span>, if (<span style="color:#3a0699;font-weight:bold">expression</span>, <span style="color:#bf4b89;font-weight:bold">ts(my.metric)</span>, <span style="color:#08838c;font-weight:bold">ts(another.metric)</span>) returns <span style="color:#bf4b89;font-weight:bold">ts(my.metric)</span> only when ts(<span style="color:#08838c;font-weight:bold">my.metric)</span> &gt;= 10; when ts(<span style="color:#08838c;font-weight:bold">my.metric)</span> &lt; 10, it returns <span style="color:#08838c;font-weight:bold">ts(another.metric)</span>.</td>
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
<td markdown="span">default([<span style="color:#757575;font-weight:bold">timeWindow,</span>][<span style="color:#bf5700;font-weight:bold">delayTime,</span>]defaultValue,<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Fills in gaps in <span style="color:#3a0699;font-weight:bold">expression</span> with defaultValue (whether that's a constant or an expression). The optional argument (<span style="color:#757575;font-weight:bold">timeWindow</span>) fills in that period of time after each existing point (for example, <span style="color:#757575;font-weight:bold">5m</span> for 5 minutes); without this argument, all gaps are filled in. The optional argument (<span style="color:#bf5700;font-weight:bold">delayTime</span>) refers to the amount of time that must pass without a reported value in order for the default value to be applied.</td>
</tr>
<tr>
<td markdown="span">last([<span style="color:#757575;font-weight:bold">timeWindow,</span>]<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Fills in gaps in <span style="color:#3a0699;font-weight:bold">expression</span> with the last known value of <span style="color:#3a0699;font-weight:bold">expression</span>. <span style="color:#757575;font-weight:bold">timeWindow </span> fills in a specified time period after each existing point.</td>
</tr>
<tr>
<td markdown="span">next([<span style="color:#757575;font-weight:bold">timeWindow,</span>]<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Fills in gaps in <span style="color:#3a0699;font-weight:bold">expression</span> with the next known value of <span style="color:#3a0699;font-weight:bold">expression</span>. <span style="color:#757575;font-weight:bold">timeWindow</span> fills in a specified time period before each existing point.</td>
</tr>
<tr>
<td>interpolate(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Fills in gaps in <span style="color:#3a0699;font-weight:bold">expression</span> with a continuous linear interpolation of points.</td>
</tr>
</tbody>
</table>

## Metadata Functions
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
<td markdown="span">aliasMetric(<span style="color:#3a0699;font-weight:bold">expression</span>, [<span style="color:#bf5700;font-weight:bold">metric|source|{tagk, &lt;pointTagKey&gt;},</span>] <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span> [<span style="color:#757575;font-weight:bold">,delimiterDefinition</span>])</td>
<td>Extracts a string from a <span style="color:#bf5700;font-weight:bold">metric</span>, <span style="color:#bf5700;font-weight:bold">source</span>, or <span style="color:#bf5700;font-weight:bold">point tag value</span> from the result of <span style="color:#3a0699;font-weight:bold">expression</span>, and uses that extracted string to rename the metric in <span style="color:#3a0699;font-weight:bold">expression</span>. In the example below, the extracted string is based on a <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span>. For example, using the metric cpu.loadavg.1m, to get loadavg, you would use the argument <span style="color:#238567;font-weight:bold">1</span> for <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span>. To get cpu, you would use the argument <span style="color:#238567;font-weight:bold">0</span>. By default, the <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span> assumes dot (.) delimiters in the metric name. If the delimiter is a character other than a dot, use the optional <span style="color:#757575;font-weight:bold">delimiterDefinition</span>. For example, if the metric name is cpu-loadavg-1m, then use the <span style="color:#757575;font-weight:bold">delimiterDefinition</span> <span style="color:#757575;font-weight:bold">,&quot;-&quot;</span>. Additionally, you can replace <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span>/<span style="color:#757575;font-weight:bold">delimiterDefinition</span> with a regular expression.
Example:
<ul>
<li>aliasMetric(ts(<span style="color:#3a0699;font-weight:bold">cpu.load.1m, source,</span> <span style="color:#238567;font-weight:bold">1</span>).</li>
<li>aliasMetric(ts(<span style="color:#3a0699;font-weight:bold">database-storage-disk1, source,</span> <span style="color:#238567;font-weight:bold">2</span>,-).</li>
</ul>
</td>
</tr>
<tr>
<td markdown="span">aliasSource(<span style="color:#3a0699;font-weight:bold">expression</span>, [<span style="color:#bf5700;font-weight:bold">metric|source|{tagk, &lt;pointTagKey&gt;},</span>] <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span> [<span style="color:#757575;font-weight:bold">,delimiterDefinition</span>])</td>
<td markdown="span">Extracts a string from a <span style="color:#bf5700;font-weight:bold">metric</span>, <span style="color:#bf5700;font-weight:bold">source</span>, or <span style="color:#bf5700;font-weight:bold">point tag value</span> from the result of <span style="color:#3a0699;font-weight:bold">expression</span>, and uses that extracted string to rename the source in <span style="color:#3a0699;font-weight:bold">expression</span>. In the example above, the extracted string is based on a <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span>. For example, using the source host1.app.az, to get app, you would use the argument <span style="color:#238567;font-weight:bold">1</span> for <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span>. To get host1, you would use the argument <span style="color:#238567;font-weight:bold">0</span>. By default, <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span> assumes dot (.) delimiters in the source name. If the delimiter is a character other than a dot, use the optional <span style="color:#757575;font-weight:bold">delimiterDefinition</span>. For example, if the source is host1-app-az, then use the <span style="color:#757575;font-weight:bold">delimiterDefinition</span> <span style="color:#757575;font-weight:bold">,&quot;-&quot;</span>. <span>Additionally, you can replace <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span>/<span style="color:#757575;font-weight:bold">delimiterDefinition</span> with a regular expression.</td>
</tr>
<tr>
<td markdown="span">taggify(<span style="color:#3a0699;font-weight:bold">expression</span>, <span style="color:#bf5700;font-weight:bold">metric|source|{tagk, &lt;pointTagKey&gt;}</span>, <span style="color:#08838c;font-weight:bold">&lt;newPointTagKey&gt;</span>, <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span> [ <span style="color:#757575;font-weight:bold">,delimiterDefinition</span>])</td>
<td markdown="span">Extracts a string from a <span style=" color:#bf5700;font-weight:bold">metric</span>, <span style=" color:#bf5700;font-weight:bold">source</span>, or <span style=" color:#bf5700;font-weight:bold">point tag value</span> <span>from the result of <span style=" color:#3a0699;font-weight:bold">expression</span>, and uses that extracted <span>string</span> to create a synthetic point tag. In the example above, the extracted string is based on a <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span>. For example, using the point tag microservice.app, to get app, you would use the argument <span style="color:#238567;font-weight:bold">1</span> for <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span>. To get microservice, you would use the argument <span style="color:#238567;font-weight:bold">0</span>. By default, <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span> assumes dot (.) delimiters in the point tag name. If the delimiter is a character other than a dot, use the optional <span style="color:#757575;font-weight:bold">delimiterDefinition</span>. For example, if the tag name is microservice-app, then use the <span style="color:#757575;font-weight:bold">delimiterDefinition</span> <span style="color:#757575;font-weight:bold">,&quot;-&quot;</span>. <span>Additionally, you can replace <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span>/<span style="color:#757575;font-weight:bold">delimiterDefinition</span> with a regular expression.</td>
</tr>
</tbody>
</table>

## Exponential and Trigonometric Functions
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
<td>sqrt(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the square root of <span style="color:#3a0699;font-weight:bold">expression</span>.</td>
</tr>
<tr>
<td markdown="span">pow(<span style="color:#3a0699;font-weight:bold">expression</span>, <span style="color:#bf4b89;font-weight:bold">expression</span><span style="font-weight:bold">[, inner]</span>)</td>
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
<td>sin(<span style="color:#3a0699;font-weight:bold">expression</span>),cos(<span style="color:#3a0699;font-weight:bold">expression</span>),tan(<span style="color:#3a0699;font-weight:bold">expression</span>), asin(<span style="color:#3a0699;font-weight:bold">expression</span>),acos(<span style="color:#3a0699;font-weight:bold">expression</span>),atan(<span style="color:#3a0699;font-weight:bold">expression</span>),atan2(<span style="color:#3a0699;font-weight:bold">expression</span>), sinh(<span style="color:#3a0699;font-weight:bold">expression</span>), cosh(<span style="color:#3a0699;font-weight:bold">expression</span>), tanh(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Performs the specified trigonometric function on <span style="color:#3a0699;font-weight:bold">expression</span> interpreted in radians.</td>
</tr>
</tbody>
</table>

## Event Functions

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
<td>Returns a continuous time series representing the number of ongoing <span style="color:#3a0699;font-weight:bold">events</span> at any given moment.</td>
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
<td>timespan(<span style="color:#bf5700;font-weight:bold">startTimestamp, endTimestamp</span>)</td>
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

Example: events(type=alert, name=&quot;disk space is low&quot;, alertTag=MicroService.App1.\*) 

See [Basic events() Queries](events_queries) and [Advanced events() Queries](events_queries_advanced).

<a name="event_filters"></a>

### Event Filters
<table style="width: 100%;">
<colgroup>
<col width="13%" />
<col width="53%" />
<col width="33%" />
</colgroup>
<thead>
<tr>
<th>Filter</th>
<th>Description</th>
<th>Example Filter</th>
</tr>
</thead>
<tbody>
<tr>
<td>alertId</td>
<td>The ID of the alert that created the event.</td>
<td>alertID=1411189741192</td>
</tr>
<tr>
<td>alertTag</td>
<td>A tag associated with the alert that generated the event.</td>
<td>alertTag=MicroService.App1.&#42;</td>
</tr>
<tr>
<td>created</td>
<td>The ID of the alert that created the event. This filter is deprecated. Use alertID instead.</td>
<td></td>
</tr>
<tr>
<td>eventTag</td>
<td>A tag associated with the event.</td>
<td>eventTag="codepushes"</td>
</tr>
<tr>
<td>host</td>
<td>The name of the host associated with the alert that generated the event. This filter is deprecated. Use source instead.</td>
<td></td>
</tr>
<tr>
<td>name</td>
<td>An event name.</td>
<td>name="Jan 2017 code push"</td>
</tr>
<tr>
<td>severity</td>
<td>The classification of the user event or the severity of alert that generated the event. User event classification levels are severe,warn,info, and unclassified. Although an event can be classified as unclassified, the severity parameter does not accept unclassified as a valid value.  Alert severity levels are severe,warn,smoke,info.</td>
<td>severity=info</td>
</tr>
<tr>
<td>source or tag</td>
<td>The source or source tag associated with the alert that generated the event. The source parameter allows you to display events generated by an alert based on a single source or set of sources. The tag parameter works the same way, but allows you to specify a source tag instead of a source.</td>
<td>source=06bef3e0d35a</td>
</tr>
<tr>
<td>subtype</td>
<td>An event subtype: failing or recovered.</td>
<td>subtype=failing</td>
</tr>
<tr>
<td>target</td>
<td>A notification target for the alert that generated the event.</td>
<td>target=&quot;mailto:ben@example.com&quot;</td>
</tr>
<tr>
<td>type</td>
<td>An event type:alertor alert-detail.</td>
<td>type=alert</td>
</tr>
</tbody>
</table>


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
<td>Returns two or more ts() expressions combined into a single ts() expression. Each expression includes an synthetic collect_&lt;number&gt; point tag, where &lt;number&gt; is the number of expressions.</td>
</tr>
<tr>
<td>exists(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns 1 if at least one value in <span style=" color:#3a0699;font-weight:bold">expression</span> has been reported in the last 4 weeks. Otherwise, it returns 0.</td>
</tr>
<tr>
<td>abs(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the absolute value of <span style="color:#3a0699;font-weight:bold">expression</span>.</td>
</tr>
<tr>
<td>random()</td>
<td>Returns random values between 0.0 and 1.0. If you reload a chart that uses random(), the reloaded chart returns new random values.</td>
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
<tbody>
<tr><th width="33%">Error</th><th width="34%">Resolution</th><th width="33%">Resolution</th></tr>
<tr>
<td>After entering a query expression the following error displays: <em>Query syntax error: Missing expression argument.</em></td>
<td>An <span style="color:#3a0699;font-weight:bold">expression</span> argument to a function is not well-formed.</td>
<td>Build up the <span style="color:#3a0699;font-weight:bold">expression</span> by small steps ensuring that the expression is valid at each step.</td>
</tr>
</tbody>
</table>

{% include links.html %}