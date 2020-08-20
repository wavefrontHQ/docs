---
title: Set Up Self-Service SAML SSO
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: auth_self_service_sso.html
summary: Set up a SAML SSO provider for your environment
---

Wavefront supports a number of third-party authentication solutions that use SAML. The SAML (Security Assertion Markup Language) standard enables an identity provider (IdP) to pass authorization credentials to service providers (SP). In environments that use SAML, users log in once and authenticate to many different services.

* Self Service SAML SSO is not available for customers who have set up [multi-tenant authentication](authentication.html#multi-tenant-authentication)
* Self Service SAML SSO is not available for trial customers

{% include tip.html content="If you set up SAML SSO for your environment, user accounts can no longer sign in with their user name and password. Service accounts can continue to use their authentication tokens."%}


## Set Up SAML SSO

{% include note.html content="You must have SAML IDP Admin permissions to set up SAML SSO for your Wavefront instance."%}

1. Log in to your Wavefront instance as a user with SAML IDP Admin permissions.
2. From the gear icon, select **Self Service SAML**
3. From the **Identity Provider** pulldown menu, select the identity provider that is in use in your environment.
4. Click the **Setup Instructions** link. The link directs you to the instructions for the provider that you selected.
5. Follow the instructions to retrieve the IDP metadata for your identity provider.
6. In the **Configure Connection** field, paste the metadata and click **Test**.
7. If the test was successful, the Save button becomes available and you can click **Save**.

![screenshot with fields filled in & blurred out](images/self_service_sso.png)
