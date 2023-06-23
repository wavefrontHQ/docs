---
title: Azure Deployment Manager Integration
tags: [integrations list]
permalink: adm.html
summary: Learn about the Azure Deployment Manager Integration.
---

This page provides an overview of what you can do with the Azure Deployment Manager integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Azure Deployment Manager integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Azure Deployment Manager** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Azure Deployment Manager Integration

The Microsoft Azure Deployment Manager (ADM) service helps you perform staged roll out of resources (global deployment across regions) in an ordered fashion.

While deploying a complex service, ADM lets you deploy resources, orchestrate high-level dependencies, and find potential problems before a service is deployed.

This integration uses the Wavefront REST API for ADM. ADM will invoke the API while executing the health check step as a part of its workflow.

### ADM Workflow with Wavefront
{% include image.md src="./adm_workflow.png" width="70" %}




