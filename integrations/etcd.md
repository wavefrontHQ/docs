---
title: etcd KV store Integration
tags: [integrations list]
permalink: etcd.html
summary: Learn about the etcd KV store Integration.
---
## etcd KV Store Integration

etcd is a consistent, distributed key-value store that provides a reliable way to store data that needs to be accessed by a distributed system or cluster of machines.

1. **etcd**: This explains the installation and configuration of Telegraf to send etcd KV Store performance metrics to Wavefront. Telegraf is a light-weight server process that can collect, process, aggregate and send metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

2. **etcd on Kubernetes**: This explains the configuration of Wavefront Collector for Kubernetes to scrape etcd metrics using auto-discovery.

In addition to setting up the metrics flow, this integration also installs dashboards:
* etcd
* etcd on Kubernetes

Here's the screenshot of etcd on Kubernetes dashboard displaying etcd metrics:

{% include image.md src="images/etcd-sample-dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## etcd Distributed Database Setup



This integration uses the Prometheus Telegraf input plugin.


### Step 1. Install the Telegraf Agent

Follow the steps below to install the Telegraf agent and optionally the Wavefront proxy. The Telegraf agent can be installed on a node where etcd is running or on a node that has access to the metrics endpoint of etcd. If you've already installed the agent and proxy, you can skip to Step 2.
Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure the Prometheus Input Plugin

Create a file called `etcd.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.prometheus]]
  urls = ["http://<Host-IP>:2379/metrics"]
```
{% endraw %}
Configure global tags in the `telegraf.conf` file to group etcd nodes into clusters, as in the following snippet:
{% raw %}
```
[global_tags]
  #Setting environment tags like prod, dev, perf, and test
  env = "prod"
```
{% endraw %}

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.

## etcd on Kubernetes

**Note**: These instructions are for monitoring Bitnami etcd.

**Prerequisite**:

Make sure that Bitnami etcd with `bitnami/etcd` is deployed on your cluster.

You can use the following command to deploy Bitnami etcd:{% raw %}
```
helm repo add bitnami https://charts.bitnami.com/bitnami

helm install <etcd-clustername> bitnami/etcd --set metrics.enabled=true --namespace <namespace>
```
{% endraw %}

Note: Few peers related metrics charts will show no data until etcd is deployed as a cluster.

### Configure the Wavefront Collector for Kubernetes

You can configure the Wavefront Collector for Kubernetes to scrape etcd metrics by using annotation based discovery.

If you do not have the Wavefront Collector for Kubernetes installed on your Kubernetes cluster, follow these instructions to add it to your cluster by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or performing [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install).You can check the status of Wavefront Collector and Proxy if you are already monitoring the Kubernetes cluster on the Setup tab of the Kubernetes integration.




