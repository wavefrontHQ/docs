

You can choose automatic installation or manual installation and configuration. For proxy installation prerequisites, see the [Proxy Host Requirements](https://docs.wavefront.com/proxies_installing.html#proxy-host-requirements).

### Install Wavefront Proxy and Telegraf Agent Automatically

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Install and Configure Wavefront Proxy and Telegraf Agent Manually

You can install the Wavefront proxy and Telegraf agent manually from our package cloud repositories.

1. [Install the Wavefront proxy packages](https://packagecloud.io/wavefront/proxy/install).
1. Go to the Wavefront proxy directory created during the package installation: `cd /opt/wavefront/wavefront-proxy`.
1. Run the interactive configuration script: `bin/autoconf-wavefront-proxy.sh`. The script prompts you for the following properties:
   - **server** - https://YOUR_CLUSTER.wavefront.com/api/
   - **token** - YOUR_API_TOKEN
   - **hostname** - A name (alphanumeric plus periods) unique across your entire account representing the machine that the proxy is running on. The hostname is not used to tag your data; rather, it's used to tag data internal to the proxy, such as JVM statistics, per-proxy point rates, and so on.
   - **enable graphite** - Indicate whether to enable the Graphite format. See the Graphite integration for details on Graphite configuration.
  When the interactive configuration is complete, the Wavefront proxy configuration at `/etc/wavefront/wavefront-proxy/wavefront.conf` is updated with the input that you provided and the `wavefront-proxy` service is started.
1. Restart the proxy: `sudo service wavefront-proxy restart` (Optional).
1. Verify that the proxy has registered with the Wavefront server.
1. [Install the Telegraf packages](https://packagecloud.io/wavefront/telegraf/install).
1. Create a file called `10-wavefront.conf` in `/etc/telegraf/telegraf.d` and enter the following:
   ```
   [[outputs.wavefront]]
     host = "WAVEFRONT_PROXY_ADDRESS"
     port = 2878
     metric_separator = "."
     source_override = ["hostname", "agent_host", "node_host"]
     convert_paths = true
   ```
1. Restart the Telegraf agent: `sudo service telegraf restart`

### Uninstall the Wavefront Proxy and Telegraf Agent

*Debian/Ubuntu*:

```
sudo apt-get remove wavefront-proxy
sudo apt-get remove telegraf
```

*RHEL/CentOS*:
```
sudo yum remove wavefront-proxy
sudo yum remove telegraf
```
