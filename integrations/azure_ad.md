---
title: Azure AD Integration
tags: [integrations list]
permalink: azure_ad.html
summary: Learn about the Wavefront Azure AD Integration.
---
## Azure AD Integration

Azure AD is a popular identity management product that can be integrated with Wavefront to enable single sign-on.
## Azure AD Setup

After setting up the Azure AD  integration, users can authenticate to Wavefront through Azure AD instead of using a password.  New users who did not exist in Wavefront are auto-created on the Wavefront side when they authenticate for the first time.


### Step 1. Run the Azure AD Wizard

An [Azure AD Premium subscription](https://www.microsoft.com/en-us/cloud-platform/azure-active-directory) is required.

1. Sign in to the [Azure Portal](https://portal.azure.com) as a **Global Administrator** or **Co-admin**.
1. On the **Home** page, click **Azure Active Directory**.
1. From the navigation menu on the left, select **Enterprise Applications** and click **New Application**.
1. To go to the app library, click the **Info** bar.
1. Click **Non-gallery application**.
1. Enter `Wavefront` as the application name and click **Add**.
1. Select the Wavefront application and click **Single sign-on** in the navigation menu on the left.
1. From the **Mode** drop-down menu, select **SAML-based Sign-on**.
1. In the Identifier field enter `https://YOUR_CLUSTER.wavefront.com:443`. 
1. In the Reply URL field, enter `https://YOUR_CLUSTER.wavefront.com/api/saml/login`.
1. Select **user.mail** from the **User Identifier** pulldown menu in the **User Attributes** section.
1. Download the metadata XML file from the **SAML Signing Certificate** section.
1. In the **Notification Email** section, enter the email address of the person or group that maintains the SSO integration at your company.
1. Click **Save** at the top to save your changes.


### Step 2. Send the Identity Provider Metadata to Wavefront and Complete the Setup

**Wavefront version 2021.26 and later**

1. Log in to your Wavefront instance as a user with `SAML IdP Admin` permissions.
1. From the gear icon in the top right corner, select **Self Service SAML**.
1. From the **Identity Provider** drop-down menu, select **Azure AD**.
1. Paste the downloaded metadata from **Step 1** into the **Configure Connection** text box.
1. To validate the metadata, click **Test**. The **Azure AD** login page opens in a new browser window.
1. Log in to **Azure AD**.
1. After the login is successful, click the **Save** button.

   **Note:** The **Save** button is disabled until you've completed a test successfully.

**Wavefront version 2021.25 and earlier**

1. Send the metadata XML file to [support@wavefront.com](mailto:support@wavefront.com) with a request to set up the Azure AD integration for Wavefront. As soon as we've set up the integration, you will receive a notification from us.




