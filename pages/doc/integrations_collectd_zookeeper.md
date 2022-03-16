---
title: ZooKeeper collectd Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_collectd_zookeeper.html
summary: Learn how to send ZooKeeper data collected by collectd to Tanzu Observability by Wavefront.
---

[Apache ZooKeeper](https://zookeeper.apache.org/) is a popular service for maintaining configuration and coordinating distributed systems. ZooKeeper is used by technologies like Hadoop and Apache Solr to coordinate clusters and help them run reliably. Tanzu Observability by Wavefront supports a built-in integration that gets data from ZooKeeper using Telegraf. If you want to use collectd instead, follow the instructions on this page. 

The collectd ZooKeeper plugin documentation can be found at [collectd.conf(5) – collectd – The system statistics collection daemon](https://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_zookeeper).


## Installation

1. On your collectd host, copy the config below into `/etc/collectd/managed_config/`.
1. Edit the settings in the file for your ZooKeeper servers.
1. Restart collectd.

## Example collectd Configuration

```conf
LoadPlugin "zookeeper"
 <Plugin "zookeeper">
  Host "127.0.0.1"
  Port "2181"
 </Plugin>
```
