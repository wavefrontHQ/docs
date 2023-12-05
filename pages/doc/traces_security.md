---
title: Traces Security Policy Rules
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: traces_security.html
summary: Use traces security to control access to application or service trace data.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for **original** subscribers. For VMware Cloud services subscriptions, see [Metrics Security Policy Rules in Operations for Applications on VMware Cloud Services](csp_metrics_security.html)."%}

In a large enterprise, certain data is confidential. VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) allows you to limit who can see or modify data in several ways.
* **Permissions** are **global** settings.
  - Some permissions limit who can modify objects (e.g. proxies or events). For example, users with **Dashboards** permission can modify all dashboards.
  -  Other permissions make certain information completely invisible. For example, only users with **SAML IdP Admin** permission can see the **Self Service SAML** menu or access that page.
* **Access Control** allows administrators with the right permissions fine-grained control over individual dashboards or alerts. For example, it's possible to limit view and modify access to the payment services traces only to the support team of the finance department.
* **Traces Security** supports even finer-grained control. In the example above, access to the payment service is limited to the Finance department. With metrics security, you can limit access to confidential time series, histogram, and delta counter metrics to the leadership team.

{% include important.html content="This feature is not available on all service instances." %}

{% include note.html content="Only a Super Admin user or users with **Metrics** permission can view, create, and manage metrics security policy. " %}