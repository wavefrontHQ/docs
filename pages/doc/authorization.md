---
title: Authorization in Wavefront
keywords: release notes
tags: [administration]
sidebar: doc_sidebar
permalink: authorization.html
summary: Learn about authorization of Wavefront groups and users.
---

Wavefront supports both role-based controls that use global permissions and object based controls for individual dashboards and alerts.

Administrators can
* Create **[roles](users_roles.html)** with permissions and assign roles to users or groups.
* Protect individual dashboards or alerts and grant **[access](access.html)** only to selected groups or accounts.



## Role-Based Access Control with Global Permissions

Permissions always apply to all objects of a certain type. For example, a user with **Dashboards** permission can view and modify all dashboards.

A user with Accounts, Groups & Roles permission manages authorization:
1. Creates one or more **roles** and assigns one or more [permissions](permissions_overview.html) to each role.
2. Creates one or more **groups** and adds one or more users to each group.
3. Assigns one or more roles to each group.

In this picture, we have 3 roles and 3 groups of users. Each user gets the permissions from one role.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<img src="/images/permissions_basics.png" alt="permissions basics"/></td>
<td width="50%"> </td>
</tr>
</tbody>
</table>

Assigning roles or permissions to individual users is also supported. For example, assume the marketing team asks Pat to give a demo, and Pat is assigned the Demo role and now has Dashboards permisson.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<img src="/images/permissions_user_level.png" alt="permissions user level"/></td>
<td width="50%"> </td>
</tr>
</tbody>
</table>

Management at the role and group level is less error prone, for example, it's easier to remove a role from a group than from 15 individual users. In this example, we could assign the Demo role to the Admin Group. Or we could create a separate group only for users that need the set of permissions. In production environments, that's the only way to follow the principle of least privilege.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<img src="/images/two_roles_one_group.png" alt="one group gets two roles"/></td>
<td width="50%"> </td>
</tr>
</tbody>
</table>


## Access Control for Individual Object

Our fine-grained **[access control](access.html)** allows administrators to protect sensitive information, for example, to restrict access to certain dashboards to the Finance team.

* **Access control on individual objects** -- While permissions are global and apply, for example, to all dashboards, access control allows you to restrict who can view or view and modify individual objects (initially dashboards and alerts).
* **Security preference for new objects** -- In high security environments, administrator can set a security preference so that all new dashboards and new alerts are accessible only to the creator and to Super Admin users.


## Authorization FAQs

Before you start, here are some FAQs:

### What are User Accounts & Service Accounts?

Wavefront supports two [account types](accounts.html):
* **User accounts** are for human users who work with Wavefront. A user account authenticates with a user name and password.
* **Service accounts** are for services that interact with Wavfront through an API and use a **token** to authenticate. Service accounts:
  - Don't have **default permissions** (unless one or more roles with permissions are assigned to the **Everyone** group.).
  - Can't perform the **UI operations** that user accounts can perform by default.
  In the UI, service acount names always start with **sa:**

### Who is the Super Admin User?

When your company signs up with Wavefront, we ask you which user(s) you want to designate as Super Admin. A Super Admin user:
* Has all permissions
* Has access to all dashboards and alerts
* Can [restore orphan dashboards and alerts](access.html#making-orphan-dashboards-visible)
* Can invite other Super Admin users.

Any existing Super Admin user can add other Super Admin users:

1. Click the gear icon and select **Super Admin**.
2. Enter the user name of a user you want to add as Super Admin.

### Why Roles?

Roles allow you to combine a set of permissions. For example, create an **Intern** role to give limited permissions to interns. You can:
* Assign one or more roles to any group (preferred).
* Assign a role to an individual account.

### Why Groups?

Groups allow you to combine a set of users. You can then:
* Assign a role to the group.
* Give [view or modify access](access.html) for individual dashboards and alerts to the group.

Wavefront groups do *not* currently synchronize with groups in your identity provider (IDP) such as Active Directory or LDAP.


### What's the Everyone Group?

All accounts (user and service accounts) are members of the Everyone group.

Here's what you need to know:

* You cannot remove accounts from the Everyone group. All accounts, including Super Admin, are always in the Everyone group.
* You cannot delete the Everyone group.
* You can change the roles assigned to the Everyone group. By default, the group has associated roles, which means that human users can browse data but cannot modify anything. Service accounts cannot browse data.

  **Warning** If you assign a role to the Everyone group, you change the permissions for each account in your environment, including service accounts.
* If you use access control in your environment, you can share a dashboard or alert with the Everyone group to:
  - Give View & Modify access to accounts who have Dashboard (or Alert) permissions
  - Give View access to accounts who don't have Dashboard (or Alert) permissions
  You can remove the Everyone group from a dashboard or alert access list to limit access to that object.

<!---
![control setup](images/security_levels.svg)

## Level 1: Permissions for Users

Level 1 authorization allows adminstrators to assign permissions to individual users. Level 1 means minimal effort, but also minimal control.

* A new user:
  - Can perform a set of [New User Actions](user_accounts.html#what-can-a-new-user-do) such as viewing dashboards, alerts, etc.
  - Has a set of New User Permissions. This set is determined by the administrator.
* All users get the permissions that the administrator assigned to the **Default Role**. For example, all users might get Dashboard permission and Proxy permission.
* Users with Accounts, Groups & Roles permissions can [grant or revoke permissions](users_groups.html#grant-or-revoke-permissions) for individual users and service accounts.

## Level 2: Roles for Users and Groups

Starting with Release 2019-52, Wavefront supports roles for users and groups.

1. Create roles for different types of users, for example, an **Ops Role** and a **Dev Role** role. Assign permissions to each role.
1. Optionally, create groups.
1. Assign roles to individual users or to groups.

{% include important.html content="In a previous authorization model, Wavefront supported assigning permissions directly to groups. Starting with Release 2019-52 we support full RBAC. Assigning permissions to groups is deprecated and no longer supported in future releases. " %}

Wavefront does not currently integrate with the groups of your identity manager (Active Directory or LDAP).

## Level 3: Access Control for Objects

Starting with Release 2018.46.x, Wavefront supports access control for individual objects in addition to the global role-based access control. Initially, we support access control for individual dashboards and alerts.

### Basic Access Control

All users with Dashboard permission can view and modify all dashboards. Those users can also [change access to individual dashboards](access.html#change-access-for-one-or-more-dashboards) from the Dashboard browser.

![dashboard access](images/dashboard_access.png)

**Note:** Do not remove the Everyone group from an object's access list unless other users or groups have access. If you remove the Everyone group, you create an orphan object. Only Super Admin users can restore orphan objects

### Security Preference for New Object Access

In high-security environments, an administrator can [change the default Security preference](access.html#changing-the-access-control-preference) to grant access for *new* objects (dashboards and alerts) only to the object creator. After the preference change, only the object creator and Super Admin users can access new objects initially. Those users can share the dashboard with user groups or individual users. Users with View & Modify access can then share the dashboard with more users.

When the preference is set, access control works like this:

* Initially, all users in the Everyone group--that is, all users--have View & Modify access to all objects.
* When an administrator changes the default Security system preference, access control starts:
  - Modify access is granted only to the creator of new objects (dashboards and alerts), to Super Admin.
  - Those users can grant View or View & Modify access to the object.
  - Other users initially cannot view and cannot modify any *new* dashboard or alert.
* To allow access, a privileged user has to share the object. Privileged users are:
  - Super Admin
  - Dashboard creator
  - Users who were granted View & Modify access
* Users in the Everyone group continue to have View & Modify access to objects that existed before the switch -- and all users in the Everyone group can remove the Everyone group from the dashboard's access list and add other users or groups.
* If the administrator changes the Security system preference back so that Everyone has access to new dashboards, then objects that were created while the setting was Creator only continue to be protected by access control.

**Note:** This security setting affects new objects only.
* If you change the Security preference to give modify access only to the dashboard creator  (strict access), then you affect any new dashboards for the customer or tenant (team).
* If you change the Security preference to Everyone, then all dashboards that were created during strict access remain protected by the access control list.

## Example: Can Dana View or Modify Dashboard X?

In this example, we'll consider whether a user (Dana) can view or modify a dashboard.

### Access for New Dashboards: Everyone
We start with the simple case where the Security system preference that determines access to new dashboards is set to Everyone (the default). In that case, permissions determine what Dana can do.
* Dana can view dashboard X because, unless access control is set, all Wavefront users can view all dashboards.
* If Dana has Dashboard permission, Dana can modify all dashboards. Otherwise, Dana cannot modify any dashboards.

![permissions concept](/images/permissions_or_not.svg)

### Access for New Dashboards: Creator

Now let's assume the administrator changes the setting for access to new dashboards to Creator. In that case, permissions still apply but whether Dana can view or modify a new dashboard depends on access.

![access or not](/images/access_or_not.svg)

1. Wavefront first checks whether Dana has group- or user-level dashboard permission. If not, Dana can't modify *any* dashboards
2. Next, Wavefront checks if Dana is the member of a group that has access to the dashboard. If Yes:
  * If the group has View & Modify access, Dana can view and modify the dashboard.
  * If the group has View access, Dana can only view the dashboard.
3. Finally, Wavefront checks if Dana has individual (user-level) access to the dashboard.
  * If Dana has View & Modify access, Dana can view and modify the dashboard.
    This is true even if Dana belongs to a group with only View access.
  * If Dana has View access, Dana can View the dashboard.
    If Dana also belongs to a group with View & Modify access, Dana can also modify the dashboard because access is cumulative.--->
