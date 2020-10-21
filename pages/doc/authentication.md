---
title: Authentication with SSO Providers
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: authentication.html
summary: Learn how to enable authentication and multi-tenant authentication.
---

Wavefront supports authentication through your identity provider (IDP).
* For several popular IDPs we support integrations.
* Starting with release 2020.38, the integration includes steps for setting up [self-service SAML SSO](auth_self_service_sso.html)

Most Wavefront customers use single-tenant authentication. If your company wants to set up a different tenant for different teams, a multi-tenant setup might make sense.

**Note:** Switching tenants in multi-tenant environments requires extra steps listed below.


## Single-Tenant Authentication

Most Wavefront administrators set up authentication in their environment by setting up SSO using an identity provider (IDP). We support predefined integrations with [ADFS](adfs.html), [Azure AD](azure_ad.html), [Google](google.html), [OneLogin](onelogin.html), and [Okta](okta.html). SSO setup with other IDPs is also possible.

After a user has been successfully authenticated, administrators set the permissions for that user. [Permissions](permissions_overview.html) determine what the user can do in Wavefront.

## Multi-Tenant Authentication

Several Wavefront customers have asked for an environment that supports separate tenants for different teams. For example, here at VMware it made sense to keep the VMware vSphere team separate from the VMware NSX team -- both teams use Wavefront. We support this separation of teams, called multi-tenancy, like this:

* The administrator at the customer site requests tenants from Wavefront and provides the tenant administrator emails and other information such as the IDP.
* After Wavefront has set up the tenants, each tenant administrator invites users to that tenant.
* Administrators can invite users to multiple tenants.
* Users who have been invited to multiple tenants:
    - are directed to the last tenant they used
    - can switch to other tenants from the gear icon menu without having to log in again.

Users log in to an identity provider that administrators specify when they first get their Wavefront account. For multi-tenant authentication, we support Okta and Google IdP.

## How to Set Up Multi-Tenancy

Multi-tenancy is set up jointly by the Wavefront administrator at the customer site and the Wavefront team:

1. The administrator decides on the multi-tenancy mode (see below), that is, sandbox or strict multi-tenant mode.
1. The administrator requests a multi-tenant setup from Wavefront, providing the following information:
   * Name of the tenants to create (one tenant per team).
   * Email addresses of the administrators of each team.
   * IDP details.
   * Sandbox mode or strict mode (see below).
1. The Wavefront team sets up the multi-tenant environment based on the request:
   * Enables multi-tenancy for the customer.
   * Creates a tenant for each team specified by the customer.
   * Points each tenant to the customer's IDP.
   * Creates tenant administrator users with **Accounts, Groups & Roles** permissions on each tenant.
1. The administrator at the customer site and the newly specified tenant administrator(s) can then:
  * Log in to the tenant.
  * [Invite users](accounts.html#create-and-manage-user-accounts) to the tenant and assign permissions for that tenant.
  * Make other users tenant administrator by granting [Accounts, Groups & Roles permission](permissions_overview.html) to those invited users.

## Multi-Tenant Modes

Administrators who request a multi-tenant setup can specify sandbox mode or strict mode.

### Sandbox Mode (Default Login Enabled)

In sandbox mode, any user who is authenticated by the corporate ID provider is given access to a default tenant.
* If that user was never invited to any of the tenants, Wavefront creates a user on the default tenant.
* If the user has been invited to an existing tenant, the user is given access to that tenant, and Wavefront does not create a user on the default tenant.

### Strict Mode (Default Login Disabled)

In strict mode, users can access Wavefront only if they've been invited to one or more of the tenants.

## How Users Experience Multi-Tenant SSO

If your environment is set up to support multi-tenant SSO, you log in to Wavefront with your SSO credentials. After successful authentication, your user experience is like this:

   * If you've been invited to only one tenant, then you are logged in to that tenant after authentication.
   * If you've been invited to more than one tenant, you are logged in to the last tenant you logged in. You can switch to the other tenant(s) by selecting the tenant from the gear icon.
   * For each tenant, you have the permissions granted on that tenant. That means, for example, if you have the **Accounts, Groups & Roles** permission on Tenant A, you don't necessarily have that permission for Tenant B. See [permissions](permissions_overview.html) for details.
   **Note:** You can have different sets of permissions on different tenants because each tenant administrator controls the permissions for that tenant for each user.

   * When you log out, the logout applies to *all* tenants.

## Switching Tenants in Multi-Tenant Environments

Administrators sometimes have to switch tenants in multi-tenant environments.

1. Delete the `.wavefront_id` file. The precise name of the file might differ. It's `/usr/local/etc/wavefront/wavefront-proxy/.wavefront_id` in a Mac environment with no customizations.
2. [Restart the Wavefront proxy](proxies_installing.html#starting-and-stopping-a-proxy).
