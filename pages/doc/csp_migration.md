---
title: Onboarding Original Subscriptions to VMware Cloud Services
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_migration.html
summary: Learn about how we migrate the authorization and authentication from Tanzu Observability to VMware Cloud services.
---

Starting July 3, 2023, Tanzu Observability (formerly known as VMware Aria Operations for Applications) is a service on the VMware Cloud services platform. We are in the process of incrementally onboarding all original subscriptions to VMware Cloud services.

## What Should I Do Before the Onboarding?

Currently, all original Tanzu Observability subscriptions are integrated with VMware Cloud services for billing and subscription management. Therefore, you must already have a [VMware Cloud organization](csp_getting_started.html#whats-a-vmware-cloud-organization) with at least one user with the [VMware Cloud **Organization Owner** role](csp_getting_started.html#whats-a-vmware-cloud-organization-role).

Before the onboarding:
* Get familiar with the VMware Cloud service platform. See [Getting Started with Tanzu Observability on VMware Cloud Services](csp_getting_started.html).
* Verify that your VMware Cloud **Organization Owner** user can log in to the [VMware Cloud Services Console](https://console.cloud.vmware.com).

    - If you are the VMware Cloud **Organization Owner** user and cannot log in, try using the **Forgot Password** option.
    - If your VMware Cloud **Organization Owner** user is unreachable or you don't know the name of your VMware Cloud **Organization Owner** user, contact our Technical Support team for assistance.
* If you have a [SAML SSO integration](auth_self_service_sso.html), as a VMware Cloud **Organization Owner** user, you must federate your currently integrated enterprise domain with your VMware Cloud organization. For details, see the [Setting Up Enterprise Federation with VMware Cloud Services Guide](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html) in the VMware Cloud services documentation.

    {% include warning.html content="If you do not federate your currently integrated enterprise domain, after onboarding to VMware Cloud services all users will lose access to the service."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## What's the Onboarding Process?

The onboarding is done by our team. If you are currently using a SAML SSO integration, you must only federate your enterprise domain before the process starts. The following flowchart shows the overall process.

![Onboarding flowchart. Each stage of the process is described below.](images/csp-onboarding-flow.png)

Here's the process:
1. You receive a notification in your service UI with the date scheduled for your service onboarding to VMware Cloud services.
1. If you are using a SAML SSO integration, your VMware Cloud **Organization Owner** user federates your currently integrated enterprise domain with your VMware Cloud organization. That must happen before the scheduled onboarding date.
1. On the scheduled date, we onboard your service instance to VMware Cloud services, that is, we migrate your users, roles, and groups to your VMware Cloud organization. During the process, there's a banner notification in your service UI.

    {% include important.html content="During the onboarding, you should not to do any changes related to users, roles, groups, and permissions. Such changes might be lost."%}
1. When the onboarding completes, you can see a banner notification in your service UI and, shortly after that, all active users are logged out.
1. Each user receives an email with an invitation link to sign up to VMware Cloud services.

    The invitation links are valid for seven days.
1. Each user redeems the invitation link and [signs up](csp_sign_up_or_log_in.html#sign-up-with-an-email-invitation) to the VMware Cloud Services Console.

    - The users of a non-federated domain must create a password for their VMware Cloud services account.
    
    - The users of a federated domain must log in with their existing corporate passwords.

{% include tip.html content="From now on, **all** users [log in](csp_sign_up_or_log_in.html#log-in-from-the-vmware-cloud-services-console) to the service instance from the [VMware Cloud Services Console](https://console.cloud.vmware.com)."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## How Are the Users Migrated to VMware Cloud Services?

During the process of onboarding your Tanzu Observability service to VMware Cloud services, we add all your current users to your VMware Cloud organization running the service.

![An image displaying how users are migrated when your Tanzu Observability service is onboarded to VMware Cloud services. The information from the image is explained in the bullet list below.](images/csp-user-accounts-migration.png)

* If a user is a **Super Admin** in Tanzu Observability, we assign that user with the **Super Admin** Tanzu Observability service role in VMware Cloud services.
* If a user is assigned with individual permissions in Tanzu Observability, we assign that user with the corresponding [Tanzu Observability service roles](csp_users_roles.html#operations-for-applications-service-roles-built-in) in VMware Cloud services. For example, if a user has the **Alerts** permission in Tanzu Observability, we assign that user with the **Alerts** Tanzu Observability service role in VMware Cloud services. There are the following exceptions:

    - The **Accounts** permission is replaced by the [VMware Cloud **Organization Administrator** role](csp_getting_started.html#whats-a-vmware-cloud-organization-role) plus the **Admin** Tanzu Observability service role.
    - The **API Tokens** permission is not replaced by any role, because this privilege is not needed in VMware Cloud services. Each VMware Cloud services user can manage their own VMware Cloud services API tokens.
    - The **SAML IdP Admin** permission is not replaced by any role, because this privilege is not needed in VMware Cloud services. The VMware Cloud **Organization Owner** initiates enterprise federation for your corporate domain and assigns an **Enterprise Administrator**.

    For details, see the [permissions differences](csp-differences-by-area.html#permissions).
* If a user does not have any permissions and roles in Tanzu Observability, we assign that user with the **Viewer** Tanzu Observability service role in VMware Cloud services.
* If a user is assigned with roles in Tanzu Observability, we assign that user with the corresponding custom roles in VMware Cloud services. See [How Are the Roles Migrated to VMware Cloud Services?](#how-are-the-roles-migrated-to-vmware-cloud-services).
* If a user belongs to a group in Tanzu Observability, we add that user to the corresponding group in VMware Cloud services. See [How Are the Groups Migrated to VMware Cloud Services?](#how-are-the-groups-migrated-to-vmware-cloud-services).

{% include tip.html content="From now on, users with the VMware Cloud **Organization Owner** and **Organization Administrator** roles can [manage the Tanzu Observability users](csp_user_management.html) in the VMware Cloud Services Console."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## How Are the Groups Migrated to VMware Cloud Services?

Originally, your Operation for Applications service includes the **Everyone** and **Service Accounts** system groups as well as any other custom groups that you have created.

### How Are the Custom Groups Migrated?

During the process of onboarding your Tanzu Observability service to VMware Cloud services, for each group that you have created in Tanzu Observability, we create a corresponding group in your VMware Cloud organization running the service.

* The corresponding VMware Cloud groups are with the same names and descriptions as the original Tanzu Observability custom groups.
* All users from a custom group in Tanzu Observability are added to the corresponding VMware Cloud group.
* The service accounts from the custom groups in Tanzu Observability **are not** added to any VMware Cloud group.

    {% include important.html content="Currently, VMware Cloud services supports grouping only for user accounts."%}
* If a custom group in Tanzu Observability is assigned with roles, the corresponding VMware Cloud group is assigned with the corresponding VMware Cloud custom roles. See [How Are the Roles Migrated to VMware Cloud Services?](#how-are-the-roles-migrated-to-vmware-cloud-services).

{% include tip.html content="From now on, users with the VMware Cloud **Organization Owner** and **Organization Administrator** roles can [manage the user groups](csp_users_roles.html#manage-user-groups) in the VMware Cloud Services Console."%}

### How Is the Everyone System Group Migrated?

During the process of onboarding your Tanzu Observability service to VMware Cloud services, for the **Everyone** system group in Tanzu Observability, we create the corresponding **All Tanzu Observability Users** group in your VMware Cloud organization running the service as follows:

* All current users are added to the **All Tanzu Observability Users** VMware Cloud group.

    {% include important.html content="New users will **no longer** be added automatically to this group."%}
* The **All Tanzu Observability Users** VMware Cloud group is assigned with the **All Tanzu Observability Users** VMware Cloud custom role, which corresponds to the **Everyone** role in Tanzu Observability. See [How Are the Roles Migrated to VMware Cloud Services?](#how-are-the-roles-migrated-to-vmware-cloud-services).
* If the **Everyone** system group in Tanzu Observability is assigned with custom roles, the **All Tanzu Observability Users** VMware Cloud group is assigned with the corresponding VMware Cloud custom roles. See [How Are the Roles Migrated to VMware Cloud Services?](#how-are-the-roles-migrated-to-vmware-cloud-services).
* In Tanzu Observability, we continue to maintain the **Everyone** system group only as a local **internal** group that is automatically populated with all new users. This group has no roles and permissions.

{% include tip.html content="From now on, it is up to you to add new users to the **All Tanzu Observability Users** VMware Cloud group. The **Everyone** internal system group can be used only when managing [access to dashboards and alerts](csp_access.html), [metrics security policy rules](csp_metrics_security.html), and [ingestion policies](ingestion_policies.html)."%}

### What Happens with the Service Accounts System Group?

During the process of onboarding your Tanzu Observability service to VMware Cloud services, we **do not** migrate the **Service Accounts** system group.

{% include important.html content="Currently, VMware Cloud services supports grouping only for user accounts."%}

* The permissions from the roles assigned to the **Service Accounts** system group in Tanzu Observability are now directly assigned to the service accounts. See [What Happens with the Service Accounts?](#what-happens-with-the-service-accounts).
* In Tanzu Observability, we continue to maintain the **Service Accounts** system group only as a local **internal** group that is automatically populated with all [service accounts](csp_service_accounts.html) and [server to server OAuth apps](csp_server_to_server_apps.html) that have access to the service instance. This group has no roles and permissions.

{% include tip.html content="From now on, the **Service Accounts** internal system group can be used only when managing [access to dashboards and alerts](csp_access.html), [metrics security policy rules](csp_metrics_security.html), and [ingestion policies](ingestion_policies.html)."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## How Are the Roles Migrated to VMware Cloud Services?

During the process of onboarding your Tanzu Observability service to VMware Cloud services, for each role in Tanzu Observability, we create a corresponding [custom role](csp_users_roles.html#create-edit-or-delete-a-custom-role) in your VMware Cloud organization running the service as follows:

* For each role that you have created in Tanzu Observability, we create a corresponding VMware Cloud custom role with the same name and description.
* For the **Everyone** role that is assigned to the **Everyone** system group in Tanzu Observability, we create the **All Tanzu Observability Users** VMware Cloud custom role. See [How Is the Everyone System Group Migrated?](#how-is-the-everyone-system-group-migrated).
* For the **Service Accounts** role that is assigned to the **Service Accounts** system group in Tanzu Observability, we **do not** create any VMware Cloud custom role, because this group is not migrated. See [What Happens with Service Accounts System Group?](#what-happens-with-the-service-accounts-system-group).
* The corresponding VMware Cloud custom roles are assigned with the same [permissions](csp_permissions_overview.html) as the original roles in Tanzu Observability. There are the following exceptions:

    - The **Accounts** permission in Tanzu Observability is replaced by the **Admin** Tanzu Observability permission in VMware Cloud services. In addition, the users with that permission are assigned with the [VMware Cloud **Organization Administrator** role](csp_getting_started.html#whats-a-vmware-cloud-organization-role).
    - The **API Tokens** permission in Tanzu Observability **is not** replaced by any permission in VMware Cloud services. This permission does not exist in VMware Cloud services, because each user can manage their own VMware Cloud services API tokens.
    - The **SAML IdP Admin** permission in Tanzu Observability **is not** replaced with by permission in VMware Cloud services. This permission does not exist in VMware Cloud services, because the VMware Cloud **Organization Owner** initiates enterprise federation for your corporate domain and assigns an **Enterprise Administrator**.

    For details, see the [permissions differences](csp-differences-by-area.html#permissions).

{% include tip.html content="From now on, users with the VMware Cloud **Organization Owner** and **Organization Administrator** roles can [manage the custom roles](csp_users_roles.html#create-edit-or-delete-a-custom-role) in the VMware Cloud Services Console."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## What Happens with the Service Accounts?

During the process of onboarding your Tanzu Observability service to VMware Cloud services, the service accounts **are not** migrated to VMware Cloud services, because VMware Cloud services supports [server to server OAuth apps](csp_server_to_server_apps.html), which are equivalent to the services accounts in Tanzu Observability.

{% include warning.html content="The usage of service accounts in Tanzu Observability on VMware Cloud services is **restricted** to support only a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens) that still authenticate with Tanzu Observability API tokens. We are in the process of updating all of our integrations to authenticate with VMware Cloud services access tokens. Service accounts and Tanzu Observability API tokens will be deprecated in the future."%}

For backward compatibility, all of your service accounts are **preserved** in Tanzu Observability as follows:

* The service accounts no longer belong to groups, because the groups management is migrated to VMware Cloud services.
* The service accounts no longer have roles, because the roles management is migrated to VMware Cloud services.
* The service accounts are assigned with their existing permissions, including the permissions that they have inherited from roles and group roles. Exceptions are the **API Tokens** and **SAML IdP Admin** permissions, which no longer exist.

    {% include note.html content="The **Accounts** permission in Tanzu Observability corresponds to the [**Admin** Tanzu Observability permission](csp_permissions_overview.html) in VMware Cloud services."%}
* All service accounts still belong to the **Service Accounts** system group, which is now only an **internal** Tanzu Observability group that is automatically populated with all [service accounts](csp_service_accounts.html) and [server to server OAuth apps](csp_server_to_server_apps.html) that have access to the service instance. This group has no roles and permissions.

You should incrementally [replace](#how-to-replace-a-service-account-with-a-server-to-server-app) your service accounts in Tanzu Observability with server to server OAuth apps in VMware Cloud services.

{% include tip.html content="From now on, users with the VMware Cloud **Organization Owner**, **Organization Administrator**, or **Organization Member** with **Developer** roles can [manage server to server apps](csp_server_to_server_apps.html) in the VMware Cloud Services Console. Users with the **Admin** service role can [manage the service accounts](csp_service_accounts.html) in Tanzu Observability. The **Service Accounts** internal system group can be used only when managing [access to dashboards and alerts](csp_access.html), [metrics security policy rules](csp_metrics_security.html), and [ingestion policies](ingestion_policies.html)."%}

### How to Replace a Service Account with a Server to Server App?

Service accounts authenticate with Tanzu Observability API tokens, while server to server OAuth apps authenticate with the more secure VMware Cloud services access tokens. Service accounts are supported for a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens) but will be deprecated in the future.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
After onboarding to VMware Cloud services, you should incrementally replace your service accounts in Tanzu Observability with server to server OAuth apps in VMware Cloud services.

<br /><br /> The flowchart on the right shows the overall process for creating a server to server OAuth app and replacing a service account with it.
</td>
<td width="50%">
<img src="/images/csp-replace-service-account.png" alt="Flowchart showing how to replace a service account with a server to server app. The process is described in the list below"/>
</td>
</tr>
</tbody>
</table>

1. Log in to the VMware Cloud Services Console as an **Organization Owner**, **Organization Administrator**, or **Organization Member** with the **Developer** role assigned.
1. Create a server to server OAuth app. See [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.

    - For the server to server app name and description, you can enter the name and the description of the service account that you want to replace.
    - For the time to live (TTL) of the access tokens that will be issued to that server to server app, you can configure a value from 1 to 300 minutes. This value defines the period in which the access token should be renewed.
    - For the scopes of the server to server app, you must configure the roles that correspond to the permissions of the service account that you want to replace:

        <table style="width: 100%;">
        <tbody>
        <tr>
        <td width="30%"><strong>Scope</strong>
        </td>
        <td width="70%"><strong>Description</strong>
        </td>
        </tr>
        <tr>
        <td>
        <strong>Organization Role</strong>
        </td>
        <td><strong>Organization Member</strong> is sufficient in most of the cases.
        </td>
        </tr>
        <tr>
        <td>
        <strong>Custom Roles</strong>
        </td>
        <td>Optional. Use only if you previously created a <a href="csp_users_roles.html#create-edit-or-delete-a-custom-role">custom role</a> with the necessary <a href="csp_permissions_overview.html">Tanzu Observability permissions</a>.
        </td>
        </tr>
        <tr>
        <td><strong>Service Roles</strong>
        </td>
        <td>Required for service access. Assign the <a href="csp_users_roles.html#operations-for-applications-service-roles-built-in">Tanzu Observability service roles</a> that correspond to the permissions of the service account that you want to replace.
        <p>If you already assigned a custom role, you must assign at least the <strong>Viewer</strong> Tanzu Observability service role.</p>
        </td>
        </tr>
        </tbody>
        </table>
1. Make sure that you save the app credentials (ID and secret) of your newly created server to server app to a secure location.

    {% include important.html content="This is the only time you can see and save the app secret. If you miss to copy it or lose it, you must regenerate the app secret."%}
1. Add the server to server app to your VMware Cloud organization.
1. Reconfigure your scripts, API calls, or proxies to exchange the app credentials for an access token, instead of using the API tokens associated with the service account.

    {% include important.html content="Depending on the TTL that you configured for the app access tokens, make sure that your script renews the access token periodically before it expires. The Wavefront proxy does this automatically. "%}
1. Log in to your service instance as a user with the **Admin** service role and [deactivate or delete](csp_service_accounts.html#deactivate-or-activate-a-service-account) the service account that you replaced.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## What Happens with the Tanzu Observability API Tokens?

During the process of onboarding your Tanzu Observability service to VMware Cloud services, the Tanzu Observability API tokens **are not** migrated to VMware Cloud services, because Tanzu Observability on VMware Cloud services supports authentication with:

* VMware Cloud services API tokens associated with user accounts.
* Server to server OAuth apps credentials, that is, app ID and app secret. The server to server OAuth app must belong to the organization that is running the Tanzu Observability service.

You must exchange a VMware Cloud services API token or the credentials (ID and secret) of server to server OAuth app for a VMware Cloud services **access token**.

For backward compatibility, all of your API tokens are **preserved** in Tanzu Observability as follows:

* The Tanzu Observability API tokens associated with user accounts are **no longer**  editable. The users can still use, view, and revoke their Tanzu Observability API tokens until they expire, but they **cannot** generate new ones.
* The Tanzu Observability API tokens associated with service accounts are editable, because we still support them for a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens).

You should incrementally [replace](#how-to-replace-an-operations-for-applications-api-token-with-a-vmware-cloud-services-access-token) your Tanzu Observability API tokens with VMware Cloud services API tokens and server to server OAuth apps.

{% include tip.html content="From now on, all users must generate VMware Cloud services API tokens for their accounts and exchange them for access tokens. Users with the VMware Cloud **Organization Owner**, **Organization Administrator**, or **Organization Member** with **Developer** roles can create server to server OAuth apps and exchange the app credentials for access tokens."%}

### How to View and Manage the Tanzu Observability API Tokens?

Users with the **Admin** Tanzu Observability service role can [manage](csp_api_tokens.html#manage-the-operations-for-applications-api-tokens-in-your-service-instance) the Tanzu Observability API tokens in the service instance.

Each user can view and revoke their own Tanzu Observability API tokens:

1. Log in to your service instance.
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your username.
1. Click the **API Access** tab and view all your Tanzu Observability API tokens.
1. To revoke a token, click the **Revoke** button for the token.

    If you run a script that uses a revoked token, the script returns an authorization error.

### How to Replace a Tanzu Observability API Token with a VMware Cloud Services Access Token?

It's recommended to use Tanzu Observability API tokens only for a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens). We will update these integrations to authenticate with VMware Cloud services access tokens in a future release.

<table style="width: 100%;">
<tbody>
<tr>
<td markdown="span">
<br /><br /><br /><br />

You should incrementally replace your Tanzu Observability API tokens with the more secure VMware Cloud services access tokens.
<br /><br />
To replace a Tanzu Observability API token associated with a service account, you must replace the service account with a server to server OAuth app. See [How to Replace a Service Account with a Server to Server App?](#how-to-replace-a-service-account-with-a-server-to-server-app).
<br /><br />
The flowchart on the right shows the overall process for replacing a Tanzu Observability API token with a VMware Cloud services API token.
</td>
<td>
<img src="/images/csp-replace-api-token.png" alt="Flowchart showing how to replace a Tanzu Observability API token with a VMware Cloud services API token. The process is described in the list below"/>
</td>
</tr>
</tbody>
</table>


To replace a Tanzu Observability API token associated with your user account:

1. Log in to the VMware Cloud Services Console.
1. Generate an API token. See [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html) in the VMware Cloud services documentation.

    - For the name of the VMware Cloud services API token, you can enter the name of the Tanzu Observability API token that you want to replace.
    - For the time to live (TTL) of the VMware Cloud services API token, you can configure a value from several minutes to several months, or never expire. This value defines the period in which the API token should be renewed.
    
        The TTL of the access tokens that will be issued to that API token is 30 minutes and is not configurable.
    - For the scopes of the API token, you must configure the minimum portion of your roles:

        {% include note.html content="Till now, the Tanzu Observability API tokens inherited all your permissions and roles. Now, you can set the VMware Cloud services API token with a subset of the roles that you own."%}

        <table style="width: 100%;">
        <tbody>
        <tr>
        <td width="30%"><strong>Scope</strong>
        </td>
        <td width="70%"><strong>Description</strong>
        </td>
        </tr>
        <tr>
        <td>
        <strong>Organization Role</strong>
        </td>
        <td><strong>Organization Member</strong> is sufficient in most of the cases.
        </td>
        </tr>
        <tr>
        <td>
        <strong>Custom Roles</strong>
        </td>
        <td>Optional. Use only if you have assigned a <a href="csp_users_roles.html#create-edit-or-delete-a-custom-role">custom role</a>.
        </td>
        </tr>
        <tr>
        <td><strong>Service Roles</strong>
        </td>
        <td>Required for service access.
        <p>If you already assigned a custom role, you must assign at least the <strong>Viewer</strong> Tanzu Observability service role.</p>
        </td>
        </tr>
        </tbody>
        </table>
1. Reconfigure your scripts, API calls, or proxies to exchange the newly generated VMware Cloud services API token for an access token, instead of using the Tanzu Observability API token.

    {% include important.html content="The TTL of the access tokens associated with user accounts is 30 minutes. Make sure that your script renews the access token periodically before it expires. The Wavefront proxy does this automatically. "%}
1. [Revoke](#how-to-view-and-manage-the-operations-for-applications-api-tokens) the Tanzu Observability API token that you replaced.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## What Happens with the Wavefront Proxies?

During the process of onboarding your Tanzu Observability service to VMware Cloud services, all of the existing Wavefront proxies are **preserved** with their existing Tanzu Observability API tokens.

You should incrementally [replace](#how-to-replace-the-operations-for-application-api-token-of-a-wavefront-proxy) the tokens of your proxies to authenticate with the more secure VMware Cloud services access tokens.

{% include tip.html content="From now on, the users with the **Proxies** service role can create and manage the proxies in your Tanzu Observability service. New proxies must authenticate with VMware Cloud services access tokens unless used for the [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens) that still authenticate with Tanzu Observability API tokens."%}

### How to Replace the Operations for Application API Token of a Wavefront Proxy?

{% include important.html content="Make sure the version of your Wavefront proxy is 13.0 or later."%}

1. Log in to the VMware Cloud Services Console.
1. Obtain OAuth app credentials (recommended) or a VMware Cloud services API token:

    - Create a server to server app with the **Proxies** service role, save its OAuth credentials (app ID and app secret), and add it to your VMware Cloud organization. See [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.
    
        Also, obtain the long ID of the VMware Cloud organization. See [View the Organization ID](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-CF9E9318-B811-48CF-8499-9419997DC1F8.html#view-the-organization-id-1) in the VMware Cloud services documentation.
    - Generate a VMware Cloud services API token with the **Proxies** service role. See [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html) in the VMware Cloud services documentation.
1. Go to the [proxy configurations location](proxies_configuring.html#proxy-file-paths) and edit the `wavefront.conf` file with the OAuth app credentials or your VMware Cloud services API token:

    - Replace the `token` parameter with the `cspAppId`, `cspAppSecret`, and `cspOrgId` parameters:

        ```
        cspAppId=<OAuth_app_id>
        cspAppSecret=<OAuth_app_secret>
        cspOrgId=<Org_long_ID>
        ```
    - Replace the `token` parameter with the `cspAPIToken` parameter:

        ```
        cspAPIToken=<VMware_Cloud_services_API_token>
        ```
1. [Revoke](#how-to-view-and-manage-the-operations-for-applications-api-tokens) the Tanzu Observability API token that you replaced.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## What Happens with the Integrations?

During the process of onboarding your Tanzu Observability service to VMware Cloud services, all of the existing integrations are **preserved** and continue to operate using proxy authentication with Tanzu Observability API tokens.

You should incrementally [replace](#how-to-replace-the-operations-for-application-api-token-of-a-wavefront-proxy) the proxy tokens of your [integrations](integrations_onboarded_subscriptions.html#integrations-that-use-vmware-cloud-services-access-tokens) that are updated to use proxy authentication with the more secure VMware Cloud services access token.

{% include tip.html content="From now on, the users with the **Proxies** and **Integrations** service roles can set up integrations in your Tanzu Observability service. New integrations must use proxy authentication with VMware Cloud services access tokens except for the [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens) that still authenticate with Tanzu Observability API tokens."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>