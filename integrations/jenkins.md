---
title: Jenkins Integration
tags: [integrations list]
permalink: jenkins.html
summary: Learn about the Wavefront Jenkins Integration.
---
## Jenkins Integration

Jenkins is an open source automation server written in Java. It helps automate the software development process, supports continuous integration, and facilitates continuous delivery.

This integration uses the Prometheus plugin to get the data from Jenkins. It also installs and configures Telegraf to send Jenkins server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Jenkins dashboard.

{% include image.md src="images/dashboard1.png" width="80" %}
{% include image.md src="images/dashboard2.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Jenkins Setup



### Step 1. Install the Telegraf Agent

This integration uses the Prometheus input plugin for Telegraf to extract metrics from Jenkins. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Install Prometheus Plugin
Jenkins metrics can be collected using the Jenkins Prometheus Plugin. Install the plugin like this:

1. Log in to your Jenkins environment as an administrator and select **Manage Jenkins > Manage Plugins**.
2. Select the **Available** tab, and search for **Prometheus**.
3. Select the `Prometheus` plugin and install using standard instructions.

For details, see the Jenkins [Managing Plugins](https://jenkins.io/doc/book/managing/plugins/) docs.

### Step 3. Set the Permission for an Anonymous User
Set the ACL in Jenkins to allow anonymous user to allow Prometheus to read job metrics as it's scraping clients.

### Step 4. Enable the Prometheus Input Plugin

Create a file called `jenkins.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
[[inputs.prometheus]]
  ## Prefix to attach to the measurement name
  name_prefix = "jenkins_"

  ## URL of each Jenkins server
  urls = ["$JENKINS_URL/prometheus/"]

  ## Specify timeout duration for slower clients (default is 3s)
  # response_timeout = "3s"

  ## Optional TLS Config
  # tls_ca = /path/to/cafile
  # tls_cert = /path/to/certfile
  # tls_key = /path/to/keyfile
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false

   ```
{% endraw %}
Update `$JENKINS_URL` with the URL of the Jenkins server.

A single Telegraf agent can poll multiple Jenkins servers for status information. Specify the addresses of the Jenkins server in the `urls` parameter:{% raw %}
```
urls = [
   "$JENKINS_URL_1/prometheus/",
   "$JENKINS_URL_2/prometheus/",
   "$JENKINS_URL_3/prometheus/"
]
```
{% endraw %}
### Step 5. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.

