---
title: Manage Users of Operations for Applications on VMware Cloud Services
keywords: administration
sidebar: doc_sidebar
permalink: csp_user_management.html
summary: Add and manage users of VMware Aria Operations for Applications on VMware Cloud services.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for VMware Cloud services subscriptions. For **original** subscriptions, see [Manage User Accounts](user-accounts.html)."%}

VMware Cloud services provides identity access management for the users of your services, including Operations for Applications. For example, see our tutorial [Invite New Users from the VMware Cloud Services Console](csp_new_users_tutorial.html).

{% include note.html content="To manage user access to the services in your VMware Cloud organization, you must hold the VMware Cloud **Organization Owner** or **Organization Administrator** role. See [What organization roles are available in VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html) in the VMware Cloud services documentation."%}

## Adding Users to Your Service Instance

To add a user to your Operations for Applications service instance, you must assign that user:

1. An organization role for the VMware Cloud organization running the service instance.

    {% include note.html content="If you are a VMware Cloud **Organization Administrator**, you can assign only the VMware Cloud **Organization Member** role. Only a VMware Cloud **Organization Owner** can add VMware Cloud **Organization Owners** and VMware Cloud **Organization Administrators**."%}

1. An [Operations for Applications service role](csp_users_roles.html#operations-for-applications-service-roles-built-in) for the service instance.
  
    You can assign a combination of service roles. For example, if the user that you want to invite will set up integrations, make sure that you assign that user both the **Integrations** and the **Proxies** service roles.

    If you plan to assign that user a custom role, you must assign that user at least the **Viewer** Operations for Applications service role, so that the user can access the service instance.

    {% include note.html content="In a multi-tenant environment, you assign service roles on a tenant basis. You can assign different service roles for different Operations for Applications instances (tenants). The users have access only to the tenants for which they have service roles. The users receive the `401 Unauthorized: User has no access to service` error message when trying to access a tenant for which they don't have service roles."%}

    {% include important.html content="Make sure that you assign the [**Super Admin** service role](csp_users_roles.html#operations-for-applications-service-roles-built-in) to at least one user of your Operations for Applications service instance. There are some Super Admin tasks that no one else can perform. "%}

1. Optionally, a [custom role](csp_users_roles.html#create-edit-or-delete-a-custom-role) with an [Operations for Applications permission](csp_permissions_overview.html#operations-for-applications-permissions).

    {% include important.html content="In a multi-tenant Operations for Applications environment, custom roles apply to **all** service instances (tenants) to which the user has access, that is, for which the user has at least one Operations for Applications service role."%}

You can assign users with these roles in the following ways:

### Adding Users to Your Organization

When you are adding an individual user or a list of users to the VMware Cloud organization running the service instance, you must assign that users organization roles. To grant the users access to the Operations for Applications instance, you assign that users service roles. Optionally, you can also assign the users custom roles, which apply only in combination with service roles.

For details, see [How do I add users to my Organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-47AA313E-9DAC-447C-B6C8-DF71ED45B0D5.html).

The newly added users receive an invitation email with an account activation link to [sign up](csp_sign_up_or_log_in.html) to the service instance. The invitations you send are valid for seven days. You can view the status of the invitation on the **Identity and Access Management** > **Pending Invitations** page.

### Creating or Editing a Group

When you are creating or editing a group in the VMware Cloud organization running the service instance, you can add a list of users as members of the group and you can assign organization, service, and custom roles to the group.

You can add users who already belong to the VMware Cloud organization as well as new users who don't belong to the VMware Cloud organization yet. You can add users from your federated domain as well as users that are outside your federated domain.

For details, see [How do I work with groups](hhttps://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-0BD8A07B-C3C0-4220-8CD0-18FA070D3DAD.html) in the VMware Cloud services documentation.

The newly added users receive an invitation email with an account activation link to [sign up](csp_sign_up_or_log_in.html) to the service instance. The invitations you send are valid for seven days. You can view the status of the invitation on the **Identity and Access Management** > **Pending Invitations** page.

### Editing a User's Roles

If a user already belongs to the VMware Cloud organization running the service instance, you can edit the user's roles to assign that user with Operations for Applications service or custom roles.

For details, see [How do I change user roles](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-A70DBFDC-86FD-4C84-8753-0E55C8C98F8E.html) in the VMware Cloud services documentation.

## Remove a User

- To remove a user from your service instance, you must remove their [Operations for Applications service roles](csp_users_roles.html#operations-for-applications-service-roles-built-in).
    - If the roles are individually assigned to the user, edit the user's roles. See [How do I change user roles](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-A70DBFDC-86FD-4C84-8753-0E55C8C98F8E.html) in the VMware Cloud services documentation.
    - If the roles are inherited from a group, edit the group and remove that user from the list of members. See [How do I work with groups](hhttps://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-0BD8A07B-C3C0-4220-8CD0-18FA070D3DAD.html) in the VMware Cloud services documentation.

- To remove a user from your organization, therefore from all services in the organization, see [How do I remove users from my Organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-628143FC-7DB0-4399-8344-43F75F748ADF.html) in the VMware Cloud services documentation.

## Sign Out a User

As a user with the [**Super Admin** service role](csp_users_roles.html#operations-for-applications-service-roles-built-in), you can sign out other users by using the [REST API](wavefront_api.html). To sign out a user while you [enabled Super Admin mode](csp_users_account_managing.html#enable-or-disable-super-admin-mode), simply run a POST request with the `logout` API call. For example:

```
POST https://<your_instance>.wavefront.com/api/logout/{identifier}
```

You must specify the `{identifier}`, which is the email address of the user that you want to log out. If you are not logged in to your service instance, when you run the POST request, you must also provide a valid [API token](csp_users_account_managing.html#generate-an-api-token).