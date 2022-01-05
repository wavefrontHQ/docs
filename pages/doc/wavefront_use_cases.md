---
title: Use Case Videos
keywords:
tags: [query language, videos, best practice]
sidebar: doc_sidebar
permalink: wavefront_use_cases.html
summary: Watch videos that explain how use sophisticated queries to solve problems.
---

Dev Nag, co-founder of Wavefront demonstrates how to use the power of the query language to solve use cases.

<table style="width: 100%;">
<tbody>
<tr>
<td width="30%"><strong><font color="#0091DA" size="3">Correlation Functions</font></strong><br> <a href="https://youtu.be/bV9mGSAbD8s"><img src="/images/v_correlation_functions.png"/></a></td>
<td width="70%"><br><p>This Wavefront demo shows an example of the Wavefront correlation function. Dev looks at a customer example where a network switch causes major degradation. He uses the correlation function to quickly find all the network switches that caused the problem - and explains how you can identify causes just by using the shape of the data when the problem occurred.</p> </td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Anomaly Detection</font></strong><br>
<a href="https://youtu.be/I-Z9d94Zi7Y" target="_blank"><img src="/images/v_anomaly.png"/></a></td>
<td><br>
<p>Dev customizes a chart using query language functions to who how Wavefront facilitates anomaly detection. </p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Filter by Behavior</font></strong><br>
<a href="https://youtu.be/hn0ExW3Jxf4" target="_blank"><img src="/images/v_filter.png"/></a></td>
<td><br>
<p>Dev shows how you can filter by behavior, not just by identity, to easily separate bad machines from good machines using the if() command. The chart makes the problem behavior visible immediately. </p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Finding the Signal in the Noise</font></strong><br>
<a href="https://youtu.be/EckXm0HZPHE" target="_blank"><img src="/images/v_signal_noise.png"/></a></td>
<td><br>
<p>Dev looks at a large dataset where a code deploy seems to caused deterioration. but it's impossible to be sure because so many data sources are reporting. Dev first collapses all sources using the avg() function, and then examines day-by-day ratio to compare the normal behavior with the suspect behavior. Now it's easy to see cause and effect.
 </p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Data Exploration</font></strong><br><a href="https://youtu.be/6kbQ_1E_SE4" target="_blank"><img src="/images/v_data_set_correlation.png"/></a></td>
<td><br>
<p>This video explores finding a connection between datasets when you're not sure there is a connection. Dev looks first looks at the relationship between request per second and memory and finds no correlation. Then he displays the relationship between requests and CPU, and it's clear that there is a potential bottleneck here.</p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Preventing False Alarms</font></strong><br><a href="https://youtu.be/dkHmnH_Dchc" target="_blank"><img src="/images/v_false_alarms.png"/></a></td>
<td><br>
<p>Dev looks at some customer data for a day. Five spikes in the early morning are just artifacts but resulted in alerts. The team was then slow to respond to a real performance degradation due to alert fatigue. Dev shows how using mavg() doesn't solve the problem, but using mmedian() the spikes that caused the false alarms disappear. </p>
</td>
</tr>
</tbody>
</table>
