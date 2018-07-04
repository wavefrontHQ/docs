---
title: last Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_last.html
summary: Reference to the last() function
---
## Summary
```
last([<timeWindow>,] <expression>)
```
Fills in gaps in the expression with the last known value of the expression. If you specify `a time window,  fills in a specified time period after each existing point.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>timeWindow</td>
<td>By default, the <code>last()</code> function applies the specified value to gaps of missing data for up to 4 weeks. Use this optional parameter if you’d like this window to be smaller. The smallest time window you can specify is 1 second (1s). </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression in which you want to replace gaps in data with the last value. </td>
</tr>
</tbody>
</table>

## Description

The `last()` function allows you to assign the last known reported data point value to a gap of missing data. When you add `last()` to a `ts()` expression, a solid straight line with the value of the last reported data point will be drawn in place of gaps of missing data.

By default, `last()` applies the last reported data value to gaps of missing data for up to 4 weeks. If you’d like this window to be smaller, you can use the `timeWindow` parameter. If you use `last()` with a function that uses interpolation, we apply  `last()` to the last 15% of a chart window.

## Examples

In the following example, we've zoomed in on ~sample.request.failures.num and see missing data.

![ts_last before](images/ts_last_next_before.png)

We decide to replace the missing data with the *last* value before the gap, in this case 0.

![ts_last](images/ts_last.png)

Then we replace the missing data with the first good value after the gap using `next`.

![ts next](images/ts_next.png)

## See Also

[Using Moving and Tumbling Windows to Highlight trends](query_language_windows_trends.html)



Other missing data functions include [default](ts_default.html), [next](ts_next.html), and [interpolate](ts_interpolate.html).
