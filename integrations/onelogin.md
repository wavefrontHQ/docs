---
title: OneLogin Integration
tags: [integrations list]
permalink: onelogin.html
summary: Learn about the Wavefront OneLogin Integration.
---
## OneLogin Integration

OneLogin is a popular identity management product that can be integrated with Wavefront to enable single sign-on.
## OneLogin Setup

### Step 1. Create the OneLogin Application

1. In OneLogin, create a new App such as the following:
{% include image.md src="images/onelogin_1.png" width="30" %}
1. Configure the **Application settings** like the following. The URLs for you will be: https://YOUR_CLUSTER.wavefront.com/api/saml/login. We do not currently have a logout URL but it's safe to fill it in the form if it's a required field.
{% include image.md src="images/onelogin_2.png" width="30" %}
1. Complete SAML configuration.

### Step 2. Send Identity Provider Metadata to Wavefront

1. Send the issuer URL to [support@wavefront.com](mailto:support@wavefront.com):
{% include image.md src="images/onelogin_3.png" width="30" %} 
1. Once we receive that link Wavefront will add your account as a provider. We'll notify you as soon as we've done this. At that point the users would authenticate to Wavefront through OneLogin instead of using a password. Any new user that comes along that did not yet exist in Wavefront would just get auto-created on the Wavefront side on first authentication.

