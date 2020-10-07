---
title: VMware Tanzu™ Kubernetes Grid™ Integrated Edition Integration
tags: [integrations list]
permalink: tkgi.html
summary: Learn about the Wavefront VMware Tanzu™ Kubernetes Grid™ Integrated Edition Integration.
---
## VMware Tanzu™ Kubernetes Grid™ Integration

VMware Tanzu™ Kubernetes Grid™ Integrated Edition, previously called VMware PKS, enables operators to provision, operate, and manage enterprise-grade Kubernetes clusters. This integration uses the [wavefront-kubernetes-collector](https://github.com/wavefrontHQ/wavefront-kubernetes-collector), which runs natively in Kubernetes. The integration collects detailed metrics about the containers, namespaces, nodes, pods, deployments, services and the cluster itself. See [VMware Tanzu Kubernetes Grid Integration Details](https://docs.wavefront.com/integrations_tkgi.html) for a list of predefined alerts, an architecture overview, and troubleshooting info.

This integration explains how to configure Tanzu Kubernetes Grid Integrated Edition monitoring with Wavefront from the PKS tile present in PCF Ops Manager. After you've completed the integration setup, you can use Wavefront to monitor the Tanzu Kubernetes Grid Integrated Edition cluster.

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of the **Summary** dashboard.

{% include image.md src="images/db_summary.png" width="80" %}

## VMware Tanzu™ Kubernetes Grid™ Integrated Edition Setup

  Supported Version: VMware Tanzu Kubernetes Grid Integrated Edition 1.9 and later. See the [Documentation](https://docs.vmware.com/en/VMware-Pivotal-Container-Service/index.html) for details.

  **Note:**
  * For VMware Tanzu Kubernetes Grid Integrated Edition 1.4 through 1.8, see [VMware Tanzu Kubernetes Grid Integrated Edition (Archived)](../tkgi-archived/overview).
  * VMware Tanzu Kubernetes Grid Integrated Edition was previously called VMware PKS. For setup instructions for VMware PKS 1.1, 1.2, and 1.3 versions, log in to the Wavefront instance and see [VMware PKS (Archived)](../pks-archived/setup).

### Configuring the Wavefront Account

1. Log in to PCF Ops Manager and click the **Pivotal Container Service** tile in Installation Dashboard.
2. Under the **Settings** tab, click **Monitoring**.
3. In the right pane, check **Yes** to enable **Wavefront Integration** and enter the account information:
   * **Wavefront URL**: `https://YOUR_CLUSTER.wavefront.com/api`
   * **API Token**: `YOUR_API_TOKEN`
     * **NOTE:** Refer [Generating an API Token](https://docs.wavefront.com/wavefront_api.html#generating-an-api-token) for generating a token.
   * **Wavefront Alert Recipient**: `A list of Email addresses &/or Wavefront Target IDs`
4. Click the **Errands** tab and enable the **Create pre-defined Wavefront alerts** errand and the **Delete pre-defined Wavefront alerts** errand.
5. Click **Save** to save the Wavefront configuration.
6. Navigate back to the Installation dashboard and click **Apply Changes**.

Wavefront monitoring will be active for any cluster that is created after you have saved the configuration settings and applied the changes.


