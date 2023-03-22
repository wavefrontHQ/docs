---
title: OpenTSDB Integration
tags: [integrations list]
permalink: opentsdb.html
summary: Learn about the OpenTSDB Integration.
---
## OpenTSDB Integration

The [Wavefront proxy](https://docs.wavefront.com/proxies.html) supports OpenTSDB data format with minimal configuration. The Wavefront proxy supports both the OpenTSDB [Telnet interface](http://opentsdb.net/docs/build/html/user_guide/writing#telnet) and [HTTP API (JSON))](http://opentsdb.net/docs/build/html/user_guide/writing#http-api).

## OpenTSDB Setup



### Step 1. Install Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your collector, install a proxy.

### Step 2. Open TCP Port 4242

By default, the proxy listens on TCP port 4242 for line messages in OpenTSDB [line format](http://opentsdb.net/docs/build/html/user_guide/writing#telnet). 

1. Open the proxy configuration file (<wavefront_config_path>/wavefront.conf) for edit. 
2. Add or uncomment the line `opentsdbPorts=4242`.  

See [Proxy Configuration File](https://docs.wavefront.com/proxies_configuring.html#configuration-properties) for details. 

### Step 3. Configure the Collector

If you have existing collectors such as Tcollector or Diamond sending data to an OpenTSDB server, change the target address from your OpenTSDB service to the Wavefront proxy.






