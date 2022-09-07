---
title: Integrations Release Notes
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_new_changed.html
summary: New and changed integrations.
---
Tanzu Observability continuously adds new integrations to the existing set, and improves available integrations. We update our [**complete list of all integrations**](https://docs.wavefront.com/label_integrations%20list.html) each time we add new integrations.

## September 2022

We made improvements to the following integrations in September 2022:

* vSphere -- Made fixes to the **Cluster** dashboard. Updated the cluster variable to all charts in the **Virtual Machine Operations for a Data Center - 1 Hour** section.
* Elasticsearch -- Made a fix to the query of the chart that displays the number of nodes, and updated the descriptions of charts.
* Microsoft SQL Server -- Added proxy preprocessor rules in the Microsoft SQL Server setup instructions to avoid database read/write metrics getting dropped because of an extra quote (“) in a few point-tag keys.
* Wavefront Usage -- Made minor updates to the Overview tab of the integration. The link to the Wavefront service internal metrics is corrected.
* Slack -- Updated the setup instructions and added information on how to troubleshoot the Slack URL Unfurler.
* Cassandra -- We updated the integration and now you can monitor Cassandra on Kubernetes.
* Tanzu Application Service -- We added three new dashboards for monitoring TAS services: 
  * MySQL -- Provides detailed metrics about TAS MySQL service instances.
  * RabbitMQ -- Provides detailed metrics about TAS RabbitMQ service instances.
  * Redis -- Provides detailed metrics about TAS Redis service instances.
* Terraform Provider:
  * Upgraded the Terraform-plugin-sdk/v2 from version 2.6.1 to version 2.21.0 because of security vulnerability fix.
  * Upgraded the `go` package from version 1.16 to version 1.17 because of security vulnerability fix.
  * We now use an email address instead of an id for the `wavefront_user` email field.

* Tesla -- We removed this integration and it is no longer available.

## August 2022

We added the following integration in August 2022:

* VMware Tanzu Greenplum: 
  
  VMware Tanzu Greenplum is a massively parallel processing (MPP) database server that supports next generation data warehousing and large-scale analytics processing. This integration installs and configures Telegraf to send system and query metrics into Tanzu Observability by Wavefront.

We made improvements to the following integrations in August 2022:

* Amazon Web Services -- We added a new **Amazon FSx** out-of-the-box integration dashboard, so now you can monitor the Amazon FSx service.
* Prometheus -- Made improvements to the setup instructions. 
* Google Cloud Platform -- We added a new **Google Dataproc** out-of-the-box integration dashboard, so now you can monitor the Google Dataproc service.
* Cassandra -- Made improvements to the Cassandra integration overview and setup instructions. Improved the Cassandra out-of-the-box integration dashboard. 
* Spring Cloud Data Flow -- Updated the latest document links on the Overview page.
* MySQL -- We provided descriptions of approximately 1000 metrics. You can see the metrics and their descriptions on the **Metrics** tab of the MySQL integration.
* Java: 
  * Added a new **Java Using Telegraf** out-of-the-box dashboard that allows you to collect and monitor JVM metrics by using the Telegraf Jolokia2 Agent plugin.
  * Added two system alerts that fire when the heap memory usage and the memory usage by the G1 old generation are too high.

## July 2022

We made improvements to the following integrations in July 2022:

* Tanzu Application Service
  - Support for use of v3 Wavefront Service Broker.
  - New **TAS: Nozzle Troubleshooting** dashboard helps you investigate problems with the Nozzle.
  - General security fixes.
  - Minor updates to the **TAS: Certification Expiration** and **TAS: Workload Monitoring** dashboards.
* Google Cloud Platform -- Added a **Google Cloud Bigtable** out-of-the-box dashboard which allows you to monitor the Google Cloud Bigtable service.
* Microsoft Azure -- Made fixes to the **Azure Cosmos DB** dashboard to avoid showing the NO DATA message on single-stat charts.
* Fluentd -- Improved the **Fluentd** dashboard and added two new sections to the dashboard: **Buffer** and **Fluentd Statistics**.
* Wavefront Usage -- Made some fixes and standardized the **Wavefront Service and Proxy Data** dashboard.
* Kubernetes -- Improved the Wavefront Collector for Kubernetes Metrics dashboard to show correctly whether the desired number of Collector instances are ready.

## June 2022

We made improvements to the following integrations in June 2022:

* Tanzu Application Service:

  * The Tanzu Application Service (Beta) integration is now renamed to Tanzu Application Service. It supports TAS v 2.11 and later.
  * We added a new **TAS: Nozzle Troubleshooting** dashboard that allows you to monitor the metrics coming from the Wavefront Nozzle.
  * The Tanzu Application Service integration that supports TAS v2.9 and v2.10 is now moved to the **Archived** section.
  * Fixed issues with the **TAS: RabbitMQ** dashboard in the archived version of the integration.

* vSphere:
  * Updated the vSphere setup documentation with best practices for metric collection and information about enabling custom attributes. See [VMware vSphere Integration Details](integrations_vsphere.html).
  * Made many fixes to dashboards and charts. For example, now they list hosts which are not in clusters.
  * Updated the names of a number of virtual machine charts in the  **vSphere Summary** dashboard.

* Consul -- Updated the setup steps and the out-of-the-box dashboard to support both Cloud-Managed and Self-Managed Consul nodes.

* Google Cloud Platform -- Added the list of metrics and metric descriptions for a number of services:
  * Google Cloud Billing
  * Google Cloud Spanner
  * Google Cloud Logging
  * Kubernetes Engine Metrics
  * Google ML Engine

* Snowflake:
  * To enhance authentication security, we updated the setup steps of the integration. Now, to register Snowflake, you have to provide a private key.
  * We improved the setup instructions with information on how to generate the public and private keys and give Tanzu Observability access to your Snowflake account.
  * Improved the **Snowflake Summary** dashboard and included charts for warehouse load monitoring.

* Jenkins:
  * You can now fetch metrics from Jenkins Prometheus with an authorized user instead of anonymous user.
  * We improved the setup instructions with information on how to enable a Prometheus endpoint.


* Wavefront Usage -- Updated the dashboard descriptions and made fixes to alerts.


## May 2022

We made improvements to the following integrations in May 2022:

* Dynatrace:
  * Improved the readability of the point tags and addressed an issue with duplicate metrics.
  * Updated the setup instructions. When you generate the API token, you should select not only **Read metrics (metrics.read)**, but also the **Read entities (entities.read)** token scope.

* Fluentd -- Updated the Fluentd integration and now you can monitor Fluentd on Kubernetes.

* PostgreSQL -- Updated the setup instructions and configuration with new extensions to monitor the database.

* TAS Beta:
  * We made improvements to the TAS Beta dashboards.
  * We have added a number of alerts. These alerts come from an older version of the integration and are not fully supported yet.

* Kubernetes:
  * Added new Kubernetes control plane alerts: **K8s control plane API Server SLO**, **K8s control plane CoreDNS SLO**, and **K8s control plane etcd SLO**.
  * The **Kubernetes Control Plane** dashboard now uses a new metrics prefix: `kubernetes.controlplane`.

We updated the metrics descriptions for the following list of integrations:

* Apache HTTP
* Apache Tomcat
* Apache Solr
* Apache Spark
* Consul
* Istio
* Java
* MongoDB
* Spring Cloud Data Flow
* Windows Service
* Zabbix
* ZooKeeper


## April 2022

We made improvements to the following integration in April 2022:

* Amazon Web Services -- We updated the format of CloudWatch instance and volume allow lists to JSON format. When you register a new CloudWatch integration or edit an existing one, you can add instances and volumes to allow lists. The format of the tag lists should be in JSON format, for example `{"organization":"yourcompany"}`.

## March 2022

We added the following integration in March 2022:

* VMware Blockchain

  VMware Blockchain is an enterprise-grade blockchain platform that enables multi-party workflows. This integration is developed and created by the community and falls into to the **Community Integrations** section of the Tanzu Observability by Wavefront **Integrations** page. We do not validate the community integrations and they are not fully supported by the Tanzu Observability by Wavefront team.


We made improvements to the following integrations in March 2022:

* Kubernetes Integration
  * Added a **Kubernetes Control Plane** dashboard to the Kubernetes integration. See the [Release Notes on Github](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/releases/tag/v1.9.0) for details.
  * You can enable the control plane metrics with helm, or using manual configuration. To see a full list of supported control plane metrics, visit our [github repo](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/main/docs/metrics.md#control-plane-metrics).


*  Wavefront Usage
   * Added two new system dashboards to the integration: **Committed rate vs Monthly Usage (PPS P95) Billable** and **Usage vs Remaining Balance (PPS P95) Burndown**.
   * Added three new system alerts: **Percentage of Usage Scanned**, **Percentage of Usage Ingested**, and **Remaining Balance**.

* Tanzu Application Service -- Updates to the descriptions of the alerts and the setup instructions.
* Tanzu Application Service (Beta) -- Updated the query metrics in the **Ops Manager Health** dashboard.
* VMware Tanzu GemFire:
  * Updated the GemFire for VMs dashboard and now it is forward compatible with GemFire for VMs 1.15 and later.
  * Added a list of alerts, such as **Low Server Count**, **Low Locator Count**, **High CPU Utilization**, and **High Disk Utilization** for all supported VMware Tanzu GemFire editions: VMware Tanzu  GemFire for Kubernetes, VMware Tanzu GemFire (Standalone), and VMware Tanzu GemFire for VMs.
* Istio (Archived) -- We removed this archived integration, and it is no longer available.

We made minor bug fixes and improvements to the following list of integrations:
  * Amazon Web Services
  * PingOne
  * OpenTelemetry


## February 2022

We added the following integrations in February 2022:

* Tanzu Application Service (Beta)

  This integration uses VMware Tanzu Observability by Wavefront Nozzle v4 and offers TAS data egress, dashboards, and alerting. This is a beta product and is not feature complete - more dashboards and alerting to come.

* Dynatrace SaaS

  This integration collects the metrics from a Dynatrace SaaS environment and sends them to Tanzu Observability by Wavefront. The on-premises Dynatrace integration is moved to the **Archived** section.

Made improvements to the following integrations and dashboards in February 2022:

* Microsoft Azure:
    * Updated the **Overview** tab with a new section named **Metrics Information**. You can now see a list with links to the Microsoft Azure documentation, which show you the metrics that we’ll be collecting once you set up the integration.
    * Now includes an **Alerts** tab with predefined alerts.
* Ceph -- Updated the Ceph integration and now you can monitor Ceph on Kubernetes.
* Amazon Web Services:
  * Updated the **Overview** tab of the integration. You can now see a list with links to the Amazon Web Services documentation, which show you the metrics that we'll be collected once you set up the integration.
  * Now includes an **Alerts** tab with predefined alerts.

* Google Cloud Platform -- Added a new out-of-the-box dashboard to monitor the Google Cloud Apigee service.


## January 2022

We added the following integrations in January 2022:

* Snowflake

  You can use the Snowflake integration to monitor a Snowflake database and the ACCOUNT_USAGE schema.

* Velero

  You can monitor the Velero backup and restore solution. This integration is developed and created by the community and falls into to the **Community Integrations** section of the Tanzu Observability by Wavefront **Integrations** page. We do not validate the community integrations and they are not fully supported by the Tanzu Observability by Wavefront team.

Made improvements to the following integrations and dashboards in January 2022:

* OpenShift -- Updated the Kubernetes OpenShift integration to use the newly certified helm chart.
* etcd -- Updated the etcd integration with out-of-the-box dashboards to monitor etcd on Kubernetes.
* VMware Tanzu GemFire -- Updated the VMware Tanzu GemFire integration with a new GemFire for VMs dashboard.
* Tanzu Application Service -- Updated the queries of some of the Tanzu Application Service alerts:
  * TAS Cloud Controller and Diego Not in Sync
  * TAS Locks Held by Auctioneer
  * TAS Locks Held by BBS


## All 2019 - 2021 Integrations Release Notes

We have separate pages for:

* [New and Changed Integrations in 2021](integrations_new_changed_2021.html)
* [New and Changed Integrations in 2019-2020](integrations_new_changed_2020.html)
