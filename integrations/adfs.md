---
title: ADFS Integration
tags: [integrations list]
permalink: adfs.html
summary: Learn about the Wavefront ADFS Integration.
---
## ADFS Integration

ADFS is a popular identity management product that can be integrated with Wavefront to enable single sign-on.
## ADFS Setup

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


### Step 3. Download Identity Provider Metadata and Send to Wavefront

1. Open `https://<FQDN of ADFS>/FederationMetadata/2007-06/FederationMetadata.xml` to retrieve the identify provider metadata file.
1. Send the metadata file to [support@wavefront.com](mailto:support@wavefront.com) with a request to set up ADFS SSO integration for Wavefront and we'll activate the integration on our end. We'll notify you as soon as we've done this. At that point the users would authenticate to Wavefront through ADFS instead of using a password. Any new user that comes along that did not yet exist in Wavefront is auto-created on the Wavefront side on first authentication.


