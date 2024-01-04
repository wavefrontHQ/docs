---
title: Manage Your VMware Cloud Services Account
keywords: administration
sidebar: doc_sidebar
permalink: csp_users_account_managing.html
summary: Learn how to manage your password and preferences.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for VMware Cloud services subscriptions. For **original** subscriptions, see [Customize Your Account](users_account_managing.html)."%}

When your Operations for Applications instance is onboarded to VMware Cloud services, you use a single [VMware Cloud services account](csp_getting_started.html#whats-a-vmware-cloud-services-account) to access your entire VMware Cloud services portfolio across hybrid and native public clouds, including Operations for Applications.

## Manage Your Password

It's a best practice to change your password every few months. See [How do I reset my password](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-8FD73719-36EE-4414-B3A2-AA1B9687BE4D.html) in the VMware Cloud services documentation.

{% include note.html content="If you log in with a corporate account, you cannot update your password following these instructions. Your company prompts you to update your password at regular intervals. Contact your Enterprise Administrator to explicitly update your password." %}

## Configure Your Preferences

In your user profile page in Operations for Applications, you can configure several preferences, for example, select our light theme or chart title size.
1. Log in to your service instance.
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your user name.
1. On the **User Information** page, make the necessary changes.

    {% include note.html content="Some preferences, managed by the users with the **Super Admin** service role, are preset for all users of the service instance." %}

In your user profile page in the VMware Cloud Services Console, you can configure several preferences, such as language and regional format, dark or light theme, motion reduction, and What's New banner appearance.
1. In the Operations for Applications UI or in the VMware Cloud Services Console, click your user name on the menu bar and select **My Account**.
1. On the **Preferences** tab, in the corresponding panel for language, appearance, accessibility, etc., click **Edit**.
1. Make the necessary changes and click **Save**.

## Speed Up Chart Display with the Chart Sampling Preference

Our rendering engine is fast, but it still takes time to render thousands of series. You can limit the number of time series that charts display with the chart sampling preference.

1. Log in to your service instance.
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your user name.
1. On the **User Information** tab, under **Display Settings** make the necessary changes.

You can limit the number of time series to 100 for new charts by changing the **Sampling** default in your preferences.

![sampling preference](images/sampling_preference.png)


## Examine Your Groups, Roles, and Permissions

If you can't perform a certain task, it's possible that you don't have the necessary permissions.

A VMware Cloud **Organization Owner** or **Organization Administrator** usually assigns [service roles and custom roles](csp_users_roles.html) to groups and individual users.

Permissions are additive:
* If you belong to a group with two roles, you get the permissions from both roles.
* If you belong to two groups, you get the permissions from the roles assigned to both groups.
* If roles were assigned to you explicitly, you get the corresponding permissions as well.

To view your roles, see what access you have to services, and request additional roles, see [How do I manage my roles in an Organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-528C2CE3-6335-43A2-99F1-B722464F0A1D.html) in the VMware Cloud services documentation.

## Enable or Disable Super Admin Mode

If you hold the [**Super Admin** service role](csp_users_roles.html#operations-for-applications-service-roles-built-in), you can temporarily enable Super Admin mode and perform your Super Admin tasks.

{% include note.html content="To avoid making unintentional changes in the system, after performing your current Super Admin tasks, disable the Super Admin mode." %}

* To enable or disable the Super Admin mode, from the gear icon <i class="fa fa-cog"/> on the toolbar, turn on or off the **Super Admin Mode** toggle.

<table>
    <tbody>
        <tr>
            <td width="70%">As a result:
            <ul>
            <li>When the Super Admin mode is <strong>enabled</strong>, you have full administrative privileges for the Operations for Applications service. See the <a href="csp_users_roles.html#operations-for-applications-service-roles-built-in">Super Admin service role</a> for details.</li>
            <li>When the Super Admin mode is <strong>disabled</strong>, you have only the permissions from your other roles if any.</li>
            </ul></td>
            <td width="30%"><img src="/images/super_admin_mode.png" alt="A screenshot of the drop-down menu with the Super Admin Mode toggle.">
            </td>
        </tr>
    </tbody>
</table>

## Generate an API Token

Operations for Applications allows users to interact with the service instance using the [REST API](wavefront_api.html).

Before you can invoke the Operations for Applications API using `curl` or from an API client, you must have a VMware Cloud services access token with the relevant organization and service access. To obtain an access token, you must first generate a VMware Cloud services API token with relevant roles, and then exchange that API token for an access token.

You [manage your VMware Cloud services API tokens](csp_api_tokens.html#manage-the-vmware-cloud-services-api-tokens-for-your-user-account) in the VMware Cloud Services Console.

