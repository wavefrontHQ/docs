---
title: Authentication Model in Tanzu Observability on VMware Cloud Services
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: csp_authentication.html
summary: Learn how to enable multi-tenant authentication.
---

{% include note.html content="Starting July 3, 2023, VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) is a service on the VMware Cloud services platform. The content in this chapter is valid for VMware Cloud services subscriptions. For **original** subscriptions, see [Authentication Model](wavefront-authentication.html)."%}

VMware Cloud services provides a central single sign-on (SSO) to all of your services running on the platform, including Tanzu Observability. Users authenticate with VMware Cloud services accounts. Server-to-server apps, which correspond to service accounts in Tanzu Observability, authenticate with OAuth 2.0 client credentials and VMware Cloud services API tokens are issued directly to them.

VMware Cloud services supports these user authentication options:
* **Authentication through a VMware ID**: The VMware Cloud services account is based on the VMware ID (VMware account) credentials that the user creates in the VMware Cloud Services Console. 
* **Authentication through a federated domain**: The VMware Cloud services account is based on the corporate account credentials. 

VMware Cloud services also supports **multi-tenant SSO**, where each Tanzu Observability tenant is onboarded as a separate Tanzu Observability service instance in the same VMware Cloud organization. 

## VMware ID Authentication

By default, to register with VMware Cloud services, you must create a VMware ID for your VMware Cloud services account.

## Federated Domain Authentication

As a user with the VMware Cloud **Organization Owner** role, you can initiate an enterprise domain federation and invite an **Enterprise Administrator**. See [Setting Up Enterprise Federation with VMware Cloud Services Guide](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html) in the VMware Cloud services documentation.

The users in a federated domain don't need to create a VMware ID unless they need to access billing information in the VMware Cloud organization.

After you federated your enterprise domain, as a user with the VMware Cloud **Organization Owner** role, you can activate Identity Governance and Administration (IGA) and unlock additional identity and access management features, such as assigning default service roles for the users in the federated domain. For details see [What is Identity Governance and Administration and how does it work with VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E6661280-A88A-4E26-9008-4C1620641FA1.html) and [How do I assign default roles in my Organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-2307F55C-FB5C-4EE0-A2DE-43011509A9A1.html) in the VMware Cloud services documentation.

## Multi-Tenant SSO

Large customers can request multi-tenant SSO. Multi-tenancy is set up jointly by your **Organization Owner** and our Technical Support team.

Users in different teams inside the company can authenticate to different tenants and cannot access the other tenant's data.
