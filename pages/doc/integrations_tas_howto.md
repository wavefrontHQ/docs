---
title: Monitor Tanzu Application Service with Tanzu Observability by Wavefront
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_tas_howto.html
summary: Set up the Tanzu Observability tile and monitor your environment.
---

[VMware Tanzu Application Service](), previously known as Pivotal Cloud Foundry, is a popular platform for building cloud-native applications.

This doc page explains:
* How to install and configure the Tanzu Observability by Wavefront nozzle from Tanzu Ops Manager.
* How to access the Tanzu Application Service integration, and what you can do there.

{% include important.html content="This document is for the Tanzu Application Service nozzle version 4.0 and later. Earlier versions are [documented here](https://docs.pivotal.io/wavefront-nozzle/3-x/). " %}

## Overview

Tanzu Observability by Wavefront (Wavefront) is a cloud-hosted service for full-featured observability. When you Tanzu Application Service to send data to the Wavefront proxy, you can take advantage of preconfigured dashboards, customize predefined alerts, and more.

### Data Flow

Here's an overview of the flow of data from the Tanzu Application Service Firehose through the nozzle to the Wavefront service. The nozzle consists of these main components:
- **Healthwatch Exporters**: Exporters are deployed as VMs.
- **Telegraf**: An open source, lightweight server process for collecting, processing, and aggregating metrics.
- [**Wavefront Proxy**](proxies.html): Ingests metrics and forwards them to the
Wavefront service in a secure, fast, and reliable manner

Here's the data pipeline:
1. The Healthwatch Exporter VMs stream metrics from the TAS Firehose. The tile creates a VM for each Healthwatch exporter a VM for Telegraf and a VM for the Wavefront Proxy.
2. Telegraf scrapes the VMs at a predefined interval, and converts them to [Wavefront data format](wavefront_data_format.html).RK>>TRUE?? It's not proxy preprocessor rule(s)
3. The metrics are then sent to the Wavefront Proxy.  RK>>Telegraf sends them?
4. The proxy send the metrics to the Wavefront service.

![TAS Firehose to Exporters like pas-sli-exporter, to Telegraf agent, to Wavefront proxy, to Wavefront service](images/tas-to.png)

### Tanzu Observability by Wavefront Features

Tanzu Observability by Wavefront includes an integration for Tanzu Application Service(TAS). The integration supports a set of predefined dashboards that a fairly similar to the existing Healthwatch dashboards for TAS. * Clone any dashboard to customize it by adding charts that use the powerful [Wavefront Query Language](query_language_quickstart.html).
* Customize the dashboard and chart appearance.
* [Add alerts](alerts_manage.html) -- or [examine alerts](alerts.html) already included in the integration.

## Requirements

To set up this data pipeline, you need to meet requirements on the Ops Manager side and on the Tanzu Observability side.
* **Ops Manager Requirements**
  VMware Tanzu Observability by Wavefront Nozzle has the following requirements:
  *	Read-only access to the Doppler Firehose and Cloud Controller.
  * Access to a Wavefront instance and an API token. [Service Account API token](wavefront_api.html#generating-an-api-token) is recommended.
  * A VMware Tanzu Quota with at least 8GB of available memory.
  RK>> ??This came from the old nozzle doc, does it still apply??
* **Tanzu Observability by Wavefront Requirements**
  To set up the Tanzu Application Service integration on you Wavefront instance, you must have:
  * Access to a Wavefront instance with a URL like https://<example>.wavefront.com.
  * At a minimum, **Integrations** permission on that Wavefront instance.

This version of the Tanzu Observability by Wavefront Nozzle is compatible with Wavefront proxy version 10. and later.
??10.11? That's where we fixed log4j?

???VMware Tanzu Observability by Wavefront Service Broker v0.9.5

For earlier versions of this nozzle, see the **Product Snapshot** [this documentation](https://docs.pivotal.io/wavefront-nozzle/3-x/index.html).

## Ops Manager: Install the Tanzu Observability by Wavefront Nozzle

To install the nozzle:

1. Download the VMware Tanzu Observability TAS tile version 4 from [VMware Tanzu Network](https://network.pivotal.io/products/wavefront-nozzle/).
2. Log in to Ops Manager, select **Installation Dashboard** click **Import a Product**, and upload the file you just downloaded.
3. Under  **Import a Product**, click the plus sign (+) next to the version number of VMware Tanzu Observability by Wavefront Nozzle. This adds the tile to your staging area.

The tile is now available, but the orange bar at the bottom indicates that the product is not yet configured.

## Ops Manager: Configure the Tanzu Observability by Wavefront Nozzle

<!---For Assign AZs and Networks, using content from https://docs.pivotal.io/healthwatch/2-1/configuring/configuring-healthwatch.html#az  --->

To start configuration click the Tanzu Observability by Wavefront tile. With **Settings** selected (the default), follow these steps:

{% include tip.html content="The first 3 configuration panes are required. The other panes are optional, most users don't make changes to those settings." %}

<table style="width: 100%;">
<tbody>
   <tr>
   <td width="50%"><strong>Step 1.</strong> Click <strong>Assign AZs and Networks</strong>, to configure those settings.
   <ol><li>Under <strong>Place singleton jobs in</strong>, select the AZ you want to use. Ops Manager runs any job with a single instance in this AZ.</li>
   <li>Under <strong>Balance other jobs in</strong>, select one or more other AZs. Ops Manager balances instances of jobs with more than one instance across the AZs that you specify. </li>
  <li>From the <strong>Network</strong> dropdown, select the subnet that you created when you configured the BOSH Director tile. That network often has <code>pas</code> or <code>tas</code> in its name. </li>
  <li>From the <strong>Service Network</strong> dropdown, select the service subnet that you created when you configured the BOSH Director tile. That network often has <code>services</code> in its name. </li>
  <li>Click <strong>Save</strong> </li>
  </ol>
   </td>
   <td width="50%"><img src="/images/tas_to_1.png" alt="Assign AZ and Networks screenshot, with values as discussed in text above."></td>
   </tr>
   <tr>
   <td width="50%"><strong>Step 2.</strong> Click <strong>Wavefront Proxy Config</strong> and specify:
   <ol><li>The URL of your Wavefront instance, for example, https://longboard.wavefront.com.</li>
   <li>A Wavefront API token. See <a href="wavefront_api.html#generating-an-api-token">Generating an API Token</a></li>
   <li>User-friendly name for the proxy. </li>
   <li>Click <strong>Save</strong> or click <strong>Custom</strong> to specify <a href="proxies_configuring.html">proxy configuration</a>, <a href="proxy preprocessor rules">proxies_preprocessor_rules.html</a> and click <strong>Save</strong>
   The nozzle ignores these configuration properties because they're already defined in the setup steps:
   <ul><li>server</li>
   <li>hostname</li>
   <li>pushListenerPorts</li>
  <li>opentsdbPorts</li>
  <li>idFile</li>
  <li>buffer</li>
  <li>preprocessorConfigFile</li></ul>
   </li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tas_to_2.png" alt="Proxy Config screenshot, with values as discussed in text above."></td>
   </tr>
   <tr>
   <td width="50%"><strong>Step 3.</strong> Click <strong>Telegraf Agent Config</strong> and customize the Telegraf Agent config or accept the defaults.
   <ol>
   <li>For <strong>Scrape Interval</strong>, specify the default interval at which Telegraf agent checks for new data.</li>
   <li>For <strong>Metric Batch Size</strong>, specify the maximum number of points in each batch of metrics that Telegraf sends to the Wavefront proxy. ??IS THAT TRUE??</li>
   <li>For <strong>Metric Buffer Limit</strong>, specify the Wavefront proxy buffer size. If your environment sends bursty data, use a larger buffer to the proxy can queue and then drain those data.</li>
   <li>For <strong>Flush Interval</strong>, specify ??WHAT??</li>
   <li>For <strong>Foundation Name</strong>, specify a unique name for your Tanzu Application Service environment. This name will be added to all metrics as the metrics source (source=). ??IS THAT TRUE??</li>
   <li>(Optional) Click <strong>Advanced Options</strong> to specify a custom proxy URL, custom proxy port, or additional Telegraf inputs ??RK>>Examples?? Link??</li>
   <li>Click <strong>Save</strong></li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tas_to_3.png" alt="Telegraf Agent Config screenshot, with values as discussed in text above."></td>
   </tr>
   <tr>
   <td width="50%"><strong>Step 4.</strong> Click <strong>Metrics Exporters</strong> to customize metrics export from Tanzu Application Service:
   <ol>
   <li>Select <strong>Skip TLS Verification When Querying</strong> if you want to turn off TLS verification, for example, during testing or a POC. </li>
   <li>Select a <strong>BOSH Health Check Availability Zone</strong> if you don't want to use the default zone. </li>
   <li>Customize the <strong>BOSH Health Check Payload VM Type</strong> to change the default. RK>>LET'S ADD SOME VALUE HERE. </li>
   <li>Click <strong>Save</strong></li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tas_to_4.png" alt="Metric Exporter screenshot, with values as discussed in text above."></td>
   </tr>
   <tr>
   <td width="50%"><strong>(Optional) Step 5.</strong> Click <strong>Errands</strong> and specify: RK>>what might I see here and what would I specify?? When would I change the 2 options
   <ol>
   <li><strong>Cleanup</strong>  </li>
   <li><strong>Remove CF SLI User </strong></li>
   <li>Click <strong>Save</strong></li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
   <tr>
   <td width="50%"><strong>(Optional) Step 6. </strong> Click <strong>Resource Config</strong> to review the preconfigured configuration. RK>>when would I change anything here??
   <br/>
   <strong>Note: SM Forwarder</strong> is set to <strong>Automatic:0</strong>. Do not change this setting.
   </td>
   <td width="50%"><img src="/images/tmc_service_account_create.png" alt="Create service account dialog with name and description filled in."></td>
   </tr>
</tbody>
</table>

## Use Tanzu Application Service Dashboards and Alerts

After you've completed the Nozzle setup, your data become available in your Wavefront instance inside an integration. Each integration includes several tabs.
* The **Dashboards** tab includes a rich set of preconfigured dashboards with charts for [examining your data](ui_examine_data.html). Users with Dashboards permission can clone any dashboard and [customize the dashboard](ui_dashboards.html) and the charts. Watch our [dashboard videos](videos_dashboards_charts.html) for some tips and tricks.
* The **Alerts** tab includes a set of preconfigured alerts. Clone any alert and specify who to notify in your environment. Wavefront supports several levels of severity and allows you to specify email, Pagerduty, and Webhook as notification targets. Watch our [alerts videos](videos_alerts.html) to get you started.
* Get started with some of our [conceptual videos](videos_quickstart.html) or some of our [hands-on videos](videos_howto_start.html).
RK>> screenshot here??

## TAS to TObs FAQ

In this section, we have some answers to frequently asked questions.

### How can I change the scrape interval?

By default, the scrape interval is set to 15 seconds, but you can set up your environment to check more frequently:
1. In OpsManager, click **Telegraf Agent Config**.
2. Set the **Scrape Interval (seconds)** field and click **Save**.

### How can I send TAS data via a proxy that is deployed outside the tile?

Some customers have a central monitoring/observability team that requires that all data to be sent via a specific set of production proxies. Those proxies are used to filter or alter data before they are sent to the Wavefront service.

You can set up your environment to use production proxies as follows:
1. In Ops Manager, click **Telegraf Agent Config**.
2. In **Advanced Options**, select **Yes**.
3. In the Custom Proxy URL field, provide a proxy URL or IP in the Custom Proxy URL (This could also be load balancer URL if the external proxies are behind a load balancer)
4. (Optional) In the **Proxy Port** field, provide a custom proxy port (Default is 2878).
5. Click **Save**

### How can I customize metrics ingestion?

If you don't want to monitor some of your TAS platform metrics, you can choose not to send them. If those metrics are monitored with any out-of-the-box or custom dashboards or alert, they show up as No Data.

For example, if you don’t want to ingest certificate expiration metrics, then you can remove the VM instance that is assigned to the Cert Expiration Exporter by default. All the metrics that this exporter scrapes will not get ingested.
1. In Ops Manager, click **Resource Config**.
2. Find the exporter for which you don't want to emit metrics, set it to 0, and click **Save**. The screenshot below shows how to do this.

![Cert Expiration Exporter is in process of being changed from Automatic to 0](images/tas_to_resource_config.png)

### How can I customize proxy behavior?

The Wavefront proxy allows you to control many aspects of your ingestion pipeline with configuration properties and preprocessor rules.
- **Configuration file**: The proxy processes data according to a configuration file. You can modify configuration properties -- for example, to create `block` list and `allow` list regex patterns, specify information about certain data formats, and much more. See [Configuring Wavefront Proxies](proxies_configuring.html).
- **Preprocessor Rules**: Starting with proxy version 4.1, the Wavefront proxy includes a preprocessor that applies user-defined rules before data is sent to the Wavefront service. You can use preprocessor rules to correct certain data quality issues when you can't fix the problem at the emitting source. See [Configuring Wavefront Proxy Preprocessor Rules](proxies_preprocessor_rules.html).

You can specify custom elements as follows:
1. In OpsManager, click **Wavefront Proxy Config**
2. Click **Wavefront Proxy Config**, and then click **Custom**.
3. Make your changes and click **Save**

RK>>Screenshot here when I know how.
