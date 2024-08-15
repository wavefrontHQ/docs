---
title: Administer Your Service Instance
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_administer.html
summary: Understand what you can do if you have administrative privileges.
---

In VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront), Super Admin users and users with the **Accounts** permission can perform a variety of tasks, such as:

* Manage the authorization and access to the Operations for Applications environment.
* Select the authentication model in the Operations for Applications environment, for example, by setting up SSO using an identity provider (IdP).
* Monitor and troubleshoot the Operations for Applications environment and usage.
* Purchase initial and additional Operations for Applications capacity by using the self-service workflows in the UI.

## Authorization

As a user with the **Accounts** permission, you can:

* Invite users, assign roles to users or add the users to groups to grant permissions. 
* Create roles that are set of permissions and assign the role to one or more users.
* Create groups and give all members of the group a set of permissions by assigning a role.
* Manage user accounts and service accounts.
* Protect individual dashboards or alerts and grant access only to selected groups or accounts.
* Protect metrics or groups of metrics using metrics security policy rules.


## Authentication

You can select your preferred authentication method for your environment by setting up single sign-on using an identity provider (IdP), so that users can log in by using SSO instead of a user name and password. Our authentication integrations use SAML and fully support two-factor authentication (managed by individual identity providers).  In single-tenant authentication environment, you can set up or update self-service SAML SSO. You can also set up multi-tenancy, which is configured jointly by you -- at the customer site, and our Technical Support team. 

## Monitor and Troubleshoot

You can use the Operations for Applications Usage integration dashboards to monitor and troubleshoot your environment. By using the dashboards in this integration, you can:

* Get usage information for your service instance and Wavefront proxy.
* Drill down into the metrics namespaces to discover trends.
* Examine the points per second (PPS) usage based on predefined ingestion policies.
* See whether the ingested metrics are at 95% of the committed rate and optionally get alerts if that happens.
* In addition, you can create your own dashboards, charts, and alerts by using the internal metrics to investigate the problem.

You can also [examine the overall usage](examine_usage.html) and monitor how data is used by specific accounts, groups, sources, metric namespaces, or point tags, based on [ingestion policies](ingestion_policies.html).
