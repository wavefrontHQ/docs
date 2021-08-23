---
title: Accounts, Groups, and Permissions
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: users_groups.html
published: false
summary: Manage authorization for user accounts and service accounts
---

You can manage authorization in your Wavefront environment by:
* Granting and revoking (global) permissions for accounts and groups.
* Granting and revoking access to individual objects (initially dashboards and alerts) for accounts and groups

Accounts can be user accounts or service accounts.

{% include note.html content="You must have **Accounts, Groups & Roles** permission to view and manage accounts, groups, and permissions in Wavefront. If you don't have **Accounts, Groups & Roles** permission, the UI menu selections, buttons, and links that you use to view accounts and permissions are not visible. " %}

## Permissions, Accounts, and Groups Basics

This video shows how you find out the permissions you have, and how to manage permissions for users and groups.

<!--- took out link to outdated video--->

Before you start with accounts and groups, here's what you need to know.

### What's the Difference Between User Accounts and Service Accounts?

Starting in summer 2019, Wavefront supports two account types:
* **[User accounts](user_accounts.html)** are for  users who work with Wavefront. A user account authenticates with a username and password.
* **[Service accounts](service_accounts.html)** are for services that interact with Wavefront through an API and use a **token** to authenticate. Service accounts:
  - Don't have **default permissions** (unless the Everyone group has default permissions).
  - Can't perform the **UI operations** that user accounts can perform by default.


### Who is the Super Admin User?

When your company signs up with Wavefront, we ask you which user(s) you want to designate as Super Admin. A Super Admin user has all permissions, has access to all dashboards and alerts, can [restore orphan dashboards and alerts](access.html#making-orphan-dashboards-visible), and can invite other Super Admin users.

### Why Groups?

Groups make it easy to modify many accounts. More importantly, if you change permissions or access settings for groups, you're less likely to forget something than if you make changes to individual users. For example, you can grant additional permissions to a group of accounts or share a dashboard with a group.

**Note:** Wavefront groups do *not* currently synchronize with groups in your identity provider (IDP) such as Active Directory or LDAP.

### What's the Everyone Group?

All accounts (users and service accounts) are members of the Everyone group.

Here's what you need to know:

* You cannot remove accounts from the Everyone group. All accounts, including Super Admin, are always in the Everyone group.
* You cannot delete the Everyone group.
* You can change the permissions assigned to the Everyone group. By default, the group has no explicit permissions, which means human users can browse data but cannot modify anything and service accounts have no permissions.

  **Warning** If you add permissions assigned to the Everyone group, you change the permissions for each account in your environment, including service accounts.
* If you use access control in your environment, you can share a dashboard or alert with the Everyone group to:
  - Give View & Modify access to accounts who have Dashboard (or Alert) permissions
  - Give View access to accounts who don't have Dashboard (or Alert) permissions
  You can remove the Everyone group from a dashboard or alert access list to limit access to that object.


## Manage Groups

Users who have Accounts, Groups & Roles permission can create groups, change groups by adding and removing accounts, and grant and revoke permissions.

1. Click the gear icon <i class="fa fa-cog"/> on the taskbar and select **Group Management**.
2. To create a group:
   1. Click **New Group**, and specify the group name.
   2. Add group members (optional). You can add and remove group members later.
   3. Select the initial set of permissions for the group and click **Create**.
3. To change a group's accounts or permission:
   2. Select the group you want to change.
   3. Select **+Account**, **-Account**, **+Permission**, or **-Permission**.

   **Note:** If you revoke permission for a group, all accounts in that group no longer have the permission unless they belong to another group with that permission or they have the individual permission.


## Add a Super Admin

New Wavefront customers specify Super Admin users during account setup. Any existing Super Admin user can add other Super Admin users.

**To add a Super Admin user:**

1. Click the gear icon <i class="fa fa-cog"/> on the taskbar and select **Super Admin**.
2. Enter the username of a user you want to add as Super Admin.

Going forward, that user can perform Super Admin tasks.

## Grant or Revoke Account Permissions

The process of granting permissions is the same for users and for service accounts

You can grant a service account permissions when you create it or add permissions later from the **Service Accounts** / **Users** page or from the **Edit Service Account** / **Edit User** page.

The following example shows this for service accounts.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To grant or revoke permissions from the Service Accounts page:
<ol><li>Select one or more service accounts. </li>
<li>Click <strong>+Permissions</strong> or <strong>-Permissions</strong> and select the permission to add or remove.</li>
</ol></td>
<td width="50%"><img src="/images/sa_add_permission_global.png" alt="globally add or remove service account permissions"/></td>
</tr>
<tr>
<td width="50%">
To grant or revoke permissions <strong>Edit Service Account</strong> page:
<ol><li>Click the service account name to open the Edit Service Account page. </li>
<li>Select the permission(s) that you want to grant or revoke in the Permissions field.</li>
</ol></td>
<td width="50%"><img src="/images/sa_add_permission_single.png" alt="add or remove service account permissions"/></td>
</tr>

</tbody>
</table>
