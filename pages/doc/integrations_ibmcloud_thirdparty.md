---
title: IBM Cloud Integration (Third-Party Content)
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_ibmcloud_thirdparty.html
published: false
summary: Instructions for setting up IBM Cloud Integration
---

<!---Canging this page to published: false. Can't know whether the content is still up to date--->

This page describes how to install Wavefront on IBM Cloud. The content was generously contributed to the [Wavefront documentation repository](https://github.com/wavefrontHQ/docs/pull/177) and has been lightly edited for consistency.

{% include note.html content="We have included these instructions because we believe they are useful. We have not performed any independent testing of these instructions." %}

The process consists of these steps, discussed in detail below.

- Step 1: Provision a Kubernetes Cluster
- Step 2: Deploy IBM Cloud Block Storage Plug-In
- Step 3: Deploy Wavefront
- Step 4: Verify the Installation

{% include note.html content="These instructions assume that Wavefront is available in your IBM Cloud environment. " %}

## Prerequisites

To follow the steps on this page, you  need an IBM Cloud Pay-As-You-Go account or Subscription account. See  [https://cloud.ibm.com/docs/account?topic=account-accounts](https://cloud.ibm.com/docs/account?topic=account-accounts).


##  Step 1: Provision a Kubernetes Cluster

1. Log in to your IBM Cloud Account and search for **Kubernetes**.
3. Select **Kubernetes Service** from the list.

![kubernetes shown in search box and selected](images/ibm_cloud_create_kubernetes.png)

You are redirected to the Kubernetes cluster creation instructions at [https://cloud.ibm.com/kubernetes/catalog/create]https://cloud.ibm.com/kubernetes/catalog/create.

### Option A: Create a Free Kubernetes Cluster

To create a free IBM Cloud Kubernetes cluster:
1. Enter a name for your Kubernetes cluster and click **Create**.
2. Wait a few moments for the provisioning to complete.

![screenshot with Pricing Plan free and cluster name selected](images/ibm_create_free_cluster.png)


### Option B: Create Standard Kubernetes Cluster

A standard IBM Cloud Kubernetes cluster has the following attributes:
* Infrastructure: Classic
* Availability: Multi Zone
* Metro: Dallas
* 4 VCPU
* 16 GB RAM
* Worker nodes per zone: 3

To create a standard IBM Cloud Kubernetes cluster:

1. Enter a name for the cluster, make selections as shown in the screenshot below, and click **Create**.
2. Wait a few moments for the provisioning to complete.

![screenshot of options for standard cluster creation](images/ibm_standard_cluster_create.png)


##  Step 2: Deploy the IBM Cloud Block Storage Plug-In


1. Log in to your IBM Cloud Account, search for **Block Storage**, and select **Block Storage** from the list.
2. On the Block Storage page, click  **Create** in the bottom right.
3. Specify the storage details.

   Here's an example setup:

    * **Location**: Location of the cluster, for example, `Location > Europe > London > LON02`
    * **Billing Method**: `Monthly> 20 GB`
    * **OS type**: `Linux`
    * **IOPS**: `2 IOPS/GB`

4. Select **I have agreed to the terms and conditions listed below**. A storage plug-in becomes available in the dashboard.

The following example screenshot illustrates one possible configuration.

![screenshot of block storage page with location, details, and IOPS profile filled in](images/ibm_block_storage_example.png)


##  Step 3: Deploy Wavefront

{% include note.html content="These instructions assume that Wavefront is available in your IBM Cloud environment. " %}

1. Log in to your IBM Cloud Account and search for **Wavefront**.
2. Select **Wavefront**.
3. In the Wavefront page specify the following settings:
  * **Target**: IBM Kubernetes Service
  * **Method**: Helm chart
  * **Kubernetes cluster**: mycluster-free
  * **Target namespace**: wavefront
  * **Workspace**: wavefront
  * **Resource group**: Default
4. Read the terms and conditions and select **I have agreed to the terms and conditions listed below**.
5. Click **Install** and wait for the deployment process to complete.

The following screenshot shows an example:

![IBM Cloud Wavefront page](images/ibm_wavefront_deployment.png)


##  Step 4: Verify the Installation

To verify the installation, let's install a terminal and run some `kubectl` commands. Follow these steps:

1. Select **Kubernetes** in the menu on the left.
2. Select your cluster, in this example, we called it `mycluster-free`.
   ![image](images/ibm_select_myclusterfree.png)
3. In the cluster overview page, select **Actions > Web terminal** and click **Install** to install a Kubernetes Terminal.
   ![image](images/ibm_install_webterminal.png)
4. After completing the installation click **Actions > Web terminal** again to start a terminal.
5. Run the following commands to examine your cluster.

   `kubectl get ns` returns the list of pods.

    ![image](images/ibm_get_pod_list.png)

   `kubectl get pod -n wavefront -o wide` checks whether the `wavefront` pod is running.

    ![image](images/ibm_wavefront_status.png)


The Installation is now done! Enjoy!
