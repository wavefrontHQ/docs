---
title: Installing a Wavefront Proxy Manually
keywords: Ansible
tags: [proxies, best practice]
sidebar: doc_sidebar
permalink: proxies_manual_install.html
summary: Learn how to manually install a Wavefront proxy.
---
We have instructions for scripted installation of the Wavefront proxy and the Telegraf agen in this document set and the integrations for the different operating systems.

However, depending on your insisting environment, you might have to perform a manual installation instead. This page gives some guidance.

## Prerequisites

<!---From Mike E:
Need a pre-requisites section - for example the version of Java needed to be installed, which environmental variables need to be set and how.

Example: Before RHEL7 users install the Wavefront RPM, they should run: (Our install expects to find Java in a specific location defined in a environmental verable)

yum install java-1.8.0-openjdk
echo "PROXY_JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.181-3.b13.el7_5.x86_64/jre/" > /etc/sysconfig/wavefront-proxy--->

## Installing the Proxy Manually

1. Download the proxy `.rpm` or `.deb` file from [packagecloud.io/wavefront/proxy](packagecloud.io/wavefront/proxy)
2. Run `sudo rpm -U <name_of_file.rpm>` or `sudo dpkg -i <name_of_file.deb>`
3. Edit the `/etc/wavefront/wavefront-proxy/wavefront.conf` file and set the `server`, `token`, and `hostname` settings.


### Configuration File Settings

<!---Need a section to either proved example config files or how to modify these config files. In a manual install the files are very different from the ones our installation script modifies; I supplied my customer ones to replace the the one from the manual installation. File include: wavefront.conf, telegraf.conf, 10-wavefront.conf and the add on for vSphere [output] for telegraf in telegraf.d.--->


## Installing Telegraph Manually

1. Download the Telegraf `.rpm` or `.deb` file from [packagecloud.io/wavefront/telegraf](packagecloud.io/wavefront/telegraf)
2. Run `sudo rpm -U <name_of_file.rpm>` or `sudo dpkg -i <name_of_file.deb>`
3. Replace the `/etc/telegraf/telegraf.conf` file with one we supply (or list the edits, there are many)
4. Add file with proper contents for /etc/telegraf/telegraf.d/10-wavefront.conf

## Opening Firewall Ports

If you install the Wavefront proxy and Telegraf agent behind a firewall, you might have to open certain ports so the Wavefront proxy can talk to the Wavefront service.

<!---Kubernetes: We're also going to need a section for each of the Kubernetes versions we support highlighting how/what they are different from the standard Proxy installation.--->

## Testing Your Installation

<!---Need a way to positively test if the connectivity for the WF proxy server is working other than checking the instance. An example of this would be; curl https://longboard.wavefront.com - then explain a positive response from our service would look like.--->
