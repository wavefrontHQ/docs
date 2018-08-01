---
title: Authentication with SSO Providers
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: authentication.html
summary: Learn how to enable authentication and multi-tenant authentication.
---

Wavefront supports authentication through your identity provider (IDP). For several popular IDPs we support integrations. Most customers use single-tenant authentication, but in some cases, multi-tenant authentication makes sense.


## Single-Tenant Authentication

Most Wavefront administrators set up authentication in their environment by setting up SSO using an identity provider (IDP). We support predefined integrations with [ADFS](adfs.html), [Azure AD](azure_ad.html), [Google](google.html), [OneLogin](onelogin.html), and [Okta](okta.html), but SSO setup with other IDPs is also possible.

After a user has been successfully authenticated, administrators determine which permissions the user has ([authorization](permissions_overview.html)) from within Wavefront.

## Multi-Tenant Authentication

Some VMware customers set up their environment to support logins into different tenants on the same cluster. In most cases, a user is either part of one tenant or part of another tenant, for example, either part of the networking team or part of the storage team. But in some cases, the same user has to have access to both tenants.

For that use case:
* Administrators invite users who belong to one team to one tenant
* Administrators invite users who belong to another team to another tenant.
* Starting with release 2018.40, administrators can invite a user to more than one tenant.   A user who has access to multiple tenants has to log in only once, and can then switch from one tenant to another. As a side effect, the changes to multi-tenancy also results in fine-grained access control and in improved query performance.

## How Administrators Set Up Multi-Tenancy

To set up multi-tenancy, administrators follow these steps:

1. Decide on the multi-tenant mode (see below), that is, whether they want a sandbox or strict multi-tenant setup.
1. Request a multi-tenant setup from Wavefront with the following information:
   * Name of the tenants to create (one tenant per team).
   * Email addresses of the administrators of reach team.
   * Identity provider type. We currently support VMware Identity Manager and Okta for multi-tenant setup.
1. Wavefront creates a tenant for each team.
1. Administrators for each tenant can now invite users who have access to the ID provider to the tenant.

## How Users Experience Multi-Tenant SSO

If a user is part of only one team, that user becomes part of the corresponding tenant upon login.

If a user is part of more than one team, that is, the user has been invited to more than one tenant, the user is logged in to the most tenant. Users can switch to the other team by selecting the login for the other tenant from the gear icon.

After a user has been successfully authenticated, [authorization](permissions_overview.html) for that user is controlled within Wavefront.


## Multi-Tenant Modes

When administrators request a multi-tenant setup, they can request sandbox mode or strict mode.

### Sandbox Mode (Default Login Enabled)

In sandbox mode, any user who is authenticated by the corporate SSO identity provider is given access to a logical tenant called default tenant.
* If that user was not invited to any of the tenants, Wavefront creates a user on the default tenant.
* If the user has been invited to an existing tenant, the user is given access to that tenant, and Wavefront does not create a user on the default tenant.

### Strict Mode (Default Login Disabled)

In strict mode, users can access Wavefront only if they've been invited to one of the tenants.
