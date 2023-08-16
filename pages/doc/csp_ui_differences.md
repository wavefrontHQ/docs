---
title: Differences Between Original and VMware Cloud Services Subscriptions
keywords: 
tags: [introduction]
sidebar: doc_sidebar
permalink: csp-ui-differences.html
summary: Learn about the differences in the UI of VMware Aria Operations for Applications original subscriptions and VMware Cloud services subscriptions.
---

Operations for Applications subscriptions are two types: original subscriptions and VMware Cloud services subscriptions.

## Menu Bar

The menu bar differs, because the VMware Cloud services toolbar is added to the top.

  ![An image showing the differences in the menu bar, which are listed below.](images/new-vs-original-toolbar.png)

  From the VMware Cloud services toolbar, you can:
    1. Switch between tenants (service instances) in a multi-tenant Operations for Applications environment.
    1. See notifications from VMware Cloud services.
    1. Manage your VMware Cloud services account and switch to other organizations.
    1. Go to the VMware Cloud Services Console and switch to other service subscriptions.

## Own User Account Settings

When viewing their own user account settings in the Operations for Applications UI, VMware Cloud services subscribers do not have the **Groups, Roles & Permissions** and the **API Access** tabs (1) and can no longer change their password from the Operations for Applications UI (2), because this is done from the VMware Cloud Services Console.

  ![An image showing that the tabs mentioned above and the change password link are removed from the UI for new subscribers.](images/new-vs-original.png)


## Gear Icon Menu

The gear icon menu also differs, because many of the tasks for VMware Cloud services subscribers are done by using the VMware Cloud Services Console. 

  For example, for Super Admin users with Super Admin mode enabled, the gear icon menu looks like this:
 
  ![An image showing the differences in the gear icon menu, which are listed below.](images/new-vs-original-menu.png)

   1. The tenant name is missing, because it is shown in the VMware Cloud Services Console when you launch the service instance. In a multi-tenant environment, the current tenant is shown on the top-left of the menu bar and you can click it to switch between tenants.
   1. The **Self Service SAML** menu item is missing, because the enterprise federation setup is done from the VMware Cloud Services Console.
   1. The **Accounts** option is also no longer needed, because account management is done in the VMware Cloud Services Console.
   1. The **Super Admin** menu item is replaced with **Orphaned Objects**, because Super Admin users can no longer invite new Super Admin users, but they can still see and recover orphaned objects, such as orphan dashboards and alerts. See the following bullet point.
   1. The **Sign Out** menu item is missing, because signing out is done from the User/Organization drop-down menu on the top-right of the menu bar.

## Super Admin Page

The **Super Admin** page is replaced with **Orphaned Objects**, because Super Admin users no longer can invite new Super Admin users, but they can still see and recover orphaned objects, such as orphan dashboards and alerts.

  ![An image showing the differences in the add new proxy page.](images/new-vs-original-super-admin.png)

## Add New Wavefront Proxy Page

When adding a Wavefront proxy, VMware Cloud services subscribers have two options for the proxy authorization to Operations for Applications. They can configure the proxy with a VMware Cloud services API token or with server to server OAuth app credentials.

  ![An image showing the differences in the add new proxy page.](images/new-vs-original-proxy.png)

## Organization Settings Page

The options for adding default groups for new user and service accounts as well as for setting the default permissions for new user accounts are removed, because VMware Cloud services subscribers manage users and roles through the VMware Cloud Services Console. Users with the **Super Admin** service role can still set the default display settings and language preferences for new users on the **Organization Settings** page.

  ![An image showing that the options mentioned above are removed from the UI for new subscribers.](images/new-vs-original-new-accounts-defaults.png)

## Metrics Security Policy Rule Creation Page

The option for creating a metrics security policy rule based on roles is removed, because VMware Cloud services subscribers can block or allow access to certain metrics only based on accounts (user accounts and service accounts) and groups.

  ![An image showing that the Roles option is removed from the UI for new subscribers.](images/new-vs-original-metricspolicy.png)
