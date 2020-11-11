---
title: OneLogin Integration
tags: [integrations list]
permalink: onelogin.html
summary: Learn about the Wavefront OneLogin Integration.
---
## OneLogin Integration

OneLogin is a popular identity management product that can be integrated with Wavefront to enable single sign-on.
## OneLogin SSO Setup (SAML)

### Create the Wavefront-IdP Application in OneLogin

1. Log in to your OneLogin domain (https://\<your_domain>.onelogin.com).
2. Go to **Applications** and click **Add App**.
3. In the search box, type **SAML Test Connector** and choose `SAML Test Connector (Advanced)`.
4. Enter the **Display Name** as `Wavefront-IdP` and click **Save**.
5. Go to **Configuration**, enter the **Application details** as following and click **Save**.
   Currently, we do not have a **Logout URL** but it's safe to fill it with **Login URL** if it's a required field.
  - Audience (Entity ID): `https://nimba.wavefront.com/api/saml/login`
  - Recipient: `https://nimba.wavefront.com/api/saml/login`
  - ACS (Consumer) URL Validator: `https://nimba.wavefront.com/api/saml/login`
  - ACS (Consumer) URL: `https://nimba.wavefront.com/api/saml/login`
  - Login URL: `https://nimba.wavefront.com/api/saml/login`
6. Go to **Parameters** and click icon ![plus](https://wavefront-img.s3-us-west-2.amazonaws.com/icon-plus-16.png) to add a field.
7. Enter the **Field name**, enable the flag **Include in SAML assertion** and click **Save**. Set **Value** to **Email** and Click **Save**.
8. Go to **SSO**, change the **SAML Signature Algorithm** to **SHA-256**, and click **Save**.

### Send Identity Provider Metadata to Wavefront

**Wavefront version 2020.30 and earlier**

1. Copy the **Issuer URL** and send that URL to [support@wavefront.com](mailto:support@wavefront.com).
2. When Wavefront receives the issuer URL, they will add your account as a provider and notify you. Going forward, users who log in to Wavefront authenticate through OneLogin instead of using a password. Any new user that does not yet exist in Wavefront is auto-created inside Wavefront when that user first authenticates successfully to OneLogin.


**Wavefront version 2020.34 and later**

1. Log in to Wavefront with a user account for which `SAML IDP Admin` permission is enabled.
2. Click on the gear icon on top right corner and navigate to **Self Service SAML**.
3. Select **Identity Provider** as **OneLogin** from the list.
4. Copy the downloaded metadata from Step 2 into the **Configure Connection** text box.
5. Click **Test** to test the validity of metadata. A new browser window opens with OneLogin login page.

   **Note:** The **Save** button is disabled until you've completed a test successfully.

6. Log in to OneLogin. After the login is successful, click **Save**.

Going forward, users who attempt to log in to Wavefront are redirected to OneLogin. If a user can authenticate to OneLogin but is not currently a Wavefront user, that user is auto-created on the Wavefront side. Password authentication is no longer supported.



