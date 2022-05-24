---
title: Sending Logs From Your Kubernetes Cluster
keywords: data, logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_kubernetes_tutorial.html
summary: Learn how to send logs from your Kubernetes cluster to Tanzu Observability
---

In this tutorial you send logs from your local Kubernetes environment using Minikube to Tanzu Observability. Once the data is in Tanzu Observability, we use the Log Browser to search and filter logs.

## Prerequisites

* A Tanzu Observability by Wavefront account, which gives you access to a cluster. If you don’t have a cluster, [sign up for a free trial](https://tanzu.vmware.com/observability-trial).
* A Tanzu Observability API token linked to an account with Proxy permission. See [Generating an API Token](wavefront_api.html#generating-an-api-token).
* Whitelist the VMware domain (`*.vmware.com`). 
  Tanzu Observability uses the VMware log server as part of its architecture. Therefore, to send your log data successfully, you need to whitelist the VMware domain.
* [Install Docker](https://docs.docker.com/get-docker/). You’ll run the Wavefront proxy on Docker for this tutorial.
* Install Minikube. Follow [step 1 on the Minikube start guide](https://minikube.sigs.k8s.io/docs/start/).

## Send Logs to Tanzu Observability

Follow these steps to install the Wavefront proxy, start Minikube, and then send the logs to Tanzu Observability:

1. Run the Wavefront proxy:
    1. Start the Wavefront proxy on Docker: 
        ```
        
        docker run -d \
          -e WAVEFRONT_URL=https://{INSTANCE_NAME}.wavefront.com/api/ \
          -e WAVEFRONT_TOKEN={TOKEN} \
          -e WAVEFRONT_PROXY_ARGS="--pushFlushMaxLogs 150 --customMessageTags log" \
          -e JAVA_HEAP_USAGE=512m \
          -p 2878:2878 \
          wavefronthq/proxy:latest
        ```

        {% include note.html content="Replace `{INSTANCE_NAME}` with the name of your Wavefront instance (example: https://example.wavefront.com) and `{TOKEN}` with a Tanzu Observability API token you got in the Prerequisites section."%}

    1. List the container IDs and cop the container ID of the proxy:
        ```
        docker ps
        ```
    1. Tail the logs for the proxy.
        ```
        docker logs <PROXY_CONTAINER_ID> --follow
        ```
1. Run Kubernetes on your local environment:
    1. Start Minikube.
        ```
        minikube start --driver=docker
        ```
        
    1. Send the requests on your local machine to the Kubernetes cluster you started using Minikube.
        ```
        minikube addons enable ingress
        kubectl port-forward service/ingress-nginx-controller -n ingress-nginx 8080:80
        ```
1. Run the Fluentd log shipper:
    1. Create a file named `fluent.conf` in a preferred directory.
    1. Copy the configurations to the file you created.
        You tag your application as `my_application` and the service as `my_service`.
        <div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <b>
                                <a class="noCrossRef accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Click to get the configurations </a>
                            </b>
                        </div>
                        <div id="collapseOne" class="panel-collapse collapse noCrossRef">
                            <div class="panel-body">
                                <pre>
<label @FLUENT_LOG>
  <match fluent.**>
    @type null
  </match>
</label>   

<source>
  @id in_tail_container_logs
  @type tail
  path /var/log/containers/*
  pos_file /var/log/fluentd-containers.log.pos
  tag raw.kubernetes.*
  read_from_head true
  <parse>
    @type multi_format
    <pattern>
      format json
      time_key time
      time_format %Y-%m-%dT%H:%M:%S.%NZ
    </pattern>
  </parse>
</source>

# Concatenate multi-line logs
<filter **>
  @id filter_concat
  @type concat
  key message
  multiline_end_regexp /\n$/
  separator ""
</filter>


<filter **>
  @type record_transformer
  enable_ruby
  <record>
    service "none" # my_application
    application "none" # my_service
    #source "#{ENV['MY_NODE_NAME']}"    
    #service "${record['kubernetes']['labels']['service']}"
    #application "${record['kubernetes']['labels']['application']}"
    timestamp ${time.to_datetime().strftime('%Q')}
  </record>
</filter>

<match **>
  @type copy
  <store>
    @type http
    endpoint http://host.minikube.internal:2878/logs/json_array?f=logs_json_arr
    open_timeout 2
    json_array true
    <buffer>
      flush_interval 1s
    </buffer>
  </store>      
</match>
                                </pre>
                            </div>
                        </div>
                    </div>
                    <!-- /.panel -->
          </div>
          <!-- /.panel-group -->
          
    1. Navigate to the directory, which you created the `fluent.conf` file and run the following command to create a configmap from the config file. WHY?
        ```
        kubectl create configmap fluentdconfigmap --from-file=fluent.conf -n kube-system
        ```
    1. In the same directory, create a file named `fluentd.yaml` and copy the configuration.
    <div class="panel-group" id="accordion">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <b>
                            <a class="noCrossRef accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Click to get the configurations </a>
                        </b>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse noCrossRef">
                        <div class="panel-body">
                            <pre>
                            </pre>
                        </div>
                    </div>
                </div>
                <!-- /.panel -->
      </div>
      <!-- /.panel-group -->
        
    1. Install Fluentd as a daemonset (one per node)
        ```
        kubectl apply -f fluentd.yaml
        ```
    1. Run the command given below to verify that you see the Fluentd pod.
        ```
        kubectl get pods -n kube-system
        ```
        Example output:
        ```
        ```

        
