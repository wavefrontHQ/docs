---
title: Wavefront Errors and Resolution
keywords: troubleshooting, errors
tags: [administration]
sidebar: doc_sidebar

permalink: wavefront_errors.html
summary: Wavefront errors and suggested actions to resolve them.
---

## Chart Builder and Query Editor Errors
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

## Proxy Errors

<table>
<colgroup>
<col width="33%"/>
<col width="33%"/>
<col width="33%"/>
</colgroup>
<thead>
<tr>
<th>Error</th>
<th>Reason</th>
<th>Resolution</th>
</tr>
</thead>
<tbody>
<tr>
<td>You see "java: command not found" in <code>wavefront.log</code>.</td>
<td>Java is either not installed, or is not in your path.</td>
<td>Install Java using your local package manager, and make sure that your path includes the Java binary.</td>
</tr>
<tr>
<td>You see "Cannot fetch daemon configuration from remote server: org.jboss.resteasy.client.exception.ResteasyIOException: IOException" in <code>wavefront.log</code>.</td>
<td>You may have an incorrect server URL in your wavefront.conf file; you may have blocked the outgoing connection to that server URL (port 443); or the Wavefront servers may be down.</td>
<td>Run <code>curl &lt;wavefrontServerUrl&gt;</code> from the machine running the proxy, where <code>&lt;wavefrontServerUrl&gt;</code> is the full URL (including "https://) provided to you by Wavefront and in your <code>wavefront.conf</code> file.</td>
</tr>
<tr>
<td>You see "Cannot post work unit result to Wavefront servers. Will enqueue and retry later." in <code>wavefront.log</code>.</td>
<td>You may have an incorrect server URL in your <code>wavefront.conf</code> file; you may have blocked the outgoing connection to that server URL (port 443).</td>
<td>Run <code>curl &lt;wavefrontServerUrl&gt;</code> from the machine running the proxy, where <code>&lt;wavefrontServerUrl&gt;</code> is the full URL (including "https://") provided to you by Wavefront and in your <code>wavefront.conf</code> file.</td>
</tr>
<tr>
<td>You see "Exception in thread "main" java.lang.UnsupportedClassVersionError:
com/sunnylabs/GraphiteValidator : Unsupported major.minor version 51.0" in <code>wavefront.log</code>.
</td>
<td>You are using Java 1.6 or lower instead of Java 1.7.</td>
<td>Upgrade Java to 1.7 through your local package manager.</td>
</tr>
<tr>
<td>You see "Exception in thread "Thread-2" java.net.BindException: Address already in use" in <code>wavefront.log</code>.</td>
<td>You already have another process listening on port 2878, or may have started two proxies accidentally.</td>
<td>Use the <code>ps</code> command to find and delete any existing proxies, and then start the proxy again.</td>
</tr>
<tr>
<td>You can't run <code>telnet localhost 2878</code>; the connection is refused.</td>
<td>Ensure that you don't have an iptables rule blocking the traffic. Ensure that the proxy is running. Ensure that you are running <code>telnet localhost 2878</code> on the machine where the proxy is running.</td>
<td>Use the <code>ps</code> command to make sure that the proxy is running, and examine your iptables rules to ensure that TCP port 2878 is accessible locally.</td>
</tr>
</tbody>
</table>
