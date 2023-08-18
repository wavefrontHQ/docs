---
title: VMware Aria Operations for Applications Subscription Types
keywords: 
tags: [introduction]
sidebar: doc_sidebar
permalink: subscriptions-differences.html
summary: Learn about the VMware Aria Operations for Applications subscription types and the advantages of VMware Cloud services subscriptions over original subscriptions.
---

Operations for Applications subscriptions are two types: original subscriptions and VMware Cloud services subscriptions.

## Why the Two Subscription Types Differ?

Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. After this date, we support two types of subscriptions: Operations for Applications subscriptions **onboarded** to the [VMware Cloud services platform](https://console.cloud.vmware.com/) and **original** subscriptions. Original subscriptions are the existing ones and they remain as is until they migrate to VMware Cloud services. 

{% include note.html content="We will support both **original** and **onboarded** subscriptions until all **original** subscriptions are migrated to VMware Cloud services." %}

VMware Cloud services provides single sign-on (SSO) and identity access management (IAM) to your entire VMware Cloud services portfolio across hybrid and native public clouds, including Operations for Applications. Therefore, there are differences in the experience for VMware Cloud services subscribers and original subscribers. 

## Advantages of VMware Cloud Services Subscriptions Over Original Subscriptions

* **VMware Cloud SSO**: VMware Cloud services provides centralized authentication for your entire VMware Cloud services portfolio. After you log in to the VMware Cloud Services Console, you can access each of your services and you can easily switch between them.

* **Improved SAML SSO**: Enterprise federation is supported for a wider list of IdPs, such as: 
  * Okta 
  * PingIdentity
  * Microsoft Active Directory Federation Services (ADFS)
  * OneLogin
  * Azure Active Directory

  You can also configure any other SAML 2.0 compliant third-party IdP that is not part of the list above. See [Configure the identity provider](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-320CDE08-FD8F-4540-BB19-BE9647F31075.html) in the VMware Cloud services documentation.

* **Enterprise Groups Synchronization**: The enterprise groups from your federated corporate domain are available for you to assign them roles, including default roles. In addition, you can nest an enterprise group into a custom group.
* **Centralized Authorization with Role-Based Access Control**: The VMware Cloud Services Console provides access management for your entire VMware Cloud services portfolio. It includes organization roles, service-specific roles, and custom roles, which can be assigned to users, API tokens, and sever to server apps (which correspond to service accounts in Operations for Applications).
* **Improved Security**:
  * VMware Cloud services supports authentication polices for user access, such as multi-factor authentication, IP authentication preferences, and user access at domain level.
  * An API token can be assigned with a subset of the roles that its associated user owns.
  * Users can secure their API tokens using multi-factor authentication.
  * Interacting with the REST API requires a VMware Cloud services access token, which can be exchanged from a user's API token or server to server app credentials.
* **Improved Multi-Tenancy**: Support of switching between tenants on different clusters. This unlocks better experience in multi-tenant environments.
* **Centralized Billing and Subscriptions**: The VMware Cloud Services Console displays billing and subscriptions details, and allows payment methods management. This brings the billing and subscriptions experience at a completely new level as we had no such ability before.


