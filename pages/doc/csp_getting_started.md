---
title: Getting Started with Operations for Applications on VMware Cloud Services
tags: [administration]
sidebar: doc_sidebar
permalink: csp_getting_started.html
summary: Learn the basics for administering your service on the VMware Cloud services platform.
---
Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. From this date, we support two types of subscriptions: Operations for Applications subscriptions **onboarded** to VMware Cloud services and **original** subscriptions.

Original subscriptions are the existing ones and they remain as is until onboarded to VMware Cloud services. We are in the process of incrementally [onboarding](csp_migration.html) all original subscriptions to VMware Cloud services. For information about original and VMware Cloud services subscriptions and the differences between them, see [Differences Between Original and VMware Cloud Services Subscriptions](subscriptions-differences.html).

{% include note.html content="Starting September 7, 2023, all [**new trial**](start_trial.html) instances of Operations for Applications are **onboarded** to VMware Cloud services."%}

VMware Cloud services provides features to your Operations for Applications environment, such as:
- Single sign-on (SSO) with VMware Cloud services accounts.
- SAML 2.0 SSO identity federation with your enterprise identity provider.
- Identity access management (IAM) with built-in and custom service roles.
- Seamless integration with other services from your VMware Cloud services portfolio, for example, VMWare Aria Operations for Logs.
- Billing and Subscriptions

See the [Advantages of VMware Cloud Services Subscriptions Over Original Subscriptions](subscriptions-differences.html#advantages-of-vmware-cloud-services-subscriptions-over-original-subscriptions).

## What's VMware Cloud Services Console?

The VMware Cloud Services Console lets you manage your entire VMware Cloud services portfolio across hybrid and native public clouds. Operations for Applications is one of the many services that you can access, configure, and consume through this console.

To open the VMware Cloud Services Console:

- In a Web browser, go to `https://console.cloud.vmware.com`.
- From the Operations for Applications UI, click the **VMware Cloud Services Applications Menu** icon (![applications icon](images/applications-solid.png)) in the top-right corner and select **Cloud Services Console**.

See [Using VMware Cloud Services Console](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-20D62AFF-024B-4901-976D-69BFD71BECC8.html) in the VMware Cloud services documentation.

## What's a VMware Cloud Services Account?

A VMware Cloud services account is a user (human) account in VMware Cloud services with which you can access all of your service instances, including Operations for Applications. A VMware Cloud services account logs in to VMware Cloud services with an email address and a password. A VMware Cloud services account can be one of the following:
- A VMware account (VMware ID) that you create in the VMware Cloud Services Console.

    You can create a VMware account independently, while [onboarding](start_trial.html) a service, or while [signing up](csp_sign_up_or_log_in.html) to a service with an invitation link.
- Your corporate account if your enterprise domain is federated. You might still need to create a VMware account and link it to your corporate account if you need to access billing information in the organization. See [What is enterprise federation and how does it work](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html) in the VMware Cloud services documentation.

## What's a VMware Cloud Organization?

VMware Cloud services uses organizations to provide controlled access to one or more services. The VMware Cloud organization is a top-level construct which owns users and cloud services (subscriptions). 
* You can have multiple VMware Cloud organizations. 
* Users can belong to multiple organizations. 
* Multiple service instances can run in the same or in different organizations. 

For example, you can have a multi-tenant Operations for Applications environment with multiple service instances (tenants) in the same organization.

{% include note.html content="You can create a VMware Cloud organization only when you are onboarding a new service instance, for example, when you are [starting an Operations for Applications free trial](start_trial.html)."%}

See [How do I manage my Cloud Services organizations](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-CF9E9318-B811-48CF-8499-9419997DC1F8.html) in the VMware Cloud services documentation.

## What's a VMware Cloud Organization Role?

A VMware account can belong to one or more VMware Cloud organizations. A VMware account belongs to a given VMware Cloud organization if the account has an organization role for that organization. There are three VMware Cloud organization roles:

<table>
<tbody>
<thead>
<tr><th width="30%">Role</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td><strong>Organization Owner</strong></td>
<td>The VMware Cloud <strong>Organization Owner</strong> role has full administrative access to all resources in the organization. They can invite users to the organization and assign role-based access to all users, including themselves. They can also kick off an enterprise domain federation and invite an <strong>Enterprise Administrator</strong>. See <a href="https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html">Setting Up Enterprise Federation with VMware Cloud Services Guide</a> in the VMware Cloud services documentation.
<p>When you create an organization during a service onboarding process, you become its first <strong>Organization Owner</strong>.</p></td>
</tr>
<tr><td><strong>Organization Administrator</strong></td>
<td>The VMware Cloud <strong>Organization Administrator</strong> role has limited administrative access. Users with that role can invite and manage only users that have roles with lower administrative permissions. For example, they can grant or manage access for other users and groups who have the <strong>Organization Member</strong> role, but cannot manage users, groups, or resources who are assigned the <strong>Organization Owner</strong> or <strong>Organization Administrator</strong> role. <p>Users with the <strong>Organization Administrator</strong> role can have additional access if other permissions are explicitly assigned to them. For example, when the <strong>Billing Read-only</strong> check box is selected, users with the <strong>Organization Administrator</strong> role can have read-only access to billing-related information and the option to generate usage consumption reports.</p>
</td>
</tr>
<tr>
<td><strong>Organization Member</strong></td>
<td>The VMware Cloud <strong>Organization Member</strong> role has read-only access to the resources in the organization. <p>Users with the <strong>Organization Member</strong> role can have additional access when additional permissions are explicitly assigned to them. For example, when the <strong>Access Log Auditor</strong> check box is selected, they can access all audit data for the organization in the associated vRealize Log Insight Cloud service instance for their organization.</p></td>
</tr>
</tbody>
</table>

See [What organization roles are available in VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html) in the VMware Cloud services documentation.

## What Are Service Roles and Custom Roles?

VMware Cloud services includes service-specific built-in roles, including [Operations for Applications service roles](csp_users_roles.html#operations-for-applications-service-roles-built-in). A service role is required to grant certain access to the corresponding service instance in the organization.

While the service roles are built-in and not editable, as a VMware Cloud **Organization Administrator** or **Organization Owner**, you can create [custom roles](csp_users_roles.html#create-edit-or-delete-a-custom-role) with service permissions of your choice, including [Operations for Application permissions](csp_permissions_overview.html#operations-for-applications-permissions). Custom roles are optional and apply to all service instances for which the target user or server to server app has at least one service role.

## What's a Server to Server App?

If you want to use an application for automating management tasks in your service, for example, in Operations for Applications, your application requires direct access to your service, without user authorization.

For that purpose, VMware Cloud services supports server to server apps, which are based on OAuth 2.0 client credentials grant type. You can configure your application to pass the OAuth 2.0 client credentials (id and secret) to the VMware Cloud services REST API and exchange the credentials for a VMware Cloud services access token. Your application can use the VMware Cloud services access token to interact with the Operations for Applications REST API.

See [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.

{% include important.html content="For each server to server app with access to an Operations for Applications service instance, we create a corresponding **internal service account** in that service instance and add it the **Service Accounts** internal system group. So that, when you configure [the access control security settings](csp_access.html#change-the-access-control-security-setting), [ingestion polices](ingestion_policies.html#step-1-specify-the-scope-and-pps-limit), or [metrics security rules](csp_metrics_security.html), the server to server apps that are assigned with Operations for Applications service roles are represented as service accounts together with the [service accounts](csp_service_accounts.html) created in Operations for Applications."%}
