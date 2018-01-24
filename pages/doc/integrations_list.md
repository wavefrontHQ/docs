---
title: List of Wavefront Integrations
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_list.html
summary: Explore the complete list of Wavefront integrations.
---

One way of getting your data into Wavefront is taking advantage of a Wavefront integrations. This page lists all available integrations -- but Wavefront doesn't limit you to pre-packaged integrations. You can also get your data into Wavefront by:
* Using an existing Telegraf plugin
* Converting existing metrics to one of the [supported data formats](/proxies.html#supported-data-formats) and sending them to the Wavefront proxy.
* Instrumenting your application using one of the Wavefront SDKs
* And more!

The following list groups integrations by category.
## Alert Notification

* HipChat
* PagerDuty
* Slack
* VictorOps

Instead of using an integration, you can create an email, PagerDuty, or Webhook notification using the [Alert Targets](webhooks_alert_notification.html) mechanism.

## Application Instrumentation

* Filebeat log data
* Go
* Java
* StatsD

Instead of using an integration, you can directly instrument your application with the Wavefront API.

## Authentication
* ADFS
* Azure AD
* Google
* Okta
* OneLogin

## Cloud
* AWS
* Docker with cAdvisor
* Google Cloud Platform
* Kubernetes
* Pivotal Cloud Foundry

## Datastore
* MySQL
* PostgresQL
* Redis
* Riak KV store

## DevOps Tools
* Ansible
* Apache Zookeeper
* Consul
* Puppet Server
* Terraform Provider

## Operating System
* Linux Host
  * AWS Linux
  * CentOS
  * Debian
  * Redhat Enterprise Linux
  * Ubuntu Host
* Mac Host
* Windows Host
* Windows Service
* Windows Performance Counter

## Messaging
* Cernan
* Kafka
* RabbitMQ

## Monitoring
* collectd
* Graphite
* Log data
* Logstack data
* OpenTSB
* Prometheus
* Splunk
* Telegraf
* Zabbix

## Other
* Elasticsearch
* Memcached
* Tesla

## Web
* Apache HTTP
* Apache Tomcat
* HAProxy
* JBoss AS
* Microsoft IIS
* NGINX
* Oracle Weblogic Server
* tcServer
* Wildfly
