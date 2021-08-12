---
title: Query Language Videos
keywords: videos
tags: [videos]
sidebar: doc_sidebar
published: false
permalink: videos_query_language.html
summary: Learn about query language basics and advanced functions
---
Learn about the Wavefront query language as well as how Wavefront works with Prometheus query language (PromQL).

<table style="width: 100%;">
<tbody>
<tr>
<td width="35%"><strong><font color="blue">Intro to Wavefront Query Language</font></strong><br> <a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=60b992dc-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true" target="_blank"><img src="/images/v_ql_intro.png" alt="introduction to query language"/></a></td>
<td width="65%"><br><p>Wavefront query language allows you to shape the data you see in your dashboards. Jason first shows an example of an environment where a single switch in a customer environment had a problem. The example uses the advanced functions if() at() and corr() to find other switches with the same behavior and prevent further problems. Jason then uses the highpass() function on other data to show only true failures in a chart. </p> </td>
</tr>
<tr>
<td><strong><font color="blue">Query Language Basics</font></strong><br>
<a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=61f9391c-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true" target="_blank"><img src="/images/v_ql_basics.png" alt="wavefront query basics"/></a></td>
<td><br>
<p>Jason starts by looking at the Wavefront data format. Then he adds a query to a chart that has only the required metric name. To narrow down the result, he uses a source filter with a wildcard and a point tag filter.  </p>
</td>
</tr>
<tr>
<td><strong><font color="blue">Advanced Query Language Functions</font></strong><br>
<a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=6601e213-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true" target="_blank"><img src="/images/v_ql_advanced.png" alt="advanced functions"/></a></td>
<td><br>
<p>Jason explores query language functions using the following examples:
<ul>
<li>The percentile() function in 3 queries shows different percentiles for a query.</li>
<li>The mpercentile() (moving percentile) function displays percentile over a 30 minute window.</li>
<li>A chart variable in a query that shows the standard deviation.</li>
</ul></p>
</td>
</tr>
<tr>
<td><strong><font color="blue">Wavefront and Prometheus Query Language</font></strong><br>
<iframe src="https://bcove.video/3tLRB6l" width="400" height="225" allowfullscreen="true" alt="Wavefront and PromQL"></iframe></td>
<td><br>
<p>With the 2021-17.x release, we've expanded the limited PromQL support and we've added admin-level organization setting to determine whether a user can write in PromQL. We have also added full support for creating charts and alerts with PromQL queries. Watch this video to learn how to create charts and alerts by using PromQL.</p>
</td>
</tr>
</tbody>
</table>
