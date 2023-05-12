---
title: Service Interfaces
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_interfaces.html
summary: An overview of the various interfaces for interacting with VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront).
---

Operations for Applications provides different kinds of interfaces for performing different kinds of tasks. Click on the links for further information about each type of interface.

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
<td markdown="span">Operations for Applications user interface (UI)</td>
<td>Interacting directly with Operations for Applications from your browser. Sample tasks include visualizing metrics, histograms, and trace data in charts and dashboards; running queries; setting up alerts and alert notifications; installing and managing integrations; creating events;
<p>In the <strong>original</strong> Operations for Applications subscriptions, this interface also provides support for managing users, user groups, roles, permissions, and preferences. For information about original and new subscriptions and the differences between them, see <a href="subscriptions-differences.html">Subscription Types</a>. </p></td>
</tr>
<tr>
<td markdown="span">VMware Cloud Services Console</td>
<td>In the <strong>new</strong> Operations for Applications subscriptions, VMware Cloud services provides support for managing users, user groups, roles, and preferences. For information about original and new subscriptions and the differences between them, see <a href="subscriptions-differences.html">Subscription Types</a>. </td>
</tr>
<tr>
<td markdown="span">[Operations for Applications REST API](wavefront_api.html) </td>
<td markdown="span">Writing scripts to perform UI actions programmatically. The REST API is based on Swagger, so you can generate the API client of your choice (including a CLI client).</td>
</tr>
<tr>
<td markdown="span">[Operations for Applications SDKs](wavefront_sdks.html)</td>
<td markdown="span">Instrumenting your application code to send metrics, histograms, and trace data to Operations for Applications, either through the Wavefront proxy or directly to the Operations for Applications service. These SDKs are available for most popular programming languages, and are available in GitHub.</td>
</tr>
<tr>
<td markdown="span">[Operations for Applications CLIs](wavefront_clis.html)</td>
<td markdown="span">Running command-line utilities to install and configure the Wavefront proxy, the Telegraf collector agent, or integrations.</td>
</tr>
</tbody>
</table>
