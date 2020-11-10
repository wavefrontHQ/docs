---
title: Azure AD Integration
tags: [integrations list]
permalink: azure_ad.html
summary: Learn about the Wavefront Azure AD Integration.
---
## Azure AD Integration

Azure AD is a popular identity management product that can be integrated with Wavefront to enable single sign-on.
## Azure AD Setup


### Step 1. Run the Azure AD Wizard

An [Azure AD Premium subscription](https://www.microsoft.com/en-us/cloud-platform/azure-active-directory) is required.

1. Sign in to the [Azure Portal](https://portal.azure.com) as a **Global Administrator** or **Co-admin**.
1. Click **More services** at the bottom of the main navigation menu on the left to open the **Azure Active Directory Extension**.
1. Search for **"Azure Active Directory"** in the search filter box and select the **Azure Active Directory** item.
1. Click **Enterprise Applications** in the navigation menu on the left and click **Add**.
1. Click **Non-gallery application** in the **Add your own app** section.
1. Enter `Wavefront` as the application name and click **Add**.
1. Select the Wavefront application and click **Single sign-on** in the navigation menu on the left.
1. Select **SAML-based Sign-on** in the Mode pulldown menu.
1. In the Identifier field enter `https://YOUR_CLUSTER.wavefront.com:443`. 
1. In the Reply URL field, enter `https://YOUR_CLUSTER.wavefront.com/api/saml/login`.
1. Select **user.mail** from the **User Identifier** pulldown menu in the **User Attributes** section.
1. Download the metadata XML file from the **SAML Signing Certificate** section.
1. In the **Notification Email** section, enter the email address of the person or group that maintains the SSO integration at your company.
1. Click **Save** at the top to save your changes.

### Step 2. Send Identity Provider Metadata to Wavefront

**Wavefront version 2020.30 and earlier**

1. Send the metadata XML file that you saved earlier to [support@wavefront.com](mailto:support@wavefront.com) with a request to set up Azure AD integration for Wavefront. 

After we've completed the setup, users can authenticate to Wavefront through Azure AD instead of using a password. New Azure AD users are auto-created on the Wavefront side when they authenticate for the first time.

**Wavefront version 2020.34 and later**

1. Log in to Wavefront with a user account for which `SAML IDP Admin` permission is enabled.
2. Click on the gear icon on top right corner and navigate to **Self Service SAML**.
3. Select **Identity Provider** as **Azure AD** from the list.
4. Copy the downloaded metadata from Step 2 into the **Configure Connection** text box.
5. Click **Test** to test the validity of metadata. A new browser window opens with Azure AD login page.

   **Note:** The **Save** button is disabled until you've completed a test successfully.

6. Log in to Azure AD. After the login is successful, click **Save**.

Going forward, users who attempt to log in to Wavefront are redirected to Azure AD. If a user can authenticate to Azure AD but is not currently a Wavefront user, that user is auto-created on the Wavefront side. Password authentication is no longer supported.


