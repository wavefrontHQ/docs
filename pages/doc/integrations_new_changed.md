---
title: New and Changed Integrations
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_new_changed.html
summary: New and changed Wavefront integrations.
---
Wavefront continuously adds new integrations to the existing set, and improves available integrations. We update our [**complete list of all integrations**](https://docs.wavefront.com/label_integrations%20list.html) each time we add new integrations.

## March 2021

Made improvements to the following integrations in March 2021:

* Catchpoint:
  * Labels in Catchpoint are available as point tags in Wavefront.
  * Insight Settings in Catchpoint, such as tracepoints and indicators, are available as metrics in Wavefront.
* OpenTelemetry -- Fixed broken links in the setup instructions
* Istio -- Fixed broken links in the setup instructions
* Kubernetes:
  * Updated the out of the box dashboards
  * Now includes an **Alerts** tab with predefined alerts
* Spring Cloud Data Flow -- Upgraded the integration to support Spring Cloud Data Flow 2.7.1 and Spring Cloud Skipper 2.6.1
* Tanzu Kubernetes Grid Integrated Edition -- Fixes to the queries in alerts
* OneLogin -- Updates to the integration setup instructions
* vSphere -- Fixes to the out of the box dashboards
* RabbitMQ -- Fixes to the out of the box dashboards
* Wavefront Usage -- Added new alerts to the Wavefront usage integration

## December 2020 - February 2021

We added the following integration in December 2020 - February 2021:

* VMware Tanzu™ GemFire®
 
Made improvements to the following integrations and dashboards in December 2020 - February 2021:

* New Tracing dashboards
* Amazon Web Services Gateway -- New API gateway types
* Spring Cloud Data Flow -- Spring Cloud Data Flow and Spring Cloud Skipper version upgrade
* Microsoft Azure Storage -- New chart showing used capacity
* Wavefront Usage:
  * Name changes to the dashboards
  * Now includes an **Alerts** tab with predefined alerts
* Java
* Catchpoint
* AppDynamics -- Updates to the setup UI
* Kubernetes -- New out of the box dashboards
* OKTA -- Updates to the setup UI
* Wavefront Tutorial
* Slack
* Amazon Web Services: Fargate dashboard
* Tanzu Kubernetes Grid Integrated Edition -- Updated to support Tanzu Kubernetes Grid Integrated Edition 1.10
* Google Cloud Platform -- New dashboard to support the new Google Cloud Platform Kubernetes metric namespace `gcp.kubernetes`
* Pivotal Cloud Foundry (TAS) -- This integration uses the VMware Tanzu Observability by Wavefront Nozzle tile distributed by the Pivotal network. It has been updated to use Wavefront proxy 9.2 and stem cell 621.76.

## October 2020 - December 2020
 
We added the following integrations in October 2020 - November 2020:

* Concourse CI
* OpenTelemetry


Made improvements to the following integrations in October 2020 - December 2020:

* Spring Cloud Data Flow -- New preconfigured dashboard to monitor Native Kafka client
* Kubernetes -- New setup UI
* Slack -- URL unfurler
* Wavefront Usage new dashboards:
  - **Wavefront Ingestion Policy Explorer** In environments where [ingestion policies](ingestion_policies.html) have been configured, shows usage for each user and ingestion policy.
  - **Committed Rate and Monthly Usage (PPS P95)** dashboard shows Wavefront monthly usage against commited rate.
  - **Wavefront Namespace Usage Explorer**: Tracks the number of metrics received for the first 3 levels of your metric namespace.
* Google Cloud Platform (GCP) -- Fixed dashboard queries in Google Kubernetes Engine (GKE) dashboard
* Azure Storage -- Preconfigured dashboard now supports monitoring of the Classic storage type




## October 2019 - September 2020

Added the following integrations in October 2019 - September 2020:

* Dynatrace
* AppDynamics
* Catchpoint
* VMware vRealize Log Insight Cloud
* Spring Boot
* Tanzu Mission Control
* Spring Cloud Data Flow

Made improvements to the following integrations in October 2019 - October 2020:

* Kubernetes integration now works with:
  - OpenShift Operator 3.x
  - OpenShift Operator 4.x
  - Rancher
  - Project Pacific (vSphere with Kubernetes)
* AWS CloudWatch integration refresh -- new API
* Istio integration -- new adapter
* Zabbix integration
* Logstash integration
* Tanzu Kubernetes Grid Integrated Edition (formerly PKS) -- Now includes an **Alerts** tab with predefined alerts
* Kubernetes integration guided user experience:
  - Provides streamlined instructions based on where you install the Wavefront Collector for Kubernetes
  - Verifies you've configured the Kubernetes integration correctly during setup
  - Shows the list of your Kubernetes clusters and their statuses in the integrations setup page

  ![screenshot showing options to install in Tanzu, Kubernetes, or Openshift cluster](images/kubernetes_revamp.png)

Made significant improvements to the dashboards of the following integrations:

* Wavefront Tutorial dashboards (upgrade for V2 UI)
* Pivotal Cloud Foundry dashboards
* Kubernetes dashboard
* vSphere dashboards
* Go SDK integration -- now emits runtime metrics, captured in a dashboard
* Python SDK integration -- now emits runtime metrics, captured in a dashboard

The following authentication integrations have been revised to support self-service SAML SSO

* VMware Workspace ONE Access
* PingOne

Many integrations now include information about the metrics that Wavefront collects even when metrics are not flowing. The information is available from the integration's  **Metrics** tab and from the documentation that's generated from the integration.

Here's an example of what you see for the Amazon CloudFront integration:

![screenshot with a table of metric name and description (statistics captured)](images/metrics_tab.png)


## April 2019 - October 2019

We added the following integrations in April - July 2019:

* Azure File Storage integration
* New Relic integration
* Azure Data Warehouse integration
* Azure HD Insight integration

We made made improvements to the following integrations in January - March 2019:

* Azure integrations: Improved dashboard filtering
* AWS integrations: Improved dashboard filtering and charts
* Prometheus integration: Enhanced documentation
* Couch DB: Support for Couch DB v2.x
* vSphere integration: Miscellaneous improvements
* NGINX+ integration: Now using the new API module

## January 2019 - March 2019

We added the following integrations in January - March 2019:

* AWS IAM Key Age integration
* Zipkin integration
* OpenShift integration

We made made improvements to the following integrations in January - March 2019

* Kubernetes integration: Added dashboard for monitoring Wavefront Collector for Kubernetes
* Amazon RDS integration: Dashboard filtering improvements
* Azure SQL Database integration: Dashboard improvments
* vSphere integration: Dashboard improvements
* Nagios integration: Enhancements to event collection

## All 2018 Integrations

We have a separate page for [New and Changed Integrations in 2018](integrations_new_changed_2018.html).
