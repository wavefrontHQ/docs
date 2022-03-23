---
title: Tanzu Observability Interfaces
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_interfaces.html
summary: An overview of the various interfaces for interacting with Tanzu Observability by Wavefront.
---

Tanzu Observability provides different kinds of interfaces for performing different kinds of tasks. Click on the links for further information about each type of interface.

<table>
<colgroup>
<col width="30%"/>
<col width="70%"/>
</colgroup>
<thead>
<tr><th>This Interface</th><th>Provides Support For These Tasks</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">User interface (UI)</td>
<td markdown="span">Interacting directly with Tanzu Observability by Wavefront from your browser. Sample tasks include visualizing metrics, histograms, and trace data in charts and dashboards; running queries; setting up alerts and alert notifications; installing and managing integrations; creating events; managing users, user groups, permissions, and preferences. </td>
</tr>
<tr>
<td markdown="span">[Wavefront REST API](wavefront_api.html) </td>
<td markdown="span">Writing scripts to perform UI actions programmatically. The REST API is based on Swagger, so you can generate the API client of your choice (including a CLI client).</td>
</tr>
<tr>
<td markdown="span">[Tanzu Observability SDKs](wavefront_sdks.html)</td>
<td markdown="span">Instrumenting your application code to send metrics, histograms, and trace data to Tanzu Observability by Wavefront, either through the Wavefront proxy or directly to the Wavefront service. These SDKs are available for most popular programming languages, and are available in GitHub.</td>
</tr>
<tr>
<td markdown="span">[Tanzu Observability CLIs](wavefront_clis.html)</td>
<td markdown="span">Running command-line utilities to install and configure the Wavefront proxy, the Telegraf collector agent, or integrations.</td>
</tr>
</tbody>
</table>
