---
title: Pivotal Cloud Foundry Alerts
keywords:
tags: [integrations, proxies]
sidebar: doc_sidebar
permalink: integrations_pcf_alerts.html
summary: Details for Pivotal Cloud Foundry Alerts
---

The Pivotal Cloud Foundry (PCF) integration includes a a rich set of alerts out of the box. You can preview the alerts in the **Alerts** tab of the integration. This page gives details for each alert.

## PAS Active Locks Alerts

Total count of how many locks the system components are holding.

If the ActiveLocks count is not equal to the expected value, there is likely a problem with Diego.
1. Run monit status to inspect for failing processes.
2. If there are no failing processes, then review the logs for the components using the Locket service: BBS, Auctioneer, TPS Watcher, Routing API, and Clock Global (Cloud Controller clock). Look for indications that only one of each component is active at a time.
3. Focus triage on the BBS first:
   - A healthy BBS shows obvious activity around starting or claiming LRPs.
   - An unhealthy BBS leads to the Auctioneer showing minimal or no activity. The BBS sends work to the Auctioneer.
   - Reference the BBS-level Locket metric bbs.LockHeld. A value of 0 indicates Locket issues at the BBS level. For more information, see Locks Held by BBS.
4. If the BBS appears healthy, then check the Auctioneer to ensure it is processing auction payloads.
   - Recent logs for Auctioneer should show all but one of its instances are currently waiting on locks, and the active Auctioneer should show a record of when it last attempted to execute work. This attempt should correspond to app development activity, such as `cf push`.
   - Reference the Auctioneer-level Locket metric `auctioneer.LockHeld`. A value of 0 indicates Locket issues at the Auctioneer level. For more information, see Locks Held by Auctioneer.
5. The TPS Watcher is primarily active when app instances crash. Therefore, if the TPS Watcher is suspected, review the most recent logs.
6. If you are unable to resolve on-going excessive active locks, pull logs from the Diego BBS and Auctioneer VMs, which includes the Locket service component logs, and contact Pivotal Support.
