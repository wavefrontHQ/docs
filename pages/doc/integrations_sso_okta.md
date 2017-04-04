---
title: Okta SSO Integration
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: integrations_sso_okta.html
summary: Learn how to integrate SSO using Okta with Wavefront.
---

{% include shared/users.html %}

Wavefront supports Single Sign-On (SSO) via Okta. To set up SSO:
 
1. In Okta, create a new App:
 
    ![1_okta_create_new_app](images/okta_create_new_app.png)
 
2. Choose SAML 2.0:
    ![2_okta_choose_saml](images/okta_choose_saml.png)
 
3. Name the Application "Wavefront" and use this logo:

    ![wavefront_logo_okta](images/wavefront_logo_okta.png)
   
    ![3_okta_general_settings](images/okta_general_settings.png)
 
4. Enter the application settings:

    - **Single sign on URL** - https://\<YOUR_INSTANCE\>.wavefront.com/api/saml/login
    - **Use this for Recipient URL and Destination UR**L - Checked
    - **Audience URI (SP Entity ID)** - https://\<YOUR_INSTANCE\>.wavefront.com
    - **Default RelayState** - \<LEAVE BLANK\>
    - **Name ID Format** - EmailAddress
    - **Application username** - Email
     
    ![4_okta_settings](images/okta_settings.png)
 
5. Select the following options and click **Finish**:

    ![5_okta_Final](images/okta_final.png)
6. Add users or groups to the application. It's best to do this before we turn on the Okta integration on our end so that users can continue to login. You should use the following settings for your template.
 
7. Send us the Identity Provider Metadata URL. Copy the link location for Identity Provider Metadata (see below screenshot) and send it to support@wavefront.com with a request to set up Okta integration for wavefront. Before you turn on Okta for Wavefront make sure you grant existing Wavefront users access to the Wavefront application within Okta so that they dont get cut off from accessing Wavefront.

    ![okta_metadata_url](images/okta_metadata_url.png)

9. Once we receive that link Wavefront will add you as a provider. We'll notify you as soon as we've done this and you will then be able to create users within Okta in the usual way.

{% include links.html %}
