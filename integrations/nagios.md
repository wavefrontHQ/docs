---
title: Nagios Integration
tags: [integrations list]
permalink: nagios.html
summary: Learn about the Wavefront Nagios Integration.
---
## Nagios Integration

Nagios is a popular open source computer system and network monitoring application software. It watches hosts and services which the owner specifies, alerting the owner when things go wrong and again when they get better.

This integration configures Nagios to send notifications from hosts and services to Wavefront as events.

## Nagios Setup

### Prepare the Wavefront script

On your Nagios server:

1. Download the [nagios-wf.py](https://github.com/wavefrontHQ/integrations/raw/master/nagios/nagios-wf.py) script.
2. Give the script permission to run for the Nagios user: `chmod u+x nagios-wf.py`
3. Test the script execution by typing this: `./nagios-wf.py`
  You should get something like this:{% raw %}
  ```
  usage: nagios-wf.py [-h] [-S] [--type TYPE] [--host HOST]
                    [--service [SERVICE]] [--time TIME] [--msg MSG]
                    server token

  nagios-wf.py: error: too few arguments
  ```

### Configure Your Nagios Instance

On your Nagios configuration files:

1. Create these two new commands:
  ```
  define command{
  	command_name nagios-to-wavefront-service
  	command_line /opt/nagios/etc/wf/nagios-wf.py -S --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --service '$SERVICEDISPLAYNAME$' --time '$TIMET$' --msg '$SERVICEOUTPUT$\n$NOTIFICATIONAUTHOR$\n$NOTIFICATIONCOMMENT$' http://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
  }

  define command{
  	command_name nagios-to-wavefront-host
  	command_line /opt/nagios/etc/wf/nagios-wf.py --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --time '$TIMET$' --msg '$HOSTOUTPUT$' http://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
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
	command_line /opt/nagios/etc/wf/nagios-wf.py -S --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --service '$SERVICEDISPLAYNAME$' --time '$TIMET$' --msg '$SERVICEOUTPUT$\n$NOTIFICATIONAUTHOR$\n$NOTIFICATIONCOMMENT$' http://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
}

define command{
	command_name nagios-to-wavefront-host
	command_line /opt/nagios/etc/wf/nagios-wf.py --type '$NOTIFICATIONTYPE$' --host '$HOSTNAME$' --time '$TIMET$' --msg '$HOSTOUTPUT$' http://YOUR_CLUSTER.wavefront.com YOUR_API_TOKEN
}
```
{% endraw %}
