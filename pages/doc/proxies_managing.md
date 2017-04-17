---
title: Managing Wavefront Proxies
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_managing.html
summary: Learn how to manage Wavefront proxies.
---
Wavefront proxies are deployed on a machine within your network and act as the intermediary between collector agents and Wavefront. Proxies are the preferred method for sending your data to Wavefront. A proxy accepts the following data formats:

- [Wavefront data format](wavefront_data_format)
- [Graphite data format (plaintext)](http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-plaintext-protocol) and [Graphite data format (pickle)](http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-pickle-protocol)
- [OpenTSDB data format (Telnet interface and HTTP API (JSON))](http://opentsdb.net/docs/build/html/user_guide/writing.html)
 
Before streaming data, we recommend that you understand [best practices for naming your data](wavefront_data_naming).
 
{% include shared/permissions_proxies.html %}

## Viewing Deployed Proxies

You view deployed proxies by selecting **Browse > Proxies**.  The Proxies page displays a filter bar and the list of deployed proxies. The list changes depending on what filters have been applied.  The list allows you to view the following information about registered proxies:

- **Hostname** - The hostname associated with the registered proxy. The hostname is configured during the deployment of a Wavefront proxy and resides in the wavefront.conf file located on the machine hosting the Wavefront proxy. Under the name is an ID that you supply to Wavefront API operations on the proxy.
- **Name** - Set by Wavefront to "Agent on \<hostname\>".  You can edit the name to provide additional information to differentiate one proxy from another.
- **Last Check-in** - The last time the proxy has checked in with Wavefront.
- **Status** - The status of the proxy: Active or Orphaned. An Active proxy has regularly checked in with Wavefront. An Orphaned proxy is one that has not checked in for up to 3 minutes.
- **Space Available** - The amount of disk space on the local machine that the Wavefront proxy is deployed on available to store metrics. Metrics are stored locally if the Wavefront proxy loses connectivity with Wavefront. If the proxy loses connectivity, as soon as the proxy reconnects to Wavefront the Queued Items count reflects the number of points queued.
- **Clock Drift** - The difference between the system time of the machine that the Wavefront proxy is deployed on versus the system time of Wavefront.
- **Queued Items** - The number of points queued in the Wavefront proxy.
- **Version** - The version of the Wavefront proxy.

You can click a bar chart icon <i class="fa-bar-chart fa" style="color: #337ab7;"/> in the Hostname, Space Available, and Queued Items columns to view a chart of relevant metrics.
 
## Adding Proxies
See [Installing Wavefront Proxies](proxies_installing).
 
## Updating the Wavefront Instance

To update which Wavefront instance the proxy sends data to:

1. On the host running the proxy, edit the `/etc/wavefront/wavefront-proxy/wavefront.conf` file.
1. Change the `server` and `token` properties to point to the Wavefront instance you want to send data to. 
1. [Restart the Wavefront proxy](#restart). The proxy is added to the Wavefront instance and displays on the Proxies page.
 
For other configuration options, see [Configuring Wavefront Proxies](proxies_configuring). 

## Editing and Deleting Proxies
To edit a proxy name, select  ![action_menu.png](images/action_menu.png#inline) **> Edit** to the right of the proxy, modify the name, and click Save.
To delete a proxy, select  ![action_menu.png](images/action_menu.png#inline) **> Delete** to the right of the proxy.

<a name="restart"></a>

## Starting and Stopping a Proxy
 
To start, stop, or restart a proxy, run the following commands on the host on which the proxy is running:

```shell
$ service wavefront-proxy [start | stop | restart]
```

## Checking Proxy Status
 
To check if the proxy is running, run the following command:

```shell
$ service wavefront-proxy status
```

In your Wavefront instance, select **Browse > Proxies** and verify that the proxy is listed there using the hostname set in the proxy configuration file.
 
You can view `/var/log/wavefront/wavefront.log` to see how many points it has sent and whether there are any connection issues. You can also view proxy metrics within Wavefront.


