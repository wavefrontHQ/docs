---
title: Getting Started with Operations for Applications on VMware Cloud Services
tags: [administration]
sidebar: doc_sidebar
permalink: csp_getting_started.html
summary: Learn the basics and onboard Tanzu Observability to VMware Cloud services.
---
Starting June 1, 2023, VMware Aria Operations for Applications is a service in the VMware Cloud services catalog.

If your Operations for Applications service is onboarded to VMware Cloud services, VMware Cloud services provides features to your Operations for Applications environment, such as:
- Single sign-on (SSO) with VMware Cloud services accounts.
- Identity access management (IAM) for users and groups with built-in and custom service roles.
- SAML 2.0 SSO identity federation with your enterprise identity provider.
- Seamless integration with other services from your VMware Cloud services portfolio, such as VMWare Aria Operations for Logs and VMware Arial Operations Buisiness Insights.

{% include note.html content="All new Operations for Applications service instances from June 1, 2023 onwards are onboarded to VMware Cloud services. We are in the process of incrementally onboarding the existing Operations for Applications instances to VMware Cloud services."%}

## What Is the VMware Cloud Services Console?

The [VMware Cloud Services Console](https://console.cloud.vmware.com) lets you manage your entire VMware Cloud services portfolio across hybrid and native public clouds. Operations for Applications is one of the many services that you can access, configure, and consume through this console.

See [Using VMware Cloud Services Console](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-20D62AFF-024B-4901-976D-69BFD71BECC8.html) for more details.

## What Is a VMware Cloud Services Account?

A VMware Cloud services account is a user (human) account in VMware Cloud services with which you can access all of your service instances, including Operations for Applications. A VMware Cloud services account logs in to VMware Cloud services with an email address and password. A VMware Cloud services account can be one of the following:
- A VMware account (VMware ID) that you create in the VMware Cloud Services Console.

    You can create a VMware account independently, while [onboarding](start_trial.html) a service, or while [signing up](log_in_to_tanzu_observability.html#sign-up-with-an-email-invitation) to a service with an invitation link.
- Your corporate account if your enterprise domain is federated. You might still need to create a VMware account and link it to your corporate account if you need to access billing information in the organization. See [What is enterprise federation and how does it work](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html)

## What Is a VMware Cloud Organization?

VMware Cloud services uses organizations to provide controlled access to one or more services. The VMware Cloud organization is a top-level construct which owns users and cloud services (subscriptions). You can have multiple VMware Cloud organizations. Users can belong to multiple organizations. Multiple services can run in the same or in different organizations. For example, you can have a multi-tenat Operations for Applications environment with multiple service instances (tenants) in the same organization.

{% include note.html content="You can create a VMware Cloud organization only when you are onboarding a new service instance, for example, when you are [starting an Operations for Applications Free Trial](start_trial.html)."%}

See [How do I manage my Cloud Services organizations](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-CF9E9318-B811-48CF-8499-9419997DC1F8.html) for more details.

## What Is a VMware Cloud Organization Role?

A VMware account can belong to one or more VMware Cloud organizations. A VMware account belongs to a given VMware Cloud organization if the account has an organization role for that organization. The organization roles are:
- The **Organization Owner** role has full administrative access to all resources in the organization. They can invite users to the organization and assign role-based access to all users, including themselves. Also, they can kick off an enterprise domain federation and invite an **Enterprise Administrator**. See [Setting Up Enterprise Federation with VMware Cloud Services Guide](https://docs.vmware.com/en/VMware-Cloud-services/services/setting-up-enterprise-federation-cloud-services/GUID-76FAECB3-CFAA-461E-B9C9-2A49C39CD17F.html).

    When you create an organization during a service onboarding process, you become its first **Organization Owner**.
- The **Organization Administrator** role has as limited administrative access. Users with that role can invite and manage only users with the **Organization Member** role. Can have additional access with additional roles.
- The **Organization Member** role has read-only access to the resources in the organization. Can have additional access with additional roles.

See [What organization roles are available in VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html) for details.

## What Operations for Applications Permissions Are Available?
The Operations for Applications permissions in VMware Cloud services allow access control for the feature sets in Operations for Applications.
- Permissions can be assigned to roles only.
- Each each permission has a corresponding built-in [Operations for Applications service role](csp_getting_started.html#what-operations-for-applications-service-roles-are-available).
- You can assign permissions to custom roles.

<table>
    <tr>
      <th width="30%">Permission</th>
      <th width="70%">Description</th>
    </tr>
    <tr>
      <th>Alerts</th>
      <td>Can create, edit, and delete <a href="alerts.html">alerts</a>, <a href="webhooks_alert_notification.html">alert targets</a>, and <a href="maintenance_windows_managing.html">maintenance windows</a>. Also, can manage alert tags and view alert history.</td>
    </tr>
    <tr>
      <th>Applications</th>
      <td>Can <a href="tracing_apdex.html">update the threshold (T)</a> of the Application Performance Index (Apdex) score and <a href="trace_sampling_policies.html">create sampling policies</a>.</td>
    </tr>
    <tr>
      <th>Batch Query Priority</th>
      <td>When an account with that permission runs a query, the query engine treats that query as if it was wrapped in the <a href="trace_sampling_policies.html">bestEffort() function</a>.</td>
    </tr>
    <tr>
      <th>Chart Embedding</th>
      <td>Can <a href="ui_sharing.html#embed-a-chart-in-other-uis">generate HTML snippets of charts</a> in Operations for Applications and embed a corresponding interactive chart outside of Operations for Applications. Embedded chart URLs are associated with a specific user account. If a user embeds a chart and later that user’s account is removed, the embedded chart no longer works.</td>
    </tr>
    <tr>
      <th>Dashboards</th>
      <td>Can create, manage, and delete <a href="ui_dashboards.html">dashboards</a> and <a href="ui_charts.html">charts</a> and manage dashboard tags.</td>
    </tr>
    <tr>
      <th>Derived Metrics</th>
      <td>Can create and manage registered queries. <a href="derived_metrics.html">Derived metrics</a> support reingesting a query.</td>
    </tr>
    <tr>
      <th>Direct Data Ingestion</th>
      <td>Can <a href="direct_ingestion.html">directly ingest metrics</a> using the REST API or one of the SDKs, bypassing the proxy. Grant this permission only to users who have a deep understanding of APIs and the Operations for Applications ingestion path.</td>
    </tr>
    <tr>
      <th>Events</th>
      <td>Can create, manage, and close user <a href="events.html">events</a> and manage event tags.</td>
    </tr>
    <tr>
      <th>External Links</th>
      <td>Can create, update, and delete <a href="external_links_managing.html">external links</a>.</td>
    </tr>
    <tr>
      <th>Ingestion Policies</th>
      <td>Can create, edit, and delete <a href="ingestion_policies.html">ingestion policies</a>.</td>
    </tr>
    <tr>
      <th>Integrations</th>
      <td>Can install and uninstall <a href="integrations.html">integration dashboards and alerts</a>.</td>
    </tr>
    <tr>
      <th>Logs</th>
      <td>Can <a href="logging_log_browser.html">view logs</a> and <a href="logging_drill_into_logs.html">drill into logs</a> from charts, alerts, and traces. In combination with the <strong>Dashboards</strong> service role or permission, can <a href="logging_logs_chart.html">create logs charts</a>.
      <p><strong>Note:</strong> Logs (Beta) is enabled only for selected customers. To participate, contact your Operations for Applications account representative.</p></td>
    </tr>
    <tr>
      <th>Metrics</th>
      <td>Can manually <a href="metrics_managing.html#hide-and-redisplay-metrics">hide and unhide</a> metrics and metric prefixes. Also, can create and modify <a href="metrics_managing.html">metrics security policy rules</a>.
      <p><strong>Important:</strong> Server to server apps must have this permission to run queries. </p></td>
    </tr>
    <tr>
      <th>Proxies</th>
      <td>Can view, create, and manage <a href="proxies_installing.html">proxies</a> and set up external <a href="label_integrations%20list.html">integrations</a> with AWS and other cloud services.</td>
    </tr>
    <tr>
      <th>Source Tags</th>
      <td>Can manage <a href="sources_managing.html">sources</a> and source tags. If you don’t have this permission, source tags will be rejected with a 403 error.</td>
    </tr>
  </table>

## What Operations for Applications Service Roles Are Available?
VMware Cloud services includes:
-  A built-in Operations for Applications service role for each [Operations for Applications permission](csp_getting_started.html#what-operations-for-applications-permissions-are-available).
- Two special Operations for Applications service roles - one that grants full administrative access to the service, and one that grants read-only access to the service:

  <table>
  <tr>
    <th width="30%">Special Service Role</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <th id="sa">Super Admin</th>
    <td>When users with that service role <a href="csp_users_account_managing.html#enable-or-disable-super-admin-mode">enable Super Admin mode</a>, they:<ul>
    <li>Have all permissions.</li>
    <li>Have access to all dashboards and alerts.</li>
    <li>Can set the default preferences for all users of the service instance.</li>
    <li>Can restrict access for new dashboards and alerts.</li>
    <li>Can <a href="access.html#make-orphan-dashboards-or-alerts-visible">restore orphan dashboards and alerts</a>.</li>
    <li>Can upgrade from trial version and purchase Operations for Applications.</li>
    <li>Can purchase more PPS.</li>
    </ul>
    <p><strong>Tip:</strong> Combine the <strong>Super Admin</strong> service role with the roles that you want the user to have when Super Admin mode is disabled. </p></td>
  </tr>
  <tr>
    <th>Viewer</th>
    <td><ul>
    <li>No permissions.</li>
    <li>Has read-only access to the service.</li>
    </ul></td>
  </tr>
  </table>

## What Is a Custom Role?

Custom roles lets you combine service permissions of your choice, for example, [Operations for Applications permissions](csp_getting_started.html#what-operations-for-applications-permissions-are-available). A custom role can hold permissions for one or multiple services in your organization. For example, you can have a custom role that grants administrative permissions for one service instance and read-only permissions for another service instance.

To navigate to the **Roles** page:

1. Log in to the Cloud Services Console as an **Organization Owner** or **Organization Administrator**.
1. If necessary, switch to the target organization. See [How do I access another one of my Organizations](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-432417CF-CE0C-48EB-BEBB-8C27751577D1.html).
1. In the left navigation pane, click **Identity & Access Management** > **Roles**.

To create a custom role:

1. On the **Roles** page, click **Add Role**.
1. On the **Add permissions** step, expand services in the left panel and select permission IDs in the right panel, and click **Continue**.
1. On the **Role information** step, enter a meaningful role name and description, and click **Continue**.
1. On the **Review added permission** step, verify your selections and click **Save**.

To edit a custom role:

1. On the **Roles** page, click the name of the target custom role.
1. Edit the role name, description, or permissions, and click **Save**.

To delete a custom role:

1. On the **Roles** page, select one or more custom roles and click **Remove Roles**.
1. Click **Remove** to confirm.

## What Is a Server to Server App?

If you want to use an application for automating management tasks in your Operations for Applications service, your application requires direct access to your service, without user authorization. For that purpose, VMware Cloud services supports server-to-server apps, which are based on OAuth 2.0 *client credentials* grant type.

Here's how it works:

1. Create a server-to-server app in VMware Cloud organization for your application that requires direct access to your service.
1. Save the OAuth 2.0 client credentials of the server-to-server app.
1. Use the OAuth 2.0 client credentials with your application to retrieve an access token.

See [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html)