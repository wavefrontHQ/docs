---
title: JMXTrans Integration
keywords:
tags: [integrations, proxies]
sidebar: doc_sidebar
permalink: integrations_jmxtrans.html
summary: Learn how to send data collected by JMXTrans to Wavefront.
---
While [JMXTrans](https://github.com/jmxtrans/jmxtrans) can be configured to retrieve [JMX](https://en.wikipedia.org/wiki/Java_Management_Extensions) data from multiple JVMs and specific managed beans (MBeans), the aim of this guide is to get you up and running very quickly with a very simple and generic JMXTrans configuration that will send all of the JMX data from a single JVM to Wavefront. You will then be in a position to browse the data within Wavefront and make decisions about which MBeans are relevant for your use case as you begin to fine tune the JMXTrans configuration.

## Enable JMX for a JVM
 
Enable JMX following the [instructions](https://github.com/jmxtrans/jmxtrans/wiki/Installation#enabling-jmx-for-a-jvm) on the JMXTrans GitHub repository. The sample JMXTrans configuration assumes JMX has been configured following these instructions, i.e. JMX is listening on port 1105 and does not require a username/password. In a production setting, you will likely require additional security. See [JMX Best Practices](https://code.google.com/archive/p/jmxtrans/wikis/BestPractices.wiki) for more details on configuring both JMX and JMXTrans.
 
## Create a Generic JMXTrans Configuration
 
By default JMXTrans looks for configuration files (specifying JMX servers and ManagedBean queries) in the directory `/var/lib/jmxtrans`. The JMXTrans package installer runs JMXTrans after installation, so if you put your configuration file in place ahead of time, the data will start flowing to Wavefront right away. Place the following file in `/var/lib/jmxtrans/all.json`:

```properties
{"servers" : [ {         
"port" : "1105",         
"host" : "localhost",         
"alias" : "my_host_name_in_wavefront_underscores_will_be_replaced_by_dots",         
"queries" : [ { "obj" : "", "useObjDomainAsKey" : true, "allowDottedKeys" : true, 
"outputWriters" : [ { "@class" : "com.googlecode.jmxtrans.model.output.GraphiteWriter", 
"settings" : { "port" : 2003, "host" : "localhost", "rootPrefix" : "jmx","booleanAsNumber" : true, "typeNames" : ["name", "type"]  } } ] } ] } ] }
```
You may need to edit:

- **host** - There are two host definitions in the file. The first, directly under servers, is the host of your JMX Server. The second, under outputWriters is the host of your Wavefront proxy. These have both been defaulted to **localhost** in the sample configuration.
- **alias** - Replace this with the host that you want to appear in Wavefront. Note that Wavefront hosts don't have to be machines per se, they are just intended to be a unique source of data. So this could just as well be the name of the Application you are monitoring as the host you are running on.
- **rootPrefix** - It's a good best practice to organize your Wavefront metrics in a hierarchy. Use this prefix to to specify the root metric node for your JMX data. Unlike collectd you don't need to include a trailing . character.
- 
Note how the `obj` setting is an empty string. This causes JMXTrans to retrieve all available MBeans and not filter them in any way.
 
## Install and Run JMXTrans
 
1. Download an appropriate [install medium](http://central.maven.org/maven2/org/jmxtrans/jmxtrans/250/) for your Linux distribution.
1. Follow the [installation instructions](https://github.com/jmxtrans/jmxtrans/wiki/Installation#introduction).
1. If you install using one of the packages JMXTrans will start after the install process. Your data should immediately start flowing into Wavefront.
 
## View the Data in Wavefront
1. Log in to Wavefront and navigate to **Browse > Sources**. You should see the alias defined in your `all.json` file listed there. You may need to use the search box if you have a lot of sources listed.
1. fter a short amount of time, you should see the metrics appearing under **Browse > Metrics**. They will be prefixed with the **rootPrefix** setting from your `all.json` file.
  - By default, JMXTrans retrieves the latest JMX information every 60 seconds.
  - When you first start sending a new metric to Wavefront, it will take a short period of time for the system to index it. After this initial period, new JMX data will appear in your charts within a second or so.
1. Click the **Chart All** button to see your JMX data in a Wavefront chart.
 
## Next Steps
 
JMXTrans is highly configurable. Take a look at the [documentation](https://github.com/jmxtrans/jmxtrans/wiki/Queries) if you want to tweak your configuration to retrieve only certain ManagedBeans or have things named differently within Wavefront.



