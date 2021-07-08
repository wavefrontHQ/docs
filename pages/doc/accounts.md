---
title: User Accounts and Service Accounts
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: accounts.html
summary: Create and manage user accounts and service accounts.
---
You can manage authorization in your Wavefront environment by:
* Assigning and revoking roles for groups or accounts to give **global** permissions.
* Granting and revoking access to **individual objects** (initially dashboards and alerts) for accounts and groups.

Wavefront supports:
* User accounts, discussed here, which authenticate with a username and password.
* Service accounts, which authenticate with a token.

{% include note.html content="You must have **Accounts, Groups & Roles** permission to view and manage accounts, groups, and permissions in Wavefront. If you don't have **Accounts, Groups & Roles** permission, the UI menu selections, buttons, and links that you use to view accounts and permissions are not visible. " %}


## User Accounts

User accounts log in with a username and password.
* All authenticated users can perform certain tasks such as viewing dashboards and charts or sharing links to charts.
* **Roles** determine what users can do globally. Each role has one or more permissions. For example, assume an **Interns** role that has **Dashboard** permissions. All users with the **Interns** role can view and manage all dashboards.
* **[Access](access.html)** applies to individual objects. For example, some users don't have access to a dashboard with financial data. Users who have modify access for a dashboard or alert can grant or revoke access for that object.

### Create, Edit, and Delete User Accounts

Users with **Accounts, Groups & Roles** permissions can manage accounts.

1. Click the gear icon and select **Account Management**.
2. To add an account:
   1. Click **Invite New Users** and specify a comma-separated list of email addresses.
   2. Specify user groups. You cannot remove users from the **Everyone** group.
   3. To grant permissions to individual users, click **Advanced**.
      * Assign a role to the user
      * Or give the user explicit permissions
   {% include tip.html content="We recommend managing permissions at the group level and not assigning permissions to individual users." %}

   Each invited user receives an email with an account activation link that is valid for 24 hours. All new users can browse data and might have additional permissions.
3. To change roles, permissions, or group membership:
   1. Select the check box for one or more users on the Users page.
   2. Click one of the icons (e.g. **+Role** or **-Permission**), and confirm when prompted.
4. To delete a user:
   1. Select the check box for the user on the Users page.
   2. Click the trash can button and confirm when prompted.

   If you delete a user, you remove that user's access to Wavefront.

   {% include tip.html content="As a safeguard, you cannot select multiple users and delete them. Delete only one user at a time." %}

### Sign Out a User

As a [super admin user](authorization.html#who-is-the-super-admin-user), you can sign out other users by using the Wavefront REST API. To sign out a user while you are logged in as a super admin user, simply run a POST request with the `logout` API call. For example:

```
POST https://<your_wavefront_cluster>.wavefront.com/api/logout/{identifier}
```

You must specify the `{identifier}`, which is the email address of the user that you want to log out. If you are not logged in to your Wavefront cluster, when you run the POST request, you must also provide a valid [API token](wavefront_api.html#generating-an-api-token).

### What Can a New User Do?

When you invite a (human) user to Wavefront, what that new user can do depends on several factors.

- **New User Tasks:** All Wavefront users can perform the following tasks:
  * View the dashboards, alerts, metrics, sources, events, maintenance windows, and alert notification pages
  * Add dashboards to the list of favorites
  * View existing dashboards and charts
  * Create and interact with charts – but NOT save charts
  * Share links to dashboards and charts with other users
  * Access the user profile from the gear icon

{% include note.html content="It's possible that [access to dashboards and alerts](access.html#how-access-control-works) is limited." %}


- **New User Permissions:** Users with Accounts, Groups & Roles permission can view and modify new user default permissions from the Organization Settings menu item that is available from gear icon. These permissions *do not* apply to service accounts.
- **New User Default Groups:** Users with Accounts, Groups & Roles permission can set up a default groups for new users from the Organization Settings menu item that is available from the gear icon. All new user accounts get all permissions assigned to the default user groups. These permissions *do not* apply to service accounts.

## Service Accounts

A service account can be used to automate management of objects like dashboard, alerts, etc. A service account can't perform the **UI operations** that all user accounts can [perform by default](accounts.html#what-can-a-new-user-do). There's no limit on the number of service accounts you can create in your organization. 

{% include note.html content="A service account must have **permissions** to perform tasks. To run queries, a service account must have **Metrics** permission. To manage dashboards and alerts, the service account might need both permissions and [access](access.html)." %}

* A service account uses a **token** to authenticate.
* Each account is automatically added to the **Everyone**  group. If a role is assigned to that group, the service account gets the permissions from that role.
* Service account can be added to any group to get that group's role (and permissions).


### How Service Accounts Work

If you build a service or tool that manages proxies or ingests data, then that tool must authenticate to the Wavefront API.

1. Create a service account from the Wavefront UI. The service account name must be unique.
2. Assign a role to the account to give the account the permissions it needs. Service accounts can perform get, modify, and delete tasks **only** if they have the necessary permissions.
2. Configure your tool to pass the service account credentials (API token) to the Wavefront API.

   The tool authenticates seamlessly to the API without embedding secret keys or user credentials in your instance, image, or application code.

You can disable a service account if you temporarily don't need it, or you can delete the account permanently.


### Create a Service Account

Creating a service account is different from creating a user account.

1. From the gear icon, select **Account Management**.
2. Click the **Service Accounts** tab and click **Create New Account**.
3. On the New Service Account page, specify the account details and click **Create**.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="15%">Field</th><th width="85%">Description</th></tr>
</thead>
<tr>
<td>
Account ID</td>
<td>ID of the account. We prefix this ID with <strong>sa::</strong>. <p>A service account name must be unique. Wavefront converts service account ID to lower case to avoid confusion that can result from almost identical account names (e.g. Service-1 and service-1). Users can type upper case or lower case. </p> </td>
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
<td>By default, service accounts are added to the <strong>Everyone</strong> group and you cannot remove them. If you assign roles to the <strong>Everyone</strong> group, all the service accounts get the permissions associated with that role. You can also add a service accounts to other groups. </td></tr>
<tr>
<td>Roles</td>
<td>Roles for the service account. Roles are sets of permissions. You could create one or two roles and use those roles only for service accounts. </td></tr>
<tr>
<td>Permissions</td>
<td>Individual permissions assigned to this service account. For example, give the account <strong>Proxies</strong> permission to interact with proxies or <strong>Alerts</strong> permissions to retrieve data from alerts. </td>
</tr>
</tbody>
</table>

After you create the account, you can change its role or group assignment. The process is the same for user accounts and service accounts.


### Deactivate or Activate a Service Account

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
