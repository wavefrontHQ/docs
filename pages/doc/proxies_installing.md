---
title: Installing Wavefront Proxies
keywords: Ansible
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_installing.html
summary: Learn how to install and run Wavefront proxies.
---
Before metrics can begin streaming to Wavefront from a host or application you must add a Wavefront proxy to your installation. This article describes several methods for installing a Wavefront proxy: scripted installation, manual installation, running a proxy in a Docker container, and installing proxies and multiple hosts.

All installation procedures require an Wavefront API URL in the format `https://<wavefront_instance>.wavefront.com/api/` and an API token. Some procedures configure these properties for you automatically. To manually generate an API token see [Generating an API Token](https://docs.wavefront.com/wavefront_api.html#generating-an-api-token).

{% include shared/permissions_view.html entity="proxies" entitymgmt="Proxy" %}

## Requirements

Before installing a proxy, ensure that you have:

- An account on the Wavefront system.
- Host requirements:
  - Internet access - run `timeout 3s curl -fIsS <wavefront_instance>.wavefront.com/api/` from the host and make sure you get a response rather than timing out.
  - Sufficient memory - host does not need to be dedicated to running the Wavefront proxy; the proxy does not use a large amount of CPU, memory, or storage. However, we recommend running the proxy on a machine with at least 4GB of free memory.
  - Operating systems:
    - Linux
      - Ubuntu 12.04, 14.04, 16.04
      - CentOS 6.5, 7
      - RHEL 6, 7
      - Debian 7, 8, 9, 10
      - Amazon Linux

    - Mac and Windows - see the in-product [Integrations](integrations.html#in-product-integrations) instructions.
    - Other operating systems - contact [Support](https://my.vmware.com/).

## Single Host Integration

The Mac, Linux, and Windows host in-product [integration instructions](integrations.html#in-product-integrations) guide you through installing a Wavefront proxy and optionally a Telegraf collector agent. To access these integrations:

1. Open the Wavefront application UI.
1. Click **Integrations**.
1. In the Featured section, click a **\[Mac \| Linux \| Windows\] Host** tile.
1. Click the **Setup** tab and follow the instructions.

## Linux Hosts

### Scripted Installation on a Linux Host

If you cannot use the single host integration, you can use an installation script to install and configure a proxy:

1. Open the Wavefront application UI.
1. Select **Browse > Proxies**.
1. Select **Add > New Proxy** at the top of the filter bar. The Add a Wavefront Proxy screen displays.
1. Copy the script and run on your host.
1. After the proxy contacts the Wavefront server, the proxy name displays under "Checking for new proxies..." and the button label changes to Done.
1. Click **Done**. The Proxies page displays. Verify that your proxy is listed.

### Manual Package Installation on a Linux Host

You can manually install a Wavefront proxy .rpm or .deb [Wavefront proxy package](https://packagecloud.io/wavefront/proxy). The installation packages include an interactive script for configuring the proxy. To install a proxy package and set up a basic configuration:

1. Run one of the scripts that set up the installation process.
1. Go to the Wavefront proxy directory created during the package installation: `cd /opt/wavefront/wavefront-proxy`.
1. Run the interactive configuration script: `bin/autoconf-wavefront-proxy.sh`. The script prompts you for the following properties:
  - **server** - Wavefront API URL.
  - **token** - Wavefront API token.
  - **hostname** - A name (alphanumeric plus periods) unique across your entire account representing the machine that the proxy is running on. The hostname is not used to tag your data; rather, it's used to tag data internal to the proxy, such as JVM statistics, per-proxy point rates, and so on.
  - **enable graphite** - Indicate whether to enable the Graphite format. See the Graphite [integration](integrations.html#in-product-integrations) for details on Graphite configuration.
When the interactive configuration is complete, the Wavefront proxy configuration at `/etc/wavefront/wavefront-proxy/wavefront.conf` is updated with the input that you provided and the `wavefront-proxy` service is started.
1. [Verify that the proxy has registered](proxies_managing.html#viewing-registered-proxies) with the Wavefront server.

<a name="docker"></a>

## Running a Proxy in a Docker Container

To run a Docker container using the Docker run command:

1. Open the Wavefront application UI.
1. Select **Browse > Proxies**.
1. Select **Add > New Proxy** at the top of the filter bar. The Add a Wavefront Proxy screen displays.
1. Click the **Docker** tab.
1. Copy the script and run on your host.
1. After the proxy contacts the Wavefront server, the proxy name displays under "Checking for new proxies..." and the button label changes to Done.
1. Click **Done**. The Proxies page displays. Verify that your proxy is listed.

If you want to use Docker Compose or Kubernetes, use the configurations below, setting the following properties in each script:

- `<wavefront_instance>` - Wavefront API URL
- `<wavefront_api_token>` - Wavefront API token

### Docker Compose

```yaml
wavefront:  
    hostname: wavefront-proxy  
    container_name: wavefront-proxy  
    ports:  
      - "3878:3878"  
      - "2878:2878"  
      - "4242:4242"  
    environment:  
      WAVEFRONT_URL: https://<wavefront_instance>.wavefront.com/api/  
      WAVEFRONT_TOKEN: <wavefront_api_token>  
    image: wavefronthq/proxy:latest  
    restart: always
```

### Kubernetes

```yaml
apiVersion: v1  
kind: ReplicationController  
metadata:  
  labels:  
    app: wavefront-proxy  
    name: wavefront-proxy  
  name: wavefront-proxy  
  namespace: default  
spec:  
  replicas: 1  
  selector:  
    app: wavefront-proxy  
  template:  
    metadata:  
      labels:  
        app: wavefront-proxy  
    spec:  
      containers:  
      - name: wavefront-proxy  
        image: wavefronthq/proxy:latest  
        imagePullPolicy: Always  
        env:  
        - name: WAVEFRONT_URL  
          value: https://<wavefront_instance>.wavefront.com/api/  
        - name: WAVEFRONT_TOKEN  
          value: <wavefront_api_token>
        ports:  
        - containerPort: 2878  
          protocol: TCP  
        - containerPort: 4242  
          protocol: TCP  
```


<a name="ansible"></a>

## Installing Proxies on Multiple Hosts

See the Ansible in-product [integration](integrations.html#in-product-integrations) instructions.


<a name="restart"></a>

## Managing Proxy Services Running on Linux

This section describes how to manage proxies running on Linux. For proxies running on Mac and Windows, see the in-product [integration](integrations.html#in-product-integrations) instructions.

### Starting and Stopping a Proxy
 
To start, stop, or restart a proxy, run the following commands on the host on which the proxy is running:

```shell
$ service wavefront-proxy [start | stop | restart]
```

### Checking Proxy Service Status
 
To check if the proxy is running, run the following command:

```shell
$ service wavefront-proxy status
```

In your Wavefront instance, select **Browse > Proxies** and verify that the proxy is listed there using the hostname set in the proxy configuration file.

On the proxy host machine you can view `/var/log/wavefront/wavefront.log` to see whether there are any connection issues. 

