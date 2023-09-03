---
title: Manage Service Accounts in Operations for Applications on VMware Cloud Services
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_service_accounts.html
summary: Create and manage service accounts.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for VMware Cloud services subscriptions. For **original** subscriptions, see [Manage Service Accounts](service-accounts.html)."%}

The usage of service accounts in Operations for Applications on VMware Cloud services is **restricted** to support only the proxy setup of a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-supported-with-service-accounts) that still authenticate with Operations for Applications API tokens. Most of the integrations require proxy setup for authentication with a VMware Cloud services access token.

If you migrated from an original Operations for Applications subscription, you might have some legacy service accounts for backward compatibility. It's recommended that you gradually switch to using [server to server OAuth apps](csp_server_to_server_apps.html) which authenticate with more secure VMware Cloud services access tokens.

## What Are Service Accounts?

* A service account uses an **Operations for Applications API token** to authenticate.
* By default, service accounts don't have any permissions, even view permissions. Users with the **Admin** service role must explicitly grant each service account only the permission required for the task that’s being automated (least required privilege). There's no limit on the number of service accounts that you can create in your service instance. 

As a user with the **Admin** service role, you [generate (and revoke, if needed)](api_tokens.html#generate-and-manage-the-api-tokens-for-a-service-account) API tokens for the service account. It’s also possible to deactivate a service account completely. 

{% include note.html content="Operations for Applications includes an internal **Service Accounts** system group, where all service accounts together with the [server to server apps](csp_server_to_server_apps.html) with access to the service are added automatically. This group doesn't have any roles and permissions. This group can be used when managing [access to dashboards and alerts](csp_access.html), [metrics security policy rules](csp_metrics_security.html), and [ingestion policies](ingestion_policies.html)."%}

## How Service Accounts Work

If you plan to set up an integration that uses a proxy authentication with an Operations for Applications API token, you must create a service account with the **Proxies** permission and generate an API token for it.

1. Create a service account from the UI. The service account name must be unique.
2. Assign the service account with the **Proxies** permission.
3. Set up the proxy in your integration to pass the API token of the service account.

   The proxy authenticates seamlessly to the API without embedding secret keys or user credentials in your instance, image, or application code.

You can disable a service account if you temporarily don't need it, or you can delete the account permanently.


## Create a Service Account

Creating a service account is done in the Operations for Applications UI.

1. Log in to your service instance as a user with the **Admin** service role.
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
<td>Permissions</td>
<td>Individual permissions assigned to this service account. Assign the service account with the <strong>Proxies</strong> permission, so that you can use it for the proxy setup of an integration that authenticates with an Operations for Applications API token.</td>
</tr>
</tbody>
</table>

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

## Grant or Revoke Permissions

You can grant a permissions to a service account when you create the account or add permissions later from the **Service Accounts** page or from the **Edit Service Account** page.

The following example shows two ways of explicitly grant or revoke permissions for service accounts.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To grant or revoke permissions from the <strong>Service Accounts</strong> page:
<ol><li>Select one or more service accounts. </li>
<li>Click <strong>+Permissions</strong> or <strong>-Permissions</strong> and select the permission to add or remove.</li>
</ol></td>
<td width="50%"><img src="/images/csp_sa_add_permission_global.png" alt="add or remove service account permissions"/></td>
</tr>
<tr>
<td width="50%">
To grant or revoke permissions from the <strong>Edit Service Account</strong> page:
<ol><li>Click the service account name to open the <strong>Edit Service Account</strong> page. </li>
<li>Select the permissions that you want to grant or revoke.</li>
</ol></td>
<td width="50%"><img src="/images/sa_add_permission_single.png" alt="add or remove service account permissions"/></td>
</tr>

</tbody>
</table>

