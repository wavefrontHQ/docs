---
title: Nagios Integration
tags: [integrations list]
permalink: nagios.html
summary: Learn about the Nagios Integration.
---
## Nagios Integration

Nagios is a popular open source computer system and network monitoring application software. It watches hosts and services that the owner specifies, alerting the owner when things go wrong and again when they get better.

This integration configures Nagios to send data from hosts and services to Wavefront. Metrics show up in the Nagios dashboard. Events show up as Wavefront events.

### Dashboards

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of the Nagios dashboard:

{% include image.md src="images/nagios_dashboard.png" width="80" %}

## Nagios Setup

### Configure Your Nagios Instance

On your Nagios server:

1. Install [Wavefront Core Python SDK](https://github.com/wavefrontHQ/wavefront-sdk-python): `pip install wavefront-sdk-python`

2. Add these lines to your `nagios.cfg` file, and replace `[PATH_PERFDATA]` with the relevant absolute path:
{% raw %}
   ```
   service_perfdata_file=[PATH_PERFDATA]/service-perfdata
   service_perfdata_file_template=DATATYPE::SERVICEPERFDATA\tTIMET::$TIMET$\tHOSTNAME::$HOSTNAME$\tSERVICEDESC::$SERVICEDESC$\tSERVICEPERFDATA::$SERVICEPERFDATA$\tSERVICECHECKCOMMAND::$SERVICECHECKCOMMAND$\tHOSTSTATE::$HOSTSTATE$\tHOSTSTATETYPE::$HOSTSTATETYPE$\tSERVICESTATE::$SERVICESTATE$\tSERVICESTATETYPE::$SERVICESTATETYPE$

   service_perfdata_file_mode=a
   service_perfdata_file_processing_interval=15
   service_perfdata_file_processing_command=wavefront_perf_service

   host_perfdata_file=[PATH_PERFDATA]/host-perfdata
   host_perfdata_file_template=DATATYPE::HOSTPERFDATA\tTIMET::$TIMET$\tHOSTNAME::$HOSTNAME$\tHOSTPERFDATA::$HOSTPERFDATA$\tHOSTCHECKCOMMAND::$HOSTCHECKCOMMAND$\tHOSTSTATE::$HOSTSTATE$\tHOSTSTATETYPE::$HOSTSTATETYPE$

   host_perfdata_file_mode=a
   host_perfdata_file_processing_interval=15
   host_perfdata_file_processing_command=wavefront_perf_host
   ```
{% endraw %}
   **NOTE:** Make sure the nagios service has permission to write to `[PATH_PERFDATA]/service-perfdata` and `[PATH_PERFDATA]/host-perfdata`.


3. Enable these properties in `nagios.cfg`
{% raw %}
   ```
   process_performance_data=1

   host_perfdata_command=wavefront_perf_host
   service_perfdata_command=wavefront_perf_service

   cfg_dir=/usr/local/nagios/etc/conf.d
   ```
{% endraw %}

### Configure the Wavefront Script to Collect Metrics

1. Download the [nagios-metrics-wf.py](https://github.com/wavefrontHQ/integrations/raw/master/nagios/nagios-metrics-wf.py) script.
2. Give the script permission to run for the Nagios user: `chmod u+x nagios-metrics-wf.py`
3. To test the script, type this command: `./nagios-metrics-wf.py`.

  You should get something like this:
{% raw %}
  ```
  usage: nagios-metrics-wf.py [-h] [--service] [--test] [--wf_server SERVER]
                             [--wf_token TOKEN] [--wf_proxy_addr ADDR]
                             [--wf_proxy_port PORT]
                             file
  nagios-metrics-wf.py: error: the following arguments are required: file
  ```
{% endraw %}

4. Create a `wavefront.cfg` file in the `conf.d` directory and add these two commands (Refer the configuration sample below):
{% raw %}
   ```
   define command {
       command_name  wavefront_perf_host
       command_line  /usr/local/nagios/etc/wf/nagios-metrics-wf.py [PATH_PERFDATA]/host-perfdata \
                                                              --wf_proxy_addr [WAVEFRONT_PROXY_ADR] \
                                                              --wf_proxy_port [WAVEFRONT_PROXY_PORT]
   }

   define command {
       command_name  wavefront_perf_service
       command_line  /usr/local/nagios/etc/wf/nagios-metrics-wf.py [PATH_PERFDATA]/service-perfdata \
                                                             --service \
                                                             --wf_server https://YOUR_CLUSTER.wavefront.com \
                                                             --wf_token YOUR_API_TOKEN
   }
   ```
{% endraw %}

### Configure the Wavefront Script to Collect Events

1. Download the [nagios-events-wf.py](https://github.com/wavefrontHQ/integrations/raw/master/nagios/nagios-events-wf.py) script.
2. Give the script permission to run for the Nagios user: `chmod u+x nagios-events-wf.py`
3. To test the script, type this command: `./nagios-events-wf.py`.

  You should get something like this:
{% raw %}
  ```
  usage: nagios-events-wf.py [-h] [-S] [--type TYPE] [--host HOST]
                            [--service [SERVICE]] [--time TIME] [--msg MSG]
                            server token

  nagios-events-wf.py: error: too few arguments
  ```
{% endraw %}

4. Add these two commands to `wavefront.cfg` file (Refer the configuration sample below):
{% raw %}
   ```
   define command {
       command_name nagios-to-wavefront-service
       command_line /usr/local/nagios/etc/wf/nagios-events-wf.py -S --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --service '$SERVICEDISPLAYNAME$' --time '$TIMET$' --msg '$SERVICEOUTPUT$\n$NOTIFICATIONAUTHOR$\n$NOTIFICATIONCOMMENT$' https://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
   }

   define command {
       command_name nagios-to-wavefront-host
       command_line /usr/local/nagios/etc/wf/nagios-events-wf.py --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --time '$TIMET$' --msg '$HOSTOUTPUT$' https://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
   }
   ```
{% endraw %}

5. Add the two new commands to the contact associated with your resources:
{% raw %}
   ```
   define contact {
       ...
       service_notification_commands   nagios-to-wavefront-service
       host_notification_commands      nagios-to-wavefront-host
       ...
   }
   ```
{% endraw %}

### Configuration Sample

Here's a complete `wavefront.cfg` configuration sample:
{% raw %}
```
# Wavefront contact definition for event notification commands
define contact {
 name                            wf-generic-contact
 register                        0

 service_notification_period     24x7
 service_notification_options    w,u,c,r,f,s
 service_notification_commands   nagios-to-wavefront-service

 host_notification_period        24x7
 host_notification_options       d,u,r,f,s
 host_notification_commands      nagios-to-wavefront-host
}

# Wavefront user definition
define contact {
 contact_name    wfuser
 use             wf-generic-contact
 alias           Admin
 email           admin@example.com
 address1        +155512312
}

# Contact group for Wavefront user definition
define contactgroup {
  contactgroup_name  wavefront
  alias              Notifications send to wavefront
  members            wfuser
}

# Nagios command definitions for events to notify Wavefront server
define command {
  command_name nagios-to-wavefront-service
  command_line /usr/local/nagios/etc/wf/nagios-events-wf.py -S --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --service '$SERVICEDISPLAYNAME$' --time '$TIMET$' --msg '$SERVICEOUTPUT$\n$NOTIFICATIONAUTHOR$\n$NOTIFICATIONCOMMENT$' https://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
}

define command {
  command_name nagios-to-wavefront-host
  command_line /usr/local/nagios/etc/wf/nagios-events-wf.py --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --time '$TIMET$' --msg '$HOSTOUTPUT$' https://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
}

# Nagios command definitions for host and service metrics to the Wavefront server
define command {
    command_name  wavefront_perf_host
    command_line  /usr/local/nagios/etc/wf/nagios-metrics-wf.py /usr/local/nagios/var/host-perfdata \
                                                           --wf_proxy_addr [WAVEFRONT_PROXY_ADR] \
                                                           --wf_proxy_port [WAVEFRONT_PROXY_PORT]
}

define command {
    command_name  wavefront_perf_service
    command_line  /usr/local/nagios/etc/wf/nagios-metrics-wf.py /usr/local/nagios/var/service-perfdata \
                                                          --service \
                                                          --wf_server https://YOUR_CLUSTER.wavefront.com \
                                                          --wf_token YOUR_API_TOKEN
}
```
{% endraw %}







## Metrics
  

|Metric Name|Description|
| :--- | :--- |
|nagios.host.pl| The host command to probe the specified host for packet loss (%) |
|nagios.host.rta| The host command to probe the specified host for round trip average travel time (ms) |
|nagios.metrics.processed.per.execution| Custom metric: The number of metrics processed in an execution (count) |
|nagios.script.execution.time| Custom metric: The time taken by the script to process metrics per execution (s) |
|nagios.service.current.load.load1| The current system load average over 1 minute |
|nagios.service.current.load.load15| The current system load average over 5 minutes |
|nagios.service.current.load.load5| The current system load average over 15 minutes |
|nagios.service.current.users.users| The number of users currently logged in on the local system |
|nagios.service.http.size| The HTTP check command response message size (Bytes) |
|nagios.service.http.time| The HTTP check command response time (s) |
|nagios.service.ping.pl| The ping command to probe the specified host for packet loss (%) |
|nagios.service.ping.rta| The ping command to probe the specified host for round trip average travel time (ms) |
|nagios.service.root.partition| The amount of used disk space on a mounted file system (MB) |
|nagios.service.ssh.time| The time taken to connect to an SSH server at specified server and port |
|nagios.service.swap.usage.swap| The swap memory usage on machine (MB) |
|nagios.service.total.processes.procs| The number of currently running processes |


