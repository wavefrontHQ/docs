---
title: Concourse CI Integration
tags: [integrations list]
permalink: concourse.html
summary: Learn about the Concourse CI Integration.
---
## Concourse CI Integration

Concourse is an automation system that is most commonly used for CI/CD. It allows users to build and monitor the pipeline and it takes only one click to get from a failed job to see why it failed.

In addition to setting up the metrics flow, this integration also installs a dashboard that allows you to monitor the Concourse CI. Here's a preview of the dashboard:

{% include image.md src="images/concourse_dashboard.png" width="80" %}
{% include image.md src="images/concourse_dashboard_1.png" width="80" %}
{% include image.md src="images/concourse_dashboard_2.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Concourse CI Setup



Configure Concourse CI to send metrics to Wavefront.

### Step 1. Install the Telegraf Agent

This integration uses the Prometheus input plugin for Telegraf to extract metrics from Concourse CI.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure Concourse CI
Concourse supports multiple ways to install Concourse CI. The following steps enable the Prometheus metrics emitter based on the type of installation:
- Use **[Helm Chart](https://github.com/concourse/concourse-chart)** and set `web.prometheus.enabled` to `true` while configuring the Concourse CI Helm chart. See **[Concourse Helm Chart Configuration](https://github.com/concourse/concourse-chart#configuration)** for details.

- Use **[docker-compose.yml](https://github.com/concourse/concourse-docker/blob/master/docker-compose.yml)** and add `CONCOURSE_PROMETHEUS_BIND_IP` and `CONCOURSE_PROMETHEUS_BIND_PORT` under `services`->`web`->`environment` while configuring the Concourse CI.

### Step 3 (Optional). Configure SLI Runner
If you are using SLI Runner expose the Prometheus endpoint. The endpoint is already available on port `9001` by default if you used one of the following install methods:

- Use  **[kubernetes.yaml](https://github.com/wavefrontHQ/integrations/blob/master/concourse/slirunner/kubernetes.yaml)** and replace `CONCOURSE-URL` with the Concourse web URL to configure SLI Runner.
- Use **[docker-compose.yml](https://github.com/wavefrontHQ/integrations/blob/master/concourse/slirunner/docker-compose.yml)** and replace below placeholders with their actual values to configure SLI Runner.
{% raw %}
    ```
    CONCOURSE-URL       - Concourse Web URL
    CONCOURSE-USERNAME  - Concourse Username
    CONCOURSE-PASSWORD  - Concourse Password
    ```
{% endraw %}

### Step 4. Configure Telegraf
Enable the Prometheus input plugin in Telegraf, as follows:
{% raw %}
```
[[inputs.prometheus]]
  urls = ["http://CONCOURSE_PROMETHEUS_IP:PORT/metrics",
            "http://SLI_RUNNER_PROMETHEUS_IP:PORT/metrics"]
  name_prefix = "concourse."
```
{% endraw %}
Replace the placeholders with their actual values

- CONCOURSE_PROMETHEUS_IP:PORT - Concourse prometheus host IP and Port.
  - Port is `9391` if you have configured Concourse CI using **[Helm Chart](https://github.com/concourse/concourse-chart)**.
  - Port is the value of `CONCOURSE_PROMETHEUS_BIND_PORT` if you have used **[docker-compose.yml](https://github.com/concourse/concourse-docker/blob/master/docker-compose.yml)**.

- SLI_RUNNER_PROMETHEUS_IP:PORT  - SLI runner host IP and Port. Port will be `9001` if you have used methods mentioned in `Step 3` to configure the SLI Runner.

### Step 5. Restart Telegraf
Run `sudo service telegraf restart` to restart your Telegraf agent.



