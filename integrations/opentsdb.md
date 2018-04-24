---
title: OpenTSDB Integration
tags: []
permalink: opentsdb.html
summary: Learn about the Wavefront OpenTSDB Integration.
---
## OpenTSDB Integration

The [Wavefront proxy](https://docs.wavefront.com/proxies.html) supports OpenTSDB data format out of the box.  No extra configuration is needed. The Wavefront proxy supports both the OpenTSDB [Telnet interface](http://opentsdb.net/docs/build/html/user_guide/writing.html#telnet) and [HTTP API (JSON))](http://opentsdb.net/docs/build/html/user_guide/writing.html#http-api).
## OpenTSDB Setup



### Step 1. Install Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your collector, [install a proxy](/proxies/add). By default, the proxy listens on TCP port 4242 for line messages in OpenTSDB [line format](http://opentsdb.net/docs/build/html/user_guide/writing.html#telnet).

### Step 2. Configure the Collector

If you have existing collectors such as Tcollector or Diamond sending data to an OpenTSDB server, change the target address from your OpenTSDB service to the Wavefront proxy.



