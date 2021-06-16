---
title: Generate a Token for Tanzu Mission Control
keywords:
tags: [integrations, kubernetes]
sidebar: doc_sidebar
permalink: integrations_tmc.html
summary: Learn about Tanzu Mission Control and How to Generate a Token
---

[VMware Tanzu Mission Control](https://docs.vmware.com/en/VMware-Tanzu/services/tanzu-adv-deploy-config/GUID-components.html) provides a centralized management platform for consistently operating and securing your Kubernetes infrastructure and modern applications across multiple teams and clouds.

You can set up seamless authentication from Tanzu Mission Control to Tanzu Observability from the Tanzu Mission Control UI. Follow these high-level steps:
1. Inside Tanzu Observability by Wavefront, generate an API token (discussed below).
2. Inside Tanzu Mission Control, create a Tanzu Observability credential (link here) and paste the token into the credential.

{% include tip.html content="The account associated with the Wavefront token must have **Proxies** and **Integrations** permission. We recommend you use a service account." %}


## Generate a Service Account API Token for Tanzu Mission Control

Tanzu Observability by Wavefront supports user accounts and service accounts. We recommend that you create a service account API token to use with Tanzu Mission Control.

1. Log in to your Wavefront instance (&lt;instance_name&gt;.wavefront.com) as a user with **Accounts, Groups & Roles** permission.
2. From the gear icon in the top right, select **Account Management** and provide your password again when prompted.
3. Click **Service Accounts** and click **Create New Account**.
4. Specify the service account name and select the **Proxies** and **Integrations** permissions and click **Create**.
5. In the **Tokens** row click the **Copy to Clipboard** icon.
You can now paste this token into the Credentials field inside Tanzu Mission Control.
