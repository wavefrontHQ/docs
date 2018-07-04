---
title: Go Integration
tags: [integrations list]
permalink: go.html
summary: Learn about the Wavefront Go Integration.
---
# Go Integration

You can use go-metrics and the Wavefront reporters to send Go application metrics to Wavefront. The reporters support sending metrics to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html). You can assign point tags at both the reporter and metric levels.

This is a custom integration. You can send your own metrics and create your own dashboards.

## Go Setup

The Wavefront plugin for [go-metrics](https://github.com/rcrowley/go-metrics) adds [Wavefront reporters](https://github.com/wavefronthq/go-metrics-wavefront) and a simple abstraction that supports tagging at the reporter and metric levels.
The reporters support sending metrics to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).


### Option 1. Create a Wavefront Proxy Reporter

Follow these steps for sending metrics to a Wavefront proxy. See Option 2 for sending metrics directly to a Wavefront service.



#### Step 1. Set up Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your Go application, install a proxy. You configure the Wavefront proxy hostname and port (by default 2878) when you invoke the reporter.

#### Step 2. Create the Wavefront Proxy Reporter

Tags passed to the proxy reporter are applied to every metric.

{% raw %}
```
import (
  "net"
  "github.com/rcrowley/go-metrics"
  "github.com/wavefronthq/go-metrics-wavefront"
)

func main() {
  hostTags := map[string]string{
    "source": "go-metrics-test",
  }

  // Set the address of the Wavefront proxy
  addr, _ := net.ResolveTCPAddr("tcp", "192.168.99.100:2878")

  // Report to a Wavefront Proxy every second
  go wavefront.WavefrontProxy(metrics.DefaultRegistry, 1*time.Second, hostTags, "some.prefix", addr)
}
```

### Option 2. Create a Wavefront Direct Reporter

You can send metrics directly to a Wavefront service, discussed next. Option 1 above explains how to send metrics to a Wavefront proxy.

Tags passed to the direct reporter are applied to every metric.


```
import (
  "github.com/rcrowley/go-metrics"
  "github.com/wavefronthq/go-metrics-wavefront"
)

func main() {
  hostTags := map[string]string{
    "source": "go-metrics-test",
  }

  server := "http://YOUR_CLUSTER.wavefront.com"
  token := "YOUR_API_TOKEN"

  // Report to a Wavefront server every 5 seconds
  go wavefront.WavefrontDirect(metrics.DefaultRegistry, 5*time.Second, hostTags, "direct.prefix", server, token)
}
```

### Adding Metric-level Tags

You can add tags to individual metrics. `wavefront.RegisterMetric()` has the same affect as go-metrics' `metrics.Register()` except that it accepts tags in the form of a string map. The tags are then used by the Wavefront reporter at flush time. The tags become part of the key for a metric within go-metrics' registry. Every unique combination of metric name+tags is a unique series. You can pass your tags in any order to the Register and Get functions. The Wavefront plugin ensures the tags are always encoded in the same order within the registry to ensure no duplication of metric series.

```
import (
  "github.com/rcrowley/go-metrics"
  "github.com/wavefronthq/go-metrics-wavefront"
)

func main() {

  c := metrics.NewCounter()
  wavefront.RegisterMetric(
    "foo", c, map[string]string{
      "key1": "val1",
      "key2": "val2",
    })
  c.Inc(47)
}
```

### Extended Example

```
package main

import (
  "fmt"
  "net"
  "time"

  "github.com/rcrowley/go-metrics"
  "github.com/wavefronthq/go-metrics-wavefront"
)

func main() {

  //Create a counter
  c := metrics.NewCounter()
  //Tags we'll add to the metric
  tags := map[string]string{
    "key2": "val1",
    "key1": "val2",
    "key0": "val0",
    "key4": "val4",
    "key3": "val3",
  }

  // Register the counter using wavefront.RegisterMetric instead of metrics.Register if there are tags
  wavefront.RegisterMetric("foo", c, tags)
  c.Inc(47)

  // Retrieve the counter using metric name and tags.
  // Any unique set of name+tags is a unique series and thus a unique metric
  m2 := wavefront.GetMetric("foo", tags)

  // Retrieve the counter using wavefront.GetOrRegisterMetric instead of metrics.GetOrRegister if there are tags.
  m3 := wavefront.GetOrRegisterMetric("foo", c, tags)

  // Define tags to pass to the reporter
  reporterTags := map[string]string{
    "source": "go-metrics-test",
  }

  // Set the address of the Wavefront proxy
  addr, _ := net.ResolveTCPAddr("tcp", "192.168.99.100:2878")

  go wavefront.WavefrontProxy(metrics.DefaultRegistry, 1*time.Second, reporterTags, "some.prefix", addr)

  // Send metrics directly to a wavefront service
  server := "http://YOUR_CLUSTER.wavefront.com"
  token := "YOUR_API_TOKEN"
  go wavefront.WavefrontDirect(metrics.DefaultRegistry, 5*time.Second, hostTags, "direct.prefix", server, token)
}
```
{% endraw %}

For more information, see [go-metrics-wavefront  reference](https://github.com/wavefrontHQ/go-metrics-wavefront/blob/master/GODOCS.md).
