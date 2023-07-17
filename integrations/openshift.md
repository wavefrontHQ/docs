---
title: OpenShift Integration
tags: [integrations list]
permalink: openshift.html
summary: Learn about the OpenShift Integration.
---

This page provides an overview of what you can do with the OpenShift integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the OpenShift integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **OpenShift** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Kubernetes Integration

Operations for Applications provides a comprehensive solution for monitoring Kubernetes. This integration uses the [Observability for Kubernetes Operator](https://github.com/wavefrontHQ/observability-for-kubernetes) to collect detailed metrics from Kubernetes clusters.

### Collection
The Observability for Kubernetes Operator makes it easy for you to monitor and manage your Kubernetes environment:

* Collects real-time metrics from all layers of a Kubernetes environment (clusters, nodes, pods, containers and the Kubernetes control plane).
* Supports plugins such as Prometheus, Telegraf and Systemd enabling you to collect metrics from various workloads.
* [Auto discovery](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/discovery.md) of pods and services based on annotation and configuration.
* Daemonset mode for high scalability with leader election for monitoring cluster-level resources.
* Rich [filtering](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/filtering.md) support.
* Auto reload of configuration changes.
* [Internal metrics](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/metrics.md#collector-health-metrics) for tracking the collector health and source of your Kubernetes metrics.

### Dashboards

In addition to setting up the metrics flow, this integration also installs dashboards:

* Kubernetes Status: Detailed health of your Kubernetes integration.
* Kubernetes Summary: Detailed health of your infrastructure and workloads.
* Kubernetes Clusters: Detailed health of your clusters and its nodes, namespaces, pods and containers.
* Kubernetes Nodes: Detailed health of your nodes.
* Kubernetes Pods: Detailed health of your pods broken down by node and namespace.
* Kubernetes Containers: Detailed health of your containers broken down by namespace, node and pod.
* Kubernetes Namespaces: Details of your pods/containers broken down by namespace.
* Kubernetes Metrics Collector Troubleshooting: Internal stats of the Kubernetes Metrics Collector.
* Kubernetes Control Plane: Details of your Kubernetes control plane components.

Here's a preview of the Kubernetes Summary dashboard:

{% include image.md src="images/db_kubernetes_summary.png" width="80" %}

Here's a preview of the Kubernetes Pods dashboard:

{% include image.md src="images/db_kubernetes_pods.png" width="80" %}


## Kubernetes Clusters Integrations

Operations for Applications uses the [Observability for Kubernetes Operator](https://github.com/wavefrontHQ/observability-for-kubernetes "Observability for Kubernetes GitHub repository") to monitor your Kubernetes clusters.
**Note**: Tanzu Mission Control users follow the steps given in the [Tanzu Mission Control](https://docs.vmware.com/en/VMware-Tanzu-Mission-Control/services/tanzumc-using/GUID-E448F0BD-1DAB-4AAE-851D-0501CB3AA7AE.html) documentation.



## Add a Kubernetes Integration

VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) provides a comprehensive solution for monitoring Kubernetes. To set up the Kubernetes integration, you must install and configure our Kubernetes Metrics Collector and a Wavefront proxy. With the 2022-48.x release we introduced the Kubernetes Observability Operator which simplifies the deployment of the Kubernetes Metrics Collector and the Wavefront proxy. 

The setup process varies based on the distribution type that you choose to monitor. 


1. Log in to your product cluster.
2. Click **Integrations** on the toolbar.
3. In the **Featured** section, click the **Kubernetes** tile.
4. Click **Add Integration**.


### Kubernetes Quick Install Using the Kubernetes Operator

1. In the **Collector Configuration** section, configure the deployment options for the cluster.
    1. In the **Cluster Name** text box provide the name of your Kubernetes cluster.
    1. Choose the **Kubernetes Cluster** as a distribution type. 
1. Choose whether you want to see the logs for your cluster. By default, the **Logs (Beta)** option is enabled.
1. Choose whether you want to enable or disable **Metrics**. By default, the **Metrics** option is enabled.
1. Choose whether you want to use an **HTTP Proxy**. 
   If you enable HTTP proxy, to allow outbound traffic, you must add these URLs to your proxy rules:
    * **Logs (Beta)**: <code>https://data.mgmt.cloud.vmware.com</code>
    * **Metrics**: <code>https://your_cluster.wavefront.com/</code>
      
   In addition, you must also configure the HTTP proxy settings, such as: 
  
      1. **Host Name** - HTTP proxy host name.
      2. **Port** - HTTP proxy port number.
      3. **HTTP Proxy Authentication** - Can be either basic (with user name and password), or CA certificate - based (with a CA certificate).

1. Enter the authentication options and click **Next**.
   
   You can authenticate to the Operations for Applications REST API by using either a user account, or a service account. In both cases, the account must have an API token associated with it.
   
1. From the **Script** section, get the deployment script. 
    1. Review the script and click the **Copy to clipboard** button.
    1. Run the script in your Kubernetes cluster.
1. After successful installation, return back to the Operations for Applications GUI, and click **Finish**.

### Kubernetes Install in an OpenShift Cluster

Complete the steps below and click **Finish**.

**Note**: Logs (Beta) is not supported when you use OpenShift.


#### Install and Configure the Operations for Applications Helm Chart on OpenShift Enterprise 4.x
    
This section contains the installation and configuration steps for full-stack monitoring of OpenShift clusters using the Operations for Applications Helm Chart.
    
**Install the Operations for Applications Helm Chart**
    
1. Log in to the OpenShift Container Platform web console as an administrator.
    
2. Create a project named <code>MyProject</code>.
    
3. In the left pane, navigate to **Helm** and select **Install a Helm Chart from the developer catalog**.
    
4. Search for **MyProject** and click **Install Helm Chart**.
    
5. Install from the **form view** tab. Replace the following parameters with your values:

    * clusterName: &lt;OPENSHIFT_CLUSTER_NAME&gt;
    * token: [&lt;YOUR_WF_API_TOKEN&gt;](https://docs.wavefront.com/users_account_managing.html#generate-an-api-token)
    * url: https://&lt;YOUR_WF_INSTANCE&gt;.wavefront.com
    
6. Click **Install**.
    
   Because default parameters are used, the Kubernetes Metrics Collector runs as a DaemonSet and uses a Wavefront proxy as a sink. The Collector auto discovers the pods and services that expose metrics and dynamically starts collecting metrics for the targets. It collects metrics from the Kubernetes API server, if configured.
    
   Now, go back to your Operations for Applications cluster and search for the <code>OPENSHIFT_CLUSTER_NAME</code> in the Kubernetes integration dashboards.
    
**Configure the Collector to Use an Existing Proxy**    

To configure the Kubernetes Metrics Collector to use a Wavefront proxy that's already running in your environment, follow these steps:
    
1. In the OpenShift Container Platform web console, on the **yaml view** tab, in the **proxy** section, set **enabled** to false:

    ```yaml
          proxy:
            enabled: false
    ```

    
2. On the **yaml view** tab, add **proxyAddress** under **collector**.
     
     ```yaml
          collector:
            proxyAddress: <YOUR_WF_PROXY_ADDRESS>:2878
      ```
  
    
3. Click **Install**.
    
    
**Advanced Wavefront Proxy Configuration**
    
  You can configure the proxy to change how it processes your data, port numbers, metric prefix, etc. 
  
**Configure the Wavefront Proxy Preprocessor Rules**
    
[Preprocessor rules](https://docs.wavefront.com/proxies_preprocessor_rules.html) allow you to manipulate incoming metrics before they reach the proxy. For example, you can remove confidential text strings or replace unacceptable characters. Follow these steps to create a `ConfigMap` with custom preprocessor rules:
    
1. In the left pane, navigate to **Helm**, and choose your installation.
    
2. Under **Actions**, click **Upgrade**.
  
3. On the **yaml view** tab, under **proxy**, add **preprocessor**.
  ```yaml
        proxy:
          preprocessor:
            rules.yaml: |
              '2878':
                # fix %2F to be a / instead.  May be required on EKS.
                - rule    : fix-forward-slash
                  action  : replaceRegex
                  scope   : pointLine
                  search  : "%2F"
                  replace : "/"
                # replace bad characters ("&", "$", "!", "@") with underscores in the entire point line string
                - rule    : replace-badchars
                  action  : replaceRegex
                  scope   : pointLine
                  search  : "[&\\$!@]"
                  replace : "_"
  ```
4. Click **Upgrade**.
    
    
#### Install and Configure the Collector on OpenShift Enterprise 3.x

**Note**: The Helm or manually-installed Kubernetes Metrics Collector and Wavefront proxy is deprecated. Our new Observability for Kubernetes Operator replaces the Helm or manually installed Kubernetes Metrics Collector and Wavefront proxy for all Kubernetes Distributions except for OpenShift Container Platform. For more information, see [Obsolescence and Remediation](https://docs.wavefront.com/wavefront_obsolescence_policy.html#kubernetes-integration).

Our Collector supports monitoring of OpenShift clusters:
    
* To monitor OpenShift Origin 3.9, follow the steps in [Installation and Configuration on OpenShift](https://github.com/wavefronthq/wavefront-kubernetes-collector/tree/main/docs/openshift.md).
    
* To monitor OpenShift Enterprise 3.11, follow the steps in [Installation and Configuration of the Operator on OpenShift](https://github.com/wavefronthq/wavefront-kubernetes-collector/tree/main/docs/openshift-operator.md).

### Kubernetes Quick Install Using Helm


1. Ensure that you have installed [Helm](https://helm.sh/docs/intro/).
2. Add the Wavefront Helm repo:
```
helm repo add wavefront https://wavefronthq.github.io/helm/
helm repo update
```
3. To deploy the Collector and Wavefront Proxy:

    Using Helm 2:
    ```
    helm install wavefront/wavefront --name wavefront --set wavefront.url=https://YOUR_CLUSTER.wavefront.com --set wavefront.token=YOUR_API_TOKEN --set clusterName=<YOUR_CLUSTER_NAME> --namespace wavefront
    ```
    Using Helm 3:
    ```
    kubectl create namespace wavefront
    helm install wavefront wavefront/wavefront --set wavefront.url=https://YOUR_CLUSTER.wavefront.com --set wavefront.token=YOUR_API_TOKEN --set clusterName=<YOUR_CLUSTER_NAME> --namespace wavefront
    ```

**Note:** The `clusterName` property refers to the Kubernetes cluster, for example, `dev-cluster`. You must set this property. For vSphere Tanzu, add `--set vspheretanzu.enabled=true` along with Helm install command.

Refer to our [Helm chart](https://github.com/wavefrontHQ/helm/tree/master/wavefront) for further options.

### Kubernetes Manual Install

Follow the instructions below to manually set up Kubernetes monitoring. For more details about the available options, see the [Collector for Kubernetes Configuration](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/configuration.md).


#### Step 1. Deploy a Wavefront Proxy in Kubernetes

1. Download [wavefront.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes/master/wavefront-proxy/wavefront.yaml) to your system.
2. Edit the file and set `WAVEFRONT_URL` to `https://YOUR_CLUSTER.wavefront.com/api/` and `WAVEFRONT_TOKEN` to `YOUR_API_TOKEN`.
3. Run `kubectl create -f </path/to>/wavefront.yaml` to deploy the proxy.

The Wavefront proxy and a `wavefront-proxy` service should now be running in Kubernetes.

#### Step 2. Deploy the Collector for Kubernetes

1. Create a directory named `wavefront-collector-dir` and download the following files to that directory:
  * [0-collector-namespace.yaml](https://raw.githubusercontent.com/wavefrontHQ/observability-for-kubernetes/main/collector/deploy/kubernetes/0-collector-namespace.yaml)
  * [1-collector-cluster-role.yaml](https://raw.githubusercontent.com/wavefrontHQ/observability-for-kubernetes/main/collector/deploy/kubernetes/1-collector-cluster-role.yaml)
  * [2-collector-rbac.yaml](https://raw.githubusercontent.com/wavefrontHQ/observability-for-kubernetes/main/collector/deploy/kubernetes/2-collector-rbac.yaml)
  * [3-collector-service-account.yaml](https://raw.githubusercontent.com/wavefrontHQ/observability-for-kubernetes/main/collector/deploy/kubernetes/3-collector-service-account.yaml)
  * [4-collector-config.yaml](https://raw.githubusercontent.com/wavefrontHQ/observability-for-kubernetes/main/collector/deploy/kubernetes/4-collector-config.yaml)
  * [5-collector-daemonset.yaml](https://raw.githubusercontent.com/wavefrontHQ/observability-for-kubernetes/main/collector/deploy/kubernetes/5-collector-daemonset.yaml)

    
2. Edit `4-collector-config.yaml` and replace `clusterName: k8s-cluster` with the name of your Kubernetes cluster.

3. If RBAC is disabled in your Kubernetes cluster, edit `5-collector-daemonset.yaml` and comment out `serviceAccountName: wavefront-collector`.

4. Run `kubectl create -f </path/to/wavefront-collector-dir>/` to deploy the collector on your cluster.

To verify the collector is deployed, run `kubectl get pods -n wavefront-collector`.

#### Step 3. (Optional) Deploy the kube-state-metrics Service

The Kubernetes Metrics Collector natively collects various [metrics](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/metrics.md#kubernetes-state-source) about the state of Kubernetes resources. You can optionally deploy the third party [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) service to collect additional metrics.

To deploy kube-state-metrics:

1. Download [kube-state.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes/master/ksm-all-in-one/kube-state.yaml) to your system.
2. Run `kubectl create -f </path/to>/kube-state.yaml`.

The `kube-state-metrics` service starts running on your cluster. Our Kubernetes Metrics Collector automatically discovers the service and starts collecting metrics from the kube-state-metrics service.

### Learn More

* [Kubernetes Overview](https://docs.wavefront.com/wavefront_kubernetes.html)
* [Kubernetes Troubleshooting](https://docs.wavefront.com/kubernetes_troubleshooting.html)


## Metrics

* [Kubernetes Source](#kubernetes-source)
* [Kubernetes State Source](#kubernetes-state-source)
* [Prometheus Source](#prometheus-source)
* [Systemd Source](#systemd-source)
* [Telegraf Source](#telegraf-source)
* [Collector Health](#collector-health-metrics)
* [cAdvisor Metrics](#cadvisor-metrics)
* [Control Plane Metrics](#control-plane-metrics)

This information comes directly from the [Observability for Kubernetes Operator GitHub page](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/metrics.md).

### Kubernetes Source

These metrics are collected from the `/stats/summary` endpoint on each [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) running on a node.

Metrics collected per resource:

| Resource | Metrics |
|----------|---------|
| Cluster | CPU, Memory, Pod/Container counts |
| Namespace | CPU, Memory, Pod/Container counts |
| Nodes | CPU, Memory, Network, Filesystem, Storage, Uptime, Pod/Container counts |
| Pods | CPU, Memory, Network, Filesystem, Storage, Uptime, Restarts, Phase |
| Pod_Containers | CPU, Memory, Filesystem, Storage, Accelerator, Uptime, Restarts, Status |
| System_Containers | CPU, Memory, Uptime |

Metrics collected per type:

| Metric Name | Description |
|------------|-------------|
| cpu.limit | CPU hard limit in millicores. |
| cpu.node_capacity | CPU capacity of a node. |
| cpu.node_allocatable | CPU allocatable of a node in millicores. |
| cpu.node_reservation | Share of CPU that is reserved on the node allocatable in millicores. |
| cpu.node_utilization | CPU utilization as a share of node allocatable in millicores. |
| cpu.request | CPU request (the guaranteed amount of resources) in millicores. |
| cpu.usage | Cumulative amount of consumed CPU time on all cores in nanoseconds. |
| cpu.usage_rate | CPU usage on all cores in millicores. |
| cpu.usage_millicores | CPU usage (sum of all cores) averaged over the sample window in millicores. |
| cpu.load | CPU load in milliloads, i.e., runnable threads * 1000. |
| memory.limit | Memory hard limit in bytes. |
| memory.major_page_faults | Number of major page faults. |
| memory.major_page_faults_rate | Number of major page faults per second. |
| memory.node_capacity | Memory capacity of a node. |
| memory.node_allocatable | Memory allocatable of a node. |
| memory.node_reservation | Share of memory that is reserved on the node allocatable. |
| memory.node_utilization | Memory utilization as a share of memory allocatable based on memory.working_set. |
| memory.page_faults | Number of page faults. |
| memory.page_faults_rate | Number of page faults per second. |
| memory.request | Memory request (the guaranteed amount of resources) in bytes. |
| memory.usage | Total memory usage. |
| memory.cache | Cache memory usage. |
| memory.rss | RSS memory usage. |
| memory.working_set | Total working set usage. Working set is the memory being used and not easily dropped by the kernel. |
| network.rx | Cumulative number of bytes received over the network. |
| network.rx_errors | Cumulative number of errors while receiving over the network. |
| network.rx_errors_rate | Number of errors while receiving over the network per second. |
| network.rx_rate | Number of bytes received over the network per second. |
| network.tx | Cumulative number of bytes sent over the network. |
| network.tx_errors | Cumulative number of errors while sending over the network. |
| network.tx_errors_rate | Number of errors while sending over the network. |
| network.tx_rate | Number of bytes sent over the network per second. |
| filesystem.usage | Total number of bytes consumed on a filesystem. |
| filesystem.limit | The total size of filesystem in bytes. |
| filesystem.available | The number of available bytes remaining in a the filesystem. |
| filesystem.inodes | The number of available inodes in a the filesystem. |
| filesystem.inodes_free | The number of free inodes remaining in a the filesystem. |
| ephemeral_storage.limit | Local ephemeral storage hard limit in bytes. |
| ephemeral_storage.request | Local ephemeral storage request (the guaranteed amount of resources) in bytes. |
| ephemeral_storage.usage | Total local ephemeral storage usage. |
| ephemeral_storage.node_capacity | Local ephemeral storage capacity of a node. |
| ephemeral_storage.node_allocatable | Local ephemeral storage allocatable of a node. |
| ephemeral_storage.node_reservation | Share of local ephemeral storage that is reserved on the node allocatable. |
| ephemeral_storage.node_utilization | Local ephemeral utilization as a share of ephemeral storage allocatable. |
| accelerator.memory_total | Memory capacity of an accelerator. |
| accelerator.memory_used | Memory used of an accelerator. |
| accelerator.duty_cycle | Duty cycle of an accelerator. |
| accelerator.request | Number of accelerator devices requested by container. For example, nvidia.com.gpu.request. |
| uptime  | Number of milliseconds since the container was started. |
| <cluster, ns, node>.pod.count | Pod counts by cluster, namespaces and nodes. |
| <cluster, ns, node>.pod_container.count | Container counts by cluster, namespaces and nodes. |

## Kubernetes State Source

These are cluster level metrics about the state of Kubernetes objects collected by the Collector leader instance.

| Resource | Metric Name | Description |
|----------|---------|-------------|
| Deployment | deployment.desired_replicas | Number of desired pods. |
| Deployment | deployment.available_replicas | Total number of available pods (ready for at least minReadySeconds). |
| Deployment | deployment.ready_replicas | Total number of ready pods. |
| Replicaset | replicaset.desired_replicas | Number of desired replicas. |
| Replicaset | replicaset.available_replicas | Number of available replicas (ready for at least minReadySeconds). |
| Replicaset | replicaset.ready_replicas | Number of ready replicas. |
| ReplicationController | replicationcontroller.desired_replicas | Number of desired replicas. |
| ReplicationController | replicationcontroller.available_replicas | Number of available replicas (ready for at least minReadySeconds). |
| ReplicationController | replicationcontroller.ready_replicas | Number of ready replicas. |
| Daemonset | daemonset.desired_scheduled | Total number of nodes that should be running the daemon pod. |
| Daemonset | daemonset.current_scheduled | Number of nodes that are running at least 1 daemon pod and are supposed to run the daemon pod. |
| Daemonset | daemonset.misscheduled | Number of nodes that are running the daemon pod, but are not supposed to run the daemon pod. |
| Daemonset | daemonset.ready | Number of nodes that should be running the daemon pod and have one or more of the daemon pod running and ready. |
| Statefulset | statefulset.desired_replicas | Number of desired replicas. |
| Statefulset | statefulset.current_replicas | Number of Pods created by the StatefulSet controller from the StatefulSet version indicated by currentRevision.
| Statefulset | statefulset.ready_replicas | Number of Pods created by the StatefulSet controller that have a Ready Condition. |
| Statefulset | statefulset.updated_replicas | Number of Pods created by the StatefulSet controller from the StatefulSet version indicated by updateRevision. |
| Job | job.active | Number of actively running pods. |
| Job | job.failed | Number of pods which reached phase Failed. |
| Job | job.succeeded | Number of pods which reached phase Succeeded. |
| Job | job.completions | Desired number of successfully finished pods the job should be run with. -1.0 indicates the value was not set. |
| Job | job.parallelism | Maximum desired number of pods the job should run at any given time. -1.0 indicates the value was not set. |
| CronJob | cronjob.active | Number of currently running jobs. |
| HorizontalPodAutoscaler | hpa.desired_replicas | Desired number of replicas of pods managed by this autoscaler as last calculated by the autoscaler. |
| HorizontalPodAutoscaler | hpa.min_replicas | Lower limit for the number of replicas to which the autoscaler can scale down. |
| HorizontalPodAutoscaler | hpa.max_replicas | Upper limit for the number of replicas to which the autoscaler can scale up. |
| HorizontalPodAutoscaler | hpa.current_replicas | Current number of replicas of pods managed by this autoscaler, as last seen by the autoscaler. |
| Node | node.status.condition | Status of all running nodes. |
| Node | node.spec.taint | Node taints (one metric per node taint). |
| Node | node.info | Detailed node information (kernel version, kubelet version etc). |

## Prometheus Source

Varies by scrape target.

## Systemd Source

These are Linux systemd metrics that can be collected by each Collector instance.

| Metric Name | Description |
|------------|-------------|
| kubernetes.systemd.unit.state | Unit state (active, inactive etc). |
| kubernetes.systemd.unit.start.time.seconds | Start time of the unit since epoch in seconds. |
| kubernetes.systemd.system.running | Whether the system is operational ( `systemctl is-system-running` ). |
| kubernetes.systemd.units | Top level summary of systemd unit states (# of active, inactive units etc). |
| kubernetes.systemd.service.restart.total | Service unit count of Restart triggers. |
| kubernetes.systemd.timer.last.trigger.seconds | Seconds since epoch of last trigger. |
| kubernetes.systemd.socket.accepted.connections.total | Total number of accepted socket connections. |
| kubernetes.systemd.socket.current.connections | Current number of socket connections. |
| kubernetes.systemd_socket_refused_connections_total | Total number of refused socket connections. |

## Telegraf Source

Host metrics:

| Metric Prefix | Metrics Collected |
|------------|-------------|
| mem. | [metrics list](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mem#metrics) |
| net. | [metrics list](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/net/README.md#measurements--fields) |
| netstat. | [metrics list](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/netstat/README.md#measurements) |
| linux.sysctl.fs. | [metrics list](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/linux_sysctl_fs#linux-sysctl-fs-input) |
| swap. | [metrics list](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/swap#metrics) |
| cpu. | [metrics list](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/cpu#measurements) |
| disk. | [metrics list](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/disk#metrics) |
| diskio. | [metrics list](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/diskio#metrics) |
| system. | [metrics list](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/system#metrics) |
| kernel. | [metrics list](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/kernel#measurements--fields) |
| processes. | [metrics list](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/processes#measurements--fields) |

Application metrics:

| Plugin Name | Metrics Collected |
|------------|-------------|
| activemq | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/activemq#measurements--fields) |
| apache | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/apache#measurements--fields) |
| consul | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/consul#metrics) |
| couchbase | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/couchbase#measurements) |
| couchdb | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/couchdb#measurements--fields) |
| haproxy | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/haproxy#metrics) |
| jolokia2 | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/jolokia2#jolokia2-input-plugins) |
| memcached | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/memcached#measurements--fields) |
| mongodb | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/mongodb#metrics) |
| mysql | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/mysql#metrics) |
| nginx | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/nginx#measurements--fields) |
| nginx plus | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/nginx_plus#measurements--fields) |
| postgresql | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/postgresql#postgresql-plugin) |
| rabbitmq | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/rabbitmq#measurements--fields) |
| redis | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/redis#measurements--fields) |
| riak | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/riak#measurements--fields) |
| zookeeper | [metrics list](https://github.com/influxdata/telegraf/tree/1.10.4/plugins/inputs/zookeeper#metrics) |

## Collector Health Metrics

These are internal metrics about the health and configuration of the Kubernetes Metrics Collector.

| Metric Name                                          | Description                                                                                                                          |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| kubernetes.collector.discovery.enabled               | Whether discovery is enabled. 0 (false) or 1 (true).                                                                                 |
| kubernetes.collector.discovery.rules.count           | Number of discovery configuration rules.                                                                                             |
| kubernetes.collector.discovery.targets.registered    | Number of auto discovered scrape targets currently being monitored.                                                                  |
| kubernetes.collector.events.*                        | Events received, sent, and filtered.                                                                                                 |
| kubernetes.collector.leaderelection.error            | Leader election error counter. Only emitted in daemonset mode.                                                                       |
| kubernetes.collector.leaderelection.leading          | 1 indicates a pod is the leader. 0 indicates a pod is not the leader. Only emitted in daemonset mode.                                |
| kubernetes.collector.runtime.*                       | Go runtime metrics (MemStats, NumGoroutine, etc).                                                                                    |
| kubernetes.collector.sink.manager.timeouts           | Counter of timeouts in sending data to Operations for Applications.                                                                          |
| kubernetes.collector.source.manager.providers        | Number of configured source providers. Includes sources configured via auto-discovery.                                               |
| kubernetes.collector.source.manager.scrape.errors    | Scrape error counter across all sources.                                                                                             |
| kubernetes.collector.source.manager.scrape.latency.* | Scrape latencies across all sources.                                                                                                 |
| kubernetes.collector.source.manager.scrape.timeouts  | Scrape timeout counter across all sources.                                                                                           |
| kubernetes.collector.source.manager.sources          | Number of configured scrape targets. For example, a single Kubernetes source provider on a 10 node cluster will yield a count of 10. |
| kubernetes.collector.source.points.collected         | Collected points counter per source type.                                                                                            |
| kubernetes.collector.source.points.filtered          | Filtered points counter per source type.                                                                                             |
| kubernetes.collector.version                         | The version of the Kubernetes Metrics Collector.                                                                                     |
| kubernetes.collector.wavefront.points.*              | Operations for Applications sink points sent, filtered, errors etc.                                                                          |
| kubernetes.collector.wavefront.events.*              | Operations for Applications sink events sent, filtered, errors etc.                                                                          |
| kubernetes.collector.wavefront.sender.type           | 1 for proxy and 0 for direct ingestion.                                                                                              |
| kubernetes.collector.histograms.duplicates           | Number of duplicate histogram series tagged by metric name (not emitted if no duplicates)                                            |

## cAdvisor Metrics

cAdvisor exposes a Prometheus endpoint which the collector can consume. See the [cAdvisor documentation](https://github.com/google/cadvisor/blob/master/docs/storage/prometheus.md) for details on what metrics are available.

## Control Plane Metrics

These are metrics for the health of the Kubernetes Control Plane.

Metrics collected per type:

| Metric Name                                                         | Description                                                                                         | K8s environment exceptions      |
|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| kubernetes.node.cpu.node_utilization (node_role="control-plane")    | CPU utilization as a share of the contol-plane node allocatable in millicores.                                               | Not available in AKS, EKS, GKE  |
| kubernetes.node.memory.working_set (node_role="control-plane")      | Total working set usage of the control-plane node. Working set is the memory being used and not easily dropped by the kernel.| Not available in AKS, EKS, GKE  |
| kubernetes.node.filesystem.usage (node_role="control-plane")        | Total number of bytes consumed on a filesystem of the control-plane node.                                                     | Not available in AKS, EKS, GKE  |
| kubernetes.controlplane.apiserver.storage.objects.gauge             | etcd object counts.                                                                                                           | Not available from kubernetes release version 1.23 and later  |
| kubernetes.controlplane.etcd.db.total.size.in.bytes.gauge           | etcd database size.                                                                                                           | -                               |
| kubernetes.controlplane.apiserver.request.duration.seconds.bucket   | Histogram buckets for API server request latency.                                                                             | -                               |
| kubernetes.controlplane.apiserver.request.total.counter             | API server total request count.                                                                                               | -                               |
| kubernetes.controlplane.workqueue.adds.total.counter                | Current depth of API server work queue.                                                                                        | -                               |
| kubernetes.controlplane.workqueue.queue.duration.seconds.bucket     | Histogram buckets for work queue latency.                                                                                      | -                               |
| kubernetes.controlplane.coredns.dns.request.duration.seconds.bucket | Histogram buckets for CoreDNS request latency.                                                                                | Not available in GKE, OpenShift |
| kubernetes.controlplane.coredns.dns.responses.total.counter         | CoreDNS total response count.                                                                                                 | Not available in GKE, OpenShift |

<h2>Alerts</h2>  <ul><li markdown="span"><b>K8s pod CPU usage too high</b>:Alert reports when the CPU millicore utilization of a pod exceeds the CPU millicore limit defined constantly. Having the CPU going over the set limit will cause the pod to suffer from CPU throttling which is going to affect the pod's performance. When this happens, please make sure the CPU resource limitation set for the pod is correctly configured.</li><li markdown="span"><b>K8s pod memory usage too high</b>:Alert reports when the memory utilization of a pod is constantly at high percentage.</li><li markdown="span"><b>K8s too many pods crashing</b>:Alert reports when a pod's running and succeeded phase percentage is below the required level specified.</li><li markdown="span"><b>K8s node CPU usage too high</b>:Alert reports when a node's cpu utilization percentage is constantly high.</li><li markdown="span"><b>K8s node storage usage too high</b>:Alert reports when a node's storage is almost full.</li><li markdown="span"><b>K8s node memory usage too high</b>:Alert reports when the memory utilization of a node is constantly high.</li><li markdown="span"><b>K8s too many containers not running</b>:Alert reports when the percentage of containers not running is constantly high.</li><li markdown="span"><b>K8s node unhealthy</b>:Alert reports when a node's condition is not ready or status is not true.</li><li markdown="span"><b>K8s pod storage usage too high</b>:Alerts reports when the pod's storage is almost full.</li><li markdown="span"><b>K8s Observability status is unhealthy </b>:The K8s observability status is unhealthy.</li></ul>