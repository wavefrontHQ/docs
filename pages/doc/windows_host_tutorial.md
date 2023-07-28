---
title: Windows Host Integration Tutorial
keywords:
tags: [tutorials]
sidebar: doc_sidebar
permalink: windows_host_tutorial.html
summary: Get data from a Windows host and monitor in VMware Aria Operations for Applications.
---

Starting July 3, 2023, Operations for Applications is a service on the VMware Cloud services platform. After this date, we support two types of subscriptions: 
* Operations for Applications subscriptions **onboarded** to the VMware Cloud services platform.
* **Original** subscriptions -- the existing ones which remain as is until they migrate to VMware Cloud services. 

In this tutorial, you’ll learn how to ingest data from a Windows host machine to Operations for Applications by using a Wavefront proxy. Although Operations for Applications supports direct ingestion, in production environments, using a Wavefront proxy is the recommended way for ingesting data.

## Onboarded Subscriptions

When your service **is onboarded** to VMware Cloud services, the Wavefront proxy requires a VMware Cloud services access token with the **Proxies** service role. There are two options for the proxy to retrieve the access token and you can configure the proxy with:

- A server to server OAuth app that belongs to the VMware Cloud organization running the service.

- An API token that belongs to your user account in the VMware Cloud organization running the service. 
   
  Note that you must regenerate and reconfigure the user account API Token periodically. This depends on the token TTL configuration.

In this tutorial, we will create a server to server OAuth app in VMware Cloud services and we'll retrieve the necessary credentials. Then we will install the Wavefront proxy and the Telegraf agent on the same Window host and we'll start to monitor the metrics flowing from the same Windows host.

### Step 1: Create a Server to Server OAuth App

Let's create a server to server OAuth app and retrieve the app ID and app secret. You will need the app ID and app secret when you install the Wavefront proxy.

1. Navigate to the VMware Cloud Services Console as a user with the required permissions, such as **Organization Owner**, **Organization Administrator**, or an **Organization Member** with the **Developer** additional role assigned.

   For details, see [What Organization roles are available in VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html).

2. Click **Organization > OAuth Apps** and click **Create App**.
3. Select **Server to server app** and click **Continue**.
4. Provide a meaningful app name and description.
   For example:
   * **App Name**: `wavefront_proxy`.
   * **App Description**: `Server to server app that I will use for my Windows integration setup.`
5. In the **Access Token TTL** field, specify the time to live for the access token of your server to server app. 
6. Define the scopes by assigning roles to the server to server app.
   For example:
   * Assign the **Organization Member** organization role.
   * Search for `Operations for Applications` in the list of scopes, expand VMware **Operations for Applications** and select **Proxies** and **Viewer**.
    
   {% include note.html content="Note that these are the minimum required roles for the server to server app that you'll use to install the Wavefront proxy." %}

7. Click **Create**.
8. On the **OAuth app created** screen, click **Download JSON**, save the file to a secure place and click **Continue**.
   
   The JSON file contains the app ID and app secret that you need when you install the Wavefront proxy.

### Step 2: Add the Server to Server App to the Organization

We add the app to the organization.

1. Click **Identity & Access Management > OAuth Apps** and click **Add App**.
2. Select **Enter App ID** and paste the app ID from the JSON file.
   
   You see the app details.

3. In a multi-tenant environment, you can assign the app to different tenants.
    1. Click **Add an instance**.
    2. Select the tenant from the drop-down menu and assign the same roles to the app.

   {% include note.html content="Only services and roles allowed by the app scope can be selected." %}


4. Click **Add**.

### Step 3: Retrieve the Organization ID

You will need the organization ID when you install the Wavefront proxy.

1. In the VMware Cloud Services Console, click your user name.
2. You see the name of the organization and the organization ID below it.
3. Click the **Copy** icon.
4. Paste the organization ID in a text file to have it handy.

{% include note.html content="To install the Wavefront proxy you need the long organization ID." %}


### Step 4: Navigate to Operations for Applications

1. In the VMware Cloud Services Console, click VMware Cloud Services.
2. Navigate to the VMware Aria Operations for Applications tile.
3. Click **Launch Service**.
   In a multi-tenant environment, you should also select the tenant to which you added the server to server OAuth app.

### Step 5: Start the Setup Process

1. In your Operations for Applications service instance, click **Integrations** on the toolbar.
2. Click the **Windows Host** tile.
3. Click the **Setup** tab.

### Step 6: Install the Wavefront Proxy

1. Download [wavefront-proxy-setup.exe](https://s3-us-west-2.amazonaws.com/wavefront-cdn/windows/wavefront-proxy-setup.exe) file.
2. In a command prompt, navigate to the directory in which you downloaded the installer.
3. Run the command to install the Wavefront proxy:

    ```
    .\wavefront-proxy-setup.exe /server=https://<your_product_cluster>.wavefront.com/api/ /cspAppId=<CSP_APP_ID> /cspAppSecret=<CSP_APP_SECRET> /cspOrgId=<CSP_ORG_ID> /SILENT

    ```
    Here, you must replace:
    
    * `<CSP_APP_ID>` with the app ID of your server to server app
    * `<CSP_APP_SECRET>` with the app secret of your server to server app
    * `<CSP_ORG_ID>` with the ID of your organization

Once installed, the proxy automatically starts. Check `Program Files (x86)\Wavefront\wavefront.log` to verify the installation.

### Step 7: Install the Telegraf Agent

1. Download [wavefront-telegraf-64-setup.exe](https://s3-us-west-2.amazonaws.com/wavefront-cdn/windows/wavefront-telegraf-64-setup.exe). 
2. Double-click the installer and follow the instructions to install Telegraf.

### Step 8: Verify That Metrics Are Flowing

When the Wavefront proxy and the Telegraf agent are installed and the proxy starts ingesting data to Operations for Applications, on the **Metrics** tab, you'll see the metrics that are flowing along with charts for each metric.

![Screenshot of the Windows host Metrics tab with metrics that are flowing](images/windows-host-metrics-tab.png)

On the **Dashboards** tab, you can see that the Windows Host dashboard installed. Click the **Windows Host Metrics** dashboard link and the dashboard opens in another browser tab.

![Screenshot of the Windows host metrics dashboard](images/windows-host-dashboard.png)

## Original Subscriptions

Watch the following video to learn how to ingest Windows host metrics when your service is **not onboarded** to VMware Cloud services. 

Note that this video was created in 2021 and some of the information in it might have changed. It also uses the 2021 version of the UI.
<p>
<iframe id="kmsembed-1_0bbze8os" width="608" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_0bbze8os/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="Setting up a Windows integration"></iframe>
</p>
You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_0bbze8os" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/>

