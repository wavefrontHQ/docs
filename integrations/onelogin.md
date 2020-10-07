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
1. Copy the **Issuer URL** and send that URL to [support@wavefront.com](mailto:support@wavefront.com).
2. When Wavefront receives the issuer URL, they will add your account as a provider and notify you. Going forward, users who log in to Wavefront authenticate through OneLogin instead of using a password. Any new user that does not yet exist in Wavefront is auto-created inside Wavefront when that user first authenticates successfully to OneLogin.


