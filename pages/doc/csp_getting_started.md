---
title: Getting Started with Operations for Applications on VMware Cloud Services
tags: [administration]
sidebar: doc_sidebar
permalink: csp_getting_started.html
summary: Learn the basics for administering your service on the VMware Cloud services platform.
---
Starting June 1, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform.

If your Operations for Applications service is onboarded to VMware Cloud services, VMware Cloud services provides features to your Operations for Applications environment, such as:
- Single sign-on (SSO) with VMware Cloud services accounts.
- SAML 2.0 SSO identity federation with your enterprise identity provider.
- Identity access management (IAM) with built-in and custom service roles.
- Seamless integration with other services from your VMware Cloud services portfolio, such as VMWare Aria Operations for Logs and VMware Arial Operations Business Insights.

{% include note.html content="All new Operations for Applications service instances from June 1, 2023 onwards are onboarded to VMware Cloud services. We are in the process of incrementally onboarding the existing Operations for Applications instances to VMware Cloud services."%}

## What's VMware Cloud Services Console?

The VMware Cloud Services Console lets you manage your entire VMware Cloud services portfolio across hybrid and native public clouds. Operations for Applications is one of the many services that you can access, configure, and consume through this console.

To open the VMware Cloud Services Console:

- In a Web browser, directly go to `https://console.cloud.vmware.com`.
- From the Operations for Applications UI, click the **VMware Cloud Services Applications Menu** icon on the toolbar and select **Cloud Services Console**.

See [Using VMware Cloud Services Console](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-20D62AFF-024B-4901-976D-69BFD71BECC8.html) in the VMware Cloud services documentation.

## What's a VMware Cloud Services Account?

A VMware Cloud services account is a user (human) account in VMware Cloud services with which you can access all of your service instances, including Operations for Applications. A VMware Cloud services account logs in to VMware Cloud services with an email address and password. A VMware Cloud services account can be one of the following:
- A VMware account (VMware ID) that you create in the VMware Cloud Services Console.

    You can create a VMware account independently, while [onboarding](start_trial.html) a service, or while [signing up](log_in_to_tanzu_observability.html#sign-up-with-an-email-invitation) to a service with an invitation link.
- Your corporate account if your enterprise domain is federated. You might still need to create a VMware account and link it to your corporate account if you need to access billing information in the organization. See [What is enterprise federation and how does it work](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html) in the VMware Cloud services documentation.

## What's a VMware Cloud Organization?

VMware Cloud services uses organizations to provide controlled access to one or more services. The VMware Cloud organization is a top-level construct which owns users and cloud services (subscriptions). You can have multiple VMware Cloud organizations. Users can belong to multiple organizations. Multiple service instances can run in the same or in different organizations. For example, you can have a multi-tenant Operations for Applications environment with multiple service instances (tenants) in the same organization.

{% include note.html content="You can create a VMware Cloud organization only when you are onboarding a new service instance, for example, when you are [starting an Operations for Applications free trial](start_trial.html)."%}

See [How do I manage my Cloud Services organizations](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-CF9E9318-B811-48CF-8499-9419997DC1F8.html) in the VMware Cloud services documentation.

## What's a VMware Cloud Organization Role?

A VMware account can belong to one or more VMware Cloud organizations. A VMware account belongs to a given VMware Cloud organization if the account has an organization role for that organization. There are three organization roles:
- The **Organization Owner** role has full administrative access to all resources in the organization. They can invite users to the organization and assign role-based access to all users, including themselves. Also, they can kick off an enterprise domain federation and invite an **Enterprise Administrator**. See [Setting Up Enterprise Federation with VMware Cloud Services Guide](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html)  in the VMware Cloud services documentation.

    When you create an organization during a service onboarding process, you become its first **Organization Owner**.
- The **Organization Administrator** role has as limited administrative access. Users with that role can invite and manage only users with the **Organization Member** role. Can have additional access with additional roles.
- The **Organization Member** role has read-only access to the resources in the organization. Can have additional access with additional roles.

See [What organization roles are available in VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html) in the VMware Cloud services documentation.

## What Are Service Roles and Custom Roles?

VMware Cloud services includes service-specific built-in roles, including [Operations for Applications service roles](csp_users_roles.html#operations-for-applications-service-roles-built-in). Each service role grants certain access to the corresponding service instance in the organization.

While the service roles are built-in and not editable, you can create [custom roles](csp_users_roles.html#create-edit-or-delete-a-custom-role) with service permissions of your choice, including [Operations for Application permissions](csp_permissions_overview.html#operations-for-applications-permissions).

## What's a Server to Server App?

If you want to use an application for automating management tasks in your service, for example, in Operations for Applications, your application requires direct access to your service, without user authorization.

For that purpose, VMware Cloud services supports server-to-server apps, which are based on OAuth 2.0 *client credentials* grant type. Configure your application to pass the OAuth 2.0 client credentials to the Operations for Applications REST API, and access tokens are issued directly to your application.

See [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.