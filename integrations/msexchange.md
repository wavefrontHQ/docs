---
title: Microsoft Exchange Integration
tags: [integrations list]
permalink: msexchange.html
summary: Learn about the Wavefront Microsoft Exchange Integration.
---
## Microsoft Exchange Integration

The Microsoft Exchange integration installs and configures Telegraf to send Microsoft Exchange performance metrics to Wavefront. Telegraf is a light-weight server process that can collect, process, aggregate and send metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the overview section of a dashboard displaying Microsoft Exchange metrics.

{% include image.md src="images/ms_exchange_dashboard.png" width="80" %}

### Step 1: Set up the Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2: Install the Telegraf Agent

{% include windows_telegraf.md %}

### Step 3. Configure Telegraf

Edit the `telegraf.conf` file located in `Program Files\Telegraf` and enter the following snippet:
{% raw %}
```
[[inputs.win_services]]
  service_names = [
      "MSExchangeTransport",
      "MSExchangeTransportLogSearch",
      "MSExchangeUM",
      "MSExchangeUMCR", 
      "MSExchangeThrottling",
      "MSExchangeServiceHost",
      "MSExchangeFastSearch",
      "MSExchangeRepl",
      "MSExchangeRPC",
      "MSExchangePop3",
      "MSExchangeMonitoring", 
      "MSExchangeSubmission", 
      "MSExchangeDelivery",
      "MSExchangeMailboxReplication",
      "MSExchangeMailboxAssistants",
      "MSExchangeIS", 
      "MSExchangeImap4",
      "MSExchangeHM",
      "MSExchangeFrontendTransport",
      "MSExchangeEdgeSync",
      "MSExchangeDiagnostics",
      "MSExchangeAntispamUpdate",
      "MSExchangeADTopology"
  ]
  

[[inputs.win_perf_counters]]
  [[inputs.win_perf_counters.object]]
    ObjectName = "Process"
    Counters = ["% Processor Time","Handle Count","Private Bytes","Thread Count","Virtual Bytes","Working Set"]
	Instances = [
	  "MSExchangeTransport",
	  "MSExchangeTransportLogSearch",
	  "umservice",
	  "Microsoft.Exchange.UM.CallRouter", 
	  "MSExchangeThrottling",
	  "Microsoft.Exchange.ServiceHost",
	  "Microsoft.Exchange.Search.Service",
	  "msexchangerepl",
	  "Microsoft.Exchange.RpcClientAccess.Service",
	  "Microsoft.Exchange.Pop3Service",
	  "Microsoft.Exchange.Monitoring", 
	  "MSExchangeSubmission", 
	  "MSExchangeDelivery",
	  "MSExchangeMailboxReplication",
	  "MSExchangeMailboxAssistants",
	  "Microsoft.Exchange.Store.Service", 
	  "Microsoft.Exchange.Imap4Service",
	  "MSExchangeHMHost",
	  "MSExchangeFrontendTransport",
	  "Microsoft.Exchange.EdgeSyncSvc",
	  "Microsoft.Exchange.Diagnostics.Service",
	  "Microsoft.Exchange.AntispamUpdateSvc",
	  "Microsoft.Exchange.Directory.TopologyService"
	]
    Measurement = "msexchange.process"
     
   [[inputs.win_perf_counters.object]]
     ObjectName = "Database"
     Counters = ["I/O Log Writes Average Latency","Log Threads Waiting","Log Record Stalls/sec",
	         "Database Cache % Hit","Database Page Fault Stalls/sec",
                 "I/O Database Writes Average Latency","I/O Database Reads Average Latency"]
     Instances = ["*"]
     Measurement = "msexchange"
    
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchange ADAccess Domain Controllers"
     Counters = ["LDAP Read Time","LDAP Search Time","LDAP Searches Timed Out per Minute","Long Running LDAP Operations/min"]
     Instances = ["*"]
     Measurement = "msexchange"
    
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchangeUMAvailability"
     Counters = ["Directory Access Failures","Total Inbound Calls Rejected by the UM Service",
	         "Total Inbound Calls Rejected by the UM Worker Process"]
     Instances = ["*"]
     Measurement = "msexchange"
    
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchange Availability Service"
     Counters = ["Average Time to Process a Free Busy Request"]
     Instances = ["*"]
     Measurement = "msexchange"
    
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchange OWA"
     Counters = ["Current Unique Users", "Requests/sec", "Average Search Time"]
     Instances = ["*"]
     Measurement = "msexchange.owa"
	
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchangeFrontEndTransport SmtpSend"
     Counters = ["Bytes Sent Total", "Messages Sent Total"]
     Instances = ["*"]
     Measurement = "msexchange"
    
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchangeIS Store"
     Counters = ["RPC Average Latency", "RPC Requests","RPC Operations/sec", ]
     Instances = ["*"]
     Measurement = "msexchange"
	   
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchangeIS Client Type"
     Counters = ["RPC Average Latency", "RPC Operations/sec" ]
     Instances = ["*"]
     Measurement = "msexchange.is.client"
	
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchange ADAccess Processes"
     Counters = ["LDAP Read Time", "LDAP Search Time"]
     Instances = ["*"]
     Measurement = "msexchange"
		
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchange ActiveSync"
     Counters = ["Mailbox Search Total", "Requests/sec", "Ping Commands Pending", "Current Requests", 
                 "Average Request Time", "Sync Commands/sec"]
     Instances = ["*"]
     Measurement = "msexchange.active.sync"
		
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchange Active Manager Server"
     Counters = ["Server-Side Calls/sec", "Active Manager Database State writes to Persistent storage/sec", 
                 "GetServerForDatabase Server-Side Calls", "Total Number of Databases", "Active Manager Role"]
     Instances = ["*"]
     Measurement = "msexchange"
    	
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchangeAutodiscover"
     Counters = ["Requests/sec"]
     Instances = ["*"]
     Measurement = "msexchange.auto.disc"
    	
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchangeWS"
     Counters = ["Requests/sec"]
     Instances = ["*"]
     Measurement = "msexchange.ws"
    	
   [[inputs.win_perf_counters.object]]
     ObjectName = "Web Service"
     Counters = ["Current Connections","Connection Attempts/sec","Other Request Methods/sec"]
     Instances = ["_Total"]
     Measurement = "msexchange.ws"
	
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchange WorkloadManagement Workloads"
     Counters = ["ActiveTasks","CompletedTasks","QueuedTasks"]
     Instances = ["*"]
     Measurement = "msexchange.workload"
	
   [[inputs.win_perf_counters.object]]
     ObjectName = "ASP.NET"
     Counters = ["Application Restarts","Worker Process Restarts","Request Wait Time"]
     Instances = ["*"]
     Measurement = "msexchange.asp.net"
	
   [[inputs.win_perf_counters.object]]
     ObjectName = "MSExchange RpcClientAccess"
     Counters = ["RPC Averaged Latency", "RPC Requests", "Active User Count", "Connection Count", 
                 "RPC Operations/sec", "User Count"]
     Instances = ["*"]
     Measurement = "msexchange.rpc.client"

```
{% endraw %}

### Step 4. Restart Telegraf

After any changes restart your Telegraf agent service.
