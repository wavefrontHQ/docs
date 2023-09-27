---
title: Tanzu Observability and TAS Troubleshooting
keywords: best practices
tags:
sidebar: doc_sidebar
permalink: tas_to_troubleshooting.html
summary: Solve problems with the Tanzu Observability tile and the TAS integration.
---

This doc page looks at possible causes for problems you might encounter with your Tanzu Application Service (TAS) to Tanzu Observability integration and explains how to address them.


## Sizing and Scaling for Large TAS Foundations

Larger TAS foundations are more demanding to monitor than smaller foundations.
* If more application instances are running on a foundation, then more container-level metrics have to be collected and forwarded to Tanzu Observability.
* If more virtual machines are in a foundation, then more VM-level metrics are reported.

If your foundation is large, tune the following parameters, in this order:
1. Increase the size of your **Telegraf Agent Virtual Machine**. The Telegraf agent is responsible for collecting metrics and transforming them into the Wavefront data format. The is typically CPU and memory bound, so increasing virtual machine size can increase performance.
2. **Increase the scrape interval**. If collection times for some scrape targets are greater than 12 seconds, consider changing the scrape interval for your environment to a lower frequency. Typically, 120% of the longest observed collection time is safe.

## Using the Nozzle Successfully with Service Broker Bindings

Support for service broker bindings differ for different versions of the Tanzu Observability by Wavefront Nozzle:
* The Tanzu Observability by Wavefront <strong>Nozzle v4.1.1</strong> supports Service Broker Bindings.
  When you configure Nozzle 4.1.1, select <strong>Enable legacy service broker bindings</strong> on the <strong>Wavefront Proxy Config</strong> tab. See [Install Nozzle 4.1.1 and Enable Service Broker Bindings](#install-nozzle-411-and-enable-service-broker-bindings).
* The Tanzu Observability by Wavefront <strong>Nozzle v4.1.0</strong> DOES NOT support Service Broker Bindings. If you upgraded to nozzle 4.1.0, you have to:
  1. Downgrade from Tanzu Observability by Wavefront Nozzle v4.1.0 to Tanzu Observability by Wavefront Nozzle v3.
  1. Upgrade from Tanzu Observability by Wavefront Nozzle v3 to Tanzu Observability by Wavefront Nozzle v4.1.1. That version of the nozzle includes a checkbox that supports retaining Service Broker Bindings.
  The process is discussed in this section.

### Downgrade from Nozzle 4.1.0 to Nozzle 3.0

This section explains how to downgrade. For clarity, the section uses explicit version numbers.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%"><strong>Step 1.</strong> Uninstall v4 of the Tanzu Observability by Wavefront Nozzle.
<ol><li>Log in to Ops Manager.</li>
<li>In the installation dashboard, find the Tanzu Observability tile and click the delete icon to stage the deletion. </li>
<li>Click <strong>Review Pending Changes</strong> and uncheck boxes for any products that you don't want redeployed.</li>
<li>Click <strong>Apply Changes</strong> to complete the deletion process. </li>
</ol>
</td>
<td width="50%"><img src="/images/tas_install_dashboard.png" alt="Ops Manager installation dashboard shows 3 tiles, trash can highlighted."></td>
</tr>
<tr>
<td width="50%"><strong>Step 2.</strong> In the bottom left of the Ops Manager installation dashboard, click <strong>Delete all unused products</strong> and confirm. <br>
<br><br>
<strong>Note:</strong> If you don't delete all unused products, the import of the v3 nozzle might fail later with an error like the following: <code>"Metadata already exists for name: wavefront-nozzle and version: 3.0.5"</code>.
</td>
<td width="50%"><img src="/images/tas_delete_unused_products.png" alt="Zoom in on Delete Unused Products, with arrow pointing to trash icon."></td>
</tr>
<tr>
<td width="50%"><strong>Step 3.</strong> Download v3 of the Tanzu Observability by Wavefront Nozzle.
<ol><li>Log in to Tanzu Network and go to <a href="https://network.pivotal.io/products/wavefront-nozzle">https://network.pivotal.io/products/wavefront-nozzle</a>.</li>
<li>Select v3 of the nozzle and download it. </li>
</ol>
<br>
<strong>Step 4.</strong> Import and install v3 of the nozzle.
<ol>
<li>In the Ops Manager Installation Dashboard, click <strong>Import a Product</strong>. </li>
<li>Select the v3 nozzle that you just downloaded.  </li>
</ol>
</td>
<td width="50%">&nbsp;</td>
</tr>
<tr>
<td width="50%">
<strong>Step 5.</strong> Configure and deploy the v3 nozzle:
<ol>
<li>Follow the configuration steps in <a href="integrations_tas_howto.html#step-2-ops-manager-install-configure-and-deploy-the-nozzle">Ops Manager: Install, Configure, and Deploy the Nozzle</a></li>
<li>To deploy the nozzle, click <strong>Review Pending Changes</strong> and uncheck boxes for products that don't need to be redeployed. Click <strong>Apply Changes</strong> to complete the process.</li>
<li>When installation is complete, click <strong>Change Log</strong> and verify that the older version shows <strong>Added</strong>.</li>
</ol>
</td>
<td width="50%"><img src="/images/tas_change_log.png" alt="Change log, arrow points to Added text in third column."></td>
</tr>
</tbody>
</table>

### Install Nozzle 4.1.1 and Enable Service Broker Bindings

You enable service broker bindings as part of the <strong>Wavefront Proxy Config</strong> step of nozzle configuration.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">To enable service broker bindings:
<ol>
<li>
Follow the installation steps in <a href="integrations_tas_howto.html#step-2-ops-manager-install-configure-and-deploy-the-nozzle">Ops Manager: Install, Configure, and Deploy the Nozzle</a>.</li>
<li>On the <strong>Wavefront Proxy Config</strong> tab, select the <strong>Enable legacy service broker bindings</strong> check box. </li>
</ol>
</td>
<td width="50%"><img src="/images/enable_legacy_bindings.png" alt="Proxy Config tab, with arrow pointing to Enable Service Broker Legacy Bindings check box"></td>
</tr>
</tbody>
</table>


## Symptom: No Data Flowing In and Certificate Error

No data is flowing in from one or more of your foundations. When you check the proxy log, you see an error similar to:

```
2022-06-05T08:17:37Z E! [outputs.wavefront::wavefront-pipeline-2] wavefront flushing error: error reporting wavefront format data to Wavefront: "Post \https://wavefront-proxy.service.internal:4443/report?f=wavefront\: x509: certificate signed by unknown authority"
```

**Cause**

This error results if the TLS connection between the Telegraf VM and the Proxy VM fails because the Tanzu Ops Manager root CA was not included during setup.

**Solution**

Include the root CA by clicking the check box. The following screenshot shows a BOSH Director for GCP setup with **Include Tanzu Ops Manager Root CA in Trusted Certs** checked.

![Screenshot of Security tab shows Include Tanzu Ops Manager Root CA in Trusted Certs ](images/tas_include_root_ca.png)

## Symptom: No Data Flowing or Dashboards Show No Data

You have successfully set up the nozzle and the integration. However, you don't see any data on the out-of-the-box dashboards. The most common cause is a problem with sending data to Tanzu Observability.

**Potential Solutions**:


* Ensure that the installation of the Wavefront Nozzle in has completed.
* Verify that the proxy uses the correct authentication credentials and Operations for Applications instance URL. You specify that information in Ops Manager in the **Proxy Config** page.
* In your Tanzu Application Service environment, verify that the BOSH jobs for Wavefront proxy and for the Telegraf agent are running.
  * In the BOSH CLI, use the `bosh deps` command to identify your wavefront-nozzle deployment, then tail the logs using `bosh ssh`.

    ```bash
    % bosh deps

    % bosh ssh -d wavefront-nozzle-d62c653f58184da09b1d telegraf_agent
    % sudo -i
    % bpm logs -fa telegraf_agent
    ```
  * If you see errors in the output here, this may help pinpoint a specific issue in the environment. Otherwise, contact support.

  * If there are no errors in Telegraf, the next step is to check the logs for the wavefront_proxy:

    ```bash
    % bosh ssh -d wavefront-nozzle-d62c653f58184da09b1d wavefront_proxy
    % sudo -i
    % bpm logs -fa wavefront_proxy
    ```

* Verify that data is flowing from the Wavefront proxy to your Wavefront instance. See [Proxy Troubleshooting](proxies_troubleshooting.html).


## Symptom: Higher than Expected PPS Rate

The PPS (points-per-second) rate can affect performance and potentially the cost of using Tanzu Observability.
* **4.x**: The PPS generated by the Tanzu Observability by Wavefront Nozzle version 4.x should be predictable and relatively consistent for any given foundation, because metrics are scraped at a fixed interval.
* **3.x**: Version 3.x of the Nozzle follows a push-based model. PPS varies based on factors such as HTTP requests being served by the Gorouter, so PPS is less predictable.

However, it can be difficult to predict the average PPS of a TAS foundation ahead of time because several factors affect the total number of metrics that are generated:

* The TAS version.
* The size of the foundation.
* Other TAS components running on the foundation.

PPS might increase or decrease when individual TAS components are installed, upgraded or removed. Each individual component contributes its own metrics.

**Solution**:

* Increase the Telegraf agent scrape interval. Metrics will be collected less frequently, and average PPS decreases.

Future releases will allow more targeted approaches to reducing PPS, for example, by filtering out unwanted metrics.


## Symptom: Incomplete Data in Tanzu Observability

Data from your TAS foundation are visible in Tanzu Observability dashboards and charts, but seem incomplete.

**Potential Cause**:

Incomplete data is most likely caused by one or more components failing to keep up with the volume of metrics that are generated by the TAS. Typically this happens when the gauge exporter emits large numbers of metrics, and the Telegraf agent is not able to ingest these metrics and to forward them to the Wavefront proxy before the next collection cycle begins. Errors might result and metrics are  dropped as the Telegraf agent tries to catch up.

**Investigation**:

Here are some things you can do.
* Look for errors in bpm logs on the Telegraf agent or in the Wavefront proxy logs. See [Proxy Troubleshooting](proxies_troubleshooting.html) and [Telegraf Troubleshooting](telegraf_details.html) for details.
* Look for collection errors from Telegraf (`tas.observability.telegraf.internal_gather.errors`).
* Look for long collection times from Telegraf (`tas.observability.telegraf.internal_gather.gather_time_ns`).

**Potential Solutions**:

In the Ops Manager tile:

* Increase the size of the Telegraf Agent Virtual Machine.
* Increase the Telegraf scrape interval.

## Symptom: Unexpected App in the Healthwatch Space

When you upgrade from version 4.x to 4.2.0, a cleanup job can sometimes fail and leave an unused app and route.

To check for this situation, log in to your `cf` environment, and try these commands:

```shell
cf target -o system -s healthwatch2
cf apps
cf routes
```

If you see an app called `tas2to-sli-test-app` in the results of `cf apps` or a route matching that name in the `cf routes` results, you should clean them up.

* To delete the app, run the command:
  ```
  cf delete tas2to-sli-test-app
  ```
* To delete the route, run the command:

  ```
  cf delete-route example.com --hostname tas2to-sli-test-app
  ```

## Symptom: The Percentage in the Application CPU % Chart Is Too High

The **Application CPU %** chart in the **TAS: Workload Monitoring** dashboard lists the application instances ranked by the highest utilization of their CPU entitlement. Sometimes, the **Application CPU %** chart might show high CPU usage percentage - more than 100%, for some of the applications. You can expect more than 100% if the Diego Cell has spare CPU capacity, and the container is trying to use more than it is entitled.

If the host has spare CPU, it doesn’t throttle the CPU usage. But, if the host has more demand on its CPU, it will try to throttle all the containers fairly based on their entitlement.

Usage of more than 100% also indicates that if the cell were to be fully CPU utilized, then that application would be waiting on requested CPU time because it would not be able to get that CPU time from other running containers. Theoretically, that can degrade the performance of the application.

The solution is to scale up the Diego Cells, either horizontally or vertically and add CPU processing power. But, if the application is functioning fine, then that indicates you have sufficient free CPU capacity on the cells and you do not need to do anything.

## Symptom: The Percentage in the CPU Usage Chart Is Too High

The **CPU Usage** chart in the **TAS: BOSH Director Health** dashboard, might show CPU usage higher than 100%. This is because when using multi-core processors in CPU instrumentation, the usage maximum is the number of cores multiplied by 100. 

Because modern computers have multiple cores, where previously they were predominantly single-core processors, CPU instrumentation can show CPU utilization greater than 100%. 

In Tanzu Application Service, if there are three cores on the Diego Cell to which your app is deployed, 300% CPU can be distributed between all the apps on the Diego Cell. Because 150% could be the total value for some containers, 99% would be a fully saturated CPU for others.

These metrics depend on various factors, such as the capacity of the Diego Cell and the total number of apps on the Diego Cell that are might not visible to the user.

To understand the CPU Maximums, you can use the formula: `$NUM_CORES * 100%`.