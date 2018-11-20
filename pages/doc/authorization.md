---
title: Authorization in Wavefront
keywords: release notes
tags: [administration]
sidebar: doc_sidebar
permalink: authorization.html
summary: Learn about authorization of Wavefront users.
---

For the first few years of its existence, Wavefront supported a simple authorization model that is based on [permissions](permissions_overview.html) assigned to individual users. Now Wavefront customers come from many different industries, and some customers have requested more fine-grained authorization.

Starting with release 2018.46.x, administrators can select the authorization management model that works best for their environment. If administrators want more control over who can do what, they can perform some additional setup tasks.

**Note:** This model is cumulative. If you need more than basic permissions, add user groups. If that's not enough, add access control, which applies to users and groups.

## More Control, More Effort

With additional setup, administrators gain finer-grained control:
* **Permissions for users** -- Administrators can initially use the simple model in which each user has access based on [permissions](permissions_overview.html).
* **Permissions for groups** -- In production environments, it often makes sense to simplify operations by specifying permissions for groups. With groups, it's easy keep permissions consistent.
* **Access control on objects** -- To change who can view or modify certain objects (initially dashboards) administrators can use access control for object-level restrictions.

![control setup](images/security_levels.svg)

## Level 1: Permissions for Users

Wavefront continues to support the initial model of users and permissions. Level 1 means minimal effort, but also minimal control.

In that model:
* A new user can browse data but has no other permissions by default.
* In addition, all users get the permissions the administrator assigned to the Everyone group. For example, all users might get Dashboard permission and Proxy permission.
* Administrators can [grant or revoke permissions](users_managing.html#granting-and-revoking-permissions) for individual users (and for groups).


## Level 2: Groups

Starting with Release 2018.46.x, administrators can use groups to make permissions assignment more transparent and consistent. They can use groups with permissions only, or with the access control list (ACL) for objects (see Level 3).

Groups determine the default permissions for a new user:
* Initially, each user is in the Everyone group. We created this group for backward compatibility and to allow changes to all users. You can't remove users from this group.
*  The administrator can set up additional default groups for new users. In that case, new users also get the permissions for that group.

Groups support permission management like this:
* Administrators create one or more groups and assign permissions. For example, administrators might create an Admin group that includes user management permission.
* When an administrator invites a new user, the administrator can add the user to one or more groups. If users belong to more than one group, they get permission from each group (addition). The UI makes it easy to see where a permission comes from. XXLink
* Administrators can later manage permissions on a per-group basis. This helps when permission changes are needed.
* It's possible to combine group permissions and user permissions. In that case, if users get a permission from a group and as individuals, they keep the permission if you remove it only in one place.

Wavefront does not currently integrate with the groups of your identity manager (Active Directory or LDAP).

## Level 3: Access Control for Objects

Starting with Release 2018.46.x, Wavefront supports object-level access control lists (ACLs) in addition to permissions. Initially, we support access control only for dashboards.

By default, all users can access all dashboards. An administrator can change the default setting for *new* dashboards to give modify access only to the dashboard creator. After that happens, only the dashboard creator can access new dashboards initially. The dashboard creator or Super Admin can share the dashboard with other user groups or users to give view or view and modify access.

**Note:** This security setting affects new dashboards only.
* If you change the security setting to give modify access *only to the dashboard creator*  (strict access), then you affect any new dashboards for the customer or tenant (team).
* If you return the security setting to to *Everyone*, then all dashboards that were created while only the dashboard creator had Modify access for a new dashboard, remain protected by the access control list.

ACLs work like this:

* Initially, all users in the Everyone group--that is, all users--have View and Modify access to all dashboards.
* When the administrator changes the default Security system preference, access control starts:
  - Modify access is granted only to the creator of new objects (dashboards in the first release), to Super Admin, and to users that creator or Super Admin granted Modify access.
  - Other users initially cannot view and cannot modify any new dashboards.
* To allow access, a privileged user has to share the dashboard. Privileged users are:
  - Super Admin
  - Dashboard creator
  - Users who were granted modify access
* Users in the Everyone group continue to have View and Modify access to dashboards that existed before the switch -- and all users in that group can remove the Everyone group from the access list and add other users or groups.
* If the administrator changes the Security system preference back so Everyone has access to new dashboards, then dashboards that were created while the setting was Creator only continue to be protected by access control.

## Example: Can Dana View or Modify Dashboard X?

In this example, we'll consider whether a user (Dana) can view or modify a dashboard.

### Access for New Dashboards: Everyone
We start with the simple case where access for new dashboards is set to Everyone (the default). In that case, permissions determine what Dana can do.
* Dana can view dashboard X because, unless access control is set, all Wavefront users can view all dashboards.
* If Dana has **Dashboard** permission, Dana can modify all dashboard. Otherwise, Dana cannot modify any dashboards.

![permissions concept](/images/permissions_or_not.svg)

### Access for New Dashboards: Creator

Now let's assume the administrator changes the setting for access to new dashboards to Creator. In that case, permissions still apply but whether Dana can view or modify a new dashboard depends on  access.

![access or not](/images/access_or_not.svg)

1. Wavefront first checks whether Dana has group- or user-level dashboard permission. If not, Dana can't modify *any* dashboards
2. Next, Wavefront checks if Dana is the member of a group that has access to the dashboard. If Yes:
  * If the group has view and modify access, Dana can view and modify the dashboard.
  * If the group has view access, Dana can only view the dashboard.
3. Finally, Wavefront checks if Dana has individual access to the dashboard.
  * If Dana has view and modify access, Dana can view and modify the dashboard.
     This is true even if Dana belongs to a group with only view access.
  * If Dana has view access, Dana can view the dashboard.
    If Dana also belongs to a group with view and modify access, Dana can also modify the dashboard because access is cumulative.
