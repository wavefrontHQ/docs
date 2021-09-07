---
title: Wavefront Authentication
keywords:
tags: [integrations, administration]
sidebar: doc_sidebar
permalink: wavefront-authentication.html
summary: Learn about the Wavefront authentication model.
---

At Wavefront we support three main types of authentication.

## User Name and Password

Wavefront supports both user accounts and service accounts. 

* User accounts must authenticate with a user name and password. 
* Service accounts authenticate with a token. 


## SAML SSO
We also support self-service SAML SSO setup.

If a customer’s chosen authentication solution supports two-factor authentication, Wavefront requires two-factor authentication for login.

## Multi-Tenant SAML SSO

Large customers can request multi-tenant SSO. Users in different teams inside the company can authenticate to different tenants and cannot access the other tenant’s data.
