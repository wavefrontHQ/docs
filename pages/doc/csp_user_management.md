---
title: Manage User Accounts
keywords: administration
sidebar: doc_sidebar
permalink: csp_user_management.html
summary: Learn how to manage your password and preferences.
---

Starting June 1, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. If your Operations for Applications instance is onboarded to VMware Cloud services, VMware Cloud services provides identity access management for the users in your Operations for Applications environment. 

{% include note.html content="All new Operations for Applications service instances from June 1, 2023 onwards are onboarded to VMware Cloud services. We are in the process of incrementally onboarding the existing Operations for Applications instances to VMware Cloud services."%}

For efficient user management, you can create groups and assign roles to groups. You can assign service roles and custom roles to groups. You can also assign service roles and custom roles to individual users.

- The Operations for Applications service roles are built-in and not editable.
- Custom roles can be assigned with different permissions for different services in the organization.
- A given role can be assigned for a certain time period or without an expiration date.
- In a multi-tenant environment, a given user can have different Operations for Applications service roles for the different Operations for Applications service instances (tenants).

{% include note.html content="To manage user access to the services in your VMware Cloud organization, you must hold the **Organization Owner** or **Organization Administrator** role. See [What organization roles are available in VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html)."%}

## Add a User to Your Service Instance

- If you want to add a user who doesn't belong to your organization, you must first assign that user an [organization role](csp_getting_started.html#what-is-a-vmware-cloud-organization-role), and then you can assign that user an [Operations for Applications service role](csp_getting_started.html#what-is-an-operations-for-applications-service-role).

    See [How do I add users to my organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-47AA313E-9DAC-447C-B6C8-DF71ED45B0D5.html).

- If you want to add a user who belongs to your organization, you must assign that user an Operations for Applications service role or a custom role with an Operations for Applications permission. You have these options:

    - Add the user to group with at least one [Operations for Applications service role](csp_getting_started.html#what-is-an-operations-for-applications-service-role) or [custom role](csp_getting_started.html#what-is-a-custom-role) with an Operations for Applications permission for your service instance.

        See [How do I work with groups](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-0BD8A07B-C3C0-4220-8CD0-18FA070D3DAD.html) in the VMware Cloud services documentation.

    - Edit the user's roles and add at least one [Operations for Applications service role](csp_getting_started.html#what-is-an-operations-for-applications-service-role) or [custom role](csp_getting_started.html#what-is-a-custom-role) with an Operations for Applications permission for your service instance.

        See [How do I change user roles](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-A70DBFDC-86FD-4C84-8753-0E55C8C98F8E.html).

{% include important.html content="Make sure that you assign the [**Super Admin** service role](csp_getting_started.html#sa) to at least one user for your Operations for Applications service instance. There are some Super Admin tasks that no one else can perform."%}

An invited user receives an email with an account activation link to [sign up](log_in_to_tanzu_observability.html#sign-up-with-an-email-invitation) to the service instance.

## Edit a User 

To change the roles of a user, ...

To change the group membership, you must edit the group


## Remove a User

To remove a user from your service instance

To remove a user from your organization,...

## Enable Request for additional roles

## Approve or Deny Request for additional roles


See [How do I manage self-service requests for additional roles](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-94C793E8-1D40-432A-A0E9-B8FBB1FE04E6.html)

## Sign Out a User

As a [Super Admin](csp_getting_started.html#sa), you can sign out other users by using the REST API. To sign out a user while you [enabled Super Admin mode](csp_users_account_managing.html#enable-or-disable-super-admin-mode), simply run a POST request with the `logout` API call. For example:

```
POST https://<your_instance>.wavefront.com/api/logout/{identifier}
```

You must specify the `{identifier}`, which is the email address of the user that you want to log out. If you are not logged in to your service instance, when you run the POST request, you must also provide a valid [API token](csp_users_account_managing.html#generate-an-api-token).

## Manage API Tokens

You can activate and deactivate API tokens 

See [How do I manage API tokens in my Organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-3A9C29E0-460B-4586-B51A-084443A960D0.html)




