---
title: Use the Wavefront REST API
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: using_wavefront_api.html
summary: Learn how to use the REST API outside of the in-product documentation UI.
---

The [REST API](wavefront_api.html) enables you to interact with the Wavefront service by using standard REST API tools. You can use the REST API to automate commonly executed operations, for example, to tag sources automatically.

When you make REST API calls outside the REST API documentation UI, you must use an API token to authenticate. See [Managing API Tokens](wavefront_api.html#managing-api-tokens).

{% include note.html content="If you want to use the `curl` examples from the REST API UI to run them remotely, you must replace the CSRF token with an API token. You must use:  `-H 'Authorization: Bearer <your_api_token>` in your API calls."%}

## Make API Calls by Using a User Account

If you want to use your own [**user account**](user-accounts.html) to make the REST API calls, use an API token associated with your user account:

1. Log in to your Wavefront instance.
2. Click the gear icon on the toolbar and click your user name.
3. On the **API Access** tab, click the **Copy** icon next to the API token that you want to use.
4. If you use `curl`, and want to get information about all cloud integrations in your environment, run:

    ```
   curl 'https://<your_wavefront_instance>/api/v2/cloudintegration' -H 'Authorization: Bearer <your_api_token>'
    ```
   
   Here, `<your_wavefront_instance>` is the name of your Wavefront instance, and `<your_api_token>` is the API token for your user account.
  
## Make API Calls by Using a Service Account


If you want to use a [**service account**](service-accounts.html) to make the REST API calls, use an API token associated with that service account.

{% include note.html content="To get the API token for a specific service account, you must have the **Accounts** permission. For information about permissions, see [Permissions Reference](permissions_overview.html)."%}

1. Log in to your Wavefront instance.
2. Click the gear icon on the toolbar and click **Accounts**.
3. On the **Service Accounts** tab, click the service account that you want to use.
4. Click the **Copy** icon next to the API token that you want to use.
5. If you use `curl`, and want to get information about all cloud integrations in your environment, run:
  
   ```
   curl 'https://<your_wavefront_instance>/api/v2/cloudintegration' -H      'Authorization: Bearer <service_account_api_token>'
   ```
   
   Here, `<your_wavefront_instance>` is the name of your Wavefront instance, and `<service_account_api_token>` is the API token for the service account.
