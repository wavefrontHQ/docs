---
title: Customize Your VMware Account
keywords: administration
sidebar: doc_sidebar
permalink: csp_users_account_managing.html
summary: Learn how to manage your password and preferences.
---

Starting June, 2023, VMware Aria Operations for Applications is a service in the VMware Cloud services catalog. If your Operations for Applications instance is onboarded to VMware Cloud services, you use a single VMware Cloud services account to access your entire VMware Cloud services portfolio across hybrid and native public clouds, including Operations for Applications.

{% include note.html content="All new Operations for Applications service instances from June, 2023 onwards are onboarded to VMware Cloud services. We are in the process of incrementally onboarding the existing Operations for Applications instances to VMware Cloud services."%}

## Manage Your Password

It's a best practice to change your password every few months.

{% include note.html content="If you log in with a corporate account, you cannot update your password following these instructions. Your company prompts you to update your password at regular intervals. Contact your Enterprise Administrator to explicitly update your password." %}

If your Operations for Applications instance is onboarded to VMware Cloud services, you can change the password of your VMware account from the [VMware Cloud Services Console](https://console.cloud.vmware.com/).

See [How do I reset my password](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-8FD73719-36EE-4414-B3A2-AA1B9687BE4D.html) for more details.


## Configure Your Preferences

In your user profile in Operations for Applications, you can configure several preferences, for example, select our dark theme or chart title size.

1. Log in to your service instance.
1. Click your user name on the toolbar and select **My Account**.
1. Click the **Preferences** tab and make the necessary changes.


1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your user name.
1. On the **User Information** tab, make the necessary changes.

{% include note.html content="Some preferences are preset for all users in the organization settings managed by users with the [Accounts](permissions_overview.html) permission." %}

## Speed Up Chart Display with the Chart Sampling Preference

Our rendering engine is fast, but it still takes time to render thousands of series. You can limit the number of time series that charts display with the chart sampling preference.

1. Log in to your service instance.
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your user name.
1. On the **User Information** tab, under **Display Settings** make the necessary changes.

You can limit the number of time series to 100 for new charts by changing the **Sampling** default in your preferences.

![sampling preference](images/sampling_preference.png)


## Examine Your Groups, Roles, and Permissions

If you can't perform a certain task, it's possible that you don't have the necessary [permissions](permissions_overview.html).
* Users with the **Accounts** permission usually [create roles](users_roles.html), which are sets of permissions, and assign one or more roles to a group.
* Users with the **Accounts** permission can assign roles or permissions explicitly to individual users.

{% include shared/badge.html content="![VMware Cloud icon](images/csp_icon.png) **Note:** If your Operations for Applications instance is onboarded to VMware Cloud services, your VMware Cloud organization owner has assigned an [Operations for Applications service role](csp_accounts.html#add-a-user-account-to-your-wavefront-instance) to you, so you might have a **built-in** service role. [Users with the **Accounts** permission](csp_getting_started.html#who-are-the-users-with-the-accounts-permission) can create and manage additional roles and permissions in Operations for Applications but with certain restrictions for the users with built-in service roles."%}

Permissions are additive:
* If you belong to a group with 2 roles, you get the permissions from both roles.
* If you belong to 2 groups, you get the permissions from combined roles.
* If permissions or roles were assigned to you explicitly, you get those as well.

{% include shared/badge.html content="![VMware Cloud icon](images/csp_icon.png) **Note:** If your Operations for Applications instance is onboarded to VMware Cloud services, your [Operations for Applications service role](csp_accounts.html#add-a-user-account-to-your-wavefront-instance) might **deny** certain permissions."%}

Check the permissions you have and see your groups and roles.
1. Log in to your service instance (`https://<your_instance>.wavefront.com`).
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your username.
1. Click the **Groups, Roles & Permissions** tab.
![Permissions with the check-circle icon are assigned explicitly. Permissions with the check icon are inherited from a group or role. Permissions with the times icon are not assigned or inherited.](images/groups_and_permissions.png)
    {% include note.html content="If you are a Super Admin user, the **Groups, Roles & Permissions** page shows your permissions when [Super Admin mode is disabled](#enable-or-disable-super-admin-mode)." %}
1. Examine your groups, roles, and permissions.
    * Hover over any group to see the permissions you have from this group. The permissions come from roles assigned to the group.
    * Hover over any role to see the permissions you have from this role.

      {% include shared/badge.html content="![VMware Cloud icon](images/csp_icon.png) **Note:** If your Operations for Applications instance is onboarded to VMware Cloud services, your [Operations for Applications service role](csp_accounts.html#add-a-user-account-to-your-wavefront-instance) might be mapped to a **built-in** role in Operations for Applications and might deny certain permissions. Consider the following example."%}
      **Example**:
      ![Permissions of the User (built-in) role](images/role_user_built_in.png)
      In this example, the organization owner has assigned the **User** service role to you. This means, that the **Accounts** permission is denied for you.  
    * Hover over permissions to see the groups and roles from which you have them.

      {% include shared/badge.html content="![Cloud icon](images/csp_icon.png) **Note:** If your Operations for Applications instance is onboarded to VMware Cloud services, a permission that is denied by your **built-in** service role **cannot** be overridden by your roles and permissions granted in Operations for Applications. Such a permission **can** be overridden only by another **built-in** service role which grants the same permission. Consider the following examples."%} 
      
      - **Example 1**:
      
      ![Permission denied by the Viewer (built-in) role](images/permission_denied.png)
      In this example, you belong to the Everyone group which grants you the **Alerts** permission. However, the organization owner has assigned the **Viewer** service role to you. This means, that you cannot get the **Alerts** permission and cannot manage alerts, maintenance windows, and alert targets.
    - **Example 2**:
    
    ![Permissions are additive of the User (built-in) and Accounts Administrator (built-in) roles](images/service_roles_combined.png)
    In this example, you belong to the Everyone group and the organization owner has assigned the **User** and the **Accounts Administrator** service roles to you. This means, that although the **Accounts** permission is denied by the **User** service role, you get the **Accounts** permission, because it's granted by the **Accounts Administrator** service role.

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

### ![VMware Cloud icon](images/csp_icon.png)Examine Your VMware Cloud Organization Role and Operations for Applications Service Roles

If your Operations for Applications instance is onboarded to VMware Cloud services, to see your [VMware Cloud organization role](csp_getting_started.html#vmware-cloud-organization-roles) and your [Operations for Applications service roles](csp_getting_started.html#tanzu-observability-service-roles), do the following:

1. Log in to the [VMware Cloud Services Console](https://console.cloud.vmware.com/).
1. Click your username on the toolbar, select **Change Organization**, and select the organization in which your Operations for Applications service instance is running.
1. Click your username on the toolbar and select **My Account**.
1. Click the **My Roles** tab and examine your organization role and Operations for Applications service roles.

## Enable or Disable Super Admin Mode

If you are a Super Admin user for the Operations for Applications service, you can temporarily enable Super Admin mode and perform your Super Admin tasks.

{% include note.html content="To avoid making unintentional changes in the system, after performing your current Super Admin tasks, disable the Super Admin mode." %}

* As a Super Admin user, to enable or disable the Super Admin mode, from the gear icon <i class="fa fa-cog"/> on the toolbar, turn on or off the **Super Admin Mode** toggle.

<table>
    <tbody>
        <tr>
            <td width="70%">As a result:
            <ul>
            <li>When the Super Admin mode is <strong>enabled</strong>, you have full administrative privileges for the Operations for Applications service. See <a href="authorization-faq.html#who-is-the-super-admin-user">Who Is the Super Admin User?</a> for details.</li>
            <li>When the Super Admin mode is <strong>disabled</strong>, you have only the permissions listed on the <a href="users_account_managing.html#examine-your-groups-roles-and-permissions">Groups, Roles & Permissions page</a>.</li>
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
2. Click the **API Access** tab and click **Generate**. See [Generate and Manage the API Tokens for Your User Account](wavefront_api.html#generate-and-manage-the-api-tokens-for-your-user-account) for details.
