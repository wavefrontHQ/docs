---
title: Authorization in Wavefront
keywords: release notes
tags: [administration]
sidebar: doc_sidebar
permalink: authorization.html
summary: Learn about authorization of Wavefront groups and users.
---

Wavefront supports several levels of authorization to support customers with different authorization needs. The most basic level is based on [permissions](permissions_overview.html) assigned to individual users.

Administrator who want more control can
* Create **roles** with permissions and assign roles to users or groups.
* Use [access control](access.html) to protect individual dashboards or alerts.

## More Control, More Effort

With additional setup, you gain finer-grained control:

### Permissions and Roles

* **Permissions for users** -- You can assign [permissions](permissions_overview.html) to users. Permissions are global. For example, users with Dashboard permission can manage *all* dashboards.
* **Roles** -- A role is a set of permissions suitable for a certain type of user. Administrators create one or more roles and assign roles to users or groups.

### Access Control

* **Access control on individual objects** -- While permissions are global and apply, for example, to all dashboards, access control allows you to restrict who can view or view and modify individual objects (initially dashboards and alerts).
* **Security preference for new objects** -- In high security environments, administrator can set a security preference so that all new dashboards and new alerts are accessible only to the creator and to Super Admin users.

  ![control setup](images/security_levels.svg)

## Level 1: Permissions for Users

Level 1 authorization allows adminstrators to assign permissions to individual users. Level 1 means minimal effort, but also minimal control.

* A new user:
  - Can perform a set of [New User Actions](user_accounts.html#what-can-a-new-user-do) such as viewing dashboards, alerts, etc.
  - Has a set of New User Permissions. This set is determined by the administrator.
* All users get the permissions that the administrator assigned to the **Default Role**. For example, all users might get Dashboard permission and Proxy permission.
* Users with Accounts & Groups permissions can [grant or revoke permissions](users_groups.html#grant-or-revoke-permissions) for individual users and service accounts.

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


<!--- Too much detail for feature not used by most

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
