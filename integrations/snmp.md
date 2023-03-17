---
title: SNMP Integration
tags: [integrations list]
permalink: snmp.html
summary: Learn about the SNMP Integration.
---
## SNMP Integration

Monitoring SNMP devices is easy with Wavefront. This integration installs and configures Telegraf to send SNMP agent metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. For example, here's the SNMP section of a dashboard displaying SNMP metrics.

{% include image.md src="images/SNMP_Dashboard.png" width="80" %}

To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## SNMP Setup



### Step 1. Install the Telegraf Agent

This integration uses the SNMP input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure SNMP Input Plugin

Create a file called `snmp.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.snmp]]
   agents = [ "your.snmp.agent:161" ]
   version = 2
   community = "public"
```
{% endraw %}

Refer to the [Telegraf documentation](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/snmp#config-parameters) for SNMPv3 configuration.

To poll multiple SNMP agent instances from a single Telegraf agent, configure the `agents` parameter with the addresses of the SNMP agent instances:
{% raw %}
```
agents = ["your.snmp.agent1:161","your.snmp.agent2:161","your.snmp.agent3:161"]
```
{% endraw %}

To poll multiple SNMP metrics from a single Telegraf agent, you can configure additional `inputs.snmp.field` sections. For example:
{% raw %}
```
   [[inputs.snmp.field]]
     name = "sysServices"
     oid  = "RFC1213-MIB::sysServices.0"

   [[inputs.snmp.field]]
     name = "uptime"
     oid = "RFC1213-MIB::sysUpTime.0"

   [[inputs.snmp.field]]
     name = "ifNumber"
     oid  = "RFC1213-MIB::ifNumber.0"

   [[inputs.snmp.field]]
     name = "udpInDatagrams"
     oid = "RFC1213-MIB::udpInDatagrams.0"

   [[inputs.snmp.field]]
     name = "udpOutDatagrams"
     oid  = "RFC1213-MIB::udpOutDatagrams.0"

   [[inputs.snmp.field]]
     name = "tcpActiveOpens"
     oid  = "RFC1213-MIB::tcpActiveOpens.0"

   [[inputs.snmp.field]]
     name = "tcpActiveOpens"
     oid  = "RFC1213-MIB::tcpActiveOpens.0"

   [[inputs.snmp.field]]
     name = "snmpInPkts"
     oid  = "RFC1213-MIB::snmpInPkts.0"

   [[inputs.snmp.field]]
     name = "snmpOutPkts"
     oid  = "RFC1213-MIB::snmpOutPkts.0"

   [[inputs.snmp.field]]
     name = "snmpInBadCommunityNames"
     oid  = "RFC1213-MIB::snmpInBadCommunityNames.0"

   [[inputs.snmp.field]]
     name = "snmpInBadCommunityUses"
     oid  = "RFC1213-MIB::snmpInBadCommunityUses.0"

   [[inputs.snmp.field]]
     name = "snmpInASNParseErrs"
     oid  = "RFC1213-MIB::snmpInASNParseErrs.0"

   [[inputs.snmp.field]]
     name = "snmpInTooBigs"
     oid  = "RFC1213-MIB::snmpInTooBigs.0"

   [[inputs.snmp.field]]
     name = "snmpInBadValues"
     oid  = "RFC1213-MIB::snmpInBadValues.0"

   [[inputs.snmp.field]]
     name = "snmpInGenErrs"
     oid  = "RFC1213-MIB::snmpInGenErrs.0"

   [[inputs.snmp.field]]
     name = "snmpInTotalReqVars"
     oid  = "RFC1213-MIB::snmpInTotalReqVars.0"

   [[inputs.snmp.field]]
     name = "snmpInTotalSetVars"
     oid  = "RFC1213-MIB::snmpInTotalSetVars.0"

   [[inputs.snmp.field]]
     name = "snmpInGetNexts"
     oid  = "RFC1213-MIB::snmpInGetNexts.0"

   [[inputs.snmp.field]]
     name = "snmpOutGetNexts"
     oid  = "RFC1213-MIB::snmpOutGetNexts.0"

   [[inputs.snmp.field]]
     name = "snmpOutTraps"
     oid  = "RFC1213-MIB::snmpOutTraps.0"

   [[inputs.snmp.field]]
     name = "snmpInTraps"
     oid  = "RFC1213-MIB::snmpInTraps.0"

   [[inputs.snmp.field]]
     name = "snmpInGetRequests"
     oid  = "RFC1213-MIB::snmpInGetRequests.0"

   [[inputs.snmp.field]]
     name = "snmpInGetNexts"
     oid  = "RFC1213-MIB::snmpInGetNexts.0"

   [[inputs.snmp.field]]
     name = "snmpInSetRequests"
     oid  = "RFC1213-MIB::snmpInSetRequests.0"

   [[inputs.snmp.field]]
     name = "snmpOutSetRequests"
     oid  = "RFC1213-MIB::snmpOutSetRequests.0"

   [[inputs.snmp.field]]
     name = "snmpEnableAuthenTraps"
     oid  = "RFC1213-MIB::snmpEnableAuthenTraps.0"

   # CPU Specific metrics
   [[inputs.snmp.field]]
     name = "sscpuMinLoad"
     oid  = ".1.3.6.1.4.1.2021.10.1.3.1"

   [[inputs.snmp.field]]
     name = "sscpuFiveMinLoad"
     oid  = ".1.3.6.1.4.1.2021.10.1.3.2"

   [[inputs.snmp.field]]
     name = "sscpuFifteenMinLoad"
     oid  = ".1.3.6.1.4.1.2021.10.1.3.3"

   [[inputs.snmp.field]]
     name = "ssCpuUser"
     oid  = ".1.3.6.1.4.1.2021.11.9.0"

   [[inputs.snmp.field]]
     name = "ssCpuSystem"
     oid  = ".1.3.6.1.4.1.2021.11.10.0"

   [[inputs.snmp.field]]
     name = "ssCpuIdle"
     oid  = ".1.3.6.1.4.1.2021.11.11.0"

   [[inputs.snmp.field]]
     name = "ssCpuRawUser"
     oid  = ".1.3.6.1.4.1.2021.11.50.0"

   [[inputs.snmp.field]]
     name = "ssCpuRawNice"
     oid  = ".1.3.6.1.4.1.2021.11.51.0"

   [[inputs.snmp.field]]
     name = "ssCpuRawSystem"
     oid  = ".1.3.6.1.4.1.2021.11.52.0"

   [[inputs.snmp.field]]
     name = "ssCpuRawIdle"
     oid  = ".1.3.6.1.4.1.2021.11.53.0"

   # Memory Metrics
   [[inputs.snmp.field]]
     name = "memTotalSwap"
     oid  = ".1.3.6.1.4.1.2021.4.3.0"

   [[inputs.snmp.field]]
     name = "memAvailSwap"
     oid  = ".1.3.6.1.4.1.2021.4.4.0"

   [[inputs.snmp.field]]
     name = "memTotalReal"
     oid  = ".1.3.6.1.4.1.2021.4.5.0"

   [[inputs.snmp.field]]
     name = "memAvailReal"
     oid  = ".1.3.6.1.4.1.2021.4.6.0"

   [[inputs.snmp.field]]
     name = "memTotalFree"
     oid  = ".1.3.6.1.4.1.2021.4.11.0"

   [[inputs.snmp.field]]
     name = "memShared"
     oid  = ".1.3.6.1.4.1.2021.4.13.0"

   [[inputs.snmp.field]]
     name = "memBuffer"
     oid  = ".1.3.6.1.4.1.2021.4.14.0"

   [[inputs.snmp.field]]
     name = "memCached"
     oid  = ".1.3.6.1.4.1.2021.4.15.0"

   # IF-MIB::ifTable contains counters on input and output traffic as well as errors and discards.
   [[inputs.snmp.table]]
     name = "interface"
     inherit_tags = [ "hostname" ]
     oid = "IF-MIB::ifTable"

     # Interface tag - used to identify interface in metrics database
     [[inputs.snmp.table.field]]
       name = "ifDescr"
       oid = "IF-MIB::ifDescr"
       is_tag = true

   # IF-MIB::ifXTable contains newer High Capacity (HC) counters that do not overflow as fast for a few of the ifTable counters
   [[inputs.snmp.table]]
     name = "interface"
     inherit_tags = [ "hostname" ]
     oid = "IF-MIB::ifXTable"

     # Interface tag - used to identify interface in metrics database
     [[inputs.snmp.table.field]]
       name = "ifDescr"
       oid = "IF-MIB::ifDescr"
       is_tag = true

   # EtherLike-MIB::dot3StatsTable contains detailed ethernet-level information about what kind of errors have been logged on an interface (such as FCS error, frame too long, etc)
   [[inputs.snmp.table]]
     name = "interface"
     inherit_tags = [ "hostname" ]
     oid = "EtherLike-MIB::dot3StatsTable"

     # Interface tag - used to identify interface in metrics database
     [[inputs.snmp.table.field]]
       name = "ifDescr"
       oid = "IF-MIB::ifDescr"
       is_tag = true
```
{% endraw %}

**Note :** *You can customize the configuration following your SNMP monitoring requirements.*

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.



