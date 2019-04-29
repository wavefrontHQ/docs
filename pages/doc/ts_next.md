---
title: next Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_next.html
summary: Reference to the next() function
---
## Summary
```
next([<timeWindow>,] <expression>)
```
Fills in gaps in the expression with the next known value of the expression. If you specify `timeWindow`, fills in a specified time period before each existing point.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>timeWindow</td>
<td>By default, the <code>next()</code> function applies the specified value to gaps of missing data for up to 4 weeks. Use this optional parameter if you’d like this window to be smaller. The smallest time window you can specify is 1 second (1s). </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression in which you want to replace gaps in data with the next value. </td>
</tr>
</tbody>
</table>

## Description

The `next()` function allows you to assign the next known reported data point value to a gap of missing data. If there's a gap, nothing happens until the first new value becomes available. Then the data is backfilled with that, the next, value.  No line (dotted or solid) is drawn until the next data point is reported.

By default, `next()` applies the next reported data value to gaps of missing data for up to 4 weeks. If you’d like this window to be smaller, you can use the `timeWindow` parameter.

## Examples

In the following example, we've zoomed in on `~sample.request.failures.num` and see missing data.

![ts_last before](images/ts_last_next_before.png)

We decide to replace the missing data with the *last* value before the gap, in this case 0.

![ts_last](images/ts_last.png)

Then we replace the missing data with the first good value after the gap using `next`.

![ts next](images/ts_next.png)


## See Also

[Using Moving and Tumbling Windows to Highlight trends](query_language_windows_trends.html)

Other missing data functions include [default](ts_default.html), [interpolate](ts_interpolate.html), and [last](ts_last.html).
