---
title: Your Wavefront Account
keywords: administration
sidebar: doc_sidebar
permalink: users_account_managing.html
summary: Learn how to manage your passwords and preferences.
---
You manage your Wavefront account from the gear icon in the top right corner. From there, all users can manage passwords and configure preferences. Users in a [multi-tenant environment](authentication.html#multi-tenant-authentication) who have been invited to more than one tenant can also switch tenants from the gear icon. 

## Managing Your Password

You can change your password. You can reset a forgotten password if your account is managed by Wavefront, for example, during a trial.

{% include note.html content="If your company has an [SSO integration](integrations_authentication.html) enabled, you cannot update your password following these instructions. To update your password, contact your account administrator." %}

### Changing Your Password

To change your password:

1. Log in to your Wavefront instance.
1. Click the gear icon <i class="fa fa-cog"/> on the task bar and select your username.
2. Click the **Change Password** link and make the change.

### Resetting a Forgotten Password

To reset a forgotten password:

1. Browse to your Wavefront instance URL and click the **Forgot Password** link.
2. Follow the prompts to reset the password.


## Configuring User Preferences and Viewing Permissions

In your user profile, you can configure several preferences and view your permissions. If you can't perform certain tasks such as user management, you might not have permissions.

1. Click the gear icon <i class="fa fa-cog"/> on the task bar and select your username. Your user profile displays.
1. Change preferences in the User Information section.
1. View the permissions assigned to your account in the Permissions section.
1. To request additional permissions, contact the Wavefront administrator at your site or a user with [User Management permission](permissions_overview.html).


{% include note.html content="Some preferences are set for [all users in an account](users_managing.html#customer_prefs) by a user with [User Management permission](permissions_overview.html)." %}
