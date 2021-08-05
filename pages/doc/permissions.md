---
title: Managing Permissions
keywords: administration
tags: [administration]
sidebar: doc_sidebar
published: false
permalink: permissions.html
summary: Learn how to manage permissions.
---
All new users can perform a basic set of tasks when they are invited to Wavefront. In addition:
* All users have the permissions of any group they belong to.
* All users also have any permissions that are assigned explicitly.
That is, a user has the union of group and explicit permissions. Even if the user is removed from a group, that user keeps any explicit permissions.

Users with **Accounts, Groups & Roles** permission can set the default user group and can assign [permissions](permissions_overview.html) or revoke permissions at the group level or for individual users.

{% include note.html content="You must have the **Accounts, Groups & Roles** permission to view and manage authorization in Wavefront. If you don't have the permission, the corresponding UI menu selections, buttons, and links are not visible." %}


## Permissions Basics

Permissions determine which tasks a Wavefront user can perform. All new users can perform all new user tasks such as viewing dashboards and charts. In addition, administrators can grant and revoke permissions for users and for groups.

This video shows how you find out the permissions you have, and how to manage permissions for users and groups.

<p><a href="https://youtu.be/kQ-w-DyjW5M"><img src="/images/v_permissions_2019.png" style="width: 700px;" alt="permissions for users and groups"/></a>
</p>

### New User Tasks
When an account is created in Wavefront, the user can perform the following tasks:

* View the dashboards, alerts, metrics, sources, events, maintenance windows, and alert notification pages
* Add dashboards to the list of favorites
* View existing dashboards and charts
* Create and interact with charts – but NOT save charts
* Share links to dashboards and charts with other users
* Access the user profile from the gear icon <i class="fa fa-cog"/> on the taskbar

**Note:** If a dashboard or alert is protected by [access control](access.html), new users can see it only after it's been shared explicitly unless they belong to a group that has access.

### New User Permissions

Administrators can view and modify new user default permissions and new user default groups from the gear icon (**Organization Settings > New User Defaults**).

## Setting Default Permissions for New Users

Administrators can set default permissions in one of two ways:

<strong>Option 1: Use the Everyone group to change permissions for all users</strong>

Because all new users are assigned to the Everyone group, permissions change for all existing users and all new users if you change those permissions.

<strong>Option 2: Create a Group for new user permissions</strong>
1. Create a group and assign the permissions you want for each new user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Organization Settings**.
3. Select the **New User Defaults** tab and type the user group name in the **Default User Groups** field.

## Granting and Revoking Permissions for Groups

To manage permissions for groups:
1. Click the gear icon <i class="fa fa-cog"/> on the taskbar and select **User Group Management**.
2. Click the group you want to change.
3. Select or deselect check boxes for the permissions you want to change and click **Save**.


## Granting and Revoking Permissions for Users

To manage permissions for users:
1. Click the gear icon <i class="fa fa-cog"/> on the taskbar and select **Account Management**.
2. Click the user you want to change.
3. Select or deselect check boxes for the permissions you want to change and click **Update**.

**Note:** If a user has a permission because of group membership, the check box for that permission is disabled for edit. Remove the user from the group that granted that permission to revoke the permission.
