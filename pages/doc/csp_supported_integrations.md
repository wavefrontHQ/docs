---
title: How Integration Authentication Works
keywords: integrations
tags: 
sidebar: doc_sidebar
permalink: integrations_onboarded_subscriptions.html
summary: Learn how integration authentication happens, which integrations work with VMware Cloud services access tokens and which integrations still work with Operations for Applications API tokens.
---

## Subscription Types

Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. After this date, we support two types of subscriptions: Operations for Applications subscriptions **onboarded** to the VMware Cloud services platform and **original** subscriptions. Original subscriptions are the existing ones and they remain as is until they migrate to VMware Cloud services.

For best performance, when you set up most of our integrations, it is recommended to use the Wavefront proxy. The Wavefront proxy ingests metrics and forwards them to Operations for Applications in a secure, fast, and reliable manner. 

### VMware Cloud Services Subscriptions

When your Operations for Applications service **is onboarded** to the VMware Cloud services platform you have the following choices for the [Wavefront proxy](proxies_installing.html) authentication:

**VMware Cloud Services Access Token**

The Wavefront proxy requires a VMware Cloud services access token with the **Proxies** service role. There are two options for the proxy to retrieve an access token. You can configure the Wavefront proxy to use:

* OAuth App authentication (recommended and more secure):

  You must use the credentials (client ID and client secret) of an existing server to server OAuth app which has the **Proxies** service role assigned and is added to the VMware Cloud organization running the service. You must also provide the long ID of the VMware Cloud organization running the service.

  If you don’t have a server to server app already, you can create one in the VMware Cloud Services Console. For details, see [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation. You can also try out the [Windows host integration tutorial](windows_host_tutorial.html).

  When the access token expires, depending on the token TTL configuration of the server to server app, the Wavefront proxy automatically retrieves a new access token.

* API Token authentication:

  The API token must be generated in the VMware Cloud Services Console by an active user account. It also must have the **Proxies** service role assigned. For more information, see [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html).

  You might need to regenerate and reconfigure the API token periodically depending on the TTL configuration.


**Operations for Applications API token**

For a limited number of integrations, you can still use an Operations for Applications API token. It is recommended that the API token is associated with a [service account](csp_service_accounts.html) that has the **Proxies** permission. As a user with the **Admin** service role, you can create a service account with the **Proxies** permission and generate an API token for it. Then, you can install the Wavefront proxy and set up your integration to pass the API token of the service account. It is recommended that you gradually switch to using server to server OAuth apps which authenticate with more secure VMware Cloud services access tokens.

To understand how you can manage the API tokens for service accounts, see [Managing the Operations for Applications API Tokens for a Service Account](csp_api_tokens.html#managing-the-operations-for-applications-api-tokens-for-a-service-account).


### Original Subscriptions

When your Operations for Applications service instance **is not onboarded** to VMware Cloud services, the proxy requires an Operations for Applications **API token**.

Before you add a proxy, you must have an API token associated with your user account or a service account with the **Proxies** permission. See [Manage API Tokens](api_tokens.html) for details.


## Integrations That Use VMware Cloud Services Access Tokens

We're in the process of incrementally updating our integrations so that you can authenticate with a VMware Cloud services API token or OAuth server to server app  credentials. 

Here's the list of the integrations that are updated as of today. This list grows with each release. If you urgently need an integration to become available and configurable with a VMware Cloud services access token, please contact us at: `tanzu_saas_ops@vmware.com`.

<table style="width: 100%;">
<thead>
<tr><th width="50%">Integration</th><th width="50%">Link to Doc Page</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">Tanzu Application Service</td>
<td markdown="span">[Tanzu Application Service Integration](tas_v4.html)</td></tr>
<tr>
<td markdown="span">Kubernetes</td>
<td markdown="span">[Kubernetes Integration](kubernetes.html)</td></tr>
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
</tr>
<tr>
<td markdown="span">Ceph</td>
<td markdown="span">[Ceph Integration](ceph.html)</td>
</tr>
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
</tr>	
<tr>
<td markdown="span">etcd KV store</td>
<td markdown="span">[etcd KV store Integration](etcd.html)</td>
</tr>	
<tr>
<td markdown="span">FoundationDB</td>
<td markdown="span">[FoundationDB Integration](fdb.html)</td>
</tr>
<tr>
<td markdown="span">Fluentd</td>
<td markdown="span">[Fluentd Integration](fluentd.html)</td>
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
</tr>	
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
</tr>  
<tr>
<td markdown="span">Redis</td>
<td markdown="span">[Redis Integration](redis.html)</td>
</tr>
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
<td markdown="span">Twemproxy</td>
<td markdown="span">[Twemproxy Integration](twemproxy.html)</td>
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
<td markdown="span">Cernan</td>
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
</tr>
<tr>
<td markdown="span">Zipkin </td>
<td markdown="span">[Zipkin  Integration](zipkin.html)</td>
</tr>
<tr>
<td markdown="span">Velero </td>
<td markdown="span">[Velero  Integration](velero.html)</td>
</tr>
</tbody>
</table>


## Integrations That Use Operations for Applications API Tokens

Here's the list of the integrations that still use API tokens. Currently, if your service **is onboarded** to VMware Cloud services, direct ingestion by using the Wavefront Output Plugin for Telegraf is supported only when you use a service account<!--(targeting mid-October)-->.

* AWS Lambda Functions <!--(targeted for update mid September)-->
* Spring Boot <!--(target mid-end of September)-->
* Nagios <!--(targeting mid-September for customer availability)-->
* Tanzu Mission Control <!--(TBD)-->
* VMware GemFire <!--(TBD https://jira.eng.vmware.com/browse/INT-1897)-->
* Micrometer <!--(Target mid-September)-->
* Catchpoint <!--(Target mid-September)-->
* VMware Tanzu Kubernetes Grid Integration <!--(TBD)-->
* Terraform Provider <!--(TBD)-->
* Ansible Role <!--(archive/delete?)-->
* VMware Aria Operations for Logs <!--(TBD)-->
* VMware Spring Cloud Data Flow for Kubernetes <!--(TBD)-->
* VMware tc Server  <!--(archive/delete?)-->
* Microsoft Azure Deployment Manager <!--(archive/delete?)-->
* Uptime <!--(TBD)-->
* Datadog <!--(archive/delete?)-->
* Grafana <!--(TBD)-->
* Chef Server <!--(TBD)-->
* AVI Networks (NSX ALB) <!--(archive/delete?)-->
* VMware Blockchain <!--(archive/delete?)-->
* C Sharp <!--(TBD)-->

## List of Unaffected Integrations

The following integrations do not depend on the subscription type and work as expected, no matter whether your Operations for Applications service is onboarded to VMware Cloud services platform or not.

### Cloud Integrations

* [Google Cloud Platform](gcp.html)
* [Amazon Web Services](aws.html)
* [Microsoft Azure](azure.html)
* [AppDynamics](appdynamics.html)
* [Dynatrace](dynatrace.html)
* [New Relic](newrelic.html)
* [VMware Aria Operations (SaaS)](integrations_vrops.html)
  
  Note that currently this integration works with a VMware Cloud services API token only.

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

