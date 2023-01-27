---
title: Monitor Tanzu Application Service with Tanzu Observability by Wavefront
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_tas_howto.html
summary: Set up the Tanzu Observability tile and monitor your environment.
---

[VMware Tanzu Application Service](https://docs.pivotal.io/application-service/2-12/concepts/overview.html), previously known as Pivotal Cloud Foundry, is a popular platform for building cloud-native applications.

Tanzu Observability by Wavefront (Wavefront) is a cloud-hosted service for full-featured observability. When you Tanzu Application Service to send data to the Wavefront proxy, you can take advantage of preconfigured dashboards, clone and customize dashboards, and more.

{% include important.html content="This document is for the Tanzu Application Service nozzle version 4.0 and later. Earlier versions are [documented here](https://docs.pivotal.io/wavefront-nozzle/3-x/). " %}

## Product Snapshot

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">Version, Release Date</td>
<td width="50%">v4.1, May 2022</td>
</tr>
<tr>
<td>Compatible Ops Manager versions</td>
<td>v2.10 and later</td>
</tr>
<tr>
<td>Compatible Tanzu Application Service versions</td>
<td>v2.11 and later</td>
</tr>
<tr>
<td>IaaS support</td>
<td>AWS, Azure, GCP, OpenStack, and vSphere</td>
</tr>
</tbody>
</table>

## Videos

Watch these videos to get started:

<table style="width: 100%;">
<tbody>
<tr>
<td><strong><font color="#0091DA" size="3">TAS Monitoring and Alerting with Tanzu Observability</font></strong><br>
<br>
<iframe id="kmsembed-1_cjv5gbqy" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_cjv5gbqy/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade"  frameborder="0" title="TAS Monitoring and Alerting with Tanzu Observability"></iframe>
</td>
<td><br><br>
<p>This 60-second video gives an overview of the architecture, installation process, and benefits of the Tanzu Observability integration for Tanzu Application Service. </p>
<p>You can also watch the video in the Tanzu Observability Integrations playlist <a href="https://vmwaretv.vmware.com/playlist/dedicated/252649793/1_jycyrkuw/" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Integrating TAS with Tanzu Observability: How to Get Started</font></strong><br>
<br>
<iframe id="kmsembed-1_sl2d1g42" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_sl2d1g42/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Integrating TAS with Tanzu Observability: How to Get Started"></iframe>
</td>
<td><br><br>
<p>This video is a complete walk-through of the steps required to get your data flowing from Tanzu Application Service to Tanzu Observability. You learn how to set up the nozzle in Ops Manager, how to get data flowing, and how you can view your data in preconfigured Tanzu Observability dashboards. </p>
<p>You can also watch the video in the Tanzu Observability Integrations playlist <a href="https://vmwaretv.vmware.com/playlist/dedicated/252649793/1_jycyrkuw/" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
</tbody>
</table>

## Process Overview

We've streamlined the getting started process so it involves a few simple steps -- some are performed in Tanzu Ops Manager, and some in the Wavefront GUI.

![4 steps below shown in an image. First 2 are purple, pivotal, next 2 are blue, wavefront. ](images/tas_to_overview.png)

1. Download the Tanzu Observability by Wavefront nozzle file from the [Tanzu Network](https://network.pivotal.io/)
2. In Tanzu Ops Manager, install, configure, and deploy the nozzle. At a minimum:
    1. In the **Wavefront Proxy Config** section, specify the Wavefront instance and API token (shown in the Wavefront instance in the integration's **Setup** tab) and a user-friendly host name.
   ![OpsMan Proxy Config tab with the 3 required items highlighted](images/tas_to_proxy_config.png)
    2. In the **Telegraf Agent Config** section, specify the Foundation name.<br/><br/>
     See [Ops Manager: Install, Configure, and Deploy the Nozzle](#step-2-ops-manager-install-configure-and-deploy-the-nozzle) and [Tanzu Application Service to Tanzu Observability FAQs](#tanzu-application-service-to-tanzu-observability-faqs)
     After you complete nozzle deployment, metrics are flowing from Tanzu Application Service to the Wavefront proxy and from there to your Wavefront instance. See [Data Flow](#architecture-and-data-flow) below.
3. Log in to your Wavefront instance (for example, `https://example.wavefront.com`) and confirm that metrics are flowing:
   1. Click **Integrations** in the toolbar, search for Tanzu Application Service, and select the integration.
   2. Click the **Metrics** tab and confirm metrics are flowing.
4. With the integration selected, click the **Dashboards** tab.
   1. Select from the set of predefined dashboards, which are modeled on the corresponding Healthwatch dashboards but have additional options. For example, you can examine multiple foundations from one dashboard.
   2. Explore one or two dashboards. [Examine Data with Dashboards and Charts](ui_examine_data.html) has an overview and includes a video.
   3. As appropriate, clone any of the existing dashboards to add charts, modify queries, and more. See [Create, Customize, and Optimize Dashboards](ui_dashboards.html) and [Create and Customize Charts](ui_charts.html)

## Architecture and Data Flow

Here's an overview of the flow of data from the Tanzu Application Service Firehose through the nozzle to the Wavefront service. The nozzle consists of these main components:
- **Healthwatch Exporters**: Exporters are deployed as VMs.
- **Telegraf**: An open source, lightweight server process for collecting, processing, and aggregating metrics.
- [**Wavefront Proxy**](proxies.html): Ingests metrics and forwards them to the
Wavefront service in a secure, fast, and reliable manner

Here's the data pipeline:
1. The Healthwatch Exporter VMs stream metrics from the Tanzu Application Service Firehose. The tile creates a VM for each Healthwatch exporter, a VM for Telegraf, and a VM for the Wavefront proxy.
2. Telegraf scrapes the VMs at a predefined interval, and converts them to [Wavefront data format](wavefront_data_format.html). Telegraf uses a built-in plugin. It uses the Wavefront Go SDK to convert the data.
3. Next, Telegraf sends the data to the Wavefront proxy.
4. The proxy send the metrics to the Wavefront service.

![TAS Firehose to Exporters like pas-sli-exporter, to Telegraf agent, to Wavefront proxy, to Wavefront service](images/tas-to.png)

## Tanzu Application Service to Tanzu Observability FAQs

In this section, we have some answers to frequently asked questions.

### How Can I Change the Scrape Interval?

By default, the scrape interval is set to 15 seconds, but you can set up your environment to check more frequently:
1. In Ops Manager, click **Telegraf Agent Config**.
2. Set the **Scrape Interval (seconds)** field and click **Save**.

### How Can I Send TAS Data via a Proxy That Is Deployed Outside the Tile?

Some customers have a central monitoring/observability team that requires that all data to be sent via a specific set of production proxies. Those proxies are used to filter or alter data before they are sent to the Wavefront service.

You can set up your environment to use production proxies as follows:
1. In Ops Manager, click **Telegraf Agent Config**.
2. In **Advanced Options**, select **Yes**.
3. In the Custom Proxy URL field, provide a proxy URL or IP in the Custom Proxy URL. 
    This could also be load balancer URL if the external proxies are behind a load balancer.
4. (Optional) In the **Proxy Port** field, provide a custom proxy port (Default is 2878).
5. Click **Save**.

### How Can I Customize Metrics Ingestion per Component?

If you don't want to monitor some of your TAS platform metrics, you can choose not to send them. If those metrics are monitored with any out-of-the-box or custom dashboards, they show up as No Data.

For example, if you don’t want to ingest certificate expiration metrics, then you can remove the VM instance that is assigned to the Cert Expiration Exporter by default. All the metrics that this exporter scrapes will not get ingested.
1. In Ops Manager, click **Resource Config**.
2. Find the exporter for which you don't want to emit metrics, set it to 0, and click **Save**. 
   
   The screenshot below shows how to do this.

![Cert Expiration Exporter is in process of being changed from Automatic to 0](images/tas_to_resource_config.png)


### How Can I Set Up a Metrics Filter?

If you want to consume only a subset of your metrics, you can use an allow list or block list.

You can specify the filter as follows:

1. In Ops Manager, click **Wavefront Proxy Config**.
2. Scroll down to **Filter metrics by metric name**, and select whether you want to use an allow list or a block list.
3. Enter one or more regular expression patterns for your selected list. 
   
   Each pattern must begin and end with a slash (/) and be on its own line.


### How Can I Further Customize Proxy Behavior?

The Wavefront proxy allows you to control many aspects of your ingestion pipeline with configuration properties and preprocessor rules.
- **Configuration file**: The proxy processes data according to a configuration file. You can modify configuration properties -- for example, to create `block` list and `allow` list regex patterns, specify information about certain data formats, and much more. See [Configuring Wavefront Proxies](proxies_configuring.html).
- **Preprocessor Rules**: Starting with proxy version 4.1, the Wavefront proxy includes a preprocessor that applies user-defined rules before data is sent to the Wavefront service. You can use preprocessor rules to correct certain data quality issues when you can't fix the problem at the emitting source. See [Configuring Wavefront Proxy Preprocessor Rules](proxies_preprocessor_rules.html).

You can specify custom elements as follows:
1. In Ops Manager, click **Wavefront Proxy Config**.
2. Under **Custom Proxy Config**, click **Custom**.
3. Make your changes and click **Save**.

### Things Aren't Working. What Can I Do?

Ensure that your environment meet requirements on the Ops Manager side and on the Tanzu Observability side.
* **Ops Manager Requirements**
  VMware Tanzu Observability by Wavefront nozzle has the following requirements:
  *	Read-only access to the Doppler Firehose and Cloud Controller.
  * Access to a Wavefront instance and an API token. [Service Account API token](wavefront_api.html#generating-an-api-token) is recommended.
* **Tanzu Observability by Wavefront Requirements**
  To set up the Tanzu Application Service integration on you Wavefront instance, you must have:
  * Access to a Wavefront instance with a URL like `https://example.wavefront.com`.
  * At a minimum, **Integrations** permission on that Wavefront instance.
  * This version of the Tanzu Observability by Wavefront nozzle is compatible with Wavefront proxy version 10.14 and later.

See [Tanzu Observability and TAS Troubleshooting](tas_to_troubleshooting.html) for more.

## Process Details

This section explains each step in the flow in detail.

### Prerequisites

* You must have a Tanzu Network account to configure the Tanzu Observability Nozzle in Ops Manager.
* You must have login credentials for a Wavefront instance to configure the integration.
* Ensure that the root certificate for Ops Manager is included in data coming from Tanzu Application Service. See the [No Data Flowing and Certificate Error](tas_to_troubleshooting.html#symptom-no-data-flowing-in-and-certificate-error) troubleshooting section.


### Step 1: Download the Nozzle File

Download the Tanzu Observability by Wavefront nozzle file from the [Tanzu Network](https://network.pivotal.io/) to your local filesystem. You must have a Tanzu Network account to perform this task.

### Step 2: Ops Manager: Install, Configure, and Deploy the Nozzle

**To install the nozzle:**

1. Download the VMware Tanzu Observability TAS tile version 4 from [VMware Tanzu Network](https://network.pivotal.io/products/wavefront-nozzle/).
2. Log in to Ops Manager, select **Installation Dashboard**, click **Import a Product**, and upload the file you just downloaded.
3. Under  **Import a Product**, click the plus sign (+) next to the version number of VMware Tanzu Observability by Wavefront nozzle. 
   This adds the tile to your staging area.

The tile is now available, but the orange bar at the bottom indicates that the product is not yet configured.

<!---For Assign AZs and Networks, using content from https://docs.pivotal.io/healthwatch/2-1/configuring/configuring-healthwatch.html#az  --->

**To configure the nozzle:**

In Ops Manager, click the Tanzu Observability by Wavefront tile. With **Settings** selected (the default), follow these steps:

{% include tip.html content="Most users don't make changes to <strong>Errands</strong> and <strong>Resource Config</strong>. Required inputs are the three fields on the <strong>Wavefront Proxy Config</strong> tab and the <strong>Foundation Name</strong> on the <strong>Telegraf Agent Config</strong>." %}

<table style="width: 100%;">
<tbody>
   <tr>
   <td width="50%"><strong>Step 1.</strong> Click <strong>Assign AZs and Networks</strong>, to configure the availability zone and network settings.
   <ol><li>Under <strong>Place singleton jobs in</strong>, select the AZ you want to use. <br/><br/> Ops Manager runs any job with a single instance in this AZ.</li>
   <li>Under <strong>Balance other jobs in</strong>, select one or more other AZs.<br/><br/> Ops Manager balances instances of jobs with more than one instance across the AZs that you specify. </li>
  <li>From the <strong>Network</strong> drop-down menu, select the subnet that you created when you configured the BOSH Director tile. <br/><br/>That network often has <code>pas</code> or <code>tas</code> in its name. </li>
  <li>From the <strong>Service Network</strong> drop-down menu, select the service subnet that you created when you configured the BOSH Director tile. <br/><br/>That network often has <code>services</code> in its name. </li>
  <li>Click <strong>Save</strong>. </li>
  </ol>
   </td>
   <td width="50%"><img src="/images/tas_to_1.png" alt="Assign AZ and Networks screenshot, with values as discussed in text above."></td>
   </tr>
   <tr>
   <td width="50%"><strong>Step 2.</strong> Click <strong>Wavefront Proxy Config</strong> and specify:
   <ol><li>The URL of your Wavefront instance, for example, <code>https://example.wavefront.com</code>.</li>
   <li>A Wavefront API token. See <a href="wavefront_api.html#generating-an-api-token">Generating an API Token</a>.</li>
   <li>User-friendly name for the proxy. </li>
   <li>Click <strong>Save</strong> or click <strong>Custom</strong> (see the next step).
   The nozzle ignores these configuration properties because they're already defined in the setup steps:
   <ul><li>server</li>
   <li>hostname</li>
   <li>pushListenerPorts</li>
  <li>opentsdbPorts</li>
  <li>idFile</li>
  <li>buffer</li>
  <li>preprocessorConfigFile</li></ul>
   </li>
   <li>(TAS Nozzle v3) If you are currently using the Tanzu Application Service v3 service broker to send metrics from apps to the Wavefront proxy, select this check box to ensure existing bindings continue to work. Otherwise, leave the check box deselected. </li>
   <li>(Optional) If you click <strong>Custom</strong> you can specify <a href="proxies_configuring.html">proxy configuration</a> properties or <a href="proxies_preprocessor_rules.html"> proxy preprocessor rules</a>.</li>

   <ul><li>In the <strong>Config</strong> field, specify one or more configuration properties and values, separated by newline characters. For example <code>pushRateLimit=10000</code>.  </li>
   <li>In the <strong>Preprocessor Rules</strong> field, specify one or more preprocessor rules, separated by newline characters. For example: <code>
'2878':
  - rule    : example-replace-badchars
    action  : replaceRegex
    scope   : pointLine
    search  : "[&\\$\\*]"
    replace : "_"

  - rule    : drop-az-tag
    action  : dropTag
    tag     : az
    match   : dev.*</code>. </li> </ul>
   <li>Click <strong>Save</strong>. </li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tas_to_1_1.png" alt="Proxy Config screenshot, with values as discussed in text above."></td>
   </tr>
   <tr>
   <td width="50%"><strong>Step 3.</strong> Click <strong>Telegraf Agent Config</strong> and customize the Telegraf Agent config or accept the defaults.
   <ol>
   <li>For <strong>Scrape Interval (seconds)</strong>, specify the default interval at which Telegraf agent checks for new data.</li>
   <li>For <strong>Metric Buffer Limit</strong>, specify the size of the buffer that Telegraf uses to queue data.<br/><br/> If your environment sends bursty data, use a larger buffer.</li>
   <li>For <strong>Flush Interval (seconds)</strong>, specify how often data are flushed from each output plugin to the Wavefront proxy.<br/><br/> Must be lower than the scrape interval.</li>
   <li>For <strong>Foundation Name</strong>, specify a unique name for your Tanzu Application Service environment. <br/><br/>This name will be added to all metrics as the metrics source (source=). </li>
   <li>(Optional) Under <strong>Advanced Options</strong>, click <strong>Yes</strong> to specify a custom proxy URL, custom proxy port, and additional Telegraf inputs.
   <br/><br/>Select to use advanced options, if you are an advanced user and want to configure an additional Telegraf VM for scraping additional metric endpoints that are not covered by the original Telegraf tile.
   <ol><li>Enter the custom proxy URL and port number.
   </li>
   <li>In the <strong>Additional Telegraf VM Inputs</strong> text field, enter the inputs that you use to scrape data from different data sources.
   <br/><br/> The formatting in this field follows normal Telegraf TOML syntax.</li>
   <li>Update the following additional Telgraf VM options per your needs:
    <ul><li>The scrape interval (in seconds)</li>
    <li>The metric buffer limit (in points)</li>
    <li>The flush interval (in seconds).</li>
    </ul>
    </li>
   <li>Select the <strong>Additional Telegraf VM Convert Paths</strong> check box to set convert paths.
   <br/><br/>
   Convert paths is used on metrics to replace all underscores with the metric separator that you specify.
   </li>
   <li>In the <strong>Additional Telegraf VM Metric Separator</strong> text field, enter the characters that you use as the separators when converting metric path names.
   <br/><br/>This can be a single character or a set of characters.
   </li>
   </ol>
   
   </li>
   <li>Click <strong>Save</strong>.
   
   </li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tas_to_3.png" alt="Telegraf Agent Config screenshot, with values till Foundation name text field, as discussed in text above.">
   <br/><br/>
   <img src="/images/tas-additional-telegraf-settings.png" alt="Telegraf Agent Config screenshot, with the Advanced options set to on.">
   </td>
   
   </tr>
   <tr>
   <td width="50%"><strong>Step 4.</strong> Click <strong>Metrics Exporters</strong> to customize metrics export from Tanzu Application Service.
   <ol>
   <li>Select <strong>Skip TLS Verification When Querying</strong> if you want to turn off TLS verification, for example, during testing or a POC. </li>
   <li>Select a <strong>BOSH Health Check Availability Zone</strong> if you don't want to use the default zone. </li>
   <li>Optionally, select the <strong>BOSH Health Check Payload VM Type</strong> and change the default. <br/><br/>
   In almost all cases users don't change this field. </li>
   <li>To collect metrics of all the apps bound to a service instance, select the <strong>Retrieve Service Binding Metrics</strong> check box. <br/><br/> This way you can, for example, find the Redis instance or MySQL database that is bound to a particular app. If you turn this setting on, you might experience performance issues, because the information is retrieved by making API calls to the CAPI component within Tanzu Application Service. In some environments that might add too much load on the CAPI servers.</li>
   <li>Click <strong>Save</strong>.</li>
   </ol>
   </td>
   <td width="50%"><img src="/images/tas_to_4.png" alt="Metric Exporter screenshot, with values as discussed in text to the left."></td>
   </tr>
   <tr>
   <td width="50%"><strong>(Optional) Step 5. Errands</strong> are scripts that can run at the beginning and at the end of an installed product’s availability time. Most users don't make changes to Errands for this nozzle.
   </td>
   <td width="50%"><img src="/images/tas_to_5.png" alt="Errands is selected, and defaults are show. "></td>
   </tr>
   <tr>
   <td width="50%"><strong>(Optional) Step 6.</strong> Click <strong>Resource Config</strong> to review the VM sizing for the deployment. 
   <br/><br/>
   You can choose smaller than default VMs to save money on small and noncritical foundations, and very large VMs with lots of CPU and MEM to scale for large foundations with high volumes of metrics.
   <br/><br/>
   If, in Step 3, you have selected to use an additional Telegraf VM, set <strong>Additional Telegraf Agent</strong> option to <strong>Automatic:1</strong>.
   <br/><br/>
   <strong>Note: SM Forwarder</strong> is set to <strong>Automatic:0</strong>. Do not change this setting.
   </td>
   <td width="50%"><img src="/images/tas_to_6.png" alt="Resource Config is selected and defaults of first 4 items are shown"></td>
   </tr>
</tbody>
</table>

{% include important.html content="As a final step, you must deploy the nozzle to get data flowing. Deployment usually takes about 30 minutes. The nozzle tile turns from orange to green when deployment is successful. "%}

### Step 3: Check That Metrics are Flowing and Examine Your Data

Log in to your Wavefront instance (for example, `https://example.wavefront.com`) and confirm that metrics are flowing:
1. Click **Integrations** in the toolbar, search for Tanzu Application Service, and select the integration.
2. Click the **Metrics** tab and confirm metrics are flowing.

### Step 4: Use  Dashboard to Examine Your Data

1. With the integration selected, click the **Dashboards** tab.
2. Select from the set of predefined dashboards, which are modeled on the corresponding Healthwatch dashboards but have additional options. For example, you can examine multiple foundations from one dashboard.
3. Explore one or two dashboards. [Examine Data with Dashboards and Charts](ui_examine_data.html) has an overview and includes a video.
4. As appropriate, clone any of the existing dashboards to add charts, modify queries, and more. See [Create, Customize, and Optimize Dashboards](ui_dashboards.html) and [Create and Customize Charts](ui_charts.html).

### Optional 1: Use the service broker to send custom application metrics to the wavefront proxy

1. In Ops Manager, in the "Wavefront Proxy Config" panel,
   check the "Enable service broker bindings" checkbox.
2. To provision a wavefront-proxy service instance:
   `cf create-service wavefront-proxy standard SERVICE_INSTANCE_NAME`.
3. To bind apps to the service instance: `cf bind-service APP_NAME SERVICE_INSTANCE_NAME`.
   If you already have an existing app and want to update its service instance reference from the v3 broker, first unbind it with this command:
   `cf unbind-service APP_NAME SERVICE_INSTANCE_NAME`.

Notes:
1. For information about how apps can send metrics to the Wavefront proxy, see the [cloud-foundry-sampleapp](https://github.com/wavefrontHQ/cloud-foundry-sampleapp).

### Optional 2: Connect multiple proxy instances to an IAAS load balancer

#### Set up the load balancer in your IAAS
An in depth guide on configuring load balancers in different IAASes is beyond the scope of this document.
You can see a detailed example across two sections of the TAS for VMs documentation:
1. Initial setup of load balancers is required in
   [AWS](https://docs.pivotal.io/ops-manager/3-0/aws/prepare-env-manual.html) and
   [GCP](https://docs.pivotal.io/ops-manager/3-0/gcp/prepare-env-manual.html#loadbalancer),
   but not for Azure.
2. After initial setup,
   [this](https://docs.pivotal.io/application-service/3-0/operating/configure-lb.html)
   document can be referenced for finalizing the load balancers in all IAAS.

You will want to adjust the naming in these docs to suit a wavefront proxy.
The portions of these docs that detail interactions with Ops Manager can be ignored,
since we will talk about that in the next section.
For GCP, record the backend service name of your load balancer,
for AWS, you will want the actual Elastic Load Balancer name,
and for Azure, you will want the Azure Load Balancer name.

#### Configure the tile to use the load balancer
Enter the `Resource Configuration` tab for that tas2to tile in your Opsman config.
Click on `Wavefront Proxy Configuration` in the left column.
Enter `http:${load_balancer_name}`,
using the load balancer or backend service name from the initial setup.
Finally, run an `Apply Changes` on the tile.


## Learn More!

* All users can learn about [examining your data](ui_examine_data.html).
* Users with Dashboards permission can clone any dashboard and [customize the dashboard](ui_dashboards.html) and the charts.
* Go to the [Tanzu Observability VMware TV channel](https://vmwaretv.vmware.com/channel/Tanzu%2BObservability/252649793) for playlists of videos that include Getting Started, How to Use Dashboards and Charts, How to Use Alerts, and more!
