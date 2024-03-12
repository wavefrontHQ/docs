---
title: Set Up and Manage a GCP Integration Through the API
keywords:
tags: [integrations, best practices]
sidebar: doc_sidebar
permalink: integrations_gcp_api.html
summary: Understand how to set up and manage the GCP integration by using our REST API.
---
The Google Cloud Platform integration allows you to ingest metrics directly from GCP to VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications). In addition to setting up and managing the GCP integration through the UI, you can also use the REST API for setting up and managing the GCP integration. This doc page provides some basic steps and examples on how to do this.

{% include note.html content="You must have the [**Proxy Management** permission](permissions_overview.html) to set up an GCP integration." %}

In these examples, you access the REST API through the interface, so that you don't need to provide the Bearer token.

## Before You Start

When you set up a Google Cloud Platform integration, you have to give the Tanzu Observability service permissions to access the data you want to visualize and analyze.

For information, see [Google Cloud Platform Overview and Permissions](integrations_gcp_overview.html).

## Create a GCP Service Account Retrieve a GCP JSON Key

1. Navigate to your [GCP dashboard page](https://console.cloud.google.com/home/dashboard).
2. Click **IAM & Admin**.
3. Select **Service Accounts**, and click the **Create Service Account** button on top.
4. On the **Service account details** page, enter a service account name. 
    For example, `my-integration`.
5. Click the **Create and Continue** button.
6. On the **Grant this service account access to project** page, in the **Select a role** drop-down menu, scroll down and select **Project > Viewer** to give read access.
7. Click the **Continue** button and on the next page click **Done**. created in Step 2, and click it.
8. On the Service accounts page, click the name of the service account that you just created. 
   In this example, click **my-integration**.
9. Click the **Keys** tab and from the **Add Key** drop-down menu, select **Create new key**.
10. Select **JSON** as the Key type and click **Create**.
11. Save the private key as a `.json` file and open it.


## Set Up a GCP Integration

You can add a GCP integration by using the REST API documentation UI.


1. Log in to your product cluster.
1. Click the gear icon in the top right and select **API Documentation**.
1. Expand the **Cloud Integration** category.
1. To create a new cloud integration, click the `POST /api/v2/cloudintegration` request.
1. To add an integration, in the **Edit Value** text box enter the following example.


     ```
      {
        "name": "integration-name",
        "service": "GCP",
        "gcp": {
          "metricFilterRegex": "",
          "gcpJsonKey": "private_key",
          "projectId": "project_id",
          "categoriesToFetch": [],
          "customMetricPrefix": [],
          "disableHistogram": false,
          "disableHistogramToMetricConversion": true,
          "histogramGroupingFunction": [],
          "disableDeltaCounts": true
        },
        "serviceRefreshRateInMins": 5
      }
        
    ```

    In this example, replace `private_key` with the value of the `private key` from the JSON file and `project_id` with the value of the `project_id` in your JSON file.

1. Click **Execute**.


## Update a GCP Integration

You can update a GCP integration through the API.

In this example, we update an existing GCP integration to retrieve the metrics **only** for the following list of categories:

* Apigee
* App Engine
* Cloud Functions
* Cloud Run

We also change the service refresh rate from `5` to `10` minutes.


1. In the REST API documentation UI, click the `GET/api/v2/cloudintegration` request.
1. Click **Execute**.

   In the **Response Body** section, you can see the list of all configured cloud services integrations. For example, for a GCP integration you see:

    ```
      {
        "forceSave": false,
        "name": "integration-name",
        "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeee",
        "service": "GCP",
        "disabled": false,
        "inTrash": false,
        "creatorId": "user-account-email-address",
        "updaterId": "user-account-email-address",
        "lastReceivedDataPointMs": 1690204240391,
        "gcp": {
          "projectId": "my-project-id",
          "gcpJsonKey": "{\"project_id\": \"my-project-id\"}",
          "disableHistogramToMetricConversion": true,
          "disableDeltaCounts": true,
          "categoriesToFetch": [],
          "customMetricPrefix": [],
          "disableHistogram": false,
          "histogramGroupingFunction": [],
          "metricFilterRegex": ""
        },
        "lastProcessorId": "c09797d7-f2c9-4253-8fcb-77fbad50a97c",
        "lastProcessingTimestamp": 1690204240721,
        "createdEpochMillis": 1690204240387,
        "updatedEpochMillis": 1690204240387,
        "serviceRefreshRateInMins": 5,
        "deleted": false
      }
    ```

   In this example, you can see that there are no categories listed under `"categoriesToFetch"` and the service refresh rate is 5 minutes.

1. Copy the value of the `"id"` parameter of the integration that you want to update.
1. Copy the content of the response in a text file.
1. Edit the copied response body.

   1. To update the list of services, under `"categoriesToFetch"`, add Apigee, App Engine, Cloud Functions, and Cloud Run:

      ![Updated list of services.](images/gcp-api-update-services.png)

       {% include note.html content="The values that we pass as `categoriesToFetch` are not the same as the ones displayed in the Tanzu Observability UI." %}

   1. To change the service refresh rate to 10 minutes, update the `"serviceRefreshRateInMins"` value:

      ![Updated service refresh rate from 5 to 10 minutes.](images/aws-api-update-refresh-rate.png)

   The updated response body will look like that:

    ```
      {
        "name": "integration-name",
        "service": "GCP",
        "gcp": {
          "metricFilterRegex": "",
          "gcpJsonKey": "{\"project_id\": \"my_project_id\"}",
          "categoriesToFetch": [
            "APIGEE",
            "APPENGINE",
            "CLOUDFUNCTIONS",
            "RUN"
          ],
          "customMetricPrefix": [],
          "disableHistogram": false,
          "disableHistogramToMetricConversion": true,
          "histogramGroupingFunction": [],
          "disableDeltaCounts": true,
          "projectId": "project_id"
        },
        "serviceRefreshRateInMins": "10"
      }

   ```

   {% include note.html content="The values that we pass as `categoriesToFetch` are not the same as the ones displayed in the Tanzu Observability UI." %}
   
1. In the REST API documentation UI, click the `PUT /api/v2/cloudintegration/{id}` request.
1. Under **Parameters**, in the **id** text box enter the ID of the integration that you want to update.
1. In **Edit Value** text box enter the edited response body with the updated categories to fetch and the new service refresh rate.
1. Click **Execute**.
1. Verify that the response returns `200` status code to indicate that the update was successful.

## Enable and Disable a GCP Integration

Tanzu Observability automatically disables integrations that are experiencing errors due to invalid credentials. To enable an integration after the credential has been corrected or to manually disable an integration, you need the integration ID.

1. In the REST API documentation UI, click the `GET/api/v2/cloudintegration` request.
1. Click **Execute**.

   In the **Response Body** section, you can see the list of all configured cloud services integrations. For example, for a GCP integration you see:

    ```
      {
        "forceSave": false,
        "name": "integration-name",
        "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeee",
        "service": "GCP",
        "disabled": false,
        "inTrash": false,
        "creatorId": "user-account-email-address",
        "updaterId": "user-account-email-address",
        "lastReceivedDataPointMs": 1690204240391,
        "gcp": {
          "projectId": "my-project-id",
          "gcpJsonKey": "{\"project_id\": \"my-project-id\"}",
          "disableHistogramToMetricConversion": true,
          "disableDeltaCounts": true,
          "categoriesToFetch": [
            "APIGEE",
            "APPENGINE",
            "CLOUDFUNCTIONS",
            "RUN"
          ],
          "customMetricPrefix": [],
          "disableHistogram": false,
          "histogramGroupingFunction": [],
          "metricFilterRegex": ""
        },
        "lastProcessorId": "c09797d7-f2c9-4253-8fcb-77fbad50a97c",
        "lastProcessingTimestamp": 1690204240721,
        "createdEpochMillis": 1690204240387,
        "updatedEpochMillis": 1690204240387,
        "serviceRefreshRateInMins": 10,
        "deleted": false
      }
    ```

1. Copy the value of the `"id"` parameter of the cloud integration that you want to enable or disable.
1. To enable the integration, run the `POST /api/v2/cloudintegration/{id}/enable` request with the ID of the integration that you want to enable.
1. To disable the integration, run the `POST /api/v2/cloudintegration/{id}/disable` request with the ID of the integration that you want to disable.

## Delete and Recover a Deleted GCP Integration

To delete a cloud service integration that you no longer want to use, you need the integration ID. If you decide to move the integration to the recycle bin, you can recover it at a later stage.

1. In the REST API documentation UI, click the `GET/api/v2/cloudintegration` request.
1. Click **Execute**.

   In the **Response Body** section, you can see the list of all configured cloud services integrations. For example, for a GCP integration you see:

    ```
      {
        "forceSave": false,
        "name": "integration-name",
        "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeee",
        "service": "GCP",
        "disabled": false,
        "inTrash": false,
        "creatorId": "user-account-email-address",
        "updaterId": "user-account-email-address",
        "lastReceivedDataPointMs": 1690204240391,
        "gcp": {
          "projectId": "my-project-id",
          "gcpJsonKey": "{\"project_id\": \"my-project-id\"}",
          "disableHistogramToMetricConversion": true,
          "disableDeltaCounts": true,
          "categoriesToFetch": [
            "APIGEE",
            "APPENGINE",
            "CLOUDFUNCTIONS",
            "RUN"
          ],
          "customMetricPrefix": [],
          "disableHistogram": false,
          "histogramGroupingFunction": [],
          "metricFilterRegex": ""
        },
        "lastProcessorId": "c09797d7-f2c9-4253-8fcb-77fbad50a97c",
        "lastProcessingTimestamp": 1690204240721,
        "createdEpochMillis": 1690204240387,
        "updatedEpochMillis": 1690204240387,
        "serviceRefreshRateInMins": 10,
        "deleted": false
      }
    ```

1. Copy the value of the `"id"` parameter of the integration that you want to delete.
1. To delete the integration, click the `DELETE /api/v2/cloudintegration/{id}` request.
   1. Under **Parameters**, in the **id** text box enter the ID of the integration that you want to delete.
   1. From the **skipTrash** drop-down menu select whether you want to keep the deleted integration in the recycle bin.

      * Select **false**, to move the integration to the recycle bin, so that you can recover it at a later stage.
      * Select **true**, to delete the integration forever. You won't be able to recover it.

   1. Click **Execute**.
1. To recover an integration from the recycle bin, i.e., an integration that **was not** permanently deleted, in the REST API documentation UI, click the `POST /api/v2/cloudintegration/{id}/undelete` request.
   1. Under **Parameters**, in the **id** text box enter the ID of the integration that you want to recover.
   1. Click **Execute**.
