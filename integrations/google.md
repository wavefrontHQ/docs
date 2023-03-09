---
title: Google Integration
tags: [integrations list]
permalink: google.html
summary: Learn about the Google Integration.
---
## Google SSO Integration

Wavefront supports authentication via SAML including Google SSO.
## Google SSO Setup

After setting up the Google SSO integration, users can authenticate to Wavefront through Google SSO instead of using a password.  New users who did not exist in Wavefront are auto-created on the Wavefront side when they authenticate for the first time.


### Step 1. Create the SAML Application

1. In Google, create a SAML App for Wavefront within Google IDP (settings described below, following the instructions in [Set up your own SAML app](https://support.google.com/a/answer/6087519?hl=enhttp://)).
{% include image.md src="images/integrations_sso_google.png" width="50" %}

Here are the service provider details settings that you need:    
- **Application Name**: Wavefront
- **Description**: Optional
- **ACS URL\*** : https://YOUR_CLUSTER.wavefront.com:443/api/saml/login
- **Entity ID\***:  https://YOUR_CLUSTER.wavefront.com:443
- **Start URL**: leave blank
- **Signed Response**: Unchecked
- **Name ID**: Basic Information, Primary Email
- **Name ID Format**: UNSPECIFIED

You do not need the optional Attribute Mapping.

      
### Step 2. Send the Identity Provider Metadata to Wavefront and Complete the Setup


1. Log in to your Wavefront instance as a user with `SAML IdP Admin` permissions.
1. From the gear icon in the top right corner, select **Self Service SAML**.
1. From the **Identity Provider** drop-down menu, select **G-Suite**.
1. Paste the downloaded metadata from **Step 1** into the **Configure Connection** text box.
1. To validate the metadata, click **Test**. The **G-Suite** login page opens in a new browser window.
1. Log in to **G-Suite**.
1. After the login is successful, click the **Save** button.

   **Note:** The **Save** button is disabled until you've completed a test successfully.



