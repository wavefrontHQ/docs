---
title: Catchpoint Integration
tags: [integrations list]
permalink: catchpoint.html
summary: Learn about the Wavefront Catchpoint Integration.
---
## Catchpoint Integration

Catchpoint is a unified end-user monitoring platform which combines proactive and real user monitoring to provide total visibility into every layer of the digital delivery chain, including Networks, Code, CDNs, DNS, Services, APIs, SaaS services, and more.

This integration configures Catchpoint `Test data webhook` to send metrics to the Wavefront service.

### Dashboards

Wavefront provides Catchpoint Tests dashboard for detailed monitoring:

- Catchpoint: WEB
- Catchpoint: DNS
- Catchpoint: Ping
- Catchpoint: API
- Catchpoint: FTP
## Setup

This integration configures Catchpoint `Test Data Webhook` to publish `JSON` output data to the Wavefront service.

### Create Test Data Webhook
1. Log in to Catchpoint.
2. Navigate to **Settings > API > Test Data Webhook > Add URL**.
3. Specify the URL as `https://cps.wavefront.com/report` and the format as `JSON`.
4. Optionally, you can specify a list of `Email Addresses` to notify in case an agent fails to post data.
5. Below is the list of `Headers` that need to be sent as a part of `Request`.

#### Required Headers
-------     ------
    Content-Type          application/json    
    Wavefront-Cluster     https://YOUR_CLUSTER.wavefront.com
    Wavefront-Secret      YOUR_API_TOKEN
-------     ------

#### Optional Headers  
-------     ------
    Metrics-Prefix              Metric prefix (Default - catchpoint)
    Metrics-Blacklist           A comma-separated list of regex to blacklist the metrics
    Metrics-Whitelist           A comma-separated list of regex to whitelist the metrics
    Disable-Default-Blacklist   By default, the integration blocks some metrics (hostcollections, action, contentzones,
                                diagnostic). To white-list these metrics, set this parameter to true. Default is false.
-------     ------

### Enable Test Data Webhook
By default, Catchpoint will not push any data to the subscriber unless the test has been enabled for the `Test Data Webhook`. This allows you to only receive data for tests that matter, and ignore any tests that might not have importance.

In order to assign tests results to the subscriber you should add the `Test Data Webhook` to the desired product containing the tests. To accomplish this, follow the below steps:

1. Navigate to **Tests>Product**.
2. Select and Edit the `Product`.
3. Enable `Test Data Webhook` and choose above created `Test Data Webhook` from the drop down.
4. To assign Test Data Webhook to Tests, go to any test in the Product and check the checkbox for `Enable Test Data Webhook`.

Click [here](https://support.catchpoint.com/hc/en-us/articles/115005282906) for more information.


