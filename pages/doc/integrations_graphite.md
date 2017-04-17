---
title: Graphite Integration
keywords: integrations
tags: [integrations, proxies]
sidebar: doc_sidebar
permalink: integrations_graphite.html
summary: Learn how to send Graphite metrics to Wavefront.
---
Wavefront supports Graphite data format [\(plaintext\)](http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-plaintext-protocol) and Graphite data format [\(pickle\)](http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-pickle-protocol).

To duplicate Graphite data, sending it to Graphite and Wavefront, refer to [Duplicating Graphite Data to Wavefront Using carbon-relay](#duplicating).

To send Graphite data to Wavefront:

1. If you have not already done so, [install the Wavefront proxy](proxies_installing).
1. [Configure the Wavefront proxy](proxies_configuring) to accept Graphite formatted data:
1. On the server running your Wavefront proxy, open the file `/etc/wavefront/wavefront-proxy/conf/wavefront.conf`. Uncomment and configure the following properties as required:

    <tbody><table width="100%" id="configTable" class="display">
    <colgroup>
    <col width="40%"/>
    <col width="20%"/>
    <col width="20%"/>
    <col width="10%"/>
    <col width="10%"/>
    </colgroup>
    <thead>
    <tr>
    <th>Property</th>
    <th>Purpose</th>
    <th>Format</th>
    <th>Example</th>
    <th>Since Version</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>graphitePorts</td>
    <td>Ports to listen on for Graphite data. Define which of the segments in your Graphite metrics map to a hostname in the graphiteFormat property. Default: 2003.</td>
    <td>A comma-separated list of available port numbers. Can be a single port.</td>
    <td>2003<br/>
    2003,2004</td>
    <td></td>
    </tr>
    <tr>
    <td>graphiteFormat</td>
    <td markdown="span">Indexes of fields within your Graphite/collectd metric names that correspond to a hostname. For example, if your metrics have the format: `collectd.prod.www04.cpu.loadavg.1m` specify the 3rd and 2nd indexes `www04.prod` to be extracted and treated as the hostname. The remainder `collectd.cpu.loadavg.1m` is treated as the metric name.</td>
    <td>A comma-separated list of indexes.</td>
    <td>3,2<br/>
    4,2,5<br/>
    3</td>
    <td></td>
    </tr>
    <tr>
    <td>graphiteDelimiters</td>
    <td markdown="span">Characters that should be replaced by dots, in case they were escaped within Graphite/collectd before sending. A common delimiter is the underscore character; so if you extract a hostname field with the value `web04_www`, it is changed to `web04.www`.</td>
    <td>A concatenation of delimiter characters, without any separators.</td>
    <td>-</td>
    <td></td>
    </tr>
    <tr>
    <td>picklePorts</td>
    <td markdown="span">Ports to listen on for incoming data in Graphite pickle format (from carbon-relay). This is expecting streaming data formatted as: \[Length of pickled data to follow in a 4 byte unsigned int\]\[pickled data of the given length\]. Default: None.</td>
    <td>A comma-separated list of available port numbers. Can be a single port.</td>
    <td>picklePorts=5878</td>
    <td>3.20</td>
    </tr>
    </tbody>
    </table>

1. Save and close `wavefront.conf`.
1. Restart the proxy: `service wavefront-proxy restart`.
1. Tail the log file to make sure there are no errors: `tail -f /var/log/wavefront/wavefront.log`.
1. Point your collectors at the Wavefront proxy, using the ports you defined for Graphite formatted data.

## Duplicating Graphite Data to Wavefront Using carbon-relay

1. Edit the `carbon.conf` file for your Graphite installation.
    1. Find the `LINE_RECEIVER_PORT` and `PICKLE_RECEIVER_PORT` properties in the `agent` section.  Note these values as line and receiver ports.
    1. Go to the `relay` section and find the `LINE_RECEIVER_PORT` and `PICKLE_RECEIVER_PORT` properties.  Set these to the values noted from the `agent` section.
    1. Find the `RELAY_METHOD` property.  If you will duplicate all points, set this to `consistent-hashing`.  If you   duplicate only some points, set this to `rules`, and modify the `rules-relay.conf` file accordingly.
    1. If the `RELAY_METHOD` is set to `consistent-hashing`, find the `REPLICATION_FACTOR` property and set this to `2`, and find the `DIVERSE_REPLICAS` property and set this to `True`.
    1. Find the `DESTINATIONS` property and set this to `127.0.0.1:2014, <wavefront_proxy_server>:5878`.  In this case port 2014 on the graphite machine should be available.  Replace `<wavefront_proxy_server>` accordingly.
    1. Go back to the `agent` section of the file, and set the `LINE_RECEIVER_PORT` and `PICKER_RECEIVER_PORT` properties to 2013 and 2014 accordingly (based on the port setting in the preceding step).
    1. Save the `carbon.conf` file.
1. If you have not already done so, [install the Wavefront proxy](proxies_installing).
    1. Edit the `/etc/wavefront/wavefront-proxy/conf/wavefront.conf` file.
    1. Find the `graphitePorts property`. Uncomment and set to a free port on the system. 2113 is a good choice. The default is 2013, but if graphite and wavefront-proxy are on the same machine you will need to set this to another port.
    1. Find the `graphiteFormat` property and set this property according to the existing metric hierarchy within graphite to extract the hostname.  If the metrics look like: **collectd.prod.www04.cpu.loadavg.1m**, then the 3rd and 2nd indices should be extracted and treated as the hostname (**www04.prod**) and the remainder should be treated as the final metric name (**collectd.cpu.loadavg.1m**).  In this case the property value will be `3,2`.  This will likely be different for each implementation.
    1. Find the `graphiteDelimiters` property and set this to an underscore (`_`).
    1. Find the `picklePorts` property and set this to `5878`.
    1. Save the wavefront.conf file.
1. Restart the Wavefront proxy service: `service wavefront-proxy restart`.
1. Stop carbon-agent, and any previous (if running) carbon-relay.
1. Start carbon-relay then carbon-agent. Metrics should now be duplicated in Wavefront.



