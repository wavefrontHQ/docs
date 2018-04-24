---
title: Go Integration
tags: []
permalink: go.html
summary: Learn about the Wavefront Go Integration.
---
# Go Integration

To send Go application metrics to Wavefront use go-metrics and the Wavefront reporter. The reporter sends data to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) and lets you assign point tags at both the reporter and metric levels. 

This is a custom integration. You can send your own metrics and create your own dashboards.
## Go Setup

The Wavefront plugin for [go-metrics](https://github.com/rcrowley/go-metrics) adds a [Wavefront reporter](https://github.com/wavefronthq/go-metrics-wavefront) and a simple abstraction that supports tagging at the reporter and metric levels.



### Step 1. Set up Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your Go application, [install a proxy](/proxies/add). You configure the Wavefront proxy hostname and port (by default 2878) when you invoke the reporter.

### Step 2. Create a Wavefront Reporter and Register Metrics

#### Reporter-level Tags

Tags passed to the reporter are applied to every metric.
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
  go wavefront.Wavefront(metrics.DefaultRegistry, 1*time.Second, hostTags, "some.prefix", addr)
}
```

#### Metric-level Tags

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

#### Extended Example

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
  // Register it using wavefront.RegisterMetric instead of metrics.Register if there are tags
  wavefront.RegisterMetric("foo", c, tags)
  c.Inc(47)

  // Retrieve it using metric name and tags.
  // Any unique set of name+tags is a unique series and thus a unique metric
  m2 := wavefront.GetMetric("foo", tags)

  // Retrieve it using wavefront.GetOrRegisterMetric instead of metrics.GetOrRegister if there are tags.
  m3 := wavefront.GetOrRegisterMetric("foo", c, tags)

  // Define tags to pass to the reporter
  reporterTags := map[string]string{
    "source": "go-metrics-test",
  }

  // Set the address of the Wavefront proxy
  addr, _ := net.ResolveTCPAddr("tcp", "192.168.99.100:2878")

  go wavefront.Wavefront(metrics.DefaultRegistry, 1*time.Second, reporterTags, "some.prefix", addr)
}
```
{% endraw %}

For reference information, see [Wavefront reporter reference](https://github.com/wavefrontHQ/go-metrics-wavefront/blob/master/GODOCS.md).