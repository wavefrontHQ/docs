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
<td width="30%"><strong><font color="#0091DA" size="3">Getting Data Into Wavefront</font></strong><br><br/>
<iframe id="kmsembed-1_nc4kmszz" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_nc4kmszz/uiConfId/49694343/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade"  frameborder="0" title="Getting Data Into Wavefront"></iframe></td>
<td width="70%"><br><p>Wavefront gives observability into your cloud environment and packaged applications. To get data into Wavefront, use an integration with preconfigured dashboards or one of the Wavefront SDKs. Send data from several sources to a Wavefront proxy or use direct ingestion. Finally, add dashboards, charts, and alerts to monitor exactly what you need.</p> </td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Browsing Your Data</font></strong><br>
<br>
<iframe id="kmsembed-1_ai5iua3f" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_ai5iua3f/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0"></iframe>
</td>
<td><br>
<p>90-second video that shows how you can find and examine metrics from the Sources browser and from the Metrics browser. </p><p>You can also watch the video <a href="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_ai5iua3f/uiConfId/49694343/pbc/252649793/st/0" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
<tr>
<td width="30%"><strong><font color="#0091DA" size="3">Wavefront Proxy</font></strong><br><br>
<iframe id="kmsembed-1_5wfjti3m" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_5wfjti3m/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Wavefront Proxy"></iframe>
</td>
<td width="70%"><br><p>Clement contrasts using a Wavefront proxy with using direct ingestion, discusses proxy benefits, and goes over the architecture of most production systems, which includes a fleet of proxies behind a load balancer. The result is more resilience and a better user experience. </p> </td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Time Series and Interpolation</font></strong><br><br>
<iframe id="kmsembed-1_afml14zm" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_afml14zm/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Tanzu Observability: Time Series and Interpolation"></iframe>
</td>
<td><br>
<p>Interpolation means that Wavefront creates pseudo data points if data are reported at different intervals. To support aggregation of multiple series--e.g. sum()--Wavefront . Wavefront performs automatic alignment data for very large intervals using mean(), but you can select the summarization function. The raw aggregation function includes only actual data points--no automatic interpolation is performed. </p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Integrations</font></strong><br>
<br>
<iframe id="kmsembed-1_j454pr6u" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_j454pr6u/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="intro to integrations"></iframe>
</td>
<td><br>
<p>Jason shows how any user with Integrations permission can browse existing integrations and use the instructions in the Setup tab to get data flowing.</p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_j454pr6u" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Getting Windows Host Metrics Into Wavefront</font></strong><br>
<br>
<iframe id="kmsembed-1_0bbze8os" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_0bbze8os/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="Setting up a Windows integration"></iframe>
</td>
<td><br>
<p>Watch this video to learn how to send metrics data from a Windows host machine to Wavefront by using the Wavefront proxy.</p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_0bbze8os" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
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
<iframe id="kmsembed-1_khsugqea" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_khsugqea/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="delta counters video, part animation, part screen capture"></iframe>
</td>
<td><br>
<p>Learn the difference between cumulative counters and delta counters and see how to manage delta counters from the UI.</p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_khsugqea" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>

</tbody>
</table>
