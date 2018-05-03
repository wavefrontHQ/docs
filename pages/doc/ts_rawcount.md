---
title: rawcount Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawcount.html
summary: Reference to the rawcount() function
---
## Summary
```
rawcount(<expression>[,metrics|sources|sourceTags|tags|<pointTagKey>])
```

The `rawcount()` aggregation function aggregates any data values that are truly reported at a given time slice across all reported series, and displays the total number of present data values as the point at that time slice.

In contrast to `count()`, `rawcount()` does not perform interpolation.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to create a count for. With `rawcount`, we count only reported values and do not perform interpolation. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;tags&vert;&lt;pointTagKey&gt;</td>
<td>Optional additional expressions to modify the count. </td>
</tr>
</tbody>
</table>

## Description

Like all aggregation functions, `rawcount` returns a single line when used without additional arguments.

Use additional expressions to group the values, for example, you can group by source, by point tag, and so on.

## Example

The following example shows the raw count grouped by the `env` point tag. The orange line, for the production environment, is at the top.

![rawcount example](images/ts_rawcount.png)
