---
title: Set Up or Update Self-Service SAML SSO
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: auth_self_service_sso.html
summary: Set up a SAML SSO provider for your environment
---

Wavefront supports a number of third-party authentication solutions that use SAML. The SAML (Security Assertion Markup Language) standard enables an identity provider (IdP) to pass authorization credentials to service providers (SP). In environments that use SAML, users log in once and authenticate to many different services.

* Self Service SAML SSO is not available for customers who have set up [multi-tenant authentication](authentication.html#multi-tenant-authentication)
* Self Service SAML SSO is not available for trial customers

{% include tip.html content="If you set up SAML SSO for your environment, user accounts can no longer sign in with their username and password. Service accounts can continue to use their authentication tokens."%}


## Set Up SAML SSO

{% include note.html content="You must have SAML IdP Admin permissions to set up SAML SSO for your Wavefront instance."%}

1. Log in to your Wavefront instance as a user with SAML IdP Admin permissions.
2. From the gear icon, select **Self Service SAML**.
3. From the **Identity Provider** drop-down menu, select the identity provider that is used in your environment.
4. Click the **Setup Instructions** link. The link directs you to the instructions for the provider that you selected.
5. Follow the instructions to retrieve the metadata for your identity provider.
6. In the **Configure Connection** field, paste the metadata and click **Test**.
7. If the test was successful, the **Save** button becomes available and you can click **Save**.

![screenshot with fields filled in & blurred out](images/self_service_sso.png)


## Update SAML SSO

If the certificate that's used in your setup needs to be replaced, you can delete the existing setup and add a set up SAML SSO again.

1. Log in to your Wavefront instance as a user with SAML IdP Admin permissions.
2. From the gear icon, select **Self Service SAML**.
3. Click the **Click Here** link to delete the existing key pair.
4. Repeat the setup process.

{% include tip.html content="If the certificate that is used in the SSO setup has expired and you are unable to authenticate to perform the required changes, [engage Support](wavefront_support_feedback.html#support) to request that the SSO integration be deactivated. After that, authenticate using username and password to set up SSO again with the updated metadata."%}

<!---
## FedRAMP Certification of Different Providers

The different SAML providers have the following FedRAMP certification:

* ADFS – FedRAMP High.
* G-Suite – FedRAMP Moderate.
* Okta – FedRAMP Moderate.
* WorkSpaceOne - FedRAMP Moderate.
* OneLogin – No FedRAMP compliance.

--->
