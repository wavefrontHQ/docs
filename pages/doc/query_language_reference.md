---
title: Wavefront Query Language Reference
keywords: query language, queries, functions, expressions, operators, variables, aggregations, conditional, rounding, missing data, metadata, mathematical, event
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_reference.html
summary: Learn about the query syntax, operators, and functions supported by Wavefront Query Language.
---
The Wavefront Query Language allows you to extract the information you need from your data. You use the query language for queries that display in charts and for alerts. This page is a complete reference to all query language elements and functions. You can click most functions for a page with details and examples.


## Query Expressions

A query expression describes data of a particular type: time series, histogram series, events, trace or spans.

<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<thead>
<tr>
<th>Expression</th>
<th>Definition</th>
</tr>
</thead>
<tbody>

<!--- tsExpression ----------------->
<tr>
<td><span style="color:#3a0699;font-weight:bold">&lt;tsExpression&gt;</span></td>
<td>
Describes one or more time series. A  time series is a sequence of data points that each consists of a data value and a timestamp. Every time series is identified by a unique combination of metric name, source name, and point tag values. A <strong>tsExpression</strong> may be any of the following:

<ul>
<li>A <strong>ts() function</strong>, which returns all points that match a metric name, filtered by source names, source tags, and point tags. (<a href="alerts_dependencies.html">Alert metrics</a> are filtered by alert tags.)
<pre>ts(&lt;metricName&gt;
  [,|and|or [not] source=&lt;sourceName&gt;] ...
  [and|or [not] tag=&lt;sourceTag&gt;] ...
  [and|or [not] &lt;pointTagKey&gt;=&lt;pointTagValue&gt;] ... )
</pre>
Example:
<strong>ts(~sample.disk.bytes.written, source=app-1 or source=app-2 and env=dev)</strong>
</li>
<li>A <strong>constant</strong>, which returns a constant value for each data point. 
Specify as a number, or use <a href="https://en.wikipedia.org/wiki/Metric_prefix">SI prefixes</a> (k, M, G, T, P, E, Z, Y) to scale by multiples of 1000. Examples: 
<br><strong>5.01</strong>
<br><strong>40</strong>
<br><strong>1M</strong> (or <strong>1000000</strong>) 
<br><strong>7.2k</strong> (or <strong>7200</strong>) 
</li>
<li>An <a href="#time-series-operators">operator expression</a> that combines <strong>tsExpression</strong>s and constants:
<br><strong>
(ts(disk.space.total) - ts(disk.space.used)) * 2
</strong>
</li>
<li>A query function that returns time series from other input time series: 
<br><strong>
msum(10m, ts(~sample.requests.latency, source=app-14))
</strong>
</li> 
<li>A query function that returns time series by converting input data of another type:
<br><strong>
avg(hs(users.settings.numberOfApiTokens.m))
</strong>
</li> 
</ul>
</td></tr>

<!--- hsExpression ------------------>
<tr>
<td><span style="color:#3a0699;font-weight:bold">&lt;hsExpression&gt;</span></td>
<td>
Describes one or more histogram series. A histogram series is a sequence of histogram distributions Wavefront has computed from the data points of a time series. Each distribution summarizes the points in a time interval (minute, hour, day).  An <strong>hsExpression</strong> may be one of the following:
<ul>
<li>An <a href="hs_function.html"><strong>hs() function</strong></a>, which returns all distributions that match a histogram metric name, filtered by source names, source tags, and point tags. 
<pre>hs(&lt;hsMetricName&gt;
  [,|and|or [not] source=&lt;sourceName&gt;] ...
  [and|or [not] tag=&lt;sourceTag&gt;] ...
  [and|or [not] &lt;pointTagKey&gt;=&lt;pointTagValue&gt;] ... )
</pre>
Example:
<strong>
hs(users.settings.numberOfApiTokens.m, source="host1" and customer="qa")
</strong>
</li>
<li>A <a href="#histogram-to-histogram-functions">query function that returns histogram series</a> from other input histogram series: 
<br><strong>
align(10m, hs(users.settings.numberOfApiTokens.m))
</strong>
</li> 
</ul>
</td></tr>

<!--- eventsExpression --------------->
<tr>
<td><span style="color:#3a0699;font-weight:bold">&lt;eventsExpression&gt;</span></td>
<td>
Describes a set of events.  An <strong>eventsExpression</strong> may be one of the following:

<ul>
<li>An <a href="events_queries.html"><strong>events() function</strong></a>, which returns all events that match the specified event filters. 
<pre>events("&lt;filterName&gt;=&lt;filterValue&gt;" 
  [,|and|or [not] &lt;filterName&gt;=&lt;filterValue&gt;] ... )
</pre>
Example:
<strong>
events(type=alert, name="disk space is low", alertTag=App1.*)
</strong>
</li>

<li>A <a href="#event-functions">query function that returns a set of events</a> from an input event set:
<br><strong>
closed(events(type=alert, name="disk space is low", alertTag=App1.*))
</strong>
</li> 
<li>An <a href="events_queries_advanced.html">events operator expression</a> that combines eventsExpressions:
<br><strong>
events(type=maintenanceWindow) intersect events(name="test")
</strong>
</li> 
</ul>
</td></tr>

<!--- tracesExpression ------------->
<tr>
<td><span style="color:#3a0699;font-weight:bold">&lt;tracesExpression&gt;</span></td>
<td>
Describes a set of traces.  An <strong>tracesExpression</strong> may be one of the following:

<ul>
<li>A <a href="traces_function.html"><strong>traces() function</strong></a>, which returns all traces within at least one span that represents the specified operation and matches the specified <a href="traces_function.html#span-filters">span filters</a>. 
<pre>traces("&lt;fullOperationName&gt;" 
  [,|and|or [ not] &lt;filterName&gt;=&lt;filterValue&gt;] ... )
</pre>
Example:
<strong>
traces("beachshirts.styling.makeShirts")
</strong>

</li>
<li>A <a href="#trace-data-functions">query function that returns a list of traces</a> by filtering an input list of traces:

<br><strong>
lowpass(12ms, traces("beachshirts.styling.makeShirts"))
</strong>
</li> 
</ul>
</td></tr>

</tbody>
</table>


<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Common Parameters

Query expressions use a number of common parameters to specify names and values that describe the data of interest. You can use [wildcards](#wildcards-aliases-and-variables) to match multiple names or values.
 
<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<thead>
<tr>
<th>Parameter</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><span style="color:#3a0699;font-weight:bold">&lt;metricName&gt;</span></td>
<td>The name of a metric that describes one or more time series in a <strong>tsExpression</strong>. Example: 
<pre>cpu.load.metric</pre>
</td></tr>
<tr>
<td><span style="color:#3a0699;font-weight:bold">&lt;hsMetricName&gt;</span></td>
<td>The name of a histogram metric that describes one or more histogram series in an <strong>hsExpression</strong>. A histogram metric name contains the name of the metric from which distributions were calculated, and has an extension (<strong>.m</strong>, <strong>.h</strong>, or <strong>.d</strong>) that indicates the histogram's aggregation interval (minute, hour, or day). Example: 
<pre>users.settings.numberOfTokens.m</pre>
</td></tr>
<tr>
<td><span style="color:#3a0699;font-weight:bold">&lt;sourceName&gt;</span></td>
<td>The name of a source, such as a host or container, that emits the data of interest (time series, histogram series, or trace data). Specify a source name with the <strong>source</strong> keyword.
Example:
<pre>source=appServer15</pre>
</td></tr>
<tr>
<td><span style="color:#3a0699;font-weight:bold">&lt;sourceTag&gt;</span></td>
<td>A source tag that is assigned to a group of data sources. Specify a source tag with the <strong>tag</strong> keyword.
Example: <pre>tag=app.*</pre>
</td></tr>
<tr>
<td><span style="color:#3a0699;font-weight:bold">&lt;pointTagKey&gt;=&lt;pointTagValue&gt;</span></td>
<td>The key and value of a point tag that is associated with the data of interest.
Example: 
<pre>region="us-west-2a" or region="us-west-2b"</pre>

<strong>Note:</strong> Point tags are a type of custom metadata for identifying a time series and any histogram series computed from a time series. Event tags, alert tags, and span tags exist for identifying other types of data. See <a href="tags_overview.html" >Organizing with Tags</a>  for information on the different types of tags and how to use them. 

<!--- link to event filters, alert tags, span filters? --->

</td></tr>

<tr>
<td><span style="color:#3a0699;font-weight:bold">&lt;timeWindow&gt;</span></td>
<td>A measure of time, expressed as an integer number of units. You can specify:
<ul>
<li>Seconds, minutes, hours, days or weeks (1s, 1m, 1h, 1d, 1w). For example, <strong>3h</strong> specifies 3 hours.</li>
<li> Time relative to the window length of the chart you are currently looking at (1vw).
If you are looking at a 30 minute window, <strong>1vw</strong> is one view-window length, and therefore equivalent to <strong>30m</strong>. </li>
<li>Time relative to the bucket size of the chart (1bw). Wavefront calculates bucket size based on the view window length and screen resolution. You can see bucket size at the bottom left of each chart.</li>
</ul>
The default unit is minutes if the unit is not specified.
</td></tr>
</tbody>
</table>


**Note:**

* Rules for valid names are here: [Wavefront Data Format](wavefront_data_format.html#wavefront-data-format-fields).

* Do not use names of functions such as `default` or `sum` or other query language elements as the name of a metric, source, source tag, point tag, or point tag value. If you must, surround the element with double quotes. For example, if you're using a point tag named `default`, use `"default"`.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Wildcards, Aliases, and Variables

You can use wildcards as shortcuts for specifying multiple names or values. 
You can use query line variables, aliases, and dashboard variables as shortcuts for building queries out of other expressions or predefined strings.

You can combine wildcards, aliases, query line variables, and dashboard variables in the same query line.

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

<!--- Wildcard ------------->
<tr>
<td><span style="color:#3a0699;font-weight:bold">wildcard</span></td>
<td>
Matches strings or components in a name or a value. 
<ul>
<li>Use a <strong>"&#42;"</strong> character to indicate where to match strings. Wavefront supports no other wildcard characters. </li>
</ul>
Examples:
<ul>
<li> <strong>ts(~sample.cpu.usage.&#42;)</strong> matches metric names <code>~sample.cpu.usage.user.percentage</code> and <code>~sample.cpu.usage.percentage</code>.
 </li>

<li><strong>hs(tracing.derived.&#42;.duration.micros.m, application=beachshirts)</strong> matches histogram duration metric names for all operations of all services of the <code>beachshirts</code> application.
</li>


<li><strong>source=app-1&#42;</strong> matches all sources starting with <code>"app-1"</code>, such as <code>app-10</code>, <code>app-11</code>, <code>app-12</code>, <code>app-110</code>, and so on.
 </li>

<li><strong>region="&#42;"</strong> matches the time series that have the <code>region</code> point tag with any value, and filter out any time series without a <code>region</code> point tag.
 </li>

<li><strong>not region="&#42;"</strong> finds any time series that do not have the <code>region</code> point tag.</li>
</ul>
</td></tr>

<!--- Alias ------------->
<tr>
<td><span style="color:#3a0699;font-weight:bold">alias</span></td>
<td>Defines a convenient name for referring to a <strong>tsExpression</strong> any number of times in a query.  
<ul>
<li>Use this syntax to define an alias within a query: <strong>&lt;tsExpression&gt; as &lt;aliasName&gt;</strong></li>
<li>Use this syntax to reference the alias in the same query: <strong>$aliasName</strong></li>
</ul>
Example:
<pre>if(ts(requests.latency, source=app-1*) as latency, $latency)</pre>

<strong>Notes:</strong>
<ul>
<li>Best practice: Use alias names that are three letters or longer.</li>
<li>Don't use an <a href="https://en.wikipedia.org/wiki/Metric_prefix">SI prefix</a> (such as p, h, k, M, G, T, P, E, Z, Y, etc.) as an alias name.</li>
<li>Don't use the name of any Wavefront query function. For example, <strong>$sum</strong> is not valid.</li>
<li>Alias names are case sensitive. For example, <strong>$Sum</strong> is valid.</li>
<li markdown="span">Put any numeric characters at the end of the alias name. For example, <strong>$test123</strong> is valid, but <strong>$1test</strong> and <strong>$test4test</strong> are not valid.</li>
<li>You can define multiple aliases in the same query.</li>
</ul>
</td></tr>

<!--- Query line variable ------------->
<tr>
<td><span style="color:#3a0699;font-weight:bold">query line variable</span></td>
<td>Lets one query line refer to another for the same chart. 
The referenced query line must be named, and must contain a complete <strong>tsExpression</strong>.
<ul>
<li>Use the chart UI to name a query: <strong>myQuery</strong> </li>
<li>Use this syntax to reference the named query in another query: <strong>${myQuery}</strong></li>
</ul>
Example. Suppose you assign a name to a long or complex query:
<pre>latency       ts(requests.latency, source=app-1* or source=app2*, env=dev)</pre>

You can reference the named query in another query as follows:
<pre>newQuery      max(${latency})</pre>

<strong>Note:</strong> If a query line variable and dashboard variable have the same name, the query line variable overrides the dashboard variable.
</td></tr>

<!--- Dashboard variable ------------->
<tr>
<td><span style="color:#3a0699;font-weight:bold">dashboard variable</span></td>
<td>Defines a convenient name that expands to a particular string of text in any query line of any chart of a dashboard. 
<ul>
<li>Use the dashboard UI to <a href="dashboards_variables.html">define a dashboard variable</a>: <strong>myDashVar</strong></li>
<li>Use this syntax to refer to the dashboard variable in a query: <strong>${myDashVar}</strong></li>
</ul>

Example. Suppose a dashboard variable <strong>az</strong> has the value <strong>"tag=az-3 or tag=az-4"</strong>. You can use the dashboard variable as follows:
<pre>ts(requests.latency, ${az})</pre>

This is equivalent to typing in:
<pre>ts(requests.latency, tag=az-3 or tag=az-4)</pre>
<strong>Note: </strong> A dashboard variable can expand to any text string, unlike query line variables and aliases, which must be complete tsExpressions.
</td></tr>
</tbody>
</table>

<!---You can even use the same variable name for a dashboard and an alias (though we don't recommend it). --->


<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Time-Series Operators

All operations between `tsExpression`s are subject to the matching processes described in [Series Matching](query_language_series_matching.html)​. The result is always interpolated.

<ul>
<li markdown="span">**Boolean operators** - Combine `tsExpression`s, constants, or filters, such as source names, source tags,  point tags, alert names, alert tags.</li>
<ul>
<li markdown="span">`and`: Returns 1 if both arguments are nonzero. Otherwise, returns 0.</li>
<li markdown="span">`or`: Returns 1 if at least one argument is nonzero. Otherwise, returns 0. </li>
<li markdown="span">`not`: Use this operator to exclude a source, tag, or metric. See the examples below.</li>
<li markdown="span">`[and]`, `[or]`: Perform strict 'inner join' versions of the Boolean operators. Strict operators match metric/source/point tag combinations on both sides of the operator and filter out unmatched combinations.</li></ul>

<li markdown="span">**Arithmetic operators** - Perform addition, subtraction, multiplication, or division on corresponding values of time series that are described by the `tsExpression` arguments on either side of the operator. </li>
<ul><li markdown="span">`+`, `-`, `*`, `/`: Operate on pairs of time series that have matching metric, source, and point tag combinations. If either side of the operator is a 'singleton' -- that is, a single series with a unique metric/source/point tag combination -- it automatically matches up with every time series on the other side of the operator.</li>
<li markdown="span">`[+]`, `[-]`, `[*]`, `[/]`: Perform strict 'inner join' versions of the arithmetic operators. <span>Strict operators match metric/source/point tag combinations on both sides of the operator and filter out unmatched combinations.</li></ul>

<li markdown="span">**Comparison operators** -- Compare corresponding values of time series that are described by the `tsExpression` arguments on either side of the operator.</li>
<ul><li markdown="span">`<`, `<=`, `>`, `>=`, `!=`, `=`: Returns 1 if the condition is true. Otherwise returns 0. Double equals (==) is not a supported Wavefront operator.</li>
<li markdown="span">`[<]`, `[<=]`, `[>]`, `[>=]`, `[=]`, `[!=]`: Perform strict 'inner join' versions of the comparison operators. Strict operators match metric/source/point tag combinations on both sides of the operator and filter out unmatched combinations.</li>
</ul>

<li markdown="span">**Examples**</li>
<ul>
<li markdown="span">`(ts(my.metric) > 10) and (ts(my.metric) < 20)` returns 1 if `my.metric` is between 10 and 20. Otherwise, returns 0.</li>
<li markdown="span">`ts(cpu.load.1m, tag=prod and tag=db)` returns `cpu.load.1m` for all sources tagged with both `prod` and `db`.</li>
<li markdown="span">`ts(db.query.rate, tag=db and not source=db5.wavefront.com)` returns `db.query.rate` for all sources tagged with `db`, except for the `db5.wavefront.com` source.</li>
<li markdown="span">`ts("smp-fax*.count" and not "smp-fax*.metrics.wavefront.", source="-eq*"` returns all metrics that match `"smp-fax*.count"` except for those matching `"smp-fax*.metrics.wavefront.*"` for any sources that start with `-eq`.</li>
</ul>
</ul>



<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

<span id="aggregate"></span>

## Aggregation Functions

[Aggregation functions](query_language_aggregate_functions.html) are a way to combine (aggregate) multiple time series into a single result series. Wavefront provides two types of aggregation functions differ in how they handle data points that do not line up:
* Standard aggregation functions interpolate values wherever necessary in each input series. Then the aggregation function itself is applied to the interpolated series.
* Raw aggregation functions do not interpolate the underlying series before aggregation.

All aggregation functions provide parameters for filtering the set of input series, as well as 'group by' parameters for returning separate results for groups of input series that share common metric names, source names, source tags, point tags, and point-tag values.

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
<td><a href="ts_sum.html">sum(<strong>&lt;tsExpression&gt;</strong> &lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong> &rbrack;)</a></td>
<td>Returns the sum of the time series described by <strong>tsExpression</strong>.
The results might be computed from real reported values and interpolated values.</td>
</tr>
<tr>
<td><a href="ts_rawsum.html"> rawsum(<strong>&lt;tsExpression&gt;</strong> &lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the raw sum of the time series described by <strong>tsExpression</strong>.
The results are computed from real reported data values only, with no interpolated values.</td>
</tr>
<tr>
<td><a href="ts_avg.html"> avg(<strong>&lt;tsExpression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the average (mean) of the time series described by <strong>tsExpression</strong>.
The results might be computed from real reported values and interpolated values.  </td>
</tr>
<tr>
<td><a href="ts_rawavg.html"> rawavg(<strong>&lt;tsExpression&gt;</strong> &lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the raw average (mean) of the time series described by <strong>tsExpression</strong>.
The results are computed from real reported data values only, with no interpolated values. </td>
</tr>
<tr>
<td><a href="ts_min.html"> min(<strong>&lt;tsExpression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the lowest value across the time series described by <strong>tsExpression</strong>. The results might be computed from real reported values and interpolated values.  </td>
</tr>
<tr>
<td><a href="ts_rawmin.html"> rawmin(<strong>&lt;tsExpression&gt;</strong>&lbrack;,<strong> metrics|sources| sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the lowest value across the time series described by <strong>tsExpression</strong>. The results are computed from real reported data values only, with no interpolated values. </td>
</tr>
<tr>
<td><a href="ts_max.html"> max(<strong>&lt;tsExpression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the highest value across the time series described by <strong>tsExpression</strong>. The results might be computed from real reported values and interpolated values. </td>
</tr>
<tr>
<td><a href="ts_rawmax.html"> rawmax(<strong>&lt;tsExpression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the highest value across the time series described by <strong>tsExpression</strong>. The results are computed from real reported data values only, with no interpolated values. </td>
</tr>
<tr>
<td><a href="ts_count.html">count(<strong>&lt;tsExpression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the number of reporting time series described by <strong>tsExpression</strong>,
where a time series is counted as reporting even if it has interpolated values. </td>
</tr>
<tr>
<td><a href="ts_rawcount.html"> rawcount(<strong>&lt;tsExpression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the number of reporting time series described by <strong>tsExpression</strong>, where a time series is counted as reporting at a given moment only if it has a real data value, instead of an interpolated value. </td>
</tr>
<tr>
<td><a href="ts_variance.html"> variance(<strong>&lt;tsExpression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the variance based on the time series described by <strong>tsExpression</strong>.
The results might be computed from real reported values and interpolated values.  </td>
</tr>
<tr>
<td><a href="ts_rawvariance.html"> rawvariance(<strong>&lt;tsExpression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the variance across the time series described by <strong>tsExpression</strong>. The results are computed from real reported data values only, with no interpolated values. </td>
</tr>
<tr>
<td><a href="ts_percentile.html"> percentile(<strong>&lt;percentage&gt;</strong><strong>&lt;tsExpression&gt;</strong>&lbrack;,<strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the estimated percentile for the specified <strong>percentage</strong>, across the time series described by <strong>tsExpression</strong>.
The results might be computed from real reported values and interpolated values.</td>
</tr>
<tr>
<td><a href="ts_rawpercentile.html"> rawpercentile(<strong>&lt;percentage&gt;</strong>,<strong>&lt;tsExpression&gt;</strong>&lbrack; ,<strong>metrics|sources| sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Returns the estimated percentile for the specified <strong>percentage</strong>, across the time series described by <strong>tsExpression</strong>.
The results are computed from real reported data values only, with no interpolated values. </td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
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
<td markdown="span"><a href="ts_highpass.html"> highpass(<strong>&lt;tsExpression1&gt;</strong>, <strong>&lt;tsExpression2&gt;</strong>[, <strong>inner</strong>])</a></td>
<td>Returns only the points in <strong>tsExpression2</strong> that are above <strong>tsExpression1</strong>. <strong>tsExpression1</strong> can be a constant.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_lowpass.html"> lowpass(<strong>&lt;tsExpression1&gt;</strong>, <strong>&lt;tsExpression2&gt;</strong>[, <strong>inner</strong>])</a></td>
<td>Returns only the points in <strong>tsExpression2</strong> that are below <strong>tsExpression1</strong>. <strong>tsExpression1</strong> can be a constant.</td>
</tr>
<tr>
<td><a href="ts_min.html">min(<strong>&lt;tsExpression1&gt;</strong>, <strong>&lt;tsExpression2&gt;</strong>)</a></td>
<td>Returns the lower of the two values in <strong>tsExpression1</strong> and <strong>tsExpression2</strong>. For example: <strong>min(160, ts(my.metric))</strong> returns 160 if <strong>my.metric</strong> is &gt; 160. If <strong>my.metric</strong> is &lt; 160, returns the value of <strong>my.metric</strong>.</td>
</tr>
<tr>
<td><a href="ts_max.html">max(<strong>&lt;tsExpression1&gt;</strong>, <strong>&lt;tsExpression2&gt;</strong>)</a></td>
<td>Returns the higher of the two values in <strong>tsExpression1</strong> and  <strong>tsExpression2</strong>. For example: <strong>max(160, ts(my.metric))</strong> returns 160 if <strong>my.metric</strong> is &lt; 160. If <strong>my.metric</strong> is &gt; 160, returns the value of <strong>my.metric</strong>.</td>
</tr>
<tr>
<td><a href="ts_between.html">between(<strong>&lt;tsExpression&gt;</strong>, <strong>&lt;lower&gt;</strong>, <strong>&lt;upper&gt;</strong>)</a></td>
<td>Returns 1 if <strong>tsExpression</strong> is &gt;= <strong>lower</strong> and &lt;= <strong>upper</strong>. Otherwise, returns 0. This function outputs continuous time series.</td>
</tr>
<tr>
<td><a href="ts_downsample.html">downsample(<strong>&lt;timeWindow&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the values in <strong>tsExpression</strong> that occur in each time window. For example: <strong>downsample(30m, ts(my.metric))</strong> returns the values of <strong>my.metric</strong> every half hour.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_align.html"> align(<strong>&lt;timeWindow&gt;</strong>,<strong>[mean|median|min|max|first|last|sum|count,]</strong> <strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Groups the data values of a time series into buckets of size <strong>timeWindow</strong>, and returns one displayed value per bucket. Each returned value is the result of combining the data values in a bucket using the specified summarization method.</td>
</tr>
<tr>
<td><a href="ts_topk.html">topk(<strong>&lt;numberOfTimeSeries&gt;</strong>,  <strong>[mean|median|min|max|sum|count, [&lt;timeWindow&gt;,]]</strong> <strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the top <strong>numberOfTimeSeries</strong> series described by <strong>tsExpression</strong>. Ranking for a series is based on its last displayed data value or on data values summarized over a time window.</td>
</tr>
<tr>
<td><a href="ts_bottomk.html">bottomk(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>[mean|median|min|max|sum|count, [&lt;timeWindow&gt;,]]</strong> <strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the bottom <strong>numberOfTimeSeries</strong> series described by <strong>tsExpression</strong>. Ranking for a series is based on its last displayed data value or on data values summarized over a time window.</td>
</tr>
<tr>
<td><a href="ts_top.html">top(<strong>&lt;numberOfTimeSeries&gt;</strong>,  <strong>[mean|median|min|max|sum|count, [&lt;timeWindow&gt;,]]</strong> <strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns 1 for the top <strong>numberOfTimeSeries</strong> series described by <strong>tsExpression</strong>, and 0 for the remaining series. Ranking for a series is based on its last displayed data value or on data values summarized over a time window.</td>
</tr>
<tr>
<td><a href="ts_bottom.html">bottom(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>[mean|median|min|max|sum|count, [&lt;timeWindow&gt;,]]</strong> <strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns 1 for the bottom <strong>numberOfTimeSeries</strong> series described by <strong>tsExpression</strong>, and 0 for the remaining series. Ranking for a series is based on its last displayed data value or on data values summarized over a time window.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_filter.html">filter(<strong>&lt;tsExpression&gt;</strong> <strong>[, &lt;metricName&gt;| source=&lt;sourceName&gt;|tagk=&lt;pointTagKey&gt;]</strong>)</a></td>
<td>Retains only the time series in  <strong>tsExpression</strong> that match the specified metric, source, or point tag. No key is required to filter a time series. <strong>filter()</strong> is similar to <strong>retainSeries()</strong>, but does not support matching a source tag.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_retainSeries.html">retainSeries(<strong>&lt;tsExpression&gt; [, &lt;metricName&gt;|source=&lt;sourceName&gt;|tag=&lt;sourceTag&gt;|tagk=&lt;pointTagKey&gt;]</strong>)</a></td>
<td>Retains only the time series in <strong>tsExpression</strong> that match the specified metric, source, source tag, or point tag. No key is required to retain a time series. </td>
</tr>
<tr>
<td markdown="span"><a href="ts_removeSeries.html">removeSeries(<strong>&lt;tsExpression&gt; [, &lt;metricName&gt;|source=&lt;sourceName&gt;|tag=&lt;sourceTag&gt;|tagk=&lt;pointTagKey&gt;]</strong>)</a></td>
<td>Suppresses any time series in <strong>tsExpression</strong> that matches the specified metric, source, source tag, or point tag. No key is required to remove a time series.
</td>
</tr>
<tr>
<td><a href="ts_sample.html">sample(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>&lt;tsExpression&gt;)</strong></a></td>
<td>Returns a non-random sample set of <strong>numberOfTimeSeries</strong> time series based on <strong>tsExpression</strong>. Repeated calls display the same sample set as long as the underlying set of time series stays the same. </td>
</tr>
<tr>
<td><a href="ts_random.html">random(<strong>&lt;numberOfTimeSeries&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns a random set of <strong>numberOfTimeSeries</strong> time series based on <strong>tsExpression</strong>. Repeated calls always display different sample sets.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_limit.html">limit(<strong>&lt;numberOfTimeSeries&gt;[, &lt;offsetNumber&gt;],  &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns <strong>numberOfTimeSeries</strong> time series. Use the optional <strong>offsetNumber</strong> to specify an index to start with. </td>
</tr>
<tr>
<td><a href="ts_hideBefore.html"> hideBefore(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Hides data before a specified time. For example, <strong>hideBefore(10m)</strong> hides data that’s older than 10 minutes.  </td>
</tr>
<tr><td><a href="ts_hideAfter.html"> hideAfter(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Hides data after a specified time. For example, <strong>hideAfter(10m)</strong> hides data that’s newer than 10 minutes ago. </td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
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
<td><a href="ts_rate.html">rate(&lbrack;<strong>&lt;timeWindow&gt;</strong>,&rbrack; <strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the per-second change of the time series described by <strong>tsExpression</strong>. Recommended for counter metrics that report only increasing data values over regular time intervals. Handles counter resets.</td>
</tr>
<tr>
<td><a href="ts_deriv.html">deriv(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the per-second change of the time series described by <strong>tsExpression</strong>. Appropriate for metrics that report increasing or decreasing data values.</td>
</tr>
<tr>
<td><a href="ts_ratediff.html">ratediff(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the differences between adjacent values in each time series described by <strong>tsExpression</strong>. Recommended for counter metrics that report only increasing data values over irregular time intervals. Handles counter resets.</td>
</tr>
<tr>
<td><a href="ts_lag.html">lag(<strong>&lt;timeWindow&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns earlier data values from the time series described by <strong>tsExpression</strong>, time-shifting the values by <strong>timeWindow</strong> to enable you to compare a time series with its own past behavior. </td>
</tr>
<tr>
<td><a href="ts_lead.html">lead(<strong>&lt;timeWindow&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns later data values from the time series described by <strong>tsExpression</strong>, time-shifting the values by <strong>timeWindow</strong> to enable you to compare a time series with its own subsequent or forecasted behavior. </td>
</tr>
<tr>
<td><a href="ts_at.html">at(<strong>&lt;atTime&gt;</strong>, &lbrack;<strong>&lt;lookbackWindow&gt;</strong>,&rbrack; <strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns a data value reported at a particular time by the time series described by <strong>tsExpression</strong>. The returned value is displayed continuously across the chart, so you can use it as a reference value for comparing against other queries. </td>
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
<td><a href="ts_timestamp.html">timestamp(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the timestamps associated with the reported data values in the time series described by <strong>tsExpression</strong>. </td>
</tr>
<tr>
<td><a href="ts_time.html">time()</a></td>
<td>Returns the epoch seconds representing each point in time.</td>
</tr>
</tbody>
</table>


<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

<span id="moving"></span>
## Moving Window Time Functions

Moving window time functions allow you to calculate continuous aggregation over sliding windows. For further information, see [Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html).

These functions output continuous time series, with the exception of `integral()`.

<table style="width: 100%;">
<colgroup>
<col width="40%" />
<col width="60%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="ts_mavg.html">mavg(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the moving average of each series for the specified time window.</td>
</tr>
<tr>
<td><a href="ts_msum.html">msum(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the moving sum of each series for the specified time window. Don't confuse this function with mcount(), which returns the <em>number of data points</em>.</td>
</tr>
<tr>
<td><a href="ts_mmedian.html">mmedian(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the moving median of each series for the specified time window.</td>
</tr>
<tr>
<td><a href="ts_mvar.html">mvar(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the moving variance of each series for the specified time window. </td>
</tr>
<tr>
<td><a href="ts_mcount.html"> mcount(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the number of data points reported by each time series over the specified time window. </td>
</tr>
<tr>
<td><a href="ts_mmin.html">mmin(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the minimum of each series for the specified time window. </td>
</tr>
<tr>
<td><a href="ts_mmax.html">mmax(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the maximum of each series for the specified time window.</td>
</tr>
<tr>
<td><a href="ts_mpercentile.html">mpercentile(<strong>&lt;timeWindow&gt;, &lt;percentileValue&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the <strong>percentile</strong> of each series for the specified time window. The percentile value must be greater than <strong>0</strong> and less than <strong>100</strong>. </td>
</tr>
<tr>
<td><a href="ts_mseriescount.html"> mseriescount(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt; &lbrack;,metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;&rbrack;</strong>)</a></td>
<td>Returns the aggregated number of series reporting during the specified time window. </td>
</tr>
<tr>
<td><a href="ts_mdiff.html">mdiff(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the difference between the current value of the expression and the expression's value at the point in time that is <strong>timeWindow</strong> ago. This function doesn't interpolate the points before doing the subtraction.
</td>
</tr>
<tr>
<td><a href="ts_mcorr.html">mcorr(<strong>&lt;timeWindow&gt;, &lt;tsExpression1&gt;, &lt;tsExpression2&gt;  &lbrack;, <strong>inner</strong>&rbrack;</strong>)</a></td>
<td>Returns the moving correlation between two expressions for a specified time window.</td>
</tr>
<tr>
<td><a href="ts_integrate.html">integrate(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the moving integration for the specified expression for the specified time window.</td>
</tr>
<tr>
<td><a href="ts_integral.html">integral(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the moving sum over time for the given expression over the time window of the current chart window.</td>
</tr>
<tr>
<td><a href="ts_flapping.html">flapping(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the number of times a counter has reset within the specified time window.</td>
</tr>
<tr>
<td><a href="ts_any.html">any(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns 1 if the expression has been non-zero at <em>any</em> time during the specified time window. Otherwise, returns 0.</td>
</tr>
<tr>
<td><a href="ts_all.html">all(<strong>&lt;timeWindow&gt;, &lt;tsExpression&gt;</strong>)</a></td>
<td>Returns 1 if the expression has been non-zero at <em>every</em> point in time during the time window. Otherwise, returns 0.</td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
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
<td><a href="ts_if.html">if(<strong>&lt;condition-tsExpression&gt;</strong>, <strong>&lt;then-tsExpression&gt;</strong> &lbrack;, <strong>&lt;else-tsExpression&gt;</strong>&rbrack;)</a></td>
<td>Returns points from <strong>then-tsExpression</strong> only while <strong>condition-tsExpression</strong> &gt; 0. Otherwise, returns points from <strong>else-tsExpression</strong>, if it is specified. <strong>condition-tsExpression</strong> must evaluate to a series of numeric values, and typically includes numeric comparisons or transformations of time series. When both <strong>then-tsExpression</strong> and <strong>else-tsExpression</strong> return data, if() performs <a href="query_language_series_matching.html">series matching</a> against <strong>condition-tsExpression</strong>.
</td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
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
<td><a href="ts_round.html">round(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the nearest integer for each data value in the specified time series.
</td>
</tr>
<tr>
<td><a href="ts_ceil.html">ceil(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the ceiling for the specified time series, by rounding any data values with decimals up to the next largest integer.</td>
</tr>
<tr>
<td><a href="ts_floor.html">floor(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the floor for the specified time series, by rounding any data values with decimals down to the next smallest integer.</td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
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
<td><a href="ts_default.html">default(&lbrack;<strong>&lt;timeWindow&gt;,</strong> &rbrack;<strong>&lt;delayTime&gt;</strong> <strong>&lt;defaultValue&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>)</a>
</td>
<td>Fills in gaps in <strong>tsExpression</strong> with <strong>defaultValue</strong> (whether that's a constant or an expression). The optional <strong>timeWindow</strong> parameter fills in the specified period of time after each existing point (for example, <strong>5m</strong> for 5 minutes). Without this argument, all gaps are filled in. The optional <strong>delayTime</strong> parameter specifies the amount of time that must pass without a reported value in order for the default value to be applied.</td>
</tr>
<tr>
<td><a href="ts_last.html">last(&lbrack;<strong>&lt;timeWindow&gt;,</strong> &rbrack; <strong>&lt;tsExpression&gt;</strong>)</a>
</td>
<td>Fills in gaps in <strong>tsExpression</strong> with the last known value of <strong>tsExpression</strong>. Use the optional <strong>timeWindow</strong> parameter to fill in a specified time period after each existing point.</td>
</tr>
<tr>
<td><a href="ts_next.html">next(&lbrack;<strong>&lt;timeWindow&gt;,</strong> &rbrack; <strong>&lt;tsExpression&gt;</strong>)</a>
</td>
<td>Fills in gaps in <strong>tsExpression</strong> with the next known value of <strong>tsExpression</strong>. Use the optional <strong>timeWindow</strong> parameter to fill in a specified time period before the first data point after the missing data.</td>
</tr>
<tr>
<td><a href="ts_interpolate.html">interpolate(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Fills in gaps in <strong>tsExpression</strong> with a continuous linear interpolation of points.</td>
</tr>
</tbody>
</table>


<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Metadata Functions

Metadata functions help users rename a metric, source, or create a synthetic point tag on a metric. There are three ways to formulate the alias:

- Node index - Extract a string component based on a <strong>zeroBasedNodeIndex</strong>. Components are identified by the default delimiter "." or a delimiter specified in <strong>delimiterDefinition</strong>.
- Regular expression replacement - Identify the string using a regular expression and replacement string using a replacement pattern.
- String substitution - Replace a metric or source in an expression with a replacement string.

<table style="width: 100%;">
<colgroup>
<col width="55%" />
<col width="45%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="ts_aliasMetric.html"> aliasMetric(<strong>&lt;tsExpression&gt;</strong>, &lbrack;<strong>metric|source|&lbrace;tagk,&lt;pointTagKey&gt;&rbrace;</strong>,&rbrack; 
<strong>zeroBasedNodeIndex&lbrack;,  "delimiterDefinition"</strong>&rbrack; | <strong>"regexSearchPattern", "replacementPattern" | "replacementString")</strong></a></td>
<td markdown="span">Extracts a string from an existing metric name, source name, or point tag value in the <strong>tsExpression</strong> and renames the metric with that string. If you don't specify the <strong>metric|source|{tagk, &lt;pointTagKey&gt;}</strong> parameter, it defaults to <strong>source</strong>. </td>
</tr>
<tr>
<td><a href="ts_aliasSource.html"> aliasSource(<strong>&lt;tsExpression&gt;</strong>, 
&lbrack;<strong>metric|source|&lbrace;tagk,&lt;pointTagKey&gt;&rbrace;</strong>,&rbrack; 
<strong>zeroBasedNodeIndex&lbrack;, "delimiterDefinition"</strong>&rbrack; | <strong>"regexSearchPattern", "replacementPattern" | "replacementString")</strong></a></td>
<td markdown="span">Replaces one or more source names in the <strong>tsExpression</strong> with a string extracted from the metric name(s), source name(s), or point tag value(s).
</td>
</tr>
<tr>
<td><a href="ts_taggify.html"> taggify(<strong>&lt;tsExpression&gt;</strong>, <strong>metric|source|&lbrace;tagk,&lt;pointTagKey&gt;&rbrace;</strong>, <strong>&lt;newPointTagKey&gt;</strong>, <strong>zeroBasedNodeIndex&lbrack;, "delimiterDefinition"</strong>&rbrack; | <strong>"regexSearchPattern", "replacementPattern" | "replacementString")</strong></a>
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

  <table style="width: 100%;">
  <tbody>
  <tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
  </tbody>
  </table>

## Join Function

See [Combining Time Series With join()](query_language_series_joining.html) for syntax and examples.

The `join()` function enables you to: 
* Compare two or more time series, and find matches, or, conversely, find the time series that do not match.
* Combine the data points from any matching time series to form a new synthetic time series with point tags from one or both of the input series.

The Wavefront `join()` function is modeled after the SQL JOIN operation, and supports inner joins, left outer joins, right outer joins, and full outer joins. 

**Note:** Using `join()` for an inner join is an explicit way to perform series matching between two groups of time series. As an alternative for certain simple use cases, you can use an operator that performs [implicit series matching](query_language_series_matching.html). 

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Exponential and Trigonometric Functions
<table style="width: 100%;">
<colgroup>
<col width="55%" />
<col width="45%" />
</colgroup>
<thead>
<tr>
<th>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="ts_sqrt.html">sqrt(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the square root of each data value described by the expression.</td>
</tr>
<tr>
<td markdown="span"><a href="ts_pow.html">pow(<strong>&lt;baseExpression&gt;</strong>, <strong>&lt;exponentExpression&gt;</strong>[, <strong>inner</strong>])</a></td>
<td>Raises the base expression to the power of the exponent expression. </td>
</tr>
<tr>
<td><a href="ts_exp.html">exp(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the natural exponential for each data value described by the expression.</td>
</tr>
<tr>
<td><a href="ts_log.html">log(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the natural log of each data value described by the expression.</td>
</tr>
<tr>
<td><a href="ts_log10.html">log10(<strong>&lt;tsExpression&gt;</strong>)</a></td>
<td>Returns the log base 10 of each data value described by the expression.</td>
</tr>
<tr>
<td>sin(<strong>&lt;tsExpression&gt;</strong>), cos(<strong>&lt;tsExpression&gt;</strong>), tan(<strong>&lt;tsExpression&gt;</strong>),<br/>asin(<strong>&lt;tsExpression&gt;</strong>), acos(<strong>&lt;tsExpression&gt;</strong>),<br/>atan(<strong>&lt;tsExpression&gt;</strong>),
atan2(<strong>&lt;y-expression&gt;, &lt;x-expression&gt;</strong>),<br/>sinh(<strong>&lt;tsExpression&gt;</strong>), cosh(<strong>&lt;tsExpression&gt;</strong>), tanh(<strong>&lt;tsExpression&gt;</strong>)</td>
<td>Performs the specified trigonometric function on each data value described by the expression. <br>See <a href="ts_trig.html">Trigonometric Functions</a> for details.</td>
</tr>
<tr>
<td>toDegrees(<strong>&lt;numRadians&gt;</strong>), <br>toRadians(<strong>&lt;numDegrees&gt;</strong>)</td>
<td>Converts radians to degrees, and vice versa. <br>See <a href="ts_trig_utilities.html">Trigonometric Utility Functions</a> for details.</td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## String Manipulation Functions

We support 3 groups of string manipulation functions. For each group:
* The first argument is a metric, source, or point tag to manipulate.
* Additional arguments depend on the group:
  - The first group takes an expression as the second argument, for example, `length(service, ${ts})`.
  - The second group takes a string and an expression arguments, for example, `startsWith(service, "newV", ${ts})` Use those functions, for example, to see whether a specified string is found in an expression.
  - The third group takes one or two numbers and allows you for example, to find the character at a certain location, for example, `charAt(service, 3, ${ts})`.
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
<tr><td><a href="ts_length.html">length(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Returns the length of a string</td>
</tr>
<tr><td><a href="ts_isblank.html">isEmpty(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Returns true if the value of the metric, source, or point tag string is the empty string, and returns false otherwise.</td>
</tr>
<tr><td><a href="ts_isblank.html">isBlank(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Returns true if the value of the metric, source, or point tag string is a blank character (<strong>" "</strong>), and returns false otherwise.</td>
</tr>
<tr><td><a href="ts_tolowercase.html">toLowerCase(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Converts all upper case characters in the string extracted from the expression to lower case. </td>
</tr>

<tr><td><a href="ts_tolowercase.html">toUpperCase(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Converts all lower case characters in the string extracted from the expression to upper case.</td>
</tr>

<tr><td><a href="ts_trim.html">trim(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Removes a single leading white space and/or a single trailing white space, but does not remove multiple leading or trailing white spaces.  </td>
</tr>
<tr><td><a href="ts_trim.html">strip(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Removes both leading and trailing white spaces from a string.</td>
</tr>
<tr><td><a href="ts_trim.html">stripLeading(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Removes leading white spaces from a string.</td>
</tr>
<tr><td><a href="ts_trim.html">stripTrailing(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Removes trailing white spaces from a string. </td>
</tr>
<tr><td><a href="ts_equals.html">equals(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;string&gt;</strong> <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Compares a string extracted from an expression to a specified string.  </td>
</tr>
<tr><td><a href="ts_equals.html">equalsIgnoreCase(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;string&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Compares a string extracted from an expression to a specified string and ignores case. With this function `string` is equal to `StRiNg` </td>
</tr>
<tr><td><a href="ts_startswith.html">startsWith(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;string&gt;</strong>, <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Lets you check whether a string extracted from an expression starts with a specified string.
 </td>
</tr>
<tr><td><a href="ts_startswith.html">endsWith(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;string&gt;</strong>,  <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Lets you check whether a string extracted from an expression starts with a specified string.  </td>
</tr>
<tr><td><a href="ts_indexof.html">indexOf(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;string&gt;</strong>,  <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Compares a string extracted from an expression to a specified string and returns where the specified string starts in the extracted string.</td>
</tr>
<tr><td><a href="ts_indexof.html">lastIndexOf(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;string&gt;</strong>,  <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Compares a string extracted from an expression to a specified string starting at the back and returns where the specified string starts in the extracted string. </td>
</tr>
<tr><td><a href="ts_concat.html">concat(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;string&gt;</strong>,  <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Lets you concatenate a specified string with a extracted from an expression. That means we add the specified string at the end of the extracted string. </td>
</tr>
<tr><td><a href="ts_matches.html">matches(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;string&gt;</strong>,  <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Compares a string extracted from an expression to a specified string, and returns true if the two strings match exactly and false otherwise.
</td>
</tr>
<tr><td><a href="ts_matches.html">contains(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;string&gt;</strong>,  <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Compares a string extracted from an expression to a specified string, and returns true if the extracted string contains the specified string and false otherwise.  </td>
</tr>
<tr><td><a href="ts_charat.html">charAt(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;integer&gt;</strong>,  <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Retrieves the character at the position specified by an integer from a string extracted from an expression. </td>
</tr>
<tr><td><a href="ts_substring.html">substring(<strong>metric|source|&lt;pointTagKey&gt;</strong>, &lbrack;<strong>&lt;integer&gt;</strong>&rbrack;|&lbrack;<strong>&lt;integer1&gt;</strong>, <strong>&lt;integer2&gt;</strong>&rbrack;,  <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Extracts a substring from a string extracted from an expression.</td>
</tr>
<tr><td><a href="ts_repeat.html">repeat(<strong>metric|source|&lt;pointTagKey&gt;</strong>, <strong>&lt;integer&gt;</strong>,  <strong>&lt;tsExpression&gt;</strong>) </a></td>
<td>Repeats a string extracted from an expression the specified number of times. </td>
</tr>

</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Predictive Functions

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
<td><a href="ts_anomalous.html">anomalous(<strong>&lt;testWindow&gt;</strong>, &lbrack;<strong>&lt;confidenceFactor&gt;</strong>,&rbrack; &lbrack;<strong>&lt;historyWindow&gt;</strong>, &lbrack;<strong>&lt;alignWindow&gt;</strong>,&rbrack;&rbrack; <strong>&lt;tsExpression&gt;</strong>)</a>
</td>
<td>Returns the percentage of anomalous points in each time series described by the expression. Anomalous points have values that fall outside an expected range, as determined by <strong>confidenceFactor</strong>. </td>
</tr>

<tr>
<td><a href="ts_hw.html">hw(<strong>&lt;historyLength&gt;</strong>, <strong>&lt;seasonLength&gt;</strong>, <strong>&lt;samplingRate&gt;</strong>, <strong>&lt;tsExpression&gt;</strong> &lbrack;<strong>&lt;alpha&gt;, &lt;beta&gt;, &lt;gamma&gt;</strong>&rbrack;)</a>
</td>
<td>Returns a smoothed version of each time series described by the expression, and forecasts its future points using the Holt-Winters triple exponential smoothing algorithm for seasonal data.</td>
</tr>
<tr>
<td><a href="ts_nnforecast.html"><strong>nnforecast(&lt;forecastPeriod&gt;, [&lt;confidenceFactor&gt;,] &lt;tsExpression&gt;, [with_bounds])</strong></a>
</td>
<td>Forecasts future data values for each time series described by the expression. It uses hypothesis testing and neural networks for prediction. </td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## <span id="misc"></span>Miscellaneous Time-Series Functions
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
<a href="ts_collect.html">collect(<strong>&lt;tsExpression1&gt;</strong>, <strong>&lt;tsExpression2&gt;</strong> &lsqb;, <strong>&lt;tsExpression3&gt;, ...</strong>&rsqb;)</a>
</td>
<td>Returns a single <strong>tsExpression</strong> that is the combination of two or more <strong>tsExpressions</strong>.</td>
</tr>
<tr>
<td>
<a href="ts_exists.html">exists(<strong>&lt;tsExpression&gt;</strong>)</a>
</td>
<td>Returns 1 if any time series described by the expression exists, and returns 0 otherwise.
A time series exists if it has reported a data value in the last 4 weeks.  </td>
</tr>
<tr>
<td>
<a href="ts_abs.html">abs(<strong>&lt;tsExpression&gt;</strong>)</a>
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
<a href="ts_normalize.html">normalize(<strong>&lt;tsExpression&gt;</strong>)</a>
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
<td><a href="ts_bestEffort.html">bestEffort(<strong>&lt;tsExpression&gt;</strong>)</a>
</td>
<td>Wrapping any query expression in <strong>bestEffort()</strong> tells Wavefront to use conservative targets for scheduling workloads. That means we limit thread use and asynchronous operations.
</td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Histogram Functions

You use histogram query functions to access the histogram distributions that Wavefront has computed from a metric. See [Wavefront Histograms](proxies_histograms.html) for background.

### Histogram to Histogram Functions

Each function in the following table returns one or more series of histogram distributions, and can therefore be used as the **hsExpression** parameter in another query. **Note:** In a time-series chart, the histogram-to-histogram functions display just the median values of the returned distributions.

<table style="width: 100%;">
<colgroup>
<col width="40%" />
<col width="60%" />
</colgroup>
<thead>
<tr>
<th>Histogram to Histogram <br> Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="hs_function.html">hs(<strong>&lt;hsMetricName&gt;</strong> 
<br>&lbrack;,|and|or <strong>source=</strong>&lt;sourceName&gt;&rbrack;
<br>&lbrack;,|and|or <strong>tag</strong>=&lt;sourceTag&gt;&rbrack;
<br>&lbrack;,|and|or &lt;<strong>pointTagKey</strong>&gt;=&lt;pointTagValue&gt;&rbrack; ...)</a>
</td>
<td>Returns the series of histogram distributions for <strong>hsMetricName</strong>, optionally filtered by sources and point tags. 
A name extension (<strong>m</strong>, <strong>h</strong>, or <strong>d</strong>) indicates the
<a href="proxies_histograms.html#histogram-metric-aggregation-intervals">histogram aggregation interval</a>, 
for example:<br>
<strong>hs(users.settings.numberOfApiTokens.m, source="host1")</strong>
<br>In a time-series chart, this function displays the median values of the distributions in the matched histogram series. 
</td>
</tr>
<tr>
<td><a href="hs_merge.html">merge(<strong>&lt;hsExpression&gt;</strong><br>&lbrack;, <strong>metrics|sources|sourceTags|pointTags|&lt;pointTagKey&gt;</strong>&rbrack;)</a></td>
<td>Merges the centroids and counts across the series of histogram distributions described by <strong>hsExpression</strong>, and returns one or more series of composite histogram distributions. <br>
In a time-series chart, this function displays the median values of the merged distributions. 
</td>
</tr>
<tr>
<td><a href="hs_align.html">align(<strong>&lt;timeWindow&gt;</strong>, <strong>&lt;hsExpression&gt;</strong>)</a></td>
<td>Adjusts the granularity of the series of histogram distributions described by <strong>hsExpression</strong>, by merging distributions into time buckets of size <strong>timeWindow</strong> and returning one distribution per bucket. <br>
In a time-series chart, this function displays the median values of the aligned distributions. 
</td>
</tr>
</tbody>
</table>

### Histogram Conversion Functions

Each histogram conversion function in the following table takes histogram distributions as input, and returns the results as time series. You can therefore use a histogram conversion function as a **tsExpression** parameter in a time series query function.

<table style="width: 100%;">
<colgroup>
<col width="35%" />
<col width="65%" />
</colgroup>
<thead>
<tr>
<th>Histogram to Time Series <br>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="hs_median.html">median(<strong>&lt;hsExpression&gt;</strong>)</a></td>
<td>Returns time series that consist of the median values of the histogram distributions described by <strong>hsExpression</strong>. </td>
</tr>
<tr>
<td><a href="ts_avg.html">avg(<strong>&lt;hsExpression&gt;</strong>)</a></td>
<td>Returns time series that consist of the average values from the histogram distributions described by <strong>hsExpression</strong>. 
</td>
</tr>
<tr>
<td><a href="ts_min.html">min(<strong>&lt;hsExpression&gt;</strong>)</a></td>
<td>Returns time series that consist of the lowest values from the histogram distributions described by <strong>hsExpression</strong>. </td>
</tr>
<tr>
<td><a href="ts_max.html">max(<strong>&lt;hsExpression&gt;</strong>)</a></td>
<td>Returns time series that consist of the highest values from the histogram distributions described by <strong>hsExpression</strong>. </td>
</tr>
<tr>
<td><a href="ts_percentile.html">percentile(<strong>&lt;percentage&gt;</strong>, <strong>&lt;hsExpression&gt;</strong>)</a></td>
<td>Returns time series that consist of the <strong>&lt;percentage&gt;</strong> percentiles from the histogram distributions described by <strong>hsExpression</strong>. A percentile is a value below which the specified percentage of values fall. For example, <strong>percentile(75, hs(my.hsMetric.m))</strong> returns the 75th percentile value from each distribution. </td>
</tr>
<tr>
<td><a href="ts_count.html">count(<strong>&lt;hsExpression&gt;</strong>)</a></td>
<td>Returns time series that consist of the number of values in each histogram distribution described by <strong>hsExpression</strong>. </td>
</tr>
<tr>
<td><a href="hs_summary.html">summary(&lbrack;<strong>&lt;percentageList&gt;</strong>,&rbrack; <strong>&lt;hsExpression&gt;</strong>)</a></td>
<td>Returns time series that summarize the significant values from the histogram distributions described by <strong>hsExpression</strong>. The summary includes a separate time series for each <strong>percentage</strong> percentile. By default, the summary includes series for: max, 99.9, 99, 95, 90, 75, avg, median (50), 25, and min.  </td>
</tr>
<tr>
<td><a href="hs_alignedSummary.html">alignedSummary(&lbrack;<strong>&lt;percentageList&gt;</strong>,&rbrack; <strong>&lt;hsExpression&gt;</strong>)</a></td>
<td>
Aligns a series of histogram distributions into a single time bucket for the current chart (1vw), and then returns the significant values from the resulting composite distribution. The aligned summary includes a separate constant time series for each <strong>percentage</strong> percentile. By default, the summary includes series for:  max, 99.9, 99, 95, 90, 75, avg, median (50), 25, and min. </td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Event Functions

You use event functions to [display events in charts](charts_events_displaying.html), for example, to inform other users about reasons for a change in a time series. 

### Event to Event Functions

Each function in the following table returns a set of one or more events, and can therefore be used as the **eventsExpression** parameter in another query. Some functions filter an event set, so that only events you're interested in are displayed. Other functions return synthetic events, which are displayed by the query, but not stored in Wavefront. 

<table style="width: 100%;">
<colgroup>
<col width="45%" />
<col width="55%" />
</colgroup>
<thead>
<tr>
<th>Event to Event <br>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="events_queries.html">events(<strong>&lt;filterName&gt;</strong>="<strong>&lt;filterValue&gt;</strong>"<br> [,|and|or [not] <strong>&lt;filterName&gt;</strong>="<strong>&lt;filterValue&gt;</strong>"] ...)</a></td>
<td>Returns the set of events that match the specified <a href="events_queries.html#event-filters">event filters</a>, for example:<br>
<strong>events(type=alert, name="low space", alertTag=App1.*)</strong> 
<br>This function adds a set of events to a time-series chart. 
</td></tr>
<tr>
<td><a href="events_queries.html#event-set-operators">Event set operators</a></td>
<td>Operators (such as union, intersect, - , d, m, o) that combine or compare two input <strong>eventsExpressions</strong>.  </td>
</tr>
<tr>
<td><a href="event_closed.html">closed(<strong>&lt;eventsExpression&gt;</strong>)</a></td>
<td>Returns events that have ended and instantaneous events that occurred in the past.</td>
</tr>
<tr>
<td><a href="event_until.html">until(<strong>&lt;eventsExpression&gt;</strong>)</a></td>
<td>Returns synthetic events that start at the beginning of epoch time (Jan 1, 1970) and end where the input events start.</td>
</tr>
<tr>
<td><a href="event_after.html">after(<strong>&lt;eventsExpression&gt;</strong>)</a></td>
<td>Returns synthetic ongoing events that start when the input events end.</td>
</tr>
<tr>
<td><a href="event_since.html">since(<strong>&lt;eventsExpression&gt;</strong>)</a></td>
<td>Returns synthetic ongoing events that start when the input events start, but have no end time.</td>
</tr>
<tr>
<td><a href="event_since.html">since(<strong>&lt;timeWindow&gt;</strong>)</a></td>
<td>Creates a single synthetic event that started <strong>timeWindow</strong> ago and ended &quot;now&quot;.</td>
</tr>
<tr>
<td><a href="event_timespan.html">timespan(<strong>&lt;startTimestamp&gt;</strong>, <strong>&lt;endTimestamp&gt;</strong>)</a></td>
<td>Creates a single synthetic event with the specified start and end timestamps. </td>
</tr>
<tr>
<td><a href="event_first.html">first(<strong>&lt;eventsExpression&gt;</strong>)</a></td>
<td>Returns the event that starts earliest, from among the specified set of events.</td>
</tr>
<tr>
<td><a href="event_first.html">last(<strong>&lt;eventsExpression&gt;</strong>)</a></td>
<td>Returns the event that starts latest, from among the specified set of events.</td>
</tr>
<tr>
<td><a href="event_firstEnding.html">firstEnding(<strong>&lt;eventsExpression&gt;</strong>)</a></td>
<td>Returns the event that ends earliest, from among the specified set of events.</td>
</tr>
<tr>
<td><a href="event_firstEnding.html">lastEnding(<strong>&lt;eventsExpression&gt;</strong>)</a></td>
<td>Returns the event that starts latest, from among the specified set of events.</td>
</tr>
</tbody>
</table>


### Events Conversion Functions

Each events conversion function in the following table takes a set of events as input, and returns the results as a time series. You can therefore use an events conversion function as a **tsExpression** parameter in a time series query function.

<table style="width: 100%;">
<colgroup>
<col width="35%" />
<col width="65%" />
</colgroup>
<thead>
<tr>
<th>Event to Time Series <br>Function</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="ts_count.html">count(<strong>&lt;eventsExpression&gt;</strong>)</a></td>
<td>Converts <strong>eventsExpression</strong> into a single time series, where every data point is computed from the number of event boundaries that occurred at that time. </td>
</tr>
<tr>
<td><a href="event_ongoing.html">ongoing(<strong>&lt;eventsExpression&gt;</strong>)</a></td>
<td>Converts <strong>eventsExpression</strong> into a continuous time series that represents the number of ongoing events at each moment of the chart's time window.</td>
</tr>

</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## <span id="traceFunctions"></span>Trace-Data Functions

You use trace-data functions to find and filter any [trace data](tracing_basics.html#wavefront-trace-data) that your applications might be sending. Trace-data functions are available only in the [Query Editor of the Traces browser](trace_data_query.html#use-query-editor-power-users).


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
<td>
<a href="traces_function.html">traces(<strong>"&lt;fullOperationName&gt;"</strong>
<br> [,|and|or [not] <strong>&lt;filterName&gt;</strong>="<strong>&lt;filterValue&gt;</strong>"] ...)</a>
</td>
<td>Returns the traces that contain one or more qualifying spans, where a qualifying span matches the specified <strong>fullOperationName</strong> and <a href="traces_function.html#span-filters">span filters</a>.</td>
</tr>
<tr>
<td>
limit(<strong>&lt;numberOfTraces&gt;</strong>, <strong>&lt;tracesExpression&gt;</strong>)</td>
<td markdown="span">Limits the traces returned by **tracesExpression** to include the specified **numberOfTraces**. 
For example:<br> <code>limit(50, traces("beachshirts.styling.makeShirts"))</code>
</td>
</tr>

<tr>
<td>highpass(<strong>&lt;traceDuration&gt;</strong>, <strong>&lt;tracesExpression&gt;</strong>)</td>
<td markdown="span">Filters the traces returned by **tracesExpression** to include only traces that are longer than **traceDuration**. 
For example:<br> <code>highpass(3s, traces("beachshirts.styling.makeShirts"))</code>
</td>
</tr>
<tr>
<td>lowpass(<strong>&lt;traceDuration&gt;</strong>, <strong>&lt;tracesExpression&gt;</strong>)</td>
<td markdown="span">Filters the traces returned by **tracesExpression** to include only traces that are shorter than **traceDuration**.
For example:<br> <code>lowpass(12ms, traces("beachshirts.styling.makeShirts"))</code>
</td>
</tr>
<tr>
<td>
<a href="spans_function.html">spans(<strong>"&lt;fullOperationName&gt;"</strong>
<br> [,|and|or [not] <strong>&lt;filterName&gt;</strong>="<strong>&lt;filterValue&gt;</strong>"] ...)</a>
</td>
<td>Returns the spans that match the specified <strong>fullOperationName</strong> and <a href="traces_function.html#span-filters">span filters</a>. Used as an argument to <strong>traces()</strong>.</td>
</tr>
<tr>
<td>highpass(<strong>&lt;spanDuration&gt;</strong>, <strong>&lt;spansExpression&gt;</strong>)</td>
<td markdown="span">Filters the spans returned by **spansExpression** to include only spans that are longer than **spanDuration**. 
</td>
</tr>
<tr>
<td>lowpass(<strong>&lt;spanDuration&gt;</strong>, <strong>&lt;spansExpression&gt;</strong>)</td>
<td markdown="span">Filters the spans returned by **spansExpression** to include only spans that are shorter than **spanDuration**.  
</td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="query_language_reference.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>
