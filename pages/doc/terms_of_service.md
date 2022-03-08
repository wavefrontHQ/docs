---
title: Data Retention and Terms of Service
keywords: tos
tags: [tos]
sidebar: doc_sidebar
permalink: terms_of_service.html
summary: Data Retention and Terms of Service
---
The terms of service and data retention differs depending on the contract your company has with VMware. This page gives a summary and links to some relevant information.

{% include tip.html content="Details vary depending on when you became a customer and on your Service Agreement with VMware." %}


## Data Retention

Production Wavefront clusters retain different data for different amounts of time. While this is subject to change, here are the default settings:

<table>
<tbody>
<thead>
<tr><th width="20%">Type of Data</th><th width="80%">Retention</th></tr>
</thead>
<tr><td><strong>metrics and counters</strong></td>
<td>18 months of full-resolution (no downsampling)</td></tr>
<tr><td><strong>histograms</strong></td>
<td>6 months of data retention</td></tr>
<tr><td><strong>spans</strong></td>
<td>7 days retention. With spans, we use <a href="trace_data_sampling.html#wavefront-intelligent-sampling">Intelligent Sampling</a>. Use trace sampling policies explicitly exclude certain spans.  </td></tr>
</tbody>
</table>

## Terms of Service

Your Terms of Service are different depending on when you became a Wavefront customer.

Production clusters currently offer 18 months of full-resolution (no downsampling) data retention for metrics, 6 months for histograms, and 7 days for spans. We also have an uptime guarantee, as well as High Availability (HA) and Disaster Recovery (DR) options.

If you became a customer on or after August 17, 2017:

| Terms of Service: | [VMware Terms of Service](http://www.vmware.com/download/eula/wavefront-terms-of-service.html) |
| Privacy Policy: | See above Terms of Service |

If you became a customer before August 17, 2017:

| Terms of Service: | See your Wavefront Service Agreement |
| Privacy Policy: | [Wavefront Privacy Policy](https://docs.wavefront.com/privacy.html) |
