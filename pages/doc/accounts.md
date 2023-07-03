---
title: Manage User Accounts
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: user-accounts.html
summary: Create and manage user accounts.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for **original** subscribers. For VMware Cloud services subscriptions, see [Manage Users of Operations for Applications on VMware Cloud Services](csp_user_management.html)."%}

VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) supports:
* User accounts, discussed here, which authenticate with a username and password.
* [Service accounts](service-accounts.html), which authenticate with a token.

You can manage authorization in your environment by:
* Assigning and revoking roles for groups or accounts to give **global** permissions.
* Granting and revoking access to **individual objects** (initially dashboards and alerts) for accounts and groups.

{% include note.html content="You must have the **Accounts** permission to view and manage accounts, groups, and permissions. If you don't have the **Accounts** permission, the UI menu selections, buttons, and links that you use to view accounts and permissions are not visible. " %}


## What Are User Accounts?

User accounts log in with a user name and password.
* All authenticated users can perform certain tasks such as viewing dashboards and charts or sharing links to charts.
* **Roles** determine what users can do globally. Each role has one or more permissions. For example, assume that you have created an **Interns** role that has the **Dashboard** permission. All users with the **Interns** role can view and manage all dashboards.
* **[Access](access.html)** applies to individual objects. For example, some users don't have access to a dashboard with financial data. Users who have modify access for a dashboard or alert can grant or revoke access for that object.

## Create, Edit, and Delete User Accounts

Users with **Accounts** permissions can manage accounts.

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Accounts**.
2. To add an account:
   1. Click **Invite New Users** and specify a comma-separated list of email addresses.
   2. Specify user groups. You cannot remove users from the **Everyone** group.
   3. To grant permissions to individual users, click **Advanced**. You can:
      * Assign a role to the user
      * Or give the user explicit permissions
   {% include tip.html content="We recommend managing permissions at the group level and not assigning permissions to individual users." %}

   Each invited user receives an email with an account activation link that is valid for 24 hours. All new users can browse data and might have additional permissions.
3. To change roles, permissions, or group membership:
   1. Select the check box for one or more users on the **Users Accounts** page.
   2. Click a button (e.g., **+Role** or **-Permission**, and so on), change the roles, permissions, or group membership.
4. To delete a user:
   1. Select the check box for the user on the **Users Accounts** page.
   2. Click the trash icon and confirm when prompted.

   If you delete a user, you remove that user's access to your environment.

   {% include tip.html content="As a safeguard, you cannot select multiple users and delete them. You can delete only one user at a time." %}

## Sign Out a User

As a [Super Admin user](authorization-faq.html#who-is-the-super-admin-user), you can sign out other users by using the REST API. To sign out a user while you [enabled Super Admin mode](users_account_managing.html#enable-or-disable-super-admin-mode), simply run a POST request with the `logout` API call. For example:

```
POST https://<your_instance>.wavefront.com/api/logout/{identifier}
```

You must specify the `{identifier}`, which is the email address of the user that you want to log out. If you are not logged in to your service instance, when you run the POST request, you must also provide a valid [API token](wavefront_api.html#managing-api-tokens).

## What Can a New User Do?

When you invite a new (human) user to your environment, what that new user can do depends on several factors.

- **New User Tasks:** All users can perform the following tasks:
  * View the dashboards, alerts, metrics, sources, events, maintenance windows, and alert notification pages.
  * Add dashboards to the list of favorites.
  * View existing dashboards and charts.
  * Create and interact with charts – but NOT save charts.
  * Share links to dashboards and charts with other users.
  * Access the user profile from the gear icon <i class="fa fa-cog"/> on the toolbar.

  {% include note.html content="It's possible that [access to dashboards and alerts](access.html#how-access-control-works) is limited." %}


- **New User Permissions:** Users with the **Accounts** permission can view and modify new user default permissions. To do that, from the gear icon <i class="fa fa-cog"/> on the toolbar, select **Organization Settings**. These permissions *do not* apply to service accounts.
- **New User Default Groups:** Users with the **Accounts** permission can set up default groups for new users. To do that, from the gear icon <i class="fa fa-cog"/> on the toolbar, select **Organization Settings**.  All new user accounts get all permissions assigned to the default user groups. These permissions *do not* apply to service accounts.

## Set Default Permissions for New Users

You can set default permissions for new users. By default, all new users can perform a set of new user actions discussed above. In addition, you can create a set of default permissions that are assigned to every new user added to the system later on:

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Organization Settings**.
2. On the **New Accounts Defaults** tab select the set of permissions you want to grant to new users.

The default permissions affect only new user accounts that you create after you made the change. They do not affect service accounts.

{% include note.html content="In many cases, it makes sense to create a group with permissions for new users, and to set that group as the default for new users." %}

## Set the Default User Group for New Users

Each new user is assigned to the **Everyone** group.

To add any new user to additional groups:

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Organization Settings**.
2. In the **Default User Groups** text box:
  * Start typing the name of additional groups to add groups.
  * Click the **x** next to a group name to remove a group. You cannot remove the Everyone group.

Going forward, new users are added to the group. They get the group's permissions and any permissions set as **New User Default Permissions**.

## Troubleshooting User Accounts

* **Problem:** When you invite a new user, an error like the following error appears in the GUI:
  ```
  User with id <user@domain.com> is already created in our system.
  ```

* **Cause:**
  This error means that the user's email address (id) already exists on the current tenant or on another tenant on the same cluster. An email address cannot exist more than once unless multi-tenant authentication has been enabled explicitly.

* **Solution:**
  1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Accounts**.
  2. Search for the user with their email address to check if that user already exists.
  3. If the user is returned and doesn't know their password, ask them to [reset their password](users_account_managing.html#reset-a-forgotten-password).

  If the user does not exist on the current tenant [open a support ticket](wavefront_support_feedback.html#support).
