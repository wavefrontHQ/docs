---
title: Manage API Tokens and Access Tokens
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: csp_api_tokens.html
summary: Learn how you can generate and manage API tokens in VMware Aria Operations for Applications (previously known as Tanzu Observability by Wavefront).
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for VMware Cloud services subscriptions. For **original** subscriptions, see [Manage API Tokens](api_tokens.html)."%}

Invoking the [Operations for Applications REST API](wavefront_api.html), using `curl` or an API client, requires a **VMware Cloud services access token**. In a few cases, when setting up a proxy for a [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-supported-with-service-accounts), authentication with an **Operations for Applications API token** is also supported.

To obtain a VMware Cloud services token, you can use the VMware Cloud services REST API to exchange it from:
* A VMware Cloud services API token associated with your user account.
* The credentials of a server to server OAuth app associated with the VMware Cloud organization running the service.

To obtain an Operations for Applications API token, you can create a service account and generate an API token associated with it.

{% include note.html content="If you migrated from an original Operations for Applications subscription, for backward compatibility, you might have some legacy Operations for Applications API tokens that are associated with user accounts and service accounts. It’s recommended that you gradually switch to authentication with the more secure VMware Cloud services access tokens."%}

## Managing the VMware Cloud Services API Tokens for Your User Account

If you want to make REST API calls on your own behalf, you must generate a VMware Cloud services API token associated with your user account and exchange it for an access token. See [Make API Calls by Using a User Account](using_wavefront_api.html#make-api-calls-by-using-a-user-account).

You can generate VMware Cloud services API tokens only for your user account. You must assign each API token with the minimum required subset of the roles that you own. The access tokens associated with an API token inherit its roles. These roles include:
* At least one organization role.
* At least one Operations for Applications service role.
* Optionally, one or more custom roles.

You must also set each API token with a time to live (TTL), which is the time that the API token will be valid unless revoked. When an API token expires, its associated access token also expires. You must generate a new API token and update your API calls.

For details on how to generate, regenerate, revoke, and secure your API tokens, see [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html) in the VMware Cloud services documentation.

## Managing the VMware Cloud Services API Tokens in Your VMware Cloud Organization

If your domain is federated and the Identity Governance and Administration (IGA) is activated, the users with the VMware Cloud **Organization Owner** role have access to advanced features, including managing the API tokens within the organization. For details, see [What is Identity Governance and Administration and how does it work with VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E6661280-A88A-4E26-9008-4C1620641FA1.html) in the VMware Cloud services documentation.

The users with the VMware Cloud **Organization Owner** role can:
* View the details of all API tokens created in the organization.
* Deactivate API tokens.
* Set constraints for idle and maximum TTL for all newly created API tokens.
For details and instructions, see [How do I manage API tokens in my Organization](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-3A9C29E0-460B-4586-B51A-084443A960D0.html) in the VMware Cloud services documentation.

## Managing the Server to Server OAuth Apps in Your VMware Cloud Organization

If you want to make REST API calls on behalf of your VMware Cloud organization, you must create a server to server OAuth app and exchange its credentials for an access token. See [Make API Calls by Using a Server to Server App](using_wavefront_api.html#make-api-calls-by-using-a-server-to-server-app).

To create and manage server to server OAuth apps in your VMware Cloud organization, you must hold the **Organization Owner**, **Organization Administrator**, or **Organization Member** with **Developer** roles.

You must assign each server to server app only with the minimum required roles for its tasks and add it to your VMware Cloud organization. The access tokens associated with a server to server app inherit its roles within the organizations it belongs. These roles include:
* At least one organization role.
* At least one Operations for Applications service role.
* Optionally, one or more custom roles.

You must also set each server to server app with a time to live (TTL), which is the time that its access tokens will be valid. The credentials of a sever to server app never expire, so your script can automatically exchange them for new access tokens. Only if you regenerate the app secret, you must update your API calls.

For details on how to create, view, and modify the details of the OAuth 2.0 apps in your organization, see [How to manage OAuth 2.0 apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-229F9BCE-0C1F-4948-8792-23F51B5482BE.html) in the VMware Cloud services documentation.

## Managing the Operations for Applications API Tokens for a Service Account

If you want to set up a proxy for an integration  [limited list of integrations](integrations_onboarded_subscriptions.html#integrations-supported-with-service-accounts), authentication with an **Operations for Applications API token** is also supported.


## Managing the Operations for Applications API Tokens in Your Service Instance








An API token is a string of hexadecimal characters and dashes. For example:

```
a411c16b-3cf7-4f03-bf11-8ca05aab898d
```
Operations for Applications allows [user accounts](user-accounts.html) and [service accounts](service-accounts.html) to use the [REST API](wavefront_api.html).

{% include tip.html content="You generate API tokens for your user account explicitly. For service accounts, a user with the **Accounts** permission can generate tokens from the **Service Accounts** page." %}

## Generate and Manage the API Tokens for Your User Account

{% include note.html content="All users can use and manage their existing API tokens. You must have the [**API Tokens** permission](permissions_overview.html) to generate new API tokens for your user account." %}


1. Log in to your service instance (`https://<your_instance>.wavefront.com`) as user with the **API Tokens** permission.
2. Click the gear icon <i class="fa fa-cog"/>  at the top right of the toolbar and select your user name.
2. On the **API Access** tab, click **Generate**.

    You can have up to 20 tokens at any given time. If you want to generate a new token but already have 20 tokens, then you must revoke one of the existing tokens.
3. To revoke a token, click the **Revoke** button for the token.

    If you run a script that uses a revoked token, the script returns an authorization error.
4. To add a name or rename an API token, click the **Edit** icon for the token, enter the name, and press Enter.

![Generate API Token](/images/generate_token.png)


{% include warning.html content="Do not share your API token with anyone. The token provides full access to the API. Accounts that have the token can authenticate without a username/password."%}

## Generate and Manage the API Tokens for a Service Account

As a user with the **Accounts** permission, you can generate API tokens for [service accounts](service-accounts.html) upon creation or at a later stage. To generate an API token for an existing **service account**:

1. Log in to your service instance (`https://<your_instance>.wavefront.com`) as a user with the **Accounts** permission.
2. Click the gear icon <i class="fa fa-cog"/> at the top right of the toolbar and select **Accounts**.
3. On the **Service Accounts** tab, click the ellipsis icon next to the service account for which you want to generate an API token, and select **Edit**.
4. To generate a new token, in the Tokens section, click **Generate**.

    You can have up to 20 tokens per service account at any given time. If you want to generate a new token but already have 20 tokens, then you must revoke one of the existing tokens.
5. To revoke a token, click the **Revoke** button for the token.

    Revoking a token cannot be undone.
5. To rename an API token, click the **Edit** icon for the token, enter the name, and press Enter.
6. Select the appropriate permissions for the service account and click **Update**.

## View and Manage the API Tokens in Your Organization

As a user with the **Accounts** permission, you can view and revoke the API token of any user or service account in your organization.

1. Log in to your product instance as a user with the **Accounts** permission.
2. Click the gear icon <i class="fa fa-cog"/>  at the top right of the toolbar and select **Accounts**.
3. Click the **API Tokens** tab.

  You see the API tokens for all user and service accounts in a paginated table format.

![The API Tokens page shows the tokens table, the search field above the table, and the preconfigured filters and the saved searches in the left panel](/images/API_tokens.png)

{% include important.html content="Revoking a token cannot be undone. Any script that uses a revoked token returns an authorization error." %}

On the API Tokens page, you can:
- Sort the API tokens table by column.
- Search and, optionally, save and share your search.
- Filter the API tokens by account type, usage, particular accounts, or your saved search.
- Revoke an API token from the vertical ellipsis icon for the token.