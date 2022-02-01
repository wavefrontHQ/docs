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
<td width="30%"><strong><font color="#0091DA" size="3">Getting Data Into Wavefront</font></strong><br> <a href="https://www.youtube.com/watch?v=lhrtPSqn8-c&index=2&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K" target="_blank"><img src="/images/v_data_into_wavefront.png" alt="getting data into wavefront"/></a></td>
<td width="70%"><br><p>Wavefront gives observability into your cloud environment and packaged applications. To get data into Wavefront, use an integration with preconfigured dashboards or one of the Wavefront SDKs. Send data from several sources to a Wavefront proxy or use direct ingestion. Finally, add dashboards, charts, and alerts to monitor exactly what you need.</p> </td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Browsing your Data</font></strong><br>
<br>
<iframe src="https://bcove.video/3lHbhDd" width="400" height="225" allowfullscreen="true" alt="browse metrics from source browser or metrics browser"></iframe>
</td>
<td><br>
<p>90-second video that shows how you can find and examine metrics from the Sources browser and from the Metrics browser. </p>
<p>You can also watch the video <a href="https://bcove.video/3lHbhDd" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p> 
</td>
</tr>
<tr>
<td width="30%"><strong><font color="#0091DA" size="3">Wavefront Proxy</font></strong><br> <a href="https://youtu.be/Lrm8UuxrsqA" target="_blank"><img src="/images/v_proxy_clement.png " alt="Wavefront proxy video"/></a></td>
<td width="70%"><br><p>Clement contrasts using a Wavefront proxy with using direct ingestion, discusses proxy benefits, and goes over the architecture of most production systems, which includes a fleet of proxies behind a load balancer. The result is more resilience and a better user experience. </p> </td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Time Series and Interpolation</font></strong><br>
<a href="https://youtu.be/9LnDszVrJs4"  target="_blank"><img src="/images/v_interpolation.png" alt="time series and interpolation"/></a></td>
<td><br>
<p>Interpolation means that Wavefront creates pseudo data points if data are reported at different intervals. To support aggregation of multiple series--e.g. sum()--Wavefront . Wavefront performs automatic alignment data for very large intervals using mean(), but you can select the summarization function. The raw aggregation function includes only actual data points--no automatic interpolation is performed. </p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Integrations</font></strong><br>
<br>
<iframe src="https://bcove.video/2JTvMgW" width="400" height="225" allowfullscreen="true" alt="new intro to integrations"></iframe>
</td>
<td><br>
<p>Jason shows how any user with Integrations permission can browse existing integrations and use the instructions in the Setup tab to get data flowing.</p>
<p>You can also watch the video <a href="https://bcove.video/2JTvMgW" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p> 
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Getting Windows Host Metrics Into Wavefront</font></strong><br>
<br>
<iframe src="https://bcove.video/3rXZ1RY" width="400" height="225" allowfullscreen="true" alt="Setting up a Windows integration"></iframe>
</td>
<td><br>
<p>Watch this video to learn how to send metrics data from a Windows host machine to Wavefront by using the Wavefront proxy.</p>
<p>You can also watch the video <a href="https://bcove.video/3rXZ1RY" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p> 
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Tagging Your Data with Wavefront</font></strong><br>
<a href="https://www.youtube.com/watch?v=9tt4orZHQts&index=3&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K" target="_blank"><img src="/images/v_tagging_clement.png"  alt="Tagging in Wavefront"/></a></td>
<td><br>
<p>By default, data include the metric name and host. With cloud integrations, data include additional dimensions, such as the AWS region, as point tags. You can add point tags explicitly to any data source from the UI or the API. Source tags are different - they allow you to group machines, for example, into db machines and web machines. You can then customize your queries to pull out just the data you need. </p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Wavefront Histograms</font></strong><br> <a href="https://www.youtube.com/watch?v=syIKQ2oZk9s&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K&index=16" target="_blank"><img src="/images/v_data_into_wavefront.png" alt="getting data into wavefront"/></a></td>
<td><br><p>Clement explains how Wavefront histograms can help you observe measurements that happen at a high frequency. You learn how Wavefront organizes these high frequency metrics into bins, and how you can use the query language to work with the resulting histograms.  </p> </td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Cumulative Counters and Delta Counters</font></strong><br>
<br>
<iframe src="https://bcove.video/39DNLom" width="400" height="225" allowfullscreen="true" alt="delta counters video, part animation, part screen capture"></iframe>
</td>
<td><br>
<p>Learn the difference between cumulative counters and delta counters and see how to manage delta counters from the UI.</p>
<p>You can also watch the video <a href="https://bcove.video/39DNLom" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p> 
</td>
</tr>

</tbody>
</table>
