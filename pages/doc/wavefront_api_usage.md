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

* For original subscriptions, invoking the Operations for Application REST API requires an Operations for Application API token.

   An API token can be associated with a user account or service account See [Manage API Tokens](api_tokens.html). 


{% include note.html content="If you want to use the `curl` examples from the REST API UI to run them remotely, you must replace the CSRF token with your target token. You must use:  `-H 'Authorization: Bearer <your_token>` in your API calls."%}


## Onboarded Subscriptions

### Make API Calls by Using a User Account

If you want to use your own [**user account**](user-accounts.html) to make the REST API calls, use a VMware Cloud services API token associated with your user account:

1. Log in to the VMware Cloud Services Console.
2. Click your username, select **My Account** and, on the **API Tokens** tab, [generate a new token](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html).
3. Copy and save the newly generated token in a secure place.

   {% include note.html content="For security reasons once the API token is generated and you click **Continue**, only the token name is exposed in the UI. This means that you will no longer be able to reuse the token by copying the credentials from this page. If you lose the information about a token, you must either regenerate it or use a new one."%}

3. Exchange the organization-scoped API token for a user access token and save it to a secure place.

   1. Navigate to the [VMware Cloud Services API](https://console.cloud.vmware.com/csp/gateway/authn/api/swagger-ui.html).
   2. Perform the `POST/am/api/auth/api-tokens/authorize` request with the value of the API token that you have generated in the VMware Cloud Services Console.
   
      Copy the value of the `"access_token"` from the response body.

4. If you use `curl`, and want to get information about all cloud integrations in your environment, run:

    ```
   curl 'https://<your_instance>/api/v2/cloudintegration' -H 'Authorization: Bearer <access_token>'
    ```
   
   Here, `<your_instance>` is the name of your Operations for Applications service instance, and `<access_token>` is the access token for your user account.


### Make API Calls by Using a Server to Server App

If you build an application or tool that manages proxies or ingests data, then that tool must authenticate to the Operations for Applications REST API. 

1. Create a server to server app in VMware Cloud services.
2. Assign one or more roles to the server to server app to grant it the Operations for Applications permissions it needs.
3. Obtain the OAuth 2.0 client credentials of the server to server app.
4. Add the app to your organization.
5. Configure your tool to pass the OAuth 2.0 client credentials to the REST API.
6. Exchange the app ID and secret for an access token and save it to a secure place.

   1. Navigate to the [VMware Cloud Services API](https://console.cloud.vmware.com/csp/gateway/authn/api/swagger-ui.html).
   2. Perform the `POST/am/api/auth/authorize` API call with the values of the client ID and client secret of your server to server app as username and password.
   3. Copy the value of the `"access_token"` from the response body.

7. If you use curl, and want to get information about all cloud integrations in your environment, run:

      ```
      curl 'https://<your_instance>/api/v2/cloudintegration' -H 'Authorization: Bearer <access_token>'
      ```
      Here, `<your_instance>` is the name of your Operations for Applications service instance, and `<access_token>` is the access token for the server to server app.

  For more information, see [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.

## Original Subscriptions

### Make API Calls by Using a User Account

If you want to use your own [**user account**](user-accounts.html) to make the REST API calls, use an API token associated with your user account:

1. Log in to your service instance (`https://<your_instance>.wavefront.com`).
2. Click the gear icon on the toolbar and click your user name.
3. On the **API Access** tab, click the **Copy** icon next to the API token that you want to use.
4. If you use `curl`, and want to get information about all cloud integrations in your environment, run:

    ```
   curl 'https://<your_instance>/api/v2/cloudintegration' -H 'Authorization: Bearer <your_api_token>'
    ```
   
   Here, `<your_instance>` is the name of your Operations for Applications service instance, and `<your_api_token>` is the API token for your user account.
  
### Make API Calls by Using a Service Account


If you want to use a [**service account**](service-accounts.html) to make the REST API calls, use an API token associated with that service account.

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
