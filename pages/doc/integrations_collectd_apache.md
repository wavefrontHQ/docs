---
title: Apache collectd Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_collectd_apache.html
summary: Learn how to send Apache data collected by collectd to Tanzu Observability (formerly known as VMware Aria Operations for Applications).
---

[Apache](https://httpd.apache.org/) is a popular open-source web server. To collect Apache data with collectd, use the collectd Apache plugin documentation found at [Plugin:Apache - collectd Wiki](https://collectd.org/wiki/index.php/Plugin:Apache).

Tanzu Observability supports a built-in integration that gets data from Apache using Telegraf. If you want to use collectd instead, follow the instructions on this page. 

## Apache Setup

Enable the `mod_status` module in your Apache configuration:

```apache
ExtendedStatus on
<Location /mod_status>
  SetHandler server-status
</Location>
```

## Installation

1. On your collectd host, copy the [example configuration](https://github.com/wavefrontHQ/install/blob/release/managed_config/10-apache.conf) into `/etc/collectd/managed_config/`.
1. Edit the settings in the file for your Apache server.
1. Restart collectd.

## Example collectd Configuration

```conf
LoadPlugin "apache"
<Plugin "apache">
  <Instance "apache80">
  URL "http://localhost/mod_status?auto"
  User "collectd"
  Password "hoh2Coo6"
  </Instance>
  <Instance "lighttpd8080">
  URL "http://localhost:8080/mod_status?auto"
  </Instance>
</Plugin>
```
