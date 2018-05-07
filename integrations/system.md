---
title: Wavefront Usage Integration
tags: [integrations list]
permalink: system.html
summary: Learn about the Wavefront Wavefront Usage Integration.
---
## Wavefront System Integration

The Wavefront System integration is a dashboard that visualizes the internal metrics emitted by [Wavefront proxies](https://docs.wavefront.com/proxies.html) and the Wavefront collector gateway. These metrics allow you to check that your Wavefront instance is behaving as expected. Wavefront internal metrics have the following prefixes:

  - `~agent` or `~proxy` - Metric rate received and sent from the proxy, blocked and rejected metric rates, buffer metrics, and JVM stats of the proxy. Also includes counts of metrics affected by rules applied at the proxy preprocessor. Proxy metrics historically had the prefix `~agent` and queries support both `~proxy` and `~agent`.
  - `~collector` - Metrics that monitor the data processed at the collector gateway to the Wavefront instance.
  - `~wavefront` - A set of gauges tracking statistics about your use of Wavefront.
  - `~metric`: Counter and gauge metrics computed by the proxy. These give you the total unique sources and metrics.  You can compute the rate of metric creation from each source.

If you have an Amazon Web Services integration, metrics with the following prefix are available:

  - `~externalservices` - CloudWatch API requests and estimated costs, overall metric rates, and CloudTrail event rate.

