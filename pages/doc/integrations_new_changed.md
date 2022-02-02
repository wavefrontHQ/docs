---
title: Integrations Release Notes
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_new_changed.html
summary: New and changed Wavefront integrations.
---
Wavefront continuously adds new integrations to the existing set, and improves available integrations. We update our [**complete list of all integrations**](https://docs.wavefront.com/label_integrations%20list.html) each time we add new integrations.

## February 2022

We added the following integrations in February 2022:

* Dynatrace SaaS 

  This integration collects the metrics from a Dynatrace SaaS environment and sends them to Wavefront. The on-premises Dynatrace integration is moved to the **Archived** section.

Made improvements to the following integrations and dashboards in February 2022:

* Ceph -- Updated the Ceph integration and now you can monitor Ceph on Kubernetes. 
* Amazon Web Services -- Updated the **Overview** tab of the integration. You can now see a list with links to the Amazon Web Services documentation, which show you the metrics that we'll be collected once you set up the integration.


## January 2022

We added the following integrations in January 2022:

* Snowflake
  
  You can use the Snowflake integration to monitor a Snowflake database and the ACCOUNT_USAGE schema.

* Velero

  You can monitor the Velero backup and restore solution. This integration is developed and created by the community and falls into to the **Community Integrations** section of the Wavefront **Integrations** page. We do not validate the community integrations and they are not fully supported by the Tanzu Observability by Wavefront team.

Made improvements to the following integrations and dashboards in January 2022:
 
* OpenShift -- Updated the Kubernetes OpenShift integration to use the newly certified helm chart.
* etcd -- Updated the etcd integration with out-of-the-box dashboards to monitor etcd on Kubernetes.
* VMware Tanzu GemFire -- Updated the VMware Tanzu GemFire integration with a new GemFire for VMs dashboard.
* Tanzu Application Service -- Updated the queries of some of the Tanzu Application Service alerts: 
  * TAS Cloud Controller and Diego Not in Sync
  * TAS Locks Held by Auctioneer
  * TAS Locks Held by BBS


## All 2018 - 2021 Integrations Release Notes

We have separate pages for:

* [New and Changed Integrations in 2021](integrations_new_changed_2021.html)
* [New and Changed Integrations in 2019-2020](integrations_new_changed_2020.html)
* [New and Changed Integrations in 2018](integrations_new_changed_2018.html)
