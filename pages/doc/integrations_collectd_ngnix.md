---
title: NGiNX collectd Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_collectd_nginx.html
summary: Learn how to send NGiNX data collected by collectd to VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications).
---

[NGiNX](https://www.nginx.com/) is a popular web and proxy server. To collect NGiNX data with collectd, use the collectd NGiNX plugin documentation found at [Plugin:NGiNX - collectd Wiki](https://collectd.org/wiki/index.php/Plugin:nginx).

Tanzu Observability supports a built-in integration that gets data from NGiNX using Telegraf. If you want to use collectd instead, follow the instructions on this page. 

## NGiNX Setup

Enable the `stub_status` module in your NGiNX configuration, for example:

```nginx
location /nginx_status {
 stub_status on;
 access_log off;
 allow 127.0.0.1;
 deny all;
}
```

## Installation

1. On your collectd host, copy the config below into `/etc/collectd/managed_config/`.
1. Edit the settings in the file for your NGiNX server.
1. Restart collectd.

## Example collectd Configuration

```conf
LoadPlugin nginx"
<Plugin "nginx">
  URL "http://localhost:80/nginx_status"
</Plugin>
```
