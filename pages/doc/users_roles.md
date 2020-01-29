---
title: Roles, Groups, and Permissions
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: users_roles.html
summary: Manage global permissions with roles
---

Administrators manage global permissions in the Wavefront environment:
* Create one or more **roles** and assigns one or more [permissions](permissions_overview.html) to each role.
* Create one or more **groups** and adds one or more users to each group.
* Assign one or more roles to each group.

It's also possible to assign a role to individual users.

Administrators can also [manage access to individual objects](access.html), for example access to a sensitive dashboard.

Accounts can be user accounts or service accounts.

{% include note.html content="You must have the **Accounts, Groups & Roles** permission to view and manage authorization in Wavefront. If you don't have the permission, the corresponding UI menu selections, buttons, and links are not visible." %}


## Manage Roles and Permissions

Our roles and permissions model makes it easy to make sure nobody can perform tasks without the corresponding permission -- and our doc set lists the required permissions for most tasks.

It's possible to grant permissions or assign a role to an individual user, but assigning a role to a group of users is more efficient and leaves less room for error.

### Create a Role

All users with **Accounts** permission can create roles.

1. Log in to your Wavefront instance.
2. From the gear menu, select **Account Management**.
3. Click the **Roles** tab and select **Create Role**.
4. Specify a name, description, and one or more permissions for that role.
5. (Optional) Enter groups (or accounts) to assign the role to.

We encourage assigning roles to groups, not to accounts.

### Create a Group

All users with **Accounts** permission can create roles.

1. Log in to your Wavefront instance.
2. From the gear menu, select **Account Management**.
3. Click the **Groups** tab and select **Create Group**.
4. Specify a name and description.
5. (Optional) Specify one or more group members.
   * You can specify both user accounts and service accounts, though groups usually make more sense for user accounts.
   * Only accounts (not other groups) can be group members.
5. (Optional) Specify one or more roles to assign to the group.
   You can instead assign (or remove) roles later.

### Assign a Role to a Group

Users with **Accounts** permissions can assign roles when they create a group, or can add and remove roles later.

1. Log in to your Wavefront instance.
2. From the gear menu, select **Account Management**.
3. Click the **Groups** tab and change role assignment in one of these ways:
   * Select the check box for the group to change, click **+Role** or **-Role**, and select a role to change role assignment.
   * Select the check box for the group and click the group name. In the **Edit Group** dialog, make the desired changes and click **Update**


<!---
This video shows how you find out the permissions you have, and how to manage permissions for users and groups.

<p><a href="https://youtu.be/kQ-w-DyjW5M"><img src="/images/v_permissions_2019.png" style="width: 700px;" alt="permissions for users and groups"/></a>
</p>--->

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

You can assign or revoke roles for individual accounts in the same way.

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
