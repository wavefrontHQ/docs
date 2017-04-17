---
title: Running a Wavefront Proxy in a Docker Container
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies_running_docker.html
summary: Learn how to run a Wavefront proxy in a Docker container.
---
You can run a Wavefront proxy in a Docker container. The Docker image is available in [Wavefront Docker repo](https://hub.docker.com/r/wavefronthq/proxy/). To run the container you must provide:

- WAVEFRONT_URL - The URL to your Wavefront API instance.
- WAVEFRONT_TOKEN - Your Wavefront API token.

For detailed Wavefront proxy requirements and other installation procedures, see [Installing Wavefront Proxies](proxies_installing).

## Examples

### Docker Run

```shell
docker run -d -e WAVEFRONT_URL=https://<wavefront_instance>.wavefront.com/api/ -e WAVEFRONT_TOKEN=<wavefront_api_token> -p 2878:2878 -p 4242:4242 wavefronthq/proxy:latest  
```

### Docker Compose

```yaml
wavefront:  
    hostname: wavefront-proxy  
    container_name: wavefront-proxy  
    ports:  
      - "3878:3878"  
      - "2878:2878"  
      - "4242:4242"  
    environment:  
      WAVEFRONT_URL: https://<wavefront_instance>.wavefront.com/api/  
      WAVEFRONT_TOKEN: <wavefront_api_token>  
    image: wavefronthq/proxy:latest  
    restart: always
```

### Kubernetes

```yaml
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
          value: https://<wavefront_instance>.wavefront.com/api/  
        - name: WAVEFRONT_TOKEN  
          value: <wavefront_api_token>
        ports:  
        - containerPort: 2878  
          protocol: TCP  
        - containerPort: 4242  
          protocol: TCP  
```

