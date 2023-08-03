---
title: Authentication Model
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: wavefront-authentication.html
summary: Learn about the authentication for user and service accounts.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for **original** subscribers. For VMware Cloud services subscriptions, see [Authentication Model in Operations for Applications on VMware Cloud Services](csp_authentication.html)."%}

VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) supports these authentication options:
* **Direct authentication**: With direct authentication, users authentication with user name and password and service accounts authenticate with a token.
* **Authentication through an SSO identity provider**: You can choose from supported self-service SAML SSO provider or request and multi-tenant SSO support.

## Direct Authentication

Operations for Applications supports direct authentication for user accounts and service accounts.

* [User accounts](user-accounts.html) must authenticate with a user name and password.

  As a Super Admin user or a user with the **Accounts** permission, you can invite new users and then manage the user accounts by adding them to groups with specific roles, for example.

* [Service accounts](service-accounts.html) that must authenticate with a token.

  A service account usually is used to perform management tasks. Service accounts can’t perform the UI operations that all user accounts can perform by default. There’s no limit on the number of service accounts that you can create in your organization.

## Self-Service SAML SSO

You can use the authentication provided by Operations for Applications or use one of the supported authentication integrations. Operations for Applications supports several authentication solutions including:

* [Google](google.html)
* [OneLogin](onelogin.html)
* [Okta](okta.html)
* [PingOne](pingone.html)
* [VMware Workspace ONE Access](workspace-one.html)

We also support [self-service SAML SSO](auth_self_service_sso.html) setup. After the administrator sets up self-service SAML SSO, users will log in to the service instance by using the identity provider that the administrator has set up instead of using a password. New users who did not exist in the service instance are auto-created when they authenticate for the first time.

{% include important.html content="If your environment requires Self-Service SAML SSO setup with an IdP that is not available in the list for self-service SAML SSO (for example, Azure AD or ADFS), create a [support ticket](wavefront_support_feedback.html#support)."%} 

If a customer's chosen authentication solution supports two-factor authentication, Operations for Applications requires two-factor authentication for login.

## Multi-Tenant SSO

Large customers can request [multi-tenant SSO](authentication.html#multi-tenant-authentication). Multi-tenancy is set up jointly by the administrator at the customer site and our Technical Support team.

Users in different teams inside the company can authenticate to different tenants and cannot access the other tenant's data.

## Learn More

* [Single-Tenant Authentication and Self-Service SAML SSO](auth_self_service_sso.html)
* [Manage User Accounts](user-accounts.html)
* [Manage Service Accounts](service-accounts.html)
