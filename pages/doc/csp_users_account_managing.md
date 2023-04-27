---
title: Customize Your VMware Cloud Services Account
keywords: administration
sidebar: doc_sidebar
permalink: csp_users_account_managing.html
summary: Learn how to manage your password and preferences.
---

Starting June 1, 2023, VMware Aria Operations for Applications is a service in the VMware Cloud services catalog. If your Operations for Applications instance is onboarded to VMware Cloud services, you use a single [VMware Cloud services account]csp_getting_started.html#what-is-a-vmware-cloud-services-account) to access your entire VMware Cloud services portfolio across hybrid and native public clouds, including Operations for Applications.

{% include note.html content="All new Operations for Applications service instances from June, 2023 onwards are onboarded to VMware Cloud services. We are in the process of incrementally onboarding the existing Operations for Applications instances to VMware Cloud services."%}

## Manage Your Password

It's a best practice to change your password every few months. See [How do I reset my password](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-8FD73719-36EE-4414-B3A2-AA1B9687BE4D.html) for more details.

{% include note.html content="If you log in with a corporate account, you cannot update your password following these instructions. Your company prompts you to update your password at regular intervals. Contact your Enterprise Administrator to explicitly update your password." %}

## Configure Your Preferences

In your user profile in Operations for Applications, you can configure several preferences, for example, select our dark theme or chart title size.

1. Log in to your service instance.
1. Click your user name in the top-right corner and select **My Account**.
1. Click the **Preferences** tab and make the necessary changes.
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your user name.
1. On the **User Information** page, make the necessary changes.

{% include note.html content="Some preferences, managed by **Super Admin** users, are preset for all users of the service instance." %}

## Speed Up Chart Display with the Chart Sampling Preference

Our rendering engine is fast, but it still takes time to render thousands of series. You can limit the number of time series that charts display with the chart sampling preference.

1. Log in to your service instance.
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your user name.
1. On the **User Information** tab, under **Display Settings** make the necessary changes.

You can limit the number of time series to 100 for new charts by changing the **Sampling** default in your preferences.

![sampling preference](images/sampling_preference.png)


## Examine Your Groups, Roles, and Permissions

If you can't perform a certain task, it's possible that you don't have the necessary permissions.

An **Organization Owner** or **Organization Administrator** usually assigns [service roles](csp_getting_started.html#what-is-an-operations-for-applications-service-role) to groups and individual users.

Permissions are additive:
* If you belong to a group with two roles, you get the permissions from both roles.
* If you belong to 2 groups, you get the permissions from the roles assigned to both groups.
* If roles were assigned to you explicitly, you get the corresponding permissions as well.

To view your roles, see what access you have to services, and request additional roles, see [How do I manage my roles in an Organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-528C2CE3-6335-43A2-99F1-B722464F0A1D.html).

## Enable or Disable Super Admin Mode

If you hold the **Super Admin** service role, you can temporarily enable Super Admin mode and perform your Super Admin tasks.

{% include note.html content="To avoid making unintentional changes in the system, after performing your current Super Admin tasks, disable the Super Admin mode." %}

* To enable or disable the Super Admin mode, from the gear icon <i class="fa fa-cog"/> on the toolbar, turn on or off the **Super Admin Mode** toggle.

<table>
    <tbody>
        <tr>
            <td width="70%">As a result:
            <ul>
            <li>When the Super Admin mode is <strong>enabled</strong>, you have full administrative privileges for the Operations for Applications service. See the <a href="csp_getting_started.html#sa">Super Admin service role</a> for details.</li>
            <li>When the Super Admin mode is <strong>disabled</strong>, you have only the permissions from your other roles if any.</li>
            </ul></td>
            <td width="30%"><img src="/images/super_admin_mode.png" alt="A screenshot of the drop-down menu with the Super Admin Mode toggle.">
            </td>
        </tr>
    </tbody>
</table>

## Generate an API Token

VMware Aria Operations for Applications allows users to interact with the product instance using the [REST API](wavefront_api.html).

To generate an API token for your account, see [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html).
