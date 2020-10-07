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

1. Send the IDP metadata to [support@wavefront.com](mailto:support@wavefront.com) with a request to set up Google SSO integration for Wavefront and we'll activate the integration on our end. We'll notify you as soon as we've done this. At that point the users would authenticate to Wavefront through Google instead of using a password. Any new user that comes along that did not yet exist in Wavefront would just get auto-created on the Wavefront side on first authentication.


