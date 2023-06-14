---
title: Ansible Role Integration
tags: [integrations list]
permalink: ansible.html
summary: Learn about the Ansible Role Integration.
---
## Wavefront Ansible Role Integration

Ansible is an open-source automation engine that automates software provisioning, configuration management, and application deployment. The Wavefront Ansible role installs and configures the Wavefront proxy (`wavefront-proxy`) or collector (`telegraf`) agent, which allows you to automate Wavefront proxy and Telegraf collector agent installation on multiple hosts. 

## Wavefront Ansible Role Setup

### Step 1. Install Wavefront Ansible Role Using Ansible Galaxy
{% raw %}
```
ansible-galaxy install wavefrontHQ.wavefront-ansible
```
{% endraw %}

To install into your playbook `roles`, use `-p ROLES_PATH` or `--path=ROLES_PATH`:
{% raw %}
```
ansible-galaxy install wavefrontHQ.wavefront-ansible -p /your/project/root/roles
```
{% endraw %}
    
See [Installing multiple roles from a file](http://docs.ansible.com/ansible/galaxy.html#installing-multiple-roles-from-a-file).


#### Note

`ansible-galaxy install <role> -p <path>` returns an error if using the `ansible-galaxy` in Python 3.x.

Error: `Failed to get data from the API server - a bytes-like object is required, not 'str'`
 
To resolve the above issue, make sure you use `ansible-galaxy` in Python 2.x. For more info, see: http://stackoverflow.com/questions/41837789/ansible-galaxy-failing-for-init-install-failed-to-get-data-from-the-api-server.


### Step 2. Create Basic Playbook

Create a sample playbook (yml) file like the one shown below named `wavefront-ansible.yml`:
{% raw %}
```
---
- hosts: all
  gather_facts: true
  remote_user: root
  become: true
  roles:
    - { role: wavefrontHQ.wavefront-ansible, wavefront_install_collector: "true" }
```
{% endraw %}

### Step 3. Run Playbook

1. Go to the folder containing the `wavefront-ansible.yml` file.
1. To install Wavefront proxy (`wavefront-proxy`) on your local machine, run:

    - RedHat/CentOS:{% raw %}
      ```
      ansible-playbook -i "`hostname`," --connection=local wavefront-ansible.yml \
      --extra-vars "wavefront_install_proxy=true wavefront_api_token=YOUR_API_TOKEN proxy_address=localhost \
      wavefront_url="https://YOUR_CLUSTER.wavefront.com" \
      --tags "redhat"
      ```
{% endraw %}

    - Debian/Ubuntu:{% raw %}
      ```
      ansible-playbook -i "`hostname`," --connection=local wavefront-ansible.yml \
      --extra-vars "wavefront_install_proxy=true wavefront_api_token=YOUR_API_TOKEN proxy_address=localhost \
      wavefront_url="https://YOUR_CLUSTER.wavefront.com" \
      --tags "debian"
      ```
{% endraw %}


Refer to [Wavefront Ansible Role](https://galaxy.ansible.com/wavefrontHQ/wavefront-ansible/) for variables, tags, and other details.



