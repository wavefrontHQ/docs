---
title: Azure AD SSO Integration
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: integrations_sso_azure_ad.html
summary: Learn how to integrate SSO using Azure AD with Wavefront.
---

{% include shared/users.html %}

Here we provide step-by-step instructions to configure Azure AD SSO integration with Wavefront. An [Azure AD Premium subscription](https://www.microsoft.com/en-us/cloud-platform/azure-active-directory) is required.
 
1. In the Azure management portal, navigate to the specific directory you want to use for this integration.
1. Click the **Applications** tab and click the **Add** button:

    ![azure_ad_add](images/azure_ad_add.png)

1. Select **Add an application from the gallery**:

    ![azure_ad_add_application](images/azure_ad_add_application.png)

1. Select **Custom > Add an unlisted application my organization is using** and enter **Wavefront** as the application name (if you don't see the "Add an unlisted application my organization is using" application template, it means that you don't have the Premium subscription for Azure AD. If you just upgraded your subscription to premium, reload the portal page for the changes to take effect.

    ![azure_ad_add_wavefront](images/azure_ad_add_wavefront.png)

1. Click **Configure single sign-on** to open the SSO configuration wizard:

    ![azure_ad_configure_sso](images/azure_ad_configure_sso.png)

1. Choose the **Microsoft Azure AD Single Sign-On** option:

    ![azure_ad_configure_ad_sso](images/azure_ad_configure_ad_sso.png)

1. In the Identifier and Reply URL fields respectively, enter **https://\<wavefront_instance\>.wavefront.com** and **https://\<wavefront_instance\>.wavefront.com/api/saml/login**, substituting the correct subdomain name: 

    ![azure_ad_id_url](images/azure_ad_id_url.png)

1. Download the metadata XML file:

    ![azure_ad_download_metadata](images/azure_ad_download_metadata.png)

1. Enter the email address of the person/group maintaining the SSO integration at your company.

    ![azure_ad_admin_email](images/azure_ad_admin_email.png)

1.  Once you're back to the application's main page, click **Attributes**:

    ![azure_ad_azure_ad_attributes](images/azure_ad_attributes.png)

1. In **SAML Token Attributes**, hover over the line that has "Type" = "user attribute (nameid)" (usually the first one) and click the pencil icon <i class="fa fa-pencil"/> to edit this attribute:

    ![azure_ad_saml_token](images/azure_ad_saml_token.png)

1. Change the attribute value to **user.mail**:

    ![azure_ad_user_email](images/azure_ad_user_email.png)


1. Click **Apply changes**:

    ![azure_ad_apply](images/azure_ad_apply.png)

1. Grant your existing Wavefront users access to the Wavefront application to make sure they don't lose access when we enable SSO on our side.
1. Send the Metadata XML file (that you saved earlier) to support@wavefront.com with a request to set up Azure AD integration for Wavefront. Once we receive that file, Wavefront will add you as a provider and we'll notify you as soon as it's done.



