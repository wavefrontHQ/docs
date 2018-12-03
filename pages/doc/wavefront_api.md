---
title: Wavefront REST API
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_api.html
summary: Learn about the REST API for managing Wavefront.
---

Wavefront supports a [REST API for management](wavefront_api.html) and several SDKs for sending metrics.
* The Wavefront REST API allows you to perform management tasks that you'd perform from the UI, such as creating events. You can use Swagger to create an API client or a CLI client from this API.
* The [SDKs](wavefront_sdks.html) allow you to send metrics to the Wavefront proxy or directly to the Wavefront service. These SDKs are available through different integrations and in GitHub.

**Note:** You can use our API to [interactively try things out](https://www.wavefront.com/wavefront-rest-api/) from the in-product REST API doc. 


## REST API Overview

All interactions between the Wavefront UI and your Wavefront instance occur through the Wavefront management API. You can perform those actions using REST - or you can create an API client using Swagger, discussed below.

The current version of the REST API is v2. You can access the API at `<wavefront_instance>/api/v2`. The v1 API (`<wavefront_instance>/api/`) was deprecated in 2017 and is no longer supported.

**Note:** The Wavefront REST API is not the same as the `/api` endpoint that you specify for the Wavefront proxy.

### API Documentation

The REST API is publicly documented in the Swagger-generated API documentation.

**Note:** In our blog post [Did You Know that Our API Docs Are Alive](https://www.wavefront.com/wavefront-rest-api/) we explain how you can experiment with our API directly from the documentation.

To access the REST API documentation:

1. Log in to your Wavefront instance.
2. Display the doc from the UI or using a URL:
  * From the Wavefront UI, click the gear icon <i class="fa fa-cog"/> at the top right of the task bar and select **API Documentation**.
  * Type `https://<your_cluster_name>.com/api-docs/ui/`

### Code Samples

Some code samples are available on the [VMware code website](https://code.vmware.com/samples?categories=Sample&tags=wavefront). We're providing these samples as is - some are from the Wavefront team, others will come from the community.


## Invoking the API

You can invoke the API using `curl` or from an API client. In either case, you must pass in a Wavefront API token.

### Generating an API Token

A Wavefront API token is a string of hexadecimal characters and dashes. For example:

```
a411c16b-3cf7-4f03-bf11-8ca05aab898d
```

To generate an API token:

1. In the Wavefront UI, click the gear icon <i class="fa fa-cog"/>  at the top right of the task bar and select your username.
2. At the bottom of your user profile, locate the section **API Access**.
3. Click **Generate**. You can have up to 2 tokens at any given time.
   If you want to generate a new token but already have two tokens, then you must revoke one of the existing tokens.
4. To revoke a token, click the **Revoke** link next to the token. If you run a script that uses a revoked token, the script returns an authorization error.

### Example: Invoke the API Using curl

With `curl`, you specify the API token in the `Authorization: Bearer` header. For example, to return all alerts, run the following command:

```shell
curl 'https://<wavefront_instance>/api/v2/alert' --header 'Authorization: Bearer <wavefront_api_token>'
```

## Generate an API Client Using Swagger

Because we expose the Wavefront REST API via Swagger, you can generate a working implementation of the API for the programming language or CLI you want to use.

**Note:** Using the default Swagger configuration settings might result in errors. Create your own configuration file instead, as in the following example for generating a Java client:

1. Create a file `swagger-config.json`:
```
{
    "modelPackage": "com.wavefront.rest.models",
    "apiPackage": "com.wavefront.rest.api.client",
    "groupId": "com.wavefront.rest.api.client",
    "artifactId": "wf-java-sdk",
    "artifactVersion": "5.0-SNAPSHOT",
    "sourceFolder": "src/main"
}
```
2. Generate the client, for example:

`swagger-codegen generate -i https://metrics.wavefront.com/api/v2/swagger.json -c swagger-config.json -l java`

## Wavefront REST API Categories

The REST API supports the following categories of management tasks:

- **Alert** - Retrieve active, snoozed, in-maintenance, and invalid alerts. Users with [Alert Management permission](permissions_overview.html) can create and update alerts.
- **Cloud Integration** - Retrieve cloud integration data types such as those available with the [AWS integration](integrations_aws_metrics.html). Users with [Proxy Management permission](permissions_overview.html) can add and remove cloud integration data types.
- **Dashboard** - Retrieve data about dashboards, list dashboards, and return version history. Users with [Dashboard Management permission](permissions_overview.html) can save, create, delete, clone, undelete dashboards.
- **Event** - Retrieve events and tags associated with a specific event. Users with [Event Management permission](permissions_overview.html) can create, update, and delete events. Deleting events is limited to non-system events. System events include events based on alert firings, error events, and maintenance windows.
- **External Link** - Navigate external links. Users with [External Links Management permission](permissions_overview.html) can create, update, and delete external links.
- **Integration** - Retrieve integrations. Users with [Integration Management permission](permissions_overview.html) can install and uninstall integration dashboards.
- **Maintenance Window** - Retrieve a complete or filtered list of existing maintenance windows. Users with [Alert Management permission](permissions_overview.html) can create, close, update, and delete maintenance windows.
- **Message** - Retrieve messages and mark messages read.
- **Metric** - Retrieve details on a metric.
- **Proxy** - Retrieve information about Wavefront proxies. Users with [Proxy Management permission](permissions_overview.html) can add and remove Wavefront proxies.
- **Query** - Perform queries.
- **Saved Search** - Retrieve, add, and remove saved searches.
- **Search** - Search agents, alerts, integrations, dashboards, external links, maintenance windows, sources, and web hooks.
- **Source** - Retrieve sources and tags associated with a source. Users with [Source Tag Management permission](permissions_overview.html) can add and remove source tags and set descriptions.
- **User** - Allows users with [User Management permission](permissions_overview.html) to retrieve a list of all users, create, update, and delete users, and manage permissions.
- **Webhook** - Retrieve webhooks. Users with [Alert Management permission](permissions_overview.html) can create, update, and delete webhooks.
