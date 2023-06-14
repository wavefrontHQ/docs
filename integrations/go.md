---
title: Go Integration
tags: [integrations list]
permalink: go.html
summary: Learn about the Go Integration.
---
# Go Integration

This Wavefront Go integration explains how to send Go application metrics to Wavefront.

Wavefront provides several Go SDKs for different purposes on Github:

- **[wavefront-sdk-go](https://github.com/wavefrontHQ/wavefront-sdk-go)**: Core SDK for sending different telemetry data to Wavefront. Data include metrics, delta counters, distributions, and spans.
- **[go-metrics-wavefront](https://github.com/wavefrontHQ/go-metrics-wavefront)**: Provides reporters and constructs such as counters, meters and histograms to periodically report application metrics and distributions to Wavefront.
- **[wavefront-lambda-go](https://github.com/wavefrontHQ/wavefront-lambda-go)**: Wavefront Go wrapper for AWS Lambda to enable reporting of standard lambda metrics and custom app metrics directly to Wavefront.
- **[wavefront-opentracing-sdk-go](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-go)**: Wavefront OpenTracing Go SDK. See [our tracing documentation](https://docs.wavefront.com/tracing_basics.html) for background.

In the Setup tab, the integration includes sample code based on `go-metrics-wavefront` for sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html). The Setup tab includes both a simple example and an extended example for adding metric-level tags.

The steps in the Setup tab explain how to collect Go runtime metrics. This integration provides a dashboard based on the collected Go runtime metrics.

## Go Setup

The Wavefront plugin for [go-metrics](https://github.com/rcrowley/go-metrics) adds [Wavefront reporters](https://github.com/wavefronthq/go-metrics-wavefront) and an abstraction that supports tagging at the reporter and metric levels.
The reporters support sending metrics to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).


### Option 1. Create a Wavefront Proxy Reporter

Follow these steps for sending metrics to a Wavefront proxy. See Option 2 for sending metrics directly to a Wavefront service.



#### Step 1. Set up Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your Go application, install a proxy. You configure the Wavefront proxy hostname and port (by default 2878) when you invoke the reporter.

#### Step 2. Create the Wavefront Proxy Reporter
{% raw %}
```
import (
  "net"

  "github.com/wavefronthq/wavefront-sdk-go/senders"
  "github.com/wavefronthq/go-metrics-wavefront"
  "github.com/rcrowley/go-metrics"
)

func main() {
  proxyCfg := &senders.ProxyConfiguration {
        // The proxy hostname or address
        Host : "proxyHostname or proxyIPAddress",

        // Set the proxy port to send metrics to. Default: 2878
        MetricsPort : 2878,

        // Set a proxy port to send histograms to. Recommended: 2878
        DistributionPort: 2878,
  }

  // Create the proxy sender
  sender, err := senders.NewProxySender(proxyCfg)
  if err != nil {
      panic(err)
  }

  reporter := reporting.NewReporter(
    sender,
    application.New("test-app", "test-service"),
    reporting.Source("go-metrics-test"),
    reporting.Prefix("test.prefix"),
    reporting.LogErrors(true),
  )
}
```
{% endraw %}

### Option 2. Create a Wavefront Direct Reporter

You can send metrics directly to a Wavefront service, discussed next. Option 1 above explains how to send metrics to a Wavefront proxy.
{% raw %}
```
import (
  "github.com/wavefronthq/wavefront-sdk-go/senders"
  "github.com/wavefronthq/go-metrics-wavefront"
  "github.com/rcrowley/go-metrics"
)

func main() {
  directCfg := &senders.DirectConfiguration{
    Server: "https://YOUR_CLUSTER.wavefront.com",
    Token:  "YOUR_API_TOKEN",
  }

  sender, err := senders.NewDirectSender(directCfg)
  if err != nil {
    panic(err)
  }

  reporter := reporting.NewReporter(
    sender,
    application.New("test-app", "test-service"),
    reporting.Source("go-metrics-test"),
    reporting.Prefix("test.prefix"),
    reporting.LogErrors(true),
  )
}
```
{% endraw %}

### Adding Metric-level Tags

You can add tags to individual metrics.{% raw %}
```
import (
  "github.com/rcrowley/go-metrics"
  "github.com/wavefronthq/go-metrics-wavefront"
)

func main() {
  // create a reporter using steps above

  // create tags you wish to add on the metrics
  tags := map[string]string{
    "key1": "val1",
    "key2": "val2",
  }
  counter := metrics.NewCounter() // Create a counter
  reporter.RegisterMetric("foo", counter, tags) // will create a 'test.prefix.foo.count' metric with tags
  counter.Inc(47)
}
```
{% endraw %}

### Collecting Go Runtime Metrics
You can enable the runtime metric flag in the reporter to collect Go runtime metrics:
{% raw %}
```
func main() {
  // set reporting.RuntimeMetric(true) when creating a reporter using the steps mentioned above
  reporter := reporting.NewReporter(
    sender,
    application.New("test-app", "test-service"),
    reporting.Source("go-metrics-test"),
    reporting.Prefix("test.prefix"),
    reporting.LogErrors(true),
    reporting.RuntimeMetric(true),
  )
}
```
{% endraw %}

### Extended Example
{% raw %}
```
package main

import (
	"fmt"
	"math/rand"
	"os"
	"time"

	metrics "github.com/rcrowley/go-metrics"
	"github.com/wavefronthq/go-metrics-wavefront/reporting"
	"github.com/wavefronthq/wavefront-sdk-go/application"
	"github.com/wavefronthq/wavefront-sdk-go/senders"
)

func main() {

	// Tags we'll add to the metric
	tags := map[string]string{
		"key2": "val2",
		"key1": "val1",
		"key0": "val0",
		"key4": "val4",
		"key3": "val3",
	}

	// Create a direct sender
	directCfg := &senders.DirectConfiguration{
    Server:               "https://YOUR_CLUSTER.wavefront.com",
    Token:                "YOUR_API_TOKEN",
		BatchSize:            10000,
		MaxBufferSize:        50000,
		FlushIntervalSeconds: 1,
	}

	sender, err := senders.NewDirectSender(directCfg)
	if err != nil {
		panic(err)
	}

	reporter := reporting.NewReporter(
		sender,
		application.New("test-app", "test-service"),
		reporting.Source("go-metrics-test"),
		reporting.Prefix("test.prefix"),
		reporting.LogErrors(true),
	)

	// Create a counter metric and register with tags
	counter := metrics.NewCounter()                
	reporter.RegisterMetric("foo", counter, tags)
	counter.Inc(47)

	// Create a histogram and register with tags
	histogram := reporting.NewHistogram()
	reporter.RegisterMetric("duration", histogram, tags)

	// Create a histogram and register without tags
	histogram2 := reporting.NewHistogram()
	reporter.Register("duration2", histogram2)

	deltaCounter := metrics.NewCounter()
	reporter.RegisterMetric(reporting.DeltaCounterName("delta.metric"), deltaCounter, tags)
	deltaCounter.Inc(10)

	fmt.Println("Search wavefront: ts(\"test.prefix.foo.count\")")
	fmt.Println("Entering loop to simulate metrics flushing. Hit ctrl+c to cancel")

	for {
		counter.Inc(rand.Int63())
		histogram.Update(rand.Int63())
		histogram2.Update(rand.Int63())
		deltaCounter.Inc(10)
		time.Sleep(time.Second * 10)
	}
}
```
{% endraw %}



