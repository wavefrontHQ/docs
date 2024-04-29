---
title: Multi-Tenant Authentication
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: authentication.html
summary: Learn how to enable multi-tenant authentication.
---

{% include note.html content="Starting July 3, 2023, VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) is a service on the VMware Cloud services platform. The content in this chapter is valid for **original** subscribers. For VMware Cloud services subscriptions, see [Authentication Model in Tanzu Observability on VMware Cloud Services](csp_authentication.html)."%}

Most of our customers use [single-tenant authentication](auth_self_service_sso.html). If your company wants to set up different tenants for different teams, Tanzu Observability supports multi-tenancy.

{% include note.html content="Switching tenants in multi-tenant environments require [the extra steps listed below](#point-a-proxy-to-a-different-tenant-in-a-multi-tenant-environment)." %}


## Multi-Tenant Authentication

Several of our customers have asked for an environment that supports separate tenants for different teams. For example, here at VMware it made sense to keep the VMware vSphere team separate from the VMware NSX team -- both teams use Tanzu Observability. This separation of teams, called multi-tenancy, works like this:

* The administrator at the customer site requests tenants from our Technical Support team and provides the tenant administrator emails and other information such as the IdP.
* After our Technical Support team has set up the tenants, each tenant administrator (a Super Admin or a user with the **Accounts** permission) invites users to that tenant.
* A Super Admin or a user with the **Accounts** permission can invite users to multiple tenants.
* After logging in to the service instance, users who have been invited to multiple tenants:
    - Are directed to the last tenant they used.
    - Can switch to other tenants from the gear icon <i class="fa fa-cog"/> on the toolbar without having to log in again.

Multi-tenancy must be set up in collaboration with our Technical Support team, as discussed next.

## How to Set Up Multi-Tenancy

Multi-tenancy is set up jointly by the administrator at the customer site and our Technical Support team:

1. The administrator decides on the multi-tenancy mode (see below), that is, sandbox or strict multi-tenant mode.
1. The administrator requests a multi-tenant setup from our Technical Support team, providing the following information:
   * Names of the tenants to create (one tenant per team).
   * Email addresses of the administrators of each team.
   * IdP details.
   * Sandbox mode or strict mode (see below).
1. Our Technical Support team sets up the multi-tenant environment based on the request:
   * Enables multi-tenancy for the customer.
   * Creates a tenant for each team specified by the customer.
   * Points each tenant to the customer's IdP.
   * Creates tenant administrator users with the **Accounts** permission on each tenant.
1. The administrator at the customer site and the newly specified tenant administrator users with the **Accounts** permission can then:
  * Log in to the tenant.
  * [Invite users](user-accounts.html#create-edit-and-delete-user-accounts) to the tenant and assign permissions for that tenant.
  * Make other users tenant administrators by granting the [**Accounts** permission](permissions_overview.html) to those invited users.

## Multi-Tenant Modes

Administrators who request a multi-tenant setup can specify sandbox mode or strict mode.

### Sandbox Mode (Default Login Enabled)

In sandbox mode, any user who is authenticated by the corporate ID provider is given access to a default tenant.
* If the user was never invited to any of the tenants, we create a user on the default tenant.
* If the user has been invited to an existing tenant, the user is given access to that tenant, and we do not create a user on the default tenant.

### Strict Mode (Default Login Disabled)

In strict mode, users can access the environment only if they've been invited to one or more of the tenants.

## How Users Experience Multi-Tenant SSO

If your environment is set up to support multi-tenant SSO, you log in to your service instance with your SSO credentials. After successful authentication, your user experience is like this:

   * If you've been invited to only one tenant, then you are logged in to that tenant after authentication.
   * If you've been invited to more than one tenant, you are logged in to the last tenant you logged in. You can switch to the other tenants by selecting the tenant from the gear icon <i class="fa fa-cog"/> on the toolbar.
   * For each tenant, you have specific permissions. That means, for example, if you have the **Accounts** permission on Tenant A, you don't necessarily have that permission for Tenant B. See [permissions](permissions_overview.html) for details.


      {% include note.html content="You can have different sets of permissions on different tenants because each tenant administrator controls the permissions for that tenant for each user." %}

   * When you log out, the logout applies to *all* tenants.

## Point a Proxy to a Different Tenant in a Multi-Tenant Environment

If you are an administrator in a multi-tenant environment, you sometimes have to point your proxy or proxies to a different tenant. Follow these steps:

1. Delete the `.wavefront_id` file. The precise name of the file might differ. It's `/usr/local/etc/wavefront/wavefront-proxy/.wavefront_id` in a Mac environment with no customizations.
2. [Restart the Wavefront proxy](proxies_installing.html#start-and-stop-a-proxy).
