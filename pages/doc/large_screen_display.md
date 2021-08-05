---
title: Showing Dashboards on Large-Screen Displays
tags: [administration]
sidebar: doc_sidebar
permalink: large_screen_display.html
summary: Display Wavefront dashboards on one or more large-screen, read-only displays
---

Some Wavefront customers saw a need to show Wavefront on several large screen, read only displays. This page explains how to set up an environment with these characteristics:

* Authorization only at the originating source. No login prompts at the TV screen.
* No Timeout.
* Read Only. The purpose is display.

## Prerequisites

You start with a Linux VM with the following characteristics:
* Runs inside the network
* Outbound access to the Internet (but doesn't need inbound access)
* Internal DNS

On the Linux VM, you need one account, preferably a [service account](service-accounts.html). You'll use the token of the account in the NGINX config file, as shown below.

We tested the process with an Ubuntu VM with a service account that had the default permissions.

## Set Up the VM to Send the Dashboard to the Large Screen

Follow these steps:

1. Install NGINX on your Linux VM.
2. Add the following to the NGINX configuration file:

```
server {
  listen 443 ssl;

  ssl_certificate <path to crt file>;
  ssl_certificate_key <path to key file>;

  location / {
    proxy_pass <wavefront_url_like_https://mon.wavefront.com>;
    proxy_set_header Cookie "";
    proxy_set_header Authorization "Bearer <token_of_the_user_to_impersonate_like_a_service_account>";
    proxy_set_header X-WAVEFRONT-RESTRICTED "true";
    proxy_hide_header Cookie;
  }
}
```

   This example uses 443 as the listener port, so you have to make sure that port is open. The token is the token of the service account mentioned in the prerequisites. You can instead use port 80 without SSL during testing.

3. Restart the NGINX service.
4. Type the URL that includes the address of the VM into the browser that's connected to the large-screen displays.

NGINX will continue to run, and the connected screens will show the dashboard. Because a service account with a Bearer token was used in the configuration file, there are no additional login prompts.
