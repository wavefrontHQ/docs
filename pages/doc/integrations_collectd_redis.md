---
title: Redis collectd Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_collectd_redis.html
summary: Learn how to send Redis data collected by collectd to VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront).
---

[Redis](https://redis.io/) is an in-memory data structure store, often used as a database, cache and message broker. VMware Aria Operations for Applications supports a built-in integration that gets data from Redis using Telegraf. If you want to use collectd instead, follow the instructions on this page. 

We recommend the collectd Redis Python plugin. See [collectd Redis plugin documentation](https://github.com/powdahound/redis-collectd-plugin). There are 2 types of Redis nodes that can be monitored with collectd: Masters and Slaves.



## Installation

1. To monitor a Redis master node, on your collectd host, copy the [example configuration](https://github.com/wavefrontHQ/install/blob/master/managed_config/10-redis_master.conf) into `/etc/collectd/managed_config/`.
1. To monitor a Redis slave node, on your collectd host, copy the [example configuration](https://github.com/wavefrontHQ/install/blob/master/managed_config/10-redis_slave.conf) into `/etc/collectd/managed_config/`.
1. Edit the settings in the file for your Redis servers.
1. Restart collectd.
