---
title: Managing Permissions
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: permissions.html
summary: Learn how to manage permissions.
---
When a user is first invited to Wavefront, the user can [browse data](XXlink_here). The Super Admin user and users with User Management permissions can assign additional [permissions](permissions_overview.html) or revoke permissions at the group level or for individual users.

You must be a Super Admin user or have User Management permissions to view and manage users and permissions in Wavefront. If you don't have permission, the UI menu selections, buttons, and links that you use to view users and permissions are not visible.

## Permissions Basics

Permissions were part of the initial Wavefront authorization model. They determine which tasks a Wavefront user can perform. Starting with Release 2018.46, administrators can grant and revoke permissions for users and for groups.

### New User Actions
When an account is created in Wavefront, the user can perform the following actions:

* View the dashboards, alerts, metrics, sources, events, maintenance windows, and alert notificat pages
* Add dashboards to the list of favorites
* View existing dashboards and charts
* Create and interact with charts – but NOT save charts
* Share links to dashboards and charts with other users
* Access the user profile from the gear icon

In earlier Wavefront releases, these new user tasks were associated with a permission (Browse Data). This permission no longer exists.

### New User Permissions

Administrators can view and modify new user default permissions from the gear icon (**System Preferences > New User Defaults**).

## Granting and Revoking Permissions for Groups

To manage permissions for groups:
1. Click the gear icon and select **User Group Management**.
2. Click the group you want to change.
3. Select or deselect checkboxes for the permissions you want to change and click **Save**.


## Granting and Revoking Permissions for Users

To manage permissions for users:
1. Click the gear icon and select **User Management**.
2. Click the user you want to change.
3. Select or deselect checkboxes for the permissions you want to change and click **Update**.

**Note:** If a user has a permission because of group membership, the check box for that permission is disabled for edit. Remove the user from the group that granted that permission to revoke the permission.

## Setting Default Permissions for New Users

Administrators can set default permissions in one of two ways:

<strong>Option 1: Use the Everyone group to change permissions for all users</strong>

Because all new users are assigned to the Everyone group, permissions change for all existing users and all new users if you change those permissions.

<strong>Option 2: Create a Group for new user permissions</strong>
1. Create a group and assign the permissions you want for each new user.
2. From the gear icon, select **System Preferences**.
3. Select the **New User Defaults** tab and type the user group name in the **Default User Groups** field.
