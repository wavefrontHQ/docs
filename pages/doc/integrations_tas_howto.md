---
title: Monitor Tanzu Application Service with Tanzu Observability by Wavefront
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_tas_howto.html
summary: Set up the Tanzu Observability tile and monitor your envionment
---

[VMware Tanzu Application Service]() previously known as Pivotal Cloud Foundry, is a popular platform for building cloud-native applications. This doc page explains:
* How to install and configure the Tanzu Observability by Wavefront nozzle from  ??
* How to access the Tanzu Application Service integration, and what you can do there.

{% include important.html content="This document is for the Tanzu Application Service nozzle version 4.0 and later. Earlier versions are [documented here](https://docs.pivotal.io/wavefront-nozzle/3-x/). " %}

## Overview

Tanzu Observability by Wavefront (Wavefront) is a cloud-hosted service for full-featured observability. After you've set up Tanzu Application Service to send data to Wavefront, you can take advantage of preconfigured dashboards, customize predefined alerts, and more. You can clone and customize the predefined dashboards using the powerful Wavefront Query Language and selecting from many display options.

The VMware Tanzu Observability by Wavefront Nozzle includes the following key features:
* Send metrics from your VMware Tanzu Application Service for VMs (TAS for VMs) deployment to Wavefront.
* Bind Wavefront to any app running on VMware Tanzu Application Service for VMs (TAS for VMs).

Here's an overview of the flow of data from the Tanzu Application Service Firehose through the nozzle to the Wavefront service.

![TAS Firehose to Exporters like pas-sli-exporter, to Telegraf agent, to Wavefront proxy, to Wavefront service](images/tas-to.png)

## Product Snapshot

RK>>Worthwhile to include this info?? Maybe add link to Pivotal doc?

The following table provides version and version-support information about VMware Tanzu Observability by Wavefront Nozzle.
Element
Details
Tile version
v3.0.4
Release date
December 15, 2021
Software component version
VMware Tanzu Observability by Wavefront Nozzle v1.3.1, VMware Tanzu Observability by Wavefront Proxy v9.2, and VMware Tanzu Observability by Wavefront Service Broker v0.9.5
Compatible Ops Manager version(s)
v2.5.x, v2.6.x, v2.7.x, v2.8.x, v2.9.x, and v2.10.x
Compatible VMware Tanzu Application Service for VMs version(s)
v2.5.x, v2.6.x, v2.7.x, v2.8.x, v2.9.x, v2.10.x, v2.11.x, and v2.12.x
BOSH stemcell version
Ubuntu Xenial
IaaS support
AWS, GCP, and vSphere

## Requirements

VMware Tanzu Observability by Wavefront Nozzle has the following requirements:
	•	Read-only administrative access to the Doppler Firehose and Cloud Controller.
	•	Access to a Wavefront instance and an API token. [Service Account API token](wavefront_api.html#generating-an-api-token) is recommended.
	•	A VMware Tanzu Quota with at least 8GB of available memory.

## Install the Tanzu Observability by Wavefront Nozzle


1. Download the product file from the Pivotal Network.
2. Navigate to the Ops Manager Installation Dashboard and click **Import a Product**.
3. Under  **Import a Product**, click + next to the version number of VMware Tanzu Observability by Wavefront Nozzle. This adds the tile to your staging area.

## Configure the Tanzu Observability by Wavefront Nozzle

Click the Tanzu Observability by Wavefront tile, and then click **Settings** to start configuration.
<table style="width: 100%;">
<tbody>
   <tr>
   <td width="50%">1. Click <strong>Assign AZs and Networks</strong>, and xxx.
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">2. Click <strong>Wavefront Proxy Config</strong> and specify:
   <ol><li>The URL of your Wavefront instance, for example, https://longboard.wavefront.com.</li>
   <li>A Wavefront API token. See <a href="wavefront_api.html#generating-an-api-token">Generating an API Token</a></li>
   <li>User-friendly name for the proxy. </li>
   <li>CF org quota with at least 20 GB memory and a route and port available.</li>
   <li>Click <strong>Custom Proxy Configuration &gt;Custom</strong> to specify <a href="proxies_configuring.html">proxy configuration</a>, <a href="proxy preprocessor rules">proxies_preprocessor_rules.html</a>, and logs ingestion config.
<!---
   RK>>How do I set logs ingestion config?? is that for the proxy?? (points to https://docs.wavefront.com/integrations_log_data.html#configuring-the-wavefront-proxy-to-ingest-log-data) but who knows.)<br/>
--->
   The nozzle ignores the <code> server, hostname, token, pushListenerPorts, opentsdbPorts, idFile, buffer, and preprocessorConfigFile</code> configuration properties.
   </li>
   <li>Click <strong>Save</strong> </li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">3. Click <strong>Telegraf Agent Config</strong> and specify:
   <ol>
   <li><strong>Telegraf Agent Interval</strong>  </li>
   <li><strong>Telegraf Agent Agent Metric Batch Size</strong></li>
   <li><strong>Telegraf Agent Metric Buffer Limit</strong></li>
   <li><strong>Foundation Name</strong></li>
   <li>Click <strong>Save</strong></li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">4. Click <strong>TAS for VMs Metric Exporter VMs </strong> and specify:
   <ol>
   <li><strong>Static IP address for counter metric exporter VMs</strong>  </li>
   <li><strong>Static IP address for gauge metric exporter VMs</strong></li>
   <li><strong>Static IP address for timer metric exporter VMs</strong></li>
   <li><strong>Static IP address for TAS for VMs SLI exporter VM</strong></li>
   <li><strong>Static IP address for certificate expiration metric exporter VM</strong></li>
   <li>If that makes sense in your environment, click <strong>Skip TLS certificate verification</strong> RK>>Do I have to do special things like upload certs??. </li>
   <li>Click <strong>Save</strong></li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">5. Click <strong>BOSH Health Metric Exporter VM </strong> and specify:
   <ol>
   <li><strong>Availability Zone</strong>  </li>
   <li><strong>VM type</strong></li>
   <li>Click <strong>Save</strong></li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">6. Click <strong>BOSH Deployment Metric Exporter VM</strong> and specify:
   <ol>
   <li><strong>UAA client credentials</strong>  </li>
   <li><strong>Static IP address for BOSH deployment exporter VM</strong></li>
   <li>Click <strong>Save</strong></li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">7. Click <strong>Errands</strong> and specify: RK>>what might I see here and what would I specify?? When would I change the 2 options
   <ol>
   <li><strong>Cleanup</strong>  </li>
   <li><strong>Remove CF SLI User </strong></li>
   <li>Click <strong>Save</strong></li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">8. Click <strong>Resource Config</strong> to review the preconfigured configuration. RK>>when would I change anything here??
   <br/>
   <strong>Note: SM Forwarder</strong> is set to <strong>Automatic:0</strong>. Do not change this setting.
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
</tbody>
</table>

## Explore Tanzu Application Service with Wavefront Dashboards

After you've completed the Nozzle setup, your data become available in your Wavefront instance inside an integration. Each integration includes several tabs.
* The **Dashboards** tab includes a rich set of preconfigured dashboards with charts for [examining your data](ui_examine_data.html). Users with Dashboards permission can clone any dashboard and [customize the dashboard](ui_dashboards.html) and the charts. Watch our [dashboard videos](videos_dashboards_charts.html) for some tips and tricks.
* The **Alerts** tab includes a set of preconfigured alerts. Clone any alert and specify who to notify in your environment. Wavefront supports several levels of severity and allows you to specify email, Pagerduty, and Webhook as notification targets. Watch our [alerts videos](videos_alerts.html) to get you started.

RK>> screenshot here??
