---
title: Administer Wavefront
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_administer.html
summary: Understand what you can do as a Wavefront administrator.
---

As a Wavefront administrator you can perform a variety of tasks, such as:

* Manage the authorization and access in the Wavefront environment.
* Set up the authentication in your environment by setting up SSO using an identity provider (IdP).
* Monitor and troubleshoot the Wavefront environment and usage.

## Authorization

As an administrator, you can:

* Create roles with permissions and assign roles to users or groups.
* Manage user and service accounts.
* Protect individual dashboards or alerts and grant access only to selected groups or accounts.
* Protect metrics or groups of metrics using metrics security policy rules.


## Authentication

You can set up authentication in your environment by setting up single sign-on using an identity provider (IdP), so that users log in by using SSO instead of a username and password. In single-tenant authentication environment, you can set up or update self-service SAML SSO. You can also set up multi-tenancy, which is configured jointly by you -- the Wavefront administrator at the customer site, and the Wavefront team.

## Monitor and Troubleshoot

You can use the Wavefront Usage integration dashboards to monitor and troubleshoot your Wavefront environment. By using the dashboards in this integration, you can:

* Get usage information for your Wavefront instance and Wavefront proxy.
* Drill down into the metrics namespaces to discover trends.
* Examine the points per second (PPS) usage based on predefined ingestion policies.
* See whether the ingested metrics are at 95% of the committed rate and optionally get alerts if that happens.
* In addition, you can create your own dashboards, charts, and alerts by using the internal metrics to investigate the problem.
