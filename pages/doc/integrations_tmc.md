---
title: Generate a Token for Tanzu Mission Control
keywords:
tags: [integrations, kubernetes]
sidebar: doc_sidebar
permalink: integrations_tmc.html
summary: Learn about Tanzu Mission Control and How to Generate a Token
---

[VMware Tanzu Mission Control](https://docs.vmware.com/en/VMware-Tanzu-Mission-Control/services/tanzumc-concepts/GUID-E2B5BE05-596E-4999-9B21-1CDB875A1BBF.html) provides a centralized management platform for consistently operating and securing your Kubernetes infrastructure and modern applications across multiple teams and clouds.

You can set up seamless authentication from Tanzu Mission Control to Tanzu Observability from the Tanzu Mission Control console. Follow these high-level steps:
1. Inside Tanzu Observability by Wavefront, generate an API token (discussed below).
2. From the Tanzu Mission Control console, create a [Tanzu Observability credential]( https://docs.vmware.com/en/VMware-Tanzu-Mission-Control/services/tanzumc-using/GUID-A70E57A8-2C45-46D4-8E1F-6D5E7026473F.html) and paste the token into the credential.

{% include tip.html content="The account associated with the Wavefront token must have **Proxies** and **Integrations** permission. To avoid problems, for example when a (human) user leaves or is not available, use a service account." %}


## Generate a Service Account API Token for Tanzu Mission Control

Tanzu Observability by Wavefront supports user accounts and service accounts. We recommend that you create a service account API token to use with Tanzu Mission Control.

1. Log in to your Wavefront instance (`<instance_name>.wavefront.com`, for example, `company1.wavefront.com`, as a user with **Accounts** permission.
2. From the gear icon in the top right, select **Accounts** and provide your password again when prompted.
3. Click **Service Accounts** and click **Create New Account**.
4. Specify the service account name and select the **Proxies** and **Integrations** permissions and click **Create**.
5. Select the newly created token and, click the **Copy to Clipboard** icon in the **Tokens** row.
You can now paste this token into the Credentials field inside Tanzu Mission Control.

Here's a screenshot of the Edit Service Account screen inside Tanzu Observability by Wavefront.

![Edit Service account shows copy to clipboard. Integrations and Proxies permissions are selected](images/tmc_service_account.png)
