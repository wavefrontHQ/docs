---
title: Administer Wavefront
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_administer.html
summary: Understand what you can do as a Wavefront administrator.
---

Wavefront Super Admin users and Wavefront users with the **Accounts** permission can perform a variety of tasks, such as:

* Manage the authorization and access to the Wavefront environment.
* Select the authentication model in your environment. For example by setting up SSO using an identity provider (IdP).
* Monitor and troubleshoot the Wavefront environment and usage.

## Authorization

As a Wavefront user with the **Accounts** permission, you can:

* Invite users, assign roles to users or add the users to groups to grant permissions. 
* Create roles that are set of permissions and assign the role to one or more users.
* Create groups and give all members of the group a set of permissions by assigning a role.
* Manage user accounts and service accounts.
* Protect individual dashboards or alerts and grant access only to selected groups or accounts.
* Protect metrics or groups of metrics using metrics security policy rules.


## Authentication

You can select your preferred authentication method for your environment by setting up single sign-on using an identity provider (IdP), so that users can log in by using SSO instead of a user name and password. Wavefront authentication integrations use SAML and fully support two-factor authentication (managed by individual identity providers).  In single-tenant authentication environment, you can set up or update self-service SAML SSO. You can also set up multi-tenancy, which is configured jointly by you -- at the customer site, and the Wavefront team. 

## Monitor and Troubleshoot

Super Admin users can use the Wavefront Usage integration dashboards to monitor and troubleshoot your Wavefront environment. By using the dashboards in this integration, you can:

* Get usage information for your Wavefront instance and Wavefront proxy.
* Drill down into the metrics namespaces to discover trends.
* Examine the points per second (PPS) usage based on predefined ingestion policies.
* See whether the ingested metrics are at 95% of the committed rate and optionally get alerts if that happens.
* In addition, you can create your own dashboards, charts, and alerts by using the internal metrics to investigate the problem.

As a Super Admin user, you can also [monitor the overall Wavefront usage](examine_usage.html) and see how data is used by specific accounts or groups, based on the [ingestion policies](ingestion_policies.html) that you create.
