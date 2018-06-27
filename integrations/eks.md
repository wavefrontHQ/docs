---
title: Amazon EKS Integration
tags: [integrations list]
permalink: eks.html
summary: Learn about the Wavefront Amazon EKS Integration.
---
## Kubernetes Integration

Kubernetes is a popular open source container orchestration system. This integration uses [Heapster](https://github.com/kubernetes/heapster), a collector agent that runs natively in Kubernetes. It collects detailed resource metrics about the containers, namespaces, nodes, pods, and the cluster itself and sends them to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some of the pod charts in the Kubernetes dashboard.

{% include image.md src="images/db_kubernetes_pods.png" width="80" %}
## Kubernetes Setup

### Step 1. Deploy a Wavefront Proxy in Kubernetes

Copy the following yaml to your system as `proxy.yaml`:
{% raw %}
```
apiVersion: v1
kind: ReplicationController
metadata:
  labels:
    app: wavefront-proxy
    name: wavefront-proxy
  name: wavefront-proxy
  namespace: default
spec:
  replicas: 1
  selector:
    app: wavefront-proxy
  template:
    metadata:
      labels:
        app: wavefront-proxy
    spec:
      containers:
      - name: wavefront-proxy
        image: wavefronthq/proxy:latest
        imagePullPolicy: Always
        env:
        - name: WAVEFRONT_URL
          value: http://YOUR_CLUSTER.wavefront.com/api/
        - name: WAVEFRONT_TOKEN
          value: YOUR_API_TOKEN
        ports:
        - containerPort: 2878
          protocol: TCP
        - containerPort: 4242
          protocol: TCP
        securityContext:
          privileged: false
```

Run `kubectl create -f </path/to>/proxy.yaml`. The Wavefront proxy should now be running in Kubernetes.

### Step 2. Create a Wavefront Proxy Service

Create a proxy service to expose the Wavefront proxy internally to your Kubernetes cluster.

Copy and save the following yaml to a file named `proxy-service.yaml`.

```
apiVersion: v1
kind: Service
metadata:
  name: wavefront-proxy
  labels:
    app: wavefront-proxy
spec:
  ports:
  - name: wavefront
    port: 2878
    protocol: TCP
  - name: opentsdb
    port: 4242
    protocol: TCP
  selector:
    app: wavefront-proxy
```

Run `kubectl create -f </path/to>/proxy-service.yaml`. A `wavefront-proxy` service should now be running on your cluster.

### Step 3. Deploy Heapster

Copy and save the following yaml to your system as `heapster.yaml`:

```
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: heapster
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:heapster
subjects:
- kind: ServiceAccount
  name: heapster
  namespace: kube-system
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: heapster
  namespace: kube-system
---
apiVersion: v1
kind: ReplicationController
metadata:
  labels:
    k8s-app: heapster
    name: heapster
    version: v6
  name: heapster
  namespace: kube-system
spec:
  replicas: 1
  selector:
    k8s-app: heapster
    version: v6
  template:
    metadata:
      labels:
        k8s-app: heapster
        version: v6
    spec:
      serviceAccount: "heapster"
      containers:
      - name: heapster
        image: wavefronthq/heapster-amd64:latest
        imagePullPolicy: Always
        command:
        - /heapster
        - --source=kubernetes.summary_api:''
        - --sink=wavefront:wavefront-proxy.default.svc.cluster.local:2878?clusterName=k8s-cluster&includeLabels=true
        volumeMounts:
        - name: ssl-certs
          mountPath: /etc/ssl/certs
          readOnly: true
        ports:
        - containerPort: 8082
          protocol: TCP
      volumes:
      - name: ssl-certs
        hostPath:
          path: /etc/ssl/certs
```
{% endraw %}
Run `kubectl create -f /path/to/heapster.yaml`. The Heapster collector agent should now be running on your cluster.

If you do not see metrics in the Kubernetes dashboard, check the logs from the Heapster and proxy pods.
