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

After setting up the PingOne integration, users can authenticate to Wavefront through PingOne instead of using a password. New users who did not exist in Wavefront are auto-created on the Wavefront side when they authenticate for the first time.


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
     - **Assertion Consumer Service** - https://YOUR_CLUSTER.wavefront.com:443/api/saml/login
     - **Entity ID** - https://YOUR_CLUSTER.wavefront.com:443
     - **Signing Algorithm** - RSA_SHA256
     - Click **Continue to Next Step**
5. Review the configuration details and click **Save & Exit**.
6. Go back to **My Applications** and enable the application.
7. Click the right arrow button near the provider and download the SAML metadata.


### Step 2. Send the Identity Provider Metadata to Wavefront and Complete the Setup

1. Log in to your Wavefront instance as a user with `SAML IdP Admin` permissions.
1. From the gear icon in the top right corner, select **Self Service SAML**.
1. From the **Identity Provider** drop-down menu, select **PingOne**.
1. Paste the downloaded metadata from **Step 1** into the **Configure Connection** text box.
1. To validate the metadata, click **Test**. The **PingOne** login page opens in a new browser window.
1. Log in to **PingOne**.
1. After the login is successful, click the **Save** button.

   **Note:** The **Save** button is disabled until you've completed a test successfully.




