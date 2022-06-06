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

* A Tanzu Observability by Wavefront account which gives you access to a cluster. If you don’t have a cluster, [sign up for a free trial](https://tanzu.vmware.com/observability-trial).
* A Tanzu Observability API token linked to an account with Proxy permission. See [Generating an API Token](wavefront_api.html#generating-an-api-token).
* [Install Docker](https://docs.docker.com/get-docker/). You’ll run the Wavefront proxy on Docker for this tutorial.
* Install Minikube. Follow [step 1 on the Minikube start guide](https://minikube.sigs.k8s.io/docs/start/).
* Clone the sample repository.
    ```
    git clone https://github.com/wavefrontHQ/logging-examples.git
    ```

<!-- * Whitelist the VMware domain (`*.vmware.com`).
  Tanzu Observability uses the VMware log server as part of its architecture. Therefore, to send your log data successfully, you need to whitelist the VMware domain. -->

## Send Logs to Tanzu Observability

Follow these steps to install the Wavefront proxy, start Minikube, and then send the logs to Tanzu Observability:

1. Run the Wavefront proxy:
    1. Start the Wavefront proxy on Docker: 
        ```
        docker run -d \
          -e WAVEFRONT_URL=https://{INSTANCE_NAME}.wavefront.com/ \
          -e WAVEFRONT_TOKEN={TOKEN} \
          -e WAVEFRONT_PROXY_ARGS="--pushFlushMaxLogs 150 --customMessageTags log" \
          -e JAVA_HEAP_USAGE=512m \
          -p 2878:2878 \
          wavefronthq/proxy:latest
        ```

        {% include note.html content="Replace `{INSTANCE_NAME}` with the name of your Wavefront instance (example: https://example.wavefront.com) and `{TOKEN}` with a Tanzu Observability API token you got in the Prerequisites section."%}
        
        {% include important.html content="If you previously started the Wavefront proxy on Docker, delete the old image to download the latest release. Use the commands listed below: " %}
        ```
        # stop the container
        docker stop <running CONTAINER ID>
        
        # remove the docker image
        docker rmi wavefronthq/proxy:latest
        
        # now, run the command in step 1 again.
        ```

    1. List the container IDs and copy the container ID of the proxy:
        ```
        docker ps
        ```
    1. Tail the logs for the proxy.
        ```
        docker logs <PROXY_CONTAINER_ID> --follow
        ```
1. Run Kubernetes on your local environment:
    1. Open a new terminal window and start Minikube.
        ```
        minikube start --driver=docker
        ```
        
    1. Send the requests on your local machine to the Kubernetes cluster you started using Minikube.
        ```
        minikube addons enable ingress
        kubectl port-forward service/ingress-nginx-controller -n ingress-nginx 8080:80
        ```
1. Run the Fluentd log shipper:
    1. Open a new terminal window and navigate to the directory you cloned in the Prerequisites
        ```
        cd <folder_path>/logging-examples
        ```
    1. Run the following command to create a config map from the config file. WHY?
        ```
        kubectl create configmap fluentdconfigmap --from-file=fluent.conf -n kube-system
        ```
    1. Install Fluentd as a daemonset
        ```
        kubectl apply -f fluentd.yaml
        ```
    1. Run the command below to verify that you see the Fluentd pod you just installed.
        ```
        kubectl get pods -n kube-system
        ```
        Example output:
        ```
        NAME                               READY   STATUS    RESTARTS        AGE
        fluentd-wf-logging-jqwbz           1/1     Running   0               119s
        ```
1. Start the services:
    1. Start the development service.
        ```
        kubectl apply -f pod_dev.yaml
        ```
    
    1. Start the staging service.
        ```
        kubectl apply -f pod_staging.yaml
        ```
1. Tail the logs of the service:
    1. On a new terminal window, get the name of the development service, and copy the name.
        ```
        kubectl get pods --namespace development
        ```
        Example output:
        ```
        NAME                    READY   STATUS    RESTARTS   AGE
        app1-6ddbdb8486-9f762   1/1     Running   0          2m15s
        ```
        
    1. Tail the logs of the development service. Enter the name you copied in the above step in place of `<container_id>`.
        ```
        kubectl logs  <container_id> --follow --namespace development
        ```
    1. On a new terminal window, get the name of the staging services, and copy the name.
        ```
        kubectl get pods --namespace staging
        ```
    1. Tail the logs of the staging service. Enter the name you copied in the above step in place of `<container_id>`.
        ```
        kubectl logs <container_id> --follow --namespace staging
        ```
1. Access the services you just started:
    1. Access the development service using the following URL: [http://localhost:8080/service1](http://localhost:8080/service1)
    1. Access the staging service using the following URL: [http://localhost:8080/service2](http://localhost:8080/service2)
    
## Search and Filter Logs 

Once Tanzu Observability receives the data, you can search and filter logs on the log browser, see the logs related to alerts, and drill into logs from a chart, Application Map, and the Traces Browser.

Follow these steps:
1. In your web browser, go to your Wavefront instance and log in.
1. From the toolbar, select **Logs**. You see the Log Browser.
1. Click **application** and select **my_app**. 
    {% include tip.html content="If **Auto Search** is on, the search results show up on the logs browser page when you add a source, tag, or keyword to the search bar. If **Auto Search** is off, click **Search** to get the search results. "%}
    ![a screenshot of the log browser with my_app on the search bar.](images/logging_kubernetes_tutorial_search.png)

To learn more, see [Log Browser](logging_log_browser.html).

## Clean Up

After running the tutorial, run the following commands to delete the content that you created for this tutorial:

1. Navigate to each terminal that you have service running and press **Ctrl** + **C** to stop them.

1. Stop the proxy container running on Docker:
    ```
    # get the container ID for the wavefront Proxy
    docker ps
    
    # stop the Proxy
    docker stop <CONTAINER ID>
    ```
    {% include important.html content="Don't stop the Minikube instance. You need it running to remove the rest of the configurations." %}
1. Delete the proxy image. 
    ```
    docker rmi wavefronthq/proxy:latest
    ```
    If you are prompted to remove the image forcefully, append `--force` to the end of the above command.

1. Delete the Fluentd config map.

    ```
    kubectl delete configmap    fluentdconfigmap  -n   kube-system
    ```
    
1. Delete the Kubernetes service created using the `Fluentd.yaml` file.
    ```
    kubectl delete -f Fluentd.yaml
    ```

1. Delete the Kubernetes service created using the `pod_dev.yaml` file.
    ```
    kubectl delete -f pod_dev.yaml
    ```

1. Delete the Kubernetes service created using the `pod_staging.yaml` file.
    ```
    kubectl delete -f pod_staging.yaml
    ```
    
1. Stop the Minikube instance running on Docker:
    ```
    # get the container ID for minikube
    docker ps
    
    # stop the minikube instance
    docker stop <CONTAINER ID>
    ```