---
title: Subscription Types
keywords: 
tags: [introduction]
sidebar: doc_sidebar
permalink: subscriptions-differences.html
summary: Learn about the VMware Aria Operations for Applications subscription types and how they differ.
---

Operations for Applications subscriptions are two types: VMware Cloud services subscriptions and original subscriptions.

## Why the Two Subscription Types Differ?

Starting June 26, 2023, Operations for Applications is a service on the VMware Cloud services platform. After this date, all **new** Operations for Applications subscriptions are onboarded to the [VMware Cloud services platform](https://console.cloud.vmware.com/). All **original** subscriptions, that means existing ones, remain as is until they migrate to VMware Cloud services. We are in the process of incrementally migrating original subscriptions to VMware Cloud services.

VMware Cloud services provides single sign-on (SSO) and identity access management (IAM) to your entire VMware Cloud services portfolio across hybrid and native public clouds, including Operations for Applications. Therefore, there are differences in the experience for VMware Cloud services subscribers and original subscribers. 

## General UI Differences

* The menu bar differs, because the VMware Cloud services toolbar is added to the top.

  ![An image showing the differences in the menu bar, which are listed below.](images/new-vs-original-toolbar.png)

  From the VMware Cloud services toolbar, you can:
    1. Switch between tenants (service instances) in a multi-tenant Operations for Applications environment.
    1. See the developer tools.
    1. See notifications from VMware Cloud services.
    1. Manage your VMware Cloud services account and switch to other organizations.
    1. Go to the VMware Cloud Services Console and switch to other service subscriptions.

* The **Accounts**, **SAML IdP Admin**, and **API token** permissions don't exist for Operations for Applications subscriptions that are onboarded to VMware Cloud services, because all of the authorization and authentication tasks requiring these permissions are done by using the VMware Cloud Services Console. For information about the basics for administering your Operations for Applications service running on the VMware Cloud services platform, see [Getting Started with Operations for Applications on VMware Cloud Services](csp_getting_started.html).

* When viewing their own user account settings in the Operations for Applications UI, VMware Cloud services subscribers do not have the **Groups, Roles & Permissions** and the **API Access** tabs (1) and can no longer change their password from the Operations for Applications UI (2), because this is done from the VMware Cloud Services Console.

  ![An image showing that the tabs mentioned above and the change password link are removed from the UI for new subscribers.](images/new-vs-original.png)

* The gear icon menu also differs, because many of the tasks for VMware Cloud services subscribers are done by using the VMware Cloud Services Console. 

  For example, for Super Admin users with Super Admin mode enabled, the gear icon menu looks like this:
 
  ![An image showing the differences in the gear icon menu, which are listed below.](images/new-vs-original-menu.png)

   1. The tenant name is missing, because it is shown in the VMware Cloud Services Console when you launch the service instance. In a multi-tenant environment, switching between tenants is done from the top-left drop-down menu on the menu bar.
   1. The **Self Service SAML** menu item is missing, because the enterprise federation setup is done from the VMware Cloud Services Console.
   1. The **Accounts** option is also no longer needed, because account management is done in the VMware Cloud Services Console.
   1. The **Super Admin** menu item is replaced with **Orphaned Objects**, because Super Admin users can no longer invite new Super Admin users, but they can still see and recover orphaned objects, such as orphan dashboards and alerts.
   1. The **Sign Out** menu item is missing, because signing out is done from the User/Organization drop-down menu on the top-right of the menu bar.

* The **Super Admin** page is replaced with **Orphaned Objects**, because Super Admin users no longer can invite new Super Admin users, but they can still see and recover orphaned objects, such as orphan dashboards and alerts.

    ![An image showing the differences in the add new proxy page.](images/new-vs-original-super-admin.png)

* When adding a Wavefront proxy, VMware Cloud services subscribers have two options for the proxy authorization to Operations for Applications. They can configure the proxy with a VMware Cloud services API token or server to server OAuth app.

    ![An image showing the differences in the add new proxy page.](images/new-vs-original-proxy.png)

* The options for adding default groups for new user and service accounts as well as for setting the default permissions for new user accounts are removed, because VMware Cloud services subscribers manage users and roles through the VMware Cloud Services Console. Users with the **Super Admin** service role can still set the default display settings and language preferences for new users on the **Organization Settings** page.

  ![An image showing that the options mentioned above are removed from the UI for new subscribers.](images/new-vs-original-new-accounts-defaults.png)

* The option for granting service accounts with access to new dashboards and alerts is removed. You grant access to objects when you create a server to server app and define its scope in the VMware Cloud Services Console. Scopes provide a way to implement control over what areas in an organization your client can access - specifically which role in an organization, and what services as well as the level of permissions.

  ![An image showing that the option to grant access to service accounts is removed from the UI for new subscribers.](images/new-vs-original-org-settings-security.png)

  For information, see:
  
  * [Managing Access to Dashboards and Alerts](access.html)
  * [Managing Access to Dashboards and Alerts in Operations for Applications on VMware Cloud Services](csp_access.html)


## Differences by Area

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="22%">Area</th><th width="39%">VMware Cloud Services Subscription</th><th width="39%">Original Subscription</th></tr>
</thead>
<tr>
<td>User Login
</td>
<td>Users log in to their Operations for Applications service instance through the VMware Cloud Services Console. For details, see <a href="csp_sign_up_or_log_in.html#log-in-from-the-vmware-cloud-services-console">Log In from the VMware Cloud Services Console</a>.
</td>
<td>Users log in to their Operations for Applications service instance by using the URL of the service cluster, <code>https://&lt;your_instance&gt;.wavefront.com</code>.
</td>
</tr>
<tr>
<td>Roles and Permissions Management
</td>
<td>
<p><strong>Who</strong>: Users with the VMware Cloud <strong>Organization Owner</strong> or <strong>Organization Administrator</strong> role.</p>
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: Permissions can be assigned only to roles. Roles can be assigned to users, groups, API tokens, and server to server apps. There are built-in Operations for Applications service roles, which are not editable. Custom roles can be created and assigned with permissions for one or more services. For details, see:
<ul>
<li><a href="csp_users_roles.html#manage-roles">Manage Roles</a></li>
<li><a href="csp_users_roles.html">Operations for Applications Permissions in VMware Cloud Services</a></li>
</ul></p>
</td>
<td><strong>Who</strong>: Users with the <strong>Accounts</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Permissions can be assigned to roles as well as to individual users and service accounts. Roles can be assigned to user accounts, service accounts, and groups. For details, see:</p>
<ul>
<li><a href="users_roles.html#create-a-role">Create a Role</a></li>
<li><a href="users_roles.html#grant-or-revoke-account-permissions-explicitly">Grant or Revoke Account Permissions</a></li>
<li><a href="permissions_overview.html">Permissions Reference</a></li>
</ul>
</td>
</tr>
<tr>
<td>User Accounts Management
</td>
<td>
<strong>Who</strong>: Users with the VMware Cloud <strong>Organization Owner</strong> or <strong>Organization Administrator</strong> role.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: To add a user to your Operations for Applications service instance, you must assign that user:
<ol><li>An organization role for the VMware Cloud organization running the service.</li>
<li>An Operations for Applications service role for your service instance or a custom role with an Operations for Applications permission.</li></ol>
For details, see <a href="csp_user_management.html">Manage User Accounts</a>.</p>
</td>
<td>
<strong>Who</strong>: Users with the <strong>Accounts</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: You can invite new users with or without assigning roles and permissions. For details, see <a href="user-accounts.html">Manage User Accounts</a>.</p>
</td>
</tr>
<tr>
<td>Self-Service SAML SSO Setup</td>
<td>
<strong>Who</strong>: A user with the VMware Cloud <strong>Organization Owner</strong> role together with an <strong>Enterprise Administrator</strong>.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: The VMware Cloud <strong>Organization Owner</strong> user kicks off the self-service federation workflow on behalf of the VMware Cloud organization and invites the <strong>Enterprise Administrator</strong> to complete the setup. For details, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html">Setting Up Enterprise Federation with VMware Cloud Services Console</a> in the VMware Cloud services documentation.</p>
</td>
<td>
<strong>Who</strong>: Users with the <strong>SAML IdP Admin</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Operations for Applications includes predefined authentication integrations. For details, see <a href="auth_self_service_sso.html">Single-Tenant Authentication and Self-Service SAML SSO</a>.</p>
</td>
</tr>
<tr>
<td>Service Accounts and Server to Server Apps Management
</td>
<td>
<p><strong>Who</strong>: Users with the VMware Cloud <strong>Organization Owner</strong> role or the <strong>Developer</strong> additional role.</p>
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: Server to server apps use OAuth credentials to retrieve API tokens for authentication. Server to server apps are assigned with organization and service roles. Server to server apps can be shared between multiple VMware Cloud organizations. For details, see <a href="csp_server_to_server_apps.html">Manage Server to Server Apps</a>.</p>
</td>
<td>
<p><strong>Who</strong>: Users with the <strong>Accounts</strong> permission.</p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Service accounts authenticate with API tokens. Service accounts can be assigned with roles and permissions, as well as can be added to groups. For details, see <a href="service-accounts.html">Manage Service Accounts</a>.</p>
</td>
</tr>
<tr>
<td>Groups Management
</td>
<td>
<strong>Who</strong>: Users with the VMware Cloud <strong>Organization Owner</strong> or <strong>Organization Administrator</strong> role.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: A group of users can be assigned with organization and service roles. A group can be shared with other VMware Cloud organizations. In a federated environment, you can add enterprise groups from your corporate domain. For details, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-0BD8A07B-C3C0-4220-8CD0-18FA070D3DAD.html">How do I work with groups</a> in the VMware Cloud services documentation.</p>
</td>
<td><strong>Who</strong>: Users with the <strong>Accounts</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: A group of user and service accounts can be assigned with one or more roles. For details, see <a href="users_roles.html#create-a-group">Create a Group</a>.</p>
</td>
</tr>
<tr>
<td>Generating API Tokens
</td>
<td>
<p><strong>Who</strong>: All users.</p>
<p><strong>Where</strong>: In the Cloud Services Console user interface.</p>
<p><strong>How</strong>: Each user can generate VMware Cloud services API tokens for their user account. For access management, an API token must be assigned with roles from the list of roles that the user owns - organization roles, service roles, and custom roles.</p>
<p>To access the Operations for Applications REST API, the VMware Cloud services API token must be assigned with an Operations for Applications service role or a custom role with an Operations for Applications permission.</p>
<p>For details and instructions, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html">How do I generate API tokens</a> in the VMware Cloud services documentation.</p>
</td>
<td>
<p><strong>Who</strong>: Depends on whether the API token is associated with a user account or a service account.
<ul><li>For API tokens associated with a user account, the corresponding user who must have the <strong>API Tokens</strong> permission.</li>
<li>For API tokens associated with service accounts, the users with the <strong>Accounts</strong> permission.</li></ul></p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>:<ul>
<li>A user with the <strong>API Tokens</strong> permission can generate Operations for Applications API tokens for their own user account.</li>
<li>Users with the <strong>Accounts</strong> permission can generate Operations for Applications API tokens for service accounts.</li></ul>
Each API token inherits the permissions of its associated user or service account. For details, see <a href="api_tokens.html">Manage API Tokens</a>.</p>
</td>
</tr>
<tr>
<td>API Tokens Management</td>
<td>
<p><strong>Who</strong>:
<ul><li>For API tokens associated with a user account, the corresponding user.</li>
<li>For all API tokens in the VMware Cloud organization if activated for Identity Governance and Administration (IGA), the users with the VMware Cloud <strong>Organization Owner</strong> role.</li></ul></p>
<p><strong>Where</strong>: In the Cloud Services Console user interface.</p>
<p><strong>How</strong>:<ul><li>All users can view and revoke their own tokens. For details, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-1BA71988-387C-42E1-8C98-EE2C1370826B.html">How do I manage my API tokens</a> in the VMware Cloud services documentation.</li>
<li>Users with the VMware Cloud <strong>Organization Owner</strong> role can monitor the API tokens created in the organization and can set constraints for idle and maximum Time to live (TTL) for all newly created tokens. For details and instructions, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-3A9C29E0-460B-4586-B51A-084443A960D0.html">How do I manage API tokens in my Organization</a> in the VMware Cloud services documentation.</li></ul></p>
</td>
<td>
<strong>Who</strong>:
<ul><li>For API tokens associated with a user account, the corresponding user.</li>
<li>For all API tokens in the Operations for Applications environment, the users with the <strong>Accounts</strong> permission.</li></ul>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>:<ul><li>All users can view and revoke their own tokens. For details, see <a href="api_tokens.html#generate-and-manage-the-api-tokens-for-your-user-account">Generate and Manage the API Tokens for Your User Account</a>.</li>
<li>Users with the <strong>Accounts</strong> permission can view and revoke any API token in the environment. For details, see <a href="api_tokens.html#view-and-manage-the-api-tokens-in-your-organization">View and Manage the API Tokens in Your Organization</a>.</li></ul></p>
</td>
</tr>
<tr>
<td>Operations for Applications Organization Settings</td>
<td>
<p><strong>Who</strong>: Users with the <strong>Super Admin</strong> Operations for Applications service role and Super Admin mode enabled.</p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Super Admin</strong> service role, you can:
<ul>
<li>Default display settings for new accounts, such as getting started progress and default dashboard display.</li>
<li>Default query language preferences and optionally, allow users to write queries in PromQL. For details, see <a href="wavefront_prometheus.html#set-promql-organization-settings-administrator-only">Set PromQL Organization Settings (Administrator Only)</a>.</li>
<li>Logs settings, if Logs (Beta) is enabled for your cluster. For details, see <a href="logging_logs_settings.html">Customize Logs Settings</a>.</li>
<li>Access to newly created dashboards and alerts. For details, see <a href="csp_access.html">Managing Access to Dashboards and Alerts</a></li>
</ul></p>
</td>
<td>
<p><strong>Who</strong>: Users with the <strong>Accounts</strong> permission.</p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Accounts</strong> permission, you can:
<ul>
<li>Default display settings, such as getting started progress and default dashboard display.</li>
<li>Default query language preferences and optionally, allow users to write queries in PromQL. For details, see <a href="wavefront_prometheus.html#set-promql-organization-settings-administrator-only">Set PromQL Organization Settings (Administrator Only)</a>.</li>
<li>Default groups for new user accounts. New users are assigned to the Everyone system group and to all additional default groups that you specify. For details, see <a href="user-accounts.html#set-the-default-user-group-for-new-users">Set the Default User Group for New Users</a>.</li>
<li>Default groups for new service accounts. New service accounts are assigned to the Service Accounts system group and to all additional default groups that you specify. For details, see <a href="service-accounts.html#set-the-default-service-accounts-group-for-new-service-accounts">Set the Default Service Accounts Group for New Service Accounts</a>.</li>
<li>Default permissions for new user accounts. These permissions don't apply to service accounts. For details, see <a href="user-accounts.html#set-default-permissions-for-new-users">Set Default Permissions for New Users</a>.</li>
<li>Logs settings, if Logs (Beta) is enabled for your cluster. For details, see <a href="logging_logs_settings.html">Customize Logs Settings</a>.</li>
<li>Access to newly created dashboards and alerts. For details, see <a href="access.html">Managing Access to Dashboards and Alerts</a>.</li>
</ul></p>
</td>
</tr>
<tr>
<td>Wavefront Proxy Authentication
</td>
<td><p><strong>Who</strong>:<ul><li>For proxy installation, users with the <strong>Proxies</strong> Operations for Applications service role or a custom role with the <strong>Proxies</strong> permission.</li><li>For creating server to server OAuth apps, users with the VMware Cloud <strong>Organization Owner</strong> role or <strong>Developer</strong> additional.</li></ul></p>
<p><strong>Where</strong>:<ul><li>For proxy installation, in the Operations for Applications user interface.</li><li>For generating an API token or creating a server to server OAuth app, in the VMware Cloud Services Console.</li></ul></p>
<p><strong>How</strong>: As a user with the <strong>Proxies</strong> permission, you must configure the proxy to authenticate to Operations for Applications with a VMware Cloud services API token that have the <strong>Proxies</strong> service role. There are two supported authentication types:
<ul><li>The proxy can use the credentials of a server to server <strong>OAuth app</strong> - ID and secret, together with the VMware Cloud organization ID. This way, the API token is directly issued to the proxy.</li>
<li>The proxy can use the API token of an active user account.</li></ul>
For details, see <a href="proxies_installing.html#proxy-authentication-types">Proxy Authentication Types</a>.</p>
</td>
<td><p><strong>Who</strong>:Users with the <strong>Proxies</strong> permission.</p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Proxies</strong> permission, you must configure the proxy to authenticate to Operations for Applications with an Operations for Applications API token that have the <strong>Proxies</strong> permission. For details, see <a href="proxies_installing.html#install-a-proxy-from-the-ui">Install a Proxy from the UI</a>.</p>
</td>
</tr>
<tr>
<td>Accounts and Groups Ingestion Policies</td>
<td><p><strong>Who</strong>: Users with the <strong>Ingestion Policies</strong> Operations for Applications service role or a custom role with the <strong>Ingestion Policies</strong> permission.</p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Ingestion Policies</strong> permission:<ul>
<li>When you create an ingestion policy with the Accounts scope, you can assign user accounts and server to server apps.</li>
<li>When you create an ingestion policy with the Groups scope, the groups that you can search for and enter are defined in VMware Cloud services.</li></ul></p>
</td>
<td><p><strong>Who</strong>: Users with the <strong>Ingestion Policies</strong> permission.</p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Ingestion Policies</strong> permission:<ul>
<li>When you create an ingestion policy with the Accounts scope, you can assign user accounts and server accounts.</li>
<li>When you create an ingestion policy with the Groups scope, the groups that you can search for and enter are defined in Operations for Applications.</li></ul></p>
<p>For details, see <a href="ingestion_policies.html#step-1-specify-the-scope-and-pps-limit">Step 1: Specify the Scope and PPS Limit</a>.</p>
</td>
</tr>
<tr>
<td>Groups and Roles Metrics Security Rules</td>
<td><p><strong>Who</strong>: Users with the <strong>Metrics</strong> Operations for Applications service role or a custom role with the <strong>Metrics</strong> permission.</p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Metrics</strong> permission, when you create a metric security rule based on groups or roles, the groups and the roles that you can search for and enter are defined in VMware Cloud services. For details, see <a href="csp_metrics_security.html#create-one-or-more-rules">Create One or More Rules</a>.</p>
</td>
<td><p><strong>Who</strong>: Users with the <strong>Metrics</strong> permission.</p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Metrics</strong> permission, when you create a metric security rule based on group or role, the groups and the roles that you can search for and enter are defined in Operations for Applications. For details, see <a href="metrics_security.html#create-one-or-more-rules">Create One or More Rules</a>.</p>
</td>
</tr>
</tbody>
</table>