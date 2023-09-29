---
title: Differences Between Original and VMware Cloud Services Subscriptions
keywords: 
tags: [introduction]
sidebar: doc_sidebar
permalink: csp-differences-by-area.html
summary: Learn about the functionality differences between VMware Aria Operations for Applications original subscriptions and VMware Cloud services subscriptions.
---

Operations for Applications subscriptions are two types: original subscriptions and VMware Cloud Services subscriptions.

## Examples of the Functionality Differences 

### Users, Roles, and Group Management

Most of the user and account management tasks done in the Operations for Applications UI for original subscriptions, are done in the VMware Cloud services for VMware Cloud services subscriptions. For example, the following tasks related to managing users, roles, and groups can be done from the VMware Cloud Services Console.

  * Invite new users
  * Assign permissions
  * Create and edit roles
  * Create and edit groups
  * Assign roles to users and groups

  ![A graphic showing the differences in the user and account management tasks for original and onboarded subscriptions. The information displayed is already described in the above bullet list.](images/user-management-comparison.png)


### Admin Tasks

Some administrative tasks, done by **Super Admins** and users with the **Accounts** permission in original subscriptions, are done by VMware Cloud **Organization Owners** and VMware Cloud **Organization Administrators** in VMware Cloud services subscriptions. Others can be done by Operations for Applications **Admins** in the Operations for Applications UI.

With the 2023-38 release, we introduce the **Admin** permission and service role, which partially correspond to the **Accounts** permission for original subscriptions. Users with the **Admin** service role can manage service accounts and Operations for Applications API tokens. They can also restrict access to new dashboards and alerts and set the organization settings. For example, they can restrict the access to the object creator only and set default settings, such as display settings, PromQL support, default way of building queries, and define Logs settings. 

{% include warning.html content="Service accounts are enabled only for a **limited number** of VMware Cloud services subscriptions.Service accounts and the API tokens associated with them will be deprecated in the future. It's strongly recommended that you incrementally switch to using [server to server OAuth apps](csp_server_to_server_apps.html) which authenticate with more secure VMware Cloud services access tokens. For information on how to do this, see [How to Replace a Service Account with a Server to Server App?](csp_migration.html#how-to-replace-a-service-account-with-a-server-to-server-app).  To temporarily enable service accounts for your service instance, [contact](wavefront_support_feedback.html) our Technical Support team." %}

![A graphic showing the differences in the admin tasks for original and onboarded subscriptions. The information displayed is described in the table below.](images/csp-admin-tasks.png)

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="22%">Task</th><th width="39%">Original Subscription</th><th width="39%">VMware Cloud Services Subscription</th></tr>
</thead>
<tr>
<td>Upgrade from trial
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications <strong>Super Admin</strong></li>
<li><strong>Where:</strong> From the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> Users with the Operations for Applications  <strong>Super Admin</strong> service role</li>
<li><strong>Where:</strong> From the Operations for Applications UI</li>
</ul>
</td>
</tr>
<tr>
<td>Purchase more PPS
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications  <strong>Super Admin</strong></li>
<li><strong>Where:</strong> From the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> Users with the Operations for Applications <strong>Super Admin</strong> service role</li>
<li><strong>Where:</strong> From the Operations for Applications UI</li>
</ul>
</td>
</tr>
<tr>
<td>Invite new Super Admins
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications  <strong>Super Admin</strong></li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> VMware Cloud <strong>Organization Owner</strong> or <strong>Organization Administrator</strong></li>
<li><strong>Where:</strong> In the VMware Cloud Services Console</li>
</ul>
</td>
</tr>
<tr>
<td>Create and manage service accounts and their Operations for Applications API tokens
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications users with the <strong>Accounts</strong> permission</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> Users with the Operations for Applications <strong>Admin</strong> service role</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
</tr>
<tr>
<td>Restore orphan dashboards and alerts
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications <strong>Super Admin</strong></li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> Users with the Operations for Applications <strong>Super Admin</strong> service role</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
</tr>
<tr>
<td>Restrict access to new dashboards and alerts
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications users with the <strong>Accounts</strong> permission</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> Users with the Operations for Applications <strong>Admin</strong> service role</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
</tr>
<tr>
<td>Set the service organization settings
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications users with the <strong>Accounts</strong> permission</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> Users with the Operations for Applications <strong>Admin</strong> service role</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
</tr>
</tbody>
</table>

### REST API Access

For original subscriptions, using the Operations for Applications REST API requires an API token associated with a user account or a service account. To generate API tokens for your user account you need the **API Tokens** permission. To generate API tokens for service accounts and to manage the API tokens in your Operations for Applications organization, you need the **Accounts** permission.

When your service is onboarded to VMware Cloud services and you want to access the Operations for Applications REST API, you need a VMware Cloud services **access token**. In a few cases, when setting up a Wavefront proxy for a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-supported-with-service-accounts), authentication with an Operations for Applications API token is also supported. However, using a VMware Cloud services **access token** is the recommended way as we will deprecate the service accounts in the future. To obtain an **access token**, you can:

* Generate a VMware Cloud services API token associated with your user account and exchange it for an access token.

  ![A graphic showing information how to generate API token for the user account for onboarded and original subscriptions.](images/csp-api-token-user.png)

* Create a server to server app (which is the equivalent of a service account), obtain its OAuth credentials (app ID and app secret), and exchange them for an access token.

   ![A graphic showing information how to generate API token for a service account or server to server app  for onboarded and original subscriptions.](images/csp-api-token-apps.png)

## In-Depth Explanation of the Functionality Differences

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="22%">Functionality</th><th width="39%">Original Subscription</th><th width="39%">VMware Cloud Services Subscription</th></tr>
</thead>
<tr>
<td>User Login
</td>
<td>Users log in to their Operations for Applications service instance by using the URL of the service cluster, <code>https://&lt;your_instance&gt;.wavefront.com</code>, and their Operations for Applications accounts. If their corporate domain is configured for SAML SSO with Operations for Applications, users log in with their corporate accounts.
</td>
<td>Users log in to their Operations for Applications service instance through the VMware Cloud Services Console with their VMware Cloud services accounts. If their corporate domain is federated with VMware Cloud services, users log in with their corporate accounts. For details, see <a href="csp_sign_up_or_log_in.html#log-in-from-the-vmware-cloud-services-console">Log In from the VMware Cloud Services Console</a>.
</td>
</tr>
<tr>
<td>User Accounts Management
</td>
<td>
<strong>Who</strong>: Users with the <strong>Accounts</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: You can invite new users with or without assigning roles and permissions. For details, see <a href="user-accounts.html">Manage User Accounts</a>.</p>
</td>
<td>
<strong>Who</strong>: Users with the VMware Cloud <strong>Organization Owner</strong> or <strong>Organization Administrator</strong> role.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: To add a user to your Operations for Applications service instance, you must assign that user:
<ol><li>An organization role for the VMware Cloud organization running the service instance. At a minimum, you must assign the VMware Cloud <strong>Organization Member</strong> role.</li>
<li>An Operations for Applications service role for your service instance. At a minimum, you must assign the <strong>Viewer</strong> service role.</li>
<li>Optionally, a custom role with one or more Operations for Applications permissions. A custom role applies to all service instances for which the user has an Operations for Applications service role.</li></ol>
For details, see <a href="csp_user_management.html">Manage User Accounts</a>.</p>
</td>
</tr>
<tr>
<td>Service Accounts and Server to Server OAuth Apps Management
</td>
<td><strong>Note:</strong> Only service accounts are supported.
<p><strong>Who</strong>: Users with the <strong>Accounts</strong> permission.</p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Service accounts authenticate with API tokens. Service accounts can be assigned with roles and permissions, as well as can be added to groups. For details, see <a href="service-accounts.html">Manage Service Accounts</a>.</p>
</td>
<td><strong>Note:</strong> Server to server OAuth apps are recommended and fully supported. Service accounts are with limited support and will be deprecated in the future.
<p><strong>Who</strong>:
<ul>
<li>For server to server OAuth apps, users with the VMware Cloud <strong>Organization Owner</strong>, <strong>Organization Administrator</strong>, or <strong>Organization Member</strong> with the <strong>Developer</strong> role assigned. </li>
<li>For service accounts, users with the <strong>Admin</strong> Operations for Applications service role.</li>
</ul></p>
<p><strong>Where</strong>:
<ul>
<li>For server to server OAuth apps, in the VMware Cloud Services Console.</li>
<li>For service accounts, in the Operations for Applications user interface.</li>
</ul></p>
<p><strong>How</strong>:
<ul>
<li>Server to server OAuth apps authenticate with VMware Cloud services access tokens that can be exchanged from their OAuth credentials. Server to server OAuth app can be assigned with organization roles, service roles, and custom roles, and can belong to one or more VMware Cloud organizations. For details, see <a href="csp_server_to_server_apps.html">Manage Server to Server Apps</a>.</li>
<li>Service accounts authenticate with Operations for Applications API tokens. Service accounts can be assigned with permissions only, and cannot be added to groups. For details, see <a href="csp_service_accounts.html">Manage Service Accounts</a>.</li>
</ul></p>
</td>
</tr>
<tr>
<td id="permissions">Permissions Management
</td>
<td><strong>Who</strong>: Users with the <strong>Accounts</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Permissions can be assigned to roles as well as to individual user accounts and service accounts.</p>
<p>See:
<ul>
<li><a href="users_roles.html#create-a-role">Create a Role</a></li>
<li><a href="users_roles.html#grant-or-revoke-account-permissions-explicitly">Grant or Revoke Account Permissions Explicitly</a></li>
</ul></p>
<p><strong>Note</strong>: The permissions list includes the <strong>Accounts</strong>, <strong>SAML IdP Admin</strong>, and <strong>API token</strong> permissions, because they are required for all of the authorization and authentication tasks which are done in the Operations for Applications.</p>
<p>In addition, the <strong>Accounts</strong> permission grants privileges for managing the Operations for Applications organization settings.</p>
<p>See the <a href="permissions_overview.html">Permissions Reference</a>. </p>
</td>
<td><strong>Who</strong>:
<ul>
<li>For assigning permissions to roles, users with the VMware Cloud <strong>Organization Owner</strong> or <strong>Organization Administrator</strong> role.</li>
<li>For assigning permissions to service accounts, users with the <strong>Admin</strong> Operations for Applications service role.</li>
</ul>
<p><strong>Where</strong>:
<ul>
<li>For assigning permissions to roles, in the VMware Cloud Services Console.</li>
<li>For assigning permissions to service accounts, in the Operations for Applications user interface.</li>
</ul></p>
<p><strong>How</strong>: Permissions can be assigned only to roles in the VMware Cloud services organization and service accounts - in the Operations for Applications environment.</p>
<p>See:
<ul>
<li><a href="csp_users_roles.html#create-edit-or-delete-a-custom-role">Create, Edit, or Delete a Custom Role</a></li>
<li><a href="csp_service_accounts.html#grant-or-revoke-permissions">Grant or Revoke Permissions from a Service Account</a></li>
</ul>
</p>
<p><strong>Note</strong>: The <strong>Accounts</strong>, <strong>SAML IdP Admin</strong>, and <strong>API token</strong> permissions don't exist, because most of the authorization and authentication tasks requiring these permissions are done in the VMware Cloud Services Console.</p>
<p>The <strong>Admin</strong> Operations for Applications permission grants privileges for managing service accounts, Operations for Applications API tokens, and the Operations for Applications organization settings.</p>
<p>See the <a href="csp_permissions_overview.html">Operations for Applications Permissions in VMware Cloud Services</a>.</p>
</td>
</tr>
<tr>
<td>Roles Management
</td>
<td><strong>Who</strong>: Users with the <strong>Accounts</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Roles can be assigned with permissions. Roles can be assigned to user accounts, service accounts, and groups. For details, see <a href="users_roles.html#manage-roles-and-permissions">Manage Roles and Permissions</a>.</p>
</td>
<td>
<strong>Who</strong>: Users with the VMware Cloud <strong>Organization Owner</strong> or <strong>Organization Administrator</strong> role.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: Roles can be assigned with permissions. Roles can be assigned to users, groups, API tokens, and server to server apps. There are:
<ul>
<li>Built-in Operations for Applications service roles, which are not editable. Each Operations for Applications permission is represented with a service role. In addition, the <strong>Super Admin</strong> and <strong>Viewer</strong> service roles grant full-administrative and view-only access, respectively.</li>
<li>Custom roles can be created and assigned with permissions for one or more services.</li>
</ul>
For details, see <a href="csp_users_roles.html#manage-roles">Manage Roles</a>.</p>
</td>
</tr>
<tr>
<td>Groups Management
</td>
<td><strong>Who</strong>: Users with the <strong>Accounts</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: A group of user and service accounts can be assigned with one or more roles. For details, see <a href="users_roles.html#create-a-group">Create a Group</a>.</p>
</td>
<td>
<strong>Who</strong>: Users with the VMware Cloud <strong>Organization Owner</strong> or <strong>Organization Administrator</strong> role.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: A group of users can be assigned with organization and service roles. A group can be shared with other VMware Cloud organizations. In a federated environment, you can add enterprise groups from your corporate domain. For details, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-0BD8A07B-C3C0-4220-8CD0-18FA070D3DAD.html">How do I work with groups</a> in the VMware Cloud services documentation.</p>
</td>
</tr>
<tr>
<td>Self-Service SAML SSO</td>
<td>
<strong>Who</strong>: Users with the <strong>SAML IdP Admin</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Operations for Applications includes predefined authentication integrations. For details, see <a href="auth_self_service_sso.html">Single-Tenant Authentication and Self-Service SAML SSO</a>.</p>
</td>
<td>
<strong>Who</strong>: A user with the VMware Cloud <strong>Organization Owner</strong> role together with an <strong>Enterprise Administrator</strong>.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: The VMware Cloud <strong>Organization Owner</strong> user kicks off the self-service federation workflow on behalf of the VMware Cloud organization and invites the <strong>Enterprise Administrator</strong> to complete the setup. For details, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html">Setting Up Enterprise Federation with VMware Cloud Services Console</a> in the VMware Cloud services documentation.</p>
</td>
</tr>
<tr>
<td>Generating API Tokens
</td>
<td><strong>Note</strong>: Only Operations for Applications API tokens are supported.
<p><strong>Who</strong>:
<ul><li>For API tokens associated with a user account, the corresponding user who must have the <strong>API Tokens</strong> permission.</li>
<li>For API tokens associated with service accounts, the users with the <strong>Accounts</strong> permission.</li>
</ul></p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>:<ul>
<li>A user with the <strong>API Tokens</strong> permission can generate Operations for Applications API tokens for their own user account. The API tokens inherit all permissions that its associated user account owns.</li>
<li>Users with the <strong>Accounts</strong> permission can generate Operations for Applications API tokens for service accounts. The API tokens inherit the permissions of their associated service account.</li></ul>
For details, see <a href="api_tokens.html">Manage API Tokens</a>.</p>
</td>
<td><strong>Note</strong>: It is recommended to use VMware Cloud services API tokens and server to server OAuth app credentials for obtaining VMware Cloud services access tokens. Operations for Applications API tokens are with limited support and will be deprecated in a future release. 
<p><strong>Who</strong>:
<ul><li>For VMware Cloud services API tokens associated with a user account, the corresponding user.</li>
<li>For Operations for Applications API tokens associated with service accounts, the users with the <strong>Admin</strong> Operations for Applications service role.</li>
</ul></p>
<p><strong>Where</strong>:
<ul><li>For VMware Cloud services API tokens associated with a user account, in the VMware Cloud Services Console.</li>
<li>For Operations for Applications API tokens associated with service accounts, in the Operations for Applications user interface.</li>
</ul>
</p>
<p><strong>How</strong>:
<ul><li>Each user can generate VMware Cloud services API tokens for their user account. An API token can be assigned with roles from the list of roles that the user owns - organization roles, service roles, and custom roles. For details and instructions, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html">How do I generate API tokens</a> in the VMware Cloud services documentation.</li>
<li>Users with the <strong>Admin</strong> service role can generate Operations for Applications API tokens for service accounts. The API tokens inherit the permissions of their associated service account. For details, see <a href="csp_service_accounts.html">Manage Service Accounts</a>.
</li>
</ul>
</p>
</td>
</tr>
<tr>
<td>API Tokens Management</td>
<td>
<strong>Who</strong>:
<ul><li>For API tokens associated with a user account, the corresponding user.</li>
<li>For all API tokens in the Operations for Applications service instance, the users with the <strong>Accounts</strong> permission.</li></ul>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>:<ul><li>All users can view and revoke their own tokens. For details, see <a href="api_tokens.html#generate-and-manage-the-api-tokens-for-your-user-account">Generate and Manage the API Tokens for Your User Account</a>.</li>
<li>Users with the <strong>Accounts</strong> permission can view and revoke any API token in the service instance. For details, see <a href="api_tokens.html#view-and-manage-the-api-tokens-in-your-organization">View and Manage the API Tokens in Your Organization</a>.</li></ul></p>
</td>
<td>
<strong>Who</strong>:
<ul><li>For VMware Cloud services API tokens associated with a user account, the corresponding user.</li>
<li>For all VMware Cloud services API tokens in the VMware Cloud organization, the users with the VMware Cloud <strong>Organization Owner</strong> role if the organization is activated for Identity Governance and Administration (IGA).</li>
<li>For all Operations for Applications API tokens (limited support), the users with the <strong>Admin</strong> Operations for Applications service role.</li></ul>
<p><strong>Where</strong>:
<ul><li>For VMware Cloud services API tokens, in the Cloud Services Console.</li>
<li>For Operations for Applications API tokens (limited support), in the Operations for Applications user interface.</li></ul>
</p>
<p><strong>How</strong>:
<ul>
<li>All users can view and revoke their own VMware Cloud services API tokens. For details, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-1BA71988-387C-42E1-8C98-EE2C1370826B.html">How do I manage my API tokens</a> in the VMware Cloud services documentation.</li>
<li>Users with the VMware Cloud <strong>Organization Owner</strong> role can monitor the API tokens created in the organization and can set constraints for idle and maximum Time to live (TTL) for all newly created tokens. For details and instructions, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-3A9C29E0-460B-4586-B51A-084443A960D0.html">How do I manage API tokens in my Organization</a> in the VMware Cloud services documentation.</li>
<li>Users with the <strong>Admin</strong> service role can view and revoke any Operations for Applications API token in the service instance. For details, see <a href="csp_api_tokens.html#managing-the-operations-for-applications-api-tokens-in-your-service-instance">Managing the Operations for Applications API Tokens in Your Service Instance</a>.</li>
</ul></p>
</td>
</tr>
<tr>
<td>Operations for Applications REST API Access</td>
<td>
<strong>Who</strong>: Everyone who has an Operations for Applications API token associated with a user account or a service account.
<p><strong>Where</strong>: An API client.</p>
<p><strong>How</strong>: Interacting with the Operations for Application REST API requires an Operations for Application API token.
<ul><li>To interact with the REST API by using your user account, you must use your API token. For details, see <a href="using_wavefront_api.html#make-api-calls-by-using-a-user-account-1">Make API Calls by Using a User Account</a>.</li>
<li>To interact with the REST API by using a service account, you must use an API token associated with that service account. For details, see <a href="using_wavefront_api.html#make-api-calls-by-using-a-service-account">Make API Calls by Using a Service Account</a>.</li></ul></p>
</td>
<td>
<strong>Who</strong>: Everyone who has a VMware Cloud services API token or the credentials of a server to server OAuth app.
<p><strong>Where</strong>: An API client.</p>
<p><strong>How</strong>: Interacting with the Operations for Application REST API requires a VMware Cloud services access token.
<ul><li>To interact with the REST API on behalf of your user account, you must exchange your VMware Cloud services API token for an access token. For details, see <a href="using_wavefront_api.html#make-api-calls-by-using-a-user-account">Make API Calls by Using a User Account</a>.</li>
<li>To interact with the REST API on behalf of your VMware Cloud organization, you must exchange the OAuth credentials of a server to server app for an access token. For details, see <a href="using_wavefront_api.html#make-api-calls-by-using-a-server-to-server-app">Make API Calls by Using a Server to Server App</a>.</li>
</ul>
</p>
</td>
</tr>
<tr>
<td>Operations for Applications Organization Settings</td>
<td>
<strong>Who</strong>: Users with the <strong>Accounts</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Accounts</strong> permission, you can configure:
<ul>
<li>Default display settings, such as getting started progress and default dashboard display.</li>
<li>Default query language preferences and optionally, allow users to write queries in PromQL. For details, see <a href="wavefront_prometheus.html#set-promql-organization-settings-administrator-only">Set PromQL Organization Settings (Administrator Only)</a>.</li>
<li>Default groups for new user accounts. New users are assigned to the Everyone system group and to all additional default groups that you specify. For details, see <a href="user-accounts.html#set-the-default-user-group-for-new-users">Set the Default User Group for New Users</a>.</li>
<li>Default groups for new service accounts. New service accounts are assigned to the Service Accounts system group and to all additional default groups that you specify. For details, see <a href="service-accounts.html#set-the-default-service-accounts-group-for-new-service-accounts">Set the Default Service Accounts Group for New Service Accounts</a>.</li>
<li>Default permissions for new user accounts. These permissions don't apply to service accounts. For details, see <a href="user-accounts.html#set-default-permissions-for-new-users">Set Default Permissions for New Users</a>.</li>
<li>Logs settings, if Logs is enabled for your cluster. For details, see <a href="logging_logs_settings.html">Customize Logs Settings</a>.</li>
<li>Access to newly created dashboards and alerts. For details, see <a href="access.html">Managing Access to Dashboards and Alerts</a>.</li>
</ul></p>
</td>
<td>
<strong>Who</strong>: Users with the <strong>Admin</strong> Operations for Applications service role.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Admin</strong> service role, you can configure:
<ul>
<li>Default display settings for new accounts, such as getting started progress and default dashboard display.</li>
<li>Default query language preferences and optionally, allow users to write queries in PromQL. For details, see <a href="wavefront_prometheus.html#set-promql-organization-settings-administrator-only">Set PromQL Organization Settings (Administrator Only)</a>.</li>
<li>Logs settings, if Logs is enabled for your cluster. For details, see <a href="logging_logs_settings.html">Customize Logs Settings</a>.</li>
<li>Access to newly created dashboards and alerts. For details, see <a href="csp_access.html">Managing Access to Dashboards and Alerts</a></li>
</ul></p>
</td>
</tr>
<tr>
<td>Wavefront Proxy Installation
</td>
<td><strong>Note</strong>: The Wavefront proxy authenticates with an Operations for Applications API token.
<p><strong>Who</strong>: Users with the <strong>Proxies</strong> permission.</p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Proxies</strong> permission, you must configure the proxy to authenticate to Operations for Applications with an Operations for Applications API token that have the <strong>Proxies</strong> permission. For details, see <a href="proxies_installing.html#install-a-proxy-from-the-ui">Install a Proxy from the UI</a>.</p>
</td>
<td><strong>Note</strong>: The Wavefront proxy authenticates with a VMware Cloud services access token obtained from server to server OAuth app credentials or from a VMware Cloud services API token. Proxy authentication with an Operations for Applications API token is still possible and supported only for a <a href="integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens">limited list of integrations</a>.
<p><strong>Who</strong>:
<ul>
<li>For proxy installation, users with the <strong>Proxies</strong> Operations for Applications service role.</li>
<li>For creating server to server OAuth apps, users with the VMware Cloud <strong>Organization Owner</strong>, <strong>Organization Administrator</strong>, or <strong>Organization Member</strong> with <strong>Developer</strong> roles.</li>
<li>For generating an Operations for Applications API token of a service account, users with the <strong>Admin</strong> Operations for Applications service role.</li>
</ul></p>
<p><strong>Where</strong>:
<ul>
<li>For generating a VMware Cloud services API token or creating a server to server OAuth app, in the VMware Cloud Services Console.</li>
<li>For proxy installation and generating an Operations for Applications API token for a service account, in the Operations for Applications user interface.</li>
</ul></p>
<p><strong>How</strong>: As a user with the <strong>Proxies</strong> service role, you configure the proxy to authenticate to Operations for Applications. The proxy obtains a VMware Cloud services access token with the <strong>Proxies</strong> service role or use an Operations for Applications API token of a service account with the <strong>Proxies</strong> permission. To obtain a VMware Cloud services access token:
<ul><li>The proxy can use the credentials of a server to server <strong>OAuth app</strong> - ID and secret, together with the VMware Cloud organization long ID.</li>
<li>The proxy can use the VMware Cloud services <strong>API token</strong> of an active user account.</li></ul>
In both ways, the access token is directly issued to the proxy. For details, see <a href="proxies_installing.html#proxy-authentication-types">Proxy Authentication Types</a>.</p>
</td>
</tr>
<tr>
<td>Integrations Installation
</td>
<td><strong>Note</strong>: All <a href="label_integrations%20list.html">integrations</a> that use a Wavefront proxy authenticate with an Operations for Applications API token.
<p><strong>Who</strong>: Users or service accounts with the <strong>Proxies</strong> permission who have an active Operations for Applications API token.</p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Follow the instructions on the <strong>Setup</strong> tab of the integration that you want to install.</p>
</td>
<td><strong>Note</strong>: <a href="integrations_onboarded_subscriptions.html#integrations-that-use-vmware-cloud-services-access-tokens">Most of the integrations</a> that use a Wavefront proxy authenticate with a VMware Cloud services access token. A <a href="integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens">limited list of integrations</a> still use proxy authentication with an Operations for Applications API token.
<p><strong>Who</strong>: Users with the <strong>Proxies</strong> Operations for Applications service role who must have one of the following:
<ul>
<li>A valid VMware Cloud services API token with the <strong>Proxies</strong> service role assigned.</li>
<li>The credentials of a server to server OAuth app with the <strong>Proxies</strong> service role assigned.</li>
<li>An Operations for Applications API token associated with a service account that has the <strong>Proxies</strong> permission.</li>
</ul></p>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Follow the instructions on the <strong>Setup</strong> tab of the integration that you want to install. </p>
</td>
</tr>
<tr>
<td>Metrics Security Policy Management
</td>
<td><strong>Who</strong>: Users with the <strong>Metrics</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Privileged users can block or allow access to metrics for:
<ul><li>Accounts (<a href="user-accounts.html">user accounts</a> and <a href="service-accounts.html">service accounts</a>)</li>
<li><a href="users_roles.html#create-a-group">Groups</a></li>
<li><a href="users_roles.html#create-a-role">Roles</a></li></ul>
For details, see <a href="metrics_security.html">Metrics Security Policy Rules</a>.</p>
</td>
<td><strong>Who</strong>: Users with the <strong>Metrics</strong> Operations for Applications service role.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Privileged users can block or allow access to metrics for:
<ul><li>Accounts (<a href="csp_user_management.html">user accounts</a>, <a href="csp_server_to_server_apps.html">server to server apps</a>, and <a href="csp_service_accounts.html">service accounts</a>)</li>
<li><a href="csp_users_roles.html#manage-user-groups">Groups</a></li></ul>
For details, see <a href="csp_metrics_security.html">Metrics Security Policy Rules</a>.</p>
</td>
</tr>
</tbody>
</table>