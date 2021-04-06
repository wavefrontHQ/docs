---
title: Google Integration
tags: [integrations list]
permalink: google.html
summary: Learn about the Wavefront Google Integration.
---
## Google SSO Integration

Wavefront supports authentication via SAML including Google SSO.
## Google SSO Setup

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
      
### Step 2. Send Identity Provider Metadata to Wavefront

**Wavefront version 2020.30 and earlier**

1. Send the IDP metadata to [support@wavefront.com](mailto:support@wavefront.com) with a request to set up Google SSO integration for Wavefront and we'll activate the integration on our end. We'll notify you as soon as we've done this. At that point the users would authenticate to Wavefront through Google instead of using a password. Any new user that comes along that did not yet exist in Wavefront would just get auto-created on the Wavefront side on first authentication.


**Wavefront version 2020.34 and later**

1. Log in to Wavefront with a user account for which `SAML IDP Admin` permission is enabled.
3. Select **Identity Provider** as **G-Suite** from the list.
4. Copy the downloaded metadata from Step 2 into the **Configure Connection** text box.
5. Click **Test** to test the validity of metadata. A new browser window opens with Google login page.

   **Note:** The **Save** button is disabled until you've completed a test successfully.

6. Log in to Google. After the login is successful, click **Save**.

Going forward, users who attempt to log in to Wavefront are redirected to Google. If a user can authenticate to Google but is not currently a Wavefront user, that user is auto-created on the Wavefront side. Password authentication is no longer supported.



