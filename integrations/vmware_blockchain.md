---
title: VMware Blockchain Integration
tags: [integrations list]
permalink: vmware_blockchain.html
summary: Learn about the Wavefront VMware Blockchain Integration.
---
## VMware Blockchain Integration

VMware Blockchain is an enterprise-grade blockchain platform that enables multi-party workflows. It uses advanced techniques, such as byzantine fault-tolerant state machine replication, authenticated data structures, and integration with smart contract execution engines, to enable customers to build and run decentralized multi-party applications.
## VMware Blockchain Setup



### Step 1. Install the Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy. Navigate to **Browse** > **Proxies**, click **Add new proxy**, and follow the instructions.

### Step 2. Install PyYAML and Jinja2

Install PyYAML package of version 5.4.1, or later:{% raw %}
  ```
  sudo pip3 install pyyaml
  ```
{% endraw %}
Install Jinja2 package of version 3.0.3:{% raw %}
  ```
  sudo pip3 install Jinja2
  ```
{% endraw %}

### Step 3. Download the VMware Blockchain Scripts

Download the [VMware Blockchain](https://github.com/wavefrontHQ/integrations/tree/master/vmbc) directory.

### Step 4. Run the Blockchain Script

1. Use the [VMware Blockchain script](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/vmbc/createRules.py) to create the metrics filter required by the Wavefront Proxy and allow only few metrics to be sent to Wavefront.
2. Update the [metrics_list.txt](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/vmbc/metrics_list.txt) file with the metric names. Add one metric per line.
3. Run the script: `./createRules.py`. The script generates the `preprocessor_rules.yaml` file.
4. Place the `preprocessor_rules.yaml` file under the `/config/wavefront-proxy/` in the Wavefront Proxy and make sure that the `preprocessor_rules.yaml` file has the permission 644.
5. In the `wavefront.conf`, set the parameter `preprocessorConfigFile` to `/config/wavefront-proxy/preprocessor_rules.yaml`.{% raw %}
  ```
  preprocessorConfigFile=/config/wavefront-proxy/preprocessor_rules.yaml
  ```
{% endraw %}
6. Make sure that the generated YAML file is valid and formatted.



