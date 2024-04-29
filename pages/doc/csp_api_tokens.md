---
title: Manage Tokens for Tanzu Observability on VMware Cloud Services
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: csp_api_tokens.html
summary: Learn how you can generate and manage API tokens and access tokens.
---

{% include note.html content="Starting July 3, 2023, VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) is a service on the VMware Cloud services platform. The content in this chapter is valid for VMware Cloud services subscriptions. For **original** subscriptions, see [Manage API Tokens](api_tokens.html)."%}

Invoking the [Tanzu Observability REST API](wavefront_api.html), using `curl` or an API client, requires a **VMware Cloud services access token**. In a few cases, when setting up a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-tanzu-observability-api-tokens), authentication with an **Tanzu Observability API token** is also supported.

To obtain a VMware Cloud services access token, you must make an API call to the VMware Cloud services REST API and exchange it from:
* A VMware Cloud services API token associated with your user account.
* The credentials of a server to server OAuth app associated with the VMware Cloud organization running the service.

To obtain a Tanzu Observability API token, you can also create a service account and generate an API token associated with it.

{% include note.html content="If your original Tanzu Observability subscription was recently [onboarded to VMware Cloud services](csp_migration.html), for backward compatibility, you might have some legacy Tanzu Observability API tokens that are associated with user accounts and service accounts. It’s recommended that you incrementally replace them with VMware Cloud services API tokens and sever to server OAuth apps."%}

## Manage the VMware Cloud Services API Tokens for Your User Account

If you want to make REST API calls on your own behalf, you must generate a VMware Cloud services API token associated with your user account and exchange it for an access token. See [Make API Calls by Using a User Account](using_wavefront_api.html#make-api-calls-by-using-a-user-account).

You can generate VMware Cloud services API tokens only for your user account. You must assign each API token with the minimum required subset of the roles that you own. The access tokens associated with an API token inherit its roles. These roles include:
* At least one organization role.
* At least one Tanzu Observability service role.
* Optionally, one or more custom roles.

You must also set each API token with a time to live (TTL), which is the time that the API token will be valid unless revoked earlier. Before an API token expires, you must generate a new API token and update your scripts and API calls.

{% include important.html content="The access token exchanged from a VMware Cloud services API token has a TTL of 30 minutes. Make sure that your scripts periodically renew the access tokens before they expire."%}

For details on how to generate, regenerate, revoke, and secure your API tokens, see [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html) in the VMware Cloud services documentation.

{% include warning.html content="Do not share your API token with anyone. Accounts that have the token can authenticate without a username/password."%}

## Manage the VMware Cloud Services API Tokens in Your VMware Cloud Organization

If your domain is federated and the Identity Governance and Administration (IGA) is activated, the users with the VMware Cloud **Organization Owner** role have access to advanced features, including managing the API tokens within the VMware Cloud organization. For details, see [What is Identity Governance and Administration and how does it work with VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E6661280-A88A-4E26-9008-4C1620641FA1.html) in the VMware Cloud services documentation.

The users with the VMware Cloud **Organization Owner** role can:
* View the details of all API tokens created in the organization.
* Deactivate API tokens.
* Set constraints for idle and maximum TTL for all newly created API tokens.

For details and instructions, see [How do I manage API tokens in my Organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-3A9C29E0-460B-4586-B51A-084443A960D0.html) in the VMware Cloud services documentation.

## Manage the Server to Server OAuth Apps in Your VMware Cloud Organization

If you want to make REST API calls on behalf of your VMware Cloud organization, you must create a server to server OAuth app and exchange its credentials (ID and secret) for an access token. See [Make API Calls by Using a Server to Server App](using_wavefront_api.html#make-api-calls-by-using-a-server-to-server-app).

To create and manage server to server OAuth apps in your VMware Cloud organization, you must hold the **Organization Owner**, **Organization Administrator**, or **Organization Member** with **Developer** roles.

You must assign each server to server app only with the minimum required roles for its tasks and add it to your VMware Cloud organization. The access tokens associated with a server to server app inherit its roles within the organizations it belongs. These roles include:
* At least one organization role.
* At least one Tanzu Observability service role.
* Optionally, one or more custom roles.

You must also set each server to server app with a time to live (TTL), which is the time that the access tokens associated with the app will be valid. The credentials of a sever to server app never expire, so that your script can periodically exchange them for new access tokens. Only if you regenerate the app secret, you must update your scripts and API calls.

For details on how to create, view, and modify the details of the OAuth 2.0 apps in your organization, see [How to manage OAuth 2.0 apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-229F9BCE-0C1F-4948-8792-23F51B5482BE.html) in the VMware Cloud services documentation.

## Manage the Tanzu Observability API Tokens for a Service Account

If you want to set up one of the [integrations](integrations_onboarded_subscriptions.html#integrations-that-use-tanzu-observability-api-tokens) that still authenticate with an **Tanzu Observability API token**, you must create a [service account](csp_service_accounts.html) and generate an API token associated with it.

{% include warning.html content="The usage of service accounts in Tanzu Observability on VMware Cloud services is **restricted** to support only a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-that-use-tanzu-observability-api-tokens) that still authenticate with Tanzu Observability API tokens. We are in the process of updating all of our integrations to authenticate with VMware Cloud services access tokens. It is strongly recommended that you gradually [switch to using server to server OAuth apps](csp_migration.html#how-to-replace-a-service-account-with-a-server-to-server-app) which authenticate with more secure VMware Cloud services access tokens. Service accounts and Tanzu Observability API tokens will be deprecated in the future. "%}

<!--Bring this back to the warning if we get the flag: Тo temporarily enable service accounts for your service instance, [contact](wavefront_support_feedback.html) our Technical Support team.-->

As a user with the **Admin** service role, you can generate and manage the API tokens for [service accounts](csp_service_accounts.html) upon creation or at a later stage. 

To generate and manage the API tokens for an existing **service account**:

1. Log in to your service instance as an **Admin** user.
2. Click the gear icon <i class="fa fa-cog"/> on the toolbar and select **Accounts**.
3. On the **Service Accounts** tab, click the ellipsis icon next to the service account, and select **Edit**.
   1. To generate a new token, in the **Tokens** section, click **Generate**.

      You can have up to 20 tokens per service account at any given time. If you want to generate a new token but already have 20 tokens, you must revoke one of the existing tokens.
   2. To revoke a token, click the **Revoke** button for the token.

      Revoking a token cannot be undone.
   3. To rename an API token, click the **Edit** icon for the token, enter the name, and press Enter.
6. Select the appropriate permissions for the service account and click **Update**.



## Manage the Tanzu Observability API Tokens in Your Service Instance

As a user with the **Admin** service role, you can view and revoke the API tokens of any service account in your service instance.

{% include warning.html content="If your original Tanzu Observability subscription was onboarded to VMware Cloud services, for backward compatibility, you might have some legacy Tanzu Observability API tokens that are associated with user accounts. It’s recommended that you incrementally [replace them with VMware Cloud services API tokens](csp_migration.html#how-to-replace-a-tanzu-observability-api-token-with-a-vmware-cloud-services-access-token)."%}

1. Log in to your service instance as an **Admin** user.
2. Click the gear icon <i class="fa fa-cog"/> on the toolbar and select **Accounts**.
3. Click the **API Tokens** tab.

  You see the API tokens for all service accounts in a paginated table format.

![The API Tokens page shows the tokens table, the search field above the table, and the preconfigured filters and the saved searches in the left panel](/images/csp_API_tokens.png)

{% include important.html content="Revoking a token cannot be undone. Any script that uses a revoked token returns an authorization error." %}

On the API Tokens page, you can:
- Sort the API tokens table by column.
- Search and, optionally, save and share your search.
- Filter the API tokens by usage, particular accounts, or your saved search.
- Revoke an API token from the vertical ellipsis icon for the token.