---
title: PingOne Integration
tags: [integrations list]
permalink: pingone.html
summary: Learn about the Wavefront PingOne Integration.
---
## PingOne

PingOne® for Enterprise is a Single Sign-on (SSO) solution that enables enterprises to give their users federated access to applications with a single click from any browser or mobile device.

After you've completed the Wavefront integration for PingOne for Enterprise setup, all users in your enterprise that can authenticate to PingOne for Enterprise can also log in to your Wavefront instance. What those users can do depends on their permission. All users are in the Everyone group and have, at a minimum, view permissions for dashboards and alerts. Additional permissions depend on the Permissions setup in your Wavefront instance. See [Roles, Groups, and Permissions](https://docs.wavefront.com/users_roles.html).

## PingOne Setup

### Step 1. Adding a Web Application to PingOne Catalog

1. Log in to PingOne, click the **Applications** tab.
2. Under **My Applications**, click **Add Application**, and click **New SAML Application** on the menu.
3. On the Definition page, create a new application by providing values for following settings:
     - **Application Name** - `Wavefront`
     - **Application Description** - `<your_description>`.
     - **Category** - Information Technology.
     - **Graphics** - Save the Wavefront logo: 
   {% include image.md src="./images/wavefront_logo.png" width="25" %}
       Browse to the logo file and upload.
     - Click **Continue to Next Step**.
4. On the Configuration page, enter the application configuration details: 
     - **Protocol Version** - Select SAML 2.0 from the list.
     - **Assertion Consumer Service** - https://YOUR_CLUSTER.wavefront.com/api/saml/login/
     - **Entity ID** - https://YOUR_CLUSTER.wavefront.com
     - **Signing Algorithm** - RSA_SHA256
     - Click **Continue to Next Step**
5. Review the configuration details and click on **Save & Exit**.

### Step 2. Send Identity Provider Metadata to Wavefront
1. Go back to **My Applications** and enable the application.
2. Click the right arrow button near the provider and download SAML metadata.

### Step 3. Upload Identity Provider Metadata into Wavefront

**Wavefront version 2020.30 and earlier**

1. Send the downloaded metadata from Step 2 to support@wavefront.com with a request to set up the PingOne integration for Wavefront. We'll activate the integration on our end and will notify you as soon as we've done this.


**Wavefront version 2020.34 and later**

1. Log in to Wavefront with a user account for which `SAML IDP Admin` permission is enabled.
2. Click on the gear icon on top right corner and navigate to **Self Service SAML**.
3. Select **Identity Provider** as **PingOne** from the list.
4. Copy the downloaded metadata from Step 2 into the **Configure Connection** text box.
5. Click **Test** to test the validity of metadata. A new browser window opens with PingOne login page.

   **Note:** The **Save** button is disabled until you've completed a test successfully.

6. Log in to PingOne. After the login is successful, click **Save**.

Going forward, users who attempt to log in to Wavefront are redirected to PingOne. If a user can authenticate to PingOne but is not currently a Wavefront user, that user is auto-created on the Wavefront side. Password authentication is no longer supported.



