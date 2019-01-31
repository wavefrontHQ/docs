---
title: Nagios Integration
tags: [integrations list]
permalink: nagios.html
summary: Learn about the Wavefront Nagios Integration.
---
## Nagios Integration

Nagios is a popular open source computer system and network monitoring application software. It watches hosts and services which the owner specifies, alerting the owner when things go wrong and again when they get better.

This integration configures Nagios to send notifications from hosts and services to Wavefront as events.

# Nagios Setup

## Metrics

### Prepare the Wavefront script

On your Nagios server:

1. Install [Wavefront Core Python SDK](https://github.com/wavefrontHQ/wavefront-sdk-python): `pip install wavefront-sdk-python`
1. Download the [nagios-metrics-wf.py](https://github.com/wavefrontHQ/integrations/raw/master/nagios/nagios-metrics-wf.py) script.
1. Give the script permission to run for the Nagios user: `chmod u+x nagios-metrics-wf.py`
1. Test the script execution by typing this: `./nagios-metrics-wf.py`.

You should get something like this:
{% raw %}
```
usage: nagios-metrics-wf.py [-h] [--service] [--test] [--wf_server SERVER]
                            [--wf_token TOKEN] [--wf_proxy_addr ADDR]
                            [--wf_proxy_port PORT]
                            file
nagios-metrics-wf.py: error: the following arguments are required: file
```

### Configure Your Nagios Instance

On your Nagios configuration files:

1. Add this lines to your `nagios.conf` file, and replace `[PATH_PERFDATA]` for an absolute path:

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

2. Create these two new commands:

```
define command {
    command_name  wavefront_perf_host
    command_line  /opt/nagios/etc/wf/nagios-metrics-wf.py [PATH_PERFDATA]/host-perfdata \
                                                           --wf_proxy_addr [WAVEFRONT_PROXY_ADR] \
                                                           --wf_proxy_port [WAVEFRONT_PROXY_PORT]
}

define command {
    command_name  wavefront_perf_service
    command_line  /opt/nagios/etc/wf/nagios-metrics-wf.py [PATH_PERFDATA]/service-perfdata \
                                                          --service \
                                                          --wf_server https://YOUR_CLUSTER.wavefront.com \
                                                          --wf_token YOUR_API_TOKEN
}
```

## Events

### Prepare the Wavefront script

On your Nagios server:

1. Download the [nagios-events-wf.py](https://github.com/wavefrontHQ/integrations/raw/master/nagios/nagios-events-wf.py) script.
2. Give the script permission to run for the Nagios user: `chmod u+x nagios-events-wf.py`
3. Test the script execution by typing this: `./nagios-events-wf.py`.


  You should get something like this:


```
  usage: nagios-events-wf.py [-h] [-S] [--type TYPE] [--host HOST]
                    [--service [SERVICE]] [--time TIME] [--msg MSG]
                    server token

  nagios-events-wf.py: error: too few arguments
```

### Configure Your Nagios Instance

On your Nagios configuration files:

1. Create these two new commands:


```
  define command{
  	command_name nagios-to-wavefront-service
  	command_line /opt/nagios/etc/wf/nagios-events-wf.py -S --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --service '$SERVICEDISPLAYNAME$' --time '$TIMET$' --msg '$SERVICEOUTPUT$\n$NOTIFICATIONAUTHOR$\n$NOTIFICATIONCOMMENT$' https://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
  }

  define command{
  	command_name nagios-to-wavefront-host
  	command_line /opt/nagios/etc/wf/nagios-events-wf.py --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --time '$TIMET$' --msg '$HOSTOUTPUT$' https://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
  }
```

2. Add the two new commands to the contact associated with your resources.


```
  define contact{
    ...
    service_notification_commands   nagios-to-wavefront-service
    host_notification_commands      nagios-to-wavefront-host
    ...
  }
```

### Configuration Sample

Here's a complete configuration example:


```
define contact{
  name                            wf-generic-contact
  register                        0

  service_notification_period     24x7
  service_notification_options    w,u,c,r,f,s
  service_notification_commands   nagios-to-wavefront-service

  host_notification_period        24x7
  host_notification_options       d,u,r,f,s
  host_notification_commands      nagios-to-wavefront-host
}

define contact{
	contact_name    wfuser
	use             wf-generic-contact
	alias           Sam
	email           sam@foo.com
	address1        +155512312
}

define contactgroup{
	contactgroup_name  wavefront
	alias              Notifications send to wavefront
	members            wfuser
}

define command{
	command_name nagios-to-wavefront-service
	command_line /opt/nagios/etc/wf/nagios-events-wf.py -S --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --service '$SERVICEDISPLAYNAME$' --time '$TIMET$' --msg '$SERVICEOUTPUT$\n$NOTIFICATIONAUTHOR$\n$NOTIFICATIONCOMMENT$' https://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
}

define command{
	command_name nagios-to-wavefront-host
	command_line /opt/nagios/etc/wf/nagios-events-wf.py --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --time '$TIMET$' --msg '$HOSTOUTPUT$' https://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
}
```
{% endraw %}
