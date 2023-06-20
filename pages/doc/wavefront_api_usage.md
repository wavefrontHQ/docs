---
title: Use the Operations for Applications REST API
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: using_wavefront_api.html
summary: Learn how to use the REST API outside of the in-product API documentation UI.
---

The [REST API](wavefront_api.html) enables you to interact with the VMware Aria Operations for Applications service (formerly known as Tanzu Observability by Wavefront) by using standard REST API tools. You can use the REST API to automate commonly executed operations, for example, to tag sources automatically.

When you make REST API calls outside the REST API documentation UI, you must use a token to authenticate. The token that you need depends on your [subscription type](subscriptions-differences.html).

* For VMware Cloud services subscriptions, invoking the Operations for Application REST API requires a VMware Cloud services access token.

   - User accounts use VMware Cloud services API tokens to retrieve access tokens. See [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html) in the VMware Cloud services documentation.

   - Server to server apps, which correspond to service accounts in Operations for Applications, use OAuth 2.0 client credentials (ID and secret) to retrieve access tokens. See [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.

* For original subscriptions, invoking the Operations for Application REST API requires an Operations for Application API token. An API token can be associated with a user account or service account See [Manage API Tokens](api_tokens.html). 

{% include note.html content="If you want to use the `curl` examples from the REST API UI to run them remotely, you must replace the CSRF token with your token. You must use:  `-H 'Authorization: Bearer <your_token>` in your API calls."%}


## VMware Cloud Services Subscriptions

Invoking the REST API of an Operations for Applications subscription on VMware Cloud services requires a VMware Cloud services access token.

### Make API Calls by Using a User Account

If you want to use [your own user account](csp_users_account_managing.html) to make REST API calls, generate a VMware Cloud services API token associated with your user account and exchange it to an access token.

1. Log in to the VMware Cloud Services Console.
1. Click your username, select **My Account** and, on the **API Tokens** tab, [generate a new token](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html).
1. Copy and save the newly generated API token in a secure place.

   {% include note.html content="For security reasons once the API token is generated and you click **Continue**, only the token name is exposed in the UI. This means that you will no longer be able to reuse the token by copying the credentials from this page. If you lose the information about a token, you must either regenerate it or use a new one."%}

1. Exchange the newly generated API token for an access token.

   1. Go to the [Authentication VMware Cloud services APIs](https://console.cloud.vmware.com/csp/gateway/authn/api/swagger-ui.html#/Authentication/getAccessTokenByApiRefreshTokenUsingPOST).
   2. In the `POST/am/api/auth/api-tokens/authorize` request, click **Try it out**.
   3. For the **api_token** parameter, enter the value of the newly generated API token, and click **Execute**.
   4. From the response body, copy the value of the `"access_token"` parameter.

4. If you use `curl`, and want to get information about all cloud integrations in your environment, run:

    ```
   curl 'https://<your_instance>/api/v2/cloudintegration' -H 'Authorization: Bearer <your_user_access_token>'
    ```
   
   Here, `<your_instance>` is the name of your Operations for Applications service instance, and `<your_user_access_token>` is the access token for your user account.


### Make API Calls by Using a Server to Server App

If you want to use a [**server to server app**](csp_server_to_server_apps.html) to make the REST API calls, obtain the OAuth credentials (ID and secret) associated with the server to server app and exchange them to an access token.

1. Create a server to server app in VMware Cloud services.
1. Assign one or more roles to the server to server app to grant it the Operations for Applications access it needs.
1. Obtain the OAuth 2.0 client credentials of the server to server app and save them to a secure place.
1. Add the app to your VMware Cloud organization running the Operations for Applications service.
1. Exchange the OAuth 2.0 client credentials for an access token.

   1. Navigate to the [Authentication VMware Cloud services APIs](https://console.cloud.vmware.com/csp/gateway/authn/api/swagger-ui.html#/Authentication/getTokenForAuthorizationGrantTypeUsingPOST).
   1. In the `POST/am/api/auth/token` request, click **Try it out**.
   1. For the **username** parameter, enter the ID of the server to server app.
   1. For the **password** parameter, enter the secret of the server to server app.
   1. For the **grant_type** parameter, select **client_credentials**.
   1. Click **Execute**.
   1. From the response body, copy the value of the `"access_token"` parameter.

1. If you use `curl`, and want to get information about all cloud integrations in your environment, run:

      ```
      curl 'https://<your_instance>/api/v2/cloudintegration' -H 'Authorization: Bearer <server_app_access_api_token>'
      ```
      Here, `<your_instance>` is the name of your Operations for Applications service instance, and `<server_app_access_token>` is the access token for the server to server app.

  For more information, see [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.

## Original Subscriptions

Invoking the REST API of an original Operations for Applications subscription requires an Operations for Applications API token.

### Make API Calls by Using a User Account

If you want to use [your own user account](users_account_managing.html) to make REST API calls, use an API token associated with your user account:

1. Log in to your service instance (`https://<your_instance>.wavefront.com`).
2. Click the gear icon on the toolbar and click your user name.
3. On the **API Access** tab, click the **Copy** icon next to the API token that you want to use.
4. If you use `curl`, and want to get information about all cloud integrations in your environment, run:

    ```
   curl 'https://<your_instance>/api/v2/cloudintegration' -H 'Authorization: Bearer <your_api_token>'
    ```
   
   Here, `<your_instance>` is the name of your Operations for Applications service instance, and `<your_api_token>` is the API token for your user account.
  
### Make API Calls by Using a Service Account

If you want to use a [service account](service-accounts.html) to make REST API calls, use an API token associated with that service account.

{% include note.html content="To get the API token for a specific service account, you must have the **Accounts** permission. For information about permissions, see [Permissions Reference](permissions_overview.html)."%}

1. Log in to your service instance (`https://<your_instance>.wavefront.com`).
2. Click the gear icon on the toolbar and click **Accounts**.
3. On the **Service Accounts** tab, click the service account that you want to use.
4. Click the **Copy** icon next to the API token that you want to use.
5. If you use `curl`, and want to get information about all cloud integrations in your environment, run:
  
   ```
   curl 'https://<your_instance>/api/v2/cloudintegration' -H 'Authorization: Bearer <service_account_api_token>'
   ```
   
   Here, `<your_instance>` is the name of your Operations for Applications service instance, and `<service_account_api_token>` is the API token for the service account.
