---
title: Onboarding Original Subscriptions to VMware Cloud Services
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_migration.html
summary: Learn about how we migrate the authorization and authentication from Operations for Applications to VMware Cloud services.
---

Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. We are in the process of incrementally onboarding all original subscriptions to VMware Cloud services.

## What Should I Do Before the Onboarding?

Currently, all original Operations for Applications subscriptions are integrated with VMware Cloud services for billing and subscription management. Therefore, you must already have a [VMware Cloud organization](csp_getting_started.html#whats-a-vmware-cloud-organization) with at least one user with the [VMware Cloud **Organization Owner** role](csp_getting_started.html#whats-a-vmware-cloud-organization-role).

Before the onboarding:
* Verify that your VMware Cloud **Organization Owner** user can log in to the [VMware Cloud Services Console](https://console.cloud.vmware.com).

    - If you are the VMware Cloud **Organization Owner** user and cannot log in, try using the **Forgot Password** option.
    - If your VMware Cloud **Organization Owner** user is unreachable or you don't know the name of your VMware Cloud **Organization Owner** user, contact our Technical Support team for assistance.
* If you have a [SAML SSO integration](auth_self_service_sso.html), as a VMware Cloud **Organization Owner** user, you must federate your currently integrated enterprise domain with your VMware Cloud organization. For details, see the [Setting Up Enterprise Federation with VMware Cloud Services Guide](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html) in the VMware Cloud services documentation.

    {% include warning.html content="If you do not federate your currently integrated enterprise domain, after onboarding to VMware Cloud service all users will lose access to the service."%}

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

During the process of onboarding your Operations for Applications service to VMware Cloud services, we add all your current users to your VMware Cloud organization running the service.

![An image displaying how users are migrated when your Operations for Applications service is onboarded to VMware Cloud services. The information from the image is explained in the bullet list below.](images/csp-user-accounts-migration.png)

* If a user is assigned with individual permissions in Operations for Applications, we assign that user with the corresponding [Operations for Applications service roles](csp_users_roles.html#operations-for-applications-service-roles-built-in) in VMware Cloud services. For example, if a user has the **Alerts** permission in Operations for Applications, we assign that user with the **Alerts** Operations for Applications service role in VMware Cloud services. There are the following exceptions:

    - The **Accounts** permission is replaced by the [VMware Cloud **Organization Administrator** role](csp_getting_started.html#whats-a-vmware-cloud-organization-role) plus the **Admin** Operations for Applications service role.
    - The **API Tokens** permission is not replaced by any role, because this privilege is not needed in VMware Cloud services. Each VMware Cloud services user can manage their own VMware Cloud services API tokens.
    - The **SAML IdP Admin** permission is not replaced by any role, because this privilege is not needed in VMware Cloud services. The VMware Cloud **Organization Owner** initiates enterprise federation for your corporate domain and assigns an **Enterprise Administrator**.

    For details, see the [permissions differences](csp-differences-by-area.html#permissions).
* If a user is assigned with roles in Operations for Applications, we assign that user with the corresponding custom roles in VMware Cloud services. See [How Are the Roles Migrated to VMware Cloud Services?](csp_migration.html#how-are-the-roles-migrated-to-vmware-cloud-services).
* If a user belongs to a group in Operations for Applications, we add that user to the corresponding group in VMware Cloud services. See [How Are the Groups Migrated to VMware Cloud Services?](csp_migration.html#how-are-the-groups-migrated-to-vmware-cloud-services).
* If a user is a **Super Admin** in Operations for Applications, we assign that user with the **Super Admin** Operations for Applications service role in VMware Cloud services.
* If a user does not have any permissions and roles in Operations for Applications, we assign that user with the **Viewer** Operations for Applications service role in VMware Cloud services.

{% include tip.html content="From now on, users with the VMware Cloud **Organization Owner** and **Organization Administrator** roles can [manage the Operations for Applications users](csp_user_management.html) in the VMware Cloud Services Console."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## How Are the Groups Migrated to VMware Cloud Services?

Originally, your Operation for Applications service includes the **Everyone** and **Service Accounts** system groups as well as any other custom groups that you have created.

### How Are the Custom Groups Migrated?

During the process of onboarding your Operations for Applications service to VMware Cloud services, for each group that you have created in Operations for Applications, we create a corresponding group in your VMware Cloud organization running the service.

* The corresponding VMware Cloud groups are with the same names and descriptions as the original Operations for Applications custom groups.
* All users from a custom group in Operations for Applications are added to the corresponding VMware Cloud group.
* The service accounts from the custom groups in Operations for Applications **are not** added to any VMware Cloud group.

    {% include important.html content="Currently, VMware Cloud services supports grouping only for user accounts."%}
* If a custom group in Operations for Applications is a assigned with roles, the corresponding VMware Cloud group is assigned with the corresponding VMware Cloud custom roles. See [How Are the Roles Migrated to VMware Cloud Services?](csp_migration.html#how-are-the-roles-migrated-to-vmware-cloud-services).

{% include tip.html content="From now on, users with the VMware Cloud **Organization Owner** and **Organization Administrator** roles can [manage the user groups](csp_users_roles.html#manage-user-groups) in the VMware Cloud Services Console."%}

### How Is the Everyone System Group Migrated?

During the process of onboarding your Operations for Applications service to VMware Cloud services, for the **Everyone** system group in Operations for Applications, we create the corresponding **All Operations for Applications Users** group in your VMware Cloud organization running the service as follows:

* All current users are added to the **All Operations for Applications Users** VMware Cloud group.

    {% include important.html content="New users will **no longer** be added automatically to this group."%}
* The **All Operations for Applications Users** VMware Cloud group is assigned with the **All Operations for Applications Users** VMware Cloud custom role, which corresponds to the **Everyone** role in Operations for Applications. See [How Are the Roles Migrated to VMware Cloud Services?](csp_migration.html#how-are-the-roles-migrated-to-vmware-cloud-services).
* If the **Everyone** system group in Operations for Applications is a assigned with custom roles, the **All Operations for Applications Users** VMware Cloud group is assigned with the corresponding VMware Cloud custom roles. See [How Are the Roles Migrated to VMware Cloud Services?](csp_migration.html#how-are-the-roles-migrated-to-vmware-cloud-services).
* In Operations for Applications, we continue to maintain the **Everyone** system group only as a local **internal** group that is automatically populated with all new users. This group has no roles and permissions.

{% include tip.html content="From now on, it is up to you to add new users to the **All Operations for Applications Users** VMware Cloud group. The **Everyone** internal system group can be used only when managing [access to dashboards and alerts](csp_access.html), [metrics security policy rules](csp_metrics_security.html), and [ingestion policies](ingestion_policies.html)."%}

### What Happens with the Service Accounts System Group?

During the process of onboarding your Operations for Applications service to VMware Cloud services, we **do not** migrate the **Service Accounts** system group.

{% include important.html content="Currently, VMware Cloud services supports grouping only for user accounts."%}

* The permissions from the roles assigned to the **Service Accounts** system group in Operations for Applications are now directly assigned to the service accounts. See [What Happens with the Service Accounts?](csp_migration.html#what-happens-with-the-service-accounts).
* In Operations for Applications, we continue to maintain the **Service Accounts** system group only as a local **internal** group that is automatically populated with all [service accounts](csp_service_accounts.html) and [server to server OAuth apps](csp_server_to_server_apps.html) that have access to the service instance. This group has no roles and permissions.

{% include tip.html content="From now on, the **Service Accounts** internal system group can be used only when managing [access to dashboards and alerts](csp_access.html), [metrics security policy rules](csp_metrics_security.html), and [ingestion policies](ingestion_policies.html)."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## How Are the Roles Migrated to VMware Cloud Services?

During the process of onboarding your Operations for Applications service to VMware Cloud services, for each role in Operations for Applications, we create a corresponding [custom role](csp_users_roles.html#create-edit-or-delete-a-custom-role) in your VMware Cloud organization running the service as follows:

* For each role that you have created in Operations for Applications, we create a corresponding VMware Cloud custom role with the same name and description.
* For the **Everyone** role that is assigned to the **Everyone** system group in Operations for Applications, we create the **All Operations for Applications Users** VMware Cloud custom role. See [How Is the Everyone System Group Migrated?](csp_migration.html#how-is-the-everyone-system-group-migrated).
* For the **Service Accounts** role that is assigned to the **Service Accounts** system group in Operations for Applications, we **do not** create any VMware Cloud custom role, because this group is not migrated. See [What Happens with Service Accounts System Group?](csp_migration.html#what-happens-with-service-accounts-system-group).
* The corresponding VMware Cloud custom roles are assigned with the same [permissions](csp_permissions_overview.html) as the original roles in Operations for Applications. There are the following exceptions:

    - The **Accounts** permission in Operations for Applications is replaced by the **Admin** Operations for Applications permission in VMware Cloud services. In addition, the users with that permission are assigned with the [VMware Cloud **Organization Administrator** role](csp_getting_started.html#whats-a-vmware-cloud-organization-role).
    - The **API Tokens** permission in Operations for Applications **is not** replaced by any permission in VMware Cloud services. This permission does not exist in VMware Cloud services, because each user can manage their own VMware Cloud services API tokens.
    - The **SAML IdP Admin** permission in Operations for Applications **is not** replaced with by permission in VMware Cloud services. This permission does not exist in VMware Cloud services, because the VMware Cloud **Organization Owner** initiates enterprise federation for your corporate domain and assigns an **Enterprise Administrator**.

    For details, see the [permissions differences](csp-differences-by-area.html#permissions).

{% include tip.html content="From now on, users with the VMware Cloud **Organization Owner** and **Organization Administrator** roles can [manage the custom roles](csp_users_roles.html#create-edit-or-delete-a-custom-role) in the VMware Cloud Services Console."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## What Happens with the Service Accounts?

During the process of onboarding your Operations for Applications service to VMware Cloud services, the service accounts **are not** migrated to VMware Cloud services.

VMware Cloud services supports [server to server OAuth apps](csp_server_to_server_apps.html), which are equivalent to the services accounts in Operations for Applications. Service accounts are supported only for a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens) that still authenticate with Operations for Applications API tokens. You should incrementally replace your service accounts in Operations for Applications with server to server OAuth apps in VMware Cloud services.

For backward compatibility, all of your service accounts are **preserved** in Operations for Applications as follows:

* The service accounts no longer belong to groups, because the groups management is migrated to VMware Cloud services.
* The service accounts no longer have roles, because the roles management is migrated to VMware Cloud services.
* The service accounts are assigned with their existing permissions, including the permissions that they have inherited from roles and group roles. Exceptions are the **API Tokens** and **SAML IdP Admin** permissions, which no longer exist.

    {% include note.html content="The **Accounts** permission in Operations for Applications corresponds to the [**Admin** Operations for Applications permission](csp_permissions_overview.html) in VMware Cloud services."%}
* All service accounts still belong to the **Service Accounts** system group, which is now only an **internal** Operations for Applications group that is automatically populated with all [service accounts](csp_service_accounts.html) and [server to server OAuth apps](csp_server_to_server_apps.html) that have access to the service instance. This group has no roles and permissions.

{% include tip.html content="From now on, users with the VMware Cloud **Organization Owner**, **Organization Administrator**, or **Organization Member** with **Developer** roles can [manage server to server apps](csp_server_to_server_apps.html) in the VMware Cloud Services Console. Users with the **Admin** service role can [manage the service accounts](csp_service_accounts.html) in Operations for Applications. The **Service Accounts** internal system group can be used only when managing [access to dashboards and alerts](csp_access.html), [metrics security policy rules](csp_metrics_security.html), and [ingestion policies](ingestion_policies.html)."%}

### How to Replace a Service Account with a Server to Server App?

Service accounts authenticate with Operations for Applications API tokens, while server to server OAuth apps authenticate with the more secure VMware Cloud services access tokens. Service accounts are supported for a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens) but will be deprecated in the future.

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
After onboarding to VMware Cloud services, you should incrementally replace your service accounts in Operations for Applications with server to server OAuth apps in VMware Cloud services.

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
        <td>Optional. Use only if you previously created a <a href="csp_users_roles.html#create-edit-or-delete-a-custom-role">custom role</a> with the necessary <a href="csp_permissions_overview.html">Operations for Applications permissions</a>.
        </td>
        </tr>
        <tr>
        <td><strong>Service Roles</strong>
        </td>
        <td>Required for service access. Assign the <a href="csp_users_roles.html#operations-for-applications-service-roles-built-in">Operations for Applications service roles</a> that correspond to the permissions of the service account that you want to replace.
        <p>If you already assigned a custom role, you must assign at least the <strong>Viewer</strong> Operations for Applications service role.</p>
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

## What Happens with the Operations for Applications API Tokens?

During the process of onboarding your Operations for Applications service to VMware Cloud services, the Operations for Applications API tokens **are not** migrated to VMware Cloud services.

Operations for Applications on VMware Cloud services supports authentication with:

* VMware Cloud services API tokens associated with user accounts.
* Server to server OAuth apps credentials, that is, app ID and app secret. The server to server OAuth app must belong to the organization that is running the Operations for Applications service.

You must exchange a VMware Cloud services API token or the credentials (ID and secret) of server to server OAuth app for a VMware Cloud services **access token**.

You should incrementally replace your Operations for Applications API tokens with VMware Cloud services API tokens and server to server OAuth apps.

For backward compatibility, all of your API tokens are **preserved** in Operations for Applications.

* The Operations for Applications API tokens associated with user accounts are **no longer**  editable. The users can still use, view, and revoke their Operations for Applications API tokens until they expire, but they **cannot** generate new ones.
* The Operations for Applications API tokens associated with service accounts are editable, because we still support them for the proxy setup of a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens).

{% include tip.html content="From now on, all users must generate VMware Cloud services API tokens for their accounts and exchange them for access tokens. Users with the VMware Cloud **Organization Owner**, **Organization Administrator**, or **Organization Member** with **Developer** roles can create server to server OAuth apps and exchange the app credentials for access tokens."%}

### How to View and Manage the Operations for Applications API Tokens?

Users with the **Admin** Operations for Applications service role can [manage](csp_api_tokens.html#managing-the-operations-for-applications-api-tokens-in-your-service-instance) the Operations for Applications API tokens in the service instance.

Each user can view and revoke their own Operations for Applications API tokens:

1. Log in to your service instance.
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select your username.
1. Click the **API Access** tab and view all your Operations for Applications API tokens.
1. To revoke a token, click the **Revoke** button for the token.

    If you run a script that uses a revoked token, the script returns an authorization error.

### How to Replace an Operations for Applications API Token with a VMware Cloud Services Access Token?

It's recommended to use Operations for Applications API tokens only for a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens). We will update these integrations to authenticate with VMware Cloud services access tokens in a future release.

<table style="width: 100%;">
<tbody>
<tr>
<td markdown="span">
<br /><br /><br /><br />

You should incrementally replace your Operations for Applications API tokens with the more secure VMware Cloud services access tokens.
<br /><br />
To replace an Operations for Applications API token associated with a service account, you must replace the service account with a server to server OAuth app. See [How to Replace a Service Account with a Server to Server App?](csp_migration.html#how-to-replace-a-service-account-with-a-server-to-server-app).
<br /><br />
The flowchart on the right shows the overall process for replacing an Operations for Applications API token with a VMware Cloud services API token.
</td>
<td>
<img src="/images/csp-replace-api-token.png" alt="Flowchart showing how to replace an Operations for Applications API token with a VMware Cloud services API token. The process is described in the list below"/>
</td>
</tr>
</tbody>
</table>


To replace an Operations for Applications API token associated with your user account:

1. Log in to the VMware Cloud Services Console.
1. Generate an API token. See [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html) in the VMware Cloud services documentation.

    - For the name of the VMware Cloud services API token, you can enter the name of the Operations for Applications API taken that you want to replace.
    - For the time to live (TTL) of the VMware Cloud services API token, you can configure a value from several minutes to several months, or never expire. This value defines the period in which the API token should be renewed.
    
        The TTL of the access tokens that will be issued to that API token is 30 minutes and is not configurable.
    - For the scopes of the API token, you must configure the minimum portion of your roles:

        {% include note.html content="Till now, the Operations for Applications API tokens inherited all your permissions and roles. Now, you can set the VMware Cloud services API token with a subset of the roles that you own."%}

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
        <p>If you already assigned a custom role, you must assign at least the <strong>Viewer</strong> Operations for Applications service role.</p>
        </td>
        </tr>
        </tbody>
        </table>
1. Reconfigure your scripts, API calls, or proxies to exchange the newly generated VMware Cloud services API token for an access token, instead of using the Operations for Applications API token.

    {% include important.html content="The TTL of the access tokens associated with user accounts is 30 minutes. Make sure that your script renews the access token periodically before it expires. The Wavefront proxy does this automatically. "%}
1. [Revoke](csp_migration.html#how-to-view-and-manage-the-operations-for-applications-tokens) the Operations for Applications API token that you replaced.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## What Happens with the Wavefront Proxies?

During the process of onboarding your Operations for Applications service to VMware Cloud services, all of the existing Wavefront proxies are **preserved** with their existing Operations for Applications API tokens.

You should incrementally [replace](csp_migration.html#how-to-replace-the-operations-for-application-api-token-of-a-wavefront-proxy) the tokens of your proxies to authenticate with the more secure VMware Cloud services access tokens. See [How to Replace an Operations for Applications API Token with a VMware Cloud Services Access Token?](csp_migration.html#how-to-replace-an-operations-for-applications-api-token-with-a-vmware-cloud-services-access-token).

{% include tip.html content="From now on, the users with the **Proxies** service role can create and manage the proxies in your Operations for Applications service. New proxies must authenticate with VMware Cloud services access tokens unless used for the [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens) that still authenticate with Operations for Applications API tokens."%}

### How to Replace the Operations for Application API Token of a Wavefront Proxy?

1. Obtain OAuth app credentials (recommended) or a VMware Cloud services API token:

    - Create a server to server app with the **Proxies** service role and save its OAuth credentials (app ID and app secret). See [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.
    
        Also, obtain the long ID of the VMware Cloud organization. See [View the Organization ID](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-CF9E9318-B811-48CF-8499-9419997DC1F8.html#view-the-organization-id-1) in the VMware Cloud services documentation.
    - Generate a VMware Cloud services API token with the **Proxies** service role. See [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html) in the VMware Cloud services documentation.
1. Edit the configuration file of your proxy, that is, `/etc/wavefront/wavefront-proxy/wavefront.conf`, with the OAuth app credentials or your VMware Cloud services API token:

    - Replace the `token` parameter and the `cspAppId`, `cspAppSecret`, and `cspOrgId` parameters:

        ```
        cspAppId=<OAuth_app_id>
        cspAppSecret=<OAuth_app_secret>
        cspOrgId=<Org_long_ID>
        ```
    - Replace the `token` parameter and the `cspAPIToken` parameter:

        ```
        cspAPIToken=<VMware_Cloud_services_API_token>
        ```
        
<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## What Happens with the Integrations?

During the process of onboarding your Operations for Applications service to VMware Cloud services, all of the existing integrations are **preserved** and continue to operate using proxy authentication with Operations for Applications API tokens.

You should incrementally [replace](csp_migration.html#how-to-replace-the-operations-for-application-api-token-of-a-wavefront-proxy) the proxy tokens of your [integrations](integrations_onboarded_subscriptions.html#integrations-that-use-vmware-cloud-services-access-tokens) that are updated to use proxy authentication with the more secure VMware Cloud services access token.

{% include tip.html content="From now on, the users with the **Proxies** and **Integrations** service roles can set up integrations in your Operations for Applications service. New integrations must use proxy authentication with VMware Cloud services access tokens except for the [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-operations-for-applications-api-tokens) that still authenticate with Operations for Applications API tokens."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="csp_migration.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>