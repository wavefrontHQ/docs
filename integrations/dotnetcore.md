---
title: .NET Core Integration
tags: [integrations list]
permalink: dotnetcore.html
summary: Learn about the .NET Core Integration.
---
## .NET Core Integration

The .NET Core is a general-purpose, most versatile framework that may be used to build software applications for Windows, Linux, and MacOS.
This integration installs and configures the Wavefront Collector for Kubernetes to collect the .NET Core performance metrics and uses the [Wavefront proxy](https://docs.wavefront.com/proxies.html) for sending those metrics to VMware Aria Operations for Applications.

Here's a preview of the .NET Core on Kubernetes dashboard:

{% include image.md src="images/dotnetcore_dashboard.png" width="80" %}

## .NET Core Setup

Supported Versions:
- .NET Core: 7.0
- Kubernetes: 1.25.x or later

### .NET Core on Kubernetes

You can deploy the Wavefront Collector for Kubernetes and Wavefront proxy and use them for monitoring the .NET Core applications on Kubernetes either by deploying the Kubernetes Operator or by using Helm or manual installation.

#### Expose the .NET Core Application Metrics Using Prometheus Nuget Package

The below snippet shows the sample application instrumentation to expose the metrics in Promethues format.
{% raw %}
```
// Weather Forecast Sample Application
using Prometheus;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddMetrics();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpMetrics();
app.UseAuthorization();
app.UseMetricServer();
app.UseHttpMetrics();

app.Run();
```
{% endraw %}

See the [sample .NET Core project](https://github.com/wavefrontHQ/integrations/blob/master/DotnetCoreSample/README.md) to build a docker image and deploy on Kubernetes.

### Update the Wavefront Collector ConfigMap

#### Wavefront Collector Deployed as Operator

  If you do not already have the Wavefront Collector for Kubernetes installed on your Kubernetes cluster, follow these instructions to add it to your cluster by using [quick install](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-the-kubernetes-operator).

  1. Download the Wavefront Collector [ConfigMap file](https://raw.githubusercontent.com/wavefrontHQ/wavefront-operator-for-kubernetes/f0990bba35afafadf0cb85a700d5f2295889243a/deploy/kubernetes/scenarios/wavefront-collector-existing-configmap.yaml) and replace the `YOUR_CLUSTER_NAME` and `YOUR_WAVEFRONT_URL` with the values relevant for your environment.

  2. Under `sources`, add the following snippet:{% raw %}
  ```
        prometheus_sources:
        - url: 'http://<dotnet-core-service-IP:PORT>/metrics'
          prefix: 'dotnetcore.'
  ```
{% endraw %}

  3. Deploy the updated Wavefront Collector ConfigMap:{% raw %}
  ```
  kubectl apply -f wavefront-collector-existing-configmap.yaml
  ```
{% endraw %}

#### Wavefront Collector Deployed using Helm or Manual installation

  If you do not already have the Wavefront Collector for Kubernetes installed on your Kubernetes cluster, follow these instructions to add it to your cluster either by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install).

  1. Edit the Wavefront Collector ConfigMap at runtime, and under `Prometheus Sources`, add the following configuration snippet.{% raw %}
  ```
  kubectl edit configmap wavefront-collector-config -n wavefront
  ```
{% endraw %}

  .NET Core configuration:{% raw %}
  ```
        prometheus_sources:
        - url: 'http://<dotnet-core-service-IP:PORT>/metrics'
          prefix: 'dotnetcore.'
  ```
{% endraw %}



