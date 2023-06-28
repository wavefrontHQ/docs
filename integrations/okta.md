---
title: Okta Integration
tags: [integrations list]
permalink: okta.html
summary: Learn about the Okta Integration.
---
## Okta Integration

Okta is a popular identity management product that can be integrated with Wavefront to enable single sign-on.
## Okta Setup

**Note**: This integration is not applicable if your Operations for Applications service is onboarded to VMware Cloud services. If your service is onboarded to VMware Cloud services, you can [set up enterprise federation for your corporate domain](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html).

After setting up the Okta integration, users can authenticate to Wavefront through Okta instead of using a password.  New users who did not exist in Wavefront are auto-created on the Wavefront side when they authenticate for the first time.


### Step 1. Create the Wavefront Application in Okta

**Note:** Steps 1 - 12 are only required if the Wavefront application is not present in Okta. Otherwise, proceed to step 13 to copy and paste the metadata.
1. In Okta, click **Add Applications**. 
1. Click **Create New App**. 
1. In the Create a New Application dialog, select **SAML 2.0** and click **Create**.
1. In the **App name** field, type **Wavefront**.
1. Right-click and save the Wavefront logo: 
   {% include image.md src="images/wavefront_logo_okta.png" width="25" %}
1. In the **App logo** field, browse to the logo file and click **Upload Logo**.
1. Click **Next**. 
1. Enter the following SAML settings:
    - **Single sign on URL** - https://YOUR_CLUSTER.wavefront.com/api/saml/login
    - **Use this for Recipient URL and Destination URL** - Checked
    - **Audience URI (SP Entity ID)** - https://YOUR_CLUSTER.wavefront.com
    - **Default RelayState** - &lt;LEAVE BLANK&gt;
    - **Name ID Format** - EmailAddress
    - **Application username** - Email
1. Click **Next**.
1. In the **Are you customer or partner?** field, select **I'm an Okta customer adding an internal app**.
1. In the **App type** field, select **This is an internal app that we have created**.
1. Click **Finish**.
1. In the application Sign On tab, click **View Setup Instructions** and click the **Identity Provider metadata** link to copy and paste the metadata.

   {% include image.md src="images/okta_metadata_url.png" width="50" %}


### Step 2. Send the Identity Provider Metadata to Wavefront and Complete the Setup 

1. Log in to your Wavefront instance as a user with `SAML IdP Admin` permissions.
1. From the gear icon in the top right corner, select **Self Service SAML**.
1. From the **Identity Provider** drop-down menu, select **Okta**.
1. Paste the downloaded metadata from **Step 1** into the **Configure Connection** text box.
1. To validate the metadata, click **Test**. The **Okta** login page opens in a new browser window.
1. Log in to **Okta**.
1. After the login is successful, click the **Save** button.

   **Note:** The **Save** button is disabled until you've completed a test successfully.



