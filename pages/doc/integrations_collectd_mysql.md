---
title: MySQL collectd Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_collectd_mysql.html
summary: Learn how to send MySQL data collected by collectd to Tanzu Observability by Wavefront.
---

[MySQL](https://www.mysql.com/) is a popular open-source relational database. See [collectd MySQL plugin documentation](https://collectd.org/wiki/index.php/Plugin:MySQL).

Tanzu Observability by Wavefront supports a built-in integration that gets data from MySQL using Telegraf. If you want to use collectd instead, follow the instructions on this page.


## Installation

1. On your collectd host, copy the config below into `/etc/collectd/managed_config/`.
1. Edit the settings in the file for your MySQL database.
1. Restart collectd.

## Example collectd Configuration

```conf
LoadPlugin mysql
<Plugin mysql>
  <Database test>
  Host "localhost"
  Socket "/var/run/mysqld/mysqld.sock"
  User "root"
  Password "abcdABCD1."
  Database "lamptest"
  </Database>
</Plugin>
```

## Example Configuration for Connecting to Remote MySQL Hosts

```conf
LoadPlugin "mysql"
<Plugin "mysql">
  <Database "foo">
  Host "hostname"
  User "username"
  Password "password"
  Port 3306
  MasterStats true
  </Database>
</Plugin>
```
