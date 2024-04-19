---
title: UI Differences Between Original and VMware Cloud Services Subscriptions
keywords: 
tags: [introduction]
sidebar: doc_sidebar
permalink: csp-ui-differences.html
summary: Learn about the differences in the UI of Tanzu Observability original subscriptions and VMware Cloud services subscriptions.
---

VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) subscriptions are two types: original subscriptions and VMware Cloud services subscriptions.

## Menu Bar

The menu bar differs, because the VMware Cloud services toolbar is added to the top.

  ![An image showing the differences in the menu bar, which are listed below.](images/new-vs-original-toolbar.png)

  From the VMware Cloud services toolbar, you can:

  1. Switch between tenants (service instances) in a multi-tenant Tanzu Observability environment.
  1. See notifications from VMware Cloud services.
  1. Manage your VMware Cloud services account and switch to other organizations.
  1. Go to the VMware Cloud Services Console and switch to other service subscriptions.

## Own User Account Settings

When viewing their own user account settings in the Tanzu Observability UI, VMware Cloud services subscribers do not have the **Groups, Roles & Permissions** and the **API Access** tabs (1) and can no longer change their password from the Tanzu Observability UI (2), because this is done from the VMware Cloud Services Console.

  ![An image showing that the tabs mentioned above and the change password link are removed from the UI for new subscribers.](images/new-vs-original.png)


## Gear Icon Menu

The gear icon menu also differs, because many of the tasks for VMware Cloud services subscribers are done by using the VMware Cloud Services Console. 

  For example, for **Super Admin** users with **Super Admin** mode enabled, the gear icon menu looks like this:
 
  ![An image showing the differences in the gear icon menu, which are listed below.](images/new-vs-original-menu.png)

   1. The tenant name is missing, because it is shown in the VMware Cloud Services Console when you launch the service instance. In a multi-tenant environment, the current tenant is shown on the top-left of the menu bar and you can click it to switch between tenants.
   1. The **Self Service SAML** menu item is missing, because the enterprise federation setup is done from the VMware Cloud Services Console.
   1. The **Accounts** menu item is available only for a **limited number** of VMware Cloud services subscriptions. See the section below.
   1. The **Super Admin** menu item is replaced with **Orphaned Objects**, because Super Admin users can no longer invite new Super Admin users, but they can still see and recover orphaned objects, such as orphan dashboards and alerts. See the following bullet point.
   1. The **Sign Out** menu item is missing, because signing out is done from the User/Organization drop-down menu on the top-right of the menu bar.


## Accounts Page

Most of the identity and access management tasks for VMware Cloud services subscribers are done by using the VMware Cloud Services Console. Therefore, if you are a user with the **Admin** service role assigned (this role partially covers the **Accounts** permission for original subscriptions), when you click the gear icon on the toolbar and select **Accounts**, you will see only the **Service Accounts** and the **API Tokens** tabs.

{% include warning.html content="You should incrementally switch to using [server to server OAuth apps](csp_server_to_server_apps.html) and [VMware Cloud services API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-3A9C29E0-460B-4586-B51A-084443A960D0.html). Service accounts and the API tokens associated with them will be deprecated in the future." %}

<!--Include this as a first sentence if we create the flag: This page is available only for a **limited number** of VMware Cloud services subscriptions.-->

  ![An image showing the differences in the Accounts menu and the Service Accounts tab.](images/new-vs-original-accounts.png)

  1. The **User Accounts**, **Groups**, and **Roles** tabs are missing, because the management of users, groups, and roles is done from the VMware Cloud Services Console. By using the **Accounts** menu item, the VMware Cloud services subscribers can manage only service accounts and the Tanzu Observability API tokens associated with them.
  1. VMware Cloud services subscribers cannot assign roles to service accounts and also can’t add them to groups. For VMware Cloud services subscriptions, service accounts are local entities in Tanzu Observability, while roles and groups management is centralized in VMware Cloud services. VMware Cloud services subscribers can grant only permissions to service accounts.
  1. Filtering the service accounts can be done only by permissions, because they don’t have roles and don’t belong to groups.

## Super Admin Page

The **Super Admin** page is replaced with **Orphaned Objects**, because Super Admin users no longer can invite new Super Admin users, but they can still see and recover orphaned objects, such as orphan dashboards and alerts.

  ![An image showing the differences in the add new proxy page.](images/new-vs-original-super-admin.png)

## Add New Wavefront Proxy Page

When adding a Wavefront proxy, VMware Cloud services subscribers have two options for the proxy authorization to Tanzu Observability. They can configure the proxy with server to server OAuth app credentials or with a VMware Cloud services API token.

  ![An image showing the differences in the add new proxy page.](images/new-vs-original-proxy.png)

## Organization Settings Page

The options for adding default groups for new user and service accounts as well as for setting the default permissions for new user accounts are removed, because VMware Cloud services subscribers manage users and roles through the VMware Cloud Services Console. Users with the **Super Admin** or **Admin** service role can still set the default display settings and language preferences for new users on the **Organization Settings** page.

  ![An image showing that the options mentioned above are removed from the UI for new subscribers.](images/new-vs-original-new-accounts-defaults.png)

## Metrics Security Policy Rule Creation Page

The option for creating a metrics security policy rule based on roles is removed, because VMware Cloud services subscribers can block or allow access to certain metrics only based on accounts (user accounts and service accounts) and groups.

  ![An image showing that the Roles option is removed from the UI for new subscribers.](images/new-vs-original-metricspolicy.png)

## Alert Viewer and Alert Editor

The Related Firing Alerts pane in the top right of the Alert Viewer is replaced with the Related Insights pane, because VMware Cloud services subscribers have a bidirectional link with VMware Tanzu Insights. 

  ![An image showing that the Roles option is removed from the UI for new subscribers.](images/new-vs-original-related-alerts.png)

The Related Insights pane is also available in the Alert Editor for VMware Cloud services subscribers.

