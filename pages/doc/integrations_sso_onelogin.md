---
title: OneLogin SSO Integration
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: integrations_sso_onelogin.html
summary: Learn how to integrate SSO using OneLogin with Wavefront.
---

{% include shared/users.html %}

Wavefront supports Single Sign-On (SSO) via OneLogin. Below are the steps to set up OneLogin integration for Wavefront.
 
1. In OneLogin create a new App such as the following:

    ![onelogin_1](images/onelogin_1.png)
 
2. Configure the **Application settings** like the following. The URLs for you will be: https://\<wavefront_instance\>.wavefront.com/api/saml/login. We do not currently have a logout URL but it's safe to fill it in the form if it's a required field.
 
    ![onelogin_2](images/onelogin_2.png)

3. Complete SAML configuration and send the issuer URL to [{{site.support_email}}](mailto:{{site.support_email}}):
 
    ![onelogin_3](images/onelogin_3.png)
 
4. Once we receive that link Wavefront will add your account as a provider. We'll notify you as soon as we've done this and you should then be able to create Users within OneLogin in the usual way. Once a user has been successfully authenticated, authorization for that user is controlled within Wavefront.


