---
title: OneLogin Integration
tags: [integrations list]
permalink: onelogin.html
summary: Learn about the OneLogin Integration.
---
## OneLogin Integration

OneLogin is a popular identity management product that can be integrated with Wavefront to enable single sign-on.
## OneLogin SSO Setup (SAML)

**Note**: This integration is not applicable if your Operations for Applications service is onboarded to VMware Cloud services. If your service is onboarded to VMware Cloud services, you can [set up enterprise federation for your corporate domain](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html).

After setting up the OneLogin integration, users can authenticate to Wavefront through OneLogin instead of using a password.  New users who did not exist in Wavefront are auto-created on the Wavefront side when they authenticate for the first time.


### Step 1. Create the Wavefront-IdP Application in OneLogin

1. Log in to your OneLogin domain (https://\<your_domain>.onelogin.com).
2. Go to **Applications** and click **Add App**.
3. In the search box, type **SAML Test Connector** and choose `SAML Test Connector (Advanced)`.
4. Enter the **Display Name** as `Wavefront-IdP` and click **Save**.
5. Go to **Configuration**, enter the **Application details** as following and click **Save**.
   Currently, we do not have a **Logout URL** but it's safe to fill it with **Login URL** if it's a required field.
  - Audience (Entity ID): `https://YOUR_CLUSTER.wavefront.com/api/saml/login`
  - Recipient: `https://YOUR_CLUSTER.wavefront.com/api/saml/login`
  - ACS (Consumer) URL Validator: `https://YOUR_CLUSTER.wavefront.com/api/saml/login`
  - ACS (Consumer) URL: `https://YOUR_CLUSTER.wavefront.com/api/saml/login`
  - Login URL: `https://YOUR_CLUSTER.wavefront.com/api/saml/login`
6. Go to **Parameters** and click icon ![plus](https://wavefront-img.s3-us-west-2.amazonaws.com/icon-plus-16.png) to add a field.
7. Enter the **Field name**, enable the flag **Include in SAML assertion** and click **Save**. Set **Value** to **Email** and Click **Save**.
8. Go to **SSO**, change the **SAML Signature Algorithm** to **SHA-256**, and click **Save**.


### Step 2. Send the Identity Provider Metadata to Wavefront and Complete the Setup

1. Log in to your Wavefront instance as a user with `SAML IdP Admin` permissions.
1. From the gear icon in the top right corner, select **Self Service SAML**.
1. From the **Identity Provider** drop-down menu, select **OneLogin**.
1. Paste the downloaded metadata from **Step 1** into the **Configure Connection** text box.
1. To validate the metadata, click **Test**. The **OneLogin** login page opens in a new browser window.
1. Log in to **OneLogin**.
1. After the login is successful, click the **Save** button.

   **Note:** The **Save** button is disabled until you've completed a test successfully.




