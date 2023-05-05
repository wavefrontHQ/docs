---
title: Manage Users in Operations for Applications on VMware Cloud Services
keywords: administration
sidebar: doc_sidebar
permalink: csp_user_management.html
summary: Add and manage users in VMware Aria Operations for Applications on VMware Cloud services.
---

VMware Cloud services provides identity access management for the users in your services, including Operations for Applications. 

{% include note.html content="To manage user access to the services in your VMware Cloud organization, you must hold the **Organization Owner** or **Organization Administrator** role. See [What organization roles are available in VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html) in the VMware Cloud services documentation."%}

## Add a User to Your Service Instance

- If you want to add a user who doesn't belong to your VMware Cloud organization, you must add that user to your organization and assign them an [organization role](csp_getting_started.html#what-is-a-vmware-cloud-organization-role).  

    See [How do I add users to my organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-47AA313E-9DAC-447C-B6C8-DF71ED45B0D5.html) in the VMware Cloud services documentation.

- If you want to add a user who belongs to your VMware Cloud organization, you must assign that user an [Operations for Applications service role](csp_users_roles.html#operations-for-applications-service-roles-built-in) or a [custom role](csp_users_roles.html#create-edit-or-delete-a-custom-role) with an [Operations for Applications permission](csp_permissions_overview.html#operations-for-applications-permissions). You have these options:

    - Add the user to a group that is assigned with an Operations for Applications service role or a custom role with an Operations for Applications permission. See [How do I work with groups](hhttps://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-0BD8A07B-C3C0-4220-8CD0-18FA070D3DAD.html) in the VMware Cloud services documentation.

    - Edit the user's roles and add an Operations for Applications service role or a custom role with an Operations for Applications permission. See [How do I change user roles](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-A70DBFDC-86FD-4C84-8753-0E55C8C98F8E.html) in the VMware Cloud services documentation.

{% include important.html content="Make sure that you assign the [**Super Admin** service role](csp_users_roles.html#operations-for-applications-service-roles-built-in) to at least one user for your Operations for Applications service instance. There are some Super Admin tasks that no one else can perform."%}

The newly added user receives an invitation email with an account activation link to [sign up](sign_up_or_log_in.html#sign-up-with-an-email-invitation) to the service instance.

## Remove a User

- To remove a user from your service instance, you must remove their [Operations for Applications service roles](csp_users_roles.html#operations-for-applications-service-roles-built-in) and the [custom roles](csp_users_roles.html#create-edit-or-delete-a-custom-role) with Operations for Applications permissions.
    - If the roles are individually assigned to the user, you must edit the user's roles. see [How do I change user roles](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-A70DBFDC-86FD-4C84-8753-0E55C8C98F8E.html) in the VMware Cloud services documentation.
    - If the roles are inherited from a group, you must edit the group and remove that user from the list of members. See [How do I work with groups](hhttps://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-0BD8A07B-C3C0-4220-8CD0-18FA070D3DAD.html) in the VMware Cloud services documentation.

- To remove a user from your organization, therefore from all services in the organization, see [How do I remove users from my Organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-628143FC-7DB0-4399-8344-43F75F748ADF.html) in the VMware Cloud services documentation.

## Sign Out a User

As a user with the [**Super Admin** service role](csp_users_roles.html#operations-for-applications-service-roles-built-in), you can sign out other users by using the [REST API](wavefront_api.html). To sign out a user while you [enabled Super Admin mode](csp_users_account_managing.html#enable-or-disable-super-admin-mode), simply run a POST request with the `logout` API call. For example:

```
POST https://<your_instance>.wavefront.com/api/logout/{identifier}
```

You must specify the `{identifier}`, which is the email address of the user that you want to log out. If you are not logged in to your service instance, when you run the POST request, you must also provide a valid [API token](csp_users_account_managing.html#generate-an-api-token).