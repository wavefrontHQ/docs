---
title: Data Platforms Integration
tags: [integrations list]
permalink: dataplatforms.html
summary: Learn about the Wavefront Data Platforms Integration.
---
## Data Platforms Blueprints Integration

[Data Platform Blueprints available on the Bitnami catalog](https://bitnami.com/stack) provide you with fully automated deployment of your data platform, comprising of different combinations of software stacks on a Kubernetes cluster. The blueprints are validated and tested with engineered values of pod resources, such as CPU, Memory, and JVM, along with pod affinity and anti-affinity rules to provide recommended Kubernetes node count and associated node size and to facilitate cloud platform capacity planning.

This integration allows you to monitor different Data Platform Blueprints running in different Kubernetes clusters.

If you have already deployed the Data Platform Blueprint enabling Tanzu Observability by Wavefront Framework, this integration works out of the box. Otherwise, ensure that you deploy the data platform blueprint enabling Tanzu Observability by Wavefront Framework to trigger metrics ingestion to Wavefront.

Use the Blueprint-specific links below to enable metrics ingestion to Tanzu Observability by Wavefront. The data ingestion is done by using Wavefront Collectors. 

[Data Platform Blueprint1 - Kafka-Spark-Solr](https://github.com/bitnami/charts/tree/master/bitnami/dataplatform-bp1#tanzu-observability-wavefront-chart-parameters)

[Data Platform Blueprint2 - Kafka-Spark-Elasticsearch](https://github.com/bitnami/charts/tree/master/bitnami/dataplatform-bp2#tanzu-observability-wavefront-parameters)

The image below is a sample of the Kafka-Spark-Solr Blueprint dashboard, that is provided as part of this integration. Some important sections in the dashboard are: 

1. ***Mission Control***: This is the mission critical section that displays the high-level health and utilization of your data platform.
2. ***Data Platforms***: This section gives you a single shot view of the applications that form the data platform cluster together with their individual resource utilization.
3. ***ESXi Host***: This section gives you an overview of the ESXi Hosts underlying the Kubernetes cluster. It is rendered only when the ESXi metrics are flowing to Tanzu Observability.
4. ***Kubernetes Platform***: This section gives you a detailed overview of the underlying Kubernetes cluster and the Node to Pod mapping of the applications.
5. ***Individual Applications***: This section gives you a detailed view of the individual application metrics.

{% include image.md src="images/dashboard.png" width="80" %}

### Data Platform Blueprints Setup

Make sure "Bitnami Data Platform Blueprints" with Tanzu observability are deployed on your cluster. If not, follow the [Data Platforms Blueprint specific instructions on the Bitnami Catalog](https://bitnami.com/stacks) to enable observability for your data platform cluster running on Kubernetes cluster.

Use the Blueprint-specific links below to enable metrics ingestion to Tanzu Observability by Wavefront. The data ingestion is done by using Wavefront Collectors.

[Data Platform Blueprint1 - Kafka-Spark-Solr](https://github.com/bitnami/charts/tree/master/bitnami/dataplatform-bp1#tanzu-observability-wavefront-chart-parameters)

[Data Platform Blueprint2 - Kafka-Spark-Elasticsearch](https://github.com/bitnami/charts/tree/master/bitnami/dataplatform-bp2#tanzu-observability-wavefront-parameters)

See [Observability for Kubernetes](https://github.com/wavefrontHQ/observability-for-kubernetes) for more details about Observability for Kubernetes.

### For using an existing Tanzu observibility deployment

- To enable the annotation discovery feature in wavefront for the existing wavefront deployment,  make sure that auto discovery `enableDiscovery: true` and annotation based discovery `discovery.disable_annotation_discovery: false` are enabled in the Wavefront Collector ConfigMap. They should be enabled by default.

**NOTE**: The Wavefront Collector scrapes all the pods that have Prometheus annotation enabled.

See [annotation based discovery](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/discovery.md#annotation-based-discovery) feature in Wavefront Collector for more information.

- If you wish not to use the annotation based discovery feature in wavefront, edit the Wavefront Collector ConfigMap To add rules based discovery to wavefront, add the following snippet under discovery plugins. Once done, restart the wavefront collectors DaemonSet.
{% raw %}
```console
$ kubectl edit configmap wavefront-collector-config -n wavefront
```
{% endraw %}

Add the below config:
{% raw %}
```yaml
      discovery:
        enable_runtime_plugins: true
        plugins:
        ## auto-discover kafka-exporter
        - name: kafka-discovery
          type: prometheus
          selectors:
            images:
              - '*bitnami/kafka-exporter*'
          port: 9308
          path: /metrics
          scheme: http
          prefix: kafka.

        ## auto-discover jmx exporter
        - name: kafka-jmx-discovery
          type: prometheus
          selectors:
            images:
              - '*bitnami/jmx-exporter*'
          port: 5556
          path: /metrics
          scheme: http
          prefix: kafkajmx.

        ## auto-discover solr
        - name: solr-discovery
          type: prometheus
          selectors:
            images:
              - '*bitnami/solr*'
          port: 9983
          path: /metrics
          scheme: http

        ## auto-discover spark
        - name: spark-worker-discovery
          type: prometheus
          selectors:
            images:
              - '*bitnami/spark*'
          port: 8081
          path: /metrics/
          scheme: http
          prefix: spark.
        
        ## auto-discover spark
        - name: spark-master-discovery
          type: prometheus
          selectors:
            images:
              - '*bitnami/spark*'
          port: 8080
          path: /metrics/
          scheme: http
          prefix: spark.
```
{% endraw %}

Below is the command to restart the DaemonSets
{% raw %}
```console
$ kubectl rollout restart daemonsets wavefront-collector -n wavefront
```
{% endraw %}
Once you enable metrics ingestion into Tanzu Observability by Wavefront, the Wavefront Collector pods will collect the metrics from the individual applications of your data platform and will push them through the Wavefront proxy to your Wavefront environment.

Within a minute, you will be able to use the dashboards listed on the *Dashboards* tab, and see our default metrics sent from any Data Platform clusters created in that Kubernetes cluster.

## Metrics
  
### Kafka Metrics

|Metric Name|Description|
| :--- | :--- |
|kafkajmx.jmx.exporter.build.info||
|kafkajmx.jmx.config.reload.failure.total||
|kafkajmx.kafka.server.brokertopicmetrics.total.invalidoffsetorsequencerecordspersec.count||
|kafka.server.replicamanager.total.underreplicatedpartitions.value||
|kafka.server.fetchsessioncache.total.numincrementalfetchpartitionscached.value||
|kafkajmx.java.lang.operatingsystem.committedvirtualmemorysize||
|kafkajmx.kafka.controller.controllerstats.topicdeletionrateandtimems.count||
|kafkajmx.java.lang.memory.objectpendingfinalizationcount||
|kafkajmx.kafka.server.brokertopicmetrics.total.totalfetchrequestspersec.oneminuterate||
|kafkajmx.kafka.server.delayedoperationpurgatory.numdelayedoperations.produce.value||
|kafkajmx.java.lang.operatingsystem.systemcpuload||
|kafkajmx.kafka.server.brokertopicmetrics.total.messagesinpersec.count||
|kafkajmx.kafka.controller.controllerchannelmanager.totalqueuesize.value||
|kafkajmx.kafka.server.brokertopicmetrics.total.totalproducerequestspersec.oneminuterate||
|kafkajmx.kafka.controller.controllerstats.leaderandisrresponsereceivedrateandtimems.count||
|kafkajmx.java.lang.operatingsystem.availableprocessors||
|kafkajmx.kafka.server.brokertopicmetrics.total.failedfetchrequestspersec.oneminuterate||
|kafkajmx.kafka.controller.controllerstats.partitionreassignmentrateandtimems.count||
|kafkajmx.kafka.controller.kafkacontroller.activecontrollercount.value||
|kafkajmx.kafka.server.brokertopicmetrics.total.replicationbytesoutpersec.count||
|kafkajmx.kafka.server.delayedoperationpurgatory.numdelayedoperations.topic.value||
|kafkajmx.java.lang.threading.threadcputimeenabled||
|kafkajmx.kafka.server.request.queue.size||
|kafkajmx.kafka.server.kafkaserver.total.linux.disk.write.bytes.value||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeeperdisconnectspersec.oneminuterate||
|kafkajmx.java.lang.operatingsystem.totalphysicalmemorysize||
|kafkajmx.kafka.server.brokertopicmetrics.total.bytesoutpersec.count||
|kafkajmx.java.lang.threading.daemonthreadcount||
|kafkajmx.kafka.server.delayedoperationpurgatory.purgatorysize.fetch.value||
|kafkajmx.kafka.controller.controllerstats.controllershutdownrateandtimems.count||
|kafkajmx.java.lang.threading.currentthreadusertime||
|kafkajmx.kafka.server.replicafetchermanager.failedpartitionscount.value||
|kafkajmx.kafka.server.fetchsessioncache.total.incrementalfetchsessionevictionspersec.count||
|kafkajmx.kafka.controller.controllerstats.logdirchangerateandtimems.count||
|kafkajmx.java.lang.threading.synchronizerusagesupported||
|kafkajmx.kafka.controller.kafkacontroller.replicasineligibletodeletecount.value||
|kafkajmx.java.lang.memory.nonheapmemoryusage.committed||
|kafkajmx.kafka.server.fetchsessioncache.total.numincrementalfetchsessions.value||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeeperauthfailurespersec.oneminuterate||
|kafkajmx.kafka.server.replicamanager.total.underminisrpartitioncount.value||
|kafkajmx.kafka.server.produce.queue.size||
|kafkajmx.kafka.server.brokertopicmetrics.total.replicationbytesinpersec.count||
|kafkajmx.kafka.server.brokertopicmetrics.total.fetchmessageconversionspersec.oneminuterate||
|kafkajmx.java.lang.operatingsystem.processcputime||
|kafkajmx.kafka.server.brokertopicmetrics.total.invalidmagicnumberrecordspersec.oneminuterate||
|kafkajmx.kafka.server.replicamanager.total.offlinereplicacount.value||
|kafkajmx.java.lang.compilation.totalcompilationtime||
|kafkajmx.java.lang.memory.heapmemoryusage.used||
|kafkajmx.java.lang.threading.threadallocatedmemorysupported1||
|kafkajmx.kafka.controller.controllerstats.topicchangerateandtimems.count||
|kafkajmx.kafka.server.brokertopicmetrics.total.bytesrejectedpersec.count||
|kafkajmx.kafka.server.brokertopicmetrics.total.bytesinpersec.count||
|kafkajmx.java.lang.classloading.unloadedclasscount||
|kafkajmx.kafka.controller.controllerstats.leaderelectionrateandtimems.count||
|kafkajmx.kafka.controller.controllerstats.controlledshutdownrateandtimems.count||
|kafkajmx.kafka.server.brokertopicmetrics.total.failedfetchrequestspersec.count||
|kafkajmx.kafka.server.fetchsessioncache.total.incrementalfetchsessionevictionspersec.oneminuterate||
|kafkajmx.kafka.server.delayedoperationpurgatory.numdelayedoperations.fetch.value||
|kafkajmx.kafka.server.brokertopicmetrics.total.invalidmessagecrcrecordspersec.oneminuterate||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeeperreadonlyconnectspersec.count||
|kafkajmx.kafka.server.replicamanager.total.leadercount.value||
|kafkajmx.kafka.controller.controllerstats.uncleanleaderelectionenablerateandtimems.count||
|kafkajmx.java.lang.classloading.totalloadedclasscount||
|kafkajmx.kafka.controller.kafkacontroller.topicsineligibletodeletecount.value||
|kafkajmx.kafka.server.delayedoperationpurgatory.numdelayedoperations.deleterecords.value||
|kafkajmx.kafka.server.brokertopicmetrics.total.replicationbytesinpersec.oneminuterate||
|kafkajmx.kafka.server.brokertopicmetrics.total.nokeycompactedtopicrecordspersec.oneminuterate||
|kafkajmx.java.lang.operatingsystem.maxfiledescriptorcount||
|kafkajmx.kafka.server.brokertopicmetrics.total.bytesinpersec.oneminuterate||
|kafkajmx.kafka.server.replicafetchermanager.maxlag.value||
|kafkajmx.java.lang.threading.peakthreadcount||
|kafkajmx.kafka.server.brokertopicmetrics.total.replicationbytesoutpersec.oneminuterate||
|kafkajmx.java.lang.classloading.loadedclasscount||
|kafkajmx.kafka.server.brokertopicmetrics.total.reassignmentbytesinpersec.count||
|kafkajmx.kafka.controller.controllerstats.controllerchangerateandtimems.count||
|kafkajmx.java.lang.operatingsystem.freephysicalmemorysize||
|kafkajmx.java.lang.runtime.pid||
|kafkajmx.kafka.server.kafkaserver.total.brokerstate.value.value||
|kafkajmx.kafka.server.delayedoperationpurgatory.purgatorysize.electleader.value||
|kafkajmx.java.lang.threading.currentthreadallocatedbytes||
|kafkajmx.kafka.server.delayedoperationpurgatory.purgatorysize.deleterecords.value||
|kafkajmx.kafka.server.fetch.queue.size||
|kafkajmx.kafka.controller.controllerstats.updatefeaturesrateandtimems.count||
|kafkajmx.kafka.controller.kafkacontroller.globalpartitioncount.value||
|kafkajmx.kafka.server.controllermutation.queue.size||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeeperauthfailurespersec.count||
|kafkajmx.kafka.server.brokertopicmetrics.total.invalidmagicnumberrecordspersec.count||
|kafkajmx.kafka.network.processor.idlepercent.value||
|kafkajmx.kafka.controller.controllerstats.uncleanleaderelectionspersec.count||
|kafkajmx.kafka.server.replicamanager.total.atminisrpartitioncount.value||
|kafkajmx.kafka.server.brokertopicmetrics.total.reassignmentbytesoutpersec.oneminuterate||
|kafkajmx.java.lang.runtime.uptime||
|kafkajmx.kafka.server.replicaalterlogdirsmanager.total.maxlag.clientid.replicaalterlogdirs.value||
|kafkajmx.kafka.network.requestmetrics.requestspersec.count||
|kafkajmx.kafka.server.delayedoperationpurgatory.purgatorysize.topic.value||
|kafkajmx.kafka.controller.kafkacontroller.controllerstate.value||
|kafkajmx.java.lang.memory.nonheapmemoryusage.init||
|kafkajmx.kafka.server.replicamanager.total.isrshrinkspersec.oneminuterate||
|kafkajmx.kafka.server.brokertopicmetrics.total.bytesrejectedpersec.oneminuterat||
|kafkajmx.java.lang.operatingsystem.systemloadaverage||
|kafkajmx.java.lang.threading.objectmonitorusagesupported||
|kafkajmx.kafkajmx.kafka.server.kafkaserver.total.linux.disk.read.bytes.value||
|kafkajmx.kafkajmx.kafka.server.delayedoperationpurgatory.numdelayedoperations.heartbeat.value||
|kafkajmx.kafka.server.replicamanager.total.isrexpandspersec.oneminuterate||
|kafkajmx.kafka.server.delayedoperationpurgatory.purgatorysize.rebalance.value||
|kafkajmx.kafka.server.brokertopicmetrics.total.invalidoffsetorsequencerecordspersec.oneminuterate||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeepersyncconnectspersec.oneminuterate||
|kafkajmx.kafkajmx.java.lang.threading.threadcontentionmonitoringsupported||
|kafkajmx.kafka.server.brokertopicmetrics.total.producemessageconversionspersec.count||
|kafkajmx.java.lang.memory.nonheapmemoryusage.max||
|kafkajmx.kafka.server.brokertopicmetrics.total.failedproducerequestspersec.oneminuterate||
|kafkajmx.kafka.server.brokertopicmetrics.total.invalidmessagecrcrecordspersec.count||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeeperexpirespersec.count||
|kafkajmx.java.lang.threading.currentthreadcputim||
|kafkajmx.kafka.controller.controllerstats.listpartitionreassignmentrateandtimems.count||
|kafkajmx.java.lang.memory.heapmemoryusage.committed||
|kafkajmx.java.lang.threading.threadcputimesupported||
|kafkajmx.java.lang.operatingsystem.processcpuload||
|kafkajmx.kafka.server.replicamanager.total.reassigningpartitions.value||
|kafkajmx.kafka.server.kafkaserver.total.yammer.metrics.count.value||
|kafkajmx.kafka.server.delayedoperationpurgatory.purgatorysize.heartbeat.value||
|kafkajmx.kafka.server.delayedoperationpurgatory.numdelayedoperations.alteracls.valu||
|kafkajmx.kafka.server.brokertopicmetrics.total.totalfetchrequestspersec.count||
|kafkajmx.kafka.server.brokertopicmetrics.total.messagesinpersec.oneminuterate||
|kafkajmx.kafka.controller.kafkacontroller.offlinepartitionscount.value||
|kafkajmx.kafka.server.delayedoperationpurgatory.purgatorysize.alteracls.value||
|kafkajmx.kafka.server.kafkarequesthandlerpool.total.requesthandleravgidlepercent.count||
|kafkajmx.kafka.server.delayedoperationpurgatory.purgatorysize.produce.value||
|kafkajmx.kafka.server.brokertopicmetrics.total.producemessageconversionspersec.oneminuterate||
|kafkajmx.kafka.controller.kafkacontroller.globaltopiccount.value||
|kafkajmx.kafka.server.replicaalterlogdirsmanager.total.deadthreadcount.clientid.replicaalterlogdirs.value||
|kafkajmx.kafka.server.delayedoperationpurgatory.numdelayedoperations.electleader.value||
|kube.kafkajmxj.ava.lang.operatingsystem.totalswapspacesize||
|kafkajmx.kafka.server.replicaalterlogdirsmanager.total.minfetchrate.clientid.replicaalterlogdirs.value||
|kafkajmx.java.lang.memory.verbose||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeeperexpirespersec.oneminuterate||
|kafkajmx.java.lang.threading.threadallocatedmemoryenabled||
|kafkajmx.kafka.server.replicafetchermanager.deadthreadcount.value||
|kafkajmx.java.lang.threading.totalstartedthreadcount||
|kafkajmx.kafka.controller.kafkacontroller.topicstodeletecount.value||
|kafkajmx.kafka.server.replicamanager.total.failedisrupdatespersec.count||
|kafkajmx.kafka.server.zookeeperclientmetrics.total.zookeeperrequestlatencyms.count||
|kafkajmx.kafka.server.replicafetchermanager.minfetchrate.value{client.id="Replica",}||
|kafkajmx.kafka.server.replicamanager.total.partitioncount.value||
|kafkajmx.java.lang.memory.nonheapmemoryusage.used||
|kafkajmx.java.lang.classloading.verbose||
|kafkajmx.java.lang.runtime.bootclasspathsupported||
|kafkajmx.java.lang.operatingsystem.openfiledescriptorcount||
|kafkajmx.kafka.controller.kafkacontroller.replicastodeletecount.value||
|kafkajmx.kafka.controller.controllerstats.isrchangerateandtimems.count||
|kafkajmx.kafka.controller.kafkacontroller.preferredreplicaimbalancecount.value||
|kafkajmx.kafka.server.brokertopicmetrics.total.fetchmessageconversionspersec.count||
|kafkajmx.java.lang.memorkafkajmx.y.heapmemoryusage.max||
|kafkajmx.kafka.controller.controllerstats.autoleaderbalancerateandtimems.count||
|kafka.controller.controllerstats.topicuncleanleaderelectionenablerateandtimems.count||
|kafkajmx.kafka.server.replicaalterlogdirsmanager.total.failedpartitionscount.clientid.replicaalterlogdirs.value||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeepersaslauthenticationspersec.oneminuterate||
|kafkajmx.kafka.server.brokertopicmetrics.total.reassignmentbytesoutpersec.count||
|kafkajmx.java.lang.runtime.starttime||
|kafkajmx.kafka.server.brokertopicmetrics.total.nokeycompactedtopicrecordspersec.count||
|kafkajmx.java.lang.compilation.compilationtimemonitoringsupported||
|kafkajmx.kafka.server.brokertopicmetrics.total.totalproducerequestspersec.count||
|kafkajmx.java.lang.threading.threadcontentionmonitoringenabled||
|kafkajmx.java.lang.memory.heapmemoryusage.init||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeepersaslauthenticationspersec.count||
|kafkajmx.kafka.server.delayedoperationpurgatory.numdelayedoperations.rebalance.value||
|kafkajmx.kafka.server.replicamanager.total.failedisrupdatespersec.oneminuterate||
|kafkajmx.kafka.server.brokertopicmetrics.total.reassignmentbytesinpersec.oneminuterate||
|kafkajmx.kafka.server.kafkarequesthandlerpool.total.requesthandleravgidlepercent.oneminuterate||
|kafkajmx.java.lang.threading.threadcount||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeepersyncconnectspersec.count||
|kafkajmx.kafka.server.brokertopicmetrics.total.bytesoutpersec.oneminuterate||
|kafkajmx.java.lang.operatingsystem.freeswapspacesize||
|kafkajmx.kafka.server.replicamanager.total.isrexpandspersec.count||
|kafkajmx.java.lang.threading.currentthreadcputimesupported||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeeperreadonlyconnectspersec.oneminuterate||
|kafkajmx.kafka.server.sessionexpirelistener.total.zookeeperdisconnectspersec.count||
|kafkajmx.kafka.controller.controllerstats.manualleaderbalancerateandtimems.count||
|kafkajmx.jmx.scrape.duration.seconds||
|kafkajmx.jmx.scrape.error||
|kafkajmx.jmx.scrape.cached.beans||
|kafkajmx.jmx.config.reload.success.total||
|kafkajmx.jmx.config.reload.failure.created||
|kafkajmx.jmx.config.reload.success.created||

### Solr Metrics

|Metric Name|Description|
| :--- | :--- |
|solr.exporter.duration.seconds.bucket||
|solr.exporter.duration.seconds.count||
|solr.exporter.duration.seconds.sum||
|solr.metrics.core.query.mean.rate||
|solr.metrics.core.query.local.median.ms||
|solr.metrics..query.5minRate||
|solr.metrics.core.query.local.count||
|solr.metrics.core.query.1minRate||
|solr.metrics.core.searcher.cumulative.cache.total||
|solr.metrics.core.update.handler.splits.total||
|solr.collections.shard.leader||
|solr.collections.replica.state||
|solr.metrics.jvm.buffers||
|solr.metrics.core.query.p75.ms||
|solr.metrics.jvm.memory.heap.bytes||
|solr.metrics.core.update.handler.adds.total||
|solr.metrics.node.timeouts.total||
|solr.metrics.jvm.os.file.descriptors||
|solr.metrics.core.query.local.1minRate||
|solr.metrics.jvm.gc.seconds.total||
|solr.metrics.core.update.handler.adds||
|solr.metrics.core.update.handler.deletes.by.id.total˳||
|solr.collections.pull.replicas||
|solr.metrics.core.searcher.cache||
|solr.metrics.core.query.median.ms||
|solr.metrics.jvm.memory.pools.bytes||
|solr.metrics.core.field.cache.total||
|solr.metrics.core.searcher.cumulative.cache.ratio||
|solr.metrics.jetty.response.total||
|solr.metrics.core.update.handler.merges.total||
|solr.metrics.core.highlighter.request.total||
|solr.metrics.core.errors.total||
|solr.metrics.jvm.memory.non.heap.bytes||
|solr.collections.shard.state||
|solr.metrics.jvm.memory.bytes||
|solr.metrics.core.query.p99.ms||
|solr.metrics.jvm.os.cpu.load||
|solr.metrics.core.query.client.errors.1minRate||
|solr.metrics.core.searcher.cache.ratio||
|solr.metrics.node.cores||
|solr.metrics.core.query.p95.ms||
|solr.metrics.node.thread.pool.submitted.total||
|solr.metrics.core.searcher.documents||
|solr.metrics.node.thread.pool.completed.total||
|solr.metrics.jvm.os.load.average||
|solr.metrics.jvm.os.memory.bytes||
|solr.metrics.core.update.handler.expunge.deletes.total||
|solr.metrics.node.client.errors.total||
|solr.metrics.core.query.local.p95.ms||
|solr.metrics.core.update.handler.errors||
|solr.metrics.node.connections||
|solr.metrics.core.update.handler.auto.commits.total||
|solr.metrics.core.index.size.bytes||
|solr.metrics.core.searcher.warmup.time.seconds||
|solr.metrics.core.update.handler.rollbacks.total||
|solr.collections.tlog.replicas||
|solr.metrics.core.query.local.p99.ms||
|solr.metrics.core.fs.bytes||
|solr.collections.live.nodes||
|solr.metrics.jvm.os.cpu.time.seconds||
|solr.metrics.node.server.errors.total||
|solr.metrics.core.update.handler.optimizes.total||
|solr.ping||
|solr.metrics.core.timeouts.total||
|solr.metrics.jvm.gc.total||
|solr.metrics.node.requests.total||
|solr.metrics.core.query.errors.1minRate||
|solr.metrics.core.update.handler.pending.docs||
|solr.metrics.core.update.handler.soft.auto.commits.total||
|solr.metrics.jvm.buffers.bytes||
|solr.metrics.core.query.local.p75.ms||
|solr.metrics.core.client.errors.total||
|solr.metrics.jetty.requests.total||
|solr.metrics.node.time.seconds.total||
|solr.metrics.node.core.root.fs.bytes||
|solr.metrics.node.errors.total||
|solr.metrics.core.query.local.5minRate||
|solr.metrics.core.update.handler.commits.total||
|solr.metrics.jvm.threads||
|solr.metrics.node.thread.pool.running||
|solr.metrics.core.query.local.mean.rate||
|solr.collections.nrt.replicas||
|solr.metrics.core.update.handler.errors.total||
|solr.metrics.core.time.seconds.total||
|solr.metrics.core.update.handler.deletes.by.id||
|solr.metrics.core.update.handler.deletes.by.query||
|solr.metrics.overseer.collectionWorkQueueSize||
|solr.metrics.core.server.errors.total||

### Spark Metrics

|Metric Name|Description|
| :--- | :--- |
|spark.metrics.master.aliveWorkers.Number||
|spark.metrics.master.aliveWorkers.Value||
|spark.metrics.master.apps.Number||
|spark.metrics.master.apps.Value ||
|spark.metrics.master.waitingApps.Number||
|spark.metrics.master.waitingApps.Value||
|spark.metrics.master.workers.Number||
|spark.metrics.master.workers.Value||
|spark.metrics.HiveExternalCatalog.fileCacheHits.Count||
|spark.metrics.HiveExternalCatalog.filesDiscovered.Count||
|spark.metrics.HiveExternalCatalog.hiveClientCalls.Count||
|spark.metrics.HiveExternalCatalog.parallelListingJobCount.Count||
|spark.metrics.HiveExternalCatalog.partitionsFetched.Count||
|spark.metrics.CodeGenerator.compilationTime.Count||
|spark.metrics.CodeGenerator.compilationTime.Max||
|spark.metrics.CodeGenerator.compilationTime.Mean||
|spark.metrics.CodeGenerator.compilationTime.Min||
|spark.metrics.CodeGenerator.compilationTime.50thPercentile||
|spark.metrics.CodeGenerator.compilationTime.75thPercentile||
|spark.metrics.CodeGenerator.compilationTime.95thPercentile||
|spark.metrics.CodeGenerator.compilationTime.98thPercentile||
|spark.metrics.CodeGenerator.compilationTime.99thPercentile||
|spark.metrics.CodeGenerator.compilationTime.999thPercentile||
|spark.metrics.CodeGenerator.compilationTime.StdDev||
|spark.metrics.CodeGenerator.generatedClassSize.Count||
|spark.metrics.CodeGenerator.generatedClassSize.Max||
|spark.metrics.CodeGenerator.generatedClassSize.Mean||
|spark.metrics.CodeGenerator.generatedClassSize.Min||
|spark.metrics.CodeGenerator.generatedClassSize.50thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.75thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.95thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.98thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.99thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.999thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.StdDev||
|spark.metrics.CodeGenerator.generatedMethodSize.Count||
|spark.metrics.CodeGenerator.generatedMethodSize.Max||
|spark.metrics.CodeGenerator.generatedMethodSize.Mean||
|spark.metrics.CodeGenerator.generatedMethodSize.Min||
|spark.metrics.CodeGenerator.generatedMethodSize.50thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.75thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.95thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.98thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.99thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.999thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.StdDev||
|spark.metrics.CodeGenerator.sourceCodeSize.Count||
|spark.metrics.CodeGenerator.sourceCodeSize.Max||
|spark.metrics.CodeGenerator.sourceCodeSize.Mean||
|spark.metrics.CodeGenerator.sourceCodeSize.Min||
|spark.metrics.CodeGenerator.sourceCodeSize.50thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.75thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.95thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.98thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.99thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.999thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.StdDev||
|spark.metrics.worker.coresFree.Number||
|spark.metrics.worker.coresFree.Value||
|spark.metrics.worker.coresUsed.Number||
|spark.metrics.worker.coresUsed.Value||
|spark.metrics.worker.executors.Number||
|spark.metrics.worker.executors.Value||
|spark.metrics.worker.memFree.MB.Number||
|spark.metrics.worker.memFree.MB.Value||
|spark.metrics.worker.memUsed.MB.Number||
|spark.metrics.worker.memUsed.MB.Value||
|spark.metrics.HiveExternalCatalog.fileCacheHits.Count||
|spark.metrics.HiveExternalCatalog.filesDiscovered.Count||
|spark.metrics.HiveExternalCatalog.hiveClientCalls.Count||
|spark.metrics.HiveExternalCatalog.parallelListingJobCount.Count||
|spark.metrics.HiveExternalCatalog.partitionsFetched.Count||
|spark.metrics.CodeGenerator.compilationTime.Count||
|spark.metrics.CodeGenerator.compilationTime.Max||
|spark.metrics.CodeGenerator.compilationTime.Mean||
|spark.metrics.CodeGenerator.compilationTime.Min||
|spark.metrics.CodeGenerator.compilationTime.50thPercentile||
|spark.metrics.CodeGenerator.compilationTime.75thPercentile||
|spark.metrics.CodeGenerator.compilationTime.95thPercentile||
|spark.metrics.CodeGenerator.compilationTime.98thPercentile||
|spark.metrics.CodeGenerator.compilationTime.99thPercentile||
|spark.metrics.CodeGenerator.compilationTime.999thPercentile||
|spark.metrics.CodeGenerator.compilationTime.StdDev||
|spark.metrics.CodeGenerator.generatedClassSize.Count||
|spark.metrics.CodeGenerator.generatedClassSize.Max||
|spark.metrics.CodeGenerator.generatedClassSize.Mean||
|spark.metrics.CodeGenerator.generatedClassSize.Min||
|spark.metrics.CodeGenerator.generatedClassSize.50thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.75thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.95thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.98thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.99thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.999thPercentile||
|spark.metrics.CodeGenerator.generatedClassSize.StdDev||
|spark.metrics.CodeGenerator.generatedMethodSize.Count||
|spark.metrics.CodeGenerator.generatedMethodSize.Max||
|spark.metrics.CodeGenerator.generatedMethodSize.Mean||
|spark.metrics.CodeGenerator.generatedMethodSize.Min||
|spark.metrics.CodeGenerator.generatedMethodSize.50thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.75thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.95thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.98thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.99thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.999thPercentile||
|spark.metrics.CodeGenerator.generatedMethodSize.StdDev||
|spark.metrics.CodeGenerator.sourceCodeSize.Count||
|spark.metrics.CodeGenerator.sourceCodeSize.Max||
|spark.metrics.CodeGenerator.sourceCodeSize.Mean||
|spark.metrics.CodeGenerator.sourceCodeSize.Min||
|spark.metrics.CodeGenerator.sourceCodeSize.50thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.75thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.95thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.98thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.99thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.999thPercentile||
|spark.metrics.CodeGenerator.sourceCodeSize.StdDev||


