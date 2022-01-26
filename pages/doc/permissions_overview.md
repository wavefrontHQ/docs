---
title: Permissions Reference
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: permissions_overview.html
summary: Learn about Wavefront permissions.
---

Permissions allow administrators to control access to Wavefront feature sets. Administrators can manage permissions for groups or for users.

{% include shared/badge.html content="Every Wavefront user can [perform certain tasks](user-accounts.html#what-can-a-new-user-do). However, you must have the appropriate permission to manage objects. If you do not have permission, UI menu selections and buttons required to perform management tasks are not visible." %}

{% include note.html content="A service account must have **permissions** to perform tasks. To run queries, a service account must have **Metrics** permission. To manage dashboards and alerts, the service account might need both permissions and [access](access.html). " %}

The following list gives an overview of permissions. To learn more, click the link.

- **[API Tokens](users_account_managing.html#generate-an-api-token)**

    A user with **API Tokens** permission can [generate API tokens](users_account_managing.html#generate-an-api-token) for their user account. Service accounts *cannot* have this permission.

- **[Accounts](users_roles.html)** 
    
    Users with **Accounts** permission can manage user and service accounts. They can create groups and add accounts to groups, create roles and assign permissions to those roles, and assign roles to groups.
    
- **[Alerts](alerts.html)** 

    Users with **Alerts** permission can create, edit, and delete alerts as well as maintenance windows, manage alert tags and view alert history, and create, edit, and delete alert targets.
    {% include note.html content="If the **Security** organization setting is set to Object Creator, **View** access or **View & Modify** access to new alerts has to be granted explicitly." %}
    
- **[Applications](tracing_apdex.html)** 

    Users with **Applications** permission, can [update the threshold (T)](tracing_apdex.html) of the Application Performance Index (Apdex) score and [create sampling policies](trace_sampling_policies.html).
    
- **Batch Query Priority** 

    When an account with **Batch Query Priority** permission runs queries, Wavefront treats every query executed by that account as if it was wrapped in the [`bestEffort()` function](ts_bestEffort.html).
    
- **[Chart Embedding](ui_sharing.html#embed-a-chart-in-other-uis)**  
    
    Users with **Chart Embedding** permission can generate HTML snippets of Wavefront charts and embed a corresponding interactive chart outside of Wavefront. Embedded chart URLs are associated with a specific user account. If a user embeds a chart and later that user's Wavefront account is removed, the embedded chart no longer works.
    
- **[Dashboards](ui_dashboards.html)** 

    Users with **Dashboards** permission can create, manage, and delete all dashboards and charts and manage dashboard tags.
   
    {% include note.html content="If the **Security** organization setting is set to Object Creator, **View** access or **View & Modify** access to new dashboards has to be granted explicitly." %}
   
 - **[Derived Metrics](derived_metrics.html)** 
     
     Users with **Derived Metrics** permission can create and manage registered queries. Derived metrics support reingesting a query.
     
- **[Direct Data Ingestion](direct_ingestion.html)**
    
    An account with **Direct Data Ingestion** permission can directly ingest metrics using the Wavefront API or one of the Wavefront SDKs, bypassing the proxy. Grant Direct Data Ingestion permission only to users who have a deep understanding of APIs and the Wavefront ingestion path.
    
- **[Events](events.html)** 

    Users with **Events** permission can create, manage, and close user events and manage event tags.
    
- **[External Links](external_links_managing.html)** 

    Users with **External Links** permission can create, update, and delete external links.
    
- **[Integrations](integrations.html)**

    Users with **Integrations** permission can install and uninstall integration dashboards, alerts, etc.
    
- **[Metrics](metric_types.html)**

    Service accounts must have this permission to run queries. Only accounts with **Metrics** permission can manually hide and unhide metrics and metric prefixes. Only accounts with **Metrics** permission can create and modify [Metrics Security Policy Rules](metrics_security.html).
    
- **[Proxies](proxies_installing.html#managing-proxy-services)** 

    Users with **Proxies** permission can view, create, and manage proxies and set up external integrations with AWS and other cloud services.
    
- **SAML IdP Admin**

    Users with this permission can [set up and configure SAML SSO](auth_self_service_sso.html).
    
- **[Source Tags](sources_managing.html)**

    Users with **Source Tags** permission can manage sources and source tags. If you don't have **Source Tags** permission, source tags will be rejected with a 403 error.
