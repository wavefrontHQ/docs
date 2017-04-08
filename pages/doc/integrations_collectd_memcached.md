---
title: memcached Collectd Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_collectd_memcached.html
summary: Learn how to send memcached data collected by collectd to Wavefront.
---

[memcached](https://memcached.org/) is a popular memory object cache system. See [Collectd memcached plugin documentation] (https://collectd.org/wiki/index.php/Plugin:memcached).


## Installation

1. On your collectd host, copy the config below into `/etc/collectd/managed_config/`.
1. Edit the settings in the file for your memcached server.
1. Restart collectd.

## Example collectd Configuration

```conf
<Plugin "memcached">
  Host "127.0.0.1"
  Port "11211"
</Plugin>  
```

{% include links.html %}
