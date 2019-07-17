---
title: Manage Service Accounts
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: service_accounts.html
summary: Create and manage service accounts.
---

A service account is for services that use the Wavefront API to perform certain tasks.
* A service account use a **token** to authenticate.
* Service accounts do not get any **individual permission** by default
  - Each account is automatically added to the **Everyone**  group and inherits the Everyone group permissions (if any)
  - Service account can be added to any group to get that groups permissions.
* A service account can't perform the **UI operations** that user accounts can [perform by default](user_accounts.html#what-can-a-new-user-do).

## Service Accounts Basics

If you build a service or tool that manages proxies or ingests data, then that tool must authenticate to the Wavefront API. Service accounts support this type of authentication.
1. Create a service account from the Wavefront UI.
2. Give the account the permissions it needs.
2. Configure your tool to pass the service account credentials (API token) to the Wavefront API.

   The tool authenticates seamlessly to the API without embedding any secret keys or user credentials in your instance, image, or application code.

Service accounts can perform get, modify, and delete tasks **only** if they have the necessary permissions. You can disable a service account if you temporarily don't need it, or delete it permanently.

## Create a Service Account

Creating a service account is different from creating a user account.

1. From the gear icon, select **Account Management**.
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
<td>ID of the account. We prefix this ID with <strong>sa::</strong></td>
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
<td>By default, service accounts are added to the Everyone group and you cannot remove them. If you give permissions to the Everyone group, all the service account get those permissions. You can also add a service accounts to other groups. </td></tr>
<tr>
<td>
Permissions</td>
<td>Individual permissions assigned to this service account. For example, give the account <strong>Proxies</strong> permission to interact with proxies or <strong>Alerts</strong> permissions to retrieve data from alerts. </td>
</tr>
</tbody>
</table>

You can now [grant or revoke permissions](users_groups.html#grant-or-revoke-account-permissions), which is the same for user accounts and service accounts, and you can deactivate or activate a service account. 


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
