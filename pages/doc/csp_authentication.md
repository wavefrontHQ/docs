---
title: Authentication Model in Operations for Applications on VMware Cloud Services
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: csp_authentication.html
summary: Learn how to enable multi-tenant authentication.
---

VMware Cloud services provides a central single sign-on (SSO) to all of your services running on the platform, including VMware Aria Operations for Applications. Users authenticate with VMware Cloud services accounts. Server-to-server apps authenticate with OAuth 2.0 client credentials and VMware Cloud services tokens are issued directly to them.

VMware Cloud services supports these user authentication options:
* **Authentication through a VMware ID**: The VMware Cloud services account is based on the VMware ID (VMware account) credentials that the user creates in the VMware Cloud Services Console. 
* **Authentication through a federated domain**: The VMware Cloud services account is based on the corporate account credentials. 

VMware Cloud services also supports **multi-tenant SSO**, where each Operations for Applications tenant is onboarded as a separate Operations for Applications service instance in the same VMware Cloud organization. 

## VMware ID Authentication

By default, to register with VMware Cloud services, you must create a VMware ID for your VMware Cloud services account.

## Federated Domain Authentication

As an **Organization Owner**, you can initiate an enterprise domain federation and invite an **Enterprise Administrator**. See [Setting Up Enterprise Federation with VMware Cloud Services Guide](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html) in the VMware Cloud services documentation.

The users in a federated domain don't need to create a VMware ID unless they need to access billing information in the VMware Cloud organization.

## Multi-Tenant SSO

Large customers can request multi-tenant SSO. Multi-tenancy is set up jointly by your **Organization Owner** and our Technical Support team.

Users in different teams inside the company can authenticate to different tenants and cannot access the other tenant's data.