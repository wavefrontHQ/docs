---
title: Managing Wavefront Proxies
keywords: Docker, containers, proxies
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_managing.html
summary: Learn how to manage Wavefront proxies.
---

{% include shared/permissions_view.html entity="proxies" entitymgmt="Proxy" %}

## Viewing Registered Proxies

You view registered proxies by selecting **Browse > Proxies**.  The Proxies page displays a filter bar and the list of deployed proxies. The list changes depending on what filters have been applied.  The list allows you to view the following information about registered proxies:

- **Hostname** - Hostname associated with the registered proxy. The hostname is configured during the deployment of a Wavefront proxy and resides in the `wavefront.conf` file located on the host the Wavefront proxy is running on. Under the name is an ID that you supply to Wavefront API operations on the proxy.
- **Name** - Set by Wavefront to `Proxy on <hostname>`.  You can edit the name to provide additional information to differentiate one proxy from another.
- **Last Check-in** - The last time the proxy checked in with Wavefront.
- **Status** - The status of the proxy: Active or Orphaned. An Active proxy has regularly checked in with Wavefront. An Orphaned proxy is one that has not checked in for up to 3 minutes.
- **Space Available** - The amount of disk space available to store metrics on the host that the Wavefront proxy is running on. A function of the available disk space in bytes and the estimated number of bytes current level of traffic will consume on disk (per second). Metrics are stored locally if the Wavefront proxy loses connectivity with Wavefront. If the proxy loses connectivity, as soon as the proxy reconnects to Wavefront the Queued Items count reflects the number of queued points.
- **Clock Drift** - The difference between the system time of the host that the Wavefront proxy is running on versus the system time of Wavefront.
- **Queued Items** - The number of points queued in the Wavefront proxy.
- **Version** - The [version](proxies_versions.html) of the Wavefront proxy.

You can click a bar chart icon <i class="fa-bar-chart fa" style="color: #337ab7;"/> in the Hostname, Space Available, and Queued Items columns to view a chart of the metrics. The icon looks like this: <clr-icon shape="bar-chart"></clr-icon>. You can view other proxy metrics in the [System Usage dashboard](wavefront_monitoring.html).

Follow the procedures in [Managing Proxy Services](proxies_installing.html#managing-proxy-services) to determine proxy service status.

## Adding Proxies

See [Installing and Running Wavefront Proxies](proxies_installing.html).

## Updating the Wavefront Instance

To update which Wavefront instance the proxy sends data to:

1. On the host on which the proxy is running, edit the [proxy configuration](proxies_configuring.html) file.
1. Change the `server` and `token` properties to point to the Wavefront instance you want to send data to.
1. If present, delete `<wavefront_config_path>/.wavefront_id`.
1. [Restart the Wavefront proxy](proxies_installing.html#restart). The proxy is added to the Wavefront instance and displays on the Proxies page.

## Editing and Deleting Proxies

To edit a proxy name, select the three dots to the left of the proxy and click **Edit**, modify the name, and click **Save**.
To delete a proxy, select the three dots to the left of the proxy and select **Delete**.
