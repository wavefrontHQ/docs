---
title: Managing Your Wavefront Account
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: users_account_managing.html
summary: Learn how to manage your Wavefront account.
---

## Managing Your Password

{% include note.html content="If your company has an SSO integration enabled ([ADFS](integrations_sso_adfs), [Azure AD](integrations_sso_azure_ad) [Google](integrations_sso_google), [Okta](integrations_sso_okta), [OneLogin](integrations_sso_onelogin)), then you will be unable to update your password following these instructions. Contact your account administrator in order to update your password." %}

### Changing Your Password

To change your password:

1. Log in to your Wavefront instance.
1. Click the gear icon <i class="fa fa-cog"/> on the task bar and select your username. Your user profile displays.
    1. In the User Information section, click the **Change Password** link.
    1. Type the current password once and the new password twice. 
    1. Click **Save**.

### Resetting a Forgotten Password

To reset a forgotten password:

1. Browse to your Wavefront instance URL.
1. Click the **Forgot Password** link.
1. Enter the email address associated with your Wavefront account.
1. Click **Send Password Recovery Email**. Email containing a link to reset the password is sent to your account. The link associated with the reset password email expires after 24 hours. You will need to repeat steps 1-3 if you do not reset your password within that time frame.
1. Open the reset password email and click the reset password link. You are directed back to your Wavefront instance where you can enter a new password.
 
## Determining Assigned Permissions

Click the gear icon <i class="fa fa-cog"/> on the task bar and select your username. Your user profile displays. The Permissions section lists the permissions assigned to your account. To request additional permissions, contact a user with User Management permission.


## Configuring Your Preferences

You configure can configure several preferences in your user profile.

1. Click the gear icon <i class="fa fa-cog"/> on the task bar and select your username. Your user profile displays.
1. In the User Information section you can set the following preferences:
- Preferred time zone and time display.
- Whether to use the dark theme in dashboards. The default theme displays charts with a white background. The dark theme displays charts with a dark background.
- The default chart title size.
- Whether to enable the [Query Builder](query_language_query_builder) and whether to always open it.
- The dashboard that displays after you log in or when you click the Wavefront logo. The default setting is the [Intro: Home dashboard](dashboards_introductory).
 
Some Query Builder and default dashboard preferences can also be set for [all users in an account](users_managing#customer_prefs).


{% include links.html %}
