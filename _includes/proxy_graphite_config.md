1.  If you have not already done so, [install a Wavefront proxy](/proxies/add).
1.  On the server running your Wavefront proxy, open the file `/etc/wavefront/wavefront-proxy/wavefront.conf`. Uncomment and configure the following properties as required:
    ```conf
    graphitePorts=2003
    graphiteFormat=2
    graphiteDelimiters=_
    ```
1.  Save and close `wavefront.conf`
1.  Restart the proxy: `sudo service wavefront-proxy restart`.
1.  Tail the proxy log file to make sure there are no errors: `tail -f /var/log/wavefront/wavefront.log`.
