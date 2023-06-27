---
title: ADFS Integration
tags: [integrations list]
permalink: adfs.html
summary: Learn about the ADFS Integration.
---
## ADFS Integration

ADFS is a popular identity management product that can be integrated with Wavefront to enable single sign-on.
## ADFS Setup

**Note**: This integration is not applicable if your Operations for Applications service is onboarded to VMware Cloud services. If your service is onboarded to VMware Cloud services, you can [set up enterprise federation for your corporate domain](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html).

After setting up the ADFS integration, users can authenticate to Wavefront through ADFS instead of using a password.  New users who did not exist in Wavefront are auto-created on the Wavefront side when they authenticate for the first time.


### Step 1. Run the Wizard

To add the ADFS integration to Wavefront, follow these steps:

{% include image.md src="images/sso_adfs_1.png" width="65" %}
{% include image.md src="images/sso_adfs_2.png" width="65" %}
{% include image.md src="images/sso_adfs_3.png" width="65" %}
{% include image.md src="images/sso_adfs_4.png" width="65" %}
{% include image.md src="images/sso_adfs_5.png" width="65" %}

**Note**: For the next two steps, replace `https://customer.wavefront.com` with your Wavefront instance URL: `https://YOUR_CLUSTER.wavefront.com`.

{% include image.md src="images/sso_adfs_6.png" width="65" %}
{% include image.md src="images/sso_adfs_7.png" width="65" %}
{% include image.md src="images/sso_adfs_8.png" width="65" %}
{% include image.md src="images/sso_adfs_9.png" width="65" %}

### Step 2. Set up Claim Rules

This task produces a SAML claim in the following format:
{% raw %}
```
urn:oasis:names:tc:SAML:2.0:nameid-format:unspecified
```
{% endraw %}

Here is an example of the resulting rule:
{% raw %}
```
c:[Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] => issue(Type = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", Issuer = c.Issuer, OriginalIssuer = c.OriginalIssuer, Value = c.Value, ValueType = c.ValueType, Properties["http://schemas.xmlsoap.org/ws/2005/05/identity/claimproperties /format"] = "urn:oasis:names:tc:SAML:2.0:nameid-format:unspecified");
```
{% endraw %}

The rule contains an identifier pull from Active Directory. Wavefront sends an email to this identifier value, so it should be a valid email address. 

The screenshots below show to form this identifier from the 1st email address for the user stored in Active Directory.

{% include image.md src="images/sso_adfs_10.png" width="65" %}

The rule sends an email address claim in the SAML response. The new rule transforms that email address claim into the NameID claim that Wavefront needs.

{% include image.md src="images/sso_adfs_11.png" width="65" %}


### Step 3. Send the Identity Provider Metadata to Wavefront and Complete the Setup

1. Download `https://<FQDN of ADFS>/FederationMetadata/2007-06/FederationMetadata.xml` identity provider metadata file.
1. Log in to your Wavefront instance as a user with `SAML IdP Admin` permissions.
1. From the gear icon in the top right corner, select **Self Service SAML**.
1. From the **Identity Provider** drop-down menu, select **ADFS**.
1. Paste the downloaded metadata into the **Configure Connection** text box.
1. To validate the metadata, click **Test**. The **ADFS** login page opens in a new browser window.
1. Log in to **ADFS**.
1. After the login is successful, click the **Save** button.

   **Note:** The **Save** button is disabled until you've completed a test successfully.



