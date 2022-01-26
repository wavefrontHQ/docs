---
title: Your Wavefront Account
keywords: administration
sidebar: doc_sidebar
permalink: users_account_managing.html
summary: Learn how to manage your passwords and preferences.
---
You manage your Wavefront account from the gear icon in the top right corner. From there, all users can manage passwords and configure preferences. Users in a [multi-tenant environment](authentication.html#multi-tenant-authentication) who have been invited to more than one tenant can also switch tenants from the gear icon.

## Manage Your Password

You can change your password. You can reset a forgotten password if your account is managed by Wavefront, for example, during a trial.

{% include note.html content="If your company has an [SSO integration](authentication.html) enabled, you cannot update your password following these instructions. To update your password, contact your account administrator." %}

### Change Your Password

To change your password:

1. Log in to your Wavefront instance.
2. Click the gear icon <i class="fa fa-cog"/> in the top right of the taskbar and select your username.
3. On the **User Information** tab, click the **Change Password** link, and enter the current and new passwords as prompted.
4. Click **Save**.

### Reset a Forgotten Password

To reset a forgotten password:

1. Browse to your Wavefront instance URL and click the **Forgot Password** link.
2. Follow the prompts to reset your password.


## Configure User Preferences

In your user profile, you can configure several preferences, for example, select our dark theme or chart title size.

1. Click the gear icon <i class="fa fa-cog"/> in the top right of the taskbar and select your username.
1. On the **User Information** tab, make the necessary changes.


{% include note.html content="Some preferences are preset for all users in an account by a user with [Accounts permission](permissions_overview.html)." %}


## Speed Up Chart Display with the Chart Sampling Preference

Wavefront is very fast, but sometimes it's not necessary for the user to wait for thousands of series to be rendered.

1. Click the gear icon <i class="fa fa-cog"/> in the top right of the taskbar and select your username.
1. On the **User Information** tab, under **Display Settings** make the necessary changes.

You can limit the number of time series to 100 for new charts by changing the **Sampling** default in your preferences.

![sampling preference](images/sampling_preference.png)


## Examine Groups, Roles, and Permissions

If you can't perform a certain task, it's possible that you don't have the necessary [permissions](permissions_overview.html).
* Wavefront administrators usually [create roles](users_roles.html), which are sets of permissions, and assign one or more roles to a group.
* Administrators can assign roles or permissions explicitly to individual users.

Permissions are additive:
* If you belong to a group with 2 roles, you get the permissions from both roles.
* If you belong to 2 groups, you get the permissions from combined roles.
* If permissions or roles were assigned to you explicitly, you get those as well.

You can check the permissions you have and see which groups you belong to.
1. Click the gear icon <i class="fa fa-cog"/> in the top right of the taskbar and select your username.
2. Click the **Groups, Roles & Permissions** tab to display the permissions you have and why you have them.
![groups and permissions](images/groups_and_permissions.png)

3. Hover over any group to see the permissions you have from this group. The permissions come from roles assigned to the group.

{% include note.html content="Even if you have **Dashboards** or **Alerts** permission, it's possible that you can't modify a dashboard or an alert. This happens if **access** is restricted explicitly for that dashboard or alert. Ask the dashboard or alert creator to share the object with you." %}

## Generate an API Token

Wavefront allows [user accounts](user-accounts.html) and [service accounts](service-accounts.html) to interact with your Wavefront instance using the [Wavefront REST API](wavefront_api.html).

{% include tip.html content="You generate user account tokens explicitly. For service accounts, you can generate tokens with the specified permissions from the Service Accounts page. " %}

{% include note.html content="All users can use and manage their existing API tokens. You must have the [API Tokens permission](permissions_overview.html) to generate new API tokens for your user account." %}

To generate an API token for your user account:

1. Click the gear icon <i class="fa fa-cog"/> in the top right of the taskbar and select your username.
2. Click the **API Access** tab and click **Generate**. See [Generating an API Token](wavefront_api.html#generating-an-api-token) for details.
