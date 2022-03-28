---
title: Permissions Reference
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: permissions_overview.html
summary: Learn about the permissions in Tanzu Observability by Wavefront.
---

Permissions allow administrators to control access to the feature sets in Tanzu Observability by Wavefront. Users with the **Accounts** permission can manage permissions for groups and users.

{% include note.html content="Every user can [perform certain tasks](user-accounts.html#what-can-a-new-user-do). However, you must have the appropriate permission to manage objects. If you do not have permission, UI menu selections and buttons required to perform management tasks are not visible." %}

{% include note.html content="A service account must have **permissions** to perform tasks. To run queries, a service account must have **Metrics** permission. To manage dashboards and alerts, the service account might need both permissions and [access](access.html). " %}

The following list gives an overview of permissions. To learn more, click the link.

- **[API Tokens](users_account_managing.html#generate-an-api-token)**

    A user with the **API Tokens** permission can [generate API tokens](users_account_managing.html#generate-an-api-token) for their user account. Service accounts *cannot* have this permission because only users with the **Accounts** permission can generate API tokens for service accounts.

- **[Accounts](users_roles.html)** 
    
    Users with the **Accounts** permission can manage user and service accounts. They can create groups and add accounts to groups, create roles and assign permissions to those roles, and assign roles to groups. They can generate API tokens for service accounts and manage the API tokens of all user and service accounts.
    
- **[Alerts](alerts.html)** 

    Users with the **Alerts** permission can create, edit, and delete alerts as well as maintenance windows, manage alert tags and view alert history, and create, edit, and delete alert targets.
    {% include note.html content="If the **Security** organization setting is set to Object Creator, **View** access or **View & Modify** access to new alerts has to be granted explicitly." %}
    
- **[Applications](tracing_apdex.html)** 

    Users with the **Applications** permission, can [update the threshold (T)](tracing_apdex.html) of the Application Performance Index (Apdex) score and [create sampling policies](trace_sampling_policies.html).
    
- **Batch Query Priority** 

    When an account with the **Batch Query Priority** permission runs queries, Tanzu Observability treats every query executed by that account as if it was wrapped in the [`bestEffort()` function](ts_bestEffort.html).
    
- **[Chart Embedding](ui_sharing.html#embed-a-chart-in-other-uis)**  
    
    Users with the **Chart Embedding** permission can generate HTML snippets of charts in Tanzu Observability and embed a corresponding interactive chart outside of Tanzu Observability. Embedded chart URLs are associated with a specific user account. If a user embeds a chart and later that user's account is removed, the embedded chart no longer works.
    
- **[Dashboards](ui_dashboards.html)** 

    Users with the **Dashboards** permission can create, manage, and delete all dashboards and charts and manage dashboard tags.
   
    {% include note.html content="If the **Security** organization setting is set to Object Creator, **View** access or **View & Modify** access to new dashboards has to be granted explicitly." %}
   
 - **[Derived Metrics](derived_metrics.html)** 
     
     Users with the **Derived Metrics** permission can create and manage registered queries. Derived metrics support reingesting a query.
     
- **[Direct Data Ingestion](direct_ingestion.html)**
    
    An account with the **Direct Data Ingestion** permission can directly ingest metrics using the Wavefront API or one of the Wavefront SDKs, bypassing the proxy. Grant this permission only to users who have a deep understanding of APIs and the Tanzu Observability ingestion path.
    
- **[Events](events.html)** 

    Users with the **Events** permission can create, manage, and close user events and manage event tags.
    
- **[External Links](external_links_managing.html)** 

    Users with the **External Links** permission can create, update, and delete external links.
    
- **[Integrations](integrations.html)**

    Users with the **Integrations** permission can install and uninstall integration dashboards, alerts, etc.
    
- **[Metrics](metric_types.html)**

    Service accounts must have this permission to run queries. Only accounts with the **Metrics** permission can manually hide and unhide metrics and metric prefixes. Only accounts with the **Metrics** permission can create and modify [Metrics Security Policy Rules](metrics_security.html).
    
- **[Proxies](proxies_installing.html#managing-proxy-services)** 

    Users with the **Proxies** permission can view, create, and manage proxies and set up external integrations with AWS and other cloud services.
    
- **SAML IdP Admin**

    Users with this permission can [set up and configure SAML SSO](auth_self_service_sso.html).
    
- **[Source Tags](sources_managing.html)**

    Users with the **Source Tags** permission can manage sources and source tags. If you don't have the **Source Tags** permission, source tags will be rejected with a 403 error.
