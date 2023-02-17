---
title: Generate a Token for Tanzu Mission Control
keywords:
tags: [integrations, kubernetes]
sidebar: doc_sidebar
permalink: integrations_tmc.html
summary: Learn about Tanzu Mission Control and how to generate a token.
---

[VMware Tanzu Mission Control](https://docs.vmware.com/en/VMware-Tanzu-Mission-Control/services/tanzumc-concepts/GUID-E2B5BE05-596E-4999-9B21-1CDB875A1BBF.html) provides a centralized management platform for consistently operating and securing your Kubernetes infrastructure and modern applications across multiple teams and clouds.

You can set up seamless authentication from Tanzu Mission Control to VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) from the Tanzu Mission Control console. Follow these high-level steps:
1. In the VMware Aria Operations for Applications GUI, generate an API token (discussed below).
2. From the Tanzu Mission Control console, create a [credential](https://docs.vmware.com/en/VMware-Tanzu-Mission-Control/services/tanzumc-using/GUID-A70E57A8-2C45-46D4-8E1F-6D5E7026473F.html) and paste the token into the credential.

{% include tip.html content="The account associated with the generated API token must have **Proxies** and **Integrations** permission. To avoid problems, for example when a (human) user leaves or is not available, use a service account." %}


## Generate a Service Account API Token for Tanzu Mission Control

We support user accounts and service accounts. It is recommended that you create a service account API token to use with Tanzu Mission Control.

1. Log in to your cluster (`https://<example>.wavefront.com`, for example, `https://company1.wavefront.com`), as a user with the **Accounts** permission.
2. Click the gear icon <i class="fa fa-cog"/> in the top right of the toolbar, select **Accounts**, and provide your password again when prompted.
3. Click **Service Accounts** and click **Create New Account**.
4. Specify the service account name, select the **Proxies** and **Integrations** permissions, and click **Create**.
5. Select the newly created token and click the **Copy to Clipboard** icon in the **Tokens** row.
You can now paste this token into the Credentials field inside Tanzu Mission Control.

Here's a screenshot of the Edit Service Account screen inside the VMware Aria Operations for Applications GUI.

![Edit Service account shows copy to clipboard. Integrations and Proxies permissions are selected](images/tmc_service_account.png)
