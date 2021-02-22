---
title: Managing Users and Permissions
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: users_managing.html
published: false
summary: Learn how to add and remove users, grant and revoke permissions, and set default permissions for new users.
---
{% include shared/permissions_view.html entity="users and permissions" entitymgmt="User" %}

## Accessing the Users and Permissions Pages
You access the Users and Permissions pages by clicking the gear icon <i class="fa fa-cog"/> on the taskbar and selecting your username. Your user profile displays.

The panel to the left of your profile contains the links **Users(\<CompanyName\>)** and **Permissions(\<CompanyName\>)**.

![user profile](images/user_profile.png)

If you click the links more than one hour since your last successful login you are asked to re-enter your login credentials.

The Users page displays every user in your Wavefront environment. You can click any username to see which permissions are assigned to that user. The Permissions page displays all permissions as well as every user that has that permission assigned to them.

## Managing Users

### Adding Users
You can add users directly either in the Users or Permissions pages. Do one of the following:

- From the Users page:
  1. Locate the Invite User(s) by email field.
  1. Add the email addresses associated with the new user(s). You can enter up to 25 unique email addresses separated by commas or whitespace.
  1. Click **Send Invite**.
- From the Permissions page:
  1. Navigate to a permission to assign to the new user.
  1. Locate the Add user(s) by email field.
  1. Add the email address associated with the new user. You can enter up to 25 unique email addresses separated by commas or whitespace.
  1. Click **Add**.

 The user(s) are added with Browse Data permission and receive an email with a link to activate their account.

### Removing Users
You remove a user from the Users page. Locate the email address of the user to remove and click the <i class="fa-times fa" style="color: red;"/> icon to the left of the name. When you click the icon, a prompt displays requiring you to confirm permanently removing that user from Wavefront. You cannot delete your own account from Wavefront.

## Managing Permissions

### Granting and Revoking Permissions

To manage permissions, locate the email address assigned to that account in the Users or Permissions page, and click it. When you do this, you are directed to that user's profile page.

You will see a list of all permissions broken into two parts: permissions granted to the user and permissions not granted to the user.

You grant permissions by entering email addresses in the text box and clicking the <i class="fa-plus-circle fa" style="color: green;"/> <span style="color: green;">Add</span> button.

You revoke a permission by clicking the <i class="fa-times fa" style="color: red;"/> icon at the far right of an email address.

{% include note.html content="If you remove Browse Data permission for a user, the user will not be able to access Wavefront." %}

### Setting Default Permissions for New Users

You can create a set of default permissions that are assigned to every new user added to the system from that point on:

1. Select **Users** or **Permissions > Change New User Default Permissions**. The permissions dialog displays.
![default permissions](images/default_permissions.png)
1. Check the set of permissions that a new user should receive. If this is your first time to set default permissions, then you'll see Browse Data selected by default. You must have at least 1 permission selected in order to save the selection(s).
   {% include note.html content="If a user doesn't have Browse Data permission, the user will be unable to access  Wavefront." %}
1. Click **Save**. The default permissions affects only new user accounts created after the changes were made. If you'd like to retroactively apply a particular permission to all existing users, then visit [Support](https://my.vmware.com/) for assistance.

<a name="customer_prefs"></a>

## Setting Customer-Wide Preferences

You can specify a couple of default settings for all new users. Click the **Customer-Wide Preferences** link and choose whether to enable the [Query Builder](query_language_query_builder.html) by default, the default dashboard, and whether to display the **Getting Started** onboarding flow.
