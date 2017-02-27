---
title: Wavefront CLI
keywords:
tags: [integrations,proxies]
sidebar: doc_sidebar
permalink: wavefront_cli.html
---
The Wavefront Command Line Interface (CLI) is a utility for installing and configuring the Wavefront proxy, Telegraf collector agent, and integrations. The CLI uses native package managers to install packages (i.e. yum, apt-get) and therefore should be run as sudo.

## Requirements

The Wavefront CLI is currently supported on Linux environments only and has been tested on the following Linux versions:

-   Amazon Linux AMI 2016.09.0
-   CentOS 6.7, 7.2
-   Debian Jesse, Wheezy
-   RedHat 6.6, 7.3
-   Ubuntu 14.04, 16.04

The oldest version of Python the CLI has been tested with is 2.6.6. If you do not see your family of operating system listed above or receive an error, contact <support@wavefront.com>.

{% include note.html content="If you're using Docker or a Docker optimized operating system such as CentOS Atomic, we highly recommend looking at Wavefront's options for [Monitoring Docker Containers](https://community.wavefront.com/docs/DOC-1186)." %}

## Installing Wavefront CLI

The Wavefront CLI is available on PyPI as a pip package. To install the CLI, run:

    $ sudo pip install wavefront-cli

## Installing and Running Wavefront CLI

You can install and run the Wavefront CLI directly via `curl`. This is useful when you want to install the Wavefront CLI, Proxy, and/or agent in a single command. Any command-line arguments added to the example below are passed to the Wavefront CLI.

```shell
$ sudo bash -c "$(curl -sL https://raw.githubusercontent.com/wavefronthq/wavefront-cli/master/sh/install.sh)" --
```

## Wavefront CLI Usage

To invoke the Wavefront CLI, run

    sudo wave <command>

where `<command>` is `install`, `integration`, or `configure`. To see a full list of all options, run `wave -h`.

### The Install Command

The most common use for the Wavefront CLI is installing the Wavefront Proxy and/or Telegraf. The `install` command accepts multiple options. If a required option is not passed as an argument, the CLI prompts you for missing input. If all required options are passed, the CLI does not prompt for input.

The `install` command accepts 1-4 top level options: `--proxy`, `--agent`, `--statsd`, `--aws`.

-   `--proxy` - Install and configure the Wavefront Proxy on the current host.
-   `--agent` - Install and configure Telegraf on the current host.
-   `--aws` - Add AWS EC2 metadata to the Telegraf configuration as tags. Metrics from an EC2 instance are tagged with the EC2 tags, AWS region, the VPC ID, and Image ID of the EC2 instance.
-   `--statsd` - Enable the Telegraf StatsD service plugin. You must also install Telegraf with the `--agent` option.

### Install: Example Usage

Each top-level option has 1 to several sub-options. If any required sub-option is not provided, the CLI prompts for input.

Install Proxy and Telegraf (the CLI prompts for required options):

    $ sudo wave install --proxy --agent

Install Proxy and Telegraf with no prompts:

```shell
$ sudo wave install \
    --proxy \
        --wavefront-url=https://YOUR_INSTANCE.wavefront.com \
        --api-token=YOUR_API_TOKEN \
    --agent \
        --proxy-address=localhost \
        --proxy-port=2878
```

Install Proxy and Telegraf and configure AWS Metadata and StatsD in Telegraf:

```shell
$ sudo wave install \
    --proxy \
        --wavefront-url=https://YOUR_INSTANCE.wavefront.com \
        --api-token=YOUR_API_TOKEN \
    --agent \
        --proxy-address=localhost \
        --proxy-port=2878 \
        --agent-tags="env=dev,app=myapp"
    --statsd \
        --statsd-port=8125 \
    --aws \
        --aws-region=us-west-2 \
        --aws-secret-key-id=YOUR_KEY_ID \
        --aws-secret-key=YOUR_SECRET_KEY
```

## The Integration Command

The `integration` command installs or removes a Wavefront integration. In most cases, this means generating a Telegraf config file in `/etc/telegraf/telegraf.d` and deploying a template dashboard.

    $ sudo wave integration <name> (install|remove) [<option>...]

### Integration: Example Usage

Install StatsD service plugin on port 8215 (default) in Telegraf:

    $ sudo wave integration StatsD install statsd_port=8125

Install Wavefront output plugin in Telegraf to emit to a Proxy installed on localhost:2878:

    $ sudo wave integration Wavefront install proxy_address=localhost proxy_port=2878

### Contributing Integrations

The `<name>` argument of the `integration` command creates an instance of a `wavefront_cli.integrations.Base` subclass matching the `<name>` argument. When installing an integration, any arguments passed in the `[<option>...]` part of the command are passed to the subclass as a dictionary. This makes it possible to drop in new integrations. At a minimum, an integration subclass must implement the following methods:

```python
class Example(Base):

    def install(self):
        return True

    def remove(self):
        return True

    def validate_options(self):
        return True
```

See `wavefront_cli/integrations/statsd.py` for a very simple example of an integration implementation.

## The Configure Command

The `configure` command updates the Wavefront URL and API token.

    sudo wave configure \
        --wavefront-url=https://YOUR_INSTANCE.wavefront.com \
        --api-token=YOUR_API_TOKEN \

## Release Process

`release.sh` packages and ships this module to PyPI. To create your own version and upload to your own PyPI project, edit `setup.py`.

    $ ./release.sh

{% include links.html %}
