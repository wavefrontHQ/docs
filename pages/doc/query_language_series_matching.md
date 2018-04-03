---
title: Series Matching
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_series_matching.html
summary: Learn how operators and functions affect the evaluation of Wavefront Query Language expressions.
---
Series matching is a process that occurs when you apply the following operators and functions:

- Arithmetic operators (+, -, /, *)
- Boolean operators (and, or)
- Comparison operators (>, <, =, >=, <=, !=)
- Filter functions (highpass, lowpass, min, max)
- Exponential and trigonometric functions

to two or more unique ts() expressions, each representing two or more unique metric\|source\|point tag value tuples.

If [point tags](#point_tags) are present in your time series, then series matching takes them into account.

For example, when you enter the ts() expression

```
ts("stats.servers.MemTotal", tag="dc1") - ts("stats.servers.MemFree", tag="east")
```

Wavefront determines which time series match up and subtracts the value for `stats.servers.MemTotal` from `stats.servers.MemFree` for each matching series. The source tags `dc1` and `east` have three sources that match up (`app-3`, `app-4`, `app-5`), and four sources that don't (`app-1`, `app-2`, `app-6`, `app-7`) therefore only data associated with `app-3`, `app-4`, and `app-5` are displayed on the chart, while `app-1`, `app-2`, `app-6`, and `app-7` are discarded.

<table>
<tbody>
<thead>
<tr><th width="50%">dc1</th><th width="50%">east</th></tr>
</thead>
<tr>
<td>app-1</td>
<td>
app-3</td>
</tr>
<tr>
<td>app-2</td>
<td>
app-4</td>
</tr>
<tr>
<td>app-3</td>
<td>
app-5</td>
</tr>
<tr>
<td>app-4</td>
<td>
app-6</td>
</tr>
<tr>
<td>app-5</td>
<td>
app-7</td>
</tr>
</tbody>
</table>

There are cases when you apply functions to expressions, but no series matching occurs. This happens when one of the evaluated ts() expression is a constant value, such as 1, or represents a single time series, such as a single source or aggregated data with no "group by".

For example, if you replaced `tag="east"` with `source="app-4"`, then the value associated with `app-4` in the second expression at each time slice is subtracted from each represented source in the first expression at each time slice. If you still want series matching to occur in the previous example, then you can wrap the operator or function with an inner join (i.e. `[+]`).

## Examples
In the examples below, the results listed to the right of = represents the set of series that would be displayed.

### Series Matching Occurs

- `(A,B,C) * (B,C,D) = (B,C)`
  - Only series B and C match up

- `(A,B,C) and (X,Y,Z) = NO DATA`
  - No series match up which results in no data

- `(A,B,C) [>] (A) = (A)`
  - With the second argument being A only there would be no series matching, but the inner join around > forces series matching. As a result, we'll have a join on A only, resulting in 1 series instead of 3.

### Series Matching Does Not Occur

- `(A,B,C) / 3 = (A,B,C)`
  - The number 3 is a single constant value and is applied to A, B, and C

- `(D) * (A,B,C) = (A,B,C)`
  - D is a single series value and is applied to A, B, and C

- `(B,D,F) + sum(A,B,C) = (B,D,F)`
  - While B is the only series in both arguments, A, B, and C are aggregated into a single value with sum() and applied to B, D, and F

<a name="point_tags"></a>

## Series Matching with Point Tags

Consider the following ts() query:

```
ts(disk.space.total, tag=az-1 and env=*) - ts(disk.space.used, tag=az-1 and env=*)
```

In this example, the `env` point tag key takes the values `production` and `development`. If source `app-1` includes the `env` value `development` in the first ts() call, but includes the `env` value `production` in the second ts() call, they will not match up; they must be exact matches in order for series matching to occur. This also means that if two series have the same source\|metric\|point tag but one of the series includes an additional point tag that the other series does not have, series matching does not include these series in the results.

## Series Matching with the "by" Construct

In some cases, series matching with point tags results in no data because not all of the tags exist on both sides of the operator. Starting with Release 2017.48, you can use the `by` construct to perform matching using the element of your choice to get results for those series.

Consider the following example:

You’re interested in the set of hosts that have a `cpu.idle` of more than 50 and a `build.version` equal to 1000. You start with a set of hosts and run the following query:

`(ts(cpu.idle) > 50) and (ts(build.version) = 1000)`


The following series are returned by the first part of the query, `(cpu.idle) > 50`:
<table>
<tbody>
<thead>
<tr><th width="30%">Host</th><th width="35%">Datacenter</th><th width="35%">Stage</th></tr>
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
<tr><th width="50%">Host</th><th width="50%">Stage</th></tr>
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

Starting with Release 2017.48.x, you can use the `by` query language keyword to specify the point tag(s) to map by. For the example above, you can expand the query as follows:

`(ts(cpu.idle) > 50) and by stage, source (ts(build.version) = 10000)`

With this addition, the query returns the following 6 series, joined with the elements on the right.

<table>
<tbody>
<thead>
<tr><th width="60%">Series</th><th width="40%">Joined With</th></tr>
</thead>
<tr>
<td><code>cpu.idle host=”host-1” dc=Oregon stage=prod</code></td>
<td><code>build.version host=”host-1” stage=prod</code></td>
</tr>
<tr>
<td><code>cpu.idle host=”host-2” dc=Oregon stage=prod</code></td>
<td><code>build.version host=”host-2” stage=prod</code></td>
</tr>
<tr>
<td><code>cpu.idle host=”host-3” dc=Oregon stage=test</code></td>
<td><code>build.version host=”host-3” stage=test</code></td>
</tr>
<tr>
<td><code>cpu.idle host=”host-1” dc=ny stage=prod </code></td>
<td><code>build.version host=”host-1” stage=prod </code></td>
</tr>
<tr>
<td><code>cpu.idle host=”host-2” dc= ny stage=prod </code></td>
<td><code>build.version host=”host-2” stage=prod </code></td>
</tr>
<tr>
<td><code>cpu.idle host=”host-3” dc= ny stage=test</code></td>
<td><code>build.version host=”host-3” stage=test</code></td>
</tr>
</tbody>
</table>


## Automatic Query Flip

In addition to making the `by` element available, in Release 48.x Wavefront will also start flipping the query to have the more detailed side of the join be the driver. In the example above, that is the `cpu.idle` part of the query.

In earlier Wavefront versions, the left side is always the key after the match is done. That is,  A + B after matching always yields the query key of A. This becomes a problem if the left side (given the join conditions) is actually the plural side of an N:1 join. If that’s the case, the system now  flips the right side’s query key to be the key after matching is done.
