---
title: Roles, Groups, and Permissions
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: users_roles.html
summary: Manage global permissions with roles
---

Administrators use roles to fine-tune authorization in the Wavefront environment:
1. Create one or more **roles** and assign one or more [permissions](permissions_overview.html) to each role.
2. Create one or more **groups** and add one or more accounts to each group. Accounts can be user accounts or service accounts.
3. Assign one or more roles to each group. It's also possible to assign a role to individual users.

In addition to the global roles and permissions model, Wavefront also supports [access control for individual objects](access.html), for example, administrators can limit access to a sensitive dashboard.

{% include note.html content="You must have the **Accounts, Groups & Roles** permission to view and manage authorization in Wavefront. If you don't have the permission, the corresponding UI menu selections, buttons, and links are not visible." %}


## Manage Roles and Permissions

The Wavefront roles and permissions model allows you to make sure nobody can perform tasks without the corresponding permission -- and this doc set lists the required permissions for most tasks.

Creating roles and assigning them to groups of users is most efficient and least error prone. It's possible to grant permissions or assign a role to an individual account -- that might make sense during a POC.

### Create a Role

All users with **Accounts, Groups & Roles** permission can create roles.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To create a role:
<ol><li>Log in to your Wavefront instance.</li>
<li>From the gear menu, select <strong>Account Management</strong>.</li>
<li>Click the <strong>Roles</strong> tab and select <strong>Create Role</strong>.</li>
<li>Specify a name, description, and one or more permissions for that role.</li>
<li>(Optional) Enter groups (or accounts) to assign the role to and click <strong>Create</strong>. </li>
</ol></td>
<td width="50%"><img src="/images/create_role.png" alt="create a role"/></td>
</tr>
</tbody>
</table>




### Create a Group

All users with **Accounts, Groups & Roles** permission can create groups and add members and roles to the group. You can't assign permissions to groups.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To create a role:
<ol><li>Log in to your Wavefront instance.</li>
<li>From the gear menu, select <strong>Account Management</strong>.</li>
<li>Click the <strong>Groups</strong> tab and select <strong>Create Group</strong>.</li>
<li>Specify a name and (optional) description.</li>
<li>(Optional) Add one or more accounts to the group. You cannot add a group as a member.</li>
<li>(Optional) Add one or more roles to the group now or later. </li></ol></td>
<td width="50%"><img src="/images/create_group.png" alt="create a group"/></td>
</tr>
</tbody>
</table>


### Assign a Role to a Group

Users with **Accounts, Groups & Roles** permission can assign roles when they create a group, or can add and remove roles later.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To create a role:
<ol><li>Log in to your Wavefront instance.</li>
<li>From the gear menu, select <strong>Account Management</strong>.</li>
<li>Click the <strong>Groups</strong> tab and change role assignment in one of these ways: </li>
<ul><li>Select the check box for the group to change, click <strong>+Role</strong> or <strong>-Role</strong>, and select a role to change role assignment. </li>
<li>Select the check box for the group and click the group name. In the <strong>Edit Group</strong> dialog, make the desired changes and click <strong>Update</strong></li></ul>
</ol>
</td>
<td width="50%"><img src="/images/add_role_to_group.png" alt="add role to group"/></td>
</tr>
</tbody>
</table>


## Grant or Revoke Account Permissions Explicitly

Assigning a role to a group of users is more efficient and leaves less room for error than granting or revoking account permission or assigning a role to an account. We support those two ways of managing permissions in part for compatibility.

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
To grant or revoke permissions from the <strong>Edit Service Account</strong> page:
<ol><li>Click the service account name to open the Edit Service Account page. </li>
<li>Select the permission(s) that you want to grant or revoke in the Permissions field.</li>
</ol></td>
<td width="50%"><img src="/images/sa_add_permission_single.png" alt="add or remove service account permissions"/></td>
</tr>

</tbody>
</table>

## Learn About Users and Groups (FAQs)

Before you start with users and and groups, here are some FAQs:

### What are User Accounts & Service Accounts?

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


### Why Groups?

Groups allow you to combine a set of users. You can then:
* Assign a role to the group.
* Give [view or modify access](access.html) for individual dashboards and alerts to the group.

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
