---
title: Subscription Types
keywords: 
tags: [introduction]
sidebar: doc_sidebar
permalink: subscriptions-differences.html
summary: Learn about the VMware Aria Operations for Applications subscription types and how they differ.
---

Operations for Applications subscriptions are two types: trial and paid. After your 30-day free trial expires, you can [upgrade from trial to paid](upgrade_and_purchase.html).

## Why New and Original Subscriptions Differ?

Starting June 1-st, 2023, all **new** Operations for Applications subscriptions are onboarded to the [VMware Cloud services platform](https://console.cloud.vmware.com/). All **original** subscriptions, that means existing ones, remain as is.

VMware Cloud services provides single sign-on (SSO) and identity access management (IAM) to your entire VMware Cloud services portfolio across hybrid and native public clouds, including Operations for Applications. Therefore, there are differences in the experience for **new** and **original** subscribers. 

## General UI Differences

* Permissions such as **Accounts**, **SAML IdP Admin**, and **API token** don't exist for **new** Operations for Applications subscriptions that are onboarded to VMware Cloud services, because all of the administration tasks requiring these permissions are done by using the VMware Cloud Services Console. For information about the basics for administering your Operations for Applications service running on the VMware Cloud services platform, see [Getting Started with Operations for Applications on VMware Cloud Services](csp_getting_started.html).

* When you customize your own account settings in the Operations for Applications UI, new subscribers do not see the **Groups, Roles&Permissions** and the **API Access** tabs (1) and can no longer change their password from the Operations for Applications UI (2), because this is done from the VMware Cloud Services Console.

  ![An image showing that the tabs mentioned above and the change password link are removed from the UI for new subscribers.](images/new-vs-original.png)

* The gear icon menu also differs, because many of the tasks for **new** subscribers are done by using the VMware Cloud Services Console. 

  For example, for Super Admins with Super Admin mode enabled, the gear icon menu looks like this:
 
  ![An image showing the differences in the gear icon menu, which are listed below.](images/new-vs-original-menu.png)

   * The **Self Service SAML** option is missing, because the configuration happens in the VMware Cloud Services Console.
   * The **Accounts** option is also no longer needed, because account management is done in the VMware Cloud Services Console.
   * The **Usage and Subscriptions** and **Ingestion Policies** menu items are combined in the **Usage and Subscriptions** menu item. 
      *Margarita -- will update this when we have a stable test env. Currently, I have listed all differences and documented what I see so that we don't forget to update anything.*
   * The **Super Admin** menu item is missing, because Super Admins can invite new Super Admin users by using the VMware Cloud Services Console. 
   * There is a new **Orphaned Objects** menu item that allows Super Admins to see and recover orphan dashboards or alerts.
   * The **Sign Out** menu item is missing, because signing out of Operations for Applications can be done from the VMware Cloud Services Console.

* Users with the **Accounts** permission still can set the default settings for new users and modify access to new dashboards and alerts from the **Organization Settings** page, but some of the options are removed:

   * The options for adding default groups for new user and service accounts, as well as for setting the default permissions for new user accounts are removed, because these operations are done through the VMware Cloud Services Console.

     ![An image showing that the options mentioned above are removed from the UI for new subscribers.](images/new-vs-original-new-accounts-defaults.png)

   * The option for granting access to new dashboards and alerts to service accounts is removed. You grant access to  objects when you create a `Server to server app` and define its scope in the VMware Cloud Services Console. Scopes provide a way to implement control over what areas in an Organization your client can access - specifically which role in an Organization, and what services and the level of permissions.

     ![An image showing that the option to grant access to service accounts is removed from the UI for new subscribers.](images/new-vs-original-org-settings-security.png)

  For information, see:
  
  * [Managing Access to Dashboards and Alerts](access.html)
  * [Managing Access to Dashboards and Alerts in Operations for Applications on VMware Cloud Services](csp_access.html)

* Toolbar
  
  *Margarita -- TBD*


## Differences by Area

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="22%">Area</th><th width="39%">New Subscribers</th><th width="39%">Original Subscribers</th></tr>
</thead>
<tr>
<td>Role Management
</td>
<td>
<strong>Who</strong>: All VMware Cloud <strong>Organization Owners</strong> or <strong>Organization Administrators</strong>.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p>For details, see <a href="csp_users_roles.html#manage-roles">Manage Roles</a>.</p>
</td>
<td>
<strong>Who</strong>: Operations for Applications users with the <strong>Accounts</strong> permission can create roles and assign roles to a group.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: For details, see <a href="users_roles.html#create-a-role">Create a Role</a>.</p>
</td>
</tr>
<tr>
<td>Group Management
</td>
<td>
<strong>Who</strong>: VMware Cloud <strong>Organization Owners</strong> or <strong>Organization Administrators</strong>.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p>For details, see <a href="csp_users_roles.html#manage-user-groups">Manage Groups</a>.</p>
</td>
<td><strong>Who</strong>: Operations for Applications users with the <strong>Accounts</strong> permission can create and manage groups.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: For details, see <a href="users_roles.html#create-a-group">Create a Group</a>.</p>
</td>
</tr>
<tr>
<td>Permissions
</td>
<td>
<strong>Who</strong>: VMware Cloud <strong>Organization Owners</strong> or <strong>Organization Administrators</strong>.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: Permissions are assigned to roles in the VMware Cloud Services Console and the roles can be assigned to users, groups, or server to server apps. For details see:</p>
<ul><li><a href="csp_users_roles.html">Manage Users of Operations for Applications on VMware Cloud Services</a></li>
<li><a href="csp_server_to_server_apps.html#how-server-to-server-apps-work">How Server to Server Apps Work</a></li>
<li><a href="csp_users_roles.html">Operations for Applications Permissions in VMware Cloud Services</a></li>
</ul>
</td>
<td><strong>Who</strong>: Operations for Applications users with the <strong>Accounts</strong> permission can grant or revoke permissions.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: For details, see:</p>
<ul>
<li><a href="users_roles.html#grant-or-revoke-account-permissions-explicitly">Grant or Revoke Account Permissions</a></li>
<li><a href="permissions_overview.html">Permissions Reference</a></li>
</ul>
</td>
</tr>
<tr>
<td>Generate and Manage API Tokens for Your User Account
</td>
<td>
To access the Operations for Applications REST API, you must have a VMware Cloud services API token with the relevant organization and service access.
<strong>Who</strong>: Use your own account.
<p><strong>Where</strong>: In the Cloud Services Console user interface.</p>
<p><strong>How</strong>: For details and instructions, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html">How do I generate API tokens</a> in the VMware Cloud services documentation.</p>
</td>
<td>
<p><strong>Who</strong>: Operations for Applications users with the <strong>API Tokens</strong> permission can generate and manage the API Tokens for their own user account. All users who do not have this permission, can use and manage their <strong>existing</strong> API tokens. </p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: For details, see <a href="wavefront_api.html#generate-and-manage-the-api-tokens-for-your-user-account">Generate and Manage the API Tokens for Your User Account</a>.</p>
</td>
</tr>
<tr>
<td>API Token Management in an Organization
</td>
<td>
<strong>Who</strong>: As an <strong>Organization Owner</strong> in an Identity Governance and Administration (IGA) activated VMware Cloud organization, you can monitor the API tokens created in your organization and set constraints for idle and maximum Time to live (TTL) for all newly created tokens.
<p><strong>Where</strong>: In the Cloud Services Console user interface.</p>
<p><strong>How</strong>: For details and instructions, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-3A9C29E0-460B-4586-B51A-084443A960D0.html">How do I manage API tokens in my Organization</a> in the VMware Cloud services documentation.</p>
</td>
<td>
<strong>Who</strong>: Operations for Applications users with the <strong>Accounts</strong> permission can:
<ul>
<li>Generate and manage API tokens for service accounts.</li>
<li>View and revoke the API tokens for the users and service accounts within their Operations for Applications organization.</li>
</ul>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: For details, see:</p>
<ul><li><a href="wavefront_api.html#generate-and-manage-the-api-tokens-for-a-service-account">Generate and Manage the API Tokens for a Service Account</a></li>
<li> <a href="wavefront_api.html#view-and-manage-the-api-tokens-in-your-organization">View and Manage the API Tokens in Your Organization</a>.</li>
</ul>
</td>
</tr>
<tr>
<td>Organization Settings
</td>
<td>
Operations for Applications organization settings for new subscribers are done in the VMware Cloud Services Console user interface and in the Operations for Applications user interface.
<br/>
<p><strong>Who</strong>: VMware Cloud <strong>Organization Owners</strong> or <strong>Organization Administrators</strong> can invite new user accounts, create new server to server apps accounts and assign roles and groups to these accounts.</p>
<p><strong>Where</strong>: In the VMware Cloud Services Console user interface.</p>
<p><strong>How</strong>: For details, see:</p>
<ul><li><a href="csp_user_management.html">Manage Users of Operations for Applications on VMware Cloud Services</a></li>
 <li><a href="csp_server_to_server_apps.html">Manage Server to Server Apps</a>.</li>
 </ul>

<br/><br/>
<strong>Who</strong>: Operations for Applications users with the <strong>Accounts</strong> permission can:
<li>Set up the following default settings for new accounts:</li>
  <ul>
  <li>Display settings, such as getting started progress and default dashboard display.</li>
  <li>Default query language preferences and optionally, allow users to write queries in PromQL.</li>
  <li>Set access to newly created dashboards and alerts.</li>
  </ul>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: For details, see:</p>
<ul>
 <li><a href="wavefront_prometheus.html#set-promql-organization-settings-administrator-only">Set PromQL Organization Settings (Administrator Only)</a></li>
 <li><a href="logging_logs_settings.html">Customize Logs Settings</a>.</li>
 <li><a href="csp_access.html">Managing Access to Dashboards and Alerts</a></li>
 </ul>
</td>
<td>
<strong>Who</strong>: Operations for Applications users with the <strong>Accounts</strong> permission can:
<ul>
<li>Set up the default settings for new accounts. These settings include:</li>
<ul>
<li>Display settings, such as getting started progress and default dashboard display.</li>
<li>Default query language preferences and optionally, allow users to write queries in PromQL.</li>
<li>Add default groups for new user accounts. New users are assigned to the Everyone system group and to all additional default groups that you specify.</li>
<li>Add default groups for new service accounts. New users are assigned to the Service Accounts system group and to all additional default groups that you specify.</li>
<li>Set the default permissions for new user accounts. These permissions don't apply to service accounts.</li>
<li>Customize logs settings, if Logs (Beta) is enabled for your cluster.</li>
</ul>
<li>Set access to newly created dashboards and alerts.</li>
</ul>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: For details, see:</p>
<ul>
  <li><a href="wavefront_prometheus.html#set-promql-organization-settings-administrator-only">Set PromQL Organization Settings (Administrator Only)</a></li>
  <li><a href="user-accounts.html#set-the-default-user-group-for-new-users">Set the Default User Group for New Users</a></li>
  <li><a href="service-accounts.html#set-the-default-service-accounts-group-for-new-service-accounts">Set the Default Service Accounts Group for New Service Accounts</a></li>
  <li><a href="user-accounts.html#set-default-permissions-for-new-users">Set Default Permissions for New Users</a></li>
  <li><a href="logging_logs_settings.html">Customize Logs Settings</a>.</li>
  <li><a href="access.html">Managing Access to Dashboards and Alerts</a></li>
</ul>
</td>
</tr>
<tr>
<td>User Accounts Management
</td>
<td>
<strong>Who</strong>: VMware Cloud <strong>Organization Owners</strong> or <strong>Organization Administrators</strong>.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: For details, see <a href="csp_user_management.html">Manage User Accounts</a>.</p>
</td>
<td>
<strong>Who</strong>: Operations for Applications users with the <strong>Accounts</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: For details, see <a href="user-accounts.html">Manage User Accounts</a>.</p>
</td>
</tr>
<tr>
<td>Service Accounts Management
</td>
<td>
<strong>Who</strong>: All VMware Cloud <strong>Organization Owners</strong> or <strong>Organization Administrators</strong>.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: For details, see <a href="csp_server_to_server_apps.html">Manage Server to Server Apps</a>.</p>
</td>
<td>
<strong>Who</strong>: All users with the <strong>Accounts</strong> permission can:
<ul>
<li>Create service accounts.</li>
<li>Assign roles to the service accounts to give them the permissions they need. Service accounts can perform get, modify, and delete tasks only if they have the necessary permissions.
</li>
</ul>
<strong>Where</strong>: In the Operations for Applications user interface.
<p><strong>How</strong>: For details, see <a href="service-accounts.html">Manage Service Accounts</a>.</p>
</td>
</tr>
<tr>
<td>Self Service SAML SSO</td>
<td>
<strong>Who</strong>: VMware Cloud <strong>Organization Owners</strong> can initiate the self-service federation workflow on behalf of their VMware Cloud organization and invite an <strong>Enterprise Administrator</strong> to complete the setup.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: For details, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html">Setting Up Enterprise Federation with VMware Cloud Services Console</a>.</p>
</td>
<td>
<strong>Who</strong>: Users with the <strong>SAML IdP Admin</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: For details, see <a href="auth_self_service_sso.html">Single-Tenant Authentication and Self-Service SAML SSO</a>.</p>
</td>
</tr>
<tr>
<td>Metrics Security Policies</td>
<td>
<strong>Who</strong>: A <strong>Super Admin</strong> or a user with the <strong>Metrics</strong> permission can create and manage metrics security policies.
<p><strong>Where</strong>: In the Operations for Applications UI. The roles that you can search for and enter are service-defined or custom roles.</p>
<p><strong>How</strong>: For details, see <a href="csp_metrics_security.html">Metrics Security Policy Rules in Operations for Applications on VMware Cloud Services</a>.</p>
</td>
<td>
<strong>Who</strong>: A <strong>Super Admin</strong> or a user with the <strong>Metrics</strong> permission can create and manage metrics security policies.
<p><strong>Where</strong>: In the Operations for Applications user interface. The roles that you can search for and enter are roles defined within your Operations for Applications organization.</p>
<p><strong>How</strong>: For details, see <a href="metrics_security.html">Metrics Security Policy Rules</a>.</p>
</td>
</tr>
</tbody>
</table>