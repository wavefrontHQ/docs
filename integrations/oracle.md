---
title: Oracle RDBMS Integration
tags: [integrations list]
permalink: oracle.html
summary: Learn about the Oracle RDBMS Integration.
---
## Oracle RDBMS

Oracle is an Industry-leading enterprise Relational Database Management System.

This integration installs and configures Telegraf and a custom Python script to send Oracle metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a Wavefront proxy. The custom script uses the Dynamic Performance views that Oracle provides to gather metrics.

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/Oracle-DB-metrics.png" width="80" %}

To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Oracle RDBMS



### Step 1. Install the Telegraf Agent

If you don't have the Telegraf agent installed, follow the steps below. Otherwise, continue to step 2.

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Create wavefront User in Oracle
{% raw %}
```
  CREATE USER wavefront IDENTIFIED BY <yourpassword>;
  GRANT select_catalog_role TO wavefront;
  GRANT CREATE SESSION TO wavefront;
```
{% endraw %}

### Step 3. Install Python

1. Make sure python 3.6 or higher is installed on the Telegraf agent server.
2. Install python package cx_Oracle. Use the following snippet.{% raw %}
  ```
    python3 -m pip install cx_Oracle --upgrade
  ```
{% endraw %}

### Step 4. Create a Script to Gather Oracle RDBMS Metrics

1. Download [wavefront_oracle_metrics.py](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/oracle/wavefront_oracle_metrics.py) onto your Telegraf agent server.
2. Test the script execution using this command:{% raw %}
    ```
    python wavefront_oracle_metrics.py
    ```
{% endraw %}
    You should get a response similar to this:{% raw %}
    ```
    usage: wavefront_oracle_metrics.py [-h] -u USER -p PASSWD -s SID
    wavefront_oracle_metrics.py: error: the following arguments are required: -u/--user, -p/--passwd, -s/--sid
    ```
{% endraw %}
    If the script is not executing, adjust the file permission and the Python path.
3. Download [exec_oracle_python.sh](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/oracle/exec_oracle_python.sh) onto your Telegraf agent server.
4. Edit the script to change the environment variables, and  python execution path for your Telegraf agent server. 
5. Change the ``wavefront password`` & ``sid`` parameters in exec_oracle_python.sh file. {% raw %}
```
   # Example.
   /usr/bin/python "/home/oracle/Documents/wavefront_oracle_metrics.py" -u "wavefront" -p "wavefront123" -s "orcl"
```
{% endraw %}
6. Note down the full paths for files downloaded and saved from steps 1 & 3 above.

### Step 5. Configure Telegraf Exec Input Plugin

For Linux Telegraf agent server.

Create a file called `oracle.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.exec]]
   commands = ["/home/oracle/Documents/exec_oracle_python.sh"]
   timeout = "5s"
   data_format = "influx"
```
{% endraw %}
**NOTE:** use the path of the exec_oracle_python.sh.

For Windows Telegraf agent server.

Edit the `telegraf.conf` file located at `Program Files\Telegraf` and enter the following snippet:
{% raw %}
```
[[inputs.exec]]
   commands = [
         'python "C:\Wavefront\wavefront_oracle_metrics.py" -u "wavefront" -p "<password>" -s "<sid>"'
			]
   timeout = "5s"
   data_format = "influx"
```
{% endraw %}
Change the ``password`` and ``sid`` in the code snippet.

**NOTE:** use the path of the wavefront_oracle_metrics.py.

### Step 6. Restart Telegraf

For Linux

Run `sudo service telegraf restart` to restart your Telegraf agent.

For Windows

Restart the Telegraf service using the Windows Services Management Console or from the command prompt:
{% raw %}
```
  net stop telegraf
  net start telegraf
```
{% endraw %}



