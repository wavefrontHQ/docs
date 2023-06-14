---
title: Chef Integration
tags: [integrations list]
permalink: chef.html
summary: Learn about the Chef Integration.
---
## Chef Integration

Chef is a configuration management tool written in Ruby and Erlang. This integration installs and configures Telegraf to send Chef metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a section of a dashboard displaying Chef metrics:

{% include image.md src="images/chef_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Chef Setup

This integration uses Telegraf's Exec input plugin to fetch the metrics from Chef and push them to Wavefront.





### Step 1: Install the Telegraf Agent

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2: Download the Script

1. Install the Reporting server on Chef server using the below commands:{% raw %}
   ```
   chef-server-ctl install opscode-reporting
   chef-server-ctl reconfigure
   opscode-reporting-ctl reconfigure
   ```
{% endraw %}
2. Download [chef-metrics-collector](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/chef/chef-metrics-collector) onto your Chef server, and place it in an accessible location, for example `/etc/telegraf/.chef`
3. Keep the private key of the Chef user in a file in an accessible location, for example `/etc/telegraf/.chef/admin.pem`
4. Create the file `knife.rb` on your Chef server with the following configuration settings for your environment, and place it in an accessible location, for example `/etc/telegraf/.chef`{% raw %}
   ```
   # Sample for chef_server_url is: "https://chef.wavefront.com/organizations/bu"
   chef_server_url          << Chef Server Url >>
   # Sample for node_name is: "admin"
   node_name                << Node Name >>
   # Sample for client_name is: "admin"
   client_name              << Client Name >>
   # Sample for client_key is: "/etc/telegraf/.chef/admin.pem"
   # client_key should be path of the file from step 2
   client_key               << Client Key File Path>>
   ssl_verify_mode          :verify_none
   log_level                :info
   log_location             STDOUT
   ```
{% endraw %}
5. Test the script execution using this command:{% raw %}
    ```
    sudo /opt/opscode/bin/knife exec -c /etc/telegraf/.chef/knife.rb /etc/telegraf/.chef/chef-metrics-collector
    ```
{% endraw %}
    You should get a response such as the following:{% raw %}
    ```
    {
      "server.nodes_count": 2,
      "server.cookbooks_count": 11,
      "server.roles_count": 1,
      "server.environments_count": 1,
      "server.rabbitmq_messages_ready": 0,
      "server.postgresql_seq_scan": 1820630,
      "server.postgresql_seq_tup_read": 213945431,
      "server.postgresql_idx_scan": 13817008,
      "server.postgresql_idx_tup_fetch": 12098595,
      "server.postgresql_n_tup_ins": 8689,
      "server.postgresql_n_tup_upd": 1365,
      "server.postgresql_n_tup_del": 4639,
      "server.postgresql_n_live_tup": 14980,
      "server.postgresql_n_dead_tup": 841,
      "server.postgresql_connection_count": 26,
      "server.status": 1,
      "server.rest_api": 1,
      "server.sql_db": 1,
      "server.index": 1,
      "server.run_success": 0,
      "server.run_failure": 0,
      "server.run_aborted": 0
    }
    ```
{% endraw %}
    If the script does not execute, adjust the file permissions and the path to the `knife` executable.

### Step 3: Enable the Exec Input Plugin

Create a `chef.conf` file in `/etc/telegraf/telegraf.d` and add configuration settings for the Exec plugin. Use the following snippet as a guide:
{% raw %}
   ```
# Read metrics exposed by chef
[[inputs.exec]]
  commands = ["sudo /opt/opscode/bin/knife exec -c /etc/telegraf/.chef/knife.rb /etc/telegraf/.chef/chef-metrics-collector"]
  timeout = "5s"
  name_override = "chef"
  data_format = "json"
   ```
{% endraw %}

### Step 4: Enable the Nginx Input Plugin

Create a `chef-nginx.conf` file in `/etc/telegraf/telegraf.d` and add configuration settings for the nginx plugin. Use the following snippet as a guide:
{% raw %}
   ```
[[inputs.nginx]]
  urls = ["http://localhost:9999/nginx_status"]
  name_override = "chef.nginx"
   ```
{% endraw %}

### Step 5: Run Telegraf

Execute the command `sudo telegraf --config /etc/telegraf/telegraf.conf --config-directory /etc/telegraf/telegraf.d` to run your Telegraf agent and push metrics to Wavefront.
  
**NOTE:** Telegraf must run as a sudo user. If Telegraf runs as a service, the user under whom the service runs should have passwordless sudo capability.




