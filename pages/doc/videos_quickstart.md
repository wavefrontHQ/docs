---
title: Basic Concepts Videos
keywords: videos
tags: [getting started, videos]
sidebar: doc_sidebar
permalink: videos_quickstart.html
summary: Learn the concepts behind Wavefront technology.
---


<table style="width: 100%;">
<tbody>
<tr>
<td width="50%"><strong><font color="#0091DA" size="3">Introduction to Wavefront</font></strong><br><br/>
<iframe id="kmsembed-1_jbnj8r75" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_jbnj8r75/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Introduction to Tanzu Observability (Lighboard Video)"></iframe>
</td>
<td width="50%"><br><p>Clement gives an introduction to Wavefront: How you get data into Wavefront, how dashboards, charts, and alerts allow you to monitor your environment, and how our histogram and tracing features can give you the full picture of what's going on. </p> </td>
</tr>
<tr>
<td width="50%"><strong><font color="#0091DA" size="3">Getting Data Into Wavefront</font></strong><br> <a href="https://www.youtube.com/watch?v=lhrtPSqn8-c&index=2&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K" target="_blank"><img src="/images/v_data_into_wavefront.png" alt="getting data into wavefront"/></a></td>
<td width="50%"><br><p>Wavefront gives observability into your cloud environment and packaged applications. To get data into Wavefront, use an integration with preconfigured dashboards or one of the Wavefront SDKs. Send data from several sources to a Wavefront proxy or use direct ingestion. Finally, add dashboards, charts, and alerts to monitor exactly what you need.</p> </td>
</tr>
<tr>
<td width="50%"><strong><font color="#0091DA" size="3">Kubernetes and Wavefront</font></strong><br> <a href="https://youtu.be/jbmUKPSIguQ" target="_blank"><img src="/images/v_kubernetes_lightboard.png" alt="Kubernetes and Wavefront"/></a></td>
<td width="50%"><br><p>Containers have many benefits, but monitoring them can be challenging. In this video, Clement discusses several ways in which you can use Wavefront for monitoring Kubernetes. The video includes some discussion of our new Wavefront Collector for Kubernetes. </p> </td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">About Cardinality</font></strong><br>
<iframe id="kmsembed-1_824wsz3p" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_824wsz3p/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0"></iframe></td>
<td><br>
<p markdown="span">Clement explains why the concept of cardinality is so important for observability, what high cardinality means, and why Wavefront deals so well with high cardinality input.</p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Alerting in Wavefront</font></strong><br>
<a href="https://www.youtube.com/watch?v=VjmWExKiYYg&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K&index=1" target="_blank"><img src="/images/v_alerting_clement.png"  alt="Alerting With Wavefront"/></a></td>
<td><br>
<p markdown="span">Wavefront supports sophisticated alerts that go far beyond traditional alerting systems. Clement explains how alerts work using the example of an alert that alert fires when any monitored time series exceeds the threshold for 10 minutes. Wavefront then sends an alert notification to all specified alert targets. When the alert is resolved, notifications are sent to the targets again. Additional examples are shown in [other videos](videos_alerts.html).</p>
</td>
</tr>

<tr>
<td><strong><font color="#0091DA" size="3">Distributed Tracing in Wavefront</font></strong><br>
<a href="https://youtu.be/Z7mf_oZfcSE" target="_blank"><img src="/images/v_tracing.png"  alt="Distributed tracing in Wavefront"/></a></td>
<td><br>
<p>Clement first explains how you can visualize traces collected with Jaeger and Zipkin with the Wavefront UI. He then uses the example of monitoring a ride sharing app where a single trace includes apps on the user’s phone, the driver’s phone, etc. You can visualize the different components with the Wavefront tracing UI - and also use our UI to drill down on potential problems. Because we’re Open Tracing compliant, you can customize the trace with our SDKs and then look at aggregated information that shows how things are connected.  </p>
</td>
</tr>
</tbody>
</table>
