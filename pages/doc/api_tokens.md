---
title: Manage API Tokens
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: api_tokens.html
summary: Learn how you can generate and manage Tanzu Observability API tokens.
---

{% include note.html content="Starting July 3, 2023, VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) is a service on the VMware Cloud services platform. The content in this chapter is valid for **original** subscriptions. For VMware Cloud services subscriptions, see [Manage Tokens](csp_api_tokens.html)."%}

Before you can invoke the [REST API](wavefront_api.html) using `curl` or from an API client, you must have an API token. An API token is a string of hexadecimal characters and dashes. For example:

```
a411c16b-3cf7-4f03-bf11-8ca05aab898d
```
Tanzu Observability allows [user accounts](user-accounts.html) and [service accounts](service-accounts.html) to use the [REST API](wavefront_api.html).

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