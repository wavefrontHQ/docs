---
title: Windows Service Integration
tags: [integrations list]
permalink: winserv.html
summary: Learn about the Windows Service Integration.
---

This page provides an overview of what you can do with the Windows Service integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Windows Service integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Windows Service** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Windows Services

Microsoft Windows Services are programs that are long running in the background on a Windows system. Services can be configured to kick-start when the system boots, or to be triggered by an event or manually. This integration explains how to install and configure Telegraf to collect Windows Services status data and send it into Wavefront.

### Metrics

This integration generates these metrics for each service:

* `win.services.state` metric, which can have the following values:
    - 1 - stopped
    - 2 - start pending
    - 3 - stop pending
    - 4 - running
    - 5 - continue pending
    - 6 - pause pending
    - 7 - paused


* `win.services.startup.mode` metric, which can have the following values:
    - 0 - boot start
    - 1 - system start
    - 2 - auto start
    - 3 - demand start
    - 4 - disabled   

All metrics have the following point tags:
- service_name
- display_name




