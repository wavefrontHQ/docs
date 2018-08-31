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

Most existing Wavefront customers set up their environment to support logins into a single tenant on a cluster. If they want their different teams to access diffrent instances(tenants), those tenants need to be in separate clusters, as we used to allow an authenticated user to log in to a single customer. To allow multiple teams from same company to use different customer instance on the same cluster, the instances need to use different authentication providers, which often needed complex tweaks on the customer side. 

However, with growing need to smoothly allow multiple teams from same company to reside as separate tenants inside a single cluster (for better utilization of a cluster), we are now introducing the multi-tenancy feature into Wavefront - starting with release 2018.40. With this feature, different teams under the same company can coexist as different teantns in the same cluster and no need to tweak the identity providers on the customer side. Even more, a single user from the company can be part of multiple tenants and they can smoothly switch between their accounts in the different teams.

For that use case:
* Administrators invite users who belong to one team to one tenant
* Administrators invite users who belong to another team to another tenant.
* Administrators can invite a user to more than one tenant.
* A user who has access to multiple tenants has to log in only once, and can then switch from one tenant to another.

## How to Set Up Multi-Tenancy

To set up multi-tenancy, follow these steps:

1. Decide on the multi-tenancy mode (see below), that is, whether they want a sandbox or strict multi-tenant setup.
1. Request a multi-tenant setup from Wavefront with the following information:
   * Name of the tenants to create (one tenant per team).
   * Email addresses of the administrators of reach team.
   * Identity provider details.
   * Choose multi-tenancy mode (see below).
1. Wavefront administrators set these up accordingly:
   * Create a tenant for each supplied team.
   * Create respective team admin users with "user_management" privileges.
   * Tie all the tenants under the given provider.
   * Set multi-tenancy mode of the provider.
1. Per tenant(team) admin users of your company can now login and start inviting users to their respective tenants. They can also designate other users as admins by adding user_management privilege to a invited user.

## How Users Experience Multi-Tenant SSO

After successful authentication from corporate id provider:

   * If a user is part of only one team, that user is logged in to the corresponding tenant upon authentication.
   
   * If a user is part of more than one team, that is, the user has been invited to more than one tenant, the user is logged in to the most recent tenant the user logged in. The user can switch to the other teams by selecting the login for the available tenants from the gear icon.

After a user has been successfully logged in, theuser has appropriate privileges inside the team as assigned by the team admin. See [authorization](permissions_overview.html) for details. Note that a user can have different set of provileges in different teams the user is member of, as assigned by respective admin user.


## Multi-Tenant Modes

When administrators request a multi-tenant setup, they can request sandbox mode or strict mode.

### Sandbox Mode (Default Login Enabled)

In sandbox mode, any user who is authenticated by the corporate SSO identity provider is given access to a default tenant.
* If that user was not invited to any of the tenants, Wavefront creates a user on the default tenant.
* If the user has been invited to an existing tenant, the user is given access to that tenant, and Wavefront does not create a user on the default tenant.

### Strict Mode (Default Login Disabled)

In strict mode, users can access Wavefront only if they've been invited to one or more of the tenants.
