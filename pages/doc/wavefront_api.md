---
title: Wavefront REST API
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_api.html
summary: Learn about the REST API for managing Wavefront.
---

The Wavefront REST API enables you to write scripts to perform Wavefront management tasks, such as defining alerts and creating events. You can use the REST API to perform any task that is supported by the Wavefront UI. The REST API is based on Swagger, so you can generate the API client of your choice (including a CLI client).



## REST API Overview

All interactions between the Wavefront UI and your Wavefront instance occur through the Wavefront management API. You can perform those actions using REST - or you can create an API client using Swagger, discussed below.

The current version of the REST API is v2. You can access the API at `<wavefront_instance>/api/v2`. The v1 API (`<wavefront_instance>/api/`) was deprecated in 2017 and is no longer supported.

{% include note.html content="The Wavefront REST API is not the same as the `/api` endpoint that you specify for the Wavefront proxy."%}


## API Documentation (Wavefront Instance)

Each Wavefront instance includes Swagger-generated documentation for the REST API. In our blog post [Did You Know that Our API Docs Are Alive](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/did-you-know-that-our-api-docs-are-alive) we explain how you can experiment with our API directly from this in-product documentation.

To access the REST API documentation :

1. Log in to your Wavefront instance.
2. Display the doc from the UI or using a URL:
  * From the Wavefront UI, click the gear icon <i class="fa fa-cog"/> at the top right of the taskbar and select **API Documentation**.
  * Type `https://<your_cluster_name>.com/api-docs/ui/`


![REST API in Wavefront instance](/images/rest_api.png)

## API Documentation (VMware code)

If you don't have access to a Wavefront instance, you can have a look at our API doc [on the VMware code site](https://code.vmware.com/apis/714/wavefront-rest).

We include an overview and a Swagger-generated API Reference. We update the reference with each release.

![REST API in VMware code](/images/vmware_code_api.png)

The [VMware code website](https://code.vmware.com/samples?categories=Sample&tags=wavefront) also includes some samples, for example, for getting data into Wavefront. We're providing these samples as is - some are from the Wavefront team, others will come from the community.


## Invoking the API

You can invoke the API using `curl` or from an API client. In either case, you must pass in a Wavefront API token.

### Generating an API Token

A Wavefront API token is a string of hexadecimal characters and dashes. For example:

```
a411c16b-3cf7-4f03-bf11-8ca05aab898d
```
Wavefront allows [user accounts and service accounts](accounts.html) to use the [Wavefront REST API](wavefront_api.html).

{% include tip.html content="You generate user account tokens explicitly, discussed below. For service accounts, you can generate tokens with the specified permissions from the Service Accounts page. " %}

To generate an API token for your account:

1. In the Wavefront UI, click the gear icon <i class="fa fa-cog"/>  at the top right of the taskbar and select your username.
2. At the bottom of your user profile, locate the section **API Access**.
3. Click **Generate**. You can have up to 2 tokens at any given time.
   If you want to generate a new token but already have two tokens, then you must revoke one of the existing tokens.
4. To revoke a token, click the **Revoke** link next to the token. If you run a script that uses a revoked token, the script returns an authorization error.

![Generate API Token](/images/generate_token.png)


{% include warning.html content="Do not share your API token with anyone. The token provides full access to the API. Accounts that have the token can authenticate without a username/password."%}




### Example: Invoke the API Using curl

With `curl`, you specify the API token in the `Authorization: Bearer` header. For example, to return all alerts, run the following command:

```shell
curl 'https://<wavefront_instance>/api/v2/alert' --header 'Authorization: Bearer <wavefront_api_token>'
```

## Generate an API Client Using Swagger

Because we expose the Wavefront REST API via Swagger, you can generate a working implementation of the API for the programming language or CLI you want to use.

{% include note.html content="Using the default Swagger configuration settings might result in errors. Create your own configuration file instead."%}

Here's an example for generating a Java client:

1. Create a file `swagger-config.json`. Here's an example:
```
{
"modelPackage": "com.wavefront.rest.models",
"apiPackage": "com.wavefront.rest.api.client",
"groupId": "com.wavefront.rest.api.client",
"artifactId": "wavefront-java-sdk",
"artifactVersion": "19.10",
"sourceFolder": "src/main/java",
"java8": true,
"dateLibrary": "java8"
}
```
2. Generate the client, for example:

`swagger-codegen generate -i https://mydomain.wavefront.com/api/v2/swagger.json -c swagger-config.json -l java`

## Wavefront REST API Categories

The REST API supports the following objects corresponding to different categories of management tasks:

- **Access Policy** - Lets you allow or deny access to embedded charts. For information, see [Allow or Deny Access to Embedded Charts](ui_sharing.html#ui_sharing.html#allow-or-deny-access-to-embedded-charts).
- **Access** - Provides information on the access level of an entity. See [Notes on the Access Category](#access) below.
- **Account (User and Service Account)** - Allows users with [Accounts, Groups & Roles permission](permissions_overview.html) to retrieve a list of all [accounts](users_roles.html), create, update, and delete accounts and manage permissions and groups associated with accounts.
- **Alert** - Retrieve active, snoozed, in-maintenance, and invalid alerts. Users with [Alert permission](permissions_overview.html) can create and update alerts.
- **ApiToken** - Allows users with [Accounts, Groups & Roles permission](permissions_overview.html) to retrieve, create, and manage API tokens. Used primarily in conjunction with service accounts.
- **Cloud Integration** - Retrieve cloud integration data types such as those available with the [AWS integration](integrations_aws_metrics.html). Users with [Proxies permission](permissions_overview.html) can add and remove cloud integration data types.
- **Dashboard** - Retrieve data about dashboards, list dashboards, and return version history. Users with [Dashboard permission](permissions_overview.html) can save, create, delete, clone, undelete dashboards.
- **Derived Metric** - Manage derived metrics.
- **Direct Ingestion** - Perform [direct ingestion](direct_ingestion.html) instead of using a proxy.
- **Event** - Retrieve events and tags associated with a specific event. Users with [Event permission](permissions_overview.html) can create, update, and delete events. Deleting events is limited to non-system events. System events include events based on alert firings, error events, and maintenance windows.
- **External Link** - Navigate external links. Users with [External Links permission](permissions_overview.html) can create, update, and delete external links.
- **Integration** - Retrieve integrations. Users with [Integration permission](permissions_overview.html) can install and uninstall integration dashboards.
- **Maintenance Window** - Retrieve a complete or filtered list of existing maintenance windows. Users with [Alert permission](permissions_overview.html) can create, close, update, and delete maintenance windows.
- **Message** - Retrieve messages and mark messages read.
- **Metric** - Retrieve details on a metric.
- **Notificant** - Allows users with Users with [Alert permission](permissions_overview.html) to create, delete, update, or test alert notification targets.
- **Proxy** - Retrieve information about Wavefront proxies. Users with [Proxy Management permission](permissions_overview.html) can add and remove Wavefront proxies.
- **Query** - Perform queries.
- **Role** - Retrieve information about a role and manage roles and role assignees.
- **Saved Search** - Retrieve, add, and remove saved searches.
- **Search** - Search agents, alerts, integrations, dashboards, external links, maintenance windows, sources, and webhook alert targets.
- **Source** - Retrieve sources and tags associated with a source. Users with [Source Tag permission](permissions_overview.html) can add and remove source tags and set descriptions.
- **Usage** - Retrieve information about usage associated with ingestion policies and manage policies.
- **User** - Deprecated API. Use **Account (User and Service Account)** instead.
- **UserGroup** - Allows users with [Accounts, Groups & Roles permission](permissions_overview.html) to retrieve a list of all groups, create, update, and delete groups, and manage the users and roles associated with a group.
- **Webhook** - Retrieve webhooks. Users with [Alert Management permission](permissions_overview.html) can create, update, and delete webhooks.

<a name="access"></a>
### Notes on the Access Category

The `/api/access/{entity}` endpoint provides information on how often an entity has been accessed.  Supported entities are metric, histogram, span.

{% include note.html content="Wavefront uses a bloom filter to determine the access pattern. As a result, even if data access returns true, there’s a very low probability that data actually hasn't been accessed. If data access returns false, it is guaranteed that the data has not been accessed.
"%}

This GET endpoint has the following parameters:

<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td>name</td>
<td>Entity name,  e.g, cpu.usage (for a metric).</td></tr>
<tr>
<td>hostPrefix</td>
<td>Prefix of the host name, e.g. you can use test-2a-app67 if the whole host name is test-2a-app57-id-12345 <br>
<strong>Warning:</strong>hostPrefix must be somewhat specific. There's a limit on how many hosts Wavefront scans.</td></tr>
<tr>
<td>usageThresholdDays</td>
<td>How many days to look back. 7 days by default.</td></tr>
<tr>
<td>includeDailyDetail</td>
<td>Whether to provide additional data on daily usage. False by default.
<ul><li>If includeDailyDetail is false, GET returns true if the data has been accessed in the past usageThresholdDays, and false otherwise. </li>
<li>If includeDailyDetail is true, GET returns daily access details. </li>
</ul>
</td></tr>
</tbody>
</table>
