---
title: Managing Accounts and Groups
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: users_groups.html
summary: Learn about User Accounts, Service Accounts, and Groups
---
You can secure your Wavefront environment by:
* Granting and revoking (global) permissions for accounts and groups.
* Granting and revoking access to individual objects (initially dashboards and alerts) for accounts and groups

Accounts can be user accounts or service accounts.

**Note**: You must have Users & Groups permission to view and manage accounts, groups, and permissions in Wavefront. If you don't have Users & Groups permission, the UI menu selections, buttons, and links that you use to view accounts and permissions are not visible.

## Accounts and Groups Basics

Before you start with accounts and groups, here's what you need to know.

### What's the Difference Between User Accounts and Service Accounts?

Startin in summer 2019, Wavefront supports two account types:
* User accounts are for the users who work with Wavefront. A user account authenticates with a user name and password.
* [Service accounts](service_accounts.html) use a **token** to authenticate. Service accounts:
  - Don't have **default permissions** (unless the Everyone group has default permissions).
  - Can't perform the **UI operations** that user accounts can perform by default.

### What Can a New User Do?

When you invite a (human) user to Wavefront, what that new user can do depends on several factors.

- **New User Tasks:** All Wavefront users can perform the following tasks:
  * View the dashboards, alerts, metrics, sources, events, maintenance windows, and alert notification pages
  * Add dashboards to the list of favorites
  * View existing dashboards and charts
  * Create and interact with charts – but NOT save charts
  * Share links to dashboards and charts with other users
  * Access the user profile from the gear icon

  **Note:** It's possible that [access to dashboards and alerts](access.html#how-access-control-works) is limited.

- **New User Permissions:** Users with Users & Groups permission can view and modify new user default permissions [from the gear icon](users_groups.html#setting-default-permissions-for-new-users). These permissions do not apply to service accounts.
- **Default User Groups:** Administrators can set up a [default user group](users_groups.html#setting-the-default-group-for-new-users). All new accounts get all permissions assigned to the default user groups.


### Who is the Super Admin User?

When your company signs up with Wavefront, we ask you which user(s) you want to designate as Super Admin. A Super Admin user has all permissions, has access to all dashboards and alerts, can [restore orphan dashboards and alerts](access.html#making-orphan-dashboards-visible), and can invite other Super Admin users.

### Why Groups?

Groups make it easy to make changes for many accounts. More importantly, if you change permissions or access settings, you're less likely to forget something if you take advantage of groups. For example, you can grant additional permissions to a group of accounts or share a dashboard with a group.

**Note:** Wavefront groups do *not* currently synchronize with groups in your identity provider (IDP) such as Active Directory or LDAP.

### What's the Everyone Group?

All accounts (users and service accounts) are members of the Everyone group, which was created when Wavefront enabled the more fine-grained access model that includes groups and ACLs.

Here's what you need to know:

* You cannot remove accounts from the Everyone group. All accounts, including Super Admin, are always in the Everyone group.
* You cannot delete the Everyone group.
* You can change the permissions assigned to the Everyone group. By default, the group has no explicit permissions, which means human users can browse data but cannot modify anything.
* **Warning** If you change the permissions assigned to the Everyone group, you change the permissions for each account in your environment, including service accounts.
* If you use access control in your environment, you can share a dashboard or alert with the Everyone group to:
  - Give View & Modify access to accounts who have Dashboard (or Alert) permissions
  - Give View access to accounts who don't have Dashboard (or Alert) permissions
  You can remove the Everyone group from a dashboard or alert to limit access to that object.


## Managing Groups

Users who have Users & Groups permission can create groups, change groups by adding and removing accounts, and grant and revoke permissions.

1. Click the gear icon and select **User Group Management**.
2. To create a group:
   1. Click **New Group**, and specify the group name.
   2. Add group members (optional). You can add and remove group members later.
   3. Select the initial set of permissions for the group and click **Create**.
3. To change a group's accounts or permission:
   2. Select the group you want to change.
   3. Select **+User**, **-User**, **+Permission**, or **-Permission**.

   **Note:** If you revoke permission for a group, all accounts in that group no longer have the permission unless they belong to another group with that permission or they have the individual permission.

## Managing User Accounts

Users with Users & Groups permissions can manage accounts. This section discusses user account management. We discuss [service accounts](service_accounts.html) separately.

1. Click the gear icon and select **User Management**.
2. To add an account:
   1. Click **Invite New Users**, and specify a comma-separated list of email addresses.
   2. Specify user groups. You cannot remove users from the Everyone group.
   3. If you want to manage individual user permissions, click **Advanced** and specify permissions. We recommend managing permissions at the group level.
3. To delete a user, change permissions, or change group membership:
   1. Select one or more users on the Users page.
   2. Select the check box for one or more users.
   3. Click one of the **Permission** or  **Group** icons or the trash can button, and confirm when prompted.

   If you delete a user, you remove that user's access to Wavefront.

[New users](users_groups.html#what-can-a-new-user-do) can browse data and might have additional permissions. Each invited user receives an email with an account activation link that is valid for 24 hours.

## Adding a Super Admin

New Wavefront customers specify Super Admin users during account setup. Any existing Super Admin user can add other Super Admin users.

To add a Super Admin user:
1. Click the gear icon and select **Super Admin**.
2. Enter the user name of a user you want to add as Super Admin.

Going forward, that user can perform Super Admin tasks.

## Setting Default Permissions for New Users

By default, all new users can perform a set of new user actions discussed above. In addition, you can create a set of default permissions that are assigned to every new user added to the system from that point on:

1. Click the gear icon and select **System Preferences**.
2. Click **New User Defaults** and check the set of permissions you want to grant to new users.

The default permissions affect new user accounts that you create after you made the change.

**Note:** In many cases, it makes sense to create a group with permissions for new users, and to set that group as the default for new users.


## Setting the Default Group for New Users

Each new user is assigned to the Everyone group.

To add a new user to additional groups:
1. Click the gear icon and select **System Preferences**.
2. In the Default User Groups field
  * Start typing the name of additional groups to add groups.
  * Click the **x** next to a group name to remove a group. You cannot remove the Everyone group.

Going forward, new users are added to the group. They get the group's permissions and any permissions set as **New User Default Permissions**.
