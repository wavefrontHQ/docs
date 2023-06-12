---
title: Sign Up or Log In to Your Service Instance on VMware Cloud Services
tags: [getting started]
sidebar: doc_sidebar
permalink: csp_sign_up_or_log_in.html
summary: Learn how you can sign up and log in to your service instance if it's onboarded to VMware Cloud services.
---
Starting June 26, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform.

When your Operations for Applications instance is onboarded to VMware Cloud services, you use a single [VMware Cloud services account](csp_getting_started.html#what-is-a-vmware-cloud-services-account) to access your entire VMware Cloud services portfolio across hybrid and native public clouds, including Operations for Applications.

{% include note.html content="All **new** Operations for Applications service subscriptions are onboarded to VMware Cloud services. All **original** subscriptions, that means existing ones, remain as is until they migrate to VMware Cloud services. We are in the process of incrementally migrating original subscriptions to VMware Cloud services. For information about original and VMware Cloud services subscriptions and the differences between them, see [Subscription Types](subscriptions-differences.html). "%}

Here’s how the signup works:
1.	If you don't belong to the VMware Cloud organization in which the Operations for Applications service instance is running, you can be added to that organization in one the following ways:
- A VMware Cloud **Organization Owner** or **Organization Administrator** adds you individually. See [How do I add users to my organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-47AA313E-9DAC-447C-B6C8-DF71ED45B0D5.html) in the VMware Cloud services documentation.
- A VMware Cloud **Organization Owner** and **Enterprise Administrator** federate your corporate domain with VMware Cloud services. See [What is enterprise federation and how does it work](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html) in the VMware Cloud services documentation.
2. A VMware Cloud **Organization Owner** or **Organization Administrator** grants you access to the organization's resources with an [organization role](csp_getting_started.html#what-is-a-vmware-cloud-organization-role).
3. A VMware Cloud **Organization Owner** or **Organization Administrator** grants you access to the Operations for Applications service instance with an [Operations for Applications service or custom role](csp_users_roles.html). In a multi-tenancy environment, you can have a different service and custom roles for the different Operations for Applications service instances (tenants).
4. After you’ve been added to an organization, you receive an email notification with information about the VMware Cloud organization to which you were added, your organization role, and your service or custom role. You can now [sign up](#sign-up-with-an-email-invitation) for the Operations for Applications service instance.
5. From now on, you can log in to your service instance from the [VMware Cloud Services Console](#log-in-from-the-vmware-cloud-services-console).

## Sign Up with an Email Invitation

If you received an email notification with information that you are added to a VMware Cloud organization with Operations for Applications access, follow these steps:

1. Click the **VMware Aria Operations for Applications** link in your email notification.
2. Authenticate yourself to VMware Cloud services. 
    - If your account is not federated, sign in with your VMware account credentials.
    
      If you don't have a VMware account, you must create one.
    - If your account is federated, sign in with your corporate credentials.
  
      {% include note.html content="As a user of a federated account, you must create a VMware account only if you want to file a support ticket or perform billing and subscription-related operations."%}
3. On the **Organization** tab of the **Services** page, locate the **VMware Aria Operations for Applications** tile from the list of the services available to the organization.
4. In the **VMware Aria Operations for Applications** tile, click **Launch Service**.

   <table>
   <tr>
   <td>If you belong to multiple tenants, from the drop-down menu, select the tenant to which you want to log in.</td>
   <td><img src="/images/csp_multi_tenancy.png" alt="Drop-down menu with several tenants."></td>
   </tr>
   </table>

    You are redirected to your service instance and you're logged in with your VMware Cloud services account.
    
From now on, you can log in to your service instance from the [VMware Cloud Services Console](#log-in-from-the-vmware-cloud-services-console) or by using the [direct URL](#log-in-by-using-a-direct-url).

## Log In from the VMware Cloud Services Console

You can log in to the VMware Cloud Services Console and launch your service instance. If you have access to multiple Operations for Applications service instances, you can select the tenant to which you want to log in, because VMware Cloud Services also supports a multi-tenancy login.

1. In a Web browser, go to [https://console.cloud.vmware.com/](https://console.cloud.vmware.com/).
2. Authenticate yourself.
  - If your account is not federated, sign in with your VMware account credentials. 
  - If your account is federated, sign in with your corporate credentials.
3. If you belong to multiple organizations, switch to the organization in which the Operations for Applications service instance runs. See [How do I access another one of my organizations](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-432417CF-CE0C-48EB-BEBB-8C27751577D1.html) in the VMware Cloud services documentation.
4. On the **Organization** tab of the **Services** page, locate the **VMware Aria Operations for Applications** tile from the list of the services available to the organization.
5. In the **VMware Aria Operations for Applications** tile, click **Launch service**.

    <table>
    <tr>
    <td>If you belong to multiple tenants, from the drop-down menu, select the tenant to which you want to log in.</td>
    <td><img src="/images/csp_multi_tenancy.png" alt="Drop-down menu with several tenants."></td>
    </tr>
    </table>

You are redirected to your Operations for Applications service instance and you're logged in with your VMware Cloud services account.

<table>
<tr>
<td>If you belong to multiple tenants, from the drop-down menu in the top-left corner of the menu bar, you can switch between tenants.</td>
<td><img src="/images/to_multi_tenancy.png" alt="Drop-down menu with several tenants."></td>
</tr>
</table>

## Learn More!

See [Manage Your VMware Cloud Services Account](csp_users_account_managing.html) for customizing your user preferences.
