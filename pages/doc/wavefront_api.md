---
title: Using the Wavefront API
keywords: api
tags: [api]
sidebar: doc_sidebar
permalink: wavefront_api.html
summary: Learn how to use Wavefront API.
---

Wavefront is fully API driven. This means that all interactions between the Wavefront UI and your Wavefront instance occur through the Wavefront API. 

The current version of the API is v2 and is accessed at `<Wavefront_instance>/api/v2`. While Wavefront recommends that you move to the v2 API, the v1 API (`<Wavefront_instance>/api/`), though deprecated, is still supported. For a video overview, see [API v2](https://wavefront-1.wistia.com/medias/0ja5gpkufa).

The API is publicly documented in the Swagger generated API documentation. To access the API documentation from the Wavefront UI, click the gear icon <i class="fa fa-cog"/> at the top right of the task bar and select API Documentation.

## API Categories
Wavefront supports the following API categories:

- **Alert** - Allows all users to retrieve all active, snoozed, in-maintenance, and invalid alerts. Users with [Alert Management permission](permissions_overview) can create and update alerts.
- **Cloud Integration** - Allows all users to retrieve integrations. Users with [Proxy Management permission](permissions_overview) can add and remove integrations with cloud services.
- **Dashboard** - Allows all users to retrieve data about dashboards, list dashboards, and return version history. Users with [Dashboard Management permission](permissions_overview) can save, create, delete, clone, undelete dashboards.
- **Event** - Allows all users to retrieve events and tags associated with a specific event. Users with [Event Management permission](permissions_overview) can create, update, and delete events. Deleting events is limited to non-system events. System events include events based on alert firings, error events, and maintenance windows.
- **External Link** - Allows all users to navigate external links. Users with [External Links Management permission](permissions_overview) can create, update, and delete external links.
- **Maintenance Window** - Allows all users to retrieve a complete or filtered list of existing maintenance windows. Users with [Alert Management permission](permissions_overview) can create, close, update, and delete maintenance windows.
- **Message** - Allows all users to retrieve messages and mark messages read.
- **Metric** - Allows all users to retrieve details on a metric.
- **Proxy** - Allows all users to retrieve information about Wavefront proxies. Users with [Proxy Management permission](permissions_overview) can add and remove Wavefront proxies.
- **Query** - Allows all users to perform queries.
- **Saved Search** - Allows all users to retrieve, add, and remove saved searches.
- **Search** - Allows all users to search agents, alerts, cloud integrations, dashboards, external links, maintenance windows, sources, and web hooks.
- **Source** - Allows all users to retrieve sources and tags associated with a source. Users with [Source Tag Management permission](permissions_overview) can add and remove source tags and set descriptions.
- **User** - Allows users with [User Management permission](permissions_overview) to retrieve a list of all users, create, update, and delete users, and manage permissions.
- **Webhook** - Allows all users to retrieve webhooks. Users with [Alert Management permission](permissions_overview) can create, update, and delete webhooks.

 
## API Tokens
When using APIs outside of the Wavefront UI, you must pass a token in the Authorization: Bearer header. For example, to return all alerts, invoke the following:

```shell
curl 'https://<Wavefront_instance>/api/v2/alert' --header 'Authorization: Bearer <API_token>'
```

### Generating an API Token

To generate an API token from your user profile:

1. In the Wavefront UI, click the gear icon <i class="fa fa-cog"/>  at the top right of the task bar and select your username.
1. At the bottom of your User Profile, locate the section titled API Access.
1. Click **Generate**. You can have up to 2 tokens at any given time. If you want to generate a new token but already have two tokens existing, then you must revoke one of the existing tokens first. If you create an API script using a token, and that token is revoked, then that script will return an authorization error.
 
## API SDKs
Wavefront provides SDKs  in several languages for accessing the Wavefront API. Wavefront also provides integrations for supplying language-specific metrics:

<table style="width: 100%;">
<colgroup>
<col width="10%"/>
<col width="30%"/>
<col width="30%"/>
<col width="30%"/>
</colgroup>
<thead>
<tr><th>Language</th><th>V1 SDK</th><th>V2 SDK</th><th>Metrics</th></tr>
</thead>
<tbody>
<tr>
<td>Go</td>
<td>NA</td>
<td>NA</td>
<td markdown="span">[Go Metrics Integration](integrations_go_metrics)</td>
</tr>
<tr>
<td>Java</td>
<td markdown="span">[Wavefront Java client](https://github.com/wavefrontHQ/java)</td>
<td>NA</td>
<td markdown="span">[DropWizard Metrics Integration](integrations_dropwizard_metrics)</td>
</tr>
<tr>
<td>Python</td>
<td markdown="span">[Wavefront Python client](https://github.com/wavefrontHQ/python-client/tree/api-v1)</td>
<td markdown="span">[Wavefront Python client](https://github.com/wavefrontHQ/python-client)</td>
<td>NA</td>
</tr>
<tr>
<td>Ruby</td>
<td markdown="span">[Wavefront Ruby client](https://github.com/wavefrontHQ/ruby-client)</td>
<td>NA</td>
<td>NA</td>
</tr>
</tbody>
</table>

{% include links.html %}