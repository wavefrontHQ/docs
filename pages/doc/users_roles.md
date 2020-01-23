---
title: Accounts, Roles, and Permissions
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: users_roles.html
summary: Manage permissions for user accounts, service accounts, and roles
---

Administrators manage global permissions in the Wavefront environment:
* Granting and revoking (global) permissions for accounts.
* Assigning or removing roles, that is, sets of permissions, to accounts or groups.

Administrators can also [manage access to individual objects](access.html), for example access to a sensitive dashboard.

Accounts can be user accounts or service accounts.

{% include note.html content="You must have the **Accounts, Groups & Roles** permission to view and manage authorization in Wavefront. If you don't have the permission, the corresponding UI menu selections, buttons, and links are not visible." %}


## Permissions, Accounts, and Roles Basics

<!---
This video shows how you find out the permissions you have, and how to manage permissions for users and groups.

<p><a href="https://youtu.be/kQ-w-DyjW5M"><img src="/images/v_permissions_2019.png" style="width: 700px;" alt="permissions for users and groups"/></a>
</p>--->

Before you start with accounts and roles, here are some FAQs:

### What are User Accounts and Service Accounts?

Wavefront supports two account types:
* **[User accounts](user_accounts.html)** are for human users who work with Wavefront. A user account authenticates with a user name and password.
* **[Service accounts](service_accounts.html)** are for services that interact with Wavfront through an API and use a **token** to authenticate. Service accounts:
  - Don't have **default permissions** (unless the **Default Role** has default permissions).
  - Can't perform the **UI operations** that user accounts can perform by default.
  In the UI, service acount names always start with **sa:**

### Who is the Super Admin User?

When your company signs up with Wavefront, we ask you which user(s) you want to designate as Super Admin. A Super Admin user:
* Has all permissions
* Has access to all dashboards and alerts
* Can [restore orphan dashboards and alerts](access.html#making-orphan-dashboards-visible)
* Can invite other Super Admin users.

### Why Roles?

Administrators can assign permissions to accounts. Roles allow administrators to bundle a set of permissions and assign it to an account or a group.

### Why Groups?

Groups allow you to combine a set of users. You can then:
* Assign a role to the group.
* Give [view or modify access](access.html) to the group.

Wavefront groups do *not* currently synchronize with groups in your identity provider (IDP) such as Active Directory or LDAP.

<!--- Obsolete
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

--->

### What is the Default Role?

The **Default Role** is a predefined role that allows you to give certain permissions to all accounts.

* By default, this role has no associated permissions.
* If your environment had assigned permissions to the Everyone group before 2019.52.x, those permissions are automatically assigned to the **Default Role**.

In most cases, it makes sense to create explicit roles with names that make sense in your environment.

## Manage Permissions With Roles

Users who have **Accounts, Groups & Roles** permission can create and modify roles and assign or revoke roles.

### Create and Modify Roles

Users who have **Accounts, Groups & Roles** permission can create and modify roles.

1. Click the gear icon, select **Account Management**, and click the **Roles** tab.
2. To create a role:
   1. Click **New Role**, and specify the role name and description.
      It might make sense to distinguish role names and group names, for example, by adding the suffix `-Role` to the role name.
   2. Select the permissions to associate with this role.
   2. Optionally enter groups or accounts to associate with the role and click **Create**.
3. To change a role's permissions or assignees:
   2. Select one or more role that you want to change.
   3. Select one of the options, for example, to add an additional account or group to one or more roles.

### Grant or Revoke Account Permissions with Roles

Users who have **Accounts, Groups & Roles** permission can assign roles to either User Accounts or Service Accounts explicitly.

{% include note.html content="It's best practice to assign roles to groups, but it sometimes makes sense to assign roles to individual accounts." %}




### Grant or Revoke Group Permissions with Roles

Users who have **Accounts, Groups & Roles** permission can create and change groups by adding and removing accounts, and assign and revoke roles.

1. Click the gear icon, select **Account Management**, and click the **Groups** tab.
2. To create a group:
   1. Click **New Group**, and specify the group name.
   2. Add group members (optional). You can add and remove group members later.
   3. Select the initial set of permissions for the group and click **Create**.
3. To change a group's accounts or permission:
   2. Select the group you want to change.
   3. Select **+Account**, **-Account**, **+Permission**, or **-Permission**.

   **Note:** If you revoke permission for a group, all accounts in that group no longer have the permission unless they belong to another group with that permission or they have the individual permission.


## Grant or Revoke Account Permissions Explicitly

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
