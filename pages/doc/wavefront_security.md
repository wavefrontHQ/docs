---
title: Wavefront Security
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_security.html
summary: Understand how Wavefront secures your data and helps you fine-tune security for your cluster.
---

Wavefront by VMware uses an inherently secure environment that protects your data and includes facilities for you to customize authentication and authorization.

This page gives a summary. For a detailed discussion of all aspects of security, download and review the [Cloud Security Alliance Consensus Assessments Initiative Questionnaire for Wavefront by VMware](https://cloudsecurityalliance.org/star/registry/vmware-inc/). 

## VMware Security Development Lifecycle

VMware has an industry-leading [Security Development Lifecycle process](https://www.vmware.com/security/sdl.html) and a VMware Cloud Services Security organization that focuses on ensuring that VMware cloud services implement industry standard operational and security controls.

## Data Protection

Wavefront currently uses AWS to run the Wavefront service and to store customer data. The service is served from a single AWS region spread across multiple availability zones for failover. Using AWS also means that we can take advantage of other AWS security features such as encryption at rest and system backups that use asymmetric encryption.

Wavefront customer environments are isolated from each other. Data is stored on encrypted data volumes.

The AWS data centers incorporate physical protection against environmental risks. To
access the AWS ISO27001 report, see https://aws.amazon.com/compliance/. For more information:
* On AWS controls, visit:
https://cloudsecurityalliance.org/star-registrant/amazon-aws/
* On data centers https://aws.amazon.com/compliance/datacenter/data-centers/

Development, QA, and production use separate equipment and
environments and are managed by separate teams.
Customers retain control and ownership of their Customer
Content which does not get replicated without the explicit
actions of the tenant administrator.

## High Availability

Wavefront by VMware is architected to be highly available. In
the event of a hardware failure, this unique cloud service is
configured to automatically migrate to, or restart workloads
on, another host machine in the cluster and automatically
restart the failed host. If the host machine fails to restart, or
the performance of the restarted host is degraded, the service
is capable of replacing the failed host in a cluster with an
entirely new host within minutes.

## Networking

Applications send data to the Wavefront service using either the [Wavefront proxy] or direct ingestion[direct_ingestion.html]. We protect all data traffic with TLS (Transport Layer Security) and HTTPS. If you send data directly to the Wavefront service, we recommend TLS 1.2 connections.

The Wavefront proxy uses HTTPS, and we offer options to secure it further:
* Perform a manual install and place the Wavefront proxy [behind an HTTP proxy](proxies_manual_install.html#connecting-to-wavefront-through-an-http-proxy).

* Use proxy [configuration properties](general-proxy-properties-and-examples) to set ports, connect times, and more.

* Use a [whitelist regx or blacklist regx](proxies_preprocessor_rules.html#point-filtering-rules) to control traffic to the Wavefront proxy.


## Authentication

All Wavefront users [must be authenticated](authentication.html) to log in. Wavefront customers can use the authentication provided by Wavefront or use one of our supported authentication integration. We support several authentication solutions including AzureAD, Google ID, and Okta.

Large customers can request [multi-tenant SSO](authentication.html#multi-tenant-authentication). Users in different teams inside the company can authenticate to different tenants and cannot access the other tenant's data.


## Authorization

Wavefront supports multi-level access management for both users and groups.
* [Global permissions](permissions.html) determine which users can manage which objects or perform certain tasks. For example, you could assign Dashboards, Alerts, Proxy, Metrics, and Embed Chart permission to a Developers group and only Dashboard permission to a Novice group.
* [Access control](access.html) applies to individual dashboards. Privileged users can revoke grant access to individual groups or users.

![dashboard access](images/dashboard_access.png)

Wavefront supports a [high security mode](access.html#changing-the-access-control-preference) where only the dashboard creator and Super Admin users can view and modify new dashboards.

Users of the REST API must pass in an API token and must also have the necessary permissions to perform the task, for example, Dashboard permissions to modify dashboards.

## Audit Trail

You can view changes that were made to dashboards, alerts, etc. by using the Version feature. XX link here

![alert versions](images/alert_versions.png)

## Integrations

Cloud integrations support monitoring data from different cloud providers using Wavefront. The process is like this:
1. You open the integration.
2. You give Wavefront [global read-only access](integrations_aws_metrics.html#giving-wavefront-global-read-only-access) or [limited access](integrations_aws_metrics.html#giving-wavefront-limited-access).

Other Integrations

Security of other integrations depends on the integration.
??Do we use TLS 1.2 in our integrations?

Container Integrations
What can we say here? Any advice?
