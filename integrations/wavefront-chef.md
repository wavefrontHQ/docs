---
title: Chef Server Integration
tags: [integrations list]
permalink: wavefront-chef.html
summary: Learn about the Chef Server Integration.
---
## Chef Server Integration

This integration is a cookbook for installing and configuring Python, pip, Telegraf, and the Wavefront proxy on a Chef client. The instructions include all commands you run, in sequence.

## Chef Server Setup

### Step 1. Download and extract the Chef cookbook

On a Chef client that is set up to push to your Chef server, run the following commands:
{% raw %}
```
knife cookbook site download wavefront
tar xvf wavefront-0.1.1.tar.gz
```
{% endraw %}

### Step 2. Modify attributes.rb to include your API key

{% raw %}
```
cd wavefront/attributes
sed -i 's/<YOUR_API_KEY>/YOUR_API_TOKEN/g' wavefront/attributes/default.rb
```
{% endraw %}

### Step 3. Upload the Operations for Applications cookbook
{% raw %}
```
knife cookbook upload wavefront
```
{% endraw %}

### Step 4. Add the cookbook to your client's run list

This needs to be executed only once per client.
{% raw %}
```
knife node run_list add NODE_NAME wavefront
```
{% endraw %}

### Step 5. Run the cookbook
{% raw %}
```
sudo chef-client
```
{% endraw %}



