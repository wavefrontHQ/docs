---
title: Manage User Accounts
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: user_accounts.html
summary: Create and manage user accounts.
---
You can manage authorization in your Wavefront environment by:
* Granting and revoking (global) permissions for accounts and groups.
* Granting and revoking access to individual objects (initially dashboards and alerts) for accounts and groups

This page shows how to manage users accounts. Users authenticate with a user name and password. We also support [service accounts](service_accounts.html), which authenticate with a token.

**Note**: You must have Accounts & Groups permission to view and manage accounts, groups, and permissions in Wavefront. If you don't have Accounts & Groups permission, the UI menu selections, buttons, and links that you use to view accounts and permissions are not visible.

## User Account Basics

Accounts can be user accounts or [service accounts](service_accounts.html). User accounts log in with a username and password. Here are some basics:
* All authenticated users can perform certain tasks such as viewing dashboards and charts or sharing links to charts.
* **Permissions** determine what users can do globally. For example, a user with **Dashboard** permissions can view and manage all dashboards. Users with Accounts & Groups permission grant permissions to other users.
* **Default permissions** can be set via New Default Groups (preferred) or New User Permissions.
* **[Access](access.html)** applies to individual objects. For example, some users don't have access to a dashboard with financial data. Users who have modify access for a dashboard or alert can grant or revoke access for that object.

## Create and Manage User Accounts

<!---Maybe add a pic like for service accounts?--->

Users with Accounts & Groups permissions can manage accounts. This section discusses user account management. We discuss [service accounts](service_accounts.html) separately.

1. Click the gear icon and select **Account Management**.
2. To add an account:
   1. Click **Invite New Users**, and specify a comma-separated list of email addresses.
   2. Specify user groups. You cannot remove users from the Everyone group.
   3. If you want to manage individual user permissions, click **Advanced** and specify permissions. We recommend managing permissions at the group level.
3. To delete a user, change permissions, or change group membership:
   1. Select one or more users on the Users page.
   2. Select the check box for one or more users.
   3. Click one of the **Permission** or  **Group** icons or the trash can button, and confirm when prompted.

   If you delete a user, you remove that user's access to Wavefront.

Each invited user receives an email with an account activation link that is valid for 24 hours. New users can browse data and might have additional permissions.

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

- **New User Permissions:** Users with Accounts & Groups permission can view and modify new user default permissions [from the gear icon](users_groups.html#setting-default-permissions-for-new-users). These permissions *do not* apply to service accounts.
- **Default Groups:** Administrators can set up a [default user group](users_groups.html#setting-the-default-group-for-new-users). All new accounts get all permissions assigned to the default user groups. These permissions *do not* apply to service accounts.

## Set Default Permissions for New Users

You can set default permissions for new users. By default, all new users can perform a set of new user actions discussed above. In addition, you can create a set of default permissions that are assigned to every new user added to the system from that point on:

1. Click the gear icon and select **System Preferences**.
2. Click **New User Defaults** and check the set of permissions you want to grant to new users.

The default permissions affect new user accounts that you create after you made the change.

**Note:** In many cases, it makes sense to create a group with permissions for new users, and to set that group as the default for new users.

## Set the Default Group for New Users

Each new user is assigned to the Everyone group.

To add any new user to additional groups:

1. Click the gear icon and select **System Preferences**.
2. In the Default User Groups field
  * Start typing the name of additional groups to add groups.
  * Click the **x** next to a group name to remove a group. You cannot remove the Everyone group.

Going forward, new users are added to the group. They get the group's permissions and any permissions set as **New User Default Permissions**.

## Add a Super Admin User

New Wavefront customers specify Super Admin users during account setup. Any existing Super Admin user can add other Super Admin users.

**To add a Super Admin user:**

1. Click the gear icon and select **Super Admin**.
2. Enter the user name of a user you want to add as Super Admin.

Going forward, that user can perform Super Admin tasks.
