---
title: Redis Collectd Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_collectd_redis.html
summary: Learn how to send Redis data collected by collectd to Wavefront.
---

[Redis](https://redis.io/) is an in-memory data structure store, often used as a database, cache and message broker. We recommend the Collectd Redis Python plugin. See [Collectd Redis plugin documentation] (https://github.com/powdahound/redis-collectd-plugin). There are 2 types of Redis nodes that can be monitored with Collectd: Masters and Slaves.



## Installation

1. To monitor a Redis master node, on your Collectd host, copy the [example configuration](https://github.com/wavefrontHQ/install/blob/master/managed_config/10-redis_master.conf) into `/etc/collectd/managed_config/`.
1. To monitor a Redis slave node, on your Collectd host, copy the [example configuration](https://github.com/wavefrontHQ/install/blob/master/managed_config/10-redis_slave.conf) into `/etc/collectd/managed_config/`.
1. Edit the settings in the file for your Redis servers.
1. Restart collectd.


{% include links.html %}
