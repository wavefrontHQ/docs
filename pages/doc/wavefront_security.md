---
title: Security
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_security.html
summary: Understand how VMware Aria Operations for Applications secures your data and supports fine-tuning security for your cluster.
---

VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) protects your data and includes facilities for you to customize authentication and authorization.

This page gives a summary.
* Download this [white paper](https://tanzu.vmware.com/content/white-papers/vmware-tanzu-observability-security-and-privacy) for a detailed discussion. 
* Download and review the [Cloud Security Alliance Consensus Assessments Initiative Questionnaire for VMware Aria Operations for Applications](https://cloudsecurityalliance.org/star/registry/vmware-inc/) for our consensus assessment questionnaire.

## Certifications

Operations for Applications has successfully completed all requirements for the following certifications and reports:

*	ISO 27001/27017/27018
*	SOC 2 Type 1
*	CSA STAR Level 1

## Privacy

Operations for Applications is used for monitoring applications. Operations for Applications securely stores user name and password information, but does not collect information about individual users. We do not install agents that collect user information.

None of the built-in integrations collect user information. However, our customers can set up their service instances to collect any type of information they want.

## Data Protection

Currently, Operations for Applications uses AWS to run the service and to store customer application data.

* The service is served from a single AWS region spread across multiple availability zones for failover.
* All incoming and outgoing traffic is encrypted.
* We take advantage of other AWS security features such as encryption at rest and system backups that use asymmetric encryption.
* The customer environments are isolated from each other. Data is stored on encrypted data volumes.

The AWS data centers incorporate physical protection against environmental risks. To
access the AWS ISO27001 report, see [https://aws.amazon.com/compliance](https://aws.amazon.com/compliance/).

For more information on AWS controls, visit:
[https://cloudsecurityalliance.org/star/registry/amazon/services/amazon-web-services/](https://cloudsecurityalliance.org/star/registry/amazon/services/amazon-web-services/).

Our development, QA, and production use separate equipment and environments, and are managed by separate teams.
Customers retain control and ownership of their content. We do not replicate customer content unless the customer asks for it explicitly.

## High Availability

Operations for Applications is architected to be highly available. In the event of a hardware failure, we automatically migrate to or restart workloads, on another host machine in the cluster and automatically restart the failed host. If the host machine fails to restart, or the performance of the restarted host is degraded, the service is capable of replacing the failed host in a cluster with an entirely new host within minutes.

## Disaster Recovery

Operations for Applications supports the option of Disaster Recovery (DR) across regions for customers. Contact your Operations for Applications representative for details.

## Networking

Applications send data to the Operations for Applications service using either the [Wavefront proxy](proxies.html) or [direct ingestion](direct_ingestion.html). We protect all data traffic with TLS (Transport Layer Security) and HTTPS. If you send data directly to the Operations for Applications service, we require TLS 1.2 connections.

The Wavefront proxy uses HTTPS, and we offer options to secure it further:
* Perform a manual install and place the Wavefront proxy [behind an HTTP proxy](proxies_manual_install.html#configure-wavefront-proxy-with-an-httphttps-proxy).

* Use proxy [configuration properties](proxies_configuring.html#configuration-properties) to set ports, connect times, and more.

* Use an [allow list regex or block list regex](proxies_preprocessor_rules.html#point-filtering-rules) to control traffic to the Wavefront proxy.


## Authentication

Operations for Applications supports three methods of authentication.

* By using a user name and password.

 Operations for Applications supports user accounts and service accounts. User accounts [must authenticate](authentication.html) with a user name and password, service accounts authenticate with a token.

* SAML SSO

  You can use the authentication provided by Operations for Applications or use one of the supported authentication integrations. We support several authentication solutions including Azure AD, Google ID, and Okta.

  We also support [self-service SAML SSO](auth_self_service_sso.html) setup.

  If your chosen authentication solution supports two-factor authentication, Operations for Applications requires two-factor authentication for login.

* Multi-Tenant SSO

  Large customers can request [multi-tenant SSO](authentication.html#multi-tenant-authentication). Users in different teams inside the company can authenticate to different tenants and cannot access the other tenant's data.


## Authorization

Operations for Applications supports multi-level authorization:
* **Roles and permissions** determine which groups or users can manage which objects or perform certain tasks. For example, you could create a read-only role with no permissions and assign it to a Novice group, or create a Developers role, assign **Dashboards**, **Alerts**, **Proxy**, **Metrics**, and **Chart Embedding** permissions, and assign it to a developer group.
* [**Access control**](access.html) applies to individual objects (dashboards or alerts). Privileged groups or users can revoke grant access to individual groups or users. Operations for Applications supports a [high security mode](access.html#change-the-access-control-security-organization-setting) where only the object creator and the [Super Admin](authorization-faq.html#who-is-the-super-admin-user) user can view and modify new dashboards.
* [**Metrics security policy rules**](metrics_security.html) allow fine-grained control over metrics visibility in dashboards, charts, alerts, etc.



If you use the REST API, you must pass in an API token and have the necessary permissions to perform the task, for example, **Dashboards** permission to modify dashboards.

If you use [direct ingestion](direct_ingestion.html), you are required to pass in an API token and must also have the **Direct Data Ingestion** permission.

## Audit Trail

You can view changes that were made to dashboards, alerts, etc., by using [versions](track_adoption.html#examine-versions-of-dashboards-and-alerts) of charts and dashboards.

## Integrations

Our cloud integrations support monitoring data from different cloud providers. The process is like this:
1. You open the integration.
2. You give Operations for Applications [global read-only access](integrations_aws_overview.html#give-read-only-access-to-your-amazon-account-and-get-the-role-arn) or [limited access](integrations_aws_overview.html#giving-limited-access).

For details, see the individual integration.

## VMware Security Development Lifecycle

VMware has an industry-leading [Security Development Lifecycle process](https://www.vmware.com/security/sdl.html) and a VMware Cloud Services Security organization that focuses on ensuring that VMware cloud services implement industry standard operational and security controls.
