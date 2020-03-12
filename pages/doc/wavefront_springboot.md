---
title: Wavefront Spring Boot Autoconfigure
keywords:
tags: [best practice]
sidebar: doc_sidebar
permalink: wavefront_springboot.html
summary: Using Wavefront with Springboot
---

The Wavefront Spring Boot Autoconfigure SDK allows you to quickly configure your environment so Spring Boot components send metrics, histograms, and traces/spans to the Wavefront service. After you've completed setup, you can examine the data in a preconfigured dashboard.

## Getting Spring Boot Data Into Wavefront

You have two options for getting Spring Boot data into Wavefront:
* Wavefront included a [Micrometer integration](micrometer.html) for several years. This custom integration allows you to send your own metrics and create dashboards for them. The integration uses the [Wavefront Reporter for Micrometer](https://github.com/micrometer-metrics/micrometer).
* Wavefront made the Wavefront Spring Boot Autoconfigure SDK available recently. The SDK supports easy integration of metrics, histograms, and traces/spans and includes preconfigured customizable dashboards.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="25%">&nbsp;</th><th width="40%">Micrometer Integration</th><th width="45%">Spring Boot Autoconfigure</th></tr>
</thead>
<tr>
<td>Setup</td>
<td>
1. Set up Maven or Gradle<br>
2. Customize the configuration file</td>
<td>Auto Configuration or Custom Configuration options</td>
</tr>
<tr>
<td>Supported telemetry</td>
<td>Metrics</td>
<td>Metrics, histograms, traces/spans</td>
</tr>
<tr>
<td>Ingestion options</td>
<td>Proxy, direct ingestion </td>
<td>Proxy, direct ingestion </td>
</tr>
<tr>
<td>Visualization</td>
<td>Create dashboards, add charts, specify metrics.  </td>
<td>Clone and customize predefined dashboard.</td>
</tr>
<tr>
<td>Trial required?</td>
<td>Yes. Sign up for a free trial.</td>
<td>No. Use the free cluster (limited ingestion) <strong>or</strong> sign up for a trial. </td>
</tr>

</tbody>
</table>

## Frequently Asked Questions

Remove FAQs that have a lot of detail from README and put them here
