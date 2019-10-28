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

{% include note.html content="If your company has an [SSO integration](integrations_authentication.html) enabled, you cannot update your password following these instructions. To update your password, contact your account administrator." %}

### Change Your Password

To change your password:

1. Log in to your Wavefront instance.
1. Click the gear icon <i class="fa fa-cog"/> on the task bar and select your username.
2. Click the **User Information** tab, click the **Change Password** link, and make the change.

### Reset a Forgotten Password

To reset a forgotten password:

1. Browse to your Wavefront instance URL and click the **Forgot Password** link.
2. Follow the prompts to reset the password.


## Configure User Preferences

In your user profile, you can configure several preferences, for example, select our dark theme or chart title size.

1. Click the gear icon <i class="fa fa-cog"/> on the task bar and select your username.
1. Click the **User Information** tab and make changes as needed.


{% include note.html content="Some preferences are preset for all users in an account by a user with [Users and Groups permission](permissions_overview.html)." %}

## Switch Between UI Versions

If your environment has been set up to offer the v2 Beta UI option, you can easily switch between UI versions.

1. Click the gear icon <i class="fa fa-cog"/> on the task bar and select your username.
1. Select the UI Version that you want to work in.

   ![select UI version](/images/ui_version_menu.png)

## Speed up Chart Display with the Sampling Preference

Wavefront is very fast, but sometimes it's not necessary for the user to wait for thousands of series to be rendered.

Starting with release 2019.42, you can limit the number of time series to 100 for new charts by changing the **Sampling** default in your preferences.

![sampling preference](images/sampling_preference.png)


## Examine Groups and Permissions

If you can't perform a certain task, it's possible that you don't have [permissions](permissions_overview.html). Permissions are additive: You have the permissions from all groups you belong to, plus any permissions individually assigned to you.

You can check the permissions you have and see which groups you belong to from your account page.
1. Click the gear icon <i class="fa fa-cog"/> on the task bar and select your username.
2. Click the **Groups & Permissions** tab to display the groups you belong to and the permissions you have.
![groups and permissions](images/groups_and_permissions.png)

3. Hover over any group to see the permissions you have because you belong to that group. Permissions are additive.

**Note:** It's possible that you can't modify a dashboard or an alert even if you have Dashboard or Alert permission. This happens if access is restricted explicitly for that dashboard or alert, or if the [Security system preference](access.html) is set to allow access to new objects only to the creator. Ask the dashboard or alert creator to share the object with you.

## Generating an API Token

Wavefront allows you to interact with your Wavefront instance using the [Wavefront REST API](wavefront_api.html). When you make an API call, you have to pass in a token, which you can generate from your account page.

1. Click the gear icon <i class="fa fa-cog"/> on the task bar and select your username.
2. Click the **API Access** tab and follow the instructions.
