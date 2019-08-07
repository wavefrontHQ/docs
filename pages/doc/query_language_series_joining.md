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
* 0 or more point tags (key value pairs), for example, `env=prod dc=Oregon`
 
A `join()` operation views every time series as a row in a table that has a column for each metadata value. We have a separate table for each metric name. Below is a table showing 6 time series for a metric called `cpu.load`. 

**Note:** The doc shows row indicators like _L1_ for referring to specific time series in later examples. They're not part of the data!

<table id = "left-hand-table" width="100%">
<colgroup>
<col width="8%" />
<col width="15%" />
<col width="15%" />
<col width="10%" />
<col width="17%" />
<col width="25%" />
</colgroup>
<thead>
<tr><th markdown="span">_Row_</th><th>metric</th><th>source</th><th markdown="span">env=</th><th markdown="span">dc=</th><th markdown="span">_Data Points_</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`L1`</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">Oregon</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
<tr>
<td markdown="span">`L2`</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-2</td>
<td markdown="span">dev</td>
<td markdown="span">Oregon</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
<tr>
<td markdown="span">`L3`</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">Oregon</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>

<tr>
<td markdown="span">`L4`</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">NY</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>

<tr>
<td markdown="span">`L5`</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-2</td>
<td markdown="span">test</td>
<td markdown="span">NY</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
<tr>
<td markdown="span">`L6`</td>
<td markdown="span">cpu.load</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">NY</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
</tbody>
</table>


This table shows 4 time series for a metric called `request.rate`. These series do not use the `dc` point tag, so the table does not have a column for it. Instead, the table indicates that these series have a `service` point tag:

<table id = "right-hand-table" width="100%">
<colgroup>
<col width="8%" />
<col width="15%" />
<col width="15%" />
<col width="10%" />
<col width="17%" />
<col width="25%" />
</colgroup>
<thead>
<tr><th markdown="span">_Row_</th><th>metric</th><th>source</th><th markdown="span">env=</th><th markdown="span">service=</th><th markdown="span">_Data Points_</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`R1`</td>
<td markdown="span">request.rate</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
<tr>
<td markdown="span">`R2`</td>
<td markdown="span">request.rate</td>
<td markdown="span">host-2</td>
<td markdown="span">dev</td>
<td markdown="span">shopping</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>
<tr>
<td markdown="span">`R3`</td>
<td markdown="span">request.rate</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">(timestamp:value, ...)</td>
</tr>

<tr>
<td markdown="span">`R4`</td>
<td markdown="span">request.rate</td>
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
join(ts(cpu.load) AS ts1 INNER JOIN ts(request.rate) AS ts2 USING(source, env), metric='cpuPerRequest', source=ts1.source, env=ts1.env, ts1 / ts2)
```

Let's split out the `join()` parameters into separate expressions to see what they do:

```
join(
  ts(cpu.load) AS ts1 INNER JOIN ts(request.rate) AS ts2                  <== Join Input and Type
  
  USING(source, env),                                                     <== Join Condition

  metric='cpuPerRequest', source=ts1.source, env=ts1.env,                 <== Output Metadata

  ts1 / ts2                                                               <== Output Data Expression
  )
```

### Join Input and Type

```ts(cpu.load) AS ts1 INNER JOIN ts(request.rate) AS ts2```

* Like SQL `FROM`. 
* ts() expressions specify the time series in a left-hand table (e.g., `ts(cpu.load)`) and a right-hand table (e.g., `ts(request.rate)`). 
* Either or both ts() expressions can include filters, analogous to SQL `WHERE`. For example, `ts(cpu.load, dc!=Texas)`
* `AS` keyword assigns an alias to each table. For example, `ts1` is the alias for `ts(cpu.load)`. 
* `INNER JOIN` is one of 4 [join types](#join-types). The join type determines which rows are tested against the join condition.

### Join Condition

```USING(source, env),``` _or_ <br>
```ON ts1.source=ts2.source, ts1.env=ts2.env,```

* Syntax alternatives:  `USING` or `ON` 
* `USING` lists the columns to use when testing for correlated rows: `USING(source, env)`
  - Rows satisfy the condition if they share a common value in each listed column. For example, two rows match if they both have `source="host-1"` and `env="prod"`.
* `ON` specifies explicit condition predicates: `ON ts1.source=ts2.source, ts1.env=ts2.env`
  - Predicates use table aliases to qualify column names. For example, `ts1.env=ts2.env` compares `env` values from the left-hand table to `env` values from the right-hand table.
  - Predicates can include pattern matches, negation, parentheses, and constants. For example, `ON ts1.source!="web*"` 

### Output Metadata

```metric='cpuPerRequest', source=ts1.source, env=ts1.env,```

* Like SQL `SELECT`. 
* Optional list of expressions that specify the metadata for the result time series. Metadata expressions name the columns and assign values to them. For example:
  - `metric=cpuPerRequest` specifies the metric name. 
  - `env=ts1.env` adds a column for a point tag called `env` and assigns it the value of `ts1.env`. 
* Table aliases indicate where point-tag values come from. For example, `ts1.env` gets `env` values from rows in the left-hand table.
* Omitting output metadata expressions introduces a column called `_discriminant` to differentiate the resulting time series.

### Output Data Expression

```ts1 / ts2 ```

* Derives the data points for each new time series from the data points of matching input rows. 
  - Table aliases indicate where the input data points come from. For example, `ts1` gets the data points from a row in the left-hand table.
* Can include operators `+ - / *` or functions `max()`, `min()`, `avg()`, `median()`, `sum()`, `count()`.  
* Interpolates values if their timestamps do not line up.
* Special syntax is required for outer joins, which might return time series that correspond to unmatched rows. For example, `ts1 / {ts2|1}` says to divide by `1` when the right-hand table has no input data points.

## Join Types 

Like SQL JOIN, the Wavefront `join()` function supports different types of join operation. Each join type has a different rule for including rows (time series) in the result table. 


<table width="100%">
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
<td markdown="span" style="vertical-align:middle">Include all rows from the left-hand table, and include rows from the right-hand table only if they satisfy a specified join condition. <br><br>Keywords: LEFT JOIN | LEFT OUTER JOIN
</td>
</tr>
<tr>
<td markdown="span">![right join](images/ts_join_venn_right_outer.png)</td>
<td markdown="span" style="vertical-align:middle">Include all rows from the right-hand table, and include rows from left-hand table only if they satisfy a specified join condition. <br><br>Keywords: RIGHT JOIN | RIGHT OUTER JOIN
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

Suppose you have the time series in the [tables above](#time-series-as-tables), and you want to divide CPU load by the number of requests per second on each source that runs a service that is either in production or in development. You perform an inner join to identify any pairs of series that both flow from the same source and run in the same environment (`prod` or `dev`). 

```
join(
  ts(cpu.load) AS ts1 INNER JOIN ts(request.rate) AS ts2 USING(source, env), 
  metric='cpuPerRequest', source=ts1.source, env=ts1.env, service=ts2.service,
  ts1 / ts2                           
  )
```

### Inner Join Selects Only Matching Rows
The inner join matches rows (time series) from the [left-hand table](#left-hand-table) and [right-hand table](#right-hand-table) above, based on the values for the `source` and `env` columns. The following table shows the particular rows that match up. 


<table width="100%">
<colgroup>
<col width="5%" />
<col width="40%" />
<col width="50%" />
<col width="5%" />
</colgroup>

<thead>
<tr><th markdown="span">_Row_</th><th>Left-Hand Series</th><th>Inner-Joined With Right-Hand Series</th><th markdown="span">_Row_</th></tr>
</thead>
<tbody>

<tr>
<td markdown="span">_L1_</td>
<td><code>cpu.load host=host-1 env=prod dc=Oregon </code></td>
<td><code>request.rate host=host-1 env=prod service=shopping</code></td>
<td markdown="span">_R1_</td>
</tr>
<tr>
<td markdown="span">_L2_</td>
<td><code>cpu.load host=host-2 env=dev dc=Oregon</code></td>
<td><code>request.rate host=host-2 env=dev service=shopping</code></td>
<td markdown="span">_R2_</td>
</tr>
<tr>
<td markdown="span">_L3_</td>
<td><code>cpu.load host=host-3 env=prod dc=Oregon</code></td>
<td><code>request.rate host=host-3 env=prod service=checkout</code></td>
<td markdown="span">_R3_</td>
</tr>
<tr>
<td markdown="span">_L4_</td>
<td><code>cpu.load host=host-1 env=prod dc=NY</code></td>
<td><code>request.rate host=host-1 env=prod service=shopping</code></td>
<td markdown="span">_R1_</td>
</tr>

<tr>
<td markdown="span">_L6_</td>
<td><code>cpu.load host=host-3 env=prod dc=NY</code></td>
<td><code>request.rate host=host-3 env=prod service=checkout</code></td>
<td markdown="span">_R3_</td>
</tr>
</tbody>
</table>

**Note:** Rows **L5** and **R4** do not appear in this table because an inner join returns rows only if they satisfy the the join condition. So we ignore any series from one table that is not matched by a series in the other table.  

### Selected Rows are Input for the Result Series

The pairs of matching rows are the input rows for constructing the new time series to be returned by `join()`. In the following table, each row shows the metadata for a returned time series, as specified by the output metadata expressions in the function. For example, row _J5_ has the metric name `cpuPerRequest`, `source` and `env` values from _L6_, and the `service` value from _R3_. 

<table id = "result-inner-join-table" width="100%">
<colgroup>
<col width="8%" />
<col width="15%" />
<col width="12%" />
<col width="10%" />
<col width="15%" />
<col width="30%" />
<col width="10%" />
</colgroup>
<thead>
<tr><th markdown="span">_New Row_</th><th>metric</th><th>source</th><th markdown="span">env=</th><th markdown="span">service=</th><th markdown="span">_Data Points_</th><th markdown="span">_Input Rows_</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">_J1_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_ </td>
<td markdown="span">_L1, R1_</td>
</tr>
<tr>
<td markdown="span">_J2_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-2</td>
<td markdown="span">dev</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L2, R2_</td>
</tr>
<tr>
<td markdown="span">_J3_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L3, R3_</td>
</tr>

<tr>
<td markdown="span">_J4_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L4, R1_</td>
</tr>

<tr>
<td markdown="span">_J5_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L6, R3_</td>
</tr>

</tbody>
</table>

**Note:** The table does not have a column for `dc`, because the `join()` function did specify this point tag in the output metadata.

### Result Series Combines Data Points from Input Rows 

The data points of each result series are derived from the data points of the matching input series. In this example, the output data expression `ts1 / ts2` says to divide the values of a left-hand series by the values of the matching right-hand series. (For simplicity in this example, we assume that all right-hand values are nonzero.)

Wavefront accomplishes this by dividing each value of the left-hand series by the value with the corresponding timestamp from the right-hand series. If the timestamps do not line up between the 2 series, Wavefront interpolates values before combining them.

## Left Outer Join Example

Suppose you have the time series in the [tables above](#time-series-as-tables), and you want to: 
* Divide the CPU load by the number of requests per second on each source that runs a production or development service. 
* See the sources (if any) that are reporting CPU loads and are not running a production or development service.

You perform a left outer join to return all `cpu.load` time series, and to correlate pairs of `cpu.load` and `request.rate` series if they flow from the same source and run in the same environment (`prod` or `dev`). 

```
join(
  ts(cpu.load) AS ts1 LEFT JOIN ts(request.rate) AS ts2 USING(source, env), 
  metric='cpuPerRequest', source=ts1.source, env=ts1.env, dc=ts1.dc,
  ts1 / {ts2|1}                           
  )
```

<!--- ### Left Outer Join Selects All Rows from the Left-Hand Table --->
**Row Selection.**
The left outer join selects all rows (time series) from the [left-hand table](#left-hand-table), plus any row from the [right-hand table](#right-hand-table) that matches a left-hand row, based on the values for the `source` and `env` columns. 

The following table shows the selected rows. 


<table width="100%">
<colgroup>
<col width="5%" />
<col width="40%" />
<col width="50%" />
<col width="5%" />
</colgroup>

<thead>
<tr><th markdown="span">_Row_</th><th>Left-Hand Series</th><th>Left-Joined With Right-Hand Series</th><th markdown="span">_Row_</th></tr>
</thead>
<tbody>

<tr>
<td markdown="span">_L1_</td>
<td><code>cpu.load host=host-1 env=prod dc=Oregon </code></td>
<td><code>request.rate host=host-1 env=prod service=shopping</code></td>
<td markdown="span">_R1_</td>
</tr>
<tr>
<td markdown="span">_L2_</td>
<td><code>cpu.load host=host-2 env=dev dc=Oregon</code></td>
<td><code>request.rate host=host-2 env=dev service=shopping</code></td>
<td markdown="span">_R2_</td>
</tr>
<tr>
<td markdown="span">_L3_</td>
<td><code>cpu.load host=host-3 env=prod dc=Oregon</code></td>
<td><code>request.rate host=host-3 env=prod service=checkout</code></td>
<td markdown="span">_R3_</td>
</tr>
<tr>
<td markdown="span">_L4_</td>
<td><code>cpu.load host=host-1 env=prod dc=NY</code></td>
<td><code>request.rate host=host-1 env=prod service=shopping</code></td>
<td markdown="span">_R1_</td>
</tr>
<tr>
<td markdown="span">_L5_</td>
<td><code>cpu.load host=host-2 env=test dc=NY</code></td>
<td><code> </code></td>
<td markdown="span"> -- </td>
</tr>
<tr>
<td markdown="span">_L6_</td>
<td><code>cpu.load host=host-3 env=prod dc=NY</code></td>
<td><code>request.rate host=host-3 env=prod service=checkout</code></td>
<td markdown="span">_R3_</td>
</tr>
</tbody>
</table>

Row _L5_ appears in this table because a left outer join does not require a match for it. 
In contrast, row _R4_ is ignored because it does not satisfy the join condition with any matching row from the left-hand table. 


<!---  

* The `dc` and `service` point tags can have any value, because they are not part of the join condition.

## Left Join Example

Need to change example to include {ts2 | 1} to make left/right joins work ok. 


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
<tr><th width="30%">Source</th><th width="35%">Datacenter</th><th width="35%">env</th></tr>
</thead>
<tr>
<td>host-1</td>
<td>&lbrack;dc=Oregon&rbrack;</td>
<td>&lbrack;env=prod&rbrack;</td>
</tr>
<tr>
<td>host-2</td>
<td>&lbrack;dc=Oregon&rbrack;</td>
<td>&lbrack;env=prod&rbrack;</td>
</tr>
<tr>
<td>host-3</td>
<td>&lbrack;dc=Oregon&rbrack;</td>
<td>&lbrack;env=test&rbrack;</td>
</tr>
<tr>&nbsp;</tr>
<tr>
<td>host-1</td>
<td>&lbrack;dc=NY&rbrack;</td>
<td>&lbrack;env=prod&rbrack;</td>
</tr>
<tr>
<td>host-2</td>
<td>&lbrack;dc=NY&rbrack;</td>
<td>&lbrack;env=prod&rbrack;</td>
</tr>
<tr>
<td>host-3</td>
<td>&lbrack;dc=NY&rbrack;</td>
<td>&lbrack;env=test&rbrack;</td>
</tr>
</tbody>
</table>


The following series are returned by the second part of the query, `(build.version) = 1000`
<table>
<tbody>
<thead>
<tr><th width="50%">Source</th><th width="50%">env</th></tr>
</thead>
<tr>
<td>host-1</td>
<td>&lbrack;env=prod&rbrack;</td>
</tr>
<tr>
<td>host-1</td>
<td>&lbrack;env=dev&rbrack;</td>
</tr>
<tr>
<td>host-2</td>
<td>&lbrack;env=prod&rbrack;</td>
</tr>
<tr>&nbsp;</tr>
<tr>
<td>host-2</td>
<td>&lbrack;env=dev&rbrack;</td>
</tr>
<tr>
<td>host-3</td>
<td>&lbrack;env=test&rbrack;</td>
</tr>
<tr>
<td>host-3</td>
<td>&lbrack;env=dev&rbrack;</td>
</tr>
</tbody>
</table>

It seems like an operation on these two series should yield a result, but the query with the AND operator above returns NO DATA because the dc tag cannot be matched on both sides of the expression.

In this example, while there is a host-1 on both sides of the operation, the first part of the query maps to two different hosts named host-1. There’s no guidance on which of these 2 hosts to pick, so the system doesn’t pick one.

You can use the `by` query language keyword to specify the point tag(s) to map by. For the example above, you can expand the query as follows:

`(ts(cpu.idle) > 50) and by (env, source) (ts(build.version) = 10000)`

With this addition, the query returns the following 6 series, joined with the elements on the right.

<table>
<tbody>
<thead>
<tr><th width="60%">Series</th><th width="40%">Joined With</th></tr>
</thead>
<tr>
<td><code>cpu.idle host="host-1" dc=Oregon env=prod</code></td>
<td><code>build.version host="host-1" env=prod</code></td>
</tr>
<tr>
<td><code>cpu.idle host="host-2" dc=Oregon env=prod</code></td>
<td><code>build.version host="host-2" env=prod</code></td>
</tr>
<tr>
<td><code>cpu.idle host="host-3" dc=Oregon env=test</code></td>
<td><code>build.version host="host-3" env=test</code></td>
</tr>
<tr>
<td><code>cpu.idle host="host-1" dc=ny env=prod </code></td>
<td><code>build.version host="host-1" env=prod </code></td>
</tr>
<tr>
<td><code>cpu.idle host="host-2" dc=ny env=prod </code></td>
<td><code>build.version host="host-2" env=prod </code></td>
</tr>
<tr>
<td><code>cpu.idle host="host-3" dc=ny env=test</code></td>
<td><code>build.version host="host-3" env=test</code></td>
</tr>
</tbody>
</table>
-->
