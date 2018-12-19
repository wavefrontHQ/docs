1.  If you have not already done so, install a Wavefront proxy.
2.  On the server running your Wavefront proxy, open the file `/etc/wavefront/wavefront-proxy/wavefront.conf` and add the following properties:
    ```
        dataDogJsonPorts=<any-available-port>
        dataDogProcessSystemMetrics=true
        dataDogProcessServiceChecks=true
        dataDogRequestRelayTarget=https://app.datadoghq.com # Optional: This Configuration is to send data to Datadog
    ```
3.  Save and close `wavefront.conf`
4.  Restart the proxy: `sudo service wavefront-proxy restart`.
5.  Tail the proxy log file to make sure there are no errors: `tail -f /var/log/wavefront/wavefront.log`.
