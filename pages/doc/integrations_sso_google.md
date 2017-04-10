---
title: Google SSO Integration
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: integrations_sso_google.html
summary: Learn how to integrate SSO using Google with Wavefront.
---

{% include shared/users.html %}

We support authentication via SAML including Google SSO. To set up Google SSO:

1. Create a SAML App for Wavefront within Google IDP (settings described below, but basically following the instructions in [Set up your own SAML app](https://support.google.com/a/answer/6087519?hl=enhttp://)). Settings for the SAML App:

    ![google sso](images/integrations_sso_google.png)

    Here are the service provider details settings that you need:
    
    - **Application name**: Wavefront
    - **Description**: Can be blank
    - **ACS URL\*** : https://\<wavefront_instance\>.wavefront.com:443/api/saml/login
    - **Entity Id\***:  https://\<wavefront_instance\>.wavefront.com:443
    - **Start URL**: leave blank
    - **Signed Response**: Unchecked
    - **Name ID**: Basic Information, Primary Email
    - **Name ID Format**: UNSPECIFIED
    
      You do not need the optional Attribute Mapping.

1. Grant the users access to the app. Wavefront does not charge per user so it’s OK to just grant to "all" if that works for you.
1. Send us the IDP metadata to [support](mailto:support@wavefront.com) with a request to set up Google SSO integration for wavefront and we'll activate the integration on our end. We'll notify you as soon as we've done this. At that point the users would authenticate to Wavefront through Google instead of using a password. Any new user that comes along that did not yet exist in Wavefront would just get auto-created on the Wavefront side on first authentication.

{% include links.html %}
