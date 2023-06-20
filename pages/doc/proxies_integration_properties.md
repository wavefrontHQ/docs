---
title: Proxy Authentication Properties
keywords: 
tags: 
sidebar: doc_sidebar
permalink: authentication_properties.html
summary: Learn more about the authentication properties that you must provide when you install the Wavefront proxy.
---

Before you can install a Wavefront proxy, you have to find the values for your environment. 

* If your VMware Aria Operations for Applications service is **not** onboarded to VMware Cloud services, you need an API token associated with an active user or service account.
* If your VMware Aria Operations for Applications service **is** onboarded to VMware Cloud services, you either need server to server OAuth app credentials or a valid VMware Cloud services API token.

{% include note.html content="To find how to set up an integration, click **Integrations** on the toolbar, navigate to the integration you are interested in and click it's tile. On the **Setup** tab of the integration, you will find the most recent instructions." %}

## Authentication Properties

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Property</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">**server**</td>
<td>URL of your Operations for Applications service instance.  </td>
</tr>
<tr>
<td><strong>token</strong></td>
<td>A valid Operations for Applications token associated with an active user or service account. The account must have the <strong>Proxies</strong> permission.<p><strong>Note:</strong> Applies only to <strong>original</strong> Operations for Applications subscriptions that are not onboarded to VMware Cloud services, i.e. when <a href="proxies_installing.html#proxy-authentication-types">the proxy authenticates</a> to Operations for Applications with an Operations for Applications API token.</p></td>
<td></td>
</tr>
<tr>
<td><p><strong>cspAppId</strong></p><p><strong>cspAppSecret</strong></p><p><strong>cspOrgId </strong></p></td>
<td>Server to server OAuth app credentials - ID and secret (<strong>cspAppId</strong> and <strong>cspAppSecret</strong>), and the VMware Cloud organization ID (<strong>cspOrgId</strong>) running the Operations for Applications service instance. The server to server app must have the <strong>Proxies</strong> service role and must belong to the VMware Cloud organization running the Operations for Applications service instance. 
<p><strong>Note:</strong> Applies only to Operations for Applications subscriptions <strong>onboarded</strong> to VMware Cloud services if <a href="proxies_installing.html#proxy-authentication-types">the proxy authenticates</a> to Operations for Applications with a VMware Cloud services OAuth app.</p> </td>
<td></td>
</tr>
<tr>
<td><strong>cspAPIToken</strong></td>
<td>A valid VMware Cloud services API token associated with an active user account. The user and the token must have the <strong>Proxies</strong> service role.
<p><strong>Note:</strong> Applies only to Operations for Applications subscriptions <strong>onboarded</strong> to VMware Cloud services if <a href="proxies_installing.html#proxy-authentication-types">the proxy authenticates</a> to Operations for Applications with a VMware Cloud services token.</p>
</td>
<td></td>
</tr>
</tbody>
</table>

## Example: Commands for Installing the Proxy on a Windows Host

When you install the Wavefront proxy on a Windows host, the commands vary depending on whether your Operations for Applications service is onboarded to VMware Cloud services. 

### Onboarded Subscriptions  

When your service **is** onboarded to VMware Cloud services, after you download the Wavefront proxy, use the following procedure:

1. Open the Windows command prompt as an administrator.
2. Navigate to the directory in which you downloaded the installer.
3. Depending on the authentication type that you want to use, the command and the authentication parameters that you must provide vary:

    * **OAuth App** authentication: 
    
        ```
        .\wavefront-proxy-setup.exe --server https://YOUR_CLUSTER.wavefront.com/api --cspAppId <CSP_APP_ID> --cspAppSecret <CSP_APP_SECRET> --cspOrgId <CSP_ORG_ID> /SILENT
        ```
        
        Here, `<CSP_APP_ID>` is the app client ID and `<CSP_APP_SECRET>` is the app client secret of an existing server to server app which has the **Proxies** service role assigned and is added to the VMware Cloud organization running the service.  `<CSP_ORG_ID>` is the ID of the VMware Cloud organization running the service.
        
        If you don't have a server to server app already, you can create one in the VMware Cloud Services Console. For details, see [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.

    * **API Token** authentication:

        ```
        .\wavefront-proxy-setup.exe --server https://YOUR_CLUSTER.wavefront.com/api --cspAPIToken <CSP_API_TOKEN> /SILENT
        ```

        Here, `<CSP_API_TOKEN>` is a valid [VMware Cloud services API token](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html) associated with an active user account.

### Original Subscriptions

When your service is **not** onboarded to VMware Cloud services, and you download the Wavefront proxy, use the following procedure:

1. Open the Windows command prompt as an administrator.
2. Navigate to the directory in which you downloaded the installer.
3. Run the following command:

    ```
    .\wavefront-proxy-setup.exe --server https://YOUR_CLUSTER.wavefront.com/api --token <YOUR_API_TOKEN> /SILENT
    ```

    Here, `<YOUR_API_TOKEN>` is a valid [Operations for Applications token](api_tokens.html) associated with an active user or service account. 

## Example: Prometheus Configuration

When you configure the Prometheus integration and deploy the Wavefront proxy as a pod, the configuration varies depending on whether your Operations for Applications service is onboarded to VMware Cloud services. 

### Onboarded Subscriptions  

When your service **is** onboarded to VMware Cloud services, depending on the authentication type that you want to use, use one of the following configurations.

*  **OAuth App** authentication: 
   
   1. In your Operations for Applications instance, click **Integrations** on the toolbar, search for Prometheus, and click the **Prometheus** integration tile.
   2. On the **Setup** tab, under **Configure the Authentication**, select **OAuth App** for authentication type.
   3. Scroll down to **Use-Case 2: Making Data in Prometheus Available in Wavefront**, **Kubernetes based Prometheus Server**.
   4. Create a `wavefront.yaml` file on your system.
   5. Copy the configuration displayed under **Step 1**.
   2. Edit the `wavefront.yaml` file and provide your existing server to server app credentials and organization ID. 
   
      The app must have the **Proxies** service role assigned and must be added to the VMware Cloud organization running the service.
   
      * `<CSP_APP_ID>` -- server to server app client ID
      * `<CSP_APP_SECRET>` -- server to server app client secret 
      * `<CSP_ORG_ID>` -- the ID of the VMware Cloud organization running the service
    
     If you don't have a server to server app already, you can create one in the VMware Cloud Services Console. For details, see [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.

* **API Token** authentication:

   1. In your Operations for Applications instance, click **Integrations** on the toolbar, search for Prometheus, and click the **Prometheus** integration tile.
   2. On the **Setup** tab, select **API Token** for authentication type.
   3. Scroll down to **Use-Case 2: Making Data in Prometheus Available in Wavefront**, **Kubernetes based Prometheus Server**.
   4. Create a `wavefront.yaml` file on your system.
   5. Copy the configuration displayed under **Step 1**.
   6. Edit the `wavefront.yaml` file and provide your `<CSP_API_TOKEN>`, which must be a valid [VMware Cloud services API token](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html) associated with an active user account.
  
  
### Original Subscriptions

When your service is **not** onboarded to VMware Cloud services, download and save the [`wavefront.yaml`](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes/master/wavefront-proxy/wavefront.yaml) file and set `WAVEFRONT_URL` to `https://<your_cluster>.wavefront.com/api/` and `WAVEFRONT_TOKEN` to `YOUR_API_TOKEN`. See [Managing Operations for Applications tokens](api_tokens.html) for details.
