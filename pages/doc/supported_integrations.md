---
title: Integrations Supported for Onboarded Subscriptions
keywords: integrations
tags: 
sidebar: doc_sidebar
permalink: integrations_onboarded_subscriptions.html
summary: Learn about the list of integrations supported for Operations for Applications subscriptions onboarded to VMware Cloud services.
---

## Subscription Types

Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. After this date, we support two types of subscriptions: Operations for Applications subscriptions **onboarded** to the VMware Cloud services platform and **original** subscriptions. Original subscriptions are the existing ones and they remain as is until they migrate to VMware Cloud services.

## Unaffected Integrations  

The following integrations are working as expected no matter whether your Operations for Applications service is onboarded to VMware Cloud services platform or not.

### Cloud Integrations

* [Google Cloud Platform](gcp.html)
* [Amazon Web Services](aws.html)
* [Microsoft Azure](azure.html)
* [AppDynamics](appdynamics.html)
* [Dynatrace](dynatrace.html)
* [New Relic](newrelic.html)
* [VMware Aria Operations (SaaS)](integrations_vrops.html)
* [Snowflake](snowflake.html)

### Notification Integrations

* [BigPanda](bigpanda.html)
* [Microsoft Teams](msteams.html)
* [PagerDuty](pagerduty.html)
* [Slack](slack.html)
* [Jira](jira.html)
* [OpsGenie](opsgenie.html)
* [ServiceNow](servicenow.html)
* [Splunk On-Call](victorops.html)


### collectd Integrations

* [Apache collectd Integration](integrations_collectd_apache.html)
* [Cassandra collectd Integration](integrations_collectd_cassandra.html)
* [Memcached collectd Integration](integrations_collectd_memcached.html)
* [MySQL collectd Integration](integrations_collectd_mysql.html)
* [NGiNX collectd Integration](integrations_collectd_nginx.html)
* [Redis collectd Integration](integrations_collectd_redis.html)
* [Zookeeper collectd Integration](integrations_collectd_zookeeper.html)

### Other Integrations

* [Webhooks](webhooks.html)
* [Graphite](graphite.html)
* [Operations for Applications Usage Integration](wavefront_monitoring.html)


## Integrations Supported for Onboarded Subscriptions

For best performance, when you configure most of our integrations it is recommended to use the Wavefront proxy. The Wavefront proxy ingests metrics and forwards them to Operations for Applications in a secure, fast, and reliable manner. When your Operations for Applications service **is onboarded** to the VMware Cloud services platform you have two choices for the proxy authentication:

   * Use OAuth App authentication (recommended):

     You must use the credentials (client ID and client secret) of an existing server to server app which has the **Proxies** service role assigned and is added to the VMware Cloud organization running the service. You must also provide the ID of the VMware Cloud organization running the service.

      If you don’t have a server to server app already, you can create one in the VMware Cloud Services Console. For details, see [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.


   * Use API Token authentication:

     The API token must be generated in the VMware Cloud Services Console by an active user account. It also must have the **Proxies** service role assigned. For more information, see [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html).


We're in the process of incrementally updating our integrations so that you can use them when your Operations for Applications service **is** onboarded to VMware Cloud services. 

Here's the list of the integrations that are updated as of today (July 3, 2023). This list will grow with each release. If you urgently need an integration to become available and configurable for your onboarded service, please contact us at: `tanzu_saas_ops@vmware.com`.

<table style="width: 100%;">
<thead>
<tr><th width="25%">Integration</th><th width="30%">Link to Doc Page</th><th width="30%">Comments</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">Linux Host</td>
<td markdown="span">[Linux Host Integration](linux.html)</td></tr>
<tr>
<td markdown="span">Suse Linux Host</td>
<td markdown="span">[Suse Linux Host Integration](suse.html)</td></tr>
<tr>
<td markdown="span">Oracle Linux Host</td>
<td markdown="span">[Oracle Linux Host Integration](oel.html)</td></tr>
<tr>
<td markdown="span">Fedora Linux Host</td>
<td markdown="span">[Fedora Linux Host Integration](fedora.html)</td></tr>
<tr>
<td markdown="span">Amazon Linux AMI Host</td>
<td markdown="span">[Amazon Linux AMI Host Integration](aws_linux.html)</td></tr>
<tr>
<td markdown="span">Red Hat Enterprise Linux Host</td>
<td markdown="span">[Red Hat Enterprise Linux Host Integration](redhat.html)</td></tr>
<tr>
<td markdown="span">Ubuntu Host</td>
<td markdown="span">[Ubuntu Host Integration](ubuntu.html)</td></tr>
<tr>
<td markdown="span">Debian Host</td>
<td markdown="span">[Debian Host Integration](debian.html)</td></tr>
<tr>
<td markdown="span">CentOS Host</td>
<td markdown="span">[CentOS Host Integration](centos.html)</td></tr>
<tr>
<td markdown="span">Mac Host</td>
<td markdown="span">[Mac Host Integration](mac.html)</td></tr>
<tr>
<td markdown="span">Windows Host</td>
<td markdown="span">[Windows Host Integration](windows.html)</td></tr>
<tr>
<td markdown="span">FreeBSD Host</td>
<td markdown="span">[FreeBSD Host Integration](freebsd.html)</td></tr>
<tr>
<td markdown="span">OpenBSD Host</td>
<td markdown="span">[OpenBSD Host Integration](openbsd.html)</td></tr>
<tr>
<td markdown="span">NetBSD Host</td>
<td markdown="span">[NetBSD Host Integration](netbsd.html)</td></tr>
<tr>
<td markdown="span">VMware vSphere</td>
<td markdown="span">[VMware vSphere Integration](vsphere.html)</td></tr>
<tr>
<td markdown="span">StatsD</td>
<td markdown="span">[StatsD Integration](statsd.html)</td></tr>
<tr>
<td markdown="span">Prometheus</td>
<td markdown="span">[Prometheus Integration](prometheus.html)</td></tr>
<tr>
<td markdown="span">OpenTelemetry</td>
<td markdown="span">[OpenTelemetry Integration](opentelemetry_overview.html)</td></tr>
<tr>
<td markdown="span">SNMP </td>
<td markdown="span">[SNMP Integration](snmp.html)</td></tr>
<tr>
<td markdown="span">Apache ActiveMQ</td>
<td markdown="span">[Apache ActiveMQ Integration](activemq.html)</td></tr>
<tr>
<td markdown="span">Apache HTTP</td>
<td markdown="span">[Apache HTTP Integration](apache.html)</td></tr>
<tr>
<td markdown="span">Apache HTTP</td>
<td markdown="span">[Apache HTTP Integration](apache.html)</td></tr>
<tr>
<td markdown="span">Apache Hadoop HDFS</td>
<td markdown="span">[Apache Hadoop HDFS Integration](hadoop-hdfs.html)</td></tr>
<tr>
<td markdown="span">Apache Hadoop MapReduce </td>
<td markdown="span">[Apache Hadoop MapReduce Integration](hadoop-mapreduce.html)</td></tr>
<tr>
<td markdown="span">Apache Hadoop YARN</td>
<td markdown="span">[Apache Hadoop YARN Integration](hadoop-yarn.html)</td></tr>
<tr>
<td markdown="span">Apache Impala</td>
<td markdown="span">[Apache Impala Integration](impala.html)</td></tr>
<tr>
<td markdown="span">Apache Kudu</td>
<td markdown="span">[Apache Kudu Integration](kudu.html)</td></tr>
<tr>
<td markdown="span">Apache Mesos</td>
<td markdown="span">[Apache Mesos Integration](mesos.html)</td></tr>
<tr>
<td markdown="span">Apache Solr</td>
<td markdown="span">[Apache Solr Integration](solr.html)</td></tr>
<tr>
<td markdown="span">Apache Spark</td>
<td markdown="span">[Apache Spark Integration](spark.html)</td></tr>
<tr>
<td markdown="span">Apache Tomcat</td>
<td markdown="span">[Apache Tomcat Integration](tomcat.html)</td></tr>
<tr>
<td markdown="span">Atlassian Bitbucket</td>
<td markdown="span">[Atlassian Bitbucket Integration](bitbucket.html)</td></tr>
<tr>
<td markdown="span">Cassandra</td>
<td markdown="span">[Cassandra Integration](cassandra.html)</td>
<td markdown="span">Currently, Cassandra on K8s is not supported.</td></tr>
<tr>
<td markdown="span">Ceph</td>
<td markdown="span">[Ceph Integration](ceph.html)</td>
<td markdown="span">Currently, Ceph on K8s is not supported.</td></tr>
<tr>
<td markdown="span">Chef</td>
<td markdown="span">[Chef Integration](chef.html)</td></tr>
<tr>
<td markdown="span">Concourse CI Integration</td>
<td markdown="span">[Concourse CI Integration](concourse.html)</td></tr>
<tr>
<td markdown="span">Consul</td>
<td markdown="span">[Consul Integration](consul.html)</td></tr>
<tr>
<td markdown="span">Convox</td>
<td markdown="span">[Convox Integration](convox.html)</td></tr>
<tr>
<td markdown="span">Couchbase</td>
<td markdown="span">[Couchbase Integration](couchbase.html)</td></tr>
<tr>
<td markdown="span">CouchDB</td>
<td markdown="span">[CouchDB Integration](couchdb.html)</td></tr>
<tr>
<td markdown="span">Elasticsearch</td>
<td markdown="span">[Elasticsearch Integration](elasticsearch.html)</td></tr>	
<tr>
<td markdown="span">Envoy Proxy</td>
<td markdown="span">[Envoy Proxy Integration](envoy.html)</td>
<td markdown="span">Currently, Envoy Proxy on K8s is not supported.</td>
</tr>	
<tr>
<td markdown="span">etcd KV store</td>
<td markdown="span">[etcd KV store Integration](etcd.html)</td>
<td markdown="span">Currently, etcd on K8s is not supported.</td>
</tr>	
<tr>
<td markdown="span">FoundationDB</td>
<td markdown="span">[FoundationDB Integration](fdb.html)</td>
</tr>
<tr>
<td markdown="span">Fluentd</td>
<td markdown="span">[Fluentd Integration](fluentd.html)</td>
<td markdown="span">Currently, Fluentd on K8s is not supported.</td>
</tr>
<tr>
<td markdown="span">Github</td>
<td markdown="span">[Github Integration](github.html)</td>
</tr>
<tr>
<td markdown="span">GitLab</td>
<td markdown="span">[GitLab Integration](gitlab.html)</td>
</tr>
<tr>
<td markdown="span">VMware Tanzu Greenplum</td>
<td markdown="span">[VMware Tanzu Greenplum Integration](greenplum.html)</td>
</tr>
<tr>
<td markdown="span">HAProxy</td>
<td markdown="span">[HAProxy Integration](haproxy.html)</td>
</tr>
<tr>
<td markdown="span">Java</td>
<td markdown="span">[Java Integration](java.html)</td>
</tr>
<tr>
<td markdown="span">JBoss AS </td>
<td markdown="span">[JBoss AS Integration](jboss.html)</td>
</tr>	
<tr>
<td markdown="span">Jenkins</td>
<td markdown="span">[Jenkins Integration](jenkins.html)</td>
</tr>	
<tr>
<td markdown="span">JMX</td>
<td markdown="span">[JMX Integration](jmx.html)</td>
</tr>	
<tr>
<td markdown="span">Kafka</td>
<td markdown="span">[Kafka Integration](kafka.html)</td>
<td markdown="span">Currently, Kafka on K8s is not supported.</td>
</tr>		
<tr>
<td markdown="span">Kong</td>
<td markdown="span">[Kong Integration](kong.html)</td>
</tr>
<tr>
<td markdown="span">Lighttpd</td>
<td markdown="span">[Lighttpd Integration](lighttpd.html)</td>
</tr>
<tr>
<td markdown="span">Marathon</td>
<td markdown="span">[Marathon Integration](marathon.html)</td>
</tr>
<tr>
<td markdown="span">Memcached</td>
<td markdown="span">[Memcached Integration](memcached.html)</td>
</tr>
<tr>
<td markdown="span">MongoDB</td>
<td markdown="span">[MongoDB Integration](mongodb.html)</td>
</tr>
<tr>
<td markdown="span">MySQL</td>
<td markdown="span">[MySQL Integration](mysql.html)</td>
</tr>	
<tr>
<td markdown="span">NGINX </td>
<td markdown="span">[NGINX Integration](nginx.html)</td>
</tr>	
<tr>
<td markdown="span">NGINX Plus </td>
<td markdown="span">[NGINX Plus Integration](nginxplus.html)</td>
</tr>	
<tr>
<td markdown="span">NVIDIA </td>
<td markdown="span">[NVIDIA Integration](nvidia.html)</td>
<td markdown="span">Currently, NVIDIA on K8s is not supported.</td></tr>	
<tr>
<td markdown="span">Oracle RDBMS</td>
<td markdown="span">[Oracle RDBMS Integration](oracle.html)</td>
</tr>
<tr>
<td markdown="span">Papertrail</td>
<td markdown="span">[Papertrail Integration](papertrail.html)</td>
</tr> 
<tr>
<td markdown="span">PHP-FPM</td>
<td markdown="span">[PHP-FPM Integration](phpfpm.html)</td>
</tr>    
<tr>
<td markdown="span">Pingdom</td>
<td markdown="span">[Pingdom Integration](pingdom.html)</td>
</tr>    
<tr>
<td markdown="span">PostgreSQL </td>
<td markdown="span">[PostgreSQL Integration](postgresql.html)</td>
</tr>   
<tr>
<td markdown="span">Puppet Server</td>
<td markdown="span">[Puppet Server Integration](puppet.html)</td>
</tr>  
<tr>
<td markdown="span">RabbitMQ</td>
<td markdown="span">[RabbitMQ Integration](rabbitmq.html)</td>
<td markdown="span">Currently, RabbitMQ on K8s is not supported.</td></tr>  
<tr>
<td markdown="span">Redis</td>
<td markdown="span">[Redis Integration](redis.html)</td>
<td markdown="span">Currently, Redis on K8s is not supported.</td></tr>
<tr>
<td markdown="span">Riak KV Store</td>
<td markdown="span">[Riak KV Store Integration](redis.html)</td>
</tr>
<tr>
<td markdown="span">Rollbar</td>
<td markdown="span">[Rollbar Integration](rollbar.html)</td>
</tr>
<tr>
<td markdown="span">Runscope</td>
<td markdown="span">[Runscope Integration](runscope.html)</td>
</tr>	
<tr>
<td markdown="span">Twempproxy</td>
<td markdown="span">[Twempproxy Integration](twempproxy.html)</td>
</tr>	    
<tr>
<td markdown="span">Varnish Cache</td>
<td markdown="span">[Varnish Cache Integration](varnishcache.html)</td>
</tr>	
<tr>
<td markdown="span">Hashicorp Vault</td>
<td markdown="span">[Hashicorp Vault Integration](vault.html)</td>
</tr>    
<tr>
<td markdown="span">Oracle WebLogic Server</td>
<td markdown="span">[Oracle WebLogic Server Integration](weblogic.html)</td>
</tr>  
<tr>
<td markdown="span">IBM WebSphere Application Server</td>
<td markdown="span">[IBM WebSphere Application Server Integration](websphere.html)</td>
</tr> 
<tr>
<td markdown="span">ZooKeeper</td>
<td markdown="span">[ZooKeeper Integration](zookeeper.html)</td>
</tr> 	
<tr>
<td markdown="span">Active Directory</td>
<td markdown="span">[Active Directory Integration](activedirectory.html)</td>
</tr> 
<tr>
<td markdown="span">Ceran</td>
<td markdown="span">[Cernan Integration](cernan.html)</td>
</tr> 		
<tr>
<td markdown="span">Docker with cAdvisor</td>
<td markdown="span">[Docker with cAdvisor Integration](docker.html)</td>
</tr>
<tr>
<td markdown="span">.NET</td>
<td markdown="span">[.NET Integration](dotnet.html)</td>
</tr> 		
<tr>
<td markdown="span">Filebeat Log Data</td>
<td markdown="span">[Filebeat Log Data Integration](filebeat.html)</td>
</tr>
<tr>
<td markdown="span">Microsoft Hyper-V</td>
<td markdown="span">[Microsoft Hyper-V Integration](hyperv.html)</td>
</tr> 	
<tr>
<td markdown="span">IIS</td>
<td markdown="span">[IIS Integration](iis.html)</td>
</tr>
<tr>
<td markdown="span">Microsoft Exchange</td>
<td markdown="span">[Microsoft Exchange Integration](msexchange.html)</td>
</tr>
<tr>
<td markdown="span">OpenTSDB</td>
<td markdown="span">[OpenTSDB Integration](opentsdb.html)</td>
</tr>
<tr>
<td markdown="span">SharePoint </td>
<td markdown="span">[SharePoint  Integration](sharepoint.html)</td>
</tr>
<tr>
<td markdown="span">Splunk</td>
<td markdown="span">[Splunk Integration](splunk.html)</td>
</tr> 
<tr>
<td markdown="span">Microsoft SQL Server</td>
<td markdown="span">[Microsoft SQL Server Integration](sqlserver.html)</td>
</tr> 
<tr>
<td markdown="span">Windows Performance Counters</td>
<td markdown="span">[Windows Performance Counters Integration](winperf.html)</td>
</tr> 
<tr>
<td markdown="span">Windows Service</td>
<td markdown="span">[Windows Service Integration](winserv.html)</td>
</tr>
<tr>
<td markdown="span">Zabbix </td>
<td markdown="span">[Zabbix  Integration](zabbix.html)</td>
</tr></tbody>
</table>