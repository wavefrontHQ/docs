---
title: Manage Service Accounts
keywords: administration
tags: [administration]
sidebar: doc_sidebar
published: false
permalink: service_accounts.html
summary: Create and manage service accounts.
---

A service account can be used to automate management of objects like dashboard, alerts, etc.

* A service account uses a **token** to authenticate.
* A service account must have **permissions** to perform tasks. For dashboards and alerts, the service account must also have [access](access.html).
* By default, service accounts do not get any **individual permission**
  - Each account is automatically added to the **Everyone**  group. If a role is assigned to that group, the service account gets the permissions from that role.
  - Service account can be added to any group to get that group's role (and permissions).
* A service account can't perform the **UI operations** that all user accounts can [perform by default](user-accounts.html#what-can-a-new-user-do).


## Service Accounts Basics

If you build a service or tool that manages proxies or ingests data, then that tool must authenticate to the Wavefront API.

1. Create a service account from the Wavefront UI. The service account name must be unique.
2. Assign a role to the account to give the account the permissions it needs. Service accounts can perform get, modify, and delete tasks **only** if they have the necessary permissions.
2. Configure your tool to pass the service account credentials (API token) to the Wavefront API.

   The tool authenticates seamlessly to the API without embedding secret keys or user credentials in your instance, image, or application code.

You can disable a service account if you temporarily don't need it, or delete it permanently.


## Create a Service Account

Creating a service account is different from creating a user account.

1. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Account Management**.
2. Click the **Service Accounts** tab, and click **Create New Account**
3. On the New Service Account page, specify the account details and click **Create**.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="15%">Field</th><th width="85%">Description</th></tr>
</thead>
<tr>
<td>
Account ID</td>
<td>ID of the account. We prefix this ID with <strong>sa::</strong>. <p>A service account name must be unique. Wavefront converts service account ID to lower case. Users can type upper case or lower case -- this helps avoid duplicates. </p> </td>
</tr>
<tr>
<td>
Tokens</td>
<td>List of API tokens that the service account can use to authenticate to Wavefront.
<ul><li>Click the Edit icon to change the token name. </li>
<li>Click <strong>Revoke</strong> to revoke the token. Any service accounts that use the token can no longer authenticate to Wavefront. </li>
<li>Click <strong>Generate</strong> to generate additional tokens. Having multiple active tokens makes it possible to revoke some tokens. For example, if the service connects to several proxies, you can generate a token to connect to each proxy. You can revoke the token for one proxy but leave the others. </li>
<li>Click the <strong>Copy to Clipboard</strong> icon to copy the token for pasting.</li>
</ul></td>
</tr>
<tr>
<td>
Groups</td>
<td>By default, service accounts are added to the Everyone group and you cannot remove them. If you give assign roles to the Everyone group, all the service account get the permissions associated with that role. You can also add a service accounts to other groups. </td></tr>
<tr>
<td>Roles</td>
<td>Roles for the service account. Roles are sets of permissions. You could create one or two roles and use those roles only for service accounts. </td></tr>
<tr>
<td>Permissions</td>
<td>Individual permissions assigned to this service account. For example, give the account <strong>Proxies</strong> permission to interact with proxies or <strong>Alerts</strong> permissions to retrieve data from alerts. </td>
</tr>
</tbody>
</table>

After you create the account, you can change role or group assignment for individual accounts. The process is the same for user accounts and service accounts.


## Deactivate or Activate a Service Account

You can temporarily (or permanently) deactivate a service account. When an account is deactivated, none of the corresponding tokens work.

You can activate or deactivate a service account from the **Service Accounts** page or from the **Edit Service Account** page.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To activate or deactivate an account from the <strong>Service Accounts</strong> page:
<ul><li>Select the ellipsis to bring up the menu. </li>
<li>Select <strong>Activate</strong> or <strong>Deactivate</strong>.</li>
</ul></td>
<td width="50%"><img src="/images/sa_deactivate_multi.png" alt="deactivate or activate a service account"/></td>
</tr>
<tr>
<td width="50%">
To activate or deactivate an account from the <strong>Edit Service Account</strong> page:
<ul><li>Click the service account name to open the Edit Service Account page. </li>
<li>Use the toggle to activate or deactivate the account.</li>
</ul></td>
<td width="50%"><img src="/images/sa_deactivate.png" alt="deactivate or activate a service account"/></td>
</tr>
</tbody>
</table>
