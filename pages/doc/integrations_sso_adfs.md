---
title: ADFS SSO Integration
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: integrations_sso_adfs.html
summary: Learn how to integrate SSO using ADFS with Wavefront.
---

{% include shared/users.html %}

## Running the Wizard
 
To add the ADFS integration to Wavefront, follow these steps:

![sso adfs 1](images/sso_adfs_1.png)
![sso adfs 2](images/sso_adfs_2.png)
![sso adfs 3](images/sso_adfs_3.png)
![sso adfs 4](images/sso_adfs_4.png)
![sso adfs 5](images/sso_adfs_5.png)
![sso adfs 6](images/sso_adfs_6.png)
![sso adfs 7](images/sso_adfs_7.png)
![sso adfs 8](images/sso_adfs_8.png)
![sso adfs 9](images/sso_adfs_9.png)

## Setting up Claim Rules
 
This task produces a SAML claim in the format:

```xml
urn:oasis:names:tc:SAML:2.0:nameid-format:unspecified
```

that contains an identifier pull from Active Directory. Wavefront sends an email to this identifier value, so it should be a valid email address. The screenshots below show how to form this identifier from the 1st email address for the user stored in Active Directory.

![sso adfs 10](images/sso_adfs_10.png)

The above rule will send an email address claim in the SAML response. The new rule transforms that email address claim into the NameID claim that Wavefront needs.

![sso adfs 11](images/sso_adfs_11.png)

Here is the resulting rule:

```
c:[Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] => issue(Type = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", Issuer = c.Issuer, OriginalIssuer = c.OriginalIssuer, Value = c.Value, ValueType = c.ValueType, Properties["http://schemas.xmlsoap.org/ws/2005/05/identity/claimproperties /format"] = "urn:oasis:names:tc:SAML:2.0:nameid-format:unspecified");
```


