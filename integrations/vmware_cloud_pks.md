---
title: VMware Cloud PKS Integration
tags: [integrations list]
permalink: vmware_cloud_pks.html
summary: Learn about the Wavefront VMware Cloud PKS Integration.
---
## Kubernetes Integration

Kubernetes is a popular open source container orchestration system. This integration uses [Heapster](https://github.com/kubernetes/heapster), a collector agent that runs natively in Kubernetes. It collects detailed resource metrics about the containers, namespaces, nodes, pods, and the cluster itself and sends them to a [Wavefront proxy](https://docs.wavefront.com/proxies.html). This integration also explains how to configure and collect [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics). The kube-state-metrics service listens to the Kubernetes API server and generates metrics about the state of Kubernetes objects.

In addition to setting up the metrics flow, this integration also installs dashboards. 

Here's a preview of some of the pod charts in the Kubernetes dashboard.

{% include image.md src="images/db_kubernetes_pods.png" width="80" %}

Here's a preview of some of the charts from kube-state-metrics dashboard.

{% include image.md src="images/kube-state-dashboard.png" width="80" %}


## Kubernetes Setup

### Step 1. Deploy a Wavefront Proxy in Kubernetes

Copy the following yaml to your system as `proxy.yaml`:
{% raw %}
```
apiVersion: apps/v1
# Kubernetes versions after 1.9.0 should use apps/v1
# Kubernetes versions before 1.8.0 should use apps/v1beta1 or extensions/v1beta1
kind: Deployment
metadata:
  labels:
   app: wavefront-proxy
   name: wavefront-proxy
  name: wavefront-proxy
  namespace: default
spec:
  replicas: 1
  selector:
   matchLabels:
    k8s-app: wavefront-proxy
  template:
    metadata:
      labels:
        k8s-app: wavefront-proxy
    spec:
      containers:
      - name: wavefront-proxy
        image: wavefronthq/proxy:latest
        imagePullPolicy: Always
        env:
        - name: WAVEFRONT_URL
          value: https://YOUR_CLUSTER.wavefront.com/api/
        - name: WAVEFRONT_TOKEN
          value: YOUR_API_TOKEN
        ports:
        - containerPort: 2878
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
   k8s-app: wavefront-proxy
spec:
  ports:
  - name: wavefront
    port: 2878
    protocol: TCP
  selector:
    k8s-app: wavefront-proxy
```

Run `kubectl create -f </path/to>/proxy-service.yaml`. A `wavefront-proxy` service should now be running on your cluster.

### Step 3. Deploy Heapster

If RBAC is enabled on your Kubernetes cluster, copy and save the following yaml to your system as `heapster-rbac.yaml`:
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
```
Run `kubectl create -f heapster-rbac.yaml`.

Copy and save the following yaml to your system as `heapster.yaml`:

```
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
Replace the `clusterName=k8s-cluster` above to uniquely identify your Kubernetes cluster.

If RBAC is disabled, comment out `serviceAccount: "heapster"` from `heapster.yaml`.

Run `kubectl create -f /path/to/heapster.yaml`. The Heapster collector agent should now be running on your cluster.

If you do not see metrics in the Kubernetes dashboard, check the logs from the Heapster and proxy pods.


To collect **kube-state metrics** from your Kubernetes cluster, follow Step 4 & Step 5.

### Step 4. Deploy the kube-state-metrics service

Copy and save the following yaml to your system as `kube-state.yaml`:

```
apiVersion: rbac.authorization.k8s.io/v1
# kubernetes versions before 1.8.0 should use rbac.authorization.k8s.io/v1beta1
#kube-state-metrics-cluster-role.yaml
kind: ClusterRole
metadata:
    name: kube-state-metrics
rules:
- apiGroups: [""]
  resources:
  - configmaps
  - secrets
  - nodes
  - pods
  - services
  - resourcequotas
  - replicationcontrollers
  - limitranges
  - persistentvolumeclaims
  - persistentvolumes
  - namespaces
  - endpoints
  verbs: ["list", "watch"]
- apiGroups: ["extensions"]
  resources:
  - daemonsets
  - deployments
  - replicasets
  verbs: ["list", "watch"]
- apiGroups: ["apps"]
  resources:
  - statefulsets
  verbs: ["list", "watch"]
- apiGroups: ["batch"]
  resources:
  - cronjobs
  - jobs
  verbs: ["list", "watch"]
- apiGroups: ["autoscaling"]
  resources:
  - horizontalpodautoscalers
  verbs: ["list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
# kubernetes versions before 1.8.0 should use rbac.authorization.k8s.io/v1beta1
#kube-state-metrics-cluster-role-binding.yaml
kind: ClusterRoleBinding
metadata:
  name: kube-state-metrics
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kube-state-metrics
subjects:
  - kind: ServiceAccount
    name: kube-state-metrics
    namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
# kubernetes versions before 1.8.0 should use rbac.authorization.k8s.io/v1beta1
#kube-state-metrics-role.yaml
kind: Role
metadata:
  namespace: kube-system
  name: kube-state-metrics-resizer
rules:
- apiGroups: [""]
  resources:
  - pods
  verbs: ["get"]
- apiGroups: ["extensions"]
  resources:
  - deployments
  resourceNames: ["kube-state-metrics"]
  verbs: ["get", "update"]
---
apiVersion: rbac.authorization.k8s.io/v1
# kubernetes versions before 1.8.0 should use rbac.authorization.k8s.io/v1beta1
#kube-state-metrics-role-binding.yaml
kind: RoleBinding
metadata:
  name: kube-state-metrics
  namespace: kube-system
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: kube-state-metrics-resizer
subjects:
- kind: ServiceAccount
  name: kube-state-metrics
  namespace: kube-system
---
#kube-state-metrics-service-account.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kube-state-metrics
  namespace: kube-system
---
#kube-state-metrics-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: kube-state-metrics
  namespace: kube-system
  labels:
    k8s-app: kube-state-metrics
  annotations:
    prometheus.io/scrape: 'true'
spec:
  ports:
  - name: http-metrics
    port: 8080
    targetPort: http-metrics
    protocol: TCP
  - name: telemetry
    port: 8081
    targetPort: telemetry
    protocol: TCP
  selector:
    k8s-app: kube-state-metrics
---
#kube-state-metrics-deployment.yaml
apiVersion: apps/v1
# Kubernetes versions after 1.9.0 should use apps/v1
# Kubernetes versions before 1.8.0 should use apps/v1beta1 or extensions/v1beta1
kind: Deployment
metadata:
  name: kube-state-metrics
  namespace: kube-system
spec:
  selector:
    matchLabels:
      k8s-app: kube-state-metrics
  replicas: 1
  template:
    metadata:
      labels:
        k8s-app: kube-state-metrics
    spec:
      serviceAccountName: kube-state-metrics
      containers:
      - name: kube-state-metrics
        image: quay.io/coreos/kube-state-metrics:v1.3.1
        ports:
        - name: http-metrics
          containerPort: 8080
        - name: telemetry
          containerPort: 8081
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
          timeoutSeconds: 5
      - name: addon-resizer
        image: k8s.gcr.io/addon-resizer:1.7
        resources:
          limits:
            cpu: 100m
            memory: 30Mi
          requests:
            cpu: 100m
            memory: 30Mi
        env:
          - name: MY_POD_NAME
            valueFrom:
              fieldRef:
                fieldPath: metadata.name
          - name: MY_POD_NAMESPACE
            valueFrom:
              fieldRef:
                fieldPath: metadata.namespace
        command:
          - /pod_nanny
          - --container=kube-state-metrics
          - --cpu=100m
          - --extra-cpu=1m
          - --memory=100Mi
          - --extra-memory=2Mi
          - --threshold=5
          - --deployment=kube-state-metrics

```
Run `kubectl create -f </path/to>/kube-state.yaml`. A `kube-state-metrics` service should now be running on your cluster.

### Step 5. Deploy Telegraf to Collect kube-state-metrics

Copy and save the following yaml to your system as `telegraf.yaml`:

```
apiVersion: apps/v1
# Kubernetes versions after 1.9.0 should use apps/v1
# Kubernetes versions before 1.8.0 should use apps/v1beta1 or extensions/v1beta1
kind: Deployment
metadata:
  name: telegraf-ksm
  namespace: kube-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: telegraf-ksm
  template:
    metadata:
      labels:
        app: telegraf-ksm
    spec:
      containers:
      - name: telegraf
        image: wavefronthq/telegraf:latest
        env:
        - name: WAVEFRONT_PROXY
          value: wavefront-proxy.default
        - name: INTERVAL
          value: 60s
        - name: METRIC_SOURCE_NAME
          value: kube-state-metrics
        resources:
          requests:
            memory: 30Mi
            cpu: 100m
          limits:
            memory: 50Mi
            cpu: 200m
        volumeMounts:
        - name: telegraf-d
          mountPath: /etc/telegraf/telegraf.d
      volumes:
      - name: telegraf-d
        projected:
          sources:
          - configMap:
              name: telegraf-ksm-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: telegraf-ksm-config
  namespace: kube-system
data:
  prometheus.conf: |
    [[inputs.prometheus]]
      urls = ["http://kube-state-metrics:8080/metrics"]
      [inputs.prometheus.tags]
        cluster = "k8s-cluster"

```
{% endraw %}
Replace the `cluster = "k8s-cluster"` property above to uniquely identify your Kubernetes cluster.

Run `kubectl create -f </path/to>/telegraf.yaml`. A `telegraf` agent should now be running on your cluster.

If you do not see metrics in the Kubernetes dashboard, check the logs from the telegraf and proxy pods.
