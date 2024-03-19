---
title: Troubleshooting Cloud Services Integrations
keywords: integrations
tags: [integrations, troubleshooting]
sidebar: doc_sidebar
permalink: integrations-troubleshooting.html
summary: Learn how to troubleshoot the setup of our Cloud Services integrations.
---

Integrations are one easy way to get data from external systems into VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications). You can use one of the [built-in integrations](label_integrations%20list.html) and customize it as needed.

## Cloud Services Integrations

Our Cloud Services integrations are:

* Amazon Web Services
* Google Cloud Platform
* Microsoft Azure
* New Relic
* AppDynamics
* VMware Aria Operations (SaaS)
* Dynatrace
* Snowflake

## Troubleshooting Snowflake Integration Setup

If you give Tanzu Observability access to a Snowflake account which is additionally secured, for example, if it has network policies attached, you can perform certain prechecks and thus ensure the successful authentication during the [Snowflake integration setup](snowflake.html).


The following precheck steps use SnowSQL.

1. Download and install SnowSQL.

   See [Installing SnowSQL](https://docs.snowflake.com/en/user-guide/snowsql-install-config) for details.
2. Test your connection.

    1. Run the command:

        ```
        snowsql -a <account_identifier> -u <user_name>

        ```

        In this example:
        
        * `<account_identifier>` is the Snowflake account identifier with the account name, `<orgname>-<account_name>`.
        * `<user_name>` is the user that you have created for Tanzu Observability by following the setup steps for the Snowflake integration in the Tanzu Observability UI. For example, `My_AoA_Integration`.
    
    2. Provide your password when prompted.
    3. To quit the connection, enter `!quit`.
3. Generate a JWT token.
    1. Run the command:

        ```
        snowsql --private-key-path <path_to_your_key>/rsa_key.p8 --generate-jwt -a <account_identifier> -u <user_name>

        ```
        In this example:
        
        * `<path_to_your_key>` is the path to your private `rsa_key.p8` key. For example, `~/.ssh/rsa_key.p8`
        * `<account_identifier>` is the Snowflake account identifier with the account name, `<orgname>-<account_name>`.
        * `<user_name>` is the user that you have created for Tanzu Observability by following the setup steps for the Snowflake integration in the Tanzu Observability UI. For example, `My_AoA_Integration`.
    2. Provide the passphrase for the private key when prompted.
    3. Copy the generated JWT token.

4. Run the following SQL POST API call to access the Snowflake database:

    ```
        curl -X POST \
        'https://<account_identifier>.snowflakecomputing.com/api/v2/statements?async=true' \
        -H 'accept: application/json' \
        -H 'authorization: Bearer <jwt-token>' \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json' \
        -H 'user-agent: wavefront/1.0' \
        -H 'x-snowflake-authorization-token-type: KEYPAIR_JWT' \
        -d '{
        "statement": "select date_part(epoch_millisecond, convert_timezone('\''UTC'\'', USAGE_DATE)),STORAGE_BYTES, STAGE_BYTES, FAILSAFE_BYTES from ACCOUNT_USAGE.STORAGE_USAGE where date_part(epoch_millisecond, convert_timezone('\''UTC'\'', USAGE_DATE)) >= 1689009636598 and date_part(epoch_millisecond, convert_timezone('\''UTC'\'', USAGE_DATE)) <= 1689009636598",
        "resultSetMetaData": {
            "format": "jsonv2"
        },
        "role": "",
        "warehouse": "",
        "timeout": "600",
        "database": "SNOWFLAKE"
        }'

    ```
    
    In this example:
        
    * `<account_identifier>` is the Snowflake account identifier with the account name, `<orgname>-<account_name>`. 
    * You must also provide the `role` assigned to the user and the `warehouse` on which the role has usage and monitoring privileges.

    Upon successful authorization, you will see something like this:

    ```
    {
        "code"  : "3333334",
        "message  :  "Asynchronous execution in progress. Use provided query id to perform query monitoring and management.", 
        "statementHandle"  :  "01adbfe7-0c04-c7ed-0003-5b5e0003602a",
        "statementStatusUrL"  :  "/apo/v2/statements/01adbfe7-0c04-c7ed-0003-5b5e0003602a"

    }
    
    ```
    
## Troubleshooting Other Integrations

* [Troubleshooting Kubernetes](kubernetes_troubleshooting.html).
* [Tanzu Observability and TAS Troubleshooting](tas_to_troubleshooting.html)
* [Troubleshooting Alert Notifications to BigPanda Webhook Targets](integrations_bigpanda_troubleshooting.html)