---
title: exists Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_exists.html
summary: Reference to the exists() function
---
## Summary
```
exists(<tsExpression>)
```
Returns 1 if any time series described by the expression exists, and returns 0 otherwise.
A time series exists if it has reported a data value in the last day (24 hours).
## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the time series to be tested for existence.</td></tr>
</tbody>
</table>


## Description

The `exists()` function returns 1 if any time series described by the expression exists, and returns 0 otherwise. A time series exists if it has at least one value that was reported within the last day (24 hours). The returned constant series is continuous.

You can use `exists()` to see if a metric is obsolete or has never reported.

`exists()` is useful if you're creating a query that uses a metric that is planned but has not yet started reporting, for example, when you're building a dashboard before any data is sent. Unless you wrap the query in `exists()`, all your charts will show errors for the missing metric. Using `exists` allows any syntax errors to be reported, which help you make corrections, but suppresses the errors for the missing metric.

{% include note.html content="If you are querying with a time window in the past, and if the series **did not** report for 24 hours before or during the window but the series **is** reporting at present, the `exists()` function returns true. We are working on addressing this issue." %}

## Examples

You can wrap `exists()` around an expression that returns some number of time series, like this:

```
exists(ts(inv_1_get_count, status="7**" and operation="*" and cname="${environment}"))
```

This query returns 1 if at least one time series has a value reported within the 1d (24 hours). Otherwise, the query returns 0 if the values of all of the time series are older than 1d (24 hours).
Because this query returns either 1 or 0, it is useful as a conditional expression in an `if()` function.

For clarity, we'll name this query `hasData` so we can easily refer to it in the example below.

This example tests `hasData` to see whether its underlying metrics are reporting data, and uses the result to choose between two other previously defined queries named `queryOfInterest` and `substituteQuery`:

```
if(${hasData}, ${queryOfInterest}, ${substituteQuery})
```

In this example:
* `hasData` evaluates to 1 (true) if its underlying metrics are reporting, so `if()` returns the results of `queryOfInterest`.
* `hasData` evaluates to 0 (false) if its underlying metrics are not reporting, so `if()` returns the results of `substituteQuery`.

## Using Exists() with Nested if/else Statements

When you create a query with exists(), you sometimes do not get the result you expected. The reason is that [series matching](query_language_series_matching.html) occurs if a query uses exists() with nested if/else statements, and both expressions return data. This section explains how to get for results without series matching.


### Use Case

We'll use the sample metric data `~sample.cpu.usage.percentage` and `~sample.cpu.usage.user.percentage` to demonstrate the nested if/else series matching in action.

The following screenshot uses the two sample metrics coming from two sources, app-1 and app-12. Both metrics values are multiplied by 100 for demonstration purposes.

![2 queries, one for ~sample.cpu.usage.percentage and one for ~sample.cpu.usage.user.percentage in a line chart](images/exists_example_1.png)

Suppose:
* You want to display the `~sample.cpu.usage.percentage` metric from app-1 (multiplied by 100), if the metric exists.
* Else if the metric does not exist, you want to display `~sample.cpu.usage.user.percentage` from app-12 (multiplied by 100), if that metric exists.
* If neither metric exists you want to display -1.

Here's how that query looks (we've included line breaks for legibility):
```
if(exists
  (ts(~sample.cpu.usage.percentage, source=app-1)),
   ts(~sample.cpu.usage.percentage, source=app-1) * 100,
if(exists
  (ts(~sample.cpu.usage.user.percentage, source=app-12)),
   ts(~sample.cpu.usage.user.percentage, source=app-12) * 100,
-1))

```

To test the query output, let's use this query and make the first if statement false by using a source that doesn't exist, app-01.

```
if(exists
  (ts(~sample.cpu.usage.percentage, source=app-01)),
   ts(~sample.cpu.usage.percentage, source=app-1) * 100,
if(exists
  (ts(~sample.cpu.usage.user.percentage, source=app-12)),
   ts(~sample.cpu.usage.user.percentage, source=app-12) * 100,
-1))
```

Because app-01 doesn't exist, we expect to see only the line for `~sample.cpu.usage.user.percentage`. The screenshot below verifies that's what we see.

![3 queries in a line chart. The first for  ~sample.cpu.usage.percentage is hidden. The second is for  ~sample.cpu.usage.user.percentage as above. The third is for ~sample.cpu.usage.percentage and uses source=app-01. We see 1 line in the chart, for the second query.](images/exists_example_2.png)

If we use a source that doesn't exist with both queries, we expect to see `-1`:

```
if(exists
  (ts(~sample.cpu.usage.percentage, source=app-01)),
   ts(~sample.cpu.usage.percentage, source=app-1) * 100,
if(exists
  (ts(~sample.cpu.usage.user.percentage, source=app-012)),
   ts(~sample.cpu.usage.user.percentage, source=app-012) * 100,
-1))
```

![3 queries in a line chart. The first for  ~sample.cpu.usage.percentage is hidden. The second is for  ~sample.cpu.usage.user.percentage and is hidden. The third queries both metrics with sources that don't exists. We see 1 horizontal line at -1 in the chart for the else statement.](images/exists_example_3.png)

So the nested if/else statements work as expected when one or more of the metrics does not exist.

However, when both metrics exist in a nested if/else expression, then the results you see can be confusing because series matching occurs. In the following screenshot, the if/else query should show the value for app-1 (first condition) but shows the value for app-12 (second condition).


![3 queries in a line chart. The first for  ~sample.cpu.usage.percentage for source=app-1. The second is for  ~sample.cpu.usage.user.percentage for source=app12. The third is an IF/ELSE query. It has the query for app-1 first, then the query for app-12. Even though the first if statement is true, the chart shows the value for app-12. The chart illustrates with a fixed label.](images/exists_example_4.png)



### Workaround for Exists() Corner Cases


One way to workaround the `exists()` and nested if/else series matching problem, is to use a combination of the `retainSeries()` and `collect()` functions to ensure the displayed output follows a traditional nested if/else logical output.

With the same metrics we used above, we could write the following query (including line breaks for legibility):

```
retainSeries(collect()
  if(exists
      (ts(~sample.cpu.usage.percentage, source=app-1) as var1), $var1 * 100 ),
  if(exists
      (ts(~sample.cpu.usage.user.percentage, source=app-12) as var2), $var2 * 100),
  -1),
collect_0="0")
```

This expression ensures that the nested if/else works correctly for all queries.

![3 queries in a line chart. The last query uses the syntax above, with retainSeries. The screenshot of the linechart with fixed legend shows that the IF/ELSE query picks up the value from source app-1 (not app-2).](images/exists_example_5.png)



## See Also

The [`missing()` function](ts_missing.html) lets you check whether a function returned data in a specified time window.
