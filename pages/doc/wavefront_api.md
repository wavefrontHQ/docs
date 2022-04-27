---
title: Wavefront REST API
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_api.html
summary: Learn about the REST API for managing Tanzu Observability by Wavefront.
---

The Wavefront REST API enables you to write scripts to perform management tasks, such as defining alerts and creating events. You can use the REST API to perform any task that is supported by the Tanzu Observability GUI. The REST API is based on Swagger, so you can generate the API client of your choice (including a CLI client).



## REST API Overview

All interactions between the UI and your Wavefront instance occur through the Wavefront API. You can perform those actions using REST - or you can create an API client using Swagger, discussed below.

The current version of the REST API is v2. You can access the API at `<your_instance>/api/v2`. The v1 API (`<your_instance>/api/`) was deprecated in 2017 and is no longer supported.

{% include note.html content="The Wavefront REST API is not the same as the `/api` endpoint that you specify for the Wavefront proxy."%}


## API Documentation (Wavefront Instance)

Each Wavefront instance includes Swagger-generated documentation for the REST API. In our blog post [Did You Know that Our API Docs Are Alive](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/did-you-know-that-our-api-docs-are-alive) we explain how you can experiment with our API directly from this in-product documentation.

To access the REST API documentation :

1. Log in to your Wavefront instance.
2. Display the doc from the UI or using a URL:
  * In the UI, click the gear icon <i class="fa fa-cog"/> at the top right of the toolbar and select **API Documentation**.
  * Type `https://<your_instance>.com/api-docs/ui/`


![REST API in a Wavefront instance](/images/rest_api.png)

## API Documentation (VMware code)

If you don't have access to a Wavefront instance, you can have a look at our API doc [on the VMware code site](https://code.vmware.com/apis/714/wavefront-rest).

We include an overview and a Swagger-generated API Reference. We update the reference with each release.

![REST API in VMware code](/images/vmware_code_api.png)

The [VMware code website](https://code.vmware.com/samples?categories=Sample&tags=wavefront) also includes some samples, for example, for getting data into Tanzu Observability. We're providing these samples as is - some are from our team, others will come from the community.


## Managing API Tokens

Before you can invoke the Wavefront API using `curl` or from an API client, you must have an API token.

An API token is a string of hexadecimal characters and dashes. For example:

```
a411c16b-3cf7-4f03-bf11-8ca05aab898d
```
Tanzu Observability by Wavefront allows [user accounts](user-accounts.html) and [service accounts](service-accounts.html) to use the [Wavefront REST API](wavefront_api.html).

{% include tip.html content="You generate API tokens for your user account explicitly. For service accounts, a user with the **Accounts** permission can generate tokens from the **Service Accounts** page." %}

### Generate and Manage the API Tokens for Your User Account

{% include note.html content="All users can use and manage their existing API tokens. You must have the [API Tokens permission](permissions_overview.html) to generate new API tokens for your user account." %}


1. Log in to your Wavefront instance.
2. Click the gear icon <i class="fa fa-cog"/> at the top right of the toolbar and select your user name.
3. On the **API Access** tab, click **Generate**.

   You can have up to 20 tokens at any given time. If you want to generate a new token but already have 20 tokens, then you must revoke one of the existing tokens.
4. To revoke a token, click the **Revoke** button next to the token.

    If you run a script that uses a revoked token, the script returns an authorization error.
5. To add a name or rename an API token, click the **Edit** icon for the token, enter the name, and press Enter.

![Generate API Token](/images/generate_token.png)


{% include warning.html content="Do not share your API token with anyone. The token provides full access to the API. Accounts that have the token can authenticate without a username/password."%}

### Generate and Manage the API Tokens for a Service Account

As a user with the **Accounts** permission, you can generate API tokens for [service accounts](service-accounts.html) upon creation or at a later stage. To generate an API token for an existing **service account**:

1. Log in to your Wavefront instance as a user with the **Accounts** permission.
2. Click the gear icon <i class="fa fa-cog"/> at the top right of the toolbar and select **Accounts**.
3. On the **Service Accounts** tab, click the ellipsis icon next to the service account for which you want to generate an API token, and select **Edit**.
4. To generate a new token, in the Tokens section, click **Generate**.

    You can have up to 20 tokens per service account at any given time. If you want to generate a new token but already have 20 tokens, then you must revoke one of the existing tokens.
5. To revoke a token, click the **Revoke** button for the token.

    Revoking a token cannot be undone.
5. To rename an API token, click the **Edit** icon for the token, enter the name, and press Enter.
6. Select the appropriate permissions for the service account and click **Update**.

### View and Manage the API Tokens in Your Organization

As a user with the **Accounts** permission, you can view and revoke the API token of any user or service account in your organization.

1. Log in to your Wavefront instance as a user with the **Accounts** permission.
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


## Invoking the API

You can invoke the Wavefront API using `curl` or from an API client. In either case, you must pass in an API token.

### Example: Invoke the API Using curl

With `curl`, you specify the API token in the `Authorization: Bearer` header. For example, to return all alerts, run the following command:

```shell
curl 'https://<your_instance>/api/v2/alert' --header 'Authorization: Bearer <your_api_token>'
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

- **Access Policy** - Lets you allow or deny access to embedded charts. For information, see [Allow or Deny Access to Embedded Charts](ui_sharing.html#allow-or-deny-access-to-embedded-charts).
- **Access** - Provides information on the access level of an entity. See [Notes on the Access Category](#access) below.
- **Account (User and Service Account)** - Allows users with [**Accounts** permission](permissions_overview.html) to retrieve a list of all [accounts](users_roles.html), create, update, and delete accounts and manage permissions and groups associated with accounts.
- **Alert** - Retrieve active, snoozed, in-maintenance, and invalid alerts. Users with [**Alerts** permission](permissions_overview.html) can create and update alerts.
- **ApiToken** - Allows users with [**Accounts** permission](permissions_overview.html) to retrieve, create, and manage API tokens. Used primarily in conjunction with service accounts.
- **Cloud Integration** - Retrieve cloud integration data types such as those available with the [AWS integration](integrations_aws_metrics.html). Users with [**Proxies** permission](permissions_overview.html) can add and remove cloud integration data types.
- **Dashboard** - Retrieve data about dashboards, list dashboards, and return version history. Users with [**Dashboards** permission](permissions_overview.html) can save, create, delete, clone, undelete dashboards.
- **Derived Metric** - Manage derived metrics.
- **Direct Ingestion** - Perform [direct ingestion](direct_ingestion.html) instead of using a proxy.
- **Event** - Retrieve events and tags associated with a specific event. Users with [**Events** permission](permissions_overview.html) can create, update, and delete events. Deleting events is limited to non-system events. System events include events based on alert firings, error events, and maintenance windows.
- **External Link** - Navigate external links. Users with [**External Links** permission](permissions_overview.html) can create, update, and delete external links.
- **Integration** - Retrieve integrations. Users with [**Integrations** permission](permissions_overview.html) can install and uninstall integration dashboards.
- **Maintenance Window** - Retrieve a complete or filtered list of existing maintenance windows. Users with [**Alerts** permission](permissions_overview.html) can create, close, update, and delete maintenance windows.
- **Message** - Retrieve messages and mark messages read.
- **Metric** - Retrieve details on a metric.
- **Notificant** - Allows users with Users with [**Alerts** permission](permissions_overview.html) to create, delete, update, or test alert notification targets.
- **Proxy** - Retrieve information about Wavefront proxies. Users with [**Proxies** permission](permissions_overview.html) can add and remove Wavefront proxies.
- **Query** - Perform queries.
- **Role** - Retrieve information about a role and manage roles and role assignees.
- **Saved Search** - Retrieve, add, and remove saved searches.
- **Search** - Search agents, alerts, integrations, dashboards, external links, maintenance windows, sources, and webhook alert targets.
- **Source** - Retrieve sources and tags associated with a source. Users with [**Source Tags** permission](permissions_overview.html) can add and remove source tags and set descriptions.
- **Usage** - Retrieve information about usage associated with ingestion policies and manage policies.
- **User** - Deprecated API. Use **Account (User and Service Account)** instead.
- **UserGroup** - Allows users with [**Accounts** permission](permissions_overview.html) to retrieve a list of all groups, create, update, and delete groups, and manage the users and roles associated with a group.
- **Webhook** - Retrieve webhooks. Users with [**Alerts** permission](permissions_overview.html) can create, update, and delete webhooks.

<a name="access"></a>
### Notes on the Access Category

The `/api/access/{entity}` endpoint provides information on how often an entity has been accessed.  Supported entities are metric, histogram, span.

{% include important.html content="In order to use this API, users must have both the Direct Data Ingestion and Metrics [permissions](permissions_overview.html)."%}

{% include note.html content="Tanzu Observability by Wavefront uses a bloom filter to determine the access pattern. As a result, even if data access returns true, there’s a very low probability that data actually hasn't been accessed. If data access returns false, it is guaranteed that the data has not been accessed.
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
<strong>Warning:</strong>hostPrefix must be somewhat specific. There's a limit on how many hosts Tanzu Observability scans.</td></tr>
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

<!---
## Troubleshooting

Many customers automate the creation, addition, and deletion of alerts, dashboards, etc. with the Wavefront API. The API support WQL and other things you can do from the GUI.  This section is a living document with troubleshooting information.

### API Code:400 Returned when using unescaped JSON characters

* **Problem**

Some WQL querie requite quotes for the function to operate correctly. If you use a query that omits required quotes, for example, in an alert condition, a `400` error results.

For example, assume you use the following fragment to create an alert:

```
{
"name": “Test-Alert-Wavefront”,
"target": “wavefront@vmware.com",
"condition": "hideAfter(1m, rawpercentile(95, align(1m, mean, default(5m, 0, ts(stats.timers.promotion-service.getBanners.post_checkout_page.latency.upper_95))))) > 1000 and between(hour("US/Pacific"), 6, 23.5)
",
"displayExpression": "hideAfter(1m, rawpercentile(95, align(1m, mean, default(5m, 0, ts(stats.timers.promotion-service.getBanners.post_checkout_page.latency.upper_95))))) > 1000 and between (hour("US/Pacific"), 6, 23.5)
",
"minutes": 15,
"resolveAfterMinutes": 1,
"severity": "INFO",
"additionalInformation": “Failure to include JSON Escape Character after double quotes”,
"tags": {
"customerTags": [
"alertTag1"]
  }
}
```
When you POST that fragment, the following error results.

```
"message": "Invalid UTF-8 start byte 0x80\n at [Source: (org.glassfish.jersey.message.internal.ReaderInterceptorExecutor$UnCloseableInputStream); line: 2, column: 13]", "code": 400
```



* **Solution**

Double Quotes are reserved in JSON and must be properly escaped.

```
{

  "name": "Test_Alert_Wavefront",

  "target": "wavefront@vmware.com",

  "condition": "hideAfter(1m, rawpercentile(95, align(1m, mean, default(5m, 0, ts(stats.timers.promotion-service.getBanners.post_checkout_page.latency.upper_95))))) > 1000 and between (hour('US/Pacific'), 6, 23.5) ",

  "displayExpression": "hideAfter(1m, rawpercentile(95, align(1m, mean, default(5m, 0, ts(stats.timers.promotion-service.getBanners.post_checkout_page.latency.upper_95))))) > 1000 and between (hour('US/Pacific'), 6, 23.5) ",

  "minutes": 50,

  "resolveAfterMinutes": 1,

  "severity": "INFO",

  "additionalInformation": "Properly formatted JSON",

  "tags": {

    "customerTags": [

      "alertTag1"

    ]
  }
}
```

Additional Details:

The following characters are reserved in JSON and must be properly escaped to be used in strings:

Backspace is replaced with \b
Form feed is replaced with \f
Newline is replaced with \n
Carriage return is replaced with \r
Tab is replaced with \t
Double quote is replaced with \"
Backslash is replaced with \\

For more information around JSON format please reference json.org and JSON Escape Strings.
--->
