---
title: GitLab Integration
tags: [integrations list]
permalink: gitlab.html
summary: Learn about the GitLab Integration.
---
## GitLab Integration

GitLab is a web-based Git-repository manager providing wiki, issue-tracking and CI/CD pipeline features. This integration installs and configures Telegraf to send GitLab metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a section of a dashboard displaying GitLab metrics:

{% include image.md src="images/gitlab_dashboard_1.png" width="80" %}
{% include image.md src="images/gitlab_dashboard_2.png" width="80" %}
{% include image.md src="images/gitlab_dashboard_3.png" width="80" %}
{% include image.md src="images/gitlab_dashboard_4.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## GitLab Setup

This integration uses Telegraf Prometheus input plugin to fetch the metrics from GitLab and push them to Wavefront. If you've already installed Telegraf on your server, you can skip to Step 2.



### Step 1: Install the Telegraf Agent

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2: Enable the Prometheus Input Plugin

Create a file called `gitlab.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
    #Read metrics exposed by GitLab
    [[inputs.prometheus]]
      name_prefix = "gitlab."
      urls = ["http://localhost:9090/metrics"]
   ```
{% endraw %}

### Step 3: Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.
  





