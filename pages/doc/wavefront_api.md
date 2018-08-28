---
title: Wavefront Management API
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_api.html
summary: Learn about the Wavefront Management API.
---

Wavefront is fully API driven and supports a REST API and [instrumentation APIs](wavefront_instrumentation_api.html).
* The Wavefront REST API allows you to perform tasks that you'd perform from the UI, such as create an event. You can use Swagger to create a language binding of your choice.  Wavefront customers have created CLI clients of this API.
* The instrumentation API allows you to send metrics to the Wavefront proxy or directly to the Wavefront service. This API is available in Github and through different Application Instrumentation integrations.

The focus of this page is on the Wavefront Management API.

## Management API Overview

All interactions between the Wavefront UI and your Wavefront instance occur through the Wavefront management API. Because the API is publicly available, you can perform those actions using REST - or create other clients using Swagger, discussed below.

**Note:** The Wavefront API is not the same as the `/api` endpoint that you specify for the Wavefront proxy.

The current version of the API is v2. You can access the API at `<wavefront_instance>/api/v2`. The v1 API (`<wavefront_instance>/api/`) was deprecated in 2017 and is no longer supported.

### API Documentation

The API is publicly documented in the Swagger generated API documentation. To access the API documentation:
1. Log in to your Wavefront instance.
2. Display the doc from the UI or using a URL:
  * From the Wavefront UI, click the gear icon <i class="fa fa-cog"/> at the top right of the task bar and select **API Documentation**.
  * Type `https://<your_cluster_name>.com/api-docs/ui/`

### Code Samples

Some code samples are available on the [VMware code website](https://code.vmware.com/samples?categories=Sample&tags=wavefront). We're providing these samples as is - some are from the Wavefront team, others will come from the community.


## Invoking the API Using curl

When you invoke the API, you must pass a Wavefront API token. This example shows how to pass in the token using `url`.

With `curl`, you specify the API token in the `Authorization: Bearer` header. For example, to return all alerts, invoke the following:

```shell
curl 'https://<wavefront_instance>/api/v2/alert' --header 'Authorization: Bearer <wavefront_api_token>'
```
You can generate the token from the Wavefront UI, discussed below. A Wavefront API token is a string of hexadecimal characters and dashes. For example:

```
a411c16b-3cf7-4f03-bf11-8ca05aab898d
```

### Generating an API Token

To generate an API token:

1. In the Wavefront UI, click the gear icon <i class="fa fa-cog"/>  at the top right of the task bar and select your username.
2. At the bottom of your user profile, locate the section **API Access**.
3. Click **Generate**. You can have up to 2 tokens at any given time.
   If you want to generate a new token but already have two tokens, then you must revoke one of the existing tokens.
4. To revoke a token, click the **Revoke** link next to the token. If you run a script that uses a revoked token, the script returns an authorization error.

## Generate an API Using Swagger

Because we expose our REST API via Swagger, you can generate a working implementation of the API.

**Note:** If you use the default Swagger configuration settings, for example, do generate a Java client, might result in errors. Follow these steps instead:

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

## Management API Categories

The management API supports the following API categories:

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
