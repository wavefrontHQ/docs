---
title: Onboarding Original Subscriptions to VMware Cloud Services
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_migration.html
summary: Learn.
---

Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. We are in the progress of incrementally onboarding all original subscriptions to VMware Cloud services.

## What Should I Do Before the Onboarding?

Currently, all original Operations for Applications subscriptions are integrated with VMware Cloud services for billing and subscription management. Therefore, you already have a [VMware Cloud organization](csp_getting_started.html#whats-a-vmware-cloud-organization) with at least one user with the [VMware Cloud **Organization Owner** role](csp_getting_started.html#whats-a-vmware-cloud-organization-role).

* Verify that your VMware Cloud **Organization Owner** user can log in to the [VMware Cloud Services Console](https://console.cloud.vmware.com).

    - If you are the VMware Cloud **Organization Owner** user and cannot log in, try using the **Forgot Password** option.
    - If your VMware Cloud **Organization Owner** user is unreachable or you don't know the name of your VMware Cloud **Organization Owner** user, contact our Technical Support team for assistance.
* If you have a [SAML SSO integration](auth_self_service_sso.html), as a VMware Cloud **Organization Owner** user, you must federate your currently integrated enterprise domain with your VMware Cloud organization. For details, see the [Setting Up Enterprise Federation with VMware Cloud Services Guide](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html) in the VMware Cloud services documentation.

    {% include warning.html content="If you do not federate your currently integrated enterprise domain, after onboarding to VMware Cloud service all users will lose access to the service."%}

## What's the Onboarding Process?

The onboarding is done by our team. You only need to federate your enterprise domain if you are currently using a SAML SSO integration. Here's the process:
1. You receive a notification in your service UI with the date scheduled for your service onboarding to VMware Cloud services.
1. If you are using a SAML SSO integration, your VMware Cloud **Organization Owner** user federates your currently integrated enterprise domain with your VMware Cloud organization. That must happen before the scheduled onboarding date.
1. On the scheduled date, we onboard your service instance to VMware Cloud services, that is, we migrate your users, roles, and groups to your VMware Cloud organization. During the process, there'a a banner notification in you service UI.

    {% include important.html content="During the onboarding, it's not recommended to do any changes related to users, roles, groups, and permissions. Such changes might be lost."%}
1. When the onboarding completes, you receive a notification in your service UI and all active users are logged out.
1. Each user receives an email with an invitation link to sign up to VMware Cloud services.

    {% include note.html content="The invitation links are valid for seven days."%}
1. Each user redeems the invitation link and [signs up](csp_sign_up_or_log_in.html#sign-up-with-an-email-invitation) to the VMware Cloud Services Console.

    {% include note.html content="The users of a non-federated domain must create a password for their VMware Cloud services account. The users of a federated domain must log in with their existing corporate passwords."%}
1. From now on, users [launch](csp_sign_up_or_log_in.html#log-in-from-the-vmware-cloud-services-console) the service instance from the [VMware Cloud Services Console](https://console.cloud.vmware.com).

## How the Users are Migrated to VMware Cloud Services?

During the process of onboarding your Operations for Applications service to VMware Cloud services, we add all your current users to your VMware Cloud organization running the service.

* If a user is assigned with individual permissions in Operations for Applications, we assign that user with the corresponding [Operations for Applications service roles](csp_users_roles.html#operations-for-applications-service-roles-built-in) in VMware Cloud services. For example, if a user has the **Alerts** permission in Operations for Applications, we assign that user with the **Alerts** Operations for Applications service role in VMware Cloud services. There are the following exceptions:

    - The **Accounts** permission is replaced with the [VMware Cloud **Organization Administrator** role](csp_getting_started.html#whats-a-vmware-cloud-organization-role) plus the **Admin** Operations for Applications service role.
    - The **API Tokens** permission is not replaced with any role, because this privilege is not needed in VMware Cloud services. Each VMware Cloud services user can manage their own VMware Cloud services API tokens.
    - The **SAML IdP Admin** permission is not replaced with any role, because this privilege is not needed in VMware Cloud services. The VMware Cloud **Organization Owner** initiates enterprise federation for your corporate domain and assigns an **Enterprise Administrator**.
    
* If a user is a **Super Admin** in Operations for Applications, we assign that user with the **Super Admin** Operations for Applications service role in VMware Cloud services.
* If a user is assigned with roles in Operations for Applications, we assign that user with the corresponding custom roles in VMware Cloud services. See [How the Roles are Migrated to VMware Cloud Services?](csp_migration.html#how-the-roles-are-migrated-to-vmware-cloud-services).
* If a user belongs to a group in Operations for Applications, we add that user to the corresponding group in VMware Cloud services. See [How the Groups are Migrated to VMware Cloud Services?](csp_migration.html#how-the-groups-are-migrated-to-vmware-cloud-services).

## How the Groups are Migrated to VMware Cloud Services?

Originally, your Operation for Applications service includes the **Everyone** and **Service Accounts** system groups as well as any other custom group that you have created.

### How the Custom Groups are Migrated?

During the process of onboarding your Operations for Applications service to VMware Cloud services, for each group that you have created in Operations for Applications, we create a corresponding [group](csp_users_roles.html#manage-user-groups) in your VMware Cloud organization running the service.

* The corresponding VMware Cloud groups are with the same names and descriptions as the original Operations for Applications custom groups.
* All users from a custom group in Operations for Applications are added to the corresponding VMware Cloud group.
* The service accounts from the custom groups in Operations for Applications **are not** added to any VMware Cloud group.

    {% include important.html content="Currently, VMware Cloud services supports grouping only for user accounts."%}
* If a custom group in Operations for Applications is a assigned with roles, the corresponding VMware Cloud group is assigned with the corresponding VMware Cloud custom roles. See [How the Roles are Migrated to VMware Cloud Services?](csp_migration.html#how-the-roles-are-migrated-to-vmware-cloud-services).

### How the Everyone System Group Is Migrated?

During the process of onboarding your Operations for Applications service to VMware Cloud services, for the **Everyone** system group in Operations for Applications, we create the corresponding **All Operations for Applications Users** group in your VMware Cloud organization running the service as follows:

* All current users are added to the **All Operations for Applications Users** VMware Cloud group but new users will **no longer** be added automatically.

    {% include important.html content="It is up to you to add new users to this group."%}
* The **All Operations for Applications Users** VMware Cloud group is assigned with the **All Operations for Applications Users** VMware Cloud custom role, which corresponds to the **Everyone** role in Operations for Applications. See [How the Roles are Migrated to VMware Cloud Services?](csp_migration.html#how-the-roles-are-migrated-to-vmware-cloud-services).
* If the **Everyone** system group in Operations for Applications is a assigned with custom roles, the **All Operations for Applications Users** VMware Cloud group is assigned with the corresponding VMware Cloud custom roles. See [How the Roles are Migrated to VMware Cloud Services?](csp_migration.html#how-the-roles-are-migrated-to-vmware-cloud-services).
* In Operations for Applications, we continue to maintain the **Everyone** system group as a local **internal** group that is automatically populated with all new users. This group has no roles and permissions. This group can be used when managing [access to dashboards and alerts](csp_access.html), [metrics security policy rules](csp_metrics_security.html), and [ingestion policies](ingestion_policies.html).

### What Happens with Service Accounts System Group?

During the process of onboarding your Operations for Applications service to VMware Cloud services, we **do not** migrate the **Service Accounts** system group.

{% include important.html content="Currently, VMware Cloud services supports grouping only for user accounts."%}

* The permissions from the roles assigned to the **Service Accounts** system group in Operations for Applications are now directly assigned to the service accounts. See [What Happens with the Service Accounts?](csp_migration.html#what-happens-with-the-service-accounts).
* In Operations for Applications, we continue to maintain the **Service Accounts** system group as a local **internal** group that is automatically populated with all service accounts and server to server OAth apps that have access to the service instance. This group has no roles and permissions. This group can be used when managing [access to dashboards and alerts](csp_access.html), [metrics security policy rules](csp_metrics_security.html), and [ingestion policies](ingestion_policies.html).

## How the Roles are Migrated to VMware Cloud Services?

During the process of onboarding your Operations for Applications service to VMware Cloud services, for each role in Operations for Applications, we create a corresponding [custom role](csp_users_roles.html#create-edit-or-delete-a-custom-role) in your VMware Cloud organization running the service as follows:

* For each role that you have created in Operations for Applications, we create a corresponding VMware Cloud custom role with the same name and description.
* For the **Everyone** role that is assigned to the **Everyone** system group in Operations for Applications, we create the **All Operations for Applications Users** VMware Cloud custom role. See [How the Everyone System Group Is Migrated?](csp_migration.html#how-the-everyone-system-group-is-migrated).
* For the **Service Accounts** role that is assigned to the **Service Accounts** system group in Operations for Applications, we **do not** create any VMware Cloud custom role, because this group is not migrated. See [What Happens with Service Accounts System Group?](csp_migration.html#what-happens-with-service-accounts-system-group).
* The corresponding VMware Cloud custom roles are assigned with the same [permissions](csp_permissions_overview.html) as the original roles in Operations for Applications. There are the following exceptions:

    - The **Accounts** permission in Operations for Applications is replaced with the **Admin** Operations for Applications permission in VMware Cloud services. In addition, the users with that are role are assigned with the [VMware Cloud **Organization Administrator** role](csp_getting_started.html#whats-a-vmware-cloud-organization-role).
    - The **API Tokens** permission in Operations for Applications **is not** replaced with any permission in VMware Cloud services. This permission does not exist in VMware Cloud services, because each user can manage their own VMware Cloud services API tokens.
    - The **SAML IdP Admin** permission in Operations for Applications **is not** replaced with any permission in VMware Cloud services. This permission does not exist in VMware Cloud services, because the VMware Cloud **Organization Owner** initiates enterprise federation for your corporate domain and assigns an **Enterprise Administrator**.

## What Happens with the Service Accounts?

During the process of onboarding your Operations for Applications service to VMware Cloud services, the service accounts **are not** migrated to VMware Cloud services. VMware Cloud services supports [server to server OAuth apps](csp_server_to_server_apps.html), which are equivalent to the services accounts in Operations for Applications. You should incrementally replace your service accounts in Operations for Applications with server to server OAuth apps in VMware Cloud services.

For backward compatibility, all of your service accounts are **preserved** in Operations for Applications as follows:

* The service accounts no longer belong to groups, because groups management is migrated to VMware Cloud services.
* The service accounts no longer have roles, because the roles management is migrated to VMware Cloud services.
* The service accounts are assigned with their existing permissions, including the permissions that they have inherited from roles and group roles. Exceptions are the **API Tokens** and **SAML IdP Admin** permissions, which no longer exist.

    {% include note.html content="The **Accounts** permission in Operations for Applications corresponds to the [**Admin** Operations for Applications permission](csp_permissions_overview.html) in VMware Cloud services."%}
* All service accounts still belong to the **Service Accounts** system group, which is now an **internal** Operations for Applications group that is automatically populated with all service accounts and server to server OAth apps that have access to the service instance. This group has no roles and permissions. This group can be used when managing [access to dashboards and alerts](csp_access.html), [metrics security policy rules](csp_metrics_security.html), and [ingestion policies](ingestion_policies.html).

### How to Replace a Service Account with a Server to Server App

Service accounts authenticate with Operations for Applications API tokens, while server to server OAuth apps authenticate with the more secure VMware Cloud services access tokens. Service accounts are supported for a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-supported-with-service-accounts) but eventually, will be deprecated. After onboarding to VMware Cloud services, you should incrementally replace your service accounts in Operations for Applications with server to server OAuth apps in VMware Cloud services.

1. Log in to the VMware Cloud Services Console as an **Organization Owner**, **Organization Administrator**, or **Organization Member** with the **Developer** role.
1. Create a server to server OAuth app. See [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.

    1. Enter the name and the description of the service account that you want to replace.
    1. Enter the time to live (TTL) for the access tokens that will be issued to that server to server app.
    1. Define the scopes:

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
        <td>Optional. Use only if you previously created a custom role with the necessary Operations for Applications permissions.
        </td>
        </tr>
        <tr>
        <td><strong>Service Roles</strong>
        </td>
        <td>Required for service access. Assign the Operations for Applications service roles that correspond to the permissions of the original service account.
        <p>If you already assigned a custom role, you must assign at least the Viewer Operations for Applications service role.</p>
        </td>
        </tr>
        </tbody>
        </table>
1. Copy the app credentials (ID and secret) of your newly created server to server app and save them to a secure location.

    {% include important.html content="This is the only time you can see and copy the app secret. If you miss to copy it or lose it, you must regenerate the app secret."%}
1. Reconfigure your scripts, API calls, or proxies to exchange the app credentials for an access token, instead of using the API tokens associated with the service account.

    {% include important.html content="Depending on the TTL that you configured for the app access tokens, make sure that your script renews the access token periodically before it expires. The proxy does this automatically. "%}
1. [Deactivate](csp_service_accounts.html#deactivate-or-activate-a-service-account) and later delete the service account. See 

## What Happens with the API Tokens?

During the process of onboarding your Operations for Applications service to VMware Cloud services, the API tokens **are not** migrated to VMware Cloud services, because you should incrementally switch from using Operations for Applications API tokens to using VMware Cloud services access tokens.

For backward compatibility, all of your API tokens are **preserved** in Operations for Applications as follows:

* The Operations for Applications API tokens associated with user accounts are **no longer**  editable. Users are able only to view and revoke their Operations for Applications API tokens.

    From now on, the users must generate VMware Cloud services API tokens for their accounts and exchange them for access tokens.
* The Operations for Applications API tokens associated with service accounts are editable, because we still support them for the proxy setup of a limited list of integrations.

    From now on, you should create server to server OAuth apps in VMware Cloud services and exchange the app credentials for access tokens.

## What Happens with the Proxies?

During the process of onboarding your Operations for Applications service to VMware Cloud services, all of the existing proxies are **preserved** with their existing Operations for Applications API tokens. You should incrementally reinstall your proxies to authenticate with the more secure VMware Cloud services access tokens.

{% include important.html content="A certain list of integrations still require proxy authentication with an Operations for Applications API token."%}

## What Happens with the Integrations?

During the process of onboarding your Operations for Applications service to VMware Cloud services, all of the existing integrations are **preserved** and continue to operate using proxy authentication with Operations for Applications API tokens. You should incrementally reinstall your integrations to use proxy authentication with the more secure VMware Cloud services access tokens.

{% include important.html content="A certain list of integrations still require proxy authentication with an Operations for Applications API token."%}