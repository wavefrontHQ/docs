---
title: Cassandra Integration
tags: [integrations list]
permalink: cassandra.html
summary: Learn about the Wavefront Cassandra Integration.
---
## Cassandra Integration

Apache Cassandra is a free and open-source distributed NoSQL database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure. Cassandra offers robust support for clusters spanning multiple datacenters, with asynchronous masterless replication allowing low latency operations for all clients.

This integration installs and configures Telegraf Jolokia2 input plugin to send Cassandra metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

Collecting Cassandra metric requires the installation of Jolokia java-jvm agent. [Jolokia](https://jolokia.org/index.html) is a JMX-HTTP bridge giving an alternative to JSR-160 connectors. It is an agent based approach with support for many platforms. 
The Cassandra integration collects Cassandra 3 / JVM metrics exposed as MBean's attributes through jolokia REST endpoint.

In addition to setting up the metrics flow, this integration also installs a dashboard. For example, here's a screenshot of a dashboard with metrics collected from Cassandra.
{% include image.md src="images/cassandra_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Cassandra Setup



### Step 1. Install Jolokia agent on your Cassandra server

1. Download Jolokia agent and save it in /usr/share/java
{% raw %}
   ```
   sudo curl -o /usr/share/java/jolokia-jvm-1.6.0-agent.jar -L http://search.maven.org/remotecontent?filepath=org/jolokia/jolokia-jvm/1.6.0/jolokia-jvm-1.6.0-agent.jar
   ```
{% endraw %}

1. Enable Jolokia agent in Cassandra

    1. Modify /etc/default/cassandra
{% raw %}
       ```
       echo "export JVM_EXTRA_OPTS=\"-javaagent:/usr/share/java/jolokia-jvm-1.6.0-agent.jar=port=8778,host=localhost\"" | sudo tee -a /etc/default/cassandra
       ```
{% endraw %}

    1. Alternatively, one can also enable the agent by modifying cassandra-env.sh

       Include the following line at the bottom of the your cassandra-env.sh
{% raw %}
       ```
       JVM_OPTS="$JVM_OPTS -javaagent:/usr/share/java/jolokia-jvm-1.6.0-agent.jar=port=8778,host=localhost"
       ```
{% endraw %}

1. Restart cassandra
{% raw %}
   ```
   sudo service cassandra restart
   ```
{% endraw %}

1. Verify that you can access Jolokia on port 8778 by running:
{% raw %}
   ```
   curl http://localhost:8778/jolokia/
   ```
{% endraw %}

### Step 2. Install the Telegraf Agent

This integration uses the Cassandra input plugin for Telegraf. If you've already installed Telegraf on your server(s), skip to Step 3.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 3. Configure Cassandra Input Plugin

Create a file called `cassandra.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
# Cassandra
[[inputs.jolokia2_agent]]
  # This is the context root used to compose the jolokia url
  ## List of cassandra servers exposing jolokia read service
  urls = ["http://localhost:8778/jolokia"]
  name_prefix = "cassandra2."

  [[inputs.jolokia2_agent.metrics]]
    name  = "javaMemory"
    mbean = "java.lang:type=Memory"

  [[inputs.jolokia2_agent.metric]]
    name  = "javaGarbageCollector"
    mbean = "java.lang:name=*,type=GarbageCollector"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "Cache"
    mbean = "org.apache.cassandra.metrics:name=*,scope=*,type=Cache"
    tag_keys = ["name", "scope"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "Client"
    mbean = "org.apache.cassandra.metrics:name=*,type=Client"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "ClientRequestMetrics"
    mbean = "org.apache.cassandra.metrics:name=*,type=ClientRequestMetrics"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "ClientRequest"
    mbean = "org.apache.cassandra.metrics:name=*,scope=*,type=ClientRequest"
    tag_keys = ["name", "scope"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "CommitLog"
    mbean = "org.apache.cassandra.metrics:name=*,type=CommitLog"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "Compaction"
    mbean = "org.apache.cassandra.metrics:name=*,type=Compaction"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "CQL"
    mbean = "org.apache.cassandra.metrics:name=*,type=CQL"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "DroppedMessage"
    mbean = "org.apache.cassandra.metrics:name=*,scope=*,type=DroppedMessage"
    tag_keys = ["name", "scope"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "FileCache"
    mbean = "org.apache.cassandra.metrics:name=*,type=FileCache"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "ReadRepair"
    mbean = "org.apache.cassandra.metrics:name=*,type=ReadRepair"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "Storage"
    mbean = "org.apache.cassandra.metrics:name=*,type=Storage"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "ThreadPools"
    mbean = "org.apache.cassandra.metrics:name=*,path=*,scope=*,type=ThreadPools"
    tag_keys = ["name", "path", "scope"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name = "Table"
    mbean = "org.apache.cassandra.metrics:type=Table,keyspace=*,scope=*,name=*"
    tag_keys = ["keyspace", "scope", "name"]
    field_prefix = "$3_"

  [inputs.jolokia2_agent.tags]
    cassandra_host="<server-name>"
```
{% endraw %}

Replace the cassandra_host field with your Cassandra server hostname that have installed Jolokia agent.


### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.



