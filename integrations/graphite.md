---
title: Graphite Integration
tags: [integrations list]
permalink: graphite.html
summary: Learn about the Graphite Integration.
---
## Graphite Data Integration

The [Wavefront proxy](https://docs.wavefront.com/proxies.html) supports the [plaintext](http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-plaintext-protocol) Graphite data format and the [pickle](http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-pickle-protocol) Graphite data format.

The plaintext Graphite data format is different than the [Wavefront data format](https://docs.wavefront.com/wavefront_data_format.html).  Wavefront supports point tags natively with its data format, and requires a tag named `source` or `host`.  The setup process explains how to extract a source from the Graphite metric name.
## Graphite Data Integration Setup

You can send Graphite data to Wavefront only or <a href="#duplicate-graphite-data-to-wavefront-and-graphite-using-carbon-relay">duplicate Graphite data</a>, sending it to both Wavefront and Graphite.



### Send Graphite Data to Wavefront

{% include graphite_config.md %}

<a name="duplicating"></a>

### Duplicate Graphite Data to Wavefront and Graphite Using carbon-relay

1. Edit the `carbon.conf` file for your Graphite installation.
    1. Find the `LINE_RECEIVER_PORT` and `PICKLE_RECEIVER_PORT` properties in the `carbon` section.  Note these values as line and receiver ports.
    1. Go to the `relay` section and find the `LINE_RECEIVER_PORT` and `PICKLE_RECEIVER_PORT` properties.  Set these to the values noted from the `carbon` section.
    1. Find the `RELAY_METHOD` property.  To duplicate all points, set to `consistent-hashing`.  To duplicate only some points, set to `rules`, and modify the `rules-relay.conf` file accordingly.
    1. If the `RELAY_METHOD` is set to `consistent-hashing`, find the `REPLICATION_FACTOR` property and set to `2`, and find the `DIVERSE_REPLICAS` property and set to `True`.
    1. Find the `DESTINATIONS` property and set to `127.0.0.1:2014, <wavefront_proxy_server>:5878`.  In this case port 2014 on the graphite machine should be available.  Replace `<wavefront_proxy_server>` accordingly.
    1. Go back to the `carbon` section of the file, and set the `LINE_RECEIVER_PORT` and `PICKER_RECEIVER_PORT` properties to 2013 and 2014 accordingly (based on the port setting in the preceding step).
    1. Save the `carbon.conf` file.
1. If you have not already done so, install the Wavefront proxy.
    1. Edit the `/etc/wavefront/wavefront-proxy/conf/wavefront.conf` file.
    1. Find the `graphitePorts` property. Uncomment and set to a free port on the system. 2113 is a good choice. The default is 2013, but if Graphite and the Wavefront proxy are running on the same machine you will need to set this to another port.
    1. Find the `graphiteFormat` property and set according to the existing metric hierarchy within Graphite to extract the hostname.  If the metrics look like: `collectd.prod.www04.cpu.loadavg.1m`, then the 3rd and 2nd indices should be extracted and treated as the hostname (`www04.prod`) and the remainder should be treated as the final metric name (`collectd.cpu.loadavg.1m`).  In this case the property value will be `3,2`.  This will likely be different for each implementation.
    1. Find the `graphiteDelimiters` property and set this to an underscore (`_`).
    1. Find the `picklePorts` property and set this to `5878`.
    1. Save the `wavefront.conf` file.
1. Restart the Wavefront proxy service: `sudo service wavefront-proxy restart`.
1. Stop carbon-agent, and any previous (if running) carbon-relay.
1. Start carbon-relay then carbon-agent. Metrics should now be duplicated in Wavefront.




