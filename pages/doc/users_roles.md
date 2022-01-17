---
title: Manage Roles, Groups, and Permissions
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: users_roles.html
summary: Manage global permissions with roles.
---

Administrators use roles to fine-tune authorization in the Wavefront environment:
1. Create one or more **roles** and assign one or more [permissions](permissions_overview.html) to each role.
2. Create one or more **groups** and add one or more accounts to each group. Accounts can be user accounts or service accounts.
3. Assign one or more roles to each group. It's also possible to assign a role to individual users.

In addition to the global roles and permissions model, Wavefront also supports [access control for individual objects](access.html), for example, administrators can limit access to a sensitive dashboard.

{% include note.html content="You must have **Accounts** permission to view and manage authorization in Wavefront. If you don't have the permission, the corresponding UI menu selections, buttons, and links are not visible." %}


## Manage Roles and Permissions

The Wavefront roles and permissions model allows you to make sure nobody can perform tasks without the corresponding permission -- and here we list the required permissions for most tasks.

Creating roles and assigning them to groups of users is most efficient and least error prone. It's possible to grant permissions or assign a role to an individual account -- that might make sense during a POC.

### Create a Role

All users with **Accounts** permission can create roles.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To create a role:
<ol><li>Log in to your Wavefront cluster.</li>
<li>Click the gear icon on the taskbar and select <strong>Accounts</strong>.</li>
<li>On the <strong>Roles</strong> tab, click <strong>Create Role</strong>.</li>
<li>Specify a name, an optional description, and one or more permissions for that role.</li>
<li>(Optional) Enter groups (or accounts) to assign the role to. You can also add groups or accounts later. </li>
<li>Click <strong>Create</strong>. </li>
</ol></td>
<td width="50%"><img src="/images/create_role.png" alt="create a role"/></td>
</tr>
</tbody>
</table>




### Create a Group

All users with **Accounts** permission can create groups and add members and roles to the group. You can't assign permissions to groups.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To create a group:
<ol><li>Log in to your Wavefront cluster.</li>
<li>Click the gear icon on the taskbar and select <strong>Accounts</strong>.</li>
<li>On the <strong>Groups</strong> tab, click <strong>Create Group</strong>.</li>
<li>Specify a name and, optionally, a description.</li>
<li>(Optional) Add one or more accounts to the group now or later. You cannot add a group as a member.</li>
<li>(Optional) Add one or more roles to the group now or later. </li>
<li>Click <strong>Create</strong>. </li></ol></td>
<td width="50%"><img src="/images/create_group.png" alt="create a group"/></td>
</tr>
</tbody>
</table>


### Assign a Role to a Group

Users with **Accounts** permission can assign roles to a group when they create the group, or can add and remove roles later.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To assign a role to a group:
<ol><li>Log in to your Wavefront cluster.</li>
<li>Click the gear icon on the taskbar and select <strong>Accounts</strong>.</li>
<li>On the <strong>Groups</strong> tab, change role assignment in one of these ways: </li>
<ul><li>Select the group check box, click <strong>+Role</strong> or <strong>-Role</strong>, and select a role to change role assignment (not shown on  the right).</li>
<li>Click the group name. In the <strong>Edit Group</strong> page, make the desired changes and click <strong>Update</strong>, as shown on the right.</li></ul>
</ol>
</td>
<td width="50%"><img src="/images/add_role_to_group.png" alt="add a role to group"/></td>
</tr>
</tbody>
</table>


## Grant or Revoke Account Permissions Explicitly

The process of granting permissions is the same for users and for service accounts.

You can grant a permissions to an account when you create the account or add permissions later from the **Service Accounts** / **Users** page or from the **Edit Service Account** / **Edit User** page.


{% include tip.html content="Assigning a role to a group of users is more efficient and leaves less room for error than granting or revoking account permission or assigning a role to an account." %}


The following example shows two ways of explicitly grant or revoke permissions for service accounts.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To grant or revoke permissions from the <strong>Service Accounts</strong> page:
<ol><li>Select one or more service accounts. </li>
<li>Click <strong>+Permissions</strong> or <strong>-Permissions</strong> and select the permission to add or remove.</li>
</ol></td>
<td width="50%"><img src="/images/sa_add_permission_global.png" alt="globally add or remove service account permissions"/></td>
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
