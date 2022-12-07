---
title: Monitor and Scale Kubernetes with Wavefront
keywords: containers, kubernetes
tags: [containers, kubernetes]
sidebar: doc_sidebar
permalink: wavefront_kubernetes.html
summary: Monitor Kubernetes infrastructure and applications. Scale Kubernetes workloads based on metrics in Tanzu Observability by Wavefront.
---
**Monitor your Kubernetes environment** at the infrastructure level and at the applications level with the Wavefront Collector for Kubernetes.

* Monitor Kubernetes infrastructure metrics (containers, pods, etc.) from our dashboards -- and create alerts from those dashboards.
* Automatically collect metrics from applications and workloads using built-in plug-ins such as Prometheus, Telegraf, etc.

**Scale your Kubernetes environment** based on the metrics sent to Tanzu Observability with the Wavefront Horizontal Pod Autoscaler Adapter.


## Videos

The following videos get you started.

<table style="width: 100%;">
<tbody>
<tr>
<td><strong><font color="#0091DA" size="3">Wavefront Operator for Kubernetes (August 2022)</font></strong><br>
<br>
<iframe id="kmsembed-1_chq9tgn6" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_chq9tgn6/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade"  frameborder="0" title="Wavefront Operator for Kubernetes"></iframe></td>
<td><br><br>
<p>This video is about recent changes to the install process and shows a demo. You can then get started by going to the following GitHub pages:
<ul>
<li><a href="https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes">Wavefront Operator for Kubernetes README</a></li>
<li><a href="https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes/blob/main/docs/migration.md">Wavefront Operator for Kubernetes Migration</a></li>
</ul>
</p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_chq9tgn6" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Kubernetes and Wavefront (January 2020)</font></strong><br>
<br>
<iframe id="kmsembed-1_rpculupf" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_rpculupf/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Tanzu Observability and Kubernetes"></iframe>
</td>
<td><br><br>
<p>This video includes some details on the  one-click install of the <a href="https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes">Wavefront Collector for Kubernetes</a>.</p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_rpculupf" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p> </td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Monitor and Scale Kubernetes with Wavefront (August 2019)</font></strong><br>
<br>
<iframe id="kmsembed-1_w7w6o0b4" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_w7w6o0b4/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Monitor and Scale Kubernetes with Tanzu Observability "></iframe>
</td>
<td><br><br>
<p>
This video gives you the big picture. It explains the different ways of monitoring Kubernetes with Tanzu Observability.</p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_w7w6o0b4" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
</tbody>
</table>



## Send Data from Your Kubernetes Environment

You can send data to Tanzu Observability in several ways:
*	**Direct**: Use the Wavefront Collector for Kubernetes to send data directly from your Kubernetes cluster to the Wavefront proxy. The Collector can collect metrics from Prometheus compatible applications and support a number of Telegraf plugins.

*	**Prometheus**: If you are already using Prometheus to view your data and want to monitor your Kubernetes data with Tanzu Observability, send data to the Wavefront Collector for Kubernetes.

![The diagram shows the different components and ways you can send data from your Kubernetes environment. The details are explained above.](images/kubernetes_overview_diagram.png)

To use the Wavefront Collector for Kubernetes, you must set up our Kubernetes integration. Use one of the following options:
* [**Recommended**] Directly by using the Tanzu Observability user interface. 

  The new [Wavefront Operator for Kubernetes](https://github.com/wavefrontHQ/wavefront-operator-for-kubernetes#configuration) supports deploying the Wavefront Collector and the Wavefront Proxy in Kubernetes.
  
  1. Log in to your Wavefront instance and click **Integrations** on the toolbar.
  1. In the Featured section, click the **Kubernetes** integration tile.
  1. On the **Setup** tab, click **Add Integration**.
  1. Install the integration using a Kubernetes cluster or OpenShift. You can [preview the setup steps here](kubernetes.html).
  
  ![A screenshot of the deployment options.](/images/kubernetes_installing_options.png)
  
* Follow the guidelines given in the [Bitnami guide](https://bitnami.com/stack/wavefront/helm).

{% include tip.html content="After installing the Wavefront Collector for Kubernetes by using the Kubernetes integration, you can customize it to fit the needs of your environment and use case. See the [docs on GitHub](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes#configuration) and examples for different use cases. " %}



## Monitor Kubernetes with Tanzu Observability

The Wavefront Collector for Kubernetes supports monitoring for your Kubernetes infrastructure at all levels of the stack.
* Set up the Wavefront Collector to have much of the monitoring happen automatically.
* Fine-tune and customize the solution with configuration options available in the Wavefront Collector for Kubernetes.

{% include note.html content="See the [list of metrics collected by the Wavefront Collector for Kubernetes](kubernetes.html#metrics)." %}

### Infrastructure Monitoring

Our Collector for Kubernetes collects metrics to give comprehensive insight into all layers of your Kubernetes environment, such as nodes, pods, services, and config maps.

Depending on the selected setup, metrics are sent to the Wavefront proxy and from there to the Tanzu Observability service. It's possible to send metrics using direct ingestion, but the Wavefront proxy is preferred for most cases.

![kubernetes core monitoring](/images/kubernetes_core.png)

The collector runs as a DaemonSet for high scalability and supports leader election for monitoring cluster-level resources.

### Host-Level Monitoring

The Wavefront Collector for Kubernetes supports automatic monitoring of host-level metrics and host-level `systemd` metrics. When you set up the collector, it auto-discovers pods and services in your environment and starts collecting host-level metrics.

You can [filter the metrics](https://github.com/wavefrontHQ/wavefront-kubernetes-collector/blob/main/docs/filtering.md) before they are reported to the Wavefront service.

### Application Monitoring

The Wavefront Collector for Kubernetes automatically starts collecting metrics from many commonly used applications:
* The collector auto discovers endpoints using labels. See [Auto Discovery](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/main/docs/discovery.md#auto-discovery).
* The collector also scrapes Prometheus metric endpoints such as API server, `etcd`, and NGINX.

You can also configure the Collector to collect data from Telegraf application sources, such as Redis, RabbitMQ. etc., using the [configuration.md](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/main/docs/configuration.md#telegraf_source) file.

The following diagram illustrates this:

![Kubernetes application monitoring](/images/kubernetes_apps.png)

## Visualize Kubernetes Data

Tanzu Observability gives you out-of-the-box dashboards once the Wavefront Collector for Kubernetes is installed via the integration. To access these dashboards, you need to:
1. Log in to your Wavefront instance and click **Integrations** on the toolbar.
1. Search for the Kubernetes integration and click it.
1. Click the **Dashboards** tab.

![This image shows the out-of-the box dashboards for Kubernetes: Kubernetes Summary dashboard, Kubernetes Clusters dashboard, Kubernetes Nodes dashboard, Kubernetes Pods dashboard, Kubernetes Containers dashboard, Kubernetes Namespaces dashboard, and Kubernetes Collector Metrics dashboard  ](images/wavefront_kubernetes_dashboards_default.png)

<!--The image needs to be replaced when we release the new status dashboard-->

<!--The Kubernetes Status dashboard gives details about the health of your integration.--> The Kubernetes Summary dashboard gives details on the health of your infrastructure and workloads. You can drill down from this dashboard and identify potential hotspots.

{{site.data.alerts.note}}
<p>These out-of-the-box dashboards are read-only. To create a customizable copy:</p>

<ol>
  <li>
    Open a dashboard, click the ellipsis icon in the top right, and select <strong>Clone</strong>.
  </li>
  <li>
    In the cloned dashboard, add your own charts or customize the RED metrics charts.
  </li>
</ol>
After you save the clone, click <b>Dashboards</b> on the toolbar and search for your dashboard by its name.
{{site.data.alerts.end}}

The out-of-the-box dashboards:

<table style="width: 100%;">
  <thead>
    <tr>
      <th>
        Dashboard
      </th>
      <th>
        Description
      </th>
    </tr>
  </thead>
  <!--<tr>
    <td width="20%" markdown="span">
      **Kubernetes Status**
    </td>
    <td width="80%">
       Details on the use of the Kubernetes Integration.
      <img src="images/kubernetes_status_dashboard.png" alt="a screenshot of the Kubernetes status dashboard with charts."/>
    </td>
  </tr>-->
  <tr>
    <td width="20%" markdown="span">
      **Kubernetes Summary**
    </td>
    <td width="80%">
      Detailed health of your infrastructure and workloads.
      <img src="images/kubernetes_summary_dahsboard.png" alt="a screenshot of the Kubernetes summary dashboard with charts."/>
    </td>
  </tr>
  <tr>
    <td width="20%" markdown="span">
        **Kubernetes Clusters**
    </td>
    <td width="80%">
      Detailed health of your clusters and their nodes, namespaces, pods, and containers.
      <img src="images/kubernetes_cluster_dahsboard.png" alt="a screenshot of the Kubernetes cluster dashboard with charts."/>
    </td>
  </tr>
  <tr>
    <td width="20%" markdown="span">
      **Kubernetes Nodes**
    </td>
    <td width="80%">
      Detailed health of your nodes.
        <img src="images/kubernetes_nodes_dahsboard.png" alt="a screenshot of the Kubernetes nodes dashboard with charts."/>
    </td>
  </tr>
  <tr>
    <td width="20%" markdown="span">
      **Kubernetes Pods**
    </td>
    <td width="80%">
      Detailed health of your pods broken down by node and namespace.
      <img src="images/kubernetes_pods_dahsboard.png" alt="a screenshot of the Kubernetes pods dashboard with charts."/>
    </td>
  </tr>
  <tr>
    <td width="20%" markdown="span">
      **Kubernetes Containers**
    </td>
    <td width="80%">
      Detailed health of your containers broken down by namespace, node, and pod.
      <img src="images/kubernetes_container_dahsboard.png" alt="a screenshot of the Kubernetes container dashboard with charts."/>
    </td>
  </tr>
  <tr>
    <td width="20%" markdown="span">
      **Kubernetes Namespaces**
    </td>
    <td width="80%">
      Details of your pods or containers broken down by namespace.
      <img src="images/kubernetes_namespaces_dahsboard.png" alt="a screenshot of the Kubernetes namespaces dashboard with charts."/>
    </td>
  </tr>
  <tr>
    <td width="20%" markdown="span">
      **Wavefront Collector for Kubernetes Metrics**
    </td>
    <td width="80%">
      Internal stats of the Wavefront Collector for Kubernetes.
      <img src="images/kubernetes_collector_metrics_dahsboard.png" alt="a screenshot of the Kubernetes collector metrics dashboard with charts."/>
    </td>
  </tr>
  <tr>
  <td width="20%" markdown="span">
  **Kubernetes Control Plane**
  </td>
  <td width="80%">
    Details on the Kubernetes control plane components.
    <img src="images/kubernetes_control_plane_dahsboard.png" alt="a screenshot of the Kubernetes control plane dashboard with charts."/>
  </td>
</tr>
</table>


## Scale Kubernetes with Tanzu Observability

The default Kubernetes infrastructure can include a [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/), which can automatically scale the number of pods. The Horizontal Pod Autoscaler gets CPU and memory information from the Kubernetes Metrics Server by default, and the Horizontal Pod Autoscaler uses that information.

The [Wavefront Horizontal Pod Autoscaler Adapter](https://www.github.com/wavefrontHQ/wavefront-kubernetes-adapter) allows you to scale based on *any* metric that it knows about.

For example, you can scale based on networking or disk metrics, or any application metrics that are available to Tanzu Observability. The Autoscaler Adapter sends the recommendation to the Horizontal Pod Autoscaler, and the Kubernetes environment is kept healthy as a result.

![Kubernetes scaling diagram](/images/kubernetes_scaling.png)

## Next Steps

* To monitor your Kubernetes clusters, set up the [Wavefront Kubernetes integration](kubernetes.html).
