---
title: Authorization in Wavefront
keywords: release notes
tags: [administration]
sidebar: doc_sidebar
permalink: authorization.html
summary: Learn about authorization of Wavefront users.
---

Wavefront supports several levels of authorization control to support customers with different authorization needs. The basic level is based on [permissions](permissions_overview.html) assigned to individual users.  If you're an administrator who wants more control over who can do what, you can perform some additional setup tasks.

**Note:** We support three levels of authorization. If you need more than basic permissions, you can add user groups. If that's not enough, you can add access control, which applies to users and groups.

## More Control, More Effort

With additional setup, you gain finer-grained control:
* **Permissions for users** -- You can initially use the simple model in which each user has access based on [permissions](permissions_overview.html).
* **Permissions for groups** -- Using permissions with groups is faster and less error prone than using permissions with users. It's easy keep permissions consistent.
* **Access control on objects** -- You can turn on the access control security preference for object-level access restriction. Access control allows you to restrict who can view or view and modify certain objects (initially dashboards) .

  ![control setup](images/security_levels.svg)

## Level 1: Permissions for Users

Level 1 authorization allows adminstrators to assign permissions to individual users. Level 1 means minimal effort, but also minimal control.

In Level 1:
* A new user:
  - Can perform a set of [New User Actions](users_groups.html#what-can-a-new-user-do) such as viewing dashboards, alerts, etc.
  - Has a set of **New User Permissions**. This set is determined by the administrator.
* All users get the permissions that the administrator assigned to the Everyone group. For example, all users might get Dashboard permission and Proxy permission.
* Administrators can [grant or revoke permissions](users_managing.html#granting-and-revoking-permissions) for individual users (and for groups, discussed next).

## Level 2: Permissions for Groups and Users

Starting with Release 2018.46.x, administrators can use groups to make permissions assignment faster and more transparent and consistent. They can use groups with permissions only, or can use access control for objects (see Level 3 below).

As an administrator, you manage group permissions like this:
* You create one or more groups and assign permissions. For example, you can create an Admin group that includes User Management permission.
* When an you invites a new user, you can add the user to one or more groups. If users belong to more than one group, they get permission from each group (addition). The UI makes it easy to see where a permission comes from.
* You can manage permissions on a per-group basis. For example, assume that Marketing group has User Management permission. If you remove the permission, all members of the Marketing group no longer have it - unless they were granted the permission at a user level.
* A user who belongs to more than one group gets permissions from both groups.

Wavefront does not currently integrate with the groups of your identity manager (Active Directory or LDAP).

## Level 3: Access Control for Objects

Starting with Release 2018.46.x, Wavefront supports object-level access control in addition to permissions. Initially, we support access control only for dashboards.

By default, all users with Dashboard permission can view and modify all dashboards.

An administrator can change the default Security preference to grant access for *new* dashboards only to the dashboard creator. After the preference change, only the dashboard creator can access new dashboards initially. The dashboard creator or a Super Admin user can share the dashboard with user groups or individual users to give View or View & Modify access. Users with View & Modify access can then share the dashboard with more users.

**Note:** This security setting affects new dashboards only.
* If you change the Security preference to give modify access only to the dashboard creator  (strict access), then you affect any new dashboards for the customer or tenant (team).
* If change the Security preference to Everyone, then all dashboards that were created during strict access remain protected by the access control list.

Access control works like this:

* Initially, all users in the Everyone group--that is, all users--have View & Modify access to all dashboards.
* When the administrator changes the default Security system preference, access control starts:
  - Modify access is granted only to the creator of new objects (dashboards in the first release), to Super Admin, and to users that creator or Super Admin granted View & Modify access.
  - Other users initially cannot view and cannot modify any *new* dashboards.
* To allow access, a privileged user has to share the dashboard. Privileged users are:
  - Super Admin
  - Dashboard creator
  - Users who were granted View & Modify access
* Users in the Everyone group continue to have View & Modify access to dashboards that existed before the switch -- and all users in the Everyone group can remove the Everyone group from the dashboard's access list and add other users or groups.
* If the administrator changes the Security system preference back so that Everyone has access to new dashboards, then dashboards that were created while the setting was Creator only continue to be protected by access control.

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
    If Dana also belongs to a group with View & Modify access, Dana can also modify the dashboard because access is cumulative.
