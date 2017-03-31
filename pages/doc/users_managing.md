---
title: Managing Users
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: users_managing.html
summary: Learn how to manage users.
---

You must have [User Management permission](permissions) to do the following tasks. If you do not have permission, UI menu selections and buttons required to perform the tasks will not be visible.

## Accessing the Users and Permissions Pages
You access the Users and Permissions pages by clicking the gear icon <i class="fa fa-cog"></i> on the task bar and selecting your username. Your user profile displays. The panel to the left of your profile contains the links **Users(\<CompanyName\>)** and **Permissions(\<CompanyName\>)**.

![user profile](images/user_profile.png)

If you try to access these pages more than one hour since your last successful login you be asked to re-enter your login credentials. If you don't see these options on the side panel, then you don't have User Management permission.
 
The Users page displays every user in your Wavefront environment. You can click any username to see which permissions are assigned to that user. The Permissions page link displays all permissions as well as every user that has that permission assigned to them.
 
## Adding and Removing Users
 
### Adding Users
You can add users directly either in the Users or Permissions pages. By default, Wavefront automatically applies Browse Data permission to a new user so they can access the system.
Do one of the following:

- From the Users page:
  1. Locate the Invite User(s) by email field.
  1. Add the email addresses associated with the new user(s). You can enter up to 25 unique email addresses separated by commas or whitespace.
  1. Click **Send Invite**. New users receive an email with a link to activate their account and set their password.
- From the Permissions page:
  1. Navigate to a permission to assign to the new user.
  1. Locate the Add user(s) by email field.
  1. Add the email address associated with the new user. You can enter up to 25 unique email addresses separated by commas or whitespace.
Click **Add**. New users receive an email with a link to activate their account and set their password.
 
### Removing Users
You remove a user from the Users page. Locate the email address of the user to remove and click the <span class="fa-times-circle fa" style="color: red;"></span> icon to the left of the name. When you click the icon, a prompt displays requiring you to confirm permanently removing that user from Wavefront. You cannot delete your own account from Wavefront.
 
## Setting Default Permissions for New Users

You can create a set of default permissions that are assigned to every new user added to the system from that point on:

1. Select **Users** or **Permissions > Change New User Default Permissions**. The permissions dialog displays.
![default permissions](images/default_permissions.png)
1. Check the set of permissions that a new user should receive. If this is your first time to set default permissions, then you'll see Browse Data selected by default. You must have at least 1 permission selected in order to save the selection(s). If a user doesn't have Browse Data permission, then they will be unable to access  Wavefront.
1. Click **Save**. The default permissions affects only new user accounts created after the changes were made. If you'd like to retroactively apply a particular permission to all existing users, then contact us for assistance.
 
## Managing Permissions for a User
To manage permissions for a user, locate the email address assigned to that account in the Users or Permissions page, and click it. When you do this, you are directed to that user's profile page.
 
You will see a list of all permissions broken into two parts: permissions granted to the user and permissions not granted to the user. You can remove an existing permission by clicking the <span class="fa-times fa" style="color: red;"></span> icon next to  the permission. If you remove Browse Data permission for a user, that user will no longer be able to access Wavefront. You can provide that user access again by adding Browse Data permission back to that user. You add new permissions clicking the <span class="fa-plus-circle fa" style="color: green;"></span> icon next to the permission.
 
<a name="customer_prefs"></a>

## Customer-Wide Preferences
You can specify a couple of default settings for all new users. Click the **Customer-Wide Preferences** link and choose whether to enable the [Query Builder](query_language_query_builder) by default and the default dashboard.

{% include links.html %}
