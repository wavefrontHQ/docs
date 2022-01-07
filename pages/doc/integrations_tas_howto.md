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

{% include important.html content="This document is for the Tanzu Appliation Service nozzle version 4.0 and later. Earlier versions are [documented here](https://docs.pivotal.io/wavefront-nozzle/3-x/). " %}

## Overview

Tanzu Observability by Wavefront (Wavefront) is a cloud-hosted service for full-featured observability. After you've set up Tanzu Application Service to send data to Wavefront, you can take advantage of preconfigured dashboards, customize predefined alerts, and more. You can clone and customize the predefined dashboards using the powerful Wavefront Query Language and selecting from many display options.

The VMware Tanzu Observability by Wavefront Nozzle includes the following key features:
* Send metrics from your VMware Tanzu Application Service for VMs (TAS for VMs) deployment to Wavefront.
* Bind Wavefront to any app running on VMware Tanzu Application Service for VMs (TAS for VMs)

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

## Install and Configure the Tanzu Observability by Wavefront Nozzle

1. Install the Nozzle
  1. Download the product file from the Pivotal Network.
  2. Navigate to the Ops Manager Installation Dashboard and click **Import a Product**.
  3. Under  **Import a Product**, click + next to the version number of VMware Tanzu Observability by Wavefront Nozzle. This adds the tile to your staging area.
2. Click the Tanzu Observability by Wavefront tile, and then click **Settings** to start configuration.
   <table style="width: 100%;">
   <tbody>
   <tr>
   <td width="50%">1. Click <strong>Assign AZs and Networks</strong>, and xxx</a>.
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">2. Click <strong>Wavefront Proxy Config</strong>, and specify:
   <ol><li>The URL of your Wavefront instance, for example, https://longboard.wavefront.com.</li>
   <li>A Wavefront API token. See <a href="wavefront_api.html#generating-an-api-token">Generating an API Token</a></li>
   <li>User-friendly name for the proxy host. RK>>True?? and CF Quota RK>>what's that??</li>
   <li>Click <strong>Custom Proxy Configuration &gt;Custom</strong> to specify <a href="proxies_configuring.html">proxy configuration</a>, <a href="proxy preprocessor rules">proxies_preprocessor_rules.html</a>, and logs ingestion config. RK>>How do I set logs ingestion config?? is that for the proxy??
   </li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">3. Click <strong>Wavefront Firehose Nozzle Config</strong>, xxx</a>.
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">4. Click <strong>Service Access</strong>, xxx</a>.
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">5. Click <strong>Errands</strong>, xxx</a>.
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%">6. Click <strong>Resource Config</strong>, xxx</a>.
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   </tbody>
   </table>
