---
title: Manage Service Accounts
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: service-accounts.html
summary: Create and manage service accounts.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for **original** subscribers. For VMware Cloud services subscriptions, see [Manage Server to Server Apps](csp_server_to_server_apps.html)."%}

VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) supports service accounts that can be used to automate management of objects such as dashboards, alerts, etc. A service account can't perform the **UI operations** that all user accounts can [perform by default](user-accounts.html#what-can-a-new-user-do). There's no limit on the number of service accounts that you can create in your organization. 

{% include note.html content="Service accounts have no permissions by default. As an administrator, you must explicitly grant each service account only the permission required for the task that’s being automated (least required privilege). Doing so, you ensure that permissions for service accounts are always very limited. Service accounts do not have the view permissions that user accounts have by default. A service account must have **permissions** to perform tasks. To run queries, a service account must have **Metrics** permission. To manage dashboards and alerts, the service account might need both permissions and [access](access.html)." %}

With the 2021-42.x release all existing service accounts are moved to a separate predefined **Service Accounts** group and no longer belong to the **Everyone** group. New service accounts that you create are automatically added to the **Service Accounts** group. You can also set additional groups for new service accounts.

## What Are Service Accounts?

Service accounts are used for automating management tasks.

* A service account uses a **token** to authenticate.
* Each account is automatically added to the **Service Accounts** group. If a role is assigned to that group, the service account gets the permissions from that role.
* Service accounts can be added to any group to get that group's role (and permissions).

As a user with the **Accounts** permission, you [generate (and revoke, if needed)](api_tokens.html#generate-and-manage-the-api-tokens-for-a-service-account) authentication tokens for the service account. It’s also possible to deactivate a service account completely. 

## How Service Accounts Work

If you build a service or tool that manages proxies or ingests data, then that tool must authenticate to the Operations for Applications REST API.

1. Create a service account from the UI. The service account name must be unique.
2. Assign a role to the account to give the account the permissions it needs. Service accounts can perform get, modify, and delete tasks **only if** they have the necessary permissions.
3. Configure your tool to pass the service account credentials (API token) to the REST API.

   The tool authenticates seamlessly to the API without embedding secret keys or user credentials in your instance, image, or application code.

You can disable a service account if you temporarily don't need it, or you can delete the account permanently.


## Create a Service Account

Creating a service account is different from creating a user account.

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Accounts**.
2. Click the **Service Accounts** tab and click **Create New Account**.
3. On the **New Service Account** page, specify the account details and click **Create**.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="15%">Field</th><th width="85%">Description</th></tr>
</thead>
<tr>
<td>
Account ID</td>
<td>ID of the account. We prefix this ID with <strong>sa::</strong>. <p>A service account name must be unique. Operations for Applications converts service account ID to lower case to avoid confusion that can result from almost identical account names (e.g. Service-1 and service-1). Users can type upper case or lower case. </p> </td>
</tr>
<tr>
<td>
Tokens</td>
<td>List of API tokens that the service account can use to authenticate to the service instance.
<ul><li>Click the <strong>Edit</strong> icon to change the token name. </li>
<li>Click <strong>Revoke</strong> to revoke a token. Any service account that uses the token can no longer authenticate to the service instance. </li>
<li>Click <strong>Generate</strong> to generate additional tokens. Having multiple active tokens makes it possible to revoke some tokens. For example, if the service connects to several proxies, you can generate a token to connect to each proxy. You can revoke the token for one proxy but leave the others. You can have up to 20 API tokens per service account at any given time.</li>
<li>Click the <strong>Copy to Clipboard</strong> icon to copy the token for pasting.</li>
</ul></td>
</tr>
<tr>
<td>
Groups</td>
<td>By default, service accounts are added to the <strong>Service Accounts</strong> group. If you assign roles to the <strong>Service Accounts</strong> group, all the service accounts get the permissions associated with these roles. You can also add service accounts to other groups. </td></tr>
<tr>
<td>Roles</td>
<td>Roles for the service account. Roles are sets of permissions. You can create one or two roles and use those roles only for service accounts. </td></tr>
<tr>
<td>Permissions</td>
<td>Individual permissions assigned to this service account. For example, give the account <strong>Proxies</strong> permission to interact with proxies or <strong>Alerts</strong> permissions to retrieve data from alerts. </td>
</tr>
</tbody>
</table>

After you create the account, you can change its role or group assignment. The process is the same for user accounts and service accounts.


## Deactivate or Activate a Service Account

You can temporarily (or permanently) deactivate a service account. When an account is deactivated, none of the corresponding tokens work.

You can activate or deactivate a service account from the **Service Accounts** page or from the **Edit Service Account** page.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To activate or deactivate an account from the <strong>Service Accounts</strong> page:
<ul><li>Click the ellipsis icon in front of the service account. </li>
<li>Select <strong>Activate</strong> or <strong>Deactivate</strong>.</li>
</ul></td>
<td width="50%"><img src="/images/sa_deactivate_multi.png" alt="deactivate or activate a service account"/></td>
</tr>
<tr>
<td width="50%">
To activate or deactivate an account from the <strong>Edit Service Account</strong> page:
<ul><li>Click the service account name to open the <strong>Edit Service Account</strong> page. </li>
<li>Use the toggle to activate or deactivate the account.</li>
</ul></td>
<td width="50%"><img src="/images/sa_deactivate.png" alt="deactivate or activate a service account"/></td>
</tr>
</tbody>
</table>

## Set the Default Service Accounts Group for New Service Accounts

Each new service account is assigned to the **Service Accounts** group.

To add any new service accounts to additional groups:

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Organization Settings**.
2. In the **Default Service Accounts Groups** text box:
  * Start typing the name of additional groups to add groups.
  * Click the **x** next to a group name to remove a group. You cannot remove the **Service Accounts** group.

Going forward, new service accounts are also added to this group.
