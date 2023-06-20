---
title: Manage Server to Server Apps
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_server_to_server_apps.html
summary: Create server to server apps and grant them access to VMware Aria Operations for Applications on VMware Cloud services.
---

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. The content in this chapter is valid for VMware Cloud services subscriptions. For **original** subscriptions, see [Manage Service Accounts](service-accounts.html)."%}

VMware Cloud services supports server to server apps that you can use to automate management of Operations for Applications objects, such as dashboards, alerts, etc. A server to server app can't perform the **UI operations** that all user accounts can [perform by default](csp_permissions_overview.html#default-tasks).

{% include note.html content="A server to server app must hold roles with certain [permissions](csp_permissions_overview.html#operations-for-applications-permissions) to perform tasks. To run queries, a server to server app must hold the [**Metrics** service role](csp_users_roles.html#operations-for-applications-service-roles-built-in) or a [custom role](csp_users_roles.html#create-edit-or-delete-a-custom-role) with the **Metrics** permission. To manage dashboards and alerts, the server to server app might need both roles with permissions and [access](csp_access.html)." %}

## What Are Server to Server Apps?

Server to server apps are used for automating management tasks. 

* A server to server app uses **OAuth 2.0 client credentials** to authenticate. Access tokens are issued directly to the application.
* A server to server app can be assigned with organization roles, service roles, and custom roles.

  {% include note.html content="You must explicitly grant each server to server app only the role with the permission required for the task that’s being automated (least required privilege). Doing so, you ensure that permissions for server to server app are always very limited." %}
* A server to server app can be used in multiple organizations. The owner of a server to server app is the organization in which it was created.
* A Server to server app in VMware Cloud services corresponds to a service account in Operations for Applications.

## How Server to Server Apps Work

{% include note.html content="To manage server to server apps, you must hold either the VMware Cloud **Organization Owner** role or the VMware Cloud **Developer** additional role. See [What organization roles are available in VMware Cloud Services](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-C11D3AAC-267C-4F16-A0E3-3EDF286EBE53.html) in the VMware Cloud services documentation." %}

If you build an application or tool that manages proxies or ingests data, then that tool must authenticate to the Operations for Applications REST API. Here's how it works:

1. Create a server to server app in VMware Cloud services.
1. Assign one or more roles to the server to server app to grant it the [Operations for Applications permissions](csp_permissions_overview.html#operations-for-applications-permissions) it needs.
1. Obtain the OAuth 2.0 client credentials of the server to server app.
1. Add the app to your organization.
1. Configure your tool to pass the OAuth 2.0 client credentials to the REST API.

See [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.

   The access token is directly issued to your tool and it authenticates seamlessly to the API.

After you create a server to server app, you can change its roles, share it with organizations, and delete it when no longer need it.

