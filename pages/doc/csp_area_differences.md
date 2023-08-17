---
title: Differences Between Original and VMware Cloud Services Subscriptions
keywords: 
tags: [introduction]
sidebar: doc_sidebar
permalink: csp-differences-by-area.html
summary: Learn about the differences between VMware Aria Operations for Applications original subscriptions and VMware Cloud services subscriptions.
---

Operations for Applications subscriptions are two types: original subscriptions and VMware Cloud Services subscriptions.

## Examples of the Functionality Differences 

### Users, Roles and Group Management

Most of the user and account management tasks done in the Operations for Applications UI for original subscriptions, are done in the VMware Cloud Services for VMware Cloud services subscriptions. For example, the tasks related to user, roles and groups management:

  * Invite new users
  * Assign permissions
  * Create and edit roles
  * Create and edit groups
  * Assign roles to users and groups

  ![A graphic showing the differences in the user and account management tasks for original and onboarded subscriptions. The information displayed is already described in the above bullet list.](images/user-management-comparison.png)


### Admin Tasks

Some administrative tasks done by Super Admins, or users with the **Accounts** permission in the Operations for Applications UI for original subscriptions, are done in the VMware Cloud Services for VMware Cloud services subscriptions. Others can be still done in the Operations for Applications UI for VMware Cloud services subscriptions. Also, there can be changes in the required roles. 

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
<li><strong>Who:</strong> Operations for Applications Super Admin</li>
<li><strong>Where:</strong> From the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> VMware Cloud Organization Owner</li>
<li><strong>Where:</strong> From the Operations for Applications UI</li>
</ul>
</td>
</tr>
<tr>
<td>Purchase more PPS
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications Super Admin</li>
<li><strong>Where:</strong> From the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> VMware Cloud Organization Owner</li>
<li><strong>Where:</strong> From the Operations for Applications UI</li>
</ul>
</td>
</tr>
<tr>
<td>Invite new Super Admins
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications Super Admin</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> VMware Cloud Organization Owner or Organization Administrator</li>
<li><strong>Where:</strong> In the VMware Cloud Services Console</li>
</ul>
</td>
</tr>
<tr>
<td>Restore orphan dashboards and alerts
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications Super Admin</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications Super Admin</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
</tr>
<tr>
<td>Restrict access to new dashboards and alerts
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications users with the Accounts permission</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications Admin</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
</tr>
<tr>
<td>Set the service organization settings
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications users with the Accounts permission</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
<td>
<ul>
<li><strong>Who:</strong> Operations for Applications Admin</li>
<li><strong>Where:</strong> In the Operations for Applications UI</li>
</ul>
</td>
</tr>
</tbody>
</table>

### REST API Access

For original subscriptions, using the Operations for Applications REST API requires an API token associated with a user account or a service account. To generate API tokens for your user account you need the **API Tokens** permission. To generate API tokens for service accounts and to manage the API tokens in your Operations for Applications organization, you need the **Accounts** permission.

When your service is onboarded to VMware Cloud services and you want to access the Operations for Applications REST API, you need a VMware Cloud services **access token**. To get such a token, you can:

* Generate a VMware Cloud services API token associated with your user account and exchange it for an access token.

  ![A graphic showing information how to generate API token for the user account for onboarded and original subscriptions.](images/csp-api-token-user.png)

* Create a server to server app (which is the equivalent of a service account), obtain its OAuth credentials (app ID and app secret), and exchange them for an access token.

   ![A graphic showing information how to generate API token for a service account or server to server app  for onboarded and original subscriptions.](images/csp-api-token-apps.png)

## In-Depth Explanation of the Functionality Differences

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="22%">Area</th><th width="39%">Original Subscription</th><th width="39%">VMware Cloud Services Subscription</th></tr>
</thead>
<tr>
<td>User Login
</td>
<td>Users log in to their Operations for Applications service instance by using the URL of the service cluster, <code>https://&lt;your_instance&gt;.wavefront.com</code>. and their Operations for Applications accounts. If their corporate domain is configured for SAML SSO with Operations for Applications, users log in with their corporate accounts.
</td>
<td>Users log in to their Operations for Applications service instance through the VMware Cloud Services Console with their VMware Cloud services accounts. If their corporate domain is federated with VMware Cloud services, users log in with their corporate accounts. For details, see <a href="csp_sign_up_or_log_in.html#log-in-from-the-vmware-cloud-services-console">Log In from the VMware Cloud Services Console</a>.
</td>
</tr>
<tr>
<td>Permissions
</td>
<td>The <strong>Accounts</strong>, <strong>SAML IdP Admin</strong>, and <strong>API token</strong> permissions exist, because they are required for all of the authorization and authentication tasks which are done in the Operations for Applications IU.
<p>In addition, the <strong>Accounts</strong> permission grants privileges for managing the Operations for Applications organization settings.</p>
See the <a href="permissions_overview.html">Permissions Reference</a>.
</td>
<td>The <strong>Accounts</strong>, <strong>SAML IdP Admin</strong>, and <strong>API token</strong> permissions don't exist, because the authorization and authentication tasks requiring these permissions are done in the VMware Cloud Services Console.
<p>The new <strong>Admin</strong> permission grants privileges for managing the Operations for Applications organization settings.</p>
See the <a href="csp_permissions_overview.html">Operations for Applications Permissions in VMware Cloud Services</a>.
</td>
</tr>
<tr>
<td>Roles and Permissions Management
</td>
<td><strong>Who</strong>: Users with the <strong>Accounts</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Permissions can be assigned to roles as well as to individual users and service accounts. Roles can be assigned to user accounts, service accounts, and groups. For details, see:</p>
<ul>
<li><a href="users_roles.html#create-a-role">Create a Role</a></li>
<li><a href="users_roles.html#grant-or-revoke-account-permissions-explicitly">Grant or Revoke Account Permissions</a></li>
</ul>
</td>
<td>
<strong>Who</strong>: Users with the VMware Cloud <strong>Organization Owner</strong> or <strong>Organization Administrator</strong> role.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: Permissions can be assigned only to roles. Roles can be assigned to users, groups, API tokens, and server to server apps. There are built-in Operations for Applications service roles, which are not editable. Custom roles can be created and assigned with permissions for one or more services. For details, see <a href="csp_users_roles.html#manage-roles">Manage Roles</a>.</p>
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
<ol><li>An organization role for the VMware Cloud organization running the service instance.</li>
<li>An Operations for Applications service role for your service instance. At a minimum, you must assign the <strong>Viewer</strong> service role.</li>
<li>Optionally, a custom role with an Operations for Applications permission. A custom role applies to all service instances for which the user has an Operations for Applications service role.</li></ol>
For details, see <a href="csp_user_management.html">Manage User Accounts</a>.</p>
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
<td>Service Accounts and Server to Server Apps Management
</td>
<td>
<strong>Who</strong>: Users with the <strong>Accounts</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Service accounts authenticate with API tokens. Service accounts can be assigned with roles and permissions, as well as can be added to groups. For details, see <a href="service-accounts.html">Manage Service Accounts</a>.</p>
</td>
<td>
<strong>Who</strong>: Users with the VMware Cloud <strong>Organization Owner</strong> role or the <strong>Developer</strong> additional role.
<p><strong>Where</strong>: In the VMware Cloud Services Console.</p>
<p><strong>How</strong>: Server to server OAuth apps in VMware Cloud services correspond to service accounts in Operations for Applications. A server to server app authenticates with a VMware Cloud services access token that can be exchanged from its OAuth credentials (app ID and app secret). To add a service account to your Operations for Applications service instance, you must create a server to server OAuth app and assign that app:
<ol><li>An organization role for the VMware Cloud organization running the service.</li>
<li>An Operations for Applications service role for your service instance.</li>
<li>Optionally, a custom role with an Operations for Applications permission. A custom role applies to all service instances for which the server to server app has an Operations for Applications service role.</li></ol>
For details, see <a href="csp_server_to_server_apps.html">Manage Server to Server Apps</a>.</p>
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
<td>Generating API Tokens
</td>
<td>
<strong>Who</strong>: Depends on whether the API token is associated with a user account or a service account.
<ul><li>For API tokens associated with a user account, the corresponding user who must have the <strong>API Tokens</strong> permission.</li>
<li>For API tokens associated with service accounts, the users with the <strong>Accounts</strong> permission.</li></ul>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>:<ul>
<li>A user with the <strong>API Tokens</strong> permission can generate Operations for Applications API tokens for their own user account.</li>
<li>Users with the <strong>Accounts</strong> permission can generate Operations for Applications API tokens for service accounts.</li></ul>
Each API token inherits the permissions of its associated user or service account. For details, see <a href="api_tokens.html">Manage API Tokens</a>.</p>
</td>
<td>
<strong>Who</strong>: All users.
<p><strong>Where</strong>: In the Cloud Services Console user interface.</p>
<p><strong>How</strong>: Each user can generate VMware Cloud services API tokens for their user account. An API token can be assigned with roles from the list of roles that the user owns - organization roles, service roles, and custom roles.</p>
<p>For access to Operations for Applications, the VMware Cloud services API token must be assigned with an Operations for Applications service role and, optionally, a custom role with an Operations for Applications permission.</p>
<p>For details and instructions, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html">How do I generate API tokens</a> in the VMware Cloud services documentation.</p>
</td>
</tr>
<tr>
<td>API Tokens Management</td>
<td>
<strong>Who</strong>:
<ul><li>For API tokens associated with a user account, the corresponding user.</li>
<li>For all API tokens in the Operations for Applications environment, the users with the <strong>Accounts</strong> permission.</li></ul>
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>:<ul><li>All users can view and revoke their own tokens. For details, see <a href="api_tokens.html#generate-and-manage-the-api-tokens-for-your-user-account">Generate and Manage the API Tokens for Your User Account</a>.</li>
<li>Users with the <strong>Accounts</strong> permission can view and revoke any API token in the environment. For details, see <a href="api_tokens.html#view-and-manage-the-api-tokens-in-your-organization">View and Manage the API Tokens in Your Organization</a>.</li></ul></p>
</td>
<td>
<strong>Who</strong>:
<ul><li>For API tokens associated with a user account, the corresponding user.</li>
<li>For all API tokens in the VMware Cloud organization if activated for Identity Governance and Administration (IGA), the users with the VMware Cloud <strong>Organization Owner</strong> role.</li></ul>
<p><strong>Where</strong>: In the Cloud Services Console user interface.</p>
<p><strong>How</strong>:<ul><li>All users can view and revoke their own tokens. For details, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-1BA71988-387C-42E1-8C98-EE2C1370826B.html">How do I manage my API tokens</a> in the VMware Cloud services documentation.</li>
<li>Users with the VMware Cloud <strong>Organization Owner</strong> role can monitor the API tokens created in the organization and can set constraints for idle and maximum Time to live (TTL) for all newly created tokens. For details and instructions, see <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-3A9C29E0-460B-4586-B51A-084443A960D0.html">How do I manage API tokens in my Organization</a> in the VMware Cloud services documentation.</li></ul></p>
</td>
</tr>
<tr>
<td>Operations for Applications REST API Access</td>
<td>
<strong>Who</strong>: User and service accounts with an Operations for Applications API token.
<p><strong>Where</strong>: An API client.</p>
<p><strong>How</strong>: Interacting with the Operations for Application REST API requires an Operations for Application API token.
<ul><li>To interact with the REST API by using your user account, you must use your API token. For details, see <a href="using_wavefront_api.html#make-api-calls-by-using-a-user-account-1">Make API Calls by Using a User Account</a>.</li>
<li>To interact with the REST API by using a service account, you must use an API token associated with that service account. For details, see <a href="using_wavefront_api.html#make-api-calls-by-using-a-service-account">Make API Calls by Using a Service Account</a>.</li></ul></p>
</td>
<td>
<strong>Who</strong>: Users with a VMware Cloud services API token and server to server apps with OAuth credentials (ID and secret).
<p><strong>Where</strong>: An API client.</p>
<p><strong>How</strong>: Interacting with the Operations for Application REST API requires a VMware Cloud services access token.
<ul><li>To interact with the REST API by using your user account, you must exchange your API token for an access token. For details, see <a href="using_wavefront_api.html#make-api-calls-by-using-a-user-account">Make API Calls by Using a User Account</a>.</li>
<li>To interact with the REST API by using a server to server app, you must exchange the app ID and secret for an access token. For details, see <a href="using_wavefront_api.html#make-api-calls-by-using-a-server-to-server-app">Make API Calls by Using a Server to Server App</a>.</li></ul>
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
<li>Logs settings, if Logs (Beta) is enabled for your cluster. For details, see <a href="logging_logs_settings.html">Customize Logs Settings</a>.</li>
<li>Access to newly created dashboards and alerts. For details, see <a href="access.html">Managing Access to Dashboards and Alerts</a>.</li>
</ul></p>
</td>
<td>
<strong>Who</strong>: Users with the <strong>Super Admin</strong> Operations for Applications service role and Super Admin mode enabled.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Super Admin</strong> service role, you can configure:
<ul>
<li>Default display settings for new accounts, such as getting started progress and default dashboard display.</li>
<li>Default query language preferences and optionally, allow users to write queries in PromQL. For details, see <a href="wavefront_prometheus.html#set-promql-organization-settings-administrator-only">Set PromQL Organization Settings (Administrator Only)</a>.</li>
<li>Logs settings, if Logs is enabled for your cluster. For details, see <a href="logging_logs_settings.html">Customize Logs Settings</a>.</li>
<li>Access to newly created dashboards and alerts. For details, see <a href="csp_access.html">Managing Access to Dashboards and Alerts</a></li>
</ul></p>
</td>
</tr>
<tr>
<td>Wavefront Proxy Authentication
</td>
<td><strong>Who</strong>: Users with the <strong>Proxies</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: As a user with the <strong>Proxies</strong> permission, you must configure the proxy to authenticate to Operations for Applications with an Operations for Applications API token that have the <strong>Proxies</strong> permission. For details, see <a href="proxies_installing.html#install-a-proxy-from-the-ui">Install a Proxy from the UI</a>.</p>
</td>
<td><strong>Who</strong>:<ul><li>For proxy installation, users with the <strong>Proxies</strong> Operations for Applications service role or a custom role with the <strong>Proxies</strong> permission.</li><li>For creating server to server OAuth apps, users with the VMware Cloud <strong>Organization Owner</strong> role or <strong>Developer</strong> additional role.</li></ul>
<p><strong>Where</strong>:<ul><li>For proxy installation, in the Operations for Applications user interface.</li><li>For generating an API token or creating a server to server OAuth app, in the VMware Cloud Services Console.</li></ul></p>
<p><strong>How</strong>: As a user with the <strong>Proxies</strong> permission, you must configure the proxy to authenticate to Operations for Applications. The proxy must retrieve a VMware Cloud services access token with the <strong>Proxies</strong> service role. There are two supported authentication types:
<ul><li>The proxy can use the credentials of a server to server <strong>OAuth app</strong> - ID and secret, together with the VMware Cloud organization ID.</li>
<li>The proxy can use the <strong>API token</strong> of an active user account.</li></ul>
In both ways, the access token is directly issued to the proxy. For details, see <a href="proxies_installing.html#proxy-authentication-types">Proxy Authentication Types</a>.</p>
</td>
</tr>
<tr>
<td>Metrics Security Policy Rules
</td>
<td><strong>Who</strong>: Users with the <strong>Metrics</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Privileged users can block or allow access to metrics for:
<ul><li>Accounts (<a href="user-accounts.html">user accounts</a> and <a href="service-accounts.html">service accounts</a>)</li>
<li><a href="users_roles.html#create-a-group">Groups</a></li>
<li><a href="users_roles.html#create-a-role">Roles</a></li></ul>
For details, see <a href="metrics_security.html">Metrics Security Policy Rules</a>.</p>
</td>
<td><strong>Who</strong>: Users with the <strong>Metrics</strong> Operations for Applications service role or a custom role with the <strong>Metrics</strong> permission.
<p><strong>Where</strong>: In the Operations for Applications user interface.</p>
<p><strong>How</strong>: Privileged users can block or allow access to metrics for:
<ul><li>Accounts (<a href="csp_user_management.html">user accounts</a> and <a href="csp_server_to_server_apps.html">service accounts</a>)</li>
<li><a href="csp_users_roles.html#manage-user-groups">Groups</a></li></ul>
For details, see <a href="csp_metrics_security.html">Metrics Security Policy Rules</a>.</p>
</td>
</tr>
<tr>
<td>Integrations
</td>
<td>All integrations are still supported. See the <a href="label_integrations%20list.html">List of Integrations</a>.
</td>
<td>You still can see, but cannot configure some of our integrations. For the list of integrations that we support when your Operations for Applications service is onboarded to VMware Cloud services, see <a href="integrations_onboarded_subscriptions.html">Integrations Supported for VMware Cloud Services Subscriptions</a>.
</td>
</tr>
</tbody>
</table>