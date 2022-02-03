---
title: Manage User Accounts
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: user-accounts.html
summary: Create and manage user accounts.
---
You can manage authorization in your Wavefront environment by:
* Assigning and revoking roles for groups or accounts to give **global** permissions.
* Granting and revoking access to **individual objects** (initially dashboards and alerts) for accounts and groups.
* [Managing API tokens](wavefront_api.html#managing-the-api-tokens-for-your-organization).

Wavefront supports:
* User accounts, discussed here, which authenticate with a username and password. For API access, user accounts authenticate with API tokens.
* [Service accounts](service-accounts.html), which authenticate with API tokens.

{% include note.html content="You must have **Accounts** permission to view and manage accounts, groups, permissions, and API tokens in Wavefront. If you don't have **Accounts** permission, the UI menu selections, buttons, and links that you use to view accounts, permissions, and API tokens are not visible. " %}


## What Are User Accounts?

User accounts log in with a user name and password.
* All authenticated users can perform certain tasks such as viewing dashboards and charts or sharing links to charts.
* **Roles** determine what users can do globally. Each role has one or more permissions. For example, assume that you have created an **Interns** role that has the **Dashboard** permission. All users with the **Interns** role can view and manage all dashboards.
* **[Access](access.html)** applies to individual objects. For example, some users don't have access to a dashboard with financial data. Users who have modify access for a dashboard or alert can grant or revoke access for that object.

## Create, Edit, and Delete User Accounts

Users with **Accounts** permissions can manage accounts.

1. Click the gear icon <i class="fa fa-cog"/> on the taskbar and select **Accounts**.
2. To add an account:
   1. Click **Invite New Users** and specify a comma-separated list of email addresses.
   2. Specify user groups. You cannot remove users from the **Everyone** group.
   3. To grant permissions to individual users, click **Advanced**. You can:
      * Assign a role to the user
      * Or give the user explicit permissions
   {% include tip.html content="We recommend managing permissions at the group level and not assigning permissions to individual users." %}

   Each invited user receives an email with an account activation link that is valid for 24 hours. All new users can browse data and might have additional permissions.
3. To change roles, permissions, or group membership:
   1. Select the check box for one or more users on the **Users Accounts** page.
   2. Click a button (e.g., **+Role** or **-Permission**, and so on), change the roles, permissions, or group membership.
4. To delete a user:
   1. Select the check box for the user on the **Users Accounts** page.
   2. Click the trash icon and confirm when prompted.

   If you delete a user, you remove that user's access to Wavefront.

   {% include tip.html content="As a safeguard, you cannot select multiple users and delete them. You can delete only one user at a time." %}

## Sign Out a User

As a [super admin user](authorization.html#who-is-the-super-admin-user), you can sign out other users by using the Wavefront REST API. To sign out a user while you are logged in as a Super Admin user, simply run a POST request with the `logout` API call. For example:

```
POST https://<your_wavefront_cluster>.wavefront.com/api/logout/{identifier}
```

You must specify the `{identifier}`, which is the email address of the user that you want to log out. If you are not logged in to your Wavefront cluster, when you run the POST request, you must also provide a valid [API token](wavefront_api.html#generating-an-api-token).

## What Can a New User Do?

When you invite a new (human) user to Wavefront, what that new user can do depends on several factors.

- **New User Tasks:** All Wavefront users can perform the following tasks:
  * View the dashboards, alerts, metrics, sources, events, maintenance windows, and alert notification pages.
  * Add dashboards to the list of favorites.
  * View existing dashboards and charts.
  * Create and interact with charts – but NOT save charts.
  * Share links to dashboards and charts with other users.
  * Access the user profile from the gear icon <i class="fa fa-cog"/> on the taskbar.

  {% include note.html content="It's possible that [access to dashboards and alerts](access.html#how-access-control-works) is limited." %}


- **New User Permissions:** Users with the **Accounts** permission can view and modify new user default permissions. To do that, from the gear icon <i class="fa fa-cog"/> on the taskbar, select **Organization Settings**. These permissions *do not* apply to service accounts.
- **New User Default Groups:** Users with the **Accounts** permission can set up default groups for new users. To do that, from the gear icon <i class="fa fa-cog"/> on the taskbar, select **Organization Settings**.  All new user accounts get all permissions assigned to the default user groups. These permissions *do not* apply to service accounts.

## Set Default Permissions for New Users

You can set default permissions for new users. By default, all new users can perform a set of new user actions discussed above. In addition, you can create a set of default permissions that are assigned to every new user added to the system later on:

1. Click the gear icon <i class="fa fa-cog"/> on the taskbar and select **Organization Settings**.
2. On the **New Accounts Defaults** tab, select the set of permissions you want to grant to new users.

The default permissions affect only new user accounts that you create after you made the change. They do not affect service accounts.

{% include note.html content="In many cases, it makes sense to create a group with permissions for new users, and to set that group as the default for new users." %}

## Set the Default User Group for New Users

Each new user is assigned to the **Everyone** group.

To add any new user to additional groups:

1. Click the gear icon <i class="fa fa-cog"/> on the taskbar and select **Organization Settings**.
2. In the **Default User Groups** text box:
  * Start typing the name of additional groups to add groups.
  * Click the **x** next to a group name to remove a group. You cannot remove the Everyone group.

Going forward, new users are added to the group. They get the group's permissions and any permissions set as **New User Default Permissions**.
