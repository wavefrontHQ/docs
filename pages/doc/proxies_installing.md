---
title: Install and Manage Wavefront Proxies
tags: [proxies, best practice]
sidebar: doc_sidebar
permalink: proxies_installing.html
summary: Learn how to install and manage Wavefront proxies.
---
Tanzu Observability (formerly known as VMware Aria Operations for Applications) offers several [deployment options](proxies.html#proxy-deployment-options). During development, a single proxy is often sufficient for all data sources. In production, place a team of proxies behind a load balancer.

In most cases, a Wavefront proxy must be running in your environment before metrics begin streaming to your Tanzu Observability service from a host or application.

{% include note.html content="You must have the [**Proxies** permission](permissions_overview.html) to install and manage Wavefront proxies." %}

{% include note.html content="Starting July 3, 2023, Tanzu Observability is a service on the VMware Cloud services platform. For information about VMware Cloud services subscriptions and original subscriptions and the differences between them, see [Subscription Types](subscriptions-differences.html).<br/>
- For VMware Cloud services subscriptions, starting with version 13.0, the Wavefront proxy supports authentication to Tanzu Observability with a VMware Cloud services access token. <br/>
- For original Tanzu Observability subscriptions, the Wavefront proxy 13.0 still supports authentication with a Tanzu Observability API token."%}

## Proxy Host Requirements

- Internet access - Run `timeout 3s curl -fIsS <api_url>` from the host and make sure you get a response and not a timeout.
- Networking:
  - By default, the proxy uses port 2878. Make sure this port is reachable from other machines on your network. You can change this default separately for different types of data (metrics, histograms, traces, etc.) in the [proxy configuration file](proxies_configuring.html). For example, use `traceListenerPorts` to specify where to listen to trace data.
  - For egress, ensure that port 443 is available.

    {% include important.html content="For VMware Cloud services subscriptions, to retrieve a VMware Cloud services access token, the Wavefront proxy calls the VMware Cloud services API. For that reason, your environment must allow an outbound HTTPS connection to the VMware Cloud services platform (`https://console.cloud.vmware.com/`)."%}

- Memory - The proxy does not use a lot of CPU, memory, or storage. However, we recommend running the proxy on a host with at least 4GB of free memory.
- CPU - A standalone proxy can easily handle up to 40K PPS (points per second). If you're sending more, use [multiple proxies behind a load balancer](proxies.html#production-environment-team-of-proxies--load-balancer).
- Operating system and JRE - Wavefront proxy is a Java application and can run on operating systems supported by Java. Java 8, 9, 10 or 11 is required. See the requirements in the [Wavefront Proxy README file](https://github.com/wavefrontHQ/wavefront-proxy#requirements).
- Other - Maven

{% include note.html content="The proxy uses disk space only for queue and buffering of metrics. The size of the buffer depends on the metrics size and the number of data points received and sent by the proxy. The individual proxy dashboards and the **Operations for Applications Service and Proxy Data** dashboard have several charts that allow you to examine proxy backlog size and related metrics. See [Monitoring Proxies](monitoring_proxies.html)." %}

<a name="single"></a>

## Proxy Authentication Types

* If your Tanzu Observability service instance **is** onboarded to VMware Cloud services, the proxy requires a VMware Cloud services access token with the **Proxies** [service role](csp_users_roles.html#tanzu-observability-service-roles-built-in). There are two options for the proxy to retrieve an access token. You can configure the proxy with:
    *	The credentials (ID and secret) of a VMware Cloud services server to server **OAuth app** and the ID of the VMware Cloud organization running the service.

        Before you add a proxy with an OAuth app, you must retrieve the credentials (ID and secret) of a server to server app that is assigned with the **Proxies** Tanzu Observability service role and added to the VMware Cloud organization running the service. See [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html?hWord=N4IgpgHiBcIMpgE4DckAIAuB7NBnJqiaAhgA6kgC+QA) in the VMware Cloud services documentation.

        Also, you must retrieve the VMware Cloud organization long ID. See [View the Organization ID](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-CF9E9318-B811-48CF-8499-9419997DC1F8.html#view-the-organization-id-1) in the VMware Cloud services documentation.

        {% include note.html content="When the access token expires, depending on the token TTL configuration of the server to server app, the proxy automatically retrieves a new access token."%}

    *	A VMware Cloud services **API token** that belongs to your user account.

        Before you add a proxy with an API token, you must have a VMware Cloud services API token that belongs to the VMware Cloud organization running the service and that is assigned with the **Proxies** service role. See [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html).

        {% include important.html content="You might need to regenerate and reconfigure the API token periodically depending on its TTL configuration."%}

* If your Tanzu Observability service instance **isn't** onboarded to VMware Cloud services, the proxy requires a Tanzu Observability **API token**.

    Before you add a proxy, you must have an API token associated with your user account or a service account with the **Proxies** permission. See [Manage API Tokens](api_tokens.html) for details.

## Install a Proxy

Many users install a proxy when they set up an integration. You can also install a proxy from the UI or perform a scripted installation manually.

{% include note.html content="In development, many customers use only one proxy that receives data from many applications and sends those data to Tanzu Observability. In production, consider using two proxies behind a load balancer. See [Proxy Deployment Options](proxies.html#proxy-deployment-options)." %}

### Install a Proxy from the UI

To install and run a proxy:

1. Log in to your service instance and select **Browse** > **Proxies**.
1. Click **Add New Proxy**.
1. If your service instance is onboarded to VMware Cloud services, click the tab for the [proxy authentication type](#proxy-authentication-types) of your choice - **OAuth app** or **API token**.
1. Click the tab for your operating system and follow the steps on screen.

    {% include tip.html content="If your service instance isn't onboarded to VMware Cloud services, the latest API token of your user account is prepopulated in the proxy installation command but you can change it."%}

The proxy starts listening on port 2878. You can customize listener ports with the [proxy configuration file](proxies_configuring.html).

### Scripted Proxy Installation

You can use steps in an integration or perform a package install.

* **Integration**: Click **Integrations** on the toolbar and find the host integration (Mac, Windows, or Linux). The **Setup** tab gives the installation script. For Mac and Linux, you can install the proxy with or without the Telegraf agent.
* **Package Install**: See [Installing a Proxy Manually](proxies_manual_install.html).

<a id="restart"></a>

## Manage Proxy Services

After installing a proxy, you can start and stop the proxy service, check service status, and view the logs that are generated by the service. See [Log Files](proxies_configuring.html#proxy-log-files) for customizing your proxy, including its log configuration options.

To view the current proxies in your environment, you can use the [Proxies Browser](monitoring_proxies.html#examine-your-proxies-with-the-proxies-browser).

<a id="starting-and-stopping-a-proxy"></a>

### Start and Stop a Proxy

{% include note.html content="When you stop the proxy service, the proxy becomes [orphaned](monitoring_proxies.html#get-started-with-the-proxies-browser). If the proxy is ephemeral, you cannot activate it again." %}

* On a non-ephemeral proxy, you can start the stopped proxy service again.
* On an ephemeral proxy, you cannot start the stopped proxy service again. The proxy is orphaned until you [delete](#delete-a-proxy) it. You can install a new proxy.
* On an ephemeral proxy, restarting the proxy service installs a new proxy with a new ID. The old proxy becomes orphaned until you  [delete](#delete-a-proxy) it.

Run the following commands on the proxy host:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">OS</th><th width="80%">Instructions</th></tr>
</thead>
<tr><td>Linux</td>
<td><code>service wavefront-proxy &lbrack;start | stop | restart&rbrack;</code></td></tr>
<tr>
<td markdown="span">Windows</td>
<td><code>
cd C:\Program Files (x86)\Wavefront\bin
.\nssm.exe [start | stop] WavefrontProxy
</code> </td></tr>

<tr><td>Mac OS</td>
<td><code>brew services [start | stop | restart] wfproxy</code></td></tr>
<tr><td>Docker</td>
<td><code>docker [start | stop ] &lt;proxy_container_id&gt;</code></td>
</tr>
</tbody>
</table>

### Check Proxy Service Status

To check if the proxy is running, run the following commands on the proxy host:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">OS</th><th width="80%">Instructions</th></tr>
</thead>
<tr><td>Linux</td>
<td><code>service wavefront-proxy status</code>
<p>Proxy log at <code>/var/log/wavefront/wavefront.log</code>.</p></td></tr>
<tr>
<td markdown="span">Windows</td>
<td><code>
cd C:\Program Files (x86)\Wavefront\bin
.\nssm.exe status WavefrontProxy</code>
<p>Proxy log at <code>Program Files (x86)\Wavefront\wavefront.log</code>.</p></td></tr>
<tr><td>Mac OS</td>
<td><code>brew services list</code>
<p>Proxy log at <code>/usr/local/var/log/wavefront/wavefront.log</code></p></td></tr>
</tbody>
</table>

<!---
- Linux

  ```shell
  $ service wavefront-proxy status
  ```
  You can view the proxy log at `/var/log/wavefront/wavefront.log`.
- Mac

  ```shell
  $ brew services list
  ```
  You can view the proxy log at `/usr/local/var/log/wavefront/wavefront.log`.

- Windows

  ```
  $ cd C:\Program Files (x86)\Wavefront\bin
  $ .\nssm.exe status WavefrontProxy
  ```
  You can view the proxy log at `Program Files (x86)\Wavefront\wavefront.log`.

- Docker

  ```
  $ docker ps
  ```
  To view the proxy log, run `docker logs <proxy_container_id>`.
--->

### Test a Proxy

You can test that a proxy is receiving and sending data as follows:

1. Send data by running the following command:

   ```shell
echo -e "test.metric 1 source=test_host\n" | nc <wavefront_proxy_address> 2878
   ```
   where `<wavefront_proxy_address>` is the address of your Wavefront proxy.
1. Log in to service instance and select **Browse > Metrics**.
1. In the Metrics field, type `test.metric`.
1. Click `test.metric` to display a chart of the metric.

### Upgrade a Proxy

New proxy versions with new features are released frequently. See the [Wavefront proxy GitHub page](https://github.com/wavefrontHQ/java/releases) for details.

{% include note.html content="Upgrading a proxy with a large proxy queue is not a good idea. The proxy will queue your data until the upgrade is complete, but the short-term result can be an even bigger proxy queue." %}

#### Upgrade from the UI

To upgrade from the UI, select **Browse > Proxies > Add New Proxy**. If an older version of the proxy exists, this process replaces it.

{% include note.html content="On Windows systems, you might have to uninstall the existing proxy first." %}

#### Upgrade from the Command Line

For Linux and Mac OS, can also upgrade a proxy from the command line as follows:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">OS</th><th width="80%">Instructions</th></tr>
</thead>
<tr><td>Linux</td>
<td><code>sudo apt-get update && sudo apt-get install wavefront-proxy</code></td></tr>
<tr>
<td markdown="span">Linux (RPM)</td>
<td><code>yum update wavefront-proxy
</code></td></tr>
<tr><td>Mac OS</td>
<td><code>brew update && brew upgrade wfproxy</code></td></tr>
</tbody>
</table>

#### Upgrade a Proxy on Docker

On Docker, you don't explicitly update the proxy version, but stop the proxy and then start the new version.

If you use a volume for the proxy buffer (queue) and you update from a version before 7.2 to 7.2 or later, permissions change:
* For earlier versions of the proxy, the proxy ran as `root:root`.
* Starting with version 7.2, the proxy runs as `wavefront:wavefront`.


{% include warning.html content="Ensure that either the proxy buffer (queue) is empty, or that the files on the buffer directory (volume) are owned by a user with id `1000` and group `2000` (which will translate to user `wavefront` on the docker image)." %}


If you performed the update and data are left in the proxy buffer, follow the steps in [Proxy Troubleshooting](proxies_troubleshooting.html#remove-queued-data-at-the-proxy).

### Uninstall a Proxy

When you upgrade a proxy, we uninstall the older version for you. You can also uninstall a proxy explicitly:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">OS</th><th width="80%">Instructions</th></tr>
</thead>
<tr>
<td markdown="span">Windows</td>
<td>The precise process depends on the version of Windows you're using. You follow the process for uninstalling programs. <ol><li>Click <strong>Start</strong>, and then click <strong>Control Panel</strong>.</li>
<li>Under Programs, click <strong>Uninstall a program</strong>.</li>
<li>Select <strong>Telegraf</strong> and click <strong>Uninstall</strong> at the top.</li>
<li>Select <strong>Wavefront Proxy</strong> and click <strong>Uninstall</strong> at the top.</li></ol></td></tr>
<tr><td>Linux</td>
<td><code>sudo apt-get remove wavefront-proxy
sudo apt-get remove telegraf</code></td></tr>
<tr><td>Linux (RPM)</td>
<td><code>sudo yum remove wavefront-proxy
sudo yum remove telegraf</code></td></tr>
<tr><td>Mac OS</td>
<td markdown="span">`bash -c "$(curl -s https://raw.githubusercontent.com/wavefrontHQ/homebrew-wavefront/master/sh/uninstall.sh)" `</td></tr>
</tbody>
</table>

### Delete a Proxy

On the [Proxies Browser](monitoring_proxies.html#get-started-with-the-proxies-browser) page, you can see the status and the details of each proxy in your environment. If you don't need an inactive proxy, you can delete it.

{% include note.html content="You cannot delete a proxy in **Active** status." %}

1. Log in to your service instance and select **Browse > Proxies**.
1. Select the check boxes for one or more proxies that you want to delete.
1. Click **Delete** and confirm.
1. In the top-right corner, from the drop-down menu, select **Deleted** and verify that the proxy was successfully deleted.

## See Also

Advanced users can export proxy data to a file and perform other customizations.

Here's some additional information in the doc:
* [Run a Proxy in a Container](proxies_container.html) shows how to install the proxy and Telegraf in a Docker container.
* [Export Data Queued at the Proxy](proxies_troubleshooting.html#manage-the-proxy-queue)
* [Install a Proxy in Non-Default Environments](proxies_manual_install.html)
* Use the [proxy configuration file](proxies_configuring.html) to customize proxy behavior for metrics, histograms, and traces.

Here's a KB article for TLS connections between two proxies:

* [How to enable TLS connection between two Wavefront Proxies](https://vmwaoa.zendesk.com/hc/en-us/articles/21299939293197-How-to-enable-TLS-connection-between-two-VMware-Aria-Operations-for-Applications-Proxies)
