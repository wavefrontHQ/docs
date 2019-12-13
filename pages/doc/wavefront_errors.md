---
title: Wavefront Errors and Resolution
keywords: troubleshooting, errors
tags: [administration]
sidebar: doc_sidebar
published: false
permalink: wavefront_errors.html
summary: Wavefront errors and suggested actions to resolve them.
---

<table width="100%">
<tbody>
<thead>
<tr><th width="30%">Error</th><th width="70%">Resolution</th></tr>
</thead>
<tr><td markdown="span">Query syntax error: Cannot aggregate more than 500000 series </td>
<td>Revise the query, for example:
<ul><li>
<a href="query_language_point_tags.html#filtering-queries-using-point-tags">Filter by point tag.</a> </li>
<li><a href="query_language_getting_started.html#filter-by-source">Filter by source.</a></li>
<li><a href="query_language_aggregate_functions.html#grouping-the-aggregation-results">Use grouping.</a> The example in the link uses grouping with an aggregation function, but you can use it with any function. </li></ul>
The techniques help you show the information that's actually useful.</td></tr>
<tr><td markdown="span">Another Error</td>
<td>Another Solution </td></tr>
</tbody>
</table>
