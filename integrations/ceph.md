---
title: Ceph Integration
tags: [integrations list]
permalink: ceph.html
summary: Learn about the Wavefront Ceph Integration.
---
## Ceph Integration

Ceph is a software-defined storage platform that unifies the storage of block, object, and file data into a distributed computer cluster. By setting up this integration, you can send Ceph metrics into Wavefront.

1. **Ceph**: This integration installs and configures Telegraf to send Ceph storage cluster metrics to Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).
2. **Ceph on Kubernetes**: This explains the configuration of Wavefront Collector for Kubernetes to scrape Ceph metrics using auto-discovery and annotation based discovery.

In addition to setting up the metrics flow, this integration also installs dashboards:
* Ceph
* Ceph on Kubernetes

Here's the Cluster Status section of a dashboard that displays Ceph storage cluster metrics.

{% include image.md src="images/Ceph_Dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Ceph Setup



### Step 1. Install the Telegraf Agent

This integration uses the Ceph input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure Ceph Input Plugin

Create a file called `ceph.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
# Collects performance metrics from the MON and OSD nodes in a Ceph storage cluster.
[[inputs.ceph]]
  ## This is the recommended interval to poll.  Too frequent and you will lose
  ## data points due to timeouts during rebalancing and recovery
  interval = '1m'

  ## All configuration values are optional, defaults are shown below

  ## location of ceph binary
  ceph_binary = "/usr/bin/ceph"

  ## directory in which to look for socket files
  socket_dir = "/var/run/ceph"

  ## prefix of MON and OSD socket files, used to determine socket type
  mon_prefix = "ceph-mon"
  osd_prefix = "ceph-osd"

  ## suffix used to identify socket files
  socket_suffix = "asok"

  ## Ceph user to authenticate as. Ceph will search for the corresponding keyring
  ## e.g. client.admin.keyring in /etc/ceph. If you specify an explicit path, in the
  ## client section of ceph.conf Ceph searches for the keyring there, for example:
  ##
  ##     [client.telegraf]
  ##         keyring = /etc/ceph/client.telegraf.keyring
  ##
  ## See the Ceph documentation for details on keyring generation.
  ceph_user = "client.admin"

  ## Ceph configuration to use to locate the cluster
  ceph_config = "/etc/ceph/ceph.conf"

  ## Whether to gather statistics via the admin socket
  gather_admin_socket_stats = true

  ## Whether to gather statistics via ceph commands, requires ceph_user and ceph_config
  ## to be specified
  gather_cluster_stats = true

```
{% endraw %}
See the [Telegraf documentation](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/ceph) for more details on input plugin configuration.
For details on Ceph configuration, see the [Ceph documentation](http://docs.ceph.com/docs/kraken/rados/configuration).

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.

## Ceph on Kubernetes

This integration uses the [annotation based discovery](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/discovery.md#annotation-based-discovery) feature in the Wavefront Collector to monitor Ceph on Kubernetes. If you do not have the Wavefront Collector for Kubernetes installed, follow these instructions to add it to your cluster by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or performing [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install). You can check the status of Wavefront Collector and Proxy if you are already monitoring the Kubernetes cluster on the `Setup` tab of the Kubernetes integration.

We support deployment of Ceph cluster using Rook only. If Ceph is deployed with Rook, then Prometheus is already enabled and the pod is annotated. Prometheus will gather the metrics automatically.


