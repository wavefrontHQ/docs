---
title: View Traces Offline
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_view_offline_traces.html
summary: Download traces and view them later using offline traces.
---

You can export traces from the Tanzu Observability by Wavefront GUI. You can save traces locally as JSON files, and view them later using the **Offline Traces**.

## Export Traces

Follow the steps to export traces via the traces browser or the Wavefront API:
* Export the traces via the [Traces Browser](tracing_traces_browser.html) and save the JSON file.
* Export traces via the API.
  * Use the Wavefront Swagger UI. See [API Documentation (Wavefront Instance)](wavefront_api.html#api-documentation-wavefront-instance) for details on navigating to the Wavefront Swagger UI.
    <br/>Example:
    ![UI image showing where the API is on the Wavefront Swagger UI.](images/tracing_import_tracing_swagger_UI.png)
  * Use a `curl` command that has the `/api/v2/chart/api` URL.
    <br/>Example:
    ```
    curl -X GET --header "Accept: application/json" --header "Authorization: Bearer <Wavefront_Token>" "https://<Tenant_Name>.wavefront.com/api/v2/chart/api?q=limit(100%2C%20traces(spans(%22beachshirts.shopping.*%22)))&s=1601894248&g=d&view=METRIC&sorted=false&cached=true&useRawQK=false"
     ```

## View Traces

Upload the JSON file or feed the JSON response from the API to offline traces, and view trace data. You can only upload one JSON file at a time.

1. Click **Applications** > **Offline Traces**.
1. Click **Upload JSON**, select the JSON file you saved that has the imported trace data, and click **Open**.

Now, you see the trace data you imported.
![Shows how the offline traces look once you upload the JSOn file that has the imported trace details.](images/tracing_offline_tracing_view.png)
