---
title: FoundationDB Integration
tags: [integrations list]
permalink: fdb.html
summary: Learn about the FoundationDB Integration.
---
## FoundationDB Integration

FoundationDB is a distributed database designed to handle large volumes of structured data across clusters of commodity servers. This integration installs and configures Telegraf to send FoundationDB metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are sections of a dashboard displaying FoundationDB metrics:

{% include image.md src="images/fdb_dashboard_1.png" width="80" %}
{% include image.md src="images/fdb_dashboard_2.png" width="80" %}
{% include image.md src="images/fdb_dashboard_3.png" width="80" %}
{% include image.md src="images/fdb_dashboard_4.png" width="80" %}
{% include image.md src="images/fdb_dashboard_5.png" width="80" %}
{% include image.md src="images/fdb_dashboard_6.png" width="80" %}

To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## FoundationDB Setup



### Step 1: Install the Telegraf Agent
This integration uses Telegraf's input plugins to fetch the metrics from FoundationDB server.
If you've already installed Telegraf on your all the servers belongs to the FoundationDB cluster, you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2: Download and configure the FoundationDB metrics collector
Download and configure the script in one of the server of the FoundationDB cluster.
If you've already installed FoundationDB `Client and python API library` on your server, you can skip step 2.3 and 2.4.

1. Download [fdb-metrics-collector](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/fdb/fdb-metrics-collector.py) onto your one of the server and place it in an accessible location, for example `/etc/telegraf/.fdb`.
2. If required add the execute permissions to the downloaded file, e.g. `chmod +x <fdb-metrics-collector.py>`
3. [Download](https://apple.github.io/foundationdb/downloads.html) and install FoundationDB Client.
4. [Download](https://apple.github.io/foundationdb/downloads.html) the FoundationDB python API library and install it using setup.py

### Step 3: Enable the Input Plugins

Create a file called `fdb.conf` in `/etc/telegraf/telegraf.d` in the all the servers belongs to the FoundationDB cluster and
enter the following snippet to set the cluster name:{% raw %}
   ```
      [global_tags]
        cluster = <FoundationDB-Cluster-Name>
   ```
{% endraw %}
Enter the following snippet in one of the server where you have configured the FoundationDB metrics collector:
{% raw %}
   ```
      # # Read metrics from fdb
      [[inputs.exec]]
        ## Specify the command to collect the metrics from FDB.
        commands = ["python <path_to_fdb-metrics-collector> <path-to-foundationdb-cluster-file>"]

        ## Timeout for each command to complete.
        timeout = "10s"

        ## measurement name prefix
        name_prefix = "fdb."

        ## Data format to consume.
        data_format = "influx"
   ```
{% endraw %}
Enter the following snippet in all the servers belongs to the FoundationDB cluster to collect the host-specific metrics:
{% raw %}
   ```
      # Get kernel statistics from /proc/stat
      [[inputs.kernel]]
        name_prefix = "fdb."
        # no configuration


      # Read metrics about memory usage
      [[inputs.mem]]
        name_prefix = "fdb."
        # no configuration


      # Get the number of processes and group them by status
      [[inputs.processes]]
        name_prefix = "fdb."
        # no configuration


      # Read metrics about swap memory usage
      [[inputs.swap]]
        name_prefix = "fdb."
        # no configuration


      # Read metrics about system load & uptime
      [[inputs.system]]
        name_prefix = "fdb."
        # no configuration

      [[inputs.net]]
        name_prefix = "fdb."
        # no configuration

      [[inputs.diskio]]
        name_prefix = "fdb."

      [[inputs.disk]]
        name_prefix = "fdb."
        ignore_fs = ["tmpfs", "devtmpfs", "devfs", "overlay", "aufs", "squashfs"]

      [[inputs.cpu]]
        name_prefix = "fdb."
        percpu = true
        totalcpu = true
        collect_cpu_time = false
        report_active = false

      # Read stats about given file(s)
      [[inputs.filestat]]
        name_prefix = "fdb."
       ## Files to gather stats about.
       ## These accept standard unix glob matching rules, but with the addition of
       ## ** as a "super asterisk". ie:
       ##   "/var/log/**.log"  -> recursively find all .log files in /var/log
       ##   "/var/log/*/*.log" -> find all .log files with a parent dir in /var/log
       ##   "/var/log/apache.log" -> just tail the apache log file
       ##
       ## See https://github.com/gobwas/glob for more examples
       ##
       files = [<list of files to monitor>]
       ## If true, read the entire file and calculate an md5 checksum.
       # md5 = false
   ```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.

### Step 5: Optionally Deploy the Wavefront Metrics Adaptor for FDB
In addition to the above steps, you can optionally deploy the [wavefront-fdb-tailer](https://github.com/wavefrontHQ/wavefront-fdb-tailer). It is an open source Java application developed by Wavefront that provides additional FDB metrics.

To deploy:
1. `git clone https://github.com/wavefrontHQ/wavefront-fdb-tailer.git`
2. Run `mvn clean install -DskipTests`
3. Deploy the resulting jar file as documented on the above repo.



