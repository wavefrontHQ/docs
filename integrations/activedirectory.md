---
title: Active Directory Integration
tags: [integrations list]
permalink: activedirectory.html
summary: Learn about the Active Directory Integration.
---
## Active Directory Integration

Active Directory (AD) is a Windows OS directory service. This integration installs and configures Telegraf to send Active Directory metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a section of a dashboard displaying Active Directory metrics:

{% include image.md src="images/active-directory-ldap.png" width="80" %}

## Active Directory Setup

This integration uses Windows performance counters specific to the Active Directory Telegraf input plugin.





    **Note:**  This integration is supported only on Windows.

### Step 1: Set up a Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2: Install the Telegraf Agent

{% include windows_telegraf.md %}

### Step 3: Configure the Active Directory Input Plugin

Edit the `telegraf.conf` file located in `Program Files\Telegraf\` and enter the following snippet:
{% raw %}
   ```
[[inputs.win_perf_counters.object]]
  ObjectName = "DirectoryServices"
  Counters = ["LDAP Active Threads","LDAP Client Sessions","LDAP Writes/sec","LDAP Searches/sec","LDAP Successful Binds/sec","LDAP New Connections/sec","LDAP Closed Connections/sec","LDAP UDP operations/sec","DS Threads in Use","DS Directory Writes/sec","DS Directory Reads/sec","DS Directory Searches/sec","DS Client Binds/sec","DS Server Binds/sec","DRA Pending Replication Synchronizations","DRA Sync Requests Made","DRA Sync Requests Successful","DRA Pending Replication Operations"]
  Instances = ["NTDS"]
  Measurement = "ad.active.directory"
 
  
[[inputs.win_perf_counters.object]]
  ObjectName = "Security System-Wide Statistics"
  Counters = ["NTLM Authentications","Kerberos Authentications","KDC AS Requests","KDC TGS Requests"]
  Instances = ["------"]
  Measurement = "ad.security.statistics"   
   ```
{% endraw %}
### Step 4: Restart the Telegraf service

Restart the Telegraf service from the `Windows Services Management Console` or execute the following commands from the command prompt:
{% raw %}
   ```
   net stop telegraf
   net start telegraf
   ```
{% endraw %}




