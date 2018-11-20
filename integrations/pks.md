---
title: VMware PKS Integration
tags: [integrations list]
permalink: pks.html
summary: Learn about the Wavefront VMware PKS Integration.
---
## VMware PKS Integration

VMware PKS enables operators to provision, operate, and manage enterprise-grade Kubernetes clusters on Pivotal Cloud Foundry (PCF). This integration uses [Heapster](https://github.com/kubernetes/heapster), a collector agent that runs natively in Kubernetes and [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics), a simple service that listens to the Kubernetes API server and generates metrics. The integration collects detailed metrics about the containers, namespaces, nodes, pods, deployments, services and the cluster itself and sends them to a Wavefront.

This integration explains how to configure VMware PKS monitoring with Wavefront from the PKS tile present in PCF Ops Manager. After you've completed the integration setup, you can use Wavefront to monitor the VMware PKS cluster.

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of **Overview** and **Nodes** section of the dashboard.

{% include image.md src="images/db_overview.png" width="80" %}

## VMware PKS Setup

  Supported Version: VMware PKS 1.1 and later. See the [Documentation](https://docs.vmware.com/en/VMware-Pivotal-Container-Service/index.html) for details.

### Configuring the Wavefront Account

1. Log in to PCF Ops Manager and click the **Pivotal Container Service** tile in Installation Dashboard.
2. Under the **Settings** tab, click **Monitoring**.
3. In the right pane, check **Yes** to enable **Wavefront Integration** and enter the account information:
   * **Wavefront URL**: `https://YOUR_CLUSTER.wavefront.com/api`
   * **API Token**: `YOUR_API_TOKEN`
   * **Wavefront Alert Recipient**: `A list of Email addresses &/or Wavefront Target IDs`
4. Click the **Errands** tab and enable the **Create pre-defined Wavefront alerts** errand and the **Delete pre-defined Wavefront alerts** errand.
5. Click **Save** to save the Wavefront configuration.
6. Navigate back to the Installation dashboard and click **Apply Changes**.

Wavefront monitoring will be active for any cluster that is created after you have saved the configuration settings and applied the changes.
