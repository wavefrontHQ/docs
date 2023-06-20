---
title: Customize Your Account
keywords: administration
sidebar: doc_sidebar
permalink: users_account_managing.html
summary: Learn how to manage your passwords and preferences.
---
{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for **original** subscribers. For VMware Cloud services subscriptions, see [Manage Your VMware Cloud Services Account](csp_users_account_managing.html)."%}

VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) supports administrator-level customization for all users of an instance, and user-level customization, discussed on this page. 

You manage your account from the gear icon in the top right corner. From there, all users can manage passwords and configure preferences. Users in a [multi-tenant environment](authentication.html#multi-tenant-authentication) who have been invited to more than one tenant can also switch tenants from the gear icon.

## Manage Your Password

You can change your password. You can reset a forgotten password if your account is managed by VMware, for example, during a trial.

{% include note.html content="If your company has an [SSO integration](authentication.html) enabled, you cannot update your password following these instructions. To update your password, contact your account administrator." %}

### Change Your Password

To change your password:

1. Log in to your instance.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your username.
3. On the **User Information** tab, click the **Change Password** link, and enter the current and new passwords as prompted.
4. Click **Save**.

### Reset a Forgotten Password

To reset a forgotten password:

1. Browse to your instance URL (`https://<example>.wavefront.com`) and click the **Forgot Password** link.
2. Follow the prompts to reset your password.


## Configure User Preferences

In your user profile, you can configure several preferences, for example, select our light or dark theme or chart title size.

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your username.
1. On the **User Information** tab, make the necessary changes.


{% include note.html content="Some preferences are preset for all users in an account by a user with [Accounts permission](permissions_overview.html)." %}


## Speed Up Chart Display with the Chart Sampling Preference

Our rendering engine is fast, but it still takes time to render thousands of series. You can limit the number of time series that charts display with the chart sampling preference.

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your username.
1. On the **User Information** tab, under **Display Settings** make the necessary changes.

You can limit the number of time series to 100 for new charts by changing the **Sampling** default in your preferences.

![sampling preference](images/sampling_preference.png)


## Examine Groups, Roles, and Permissions

If you can't perform a certain task, it's possible that you don't have the necessary [permissions](permissions_overview.html).
* Users with the **Accounts** permission usually [create roles](users_roles.html), which are sets of permissions, and assign one or more roles to a group.
* Users with the **Accounts** permission can assign roles or permissions explicitly to individual users.

Permissions are additive:
* If you belong to a group with 2 roles, you get the permissions from both roles.
* If you belong to 2 groups, you get the permissions from combined roles.
* If permissions or roles were assigned to you explicitly, you get those as well.

You can check the permissions you have and see which groups you belong to.
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your username.
2. Click the **Groups, Roles & Permissions** tab to display the permissions you have and see why you have them.
![groups and permissions](images/groups_and_permissions.png)

3. Hover over any group to see the permissions you have from this group. The permissions come from roles assigned to the group.

{% include note.html content="If you are a Super Admin user, the **Groups, Roles & Permissions** page shows your permissions when [Super Admin mode is disabled](#enable-or-disable-super-admin-mode)." %}

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
If you don't have the <strong>Accounts</strong> permission, for updates to your groups, roles, or permissions, contact a user with the <strong>Accounts</strong> permission or your Super Admin. To see the list of the users with the <strong>Accounts</strong> permission, click the link at the bottom of the page.
</td>
<td width="50%"><img src="images/Accounts_users.png" alt="a screenshot with the link at the bottom of the Groups, Roles & Permissions page"></td>
</tr>
</tbody>
</table>

{% include note.html content="Even if you have the **Dashboards** or **Alerts** permission, it's possible that you can't modify a dashboard or an alert. This happens if **access** is restricted explicitly for that dashboard or alert. Ask the dashboard or alert creator to share the object with you." %}

## Enable or Disable Super Admin Mode

If you are a Super Admin user for the Wavefront service, you can temporarily enable Super Admin mode and perform your Super Admin tasks.

{% include note.html content="To avoid making unintentional changes in the system, after performing your current Super Admin tasks, disable the Super Admin mode." %}

* As a Super Admin user, to enable or disable the Super Admin mode, from the gear icon <i class="fa fa-cog"/> on the toolbar, turn on or off the **Super Admin Mode** toggle.

<table>
    <tbody>
        <tr>
            <td width="70%">As a result:
            <ul>
            <li>When the Super Admin mode is <strong>enabled</strong>, you have full administrative privileges for the Wavefront service. See <a href="authorization-faq.html#who-is-the-super-admin-user">Who Is the Super Admin User?</a> for details.</li>
            <li>When the Super Admin mode is <strong>disabled</strong>, you have only the permissions listed on the <a href="users_account_managing.html#examine-groups-roles-and-permissions">Groups, Roles & Permissions page</a>.</li>
            </ul></td>
            <td width="30%"><img src="/images/super_admin_mode.png" alt="A screenshot of the drop-down menu with the Super Admin Mode toggle.">
            </td>
        </tr>
    </tbody>
</table>


## Generate an API Token

VMware Aria Operations for Applications allows [user accounts](user-accounts.html) and [service accounts](service-accounts.html) to interact with the product instance using the [REST API](wavefront_api.html).

{% include tip.html content="You generate API tokens for your user account explicitly. For service accounts, a user with the **Accounts** permission can generate tokens from the **Service Accounts** page." %}

{% include note.html content="All users can use and manage their existing API tokens. You must have the [API Tokens permission](permissions_overview.html) to generate **new** API tokens for your user account." %}

To generate an API token for your user account:

1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your username.
2. Click the **API Access** tab and click **Generate**. See [Generate and Manage the API Tokens for Your User Account](api_tokens.html#generate-and-manage-the-api-tokens-for-your-user-account) for details.
