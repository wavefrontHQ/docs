---
title: Combining Time Series With join()
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_series_joining.html
summary: Use relationships among your time series to build full stack correlations.
---

VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) supports a `join()` function that lets you:
* Compare two or more time series and find matches, or, conversely, find the time series that do not match.
* Combine the data points from any matching time series to form a new synthetic time series with point tags from one or both of the input series.

<!--- Short list of simple why-you-care examples? -->
<!--- Shortcut for simple cases: see series matching -->

The WQL `join()` function is modeled after the SQL JOIN operation, which correlates rows of data across 2 or more input tables, and then forms new tables by joining selected portions of the correlated rows. If you are familiar with SQL, then you will recognize many of the WQL `join()` keywords and concepts.

{% include note.html content="Using `join()` for an inner join is an explicit way to perform series matching between two groups of time series. As an shortcut for certain simple use cases, you can use an operator that performs [implicit series matching](query_language_series_matching.html)." %}


Watch Pierre talk about WQL joins and how they're used. Note that this video was created in 2019 and some of the information in it might have changed. It also uses the 2019 version of the UI.

<p>
<iframe id="kmsembed-1_82m4iwhv" width="700" height="400" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_82m4iwhv/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="The join() Function"></iframe>
</p>

## Time Series as Tables

A WQL `join()` views time series as tables and then operates on those tables. A time series is a sequence of timestamped points that is identified by a unique combination of metadata:
* A metric name, for example, `cpu.load`
* A source name, for example, `host-1`
* 0 or more point tags (key value pairs), for example, `env=prod dc=Oregon`

A `join()` operation views every time series as a row in a table that has a column for each metadata value. In this model, we use a separate table for each metric name.

### Sample Time-Series Tables

Suppose you are running services on several sources, and you want to use a WQL `join()` to correlate the CPU load with the number of service requests per second on each source. You identify the time series you want to correlate, and refer to them using the ts() expressions `ts(cpu.load)` and `ts(request.rate)`. Each ts() expression stands for a group of time series with different sources and point-tag values, and you want to use `join()` to identify any pairs of series that both flow from the same source, and share certain point-tag values.

We represent the time series for each metric as rows in separate tables, which we will use for the various `join()` examples on this page. The doc uses row indicators like _L1_ so we can refer to specific time series in later examples. They're not part of the data!

The first table shows 6 time series that are described by `ts(cpu.load)`. Each series is a unique combination of metric name, source, and values for point tags `env` and `dc`:

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


The second table shows 4 time series that are described by `ts(request.rate)`. These series do not have the `dc` point tag, so the table does not have a column for it. Instead, these series have a `service` point tag:

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

{% include note.html content="The informal notation in the _Data Points_ column indicates that a time series' data points are an array of timestamped values." %}

## join() Syntax Overview

Like SQL JOIN, the WQL `join()` function examines rows from two time-series tables, and determines whether any row from one table correlates with any row from the other. Two rows correlate if they both satisfy a join condition. All `join()` operations combine the correlated rows into new rows in a new table, and then return a new time series corresponding to each new row. (Some `join()` types also return time series for the non-correlated rows in one or both tables.)

For example, suppose you want to divide the CPU load by the number of service requests per second on each production, development, or test source. The following `join()` function accomplishes this by correlating rows from [the two tables above](#sample-time-series-tables):

```
join(ts(cpu.load) AS ts1 INNER JOIN ts(request.rate) AS ts2 USING(source, env), metric='cpuPerRequest', source=ts1.source, env=ts1.env, ts1 / ts2)
```


Let's split out the `join()` parameters into separate expressions to see what they do:

```
join(
  ts(cpu.load) AS ts1 INNER JOIN ts(request.rate) AS ts2            <== Join Input and Join Type

  USING(source, env),                                               <== Join Condition
       // ON ts1.source=ts2.source AND ts1.env=ts2.env,             <== alternative syntax

  metric='cpuPerRequest', source=ts1.source, env=ts1.env,           <== Output Metadata

  ts1 / ts2                                                         <== Output Data Expression
  )
```

For readability, we write the keywords in all caps, but that's not required.

### Join Input and Join Type

```ts(cpu.load) AS ts1 INNER JOIN ts(request.rate) AS ts2```

* Like SQL `FROM`.
* ts() expressions specify the time series in a left table (e.g., `ts(cpu.load)`) and a right table (e.g., `ts(request.rate)`).
* Either or both ts() expressions can include filters, analogous to SQL `WHERE`. For example, `ts(cpu.load, dc!=Texas)`
* `AS` assigns an alias to each table (required). For example, `ts1` is the alias for `ts(cpu.load)`.
  - Do not use reserved words, such as WQL function names, operator names, or SI prefixes. For details, see the rules for valid alias names in [Wildcards, Aliases, and Variables](query_language_reference.html#wildcardAliasVariable).
  - Best practice: Make aliases 3 characters or longer.
* `INNER JOIN` is one of 4 [join types](#join-types). The join type determines whether and how rows are included in the result table.

### Join Condition

```USING(source, env),``` _or_ <br>
```ON ts1.source=ts2.source AND ts1.env=ts2.env,```

* Syntax alternatives:  `USING` or `ON`
* `USING` lists the columns to use when testing for correlated rows: `USING(source, env)`
  - Rows satisfy the condition if they share a common value in _each_ listed column. For example, two rows match if they both have `source="host-1"` and `env="prod"`.
* `ON` specifies explicit condition predicates: `ON ts1.source=ts2.source AND ts1.env=ts2.env`
  - Predicates use table aliases to qualify column names. For example, `ts1.env=ts2.env` compares `env` values from the left table to `env` values from the right table.
  - Predicates can include pattern matches, negation, parentheses, and constants. For example, `ON ts1.source!="web*"`

### Output Metadata

```metric='cpuPerRequest', source=ts1.source, env=ts1.env,```

* Like SQL `SELECT`.
* Optional list of expressions that specify the metadata for the result time series. Metadata expressions name the columns in the result table, and assign values to them. For example:
  - `metric=cpuPerRequest` specifies the metric name.
  - `env=ts1.env` adds a column for a point tag called `env` and assigns it the value of `ts1.env`.
* Table aliases indicate where point-tag values come from. For example, `ts1.env` gets `env` values from rows in the left table.
* Omitting these expressions introduces a column for a point tag called `_discriminant` to differentiate the resulting time series.

### Output Data Expression

```ts1 / ts2 ```

* Derives the data points for each new time series from the data points of matching input rows.
  - Table aliases indicate where the input data points come from. For example, `ts1` refers to the data points from a row in the left table.
* Inner joins function as expected only when the output data expression includes **both** `ts1` and `ts2` in some form.
* Supports operators `+ - / *` and functions `max()`, `min()`, `avg()`, `median()`, `sum()`, `count()` to combine data points from both tables. For example:
  - `ts1 / ts2` divides each value from a left-hand row by the corresponding value from the matching right-hand row.
  - `avg(ts1, ts2)` averages each value from a left-hand row with the corresponding value from the matching right-hand row.
  - Values are interpolated if the timestamps do not line up.
* Special syntax `{<alias> | N}` specifies the numeric constant to use in place of missing input data points. Required for outer joins. For example, `ts1 / {ts2|1}` says to divide by `1` when there is no matching row (and therefore no data points) from the right table.

## Join Types

Like SQL JOIN, the WQL `join()` function supports different types of join operation. Each join type has a different rule for including rows (time series) in the result table.

The following table shows the main types of joins.
* This table shows _inclusive_ joins, which means they include any rows that satisfy the join condition.
* We also support [_exclusive_ join types](#exclusive-join-types) for use cases in which you only want rows that do not satisfy the condition.

<table width="100%">
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr><th>Join Type</th><th>Operation</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">![inner join](images/ts_join_venn_inner.png)</td>
<td markdown="span" style="vertical-align:middle">Include rows from both tables, if they both satisfy a specified join condition. <br><br>Keywords: JOIN | INNER JOIN
</td>
</tr>
<tr>
<td markdown="span">![left join](images/ts_join_venn_left_outer.png)</td>
<td markdown="span" style="vertical-align:middle">Include all rows from the left table, and include rows from the right table only if they satisfy a specified join condition. <br><br>Keywords: LEFT JOIN | LEFT OUTER JOIN
</td>
</tr>
<tr>
<td markdown="span">![right join](images/ts_join_venn_right_outer.png)</td>
<td markdown="span" style="vertical-align:middle">Include all rows from the right table, and include rows from left table only if they satisfy a specified join condition. <br><br>Keywords: RIGHT JOIN | RIGHT OUTER JOIN
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

Suppose you have the time series in the [tables above](#sample-time-series-tables), and you want to divide the CPU load by the number of service requests per second on each production, development, or test source. You perform an inner join to identify any pairs of series that both flow from the same source and run in the same environment.

```
join(
  ts(cpu.load) AS ts1 INNER JOIN ts(request.rate) AS ts2 USING(source, env),
  metric='cpuPerRequest', source=ts1.source, env=ts1.env, service=ts2.service,
  ts1 / ts2
  )
```

<!--- ### Inner Join Selects Only Matching Rows --->
<br>
**Row Selection**

The inner join matches rows (time series) from the [left table](#left-hand-table) and [right table](#right-hand-table) above, based on the values for the `source` and `env` columns. The following table shows the particular rows that match up.


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

{% include note.html content="Rows _L5_ and _R4_ do not appear in this table because an inner join returns only the rows that satisfy the join condition. So we ignore any series from one table that is not matched by a series in the other table." %}

<!--- ### Selected Rows are Input for the Result Series --->
<br>
**Metadata from Input Rows**

Each pair of matching rows in the previous table is the input for a new time series to be returned by the inner join. The following table shows the metadata for each new time series as a separate row, with columns that are specified by the function's output metadata expressions. For example, row _A4_ corresponds to a new series that has the metric name `cpuPerRequest`, `source` and `env` values from _L4_, and the `service` value from _R1_.

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
<td markdown="span">_A1_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_ </td>
<td markdown="span">_L1, R1_</td>
</tr>
<tr>
<td markdown="span">_A2_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-2</td>
<td markdown="span">dev</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L2, R2_</td>
</tr>
<tr>
<td markdown="span">_A3_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L3, R3_</td>
</tr>

<tr>
<td markdown="span">_A4_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L4, R1_</td>
</tr>

<tr>
<td markdown="span">_A5_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L6, R3_</td>
</tr>

</tbody>
</table>

{% include note.html content="The table does not have a column for `dc`, because the sample `join()` function did not specify this point tag among its output metadata expressions." %}

<!--- ### Result Series Have Data Points Derived from Input Rows --->
<br>
<a id="derived_data_inner"></a>

**Data Derived from Input Rows**


The data points of each result series are derived from the data points of the matching input series. In this example, the output data expression `ts1 / ts2` says to divide the values of a left-hand series by the values of the matching right-hand series. (For simplicity in this example, we assume that all right-hand values are nonzero.)

The query engine accomplishes this by dividing each value of the left-hand series by the value with the corresponding timestamp from the right-hand series. So, for example, the result series corresponding to row _A5_ has points that are derived by dividing each value from _L6_ by the corresponding value from _R3_.

If the timestamps for the 2 input series do not line up, the query engine interpolates values before combining them.

## Left Outer Join Example

Suppose you have the time series in the [tables above](#sample-time-series-tables), and you want to:
* Divide the CPU load by the number of service requests per second on each production, development, or test source.
* See the sources (if any) that are reporting CPU loads, but are not running a monitored service.

You perform a left outer join to return all `cpu.load` time series, and also to correlate pairs of `cpu.load` and `request.rate` series if they flow from the same source and run in the same environment.

```
join(
  ts(cpu.load) AS ts1 LEFT JOIN ts(request.rate) AS ts2 USING(source, env),
  metric='cpuPerRequest', source=ts1.source, env=ts1.env, service=ts2.service,
  ts1 / {ts2|1}
  )
```

<!--- ### Left Outer Join Selects All Rows from the Left-Hand Table --->
<br>
**Row Selection**

The left outer join selects all rows (time series) from the [left table](#left-hand-table), plus any row from the [right table](#right-hand-table) that matches a left-hand row, based on the values for the `source` and `env` columns. The following table shows the selected rows:

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

Row _L5_ (a left-hand series) is included in this table, even though it does not match any right-hand series.
In contrast, row _R4_ (a right-hand series) is omitted entirely because it would have no match on the left.

<br>
**Metadata from Input Rows**

The rows in the previous table serve as input for constructing the new time series to be returned by the left outer join. The following table shows the metadata for each new time series as a separate row, with columns that are specified by the function's output metadata expressions. For example, row _B4_ corresponds to a new series that has the metric name `cpuPerRequest`, `source` and `env` values from _L4_, and the `service` value from _R1_.

<table id = "result-left-join-table" width="100%">
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
<td markdown="span">_B1_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_ </td>
<td markdown="span">_L1, R1_</td>
</tr>
<tr>
<td markdown="span">_B2_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-2</td>
<td markdown="span">dev</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L2, R2_</td>
</tr>
<tr>
<td markdown="span">_B3_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L3, R3_</td>
</tr>

<tr>
<td markdown="span">_B4_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L4, R1_</td>
</tr>

<tr>
<td markdown="span">_B5_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-2</td>
<td markdown="span">test</td>
<td markdown="span"> -- </td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L5_  </td>
</tr>

<tr>
<td markdown="span">_B6_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L6, R3_</td>
</tr>

</tbody>
</table>

From this table, we see that the left outer join returns the same set of time series as the [inner join above](#result-inner-join-table), plus an additional time series with the metadata given in row _B5_. This additional series has no `service` point tag, because there was no right-hand input row to contribute a value for it.

<br>
**Data Derived from Input Rows**

The data points of each new series are derived from the data points of the corresponding input series, as specified by the output data expression.
* When a new series is produced by combining a pair of matching input series, the data points in the new series are <a href="#derived_data_inner">derived as for an inner join</a>.
* When a new series (such as _B5_) is produced from a single left-hand input series, the data points in the new series are derived using the special syntax in the output data expression. The sample output data expression `ts1 / {ts2|1}`  says to divide the values of a left-hand series by 1 whenever there is no matching right-hand series, as is the case for _B5_.

You must use the special syntax in a left outer join to provide alternate values for the right-hand series, which might be missing. A result series with missing input values will not display.

You can use the special syntax to provide whatever alternate value makes sense for your use case. In the example, dividing by 1 gives the new series the same data points as the unmatched left-hand input series. In an output expression that uses `+` to combine data values, however, you can preserve values by specifying 0 as the alternate value, for example, `ts1 + {ts2|0}`.

## Right Outer Join Example

Suppose you have the time series in the [tables above](#sample-time-series-tables), and you want to:
* Divide the CPU load by the number of service requests per second on each production, development, or test source.
* See the services (if any) that are reporting rates, but are not on a source that is also reporting CPU loads.

You perform a right outer join to return all `request.rate` time series, and also to correlate pairs of `request.rate` and `cpu.load` series if they flow from the same source and environment.

```
join(
  ts(cpu.load) AS ts1 RIGHT JOIN ts(request.rate) AS ts2 USING(source, env),
  metric='cpuPerRequest', source=ts1.source, env=ts1.env, service=ts2.service,
  {ts1|0} / ts2
  )
```

<!--- ### Right Outer Join Selects All Rows from the Right-Hand Table --->
<br>
**Row Selection**

The right outer join selects all rows (time series) from the [right table](#right-hand-table), plus any row from the [left table](#left-hand-table) that matches a right-hand row, based on the values for the `source` and `env` columns. The following table shows the selected rows:

<table width="100%">
<colgroup>
<col width="5%" />
<col width="40%" />
<col width="50%" />
<col width="5%" />
</colgroup>

<thead>
<tr><th markdown="span">_Row_</th><th>Left-Hand Series</th><th>Right-Joined With Right-Hand Series</th><th markdown="span">_Row_</th></tr>
</thead>
<tbody>

<tr>
<td markdown="span">_L1_</td>
<td><code>cpu.load host=host-1 env=prod dc=Oregon </code></td>
<td><code>request.rate host=host-1 env=prod service=shopping</code></td>
<td markdown="span">_R1_</td>
</tr>
<tr>
<td markdown="span">_L4_</td>
<td><code>cpu.load host=host-1 env=prod dc=NY</code></td>
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
<td markdown="span">_L6_</td>
<td><code>cpu.load host=host-3 env=prod dc=NY</code></td>
<td><code>request.rate host=host-3 env=prod service=checkout</code></td>
<td markdown="span">_R3_</td>
</tr>

<tr>
<td markdown="span"> -- </td>
<td><code> </code></td>
<td><code>request.rate host=host-4 env=test service=checkout</code></td>
<td markdown="span"> _R4_ </td>
</tr>
</tbody>
</table>

Row _R4_ (a right-hand series) is included in this table, even though it does not match any left-hand series.
In contrast, row _L5_ (a left-hand series) is omitted entirely because it would have no match on the right.

<br>
**Metadata from Input Rows**

The rows in the previous table serve as input for constructing the new time series to be returned by the right outer join. The following table shows the metadata for each new time series as a separate row, with columns that are specified by the function's output metadata expressions. For example, row _C5_ corresponds to a new series that has the metric name `cpuPerRequest`, `source` and `env` values from _L6_, and the `service` value from _R3_.

<table id = "result-left-join-table" width="100%">
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
<td markdown="span">_C1_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_ </td>
<td markdown="span">_L1, R1_</td>
</tr>

<tr>
<td markdown="span">_C2_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-1</td>
<td markdown="span">prod</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L4, R1_</td>
</tr>

<tr>
<td markdown="span">_C3_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-2</td>
<td markdown="span">dev</td>
<td markdown="span">shopping</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L2, R2_</td>
</tr>
<tr>
<td markdown="span">_C4_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L3, R3_</td>
</tr>

<tr>
<td markdown="span">_C5_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span">host-3</td>
<td markdown="span">prod</td>
<td markdown="span">checkout</td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">_L6, R3_</td>
</tr>

<tr>
<td markdown="span">_C6_</td>
<td markdown="span">cpuPerRequest</td>
<td markdown="span"> -- </td>
<td markdown="span"> -- </td>
<td markdown="span"> checkout </td>
<td markdown="span">_Derived from input points_  </td>
<td markdown="span">&nbsp; &nbsp; &nbsp; _R4_</td>
</tr>


</tbody>
</table>

From this table, we see that the right outer join returns the same set of time series as the [inner join above](#result-inner-join-table), plus an additional time series with the metadata given in row _C6_. This additional series has no `source` and `env` point tag, because there was no left-hand input row to contribute values for them.

<br>
**Data Derived from Input Rows**

The data points of each new series are derived from the data points of the corresponding input series, as specified by the output data expression.
* When a new series is produced by combining a pair of matching input series, the data points in the new series are <a href="#derived_data_inner">derived as for an inner join</a>.
* When a new series (such as _C6_) is produced from a single right-hand input series, the data points in the new series are derived using the special syntax in the output data expression. The sample output data expression `{ts1|0} / ts2`  says to divide the right-hand series into 0 whenever there is no matching left-hand series, as is the case for _C6_.

You must use the special syntax in a right outer join to provide alternate values for the left-hand series, which might be missing. A result series with missing input values will not display.

You can use the special syntax to provide whatever alternate value makes sense for your use case. In the example, specifying 0 as the dividend produces a new constant series of 0 for each unmatched right-hand input series.

## Exclusive Join Types

You can combine the WQL `join()` and [`removeSeries()`](ts_removeSeries.html) functions to perform exclusive join operations. An exclusive join starts with an [inclusive join type](#join-types) and then filters out any rows (time series) that satisfy the join condition. Exclusive joins are useful for finding hidden issues, as illustrated in [our blog on finding silent failures with `join()`](https://tanzu.vmware.com/content/blog/how-to-find-silent-failures-in-your-cloud-services-faster-with-join-function).

The following table describes the types of exclusive join.

<table width="100%">
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr><th>Join Type</th><th>Operation</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">![left join](images/ts_join_venn_left_exclusive.png)</td>
<td markdown="span" style="vertical-align:middle">Include only rows from the left table that do not satisfy a specified join condition (i.e., that do not match rows of the right table.) <br><br>`join()` keywords: LEFT JOIN | LEFT OUTER JOIN <br><br> Use `removeSeries()` to filter out matches
</td>
</tr>
<tr>
<td markdown="span">![right join](images/ts_join_venn_right_exclusive.png)</td>
<td markdown="span" style="vertical-align:middle">Include only rows from the right table that do not satisfy a specified join condition (i.e., that do not match rows of the left table.) <br><br>`join()` keywords: RIGHT JOIN | RIGHT OUTER JOIN <br><br> Use `removeSeries()` to filter out matches
</td>
</tr>
<tr>
<td markdown="span">![full join](images/ts_join_venn_full_exclusive.png)</td>
<td markdown="span" style="vertical-align:middle">Include only the rows from either table that do not satisfy a specified join condition. <br><br> Use `collect()` to combine a left outer join and a right outer join<br>
Use `removeSeries()` to filter out matches
</td>
</tr>
</tbody>
</table>

### Left Exclusive Join Example

Suppose you are running services on various sources, and you know that your services take 3.5 minutes to start up. You can tell that a service has started when it starts reporting metrics, but you'd like to find out if any services have failed to start after 5 minutes.

You can do this by running a left exclusive join between a metric that is reported by the source (e.g., `cpu.uptime`) and a metric that is reported by the service (e.g., `service.uptime`), provided that these metrics share common metadata (e.g., an `id` point tag). You can then investigate any source whose uptime metric does not correspond to a matching service-uptime metric. For example:

```
removeSeries(
  join(
    ts(cpu.uptime) AS ts1 LEFT JOIN ts(service.uptime) AS ts2 USING(id),
    metric='NeedsAttention', source=ts1.source, env=ts1.env, id=ts1.id, filter-id=ts2.id,
    ts1
    ),
  filter-id="*"
)
```

In this query, the `join()` function performs an left outer join that uses the `id` point tag value as the join condition. Each output series from this function has:
* The specified metric name (`NeedsAttention`),
* Data values and several metadata values from a `cpu.uptime` series.
* A new `filter-id` point tag, but only if the join condition has been met:
  - `filter-id` is added whenever a `cpu.uptime` series and a `service.uptime` series have a matching id.
  - `filter-id` is not added to an unmatched output series.

The `removeSeries()` function then filters the results of the `join()` function by removing any `NeedsAttention` series that has a `filter-id` tag. The overall result is a set of time series corresponding to each source that does not have the expected service running on it.
