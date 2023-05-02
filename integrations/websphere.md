---
title: IBM WebSphere Application Server Integration
tags: [integrations list]
permalink: websphere.html
summary: Learn about the IBM WebSphere Application Server Integration.
---
## IBM WebSphere Application Server

WebSphere Application Server (WAS) is a software framework that hosts Java-based web applications.

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/was.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## IBM WebSphere Setup



### Step 1. Install the Telegraf Agent

If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Install the `wasmonitor.war` on Your WebSphere Server

1. Download the [wasmonitor.war](https://github.com/wavefrontHQ/wasmonitor/releases/download/1.0/wasmonitor.war) file.
1. Deploy the `wasmonitor.war` file on your WebSphere instance.
1. Create a user on WebSphere, assign the Monitor role to that user, and map the application role `wavefront` to the user.
1. Verify the installation and configuration by accessing this URL: `http://<address>:<port>/wasmonitor/version`.
    The result looks similar to this:{% raw %}
    ```
    {"websphere.version": "8.5.5.12", "wasmonitor.version": "1.0"}
    ```
{% endraw %}

### Step 3. Configure the Telegraf httpjson Input Plugin

First, create a file called `websphere.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.httpjson]]
  servers = ["http://10.152.24.97:9080/wasmonitor/stats"]
  method = "POST"
  name_override="websphere"
  tag_keys = ["name", "process", "node", "cell", "mbeanIdentifier"]
  [inputs.httpjson.headers]
    Authorization = "Basic [Basic Authorization Base64 Sting]"
```
{% endraw %}

Then, replace the `urls` value with your WebSphere server URL(s). Specify your servers with URL matching.

Format:{% raw %}
```
urls = ["http://<address>:<port>/wasmonitor/stats"]
```
{% endraw %}
Example:{% raw %}
```
urls = ["http://10.152.24.99:8080/wasmonitor/stats"]
```
{% endraw %}

### Step 4. Generate and save a basic authorization string

WebSphere uses Basic Authorization, a Base64 encoded string, for the user and password. There are several ways to generate this string. This guide uses a public website.
1. Go to [https://www.base64encode.org](https://www.base64encode.org).
1. Type in the user and password created in step 2 in this format: `user:password`.
1. Click the **Encode** button.
1. Copy the resulting Base64 encoded string.
1. In your Telegraf `was.conf` file, replace `[Basic Authorization Base64 String]` with the Base64 encoded string you just copied.
{% include image.md src="images/base64_encode.png" %}

### Step 5. Activate metrics

In order to get all metrics on the dashboard you need to activate these metrics on the `Performance Monitoring Infrastructure` section:
* SessionManager CreateCount
* SessionManager InvalidateCount
* ThreadPool CreateCount
* ThreadPool DestroyCount

Or, you can put the PMI level to `all`, and you will get more metrics the you can use in customs dashboards and alerts.

### Step 6. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



