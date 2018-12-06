---
title: New and Changed Integrations
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_new_changed.html
summary: Learn about new and changed Wavefront integrations.
---
Wavefront continuously adds new integrations to the existing set, and improves available integrations.
This document lists new and changed integrations on a per-month basis. We update our [list of all integrations](https://docs.wavefront.com/label_integrations%20list.html) each time we add new integrations.

## November 2018

We added the following integrations in November 2018:
* Jaeger
* Istio
* Envoy Proxy
* Kubernetes Beta (Uses the new `wavefront-kubernetes-collector` to monitor Kubernetes)
* Microsoft Azure Kubernetes Service
* NVIDIA
* JMX
* Apache Impala
* Google Big Query
* VMware vSphere

We made the following improvements to integrations in November 2018:

* Improved dashboard filtering for the following AWS dashboards:
   * Amazon ECS
   * Amazon RDS
   * Amazon ElasticSearch
   * Amazon Kinesis Data Firehose
   * AWS ALB
   * AWS Lambda
   * AWS ELB
   * Amazon EMR
   * Amazon S3
   * Amazon Kinesis Data Stream
* Added dashboard for tracking Telegraf agent performance to Telegraf integration.
* Added canary metrics and health status dashboard for vRealize Operations integration.

## October 2018

We added the following integrations in October 2018:
* Microsoft Azure SQL Database
* Apache Kudu
* Microsoft Azure App Service
* Microsoft Azure Functions
* Google Cloud Billing
* Microsoft Azure Load Balancers

We made improvements to the following integrations in October 2018:

* PostgreSQL integration
* Google Cloud Pub/Sub
* Weblogic, Kafka, and Hadoop HDFS integrations setup now use Jolokia 1.6 or later
* Nginx setup and dashboard now include metrics obtained via the Telegraf Tail plugin
* Microsoft SQL Server setup new uses a newer Telegraf plugin and includes several dashboard improvements. For this integration, you can access the previous setup and dashboard from the **Archived** section of the **Integrations** page.



## August 2018
We added the following integrations in August 2018:

* AWS Direct Connect integration/dashboard
* AWS API Gateway integration/dashboard
* Google Cloud VPN integration/dashboard
* Google Cloud Router integration/dashboard
* Google Cloud Pub/Sub integration/dashboard
* Google Cloud Logging integration/dashboard
* Google Cloud ML Engine integration/dashboard
* Azure Container Instance integration/dashboard

We added dashboards to the following integration in August 2018:
* Added kube-state-metrics setup instructions and dashboard to Kubernetes integration

We updated charts and filtering for the following dashboards in August 2018:
* Azure VM Scale Set dashboard
* Azure Storage Account dashboard
* Azure VM dashboard
* Couchbase dashboard
* Amazon Redshift dashboard
* RabbitMQ dashboard
* Apache HTTPD dashboard
* AWS EC2 dashboard
* AWS Auto-Scaling dashboard
* AWS DynamoDB dashboard
* Apache Tomcat

We updated the Setup instructions for the following integrations:
* JBOSS setup now uses Jolokia 1.6
* Apache Tomcat setup now uses Jolokia 1.6.



## July 2018

We added the following integrations in July 2018:
* Runscope integration
* AWS Lambda Functions Integration (Collection of standard metrics plus Wavefront wrappers for AWS Lambda functions)


We added dashboards to some of our cloud integrations. Each of the dashboards also has an integration tile so it's easy to find.

* Google Cloud Platform Integration
  * Google Cloud Storage integration
  * Google Cloud Spanner integration
  * Google Firebase integration
  * Google Cloud Functions integration

* AWS Integration
  * AWS IoT Integration
  * AWS Application Load Balancer Integration (ALB)
  * AWS Database Migration Service Integration (DMS)

We improved the following integrations in July/August 2018:

* Pivotal Container Service (PKS) dashboards
* Jenkins integration (setup and dashboard)
* Kafka integration setup (use Jolokia 2 telegraf plugin)
* Wavefront System Usage dashboard

We improved the following dashboards in the AWS integration in July/August 2018:

* Amazon SQS
* Amazon Elastic Transcoder
* Amazon EBS
* Amazon ElasticCache
* Amazon R53
* AWS Elastic Beanstalk
* AWS KMS
* Amazon SNS
* Amazon EFS
* Amazon CloudFront

We improved the following dashboards in other integrations in July/August 2018:

* NGNIX dashboard
* RabbitMQ dashboard

## June 2018

We added the following integrations in June 2018:

* Convox
* Metricproxy
* Pingdom
* VMware Kubernetes Engine (VKE)
* Amazon EKS (Elastic Container Service for Kubernetes)

We enhanced existing integrations by adding new dashboards in June 2018:

* Amazon CloudSearch
* Amazon Elasticsearch
* Amazon Elastic Transcoder

We enhanced the following integrations in June 2018:

* MongoDB - New charts and improved dashboard filtering
* Kubernetes
  - Updated existing Kubernetes dashboard
  - Added a new Kubernetes namespace dashboard
* Pivotal Container Service (PKS) dashboard - Improved dashboard filtering
* PostgreSQL – New charts and improved dashboard filtering
* Redis – New charts and improved dashboard filtering
* Java – Added support for direct ingestion
* NodeJS – Added support for direct ingestion


## May 2018

We added the following integrations in May 2018:

* Pivotal Container Service (PKS)
* Nagios
* AWS CloudTrail
* Chef
* Marathon
* OpsGenie
* Python
* Jenkins
* Twemproxy
* Oracle DB
* JIRA

We enhanced existing integrations by adding dashboards in May 2018:

* AWS Elastic Map Reduce
* AWS Elastic File System
* AWS Auto Scaling
* AWS Elastic Beanstalk
* AWS Firehose
* AWS RDS
* AWS Key Management

We made other enhancements to the following integrations in May 2018:
*	HyperV - Added charts for Latency, Throughput, Page Reads/Sec, Page Writes/Sec, and Page Faults/Sec
*	Go - Now supports [direct ingestion](direct_ingestion.html)

## April 2018

We added the following integrations in April 2018:

* Azure
* Kong

We enhanced existing integrations by adding dashboards in April 2018:

* Amazon Route 53 dashboard
* Amazon EBS dashboard
* Amazon SNS dashboard
* Amazon ElasticCache Memcached dashboard
* Google App Engine dashboard
* Google Cloud Datastore dashboard
* Amazon SQS dashboard
* Interactive Query Language Explorer Tutorial dashboard
* Azure Storage Accounts dashboard
* Amazon Kinesis Data Streams dashboard
* Amazon S3 dashboard
* Amazon OpWorks dashboard

We enhanced the following dashboards in April 2018:
* Google Compute Engine dashboard
* Google Container Engine dashboard

## March 2018

We added the following integrations in March 2018:

* Apache Hadoop HDFS
* Apache Hadoop MapReduce
* Apache Hadoop Yarn
* Atlassian Bitbucket
* AWS Integration: AWS CloudFront dashboard
* CoreOS
* Couchbase
* Ceph
* Fedora Linux Host
* Fluentd
* FreeBSD Host
* Github
* Lighttpd
* Micrometer
* NetBSD Host
* OpenBSD Host
* Oracle Linux Host
* PHP-FPM
* Papertrail
* Rollbar
* Suse Linux Host
* VMware vRealize Operations

We enhanced the following integrations in March 2018:
* PCF: Summary
* Microsoft Exchange

## February 2018

We added the following integrations in February 2018:

* Microsoft Sharepoint
* etcd KV store
* Apache ActiveMQ
* Microsoft SQL Server
* IBM WebSphere Application Server
* Apache Spark
* Apache Mesos
* Varnish Cache
* .NET
* Active Directory
* NGINX Plus
* Apache Solr
* SNMP
* CouchDB
* Microsoft Hyper-V
* MongoDB
* Microsoft Exchange
* Service Now
* Chef Server
* NodeJS
* Pivotal Container Service (PKS)

We enhanced the following integrations in February 2018:

* Azure AD (Authentication)
* ElasticSearch

## January 2018

We added the following integrations in January 2018:

* Apache HTTP
* Windows Service
* Windows Performance Counters
* JBoss AS
* Wildfly supported by JBoss AS
* Oracle Weblogic Server
* Microsoft IIS
* Apache Tomcat
* Pivotal Tomcat Server
* Riak KV Store
* Consul
* Zookeeper
* Tesla

We also added the following Linux Host integrations:

* CentOS host
* Red Hat Enterprise Linux host
* Ubuntu Linux host
* Amazon Linux AMI hosts
* Debian host

## December 2017

We added the following integrations in December 2017:

* Google Cloud Platform
* Terraform Provider
