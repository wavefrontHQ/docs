---
title: Wavefront Query Language Quick Reference
keywords: query language, queries, functions, expressions, operators, variables, aggregations, conditional, rounding, missing data, metadata, mathematical, event
tags: [query language]
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
<td>The name of a metric. Example: <span style="color:#08838c;font-weight:bold">cpu.load.metric</span>.</td>
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
<li>ts() expression - Returns all points that match a metric name, filtered by sources, source tags, and point tags.</li>
<ul>
<li markdown="span">Syntax: ts(&lt;<span style="color:#08838c;font-weight:bold">metricName</span>&gt;, [[<span style="color:#d63a36;font-weight:bold">source=</span>&lt;<span style="color:#d63a36;font-weight:bold">sourceName</span>&gt;] [and|or] [<span style="color:#2770e8;font-weight:bold">tag</span>=&lt;<span style="color:#2770e8;font-weight:bold">sourceTagName</span>&gt;] [and|or] [&lt;<span style="color:#3a0699;font-weight:bold">pointTagKey</span>&gt;=&lt;<span style="color:#3a0699;font-weight:bold">pointTagValue</span>&gt;]...])</li>
<li markdown="span">For metric, source, source tag, and point tag naming conventions, see [Wavefront Data Format](wavefront_data_format.html).</li>
<li>Sources, source tags, and point tags are optional. For example, to return points from all sources sending the <span style="color:#08838c;font-weight:bold">my.metric</span> metric, specify ts(<span style="color:#08838c;font-weight:bold">my.metric</span>).</li>
</ul>
<li>constant - A number such as 5.01, 10000, or 40. Constants can be plotted by themselves and composed in <span style="color:#3a0699;font-weight:bold">expressions</span> using arithmetic operators.</li>
<ul>
<li markdown="span">[SI prefixes](https://en.wikipedia.org/wiki/Metric_prefix)(k, M, G, T, P, E, Z, Y) - Scales constants by multiples of 1000. For example, instead of typing 1000000, type 1M, and instead of typing 7200, type 7.2k. Other common prefixes are G and T (for a billion and a trillion, useful when working with network and I/O metrics).</li>
<li>Examples: 100, ts(<span style="color:#08838c;font-weight:bold">cpu.load.1m</span>), ts(1)</li>
</ul>
<li>wildcard - Matches strings in metric names, sources, source tags, and point tags. A wildcard is represented with a <strong>"&#42;"</strong> character.  Using a catch-all wildcard (example: <span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;="&#42;"</span>) when filtering by point tags yields only time series that have this point tag present (with any value), and time series that don't have this point tag ("null") are filtered out. To find time series without a specific point tag, use the construct <strong>not</strong> <span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;="&#42;"</span>.</li>
<ul>
<li>Example: <span style="color:#d63a36;font-weight:bold">source=app-1&#42;</span> matches all sources starting with <span style="color:#d63a36;font-weight:bold">app-1</span>: <span style="color:#d63a36;font-weight:bold">app-10</span>, <span style="color:#d63a36;font-weight:bold">app-11</span>, <span style="color:#d63a36;font-weight:bold">app-12</span>, etc.</li>
</ul>
<li><span style="color:#3a0699;font-weight:bold">expression</span> - A ts() expression, constant, or arithmetic or Boolean combination of a ts() expressions and constants.</li>
</ul>

## Operators
<ul>
<li>Boolean operators - combine ts() expressions and constants and the filtering performed by sources, source tags, and point tags.</li>
<ul>
<li markdown="span">`and`: Returns 1 if both arguments are nonzero. Otherwise, returns 0.</li>
<li markdown="span">`or`: Returns 1 if at least one argument is nonzero. Otherwise, returns 0.</li>
<li markdown="span">`[and]`, `[or]`: Perform strict 'inner join' versions of the Boolean operators. Strict operators match metric|source|point tag combinations on both sides of the operator and filter out unmatched combinations.</li></ul>
<li>Arithmetic operators</li>
<ul><li markdown="span">`+`, `-`, `*`, `/`: Match metric, source, and point tag combinations on both sides of an <span style="color:#3a0699;font-weight:bold">expression</span>. If either side of the <span style="color:#3a0699;font-weight:bold">expression</span> is a 'singleton' -- that is, a single metric, source, or point tag combination--it automatically matches up with every element on the other side of the <span style="color:#3a0699;font-weight:bold">expression</span>.</li>
<li markdown="span">`[+]`, `[-]`, `[*]`, `[/]`: Perform strict 'inner join' versions of the arithmetic operators. <span>Strict operators match metric|source|point tag combinations on both sides of the operator and filter out unmatched combinations.</li></ul>
<li>Comparison operators</li>
<ul><li markdown="span">`<`, `<=`, `>`, `>=`, `!=`, `=`: Returns 1 if the condition is true. Otherwise returns 0. Double equals (==) is not a supported Wavefront operator.</li>
<li markdown="span">`[<]`, `[<=]`, `[>]`, `[>=]`, `[=]`, `[!=]`: Perform strict 'inner join' versions of the comparison operators. Strict operators match metric|source|point tag combinations on both sides of the operator and filter out unmatched combinations.</li></ul>
<li>Examples</li>
<ul>
<li>(ts(<span style="color:#08838c;font-weight:bold">my.metric</span>) &gt; 10) and (ts(<span style="color:#08838c;font-weight:bold">my.metric</span>) &lt; 20) returns 1 if <span style="color:#08838c;font-weight:bold">my.metric</span> is between 10 and 20. Otherwise, returns 0.</li>
<li>ts(<span style="color:#08838c;font-weight:bold">cpu.load.1m</span>, <span style="color:#2770e8;font-weight:bold">tag=prod</span> and <span style="color:#2770e8;font-weight:bold">tag=db</span>) returns <span style="color:#08838c;font-weight:bold">cpu.load.1m</span> for all sources tagged with both <span style="color:#2770e8;font-weight:bold">prod</span> and <span style="color:#2770e8;font-weight:bold">db</span>.</li>
<li>ts(<span style="color:#08838c;font-weight:bold">db.query.rate</span>, <span style="color:#2770e8;font-weight:bold">tag=db</span> and not <span style="color:#d63a36;font-weight:bold">source=db5.wavefront.com</span>) returns <span style="color:#08838c;font-weight:bold">db.query.rate</span> for all sources tagged with <span style="color:#2770e8;font-weight:bold">db</span>, except for the <span style="color:#d63a36;font-weight:bold">db5.wavefront.com</span> source.</li>
<li>ts("<span style="color:#08838c;font-weight:bold">smp-fax*.count</span>" and not "<span style="color:#08838c;font-weight:bold">smp-fax*.metrics.wavefront.</span>", <span style="color:#d63a36;font-weight:bold">source="-eq*"</span>) returns all metrics that match "<span style="color:#08838c;font-weight:bold">smp-fax*.count</span>" except for those matching "<span style="color:#08838c;font-weight:bold">smp-fax*.metrics.wavefront.*</span>".</li>
</ul>
</ul>

For further information on operator behavior in series matching, see [Series Matching](query_language_series_matching.html)​.

## Tags in Queries
<ul>
<li>Source tags are a way to group sources together. For example, if you have two sources, <span style="color:#d63a36;font-weight:bold">appServer15</span> and <span style="color:#d63a36;font-weight:bold">appServer16</span>, you could add the source tag <span style="color:#2770e8;font-weight:bold">app</span> to both of them to specify that they are both app servers. Source tags aid in querying by grouping sources together. You can query ts(<span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, <span style="color:#2770e8;font-weight:bold">tag=app</span>) instead of ts(<span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, <span style="color:#d63a36;font-weight:bold">source=appServer15</span> or <span style="color:#d63a36;font-weight:bold">source=appServer16</span>). Both queries yield the same result as long as the <span style="color:#d63a36;font-weight:bold">app</span> tag is added to <span style="color:#d63a36;font-weight:bold">source=appServer15</span> and <span style="color:#d63a36;font-weight:bold">source=appServer16</span>.</li>
<li><span style="color:#3a0699;font-weight:bold">Point tags</span> are an additional way to describe metrics. An example of a point tag is <span style="color:#3a0699;font-weight:bold">region=us-west-2b</span>.</li>
<li>Example: To query a point <span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, source <span style="color:#d63a36;font-weight:bold">app2</span>, and point tag <span style="color:#3a0699;font-weight:bold">region=us-west-2b</span>, specify ts(<span style="color:#08838c;font-weight:bold">cpu.load.metric</span>, <span style="color:#3a0699;font-weight:bold">region=us-west-2b </span>and <span style="color:#d63a36;font-weight:bold">source=app2</span>).</li></ul>

For an overview of tags, see [Organizing with Tags](tags_overview.html).

## Variables in Queries
<ul>
<li>A <em>query line variable</em> allows you to refer to a query line as a variable in another query field within the same chart. The query line variable name is the same as the query line name and is referenced in another query field with the syntax <span style="color:#008a09;font-weight:bold">${queryLineName}</span>. For example, if you have a query line named <span style="font-weight:bold">queryLine1</span> with ts(<span style="color:#08838c;font-weight:bold">requests.latency</span>) as the <span style="color:#3a0699;font-weight:bold">expression</span>, you can enter <span style="color:#008a09;font-weight:bold">${queryLine1}</span> in a another query field to reference ts(<span style="color:#08838c;font-weight:bold">requests.latency</span>). The query line being referenced must be a complete expression. If a query line variable and dashboard variable have the same name, the query line variable overrides the dashboard variable. </li>

<li>An <em>alias</em> defines any ts() expression as an alias within that single query line using a SQL-style "as" expression. The syntax of an alias is: <span style="color:#3a0699;font-weight:bold">expression</span> <span style="font-weight:bold">as</span> <span style="color:#008a09;font-weight:bold">&lt;aliasName&gt;</span>. If you specify <span style="color:#3a0699;font-weight:bold">expression</span> <span style="font-weight:bold">as</span> <span style="color:#008a09;font-weight:bold">myAlias</span>, you reference the alias as 
<span style="color:#008a09;font-weight:bold">$myAlias</span>. You can use <span style="color:#008a09;font-weight:bold">$myAlias</span> multiple times in that query line, and define multiple aliases within a query line. We recommend using alias names that are three letters or longer; specifically, you can't use the SI prefixes (such as k, G, or T) as alias names, and numeric characters are allowed only at the end of the alias name ($test123 is ok, but not $1test or $test4test).<br /><br />

Example: ts(<span style="color:#08838c;font-weight:bold">requests.latency</span>) <span style="font-weight:bold">as</span> <span style="color:#008a09;font-weight:bold">test</span>, used as follows: mavg(120m, <span style="color:#008a09;font-weight:bold">$test</span>)) / sqrt(mvar(120m, <span style="color:#008a09;font-weight:bold">$test</span>)).</li>

<li>A <em>dashboard variable</em> is a variable that can be used within any query line in every chart contained in the dashboard. A dashboard variable can replace any string of text, as opposed to a query line variable and alias which must be a complete expression. If you define <span style="color:#008a09;font-weight:bold">dashvar</span> in a dashboard, you refer to <span style="color:#008a09;font-weight:bold">${dashvar}</span> within any query line. You can use aliases, query line variables, and dashboard variables in the same query line; indeed, you can use the same variable name for a dashboard and an alias (though we don't recommend it). See <a href="dashboards_variables.html">Dashboard Variables</a>.</li></ul>

<span id="aggregate"></span>

## Aggregate and Raw Aggregate Functions
Aggregate and raw aggregate functions provide a way to combine (aggregate) multiple series into a single series. Standard aggregate functions first interpolate the points of the underlying set of series, and then apply the aggregate function to the interpolated series. Raw aggregate functions do not interpolate the underlying series before aggregation. Raw functions aggregate data points by time buckets. For further information, see [Standard Versus Raw Aggregate Functions](query_language_aggregate_functions.html).


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
<td markdown="span">sum(<span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the sum of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">rawsum(<span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the sum of all series.</td>
</tr>
<tr>
<td markdown="span">avg(<span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the average of all series.</td>
</tr>
<tr>
<td markdown="span">rawavg(<span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the average of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">min(<span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the lowest value of all series. </td>
</tr>
<tr>
<td markdown="span">rawmin(<span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the lowest value of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">max(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the highest value of all series. </td>
</tr>
<tr>
<td markdown="span">rawmax(<span style="color:#3a0699;font-weight:bold">expression</span><span style="font-weight:bold">[,metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the highest value of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">count(<span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;])</td>
<td>Returns the number of series that are reporting. </td>
</tr>
<tr>
<td markdown="span">rawcount(<span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the number of series that are reporting. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">variance(<span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the variance of all series. </td>
</tr>
<tr>
<td markdown="span">rawvariance(<span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the variance of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated.</td>
</tr>
<tr>
<td markdown="span">percentile(<span style="color:#d63a36;font-weight:bold">percentileValue</span>, <span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the <span style="color:#d63a36;font-weight:bold">percentileValue</span> value of all series. Example: If <span style="color:#d63a36;font-weight:bold">percentileValue is</span> 99, returns the 99th percentile value of all series.</td>
</tr>
<tr>
<td markdown="span">rawpercentile(<span style="color:#d63a36;font-weight:bold">percentileValue</span>, <span style="color:#3a0699;font-weight:bold">expression</span>[,<span style="font-weight:bold">metrics|sources|sourceTags|tags|</span><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>])</td>
<td>Returns the <span style="color:#d63a36;font-weight:bold">percentileValue</span> value of all series. If there are gaps of data in <span style="color:#3a0699;font-weight:bold">expression</span>, it will be interpolated. Example: If <span style="color:#d63a36;font-weight:bold">percentileValue</span> is 99, returns the 99th percentile value of all series.</td>
</tr>
</tbody>
</table>


### Grouping

When aggregating, to group by metrics, sources, source tags, all point tags keys, or a specific point tag key, use the <br/> \[, **metrics**\|**sources**\|**sourceTags**\|**tags**\|**pointTags**\|<span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;</span>\] group by clause. The clause is applied after the ts() expression, separated by a comma. 

### Examples

-   Group by metrics: sum(ts(<span style="color:#08838c;font-weight:bold">cpu.loadavg.1m</span>), **metrics**)
-   Group by sources: sum(ts(<span style="color:#08838c;font-weight:bold">cpu.loadavg.1m</span>), **sources**)
-   Group by source tags: sum(ts(<span style="color:#08838c;font-weight:bold">cpu.loadavg.1m</span>), **sourceTags**)
-   Group by all available point tag keys: sum(ts(<span style="color:#08838c;font-weight:bold">cpu.loadavg.1m</span>), **tags**) or sum(ts(<span style="color:#08838c;font-weight:bold">cpu.loadavg.1m</span>), **pointTags**)
-   Group by the <span style="color:#3a0699;font-weight:bold">region</span> point tag key: sum(ts(<span style="color:#08838c;font-weight:bold">cpu.loadavg.1m</span>), <span style="color:#3a0699;font-weight:bold">region</span>)

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
<td markdown="span">highpass(<span style="color:#bf5700;font-weight:bold">expression</span>, <span style="color:#3a0699;font-weight:bold">expression</span>[, inner])</td>
<td>Returns only the points in <span style="color:#3a0699;font-weight:bold">expression</span> above <span style="color:#bf5700;font-weight:bold">expression</span>. <span style="color:#bf5700;font-weight:bold">expression</span> can be a constant.</td>
</tr>
<tr>
<td markdown="span">lowpass(<span style="color:#bf5700;font-weight:bold">expression</span>, <span style="color:#3a0699;font-weight:bold">expression</span>[, inner])</td>
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
<td markdown="span">align(<span style="color:#757575;font-weight:bold">timeWindow</span>,<span style="color:#008a09;font-weight:bold">[mean|median|min|max|first|last|sum|count,]</span> <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns 1 value in <span style="color:#3a0699;font-weight:bold">expression</span> for each <span style="color:#757575;font-weight:bold">timeWindow</span>. Example: If you were collecting data once a minute, but wanted data points to be displayed every 30 minutes (summarized by median every 30 minutes), use align(<span style="color:#757575;font-weight:bold">30m</span>, <span style="color:#008a09;font-weight:bold">median</span>, ts(<span style="color:#08838c;font-weight:bold">my.metric</span>)). See <a href="query_language_align_function.html">The <code>align()</code> Function</a>.</td>
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
<td markdown="span">filter(<span style="color:#3a0699;font-weight:bold">expression</span> [<span style="color:#bf5700;font-weight:bold">, metric|source=|tagk=</span>])</td>
<td>Retains the specified metric, source, or point tag in <span style="color:#3a0699;font-weight:bold">expression</span>. No key is required to filter a metric. To <span>filter</span> a particular source or point tag, specify either source= or tagk= respectively. Set <span style="color:#3a0699;font-weight:bold">tagk</span> to the point tag key to filter. You can specify only one parameter (metric|source|point tag) per function call. To specify multiple parameters, use a filter() call for each parameter. filter is similar to retainSeries(), but does not support expanding a source tag.</td>
</tr>
<tr>
<td markdown="span">retainSeries(<span style="color:#3a0699;font-weight:bold">expression</span> [<span style="color:#bf5700;font-weight:bold">, metric|source=|tag=|tagk=</span>])</td>
<td>Retains the specified metric, source, source tag, or point tag in <span style="color:#3a0699;font-weight:bold">expression</span>. No key is required to retain a metric. To retain a particular source, source tag, or point tag, specify one of source=, tag=, or tagk= respectively. Set <span style="color:#3a0699;font-weight:bold">tagk</span> to the point tag key to retain. You can specify only one parameter (metric|source|tag|point tag) per function call. To specify multiple parameters, use a retainSeries() call for each parameter.</td>
</tr>
<tr>
<td markdown="span">removeSeries(<span style="color:#3a0699;font-weight:bold">expression </span> [<span style="color:#bf5700;font-weight:bold">, metric|source=|tag=|tagk=</span>])</td>
<td>Removes the specified metric, source, source tag, or point tag from <span style="color:#3a0699;font-weight:bold">expression</span>. No key is required to remove a metric. To remove a particular source, source tag, or point tag, specify one of source=, tag=, or tagk= respectively. Set <span style="color:#3a0699;font-weight:bold">tagk</span> to the unique point tag key to remove. You can specify only one parameter (metric|source|tag|point tag) per function call. To specify multiple parameters, use a removeSeries() call for each parameter. <br/>A simpler way to remove series is to use Boolean operators. For example, instead of removeSeries(ts("<span style="color:#08838c;font-weight:bold">smp-fax\*.count</span>", <span style="color:#d63a36;font-weight:bold">source="-eq"</span>), "<span style="color:#08838c;font-weight:bold">smp-fax\*.metrics.wavefront.\*</span>") you can use ts("<span style="color:#08838c;font-weight:bold">smp-fax\*.count</span>" and not "<span style="color:#08838c;font-weight:bold">smp-fax\*.metrics.wavefront.*</span>", <span style="color:#d63a36;font-weight:bold">source="-eq*"</span>).
</td>
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
<td markdown="span">limit(<span style=" color:#008a09;font-weight:bold">&lt;numberOfTimeSeries&gt;</span>[, offsetNumber], <span style="color:#3a0699;font-weight:bold"> expression</span>)</td>
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

Moving window time functions allow you to calculate continuous aggregation over sliding windows. For further information, see [Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html).

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
<td markdown="span">mcorr(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression1</span>, <span style="color:#3a0699;font-weight:bold">expression2</span>[, inner])</td>
<td>Returns the moving correlation between two time series <span style="color:#3a0699;font-weight:bold">expressions</span> over <span style="color:#757575;font-weight:bold">timeWindow</span>.</td>
</tr>
<tr>
<td>integrate(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the moving integration on a given time series <span style="color:#3a0699;font-weight:bold">expression</span> over <span style="color:#757575;font-weight:bold">timeWindow</span>.</td>
</tr>
<tr>
<td>integral(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Returns the moving sum over time for the given time series <span style="color:#3a0699;font-weight:bold">expression</span> over the time interval of the current chart window. Always starts at 0 on the left side of the chart showing the total accumulation over the time duration of the current chart window.</td>
</tr>
<tr>
<td>flapping(<span style="color:#757575;font-weight:bold">timeWindow</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
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
<td>Returns <span><span style="color:#bf4b89;font-weight:bold">ThenExpression</span> if <span style="color:#3a0699;font-weight:bold">expression</span> &gt;=1. Otherwise, returns <span style="color:#08838c;font-weight:bold">ElseExpression</span>. Expects a time series expression as a first argument, and, since time series are numeric, only numeric comparisons are supported. When both <span style="color:#bf4b89;font-weight:bold">ThenExpression</span> and <span style="color:#08838c;font-weight:bold">ElseExpression</span> return data, if() performs <a href="query_language_series_matching.html">series matching</a> against <span style="color:#3a0699;font-weight:bold">expression</span>.<br /><br />
Example: If <span style="color:#3a0699;font-weight:bold">expression</span> is ts(<span style="color:#08838c;font-weight:bold">my.metric</span>) &gt;= 10</span>, if (<span style="color:#3a0699;font-weight:bold">expression</span>, ts(<span style="color:#bf4b89;font-weight:bold">my.metric</span>), ts(<span style="color:#08838c;font-weight:bold">another.metric</span>)) returns ts(<span style="color:#bf4b89;font-weight:bold">my.metric</span>) only when ts(<span style="color:#08838c;font-weight:bold">my.metric)</span> &gt;= 10; when ts(<span style="color:#08838c;font-weight:bold">my.metric)</span> &lt; 10, it returns ts(<span style="color:#08838c;font-weight:bold">another.metric</span>).</td>
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
<td markdown="span">default([<span style="color:#757575;font-weight:bold">timeWindow,</span>] [<span style="color:#bf5700;font-weight:bold">delayTime,</span>] <span style="font-weight:bold">defaultValue</span>, <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Fills in gaps in <span style="color:#3a0699;font-weight:bold">expression</span> with <span style="font-weight:bold">defaultValue</span> (whether that's a constant or an expression). The optional argument (<span style="color:#757575;font-weight:bold">timeWindow</span>) fills in that period of time after each existing point (for example, <span style="color:#757575;font-weight:bold">5m</span> for 5 minutes); without this argument, all gaps are filled in. The optional argument (<span style="color:#bf5700;font-weight:bold">delayTime</span>) refers to the amount of time that must pass without a reported value in order for the default value to be applied.</td>
</tr>
<tr>
<td markdown="span">last([<span style="color:#757575;font-weight:bold">timeWindow,</span>] <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Fills in gaps in <span style="color:#3a0699;font-weight:bold">expression</span> with the last known value of <span style="color:#3a0699;font-weight:bold">expression</span>. <span style="color:#757575;font-weight:bold">timeWindow </span> fills in a specified time period after each existing point.</td>
</tr>
<tr>
<td markdown="span">next([<span style="color:#757575;font-weight:bold">timeWindow,</span>] <span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Fills in gaps in <span style="color:#3a0699;font-weight:bold">expression</span> with the next known value of <span style="color:#3a0699;font-weight:bold">expression</span>. <span style="color:#757575;font-weight:bold">timeWindow</span> fills in a specified time period before each existing point.</td>
</tr>
<tr>
<td>interpolate(<span style="color:#3a0699;font-weight:bold">expression</span>)</td>
<td>Fills in gaps in <span style="color:#3a0699;font-weight:bold">expression</span> with a continuous linear interpolation of points.</td>
</tr>
</tbody>
</table>

## Metadata Functions

Metadata functions extract information from an existing set of data to rename a metric or source or create a new synthetic point tag. There are three ways to formulate the alias:

- Node index - Extract a string component based on a <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span>. Components are identified by the default delimiter "." or a delimiter specified in <span style="color:#757575;font-weight:bold">delimiterDefinition</span>.
- Regular expression replacement - Identify the string using a regular expression and replacement string using a replacement pattern.
- String substitution - Replace a metric or source in an expression with a replacement string.

For further information, see [Metadata Functions](query_language_metadata_functions.html).

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
<td markdown="span">aliasMetric(<span style="color:#3a0699;font-weight:bold">expression</span>, [<span style="color:#bf5700;font-weight:bold">metric|source|{tagk, &lt;pointTagKey&gt;},</span>] [<span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span> [<span style="color:#757575;font-weight:bold">,delimiterDefinition</span>] | <span style="font-weight:bold">"regexSearchPattern", "replacementPattern"</span> | <span style="font-weight:bold">"replacementString"</span>])</td>
<td>Returns <span style="color:#3a0699;font-weight:bold">expression</span> with the metric renamed by extracting a string from a metric, source, or point tag value from the result of <span style="color:#3a0699;font-weight:bold">expression</span>, and using that extracted string to rename the metric in <span style="color:#3a0699;font-weight:bold">expression</span>. If you don't specify  <span style="color:#bf5700;font-weight:bold">metric|source|{tagk, &lt;pointTagKey&gt;}</span>, the option is set to <span style="color:#bf5700;font-weight:bold">source</span>.</td>
</tr>
<tr>
<td markdown="span">aliasSource(<span style="color:#3a0699;font-weight:bold">expression</span>, [<span style="color:#bf5700;font-weight:bold">metric|source|{tagk, &lt;pointTagKey&gt;},</span>] [<span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span> [<span style="color:#757575;font-weight:bold">,delimiterDefinition</span>] | <span style="font-weight:bold">"regexSearchPattern", "replacementPattern"</span> | <span style="font-weight:bold">"replacementString"</span>])</td>
<td markdown="span">Returns <span style="color:#3a0699;font-weight:bold">expression</span> with the source renamed by extracting a string from a metric, source, or point tag value from the result of <span style="color:#3a0699;font-weight:bold">expression</span>, and using that extracted string to rename the source in <span style="color:#3a0699;font-weight:bold">expression</span>. If you don't specify  <span style="color:#bf5700;font-weight:bold">metric|source|{tagk, &lt;pointTagKey&gt;}</span>, the option is set to <span style="color:#bf5700;font-weight:bold">source</span>.</td>
</tr>
<tr>
<td markdown="span">taggify(<span style="color:#3a0699;font-weight:bold">expression</span>, <span style="color:#bf5700;font-weight:bold">metric|source|{tagk, &lt;pointTagKey&gt;}</span>, <span style="color:#08838c;font-weight:bold">&lt;newPointTagKey&gt;</span>, [<span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span> [<span style="color:#757575;font-weight:bold">,delimiterDefinition</span>] | <span style="font-weight:bold">"regexSearchPattern", "replacementPattern"</span>])</td>
<td markdown="span">Returns <span style="color:#3a0699;font-weight:bold">expression</span> with a synthetic point tag created by extracting a string from a metric, source, or point tag value
<span>from the result of <span style=" color:#3a0699;font-weight:bold">expression</span>, and using that extracted string to create the tag.</td>
</tr>
</tbody>
</table>

### Examples

- Node index - aliasMetric(ts(<span style="color:#08838c;font-weight:bold">cpu.loadavg.1m</span>, <span style="color:#bf5700;font-weight:bold">source</span>, <span style="color:#238567;font-weight:bold">1</span>)), the extracted string is selected by node index. The metric <span style="color:#3a0699;font-weight:bold">cpu.loadavg.1m</span> has 3 components; setting <span style="color:#238567;font-weight:bold">zeroBasedNodeIndex</span> to <span style="color:#238567;font-weight:bold">1</span> extracts the second component&mdash;<span style="font-weight:bold">loadavg</span>. 
- Node index with delimiter - <span style="color:#08838c;font-weight:bold">cpu-loadavg-1m</span>, set <span style="color:#757575;font-weight:bold">delimiterDefinition</span> to <span style="color:#757575;font-weight:bold">&quot;-&quot;</span>.
- String substitution
  - <span style="color:#008a09;font-weight:bold">original</span> = max(ts(<span style="color:#08838c;font-weight:bold">customer.alerts.active</span>), metrics)
  - <span style="color:#008a09;font-weight:bold">renamed</span> = aliasMetric(<span style="color:#008a09;font-weight:bold">${original}</span>, "Total Number Of Alerts"), which replaces the metric <span style="color:#08838c;font-weight:bold">customer.alerts.active</span> with "Total Number Of Alerts".

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
<td>Returns a ts() expression that is the combination of two or more ts() expressions. The returned expression includes a synthetic collect_&lt;number&gt; point tag, where &lt;number&gt; is the number of input expressions.</td>
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
<colgroup>
<col width="40%" />
<col width="30%" />
<col width="30%" />
</colgroup>
<thead>
<tr><th width="33%">Error</th><th width="34%">Resolution</th><th width="33%">Resolution</th></tr>
</thead>
<tbody>
<tr>
<td>After entering a query expression the following error displays: <em>Query syntax error: Missing expression argument.</em></td>
<td>An <span style="color:#3a0699;font-weight:bold">expression</span> argument to a function is not well-formed.</td>
<td>Build up the <span style="color:#3a0699;font-weight:bold">expression</span> by small steps ensuring that the expression is valid at each step.</td>
</tr>
<tr>
<td>You see the warning indicator <i class="fa-exclamation-triangle fa" style="color: red;"></i> in a chart and a warning something like the following:<br /><br />
<em>The expression: ts(&lt;metric&gt;, source=&lt;source&gt;) has been pre-aligned, making it equivalent to align(120s, mean, ts(&lt;metric&gt;, source=&lt;source&gt;)) in order to improve the performance of the sum() 
aggregation operation. You can wrap the expression with align() to explicitly state the periodicity 
and desired summarization strategy.</em><br /><br />
where sum(ts(&lt;metric&gt;, source=&lt;source&gt;)) is the original query.
</td>
<td>Wavefront has pre-aligned the series to improve performance.
</td>
<td>Depends on the use case. For details, see <a href="query_language_align_function.html">The <code>align()</code> Function</a>.
</td>
</tr>
</tbody>
</table>

