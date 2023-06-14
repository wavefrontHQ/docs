---
title: HAProxy Integration
tags: [integrations list]
permalink: haproxy.html
summary: Learn about the HAProxy Integration.
---
## HAProxy Integration

HAProxy is free, open source software that provides a high availability load balancer and proxy server for TCP and HTTP-based applications that spreads requests across multiple servers.  This integration installs and configures Telegraf to send HAProxy stats metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. For example, here's screenshot of dashboard with metrics collected from the HAProxy stats page.
{% include image.md src="images/haproxy-metrics.png" width="80" %}



To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## HAProxy Setup



### Step 1. Enable Stats Page for HAProxy Server

If the stats page is already enabled, skip to Step 2.

1. Include the following snippet in `haproxy.cfg`:
{% raw %}
    ```
    listen stats
        bind 0.0.0.0:8181  #Listen on all IP's on port 8181
        #This is the virtual URL to access the stats page
        stats uri /haproxy?stats
        stats enable

        #Authentication realm.  Escape space characters with a backslash.
        stats realm HAProxy\ Statistics

        #The user/pass you want to use. Change this password!
        stats auth username:password
    ```
{% endraw %}

    This enables HAProxy's statistics report page at:
{% raw %}
    ```
    http://[your_haproxy_server]:8181/haproxy?stats
    ```
{% endraw %}
    
1. Restart HAProxy.
 
### Step 2. Install the Telegraf Agent

This integration uses the HAProxy input plugin for Telegraf. If you've already installed Telegraf on your server(s), skip to Step 3.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 3. Configure HAProxy Input Plugin

Create a file called `haproxy.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.haproxy]]
  ## An array of address to gather stats about. Specify an ip on hostname
  ## with optional port. ie localhost, 10.10.3.33:1936, etc.
  ## Make sure you specify the complete path to the stats endpoint
  ## including the protocol, ie http://10.10.3.33:1936/haproxy?stats

  ## If no servers are specified, then default to 127.0.0.1:1936/haproxy?stats
  servers = ["http://username:password@<load balancer public IP>:8181/haproxy?stats"]

  ## You can also use local socket with standard wildcard globbing.
  ## Server address not starting with 'http' will be treated as a possible
  ## socket, so both examples below are valid.
  # servers = ["socket:/run/haproxy/admin.sock", "/run/haproxy/*.sock"]

  ## By default, some of the fields are renamed from what haproxy calls them.
  ## Setting this option to true results in the plugin keeping the original
  ## field names.
  # keep_field_names = true

  ## Optional SSL Config
  # ssl_ca = "/etc/telegraf/ca.pem"
  # ssl_cert = "/etc/telegraf/cert.pem"
  # ssl_key = "/etc/telegraf/key.pem"
  ## Use SSL but skip chain & host verification
  # insecure_skip_verify = false
```
{% endraw %}

Replace the servers field with your HAProxy server address.
{% raw %}
```
servers = ["http://[username[:password]]@[your_haproxy_server]:8181/haproxy?stats"]
```
{% endraw %}

Or your socket location.{% raw %}
```
servers = ["socket:/run/haproxy/admin.sock"]
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.



