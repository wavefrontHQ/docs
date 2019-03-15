---
title: Wavefront and Data Videos
keywords: videos
tags: [videos]
sidebar: doc_sidebar
permalink: videos_data.html
summary: Watch videos related to data including integrations, tagging data, and histograms.
---

Learn about getting data into Wavefront and get background info on time series and interpolation. You can also watch Clement talk about histograms and learn about tagging.

<table style="width: 100%;">
<tbody>
<tr>
<td width="30%"><strong><font color="blue">Getting Data Into Wavefront</font></strong><br> <a href="https://www.youtube.com/watch?v=lhrtPSqn8-c&index=2&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K" target="_blank"><img src="/images/v_data_into_wavefront.png" alt="getting data into wavefront"/></a></td>
<td width="70%"><br><p>Wavefront gives observability into your cloud environment and packaged applications. To get data into Wavefront, use an integration with preconfigured dashboards or one of the Wavefront SDKs. Send data from several sources to a Wavefront proxy or use direct ingestion. Finally, add dashboards, charts, and alerts to monitor exactly what you need.</p> </td>
</tr>
<tr>
<td><strong><font color="blue">Time Series and Interpolation</font></strong><br>
<a href="https://youtu.be/9LnDszVrJs4"  target="_blank"><img src="/images/v_interpolation.png" alt="time series and interpolation"/></a></td>
<td><br>
<p>Interpolation means that Wavefront creates pseudo data points if data are reported at different intervals. To support aggregation of multiple series--e.g. sum()--Wavefront . Wavefront performs automatic alignment data for very large intervals using mean(), but you can select the summarization function. The raw<em>X</em>() functions include only actual data points--no automatic interpolation is performed. </p>
</td>
</tr>
<tr>
<td><strong><font color="blue">Integrations</font></strong><br>
<a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=534a1003-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true" target="_blank"><img src="/images/v_integrations_intro.png" alt="intro to integrations"/></a></td>
<td><br>
<p>Jason shows how any user with Integrations permission can browse existing integrations and use the instructions in the Setup tab to get data flowing. He uses the Amazon Web Services example to illustrate setup, and then explores some predefined AWS dashboards.</p>
</td>
</tr>
<tr>
<td><strong><font color="blue">Tagging Your Data with Wavefront</font></strong><br>
<a href="https://www.youtube.com/watch?v=9tt4orZHQts&index=3&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K" target="_blank"><img src="/images/v_tagging_clement.png"  alt="Tagging in Wavefront"/></a></td>
<td><br>
<p>By default, data include the metric name and host. With cloud integrations, we include additional dimensions e.g. the AWS region, as point tags. You can add explicitly point tags to any data source from the UI or the API. Source tags allow you to group machines, for example, into db machines and web machines. You can then customize your queries to pull out just the data you need. </p>
</td>
</tr>
<tr>
<td><strong><font color="blue">Browsing Metrics</font></strong><br><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=633ceb73-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true" target="_blank"><img src="/images/v_browse_metrics.png" alt="browsing metrics"/></a></td>
<td><br>
<p>Jason shows how you can use the Metrics browser to view metrics that you can query for. He explains why we obsolete metrics, and then drills down into a metric. He displays the sources for a metric, and then visualizes the metric in a chart. He also searches for metrics, and then explores how to use Hide Metrics to remove metrics from view.</p>
</td>
</tr>
<tr>
<td><strong><font color="blue">Wavefront Histograms</font></strong><br> <a href="https://www.youtube.com/watch?v=syIKQ2oZk9s&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K&index=16" target="_blank"><img src="/images/v_data_into_wavefront.png" alt="getting data into wavefront"/></a></td>
<td><br><p>Clement explains how Wavefront histograms can help you observe measurements that happen at a high frequency. You learn how Wavefront organizes these high frequency metrics into bins, and how you can use the query language to work with the resulting histograms.  </p> </td>
</tr>
</tbody>
</table>
