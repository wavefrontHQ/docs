---
title: Wavefront Security
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_security.html
summary: Understand how Wavefront secures your data and supports fine-tuning security for your cluster.
---

Wavefront by VMware protects your data and includes facilities for you to customize authentication and authorization.

This page gives a summary.
* Download the white paper [VMware Tanzu Observability Security and Privacy](https://d1fto35gcfffzn.cloudfront.net/tanzu/observability/VMware_Tanzu_Observability_Security_and_Privacy.pdf) for a detailed discussion.
* Download and review the [Cloud Security Alliance Consensus Assessments Initiative Questionnaire for Wavefront by VMware](https://cloudsecurityalliance.org/star/registry/vmware-inc/) for our consensus assessment questionnaire.

## Certifications

Wavefront has successfully completed all requirements for the following certifications and reports:

*	ISO 27001/27017/27018
*	SOC 2 Type 1
*	CSA STAR Level 1

## Privacy

Wavefront is used for monitoring applications. Wavefront securely stores username/password information but does not collect information about individual users. We do not install agents that collect user information.

None of the built-in integrations collect user information. However, Wavefront customers can set up Wavefront to collect any type of information they want.

## Data Protection

Wavefront currently uses AWS to run the Wavefront service and to store customer application data.

* The service is served from a single AWS region spread across multiple availability zones for failover.
* All incoming and outgoing traffic is encrypted.
* We take advantage of other AWS security features such as encryption at rest and system backups that use asymmetric encryption.
* Wavefront customer environments are isolated from each other. Data is stored on encrypted data volumes.

The AWS data centers incorporate physical protection against environmental risks. To
access the AWS ISO27001 report, see [https://aws.amazon.com/compliance](https://aws.amazon.com/compliance/).

For more information on AWS controls, visit:
[https://cloudsecurityalliance.org/star-registrant/amazon-aws/](https://cloudsecurityalliance.org/star-registrant/amazon-aws/)

Wavefront development, QA, and production use separate equipment and
environments and are managed by separate teams.
Customers retain control and ownership of their content. We do not replicate customer content unless the customer asks for it explicitly.

## High Availability

Wavefront is architected to be highly available. In the event of a hardware failure, we automatically migrate to or restart workloads, on another host machine in the cluster and automatically restart the failed host. If the host machine fails to restart, or the performance of the restarted host is degraded, the service is capable of replacing the failed host in a cluster with an entirely new host within minutes.

## Disaster Recovery

Wavefront supports the option of Disaster Recovery (DR) across regions for customers. Contact your Wavefront representative for details.

## Networking

Applications send data to the Wavefront service using either the [Wavefront proxy](proxies.html) or [direct ingestion](direct_ingestion.html). We protect all data traffic with TLS (Transport Layer Security) and HTTPS. If you send data directly to the Wavefront service, we require TLS 1.2 connections.

The Wavefront proxy uses HTTPS, and we offer options to secure it further:
* Perform a manual install and place the Wavefront proxy [behind an HTTP proxy](proxies_manual_install.html#connecting-to-wavefront-through-an-http-proxy).

* Use proxy [configuration properties](proxies_configuring.html#general-proxy-properties-and-examples) to set ports, connect times, and more.

* Use an [allow list regex or block list regex](proxies_preprocessor_rules.html#point-filtering-rules) to control traffic to the Wavefront proxy.




## Authentication

Wavefront supports both user accounts and service accounts. User accounts [must authenticate](authentication.html) with a username and password, service accounts authenticate with a revokable token. Wavefront customers can use the authentication provided by Wavefront or use one of our supported authentication integrations. We support several authentication solutions including Azure AD, Google ID, and Okta.

Starting with release 2020.38, we support [self-service SAML SSO](auth_self_service_sso.html) setup.

If a customer's chosen authentication solution supports two-factor authentication, Wavefront requires two-factor authentication for login.

Large customers can request [multi-tenant SSO](authentication.html#multi-tenant-authentication). Users in different teams inside the company can authenticate to different tenants and cannot access the other tenant's data.


## Authorization

Wavefront supports multi-level authorization:
* **Roles and permissions** determine which groups or users can manage which objects or perform certain tasks. For example, you could create a ReadOnly role with no permissions and assign it to a Novice group, or create a Developers role, assign Dashboards, Alerts, Proxy, Metrics, and Embed Chart permission, and assign it to a developer group.
* [**Access control**](access.html) applies to individual objects (dashboards or alerts). Privileged groups or users can revoke grant access to individual groups or users. To support this feature, Wavefront includes a [Super Admin](users_roles.html#who-is-the-super-admin-user) user.
  Wavefront supports a [high security mode](access.html#change-the-access-control-security-organization-setting) where only the object creator and Super Admin user can view and modify new dashboards.
* [**Metrics security policy rules**](metrics_security.html) allow fine-grained control over metrics visibility in dashboards, charts, alerts, etc.



If you use the REST API, you must pass in an API token and have the necessary permissions to perform the task, for example, Dashboard permissions to modify dashboards.

If you use [direct ingestion](direct_ingestion.html), you are required to pass in an API token and most also have the Direct Data Ingestion permission.

## Audit Trail

You can view changes that were made to dashboards, alerts, etc., by using [versions](wavefront_monitoring.html#examine-versions-of-dashboards-and-alerts) of charts and dashboards.

## Integrations

Cloud integrations support monitoring data from different cloud providers using Wavefront. The process is like this:
1. You open the integration.
2. You give Wavefront [global read-only access](integrations_aws_overview.html#giving-wavefront-global-read-only-access) or [limited access](integrations_aws_overview.html#giving-wavefront-limited-access).

For details, see the individual integration.

## VMware Security Development Lifecycle

VMware has an industry-leading [Security Development Lifecycle process](https://www.vmware.com/security/sdl.html) and a VMware Cloud Services Security organization that focuses on ensuring that VMware cloud services implement industry standard operational and security controls.
