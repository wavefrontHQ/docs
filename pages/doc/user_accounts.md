---
title: Manage User Accounts
keywords: administration
tags: [administration]
sidebar: doc_sidebar
published: false
permalink: user_accounts.html
summary: Create and manage user accounts.
---
You can manage authorization in your Wavefront environment by:
* Assigning and revoking roles for accounts and groups to give **global** permissions.
* Granting and revoking access to **individual objects** (initially dashboards and alerts) for accounts and groups

Wavefront supports:
* User accounts, discussed here, which authenticate with a username and password.
* [Service accounts](service_accounts.html), which authenticate with a token.

{% include note.html content="You must have **Accounts, Groups & Roles** permission to view and manage accounts, groups, and permissions in Wavefront. If you don't have **Accounts, Groups & Roles** permission, the UI menu selections, buttons, and links that you use to view accounts and permissions are not visible. " %}

## User Account Basics

User accounts log in with a username and password.
* All authenticated users can perform certain tasks such as viewing dashboards and charts or sharing links to charts.
* **Roles** determine what users can do globally. Each role has one or more permissions. For example, assume an **Interns** role that has **Dashboard** permissions. All users with the **Interns** role can view and manage all dashboards.
<!---
* **Default permissions** can be set via New Default Groups (preferred) or New User Permissions.--->
* **[Access](access.html)** applies to individual objects. For example, some users don't have access to a dashboard with financial data. Users who have modify access for a dashboard or alert can grant or revoke access for that object.

## Create and Manage User Accounts

<!---Maybe add a pic like for service accounts?--->

Users with **Accounts, Groups & Roles** permissions can manage accounts. This section discusses user account management. We discuss [service accounts](service_accounts.html) separately.

1. Click the gear icon <i class="fa fa-cog"/> on the taskbar and select **Account Management**.
2. To add an account:
   1. Click **Invite New Users**, and specify a comma-separated list of email addresses.
   2. Specify user groups. You cannot remove users from the Everyone group.
   3. To grant permissions to individual users, click **Advanced**.
      * Assign a role to the user
      * Or give the user explicit permissions
   We recommend managing permissions at the group level.
3. To delete a user, change roles and permissions, or change group membership:
   1. Select one or more users on the Users page.
   2. Select the check box for one or more users.
   3. Click one of the **Permission** or  **Group** icons or the trash can button, and confirm when prompted.

   If you delete a user, you remove that user's access to Wavefront.

Each invited user receives an email with an account activation link that is valid for 24 hours. All new users can browse data and might have additional permissions.

## What Can a New User Do?

When you invite a (human) user to Wavefront, what that new user can do depends on several factors.

- **New User Tasks:** All Wavefront users can perform the following tasks:
  * View the dashboards, alerts, metrics, sources, events, maintenance windows, and alert notification pages
  * Add dashboards to the list of favorites
  * View existing dashboards and charts
  * Create and interact with charts – but NOT save charts
  * Share links to dashboards and charts with other users
  * Access the user profile from the gear icon

  **Note:** It's possible that [access to dashboards and alerts](access.html#how-access-control-works) is limited.

- **New User Permissions:** Users with Accounts, Groups & Roles permission can view and modify new user default permissions from the Organization Settings menu item available from gear icon. These permissions *do not* apply to service accounts.
- **New User Default Groups:** Users with Accounts, Groups & Roles permission can set up a default groups for new users from the Organization Settings menu item available from the gear icon. All new user accounts get all permissions assigned to the default user groups. These permissions *do not* apply to service accounts.

## Set Default Permissions for New Users

You can set default permissions for new users. By default, all new users can perform a set of new user actions discussed above. In addition, you can create a set of default permissions that are assigned to every new user added to the system from that point on:

1. Click the gear icon and select **Organization Settings**.
2. Click **New Accounts Defaults** and select the set of permissions you want to grant to new users.

The default permissions affect only new user accounts that you create after you made the change. They do not affect service accounts.

**Note:** In many cases, it makes sense to create a group with permissions for new users, and to set that group as the default for new users.

## Set the Default Group for New Users

Each new user is assigned to the Everyone group.

To add any new user to additional groups:

1. Click the gear icon and select **Organization Settings**.
2. In the Default User Groups field
  * Start typing the name of additional groups to add groups.
  * Click the **x** next to a group name to remove a group. You cannot remove the Everyone group.

Going forward, new users are added to the group. They get the group's permissions and any permissions set as **New User Default Permissions**.
--->
