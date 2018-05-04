1.  If you have not already done so, install a Wavefront proxy.
1.  [Configure the Wavefront proxy](https://docs.wavefront.com/proxies_configuring.html) to accept Graphite formatted data:
    1. On the server running your Wavefront proxy, open the file `/etc/wavefront/wavefront-proxy/wavefront.conf`. Uncomment and configure the following properties as required:

        <table width="100%" class="table">
        <colgroup>
        <col width="10%"/>
        <col width="40%"/>
        <col width="30%"/>
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
        <td>TCP ports to listen on for Graphite data. Define which of the segments in your Graphite metrics map to a hostname in the graphiteFormat property. Default: 2003.</td>
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
        <td markdown="span">TCP ports to listen on for incoming data in Graphite pickle format (from carbon-relay). This is expecting streaming data formatted as: \[Length of pickled data to follow in a 4 byte unsigned int\]\[pickled data of the given length\]. Default: None.</td>
        <td>A comma-separated list of available port numbers. Can be a single port.</td>
        <td>picklePorts=5878</td>
        <td>3.20</td>
        </tr>
        </tbody>
        </table>

    1. Save and close `wavefront.conf`.
1.  Restart the proxy: `sudo service wavefront-proxy restart`.
1.  Tail the proxy log file to make sure there are no errors: `tail -f /var/log/wavefront/wavefront.log`.
1.  Point your collector agents at the Wavefront proxy, using the ports you specified for Graphite formatted data.