---
title: MySQL Collectd Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_collectd_mysql.html
summary: Learn how to send MySQL data collected by collectd to Wavefront.
---

[MySQL](https://www.mysql.com/) is a popular open source relational database. See [Collectd MySQL plugin documentation](https://collectd.org/wiki/index.php/Plugin:MySQL).


## Installation

1. On your collectd host, copy the config below into `/etc/collectd/managed_config/`.
1. Edit the settings in the file for your MySQL database.
1. Restart collectd.

## Example collectd Configuration
```
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
```
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
{% include links.html %}
