---
title: Single-Tenant Authentication and Self-Service SAML SSO
keywords: administration
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: auth_self_service_sso.html
summary: Learn how to enable single-tenant authentication and set up self-service SSO.
---

{% include note.html content="Starting July 3, 2023, VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) is a service on the VMware Cloud services platform. The content in this chapter is valid for **original** subscribers. For VMware Cloud services subscriptions, see [Authentication Model in Tanzu Observability on VMware Cloud Services](csp_authentication.html)."%}

Tanzu Observability supports a number of third-party authentication solutions that use SAML. The SAML (Security Assertion Markup Language) standard enables an identity provider (IdP) to pass authorization credentials to service providers (SP). In environments that use SAML, users log in once and authenticate to many different services.

* Self-Service SAML SSO is not available for customers who have set up [multi-tenant authentication](authentication.html#multi-tenant-authentication).
* Self-Service SAML SSO is not available for trial customers.

{% include tip.html content="If you set up SAML SSO for your environment, user accounts can no longer sign in with their user name and password. They must log in through the IdP. Service accounts can continue to use their authentication tokens."%}


## Single-Tenant Authentication

Most administrators set up authentication in their environment by setting up SSO using an identity provider (IdP). Authentication integrations with the following IdPs are predefined. 

* [Google](google.html)
* [OneLogin](onelogin.html)
* [Okta](okta.html)
* [PingOne](pingone.html)

  {% include note.html content="PingFederate Self Service SSO is not supported."%} 
* [VMware Workspace ONE Access](workspace-one.html)

SSO setup with other IdPs is also possible. If your environment requires the setup of SSO using and IdP that is not available in the predefined list for self-service SAML SSO (for example, Azure AD or ADFS), create a [support ticket](wavefront_support_feedback.html#support).

As an administrator, in single-tenant authentication environments, you can set up SAML SSO and your users will log in to the identity provider. After a user has been successfully authenticated, you can set the permissions for that user. [Permissions](permissions_overview.html) determine what the user can do in the environment.


## Set Up SAML SSO

{% include note.html content="You must have **SAML IdP Admin** permission to set up SAML SSO for your service instance."%}

1. Log in to your service instance (`https://<your_instance>.wavefront.com`) as a user with the **SAML IdP Admin** permission.
2. Click the gear icon <i class="fa fa-cog"/> on the toolbar and select **Self Service SAML**.
3. From the **Identity Provider** drop-down menu, select the identity provider that is used in your environment.
4. Click the **Setup Instructions** link.

   The link directs you to the instructions for setting up the provider integration that you selected.

5. Follow the instructions to retrieve the metadata for your identity provider.
6. In the **Configure Connection** field, paste the metadata and click **Test** to validate the metadata.
7. Log in to your identity provider.

   After the login is successful and if the test was successful, the **Save** button becomes available.

8. Click the **Save** button to save your changes.

![screenshot with fields filled in & blurred out](images/self_service_sso.png)


## Update SAML SSO

If the certificate that's used in your setup must be replaced, you can delete the existing setup and set up SAML SSO again.

1. Log in to your service instance (`https://<your_instance>.wavefront.com`) as a user with the **SAML IdP Admin** permission.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Self Service SAML**.
3. Click the **Click Here** link to delete the existing key pair.
4. Repeat the setup process.

{% include tip.html content="If the certificate that is used in the SSO setup has expired and you are unable to authenticate and perform the required changes, [engage our Support team](wavefront_support_feedback.html#support) to request that the SSO integration be deactivated. After that, authenticate by using a user name and password to set up SSO again with the updated metadata."%}

<!---
## FedRAMP Certification of Different Providers

The different SAML providers have the following FedRAMP certification:

* ADFS – FedRAMP High.
* G-Suite – FedRAMP Moderate.
* Okta – FedRAMP Moderate.
* WorkSpaceOne - FedRAMP Moderate.
* OneLogin – No FedRAMP compliance.

--->

## How to Add New Users After Single Sign-On Has Been Enabled

{% include note.html content="After you set up SAML SSO for your environment, you must provision your users in your identity provider."%}

**Problem**

After SSO has been enabled, all authentication is now handled by the Single Sign-On identity provider.
* Even Super Admin users can no longer invite users from the **Account Management** page. The **Invite New Users** button is not clickable.
* Attempting to invite a user from the API results in the following error:

  ```
  { "status": { "result": "ERROR", "message": "Cannot process the request when SSO is enabled.", "code": 400 } }
  ```

**Solution**

If any user goes to the service instance in a web browser, for example, `https://example.wavefront.com`, and provides their email address, the user is redirected to the SSO login page and can log in with their SSO credentials.

After the user is authenticated, Permissions determine what the user can do. All new users become members of the **Everyone** group and inherit all permissions assigned to that group. See [Authorization Model](authorization.html) and other doc pages in that section for details.
