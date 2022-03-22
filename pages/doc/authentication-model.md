---
title: Authentication Model
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: wavefront-authentication.html
summary: Learn about the authentication model in Tanzu Observability by Wavefront.
---

Tanzu Observability by Wavefront supports authentication with user name and password, self-service SAML SSO, and multi-tenant SSO. 

## User Name and Password

Tanzu Observability supports both user accounts and service accounts.

* [User accounts](user-accounts.html) must authenticate with a user name and password.

  As a Supe Admin user or a user with the **Accounts** permission, you can invite new users and then manage the user accounts by adding them to groups with specific roles, for example.

* [Service accounts](service-accounts.html) that must authenticate with a token.

  A service account usually is used to perform management tasks. Service accounts can’t perform the UI operations that all user accounts can perform by default. There’s no limit on the number of service accounts that you can create in your organization.

## Self-Service SAML SSO

You can use the authentication provided by Tanzu Observability or use one of the supported authentication integrations. Tanzu Observability supports several authentication solutions including:

* [ADFS](adfs.html)
* [Azure AD](azure_ad.html)
* [Google](google.html)
* [OneLogin](onelogin.html)
* [Okta](okta.html)
* [PingOne](pingone.html)
* [VMware Workspace ONE Access](workspace-one.html).

We also support [self-service SAML SSO](auth_self_service_sso.html) setup. After the administrator sets up self-service SAML SSO, users will log in to the Wavefront instance by using the identity provider that the administrator has set up instead of using a password. New users who did not exist in the Wavefront instance are auto-created when they authenticate for the first time.

If a customer's chosen authentication solution supports two-factor authentication, Tanzu Observability requires two-factor authentication for login.

## Multi-Tenant SSO

Large customers can request [multi-tenant SSO](authentication.html#multi-tenant-authentication). Multi-tenancy is set up jointly by the administrator at the customer site and the Tanzu Observability team.

Users in different teams inside the company can authenticate to different tenants and cannot access the other tenant's data.
