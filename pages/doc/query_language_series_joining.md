---
title: Combining Time Series With join()
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_series_joining.html
summary: Use relationships among your time series to build full stack correlations.
---

You can use the `join()` function to: 
* Compare two or more time series together and find matches, or, conversely, find the time series that do not match. 
* Combine the data points from any matching time series to form a new synthetic time series with point tags from one or both of the input series.

<!--- Short list of simple why-you-care examples? --> 
<!--- Shortcut for simple cases: see series matching --> 

The Wavefront `join()` function is modeled after the SQL JOIN operation, which correlates rows of data across 2 or more input tables, and then forms new tables by joining selected portions of the correlated rows. If you are familiar with SQL, then you will recognize many of the Wavefront `join()` keywords and concepts.

## Time Series as Tables 

A Wavefront time series is a sequence of timestamped points that is identified by a unique combination of metadata:
* A metric name, for example, `cpu.load` 
* A source name, for example, `host-1`
* 0 or more point tags (key value pairs), for example, `dc=Oregon stage=prod service=shopping`
 
A `join()` operation views every time series as a row in a table that has a column for each metadata value. We have a separate table for each metric name. Below is a table showing 6 time series for a metric called `cpu.load`. (We've added a row # so we can easily refer to individual time series in later examples.)
<table>
<colgroup>
<col width="8%" />
<col width="15%" />
<col width="10%" />
<col width="15%" />
<col width="15%" />
<col width="17%" />
<col width="20%" />
</colgroup>
<thead>
<tr><th markdown="span">_Row #_</th><th>metric</th><th>source</th><th markdown="span">dc=</th><th markdown="span">stage=</th><th markdown="span">service=</th><th markdown="span">_Data Points_</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">L1</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-1</td>
<td markdown="span">Oregon</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
<tr>
<td markdown="span">L2</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-2</td>
<td markdown="span">Oregon</td>
<td markdown="span">dev</td>
<td markdown="span">shopping</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
<tr>
<td markdown="span">L3</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-3</td>
<td markdown="span">Oregon</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>

<tr>
<td markdown="span">L4</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-1</td>
<td markdown="span">NY</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>

<tr>
<td markdown="span">L5</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-2</td>
<td markdown="span">NY</td>
<td markdown="span">dev</td>
<td markdown="span">shopping</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
<tr>
<td markdown="span">L6</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-3</td>
<td markdown="span">NY</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
</tbody>
</table>


The time series for `request.latency` do not use the `dc` point tag, so the table does not have a column for it:

<table>
<colgroup>
<col width="8%" />
<col width="15%" />
<col width="10%" />
<col width="15%" />
<col width="17%" />
<col width="25%" />
</colgroup>
<thead>
<tr><th markdown="span">_Row #_</th><th>metric</th><th>source</th><th markdown="span">stage=</th><th markdown="span">service=</th><th markdown="span">_Data Points_</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">R1</td>
<td markdown="span">request.latency</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
<tr>
<td markdown="span">R2</td>
<td markdown="span">request.latency</td>
<td markdown="span">host-2</td>
<td markdown="span">dev</td>
<td markdown="span">shopping</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
<tr>
<td markdown="span">R3</td>
<td markdown="span">request.latency</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>

<tr>
<td markdown="span">R4</td>
<td markdown="span">request.latency</td>
<td markdown="span">host-4</td>
<td markdown="span">test</td>
<td markdown="span">checkout</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>

</tbody>
</table>

**Note:** The informal notation in the Data Points column indicates that a time series' data points is an array of timestamped values.


## join() Syntax Overview

Like SQL JOIN, the Wavefront `join()` function examines rows from two time-series tables, and determines whether any row from one table correlates with any row from the other. Two rows correlate if they both satisfy a join condition. `join()` combines the correlated rows into new rows in a new table, and then returns a new time series with metadata and data from each new row.

For example, consider the following `join()` function, which correlates rows from the two tables above:

```
join(ts(cpu.load) AS ts1 INNER JOIN ts(request.latency) AS ts2 USING(source, stage, service), metric='LoadToLatency', source=ts1.source, service=ts1.service, ts1)
```

Let's split out the `join()` parameters into separate expressions to see what they do:

```
join(
  ts(cpu.load) AS ts1 INNER JOIN ts(request.latency) AS ts2                  <== Join Input and Type
  
  USING(source, stage, service),                                             <== Join Condition

  metric='LoadToLatency', source=ts1.source, service=ts1.service,            <== Output Metadata

  ts1/ts2                                                                     <== Output Data Expression
  )
```

### Join Input and Type

```ts(cpu.load) AS ts1 INNER JOIN ts(request.latency) AS ts2```

* Like SQL `FROM`. 
* Use ts() expressions to specify the time series in a left-hand table (e.g., `ts(cpu.load)`) and a right-hand table (e.g., `ts(request.latency)`). 
* Can include filters in either or both ts() expressions, similar to SQL `WHERE`. 
* Use `AS` to assign an alias to each table. For example, `ts1` is the alias for `ts(cpu.load)`. 
* Join type (e.g., `INNER JOIN`) controls which rows are tested against the join condition.

### Join Condition

```USING(source, stage, service),```

* Specifies the columns to use when testing for correlated rows. Rows satisfy the condition if they share a common value in each listed column. For example, two rows match if they both have `source=host-1`, `stage=prod`, and `service=shopping`.
* Alternative syntax with alias-qualified column names: `ON ts1.source=ts2.source, ts1.stage=ts2.stage, ts1.service=ts2.service,`
* `ON` clause supports other kinds of condition expressions, e.g, `ON ts1.source!=web*` 

### Output Metadata Expression

```metric='LoadToLatency', source=ts1.source, service=ts1.service,```

* Like SQL `SELECT`. 
* List of columns and values to include from either or both rows. Use `metric=` to specify the metric name for the new time series. Use table aliases to qualify column names.
* Determines the metadata for the new time series.
<!---* Can omit all metadata to let a `_discriminant` column differentiate the resulting time series.-->

### Output Data Expression

```ts1/ts2 ```

<!--- Need to change example to include {ts2 | 1} to make left/right joins work ok. Or better yet, don't do division and use {ts2 | 0}---> 
* Derives the data points for the new time series from the data points of matching input rows. 
* Can include operators `+ - / *` or functions `max()`, `min()`, `avg()`, `median()`, `sum()`, `count()`.  
* Interpolates values if their timestamps do not line up.

## Join Types 

Like SQL JOIN, the Wavefront `join()` function supports different types of join operation. Each join type has a different rule for including rows (time series) in the result table. 


<table>
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr><th>Join Type</th><th>Results</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">![inner join](images/ts_join_venn_inner.png)</td>
<td markdown="span" style="vertical-align:middle">Include rows from both tables, if they both satisfy a specified join condition. <br><br>Keywords: JOIN | INNER JOIN
</td>
</tr>
<tr>
<td markdown="span">![left join](images/ts_join_venn_left_outer.png)</td>
<td markdown="span" style="vertical-align:middle">Include all rows from Left-hand Table, and include rows from Right-hand Table only if they satisfy a specified join condition. <br><br>Keywords: LEFT JOIN | LEFT OUTER JOIN
</td>
</tr>
<tr>
<td markdown="span">![right join](images/ts_join_venn_right_outer.png)</td>
<td markdown="span" style="vertical-align:middle">Include all rows from Right-hand Table, and include rows from Left-hand Table only if they satisfy a specified join condition. <br><br>Keywords: RIGHT JOIN | RIGHT OUTER JOIN
</td>
</tr>
<tr>
<td markdown="span">![full join](images/ts_join_venn_full.png)</td>
<td markdown="span" style="vertical-align:middle">Include all rows from both tables, regardless of whether the specified join condition is met or not. <br><br>Keywords: FULL JOIN | FULL OUTER JOIN
</td>
</tr>


</tbody>
</table>



## Inner Join Example

Suppose you want to divide CPU load by the request latency on each source that runs a production service. You perform an inner join to identify any pairs of series that are both emitted from the same source and that both share the `stage=prod` point tag. 

```
join(
  ts(cpu.load) AS ts1 INNER JOIN ts(request.latency) AS ts2 USING(source, stage), 
  metric='cpuToLatency', source=ts1.source, stage=ts1.stage, 
  ts1/ts2                           
  )
```


<!---  

Assume you enter the following ts() expression

```
ts("stats.servers.MemTotal", tag="dc1") - ts("stats.servers.MemFree", tag="east")
```

Wavefront determines which time series match up and subtracts the value for `stats.servers.MemTotal` from `stats.servers.MemFree` for each matching series.

Assume that the source tags `dc1` and `east` have three sources that match up (`app-3`, `app-4`, `app-5`), and four sources that don't (`app-1`, `app-2`, `app-6`, `app-7`). As a result, the chart displays only data associated with `app-3`, `app-4`, and `app-5`. Data for `app-1`, `app-2`, `app-6`, and `app-7` are discarded.

<table>
<tbody>
<thead>
<tr><th width="50%">dc1</th><th width="50%">east</th></tr>
</thead>
<tr>
<td>app-1</td>
<td><strong>app-3</strong></td>
</tr>
<tr>
<td>app-2</td>
<td><strong>app-4</strong></td>
</tr>
<tr>
<td><strong>app-3</strong></td>
<td><strong>app-5</strong></td>
</tr>
<tr>
<td><strong>app-4</strong></td>
<td>
app-6</td>
</tr>
<tr>
<td><strong>app-5</strong></td>
<td>
app-7</td>
</tr>
</tbody>
</table>

There are cases when you apply functions to expressions, but no series matching occurs. This happens when one of the evaluated ts() expression is a constant value, such as 1, or represents a single time series, such as a single source or aggregated data with no "group by".

For example, if you replaced `tag="east"` with `source="app-4"`, then the value associated with `app-4` in the second expression at each time slice is subtracted from each represented source in the first expression at each time slice. If you still want series matching to occur in the previous example, then you can wrap the operator or function with an inner join (i.e. `[+]`).

## Series Matching Example

Here's a simple example where the Wavefront UI displays a message that informs you that some of the series are not included in all queries.

![series matching example](images/series_matching_example.png)

The reason we get this message is that some expressions limit the environment to `env=dev` and other expressions don't use the filter. When part of a query uses a filter, but another part doesn't, then the whole query uses the filter. In this example, all queries will be limited to `env=dev`

<a name="point_tags"></a>

## Series Matching with Point Tags

Consider the following ts() query:

```
ts(disk.space.total, tag=az-1 and env=*) - ts(disk.space.used, tag=az-1 and env=*)
```

In this example, the `env` point tag key takes the values `production` and `development`. If source `app-1` includes the `env` value `development` in the first ts() call, but includes the `env` value `production` in the second ts() call, they do not match up.

Series matching occurs only for exact matches. This also means that if two series have the same source\|metric\|point tag but one of the series includes an additional point tag that the other series does not have, series matching does not include the series with the additional point tag in the results.

## Series Matching with the "by" Construct

In some cases, series matching with point tags results in no data because not all of the tags exist on both sides of the operator. You can use the `by` construct to perform matching using the element of your choice to get results for those series.

Consider the following example:

You’re interested in the set of hosts that have a `cpu.idle` of more than 50 and a `build.version` equal to 1000. You start with a set of hosts and run the following query:

`(ts(cpu.idle) > 50) and (ts(build.version) = 1000)`


The following series are returned by the first part of the query, `(cpu.idle) > 50`:
<table>
<tbody>
<thead>
<tr><th width="30%">Source</th><th width="35%">Datacenter</th><th width="35%">Stage</th></tr>
</thead>
<tr>
<td>host-1</td>
<td>&lbrack;dc=Oregon&rbrack;</td>
<td>&lbrack;stage=prod&rbrack;</td>
</tr>
<tr>
<td>host-2</td>
<td>&lbrack;dc=Oregon&rbrack;</td>
<td>&lbrack;stage=prod&rbrack;</td>
</tr>
<tr>
<td>host-3</td>
<td>&lbrack;dc=Oregon&rbrack;</td>
<td>&lbrack;stage=test&rbrack;</td>
</tr>
<tr>&nbsp;</tr>
<tr>
<td>host-1</td>
<td>&lbrack;dc=NY&rbrack;</td>
<td>&lbrack;stage=prod&rbrack;</td>
</tr>
<tr>
<td>host-2</td>
<td>&lbrack;dc=NY&rbrack;</td>
<td>&lbrack;stage=prod&rbrack;</td>
</tr>
<tr>
<td>host-3</td>
<td>&lbrack;dc=NY&rbrack;</td>
<td>&lbrack;stage=test&rbrack;</td>
</tr>
</tbody>
</table>


The following series are returned by the second part of the query, `(build.version) = 1000`
<table>
<tbody>
<thead>
<tr><th width="50%">Source</th><th width="50%">Stage</th></tr>
</thead>
<tr>
<td>host-1</td>
<td>&lbrack;stage=prod&rbrack;</td>
</tr>
<tr>
<td>host-1</td>
<td>&lbrack;stage=dev&rbrack;</td>
</tr>
<tr>
<td>host-2</td>
<td>&lbrack;stage=prod&rbrack;</td>
</tr>
<tr>&nbsp;</tr>
<tr>
<td>host-2</td>
<td>&lbrack;stage=dev&rbrack;</td>
</tr>
<tr>
<td>host-3</td>
<td>&lbrack;stage=test&rbrack;</td>
</tr>
<tr>
<td>host-3</td>
<td>&lbrack;stage=dev&rbrack;</td>
</tr>
</tbody>
</table>

It seems like an operation on these two series should yield a result, but the query with the AND operator above returns NO DATA because the dc tag cannot be matched on both sides of the expression.

In this example, while there is a host-1 on both sides of the operation, the first part of the query maps to two different hosts named host-1. There’s no guidance on which of these 2 hosts to pick, so the system doesn’t pick one.

You can use the `by` query language keyword to specify the point tag(s) to map by. For the example above, you can expand the query as follows:

`(ts(cpu.idle) > 50) and by (stage, source) (ts(build.version) = 10000)`

With this addition, the query returns the following 6 series, joined with the elements on the right.

<table>
<tbody>
<thead>
<tr><th width="60%">Series</th><th width="40%">Joined With</th></tr>
</thead>
<tr>
<td><code>cpu.idle host="host-1" dc=Oregon stage=prod</code></td>
<td><code>build.version host="host-1" stage=prod</code></td>
</tr>
<tr>
<td><code>cpu.idle host="host-2" dc=Oregon stage=prod</code></td>
<td><code>build.version host="host-2" stage=prod</code></td>
</tr>
<tr>
<td><code>cpu.idle host="host-3" dc=Oregon stage=test</code></td>
<td><code>build.version host="host-3" stage=test</code></td>
</tr>
<tr>
<td><code>cpu.idle host="host-1" dc=ny stage=prod </code></td>
<td><code>build.version host="host-1" stage=prod </code></td>
</tr>
<tr>
<td><code>cpu.idle host="host-2" dc=ny stage=prod </code></td>
<td><code>build.version host="host-2" stage=prod </code></td>
</tr>
<tr>
<td><code>cpu.idle host="host-3" dc=ny stage=test</code></td>
<td><code>build.version host="host-3" stage=test</code></td>
</tr>
</tbody>
</table>
-->
