---
title: Jenkins Integration
tags: [integrations list]
permalink: jenkins.html
summary: Learn about the Wavefront Jenkins Integration.
---
## Jenkins Integration

Jenkins is an open source automation server written in Java. It helps automate the software development process, supports continuous integration, and facilitates continuous delivery.

This integration uses the Metrics plugin to get the data from Jenkins. It also installs and configures Telegraf to send Jenkins server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Jenkins dashboard.

{% include image.md src="images/dashboard1.png" width="80" %}
{% include image.md src="images/dashboard2.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Jenkins Setup



### Step 1. Install the Telegraf Agent

This integration uses the HTTP input plugin for Telegraf to extract metrics from Jenkins. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure Metrics Plugin
Jenkins metrics can be collected using the Telegraf Metrics plugin. Configure the plugin like this:

1. Log in to your Jenkins environment as an administrator and select **Manage Jenkins > Manage Plugins**. 
2. Select the **Available** tab, and search for **Metrics**.
3. To generate the API key that you need for metrics collection API:  
    a. Go to the Jenkins global configuration screen `<jenkins-url>/configure`.  
    b. In the **Metrics** section, click **Generate** to generate the key.  
    c. Use the HTTP GET request URL `<jenkins-url>/metrics/$KEY/metrics` to get the metrics.  

For details, see the Jenkins [Metrics Plugin](https://wiki.jenkins.io/display/JENKINS/Metrics+Plugin) docs.

### Step 3. Enable the HTTP Input Plugin

Create a file called `jenkins.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
[[inputs.http]]

  ## Prefix to attach to the measurement name
  name_prefix = "jenkins"

  ## URL of each Jenkins server
  urls = [
    "$JENKINS_URL/metrics/$KEY/metrics"
  ]

  ## Fields with a field key matching one of the patterns will be discarded
  fielddrop = ["histograms*"]

  ## Data format to consume
  data_format = "json"

   ```
Update `$JENKINS_URL` and `$KEY` with the URL and the API Key of the Jenkins server.

A single Telegraf agent can poll multiple Jenkins servers for status information. Specify the addresses of the Jenkins server in the `urls` parameter:
```
urls = [
   "$JENKINS_URL_1/metrics/$KEY_1/metrics",
   "$JENKINS_URL_2/metrics/$KEY_2/metrics",
   "$JENKINS_URL_3/metrics/$KEY_3/metrics"
]
```
{% endraw %}
### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.
