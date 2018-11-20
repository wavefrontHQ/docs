---
title: Managing Users and Groups
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: users_groups.html
summary: Learn how to manage users and groups.
---
You can secure your Wavefront environment by:
* Granting and revoking permissions for users and groups
* Granting and revoking object access (initially dashboard access) for users and groups

You must have Users & Groups permission or be a Super Admin user to view and manage users, groups, and permissions in Wavefront. If you don't have permission, the UI menu selections, buttons, and links that you use to view users and permissions are not visible.

## Users and Groups Basics

Before you start with users and groups, here's what you need to know:

### What Can New Wavefront Users Do?

When an account is created in Wavefront, the user can perform the following tasks:

* View the dashboards, alerts, metrics, sources, events, maintenance windows, and alert notificat pages
* Add dashboards to the list of favorites
* View existing dashboards and charts
* Create and interact with charts – but NOT save charts
* Share links to dashboards and charts with other users
* Access the user profile from the gear icon

In earlier Wavefront releases, these new user tasks were associated with a permission (Browse Data). This permission no longer exists.

### Who is Super Admin?

When your company signs up with Wavefront, you specify one user as Super Admin. A Super Admin user has all permissions and can also  perform some tasks that nobody else can perform, such as looking at orphan dashboards and inviting other Super Admin users.

To add a Super Admin user:
1. Click the gear icon and select **Super Admin**
2. Enter the user name of a user you want to add as Super Admin.

Going forward, that user can perform Super Admin tasks.

### Why Groups?

Groups make it easy to make changes for many users. More importantly, if you change permissions or access settings, you're less likely to forget something if you take advantage of groups. For example, you can grant additional permissions to a group of users or invite a group to a set of dashboards.

**Note:** Wavefront groups do *not* currently synchronize with groups in your identity provider (IDP) such as Active Directory or LDAP.

## Accessing Management Pages

The Super Admin user and users who have the Users & Groups permission can access management pages:
1. Click the gear icon <i class="fa fa-cog"/> on the task bar.
2. Select one of the menu items:
   - **System Preferences** -- Set initial preferences for all users.
   - **User Group Management** -- Create, manage, and delete groups.
   - **User Management** -- Invite, manage, and delete users.
3. If you're logged in as Super Admin, you can also select the following menu item:
   - **Super Admin** -- Manage Super Admin users and Orphaned objects.

**Note:** You might be prompted to re-enter your login credentials to perform user management tasks.

## Managing Groups

Users who have **Users & Groups** permission can create groups, add and remove users, and grant and revoke permissions.

1. Click the gear icon and select **User Group Management**.
2. To create a group:
   1. Click **New Group**, and specify the group name.
   2. Add group members (optional). You can add and remove group members later.
   3. Select the initial set of permissions for the group and click **Create**.
3. To change a group's users or permission:
   2. Select the group you want to change.
   3. Select **Add User**, **Remove User**, **Grant Permission**, or **Revoke Permission**.
   **Note:** If you revoke permission for a group, all users in that group no longer have the permission unless they belong to another group with that permission or they have the individual permission.

## Managing the Everyone Group

All users in Wavefront are members of the Everyone group, which was created when Wavefront enabled the more fine-grained access model that includes groups and ACLs.
Here's what you need to know:

* All users, including Super Admin, are always in the Everyone group. You cannot remove users from the Everyone group.
* You can change the permissions assigned to the Everyone group. By default, the group has no explicit permissions, which means users can browse data but cannot modify anything.
* If you use access management in your environment, you can share a dashboard with the Everyone group to:
  - Give View & Modify access to users who have Dashboard permissions
  - Give View access to users who don't have Dashboard permissions

## Managing Users

Users with Users & Groups permissions can manage users.

1. Click the gear icon and select **User Management**.
2. To add a user:
   1. Click **Invite New Users**, and specify a comma-separated list of email addresses.
   2. Specify user groups. You cannot remove users from the Everyone group.
   3. If you want to manage individual user permissions, click **Advanced** and specify permissions. We recommend managing permissions at the group level.
3. To delete a user, change permissions, or change group membership:
   1. Select one or more users on the Users page.
   2. Select the check box for one or more users.
   3. Use the **Permission**, **Group**, or trash can buttons, and confirm when prompted.

   If you delete a user, you remove that user's access to Wavefront. You can instead remove the user from one or more groups.

New users can browse data and might have additional permissions based on group membership. Each user receives an email with an account activation link that is valid for 24 hours.


## Setting the Default Group for New Users

By default, each new user is assigned to the Everyone group.

To add new users to additional groups:
1. Click the gear icon and select **System Preferences**.
2. In the Default User Groups field
  * Start typing the name of additional groups to add groups.
  * Click the **x** next to a group name to remove groups. You cannot remove the Everyone group.
