---
title: VMware GemFire® Integration
tags: [integrations list]
permalink: gemfire.html
summary: Learn about the VMware GemFire® Integration.
---

This page provides an overview of what you can do with the VMware GemFire® integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the VMware GemFire® integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **VMware GemFire®** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.


## VMware GemFire Integration

The VMware GemFire integration allows you to monitor many GemFire clusters running in Kubernetes, as well as GemFire clusters running in a user-provided infrastructure.

1. **VMware GemFire for Kubernetes**

If you already have the Wavefront proxy and the Kubernetes Metrics Collector installed in your Kubernetes cluster, you will see the GemFire for Kubernetes metrics flowing into Operations for Applications. Otherwise, use the setup instructions.

2. **VMware GemFire (Standalone)**

To scrape GemFire metrics and send them to Operations for Applications, you must set up some user-managed applications.

3. **VMware GemFire for Tanzu Application Service**

To emit GemFire metrics to Operations for Applications, you must make sure that the Tanzu Observability by Wavefront nozzle is installed on the same Tanzu Application Service foundation.

## Sample Dashboards

In addition to setting up the metrics flow, this integration also installs dashboards. Here's the screenshot of our GemFire Developer dashboard.

{% include image.md src="images/gemfire-dashboard.png" width="80" %}




<h2>Alerts</h2>  <ul><li markdown="span"><b>GemFire for Kubernetes: Low Server Count</b>:Indicates if the current count of servers in the cluster does not match the expected count of servers. The expected count of servers might vary per Tanzu GemFire cluster. In such a case, you can clone and customize this alert for each cluster.</li><li markdown="span"><b>GemFire for Kubernetes: Low Locator Count</b>:Indicates if the current count of locators in the cluster does not match the expected count of locators. The expected count of locators might vary per Tanzu GemFire cluster. In such a case, you can clone and customize this alert for each cluster.</li><li markdown="span"><b>GemFire for Kubernetes: High CPU Utilization</b>:The percentage of CPU used by a cluster member.</li><li markdown="span"><b>GemFire for Kubernetes: High Disk Utilization</b>:The percentage of disk space used by a cluster member.</li><li markdown="span"><b>GemFire Standalone: Low Server Count</b>:Indicates if the current count of servers in the cluster does not match the expected count of servers. The expected count of servers might vary per Tanzu GemFire cluster. In such a case, you can clone and customize this alert for each cluster.</li><li markdown="span"><b>GemFire Standalone: Low Locator Count</b>:Indicates if the current count of locators in the cluster does not match the expected count of locators. The expected count of locators might vary per Tanzu GemFire cluster. In such a case, you can clone and customize this alert for each cluster.</li><li markdown="span"><b>GemFire Standalone: High CPU Utilization</b>:The percentage of CPU used by a cluster member.</li><li markdown="span"><b>GemFire Standalone: High Disk Utilization</b>:The percentage of disk space used by a cluster member.</li><li markdown="span"><b>GemFire VMs: Low Server Count</b>:Indicates if the current count of servers in the cluster does not match the expected count of servers. The expected count of servers might vary per Tanzu GemFire cluster. In such a case, you can clone and customize this alert for each cluster.</li><li markdown="span"><b>GemFire VMs: Low Locator Count</b>:Indicates if the current count of locators in the cluster does not match the expected count of locators. The expected count of locators might vary per Tanzu GemFire cluster. In such a case, you can clone and customize this alert for each cluster.</li><li markdown="span"><b>GemFire VMs: High CPU Utilization</b>:The percentage of CPU used by a cluster member.</li><li markdown="span"><b>GemFire VMs: High Disk Utilization</b>:The percentage of disk space used by a cluster member.</li></ul>