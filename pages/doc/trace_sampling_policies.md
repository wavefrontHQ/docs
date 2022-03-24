---
title: Manage Sampling Policies
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_sampling_policies.html
summary: Learn control trace data sampling with sampling policies.
---

Tanzu Observability by Wavefront uses [intelligent sampling](trace_data_sampling.html) to reduce the volume of ingested traces. The goal of intelligent sampling is to retain traces that are likely to be informative. But sometimes intelligent sampling discards traces that you want to keep. You can create a sampling policy to fine-tune intelligent sampling and indicate that you want to keep certain spans.
Creating a sampling policy affects your costs as you store more data.

You can create a sampling policy, edit, delete, restore, deactivate, and see the version history of the policy you created:

![This diagrams shows the user flow from creating a policy, to edititng, deleting, restoring, deactivation, and seeing teh version history of a policy.](images/tracing_sampling_policies_flow_diagram.png)


Let's look at how you can create a sampling policy and get familiar with the policy expressions.

## Create a Sampling Policy

{% include note.html content="Only a [Super Admin user](authorization.html#who-is-the-super-admin-user) or users with [Applications permissions](permissions_overview.html) can create sampling policies." %}

To create a sampling policy:

1. In your web browser, go to your Wavefront instance and log in.
1. From the taskbar, click **Applications** > **Sampling Policies**.
1. Click **Create Policy** and enter the details:
    <table style="width: 100%;">
      <thead>
        <tr>
          <th width="20%">
            UI Element
          </th>
          <th width="80%">
            Description
          </th>
        </tr>
      </thead>
      <tr>
        <td markdown="span">
          **Policy Name**
        </td>
        <td>
          The name of the policy. The policy name is unique, and you cannot create another policy with the same name.
        </td>
      </tr>
      <tr>
        <td markdown="span">
          **Description**
        </td>
        <td>
          Add a description to explain what the policy does. It helps administrators understand why the policy is in place.
        </td>
      </tr>
      <tr>
        <td markdown="span">
          **Policy Expression**
        </td>
        <td markdown="span">
          Define a policy expression indicate which spans you want to keep. This expression needs to be in the YAML format. See [Add a Policy Expression](#add-a-policy-expression) for details.
        </td>
      </tr>
      <tr>
        <td markdown="span">
          **Sampling percentage**
        </td>
        <td>
          Define the percentage of spans you want to retain by entering a value between 0 and 100.
          For example, 80 indicates that you want to keep 80% of the spans that meet the policy expression.
        </td>
      </tr>
      <tr>
        <td markdown="span">
          **Status**
        </td>
        <td markdown="span">
          The policy is in effect when it is in the active state. Once the policy is active, it affects your costs as you store more data.

          <br/>To see the number of spans stored per second after a sampling policy is created, see <a href="trace_data_sampling.html#track-the-volume-of-stored-data">Track the Volume of Stored Trace Data</a>.
        </td>
      </tr>
    </table>

  1. Click **Create Policy**.
![the screenshot shows the create policy form with all the UI elements that were described in the table above.](images/tracing-sampling-policies-create-ploicy-form.png)

Now, you see the policy you created listed under sampling policies.

## Add a Policy Expression

When you [create a sampling policy](trace_sampling_policies.html), you need to define a policy expression that specifies the spans you want to keep. This expression needs to be in the YAML format.

Let's look at a policy expression that asks the Wavefront service to store traces if the application name is beachshirts.
![](images/trace_sampling_expression.png)

<table style="width: 100%;">
  <thead>
  <tr>
    <th>
      Attribute
    </th>
    <th>
      Description
    </th>
  </tr>
  </thead>
  <tr>
    <td width="20%">
      <b>Key</b>
    </td>
    <td width="80%">
      You can pass the following values and any <a href="trace_data_details.html#span-tags">span tag key</a> as a key:
      <ul>
        <li>
          If a span tag key or a default key is used to pass string values, the key needs to be defined between <code>&#123;&#123;&#125;&#125;</code>.

          <br/>Example:
          <ul>
            <li>
              <code>&#123;&#123;spanName&#125;&#125;</code>
            </li>
            <li>
              <code>&#123;&#123;sourceName&#125;&#125;</code>
            </li>
          </ul>
        </li>
        <li>
          If a span tag key or a default key is used to pass an integer value, the key needs to start with a <code>&#36;</code>.
          <br/>Example:
          <ul>
            <li>
              <code>&#36;startMillis</code>
            </li>
            <li>
              <code>&#36;duration</code> in milliseconds.
            </li>
          </ul>
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="20%">
      <b>Value</b>
    </td>
    <td width="80%">
      Define the values as follows:
      <ul>
        <li>
          For string values, surround the value with double quotes (<code>""</code>). <br/>Example: Retain spans that have the application name set to <code>beachshirts</code>.
          <pre>&#123;&#123;application&#125;&#125; = "beachshirts"</pre>
        </li>
        <li>
          For integer values, you don't need to use double quotes. <br/>Example: Retain spans that take more than 1000 milliseconds to complete. <pre>$duration>1000</pre>
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="20%">
      <b>Operation</b>
    </td>
    <td width="80%">
      Policy expressions can contain operations that are cases sensitive, and operations that are not case sensitive:

      <br/><br/><b>Operations that are case sensitive:</b> These operations match only if the case is the same. For example, <code>&#123;&#123;application&#125;&#125; = "beachshirts"</code> is equal to <code>beachshirts</code> but not <code>beachShirts</code>.
        <ul>
          <li>
            <code>=</code>, <code>></code>, <code><</code>, <code><=</code>, <code>>=</code>, <code>!=</code>
          </li>
          <li>
            <code>equals</code>, <code>startsWith</code>, <code>contains</code>, <code>endsWith</code>, <code>matches</code>
            <br/>
            {{site.data.alerts.note}}
            For example:
            <ul><li>
              <code>&#123;&#123;application&#125;&#125; equals "beachshirts"</code> is only satisfied if the value is exactly equal to <code>beachshirts</code>.
            </li>
            <li>
              <code>&#123;&#123;application&#125;&#125; matches "beachshirts123"</code> is satisfied if the value matches <code>beachshirts123</code>. When using <code>matches</code>, the comparison string can be a regular expression.
            </li></ul>
            {{site.data.alerts.end}}
          </li>
          <li>
            <code>and</code>, <code>or</code>
          </li>
          <li>
            <code>not</code>
          </li>
          <li>
            <code>in</code>
            {{site.data.alerts.note}}
            For example, <code>&#123;&#123;http.status_code&#125;&#125; in ("400", "404")</code>  is satisfied if the value is <code>400</code> or <code>404</code>.
            {{site.data.alerts.end}}

          </li>
        </ul>

      <b>Operations that are not case sensitive:</b> These operations match even if the case is not the same.
        <ul>
          <li>
            <code>equalsIgnoreCase</code>
          </li>
          <li>
            <code>startsWithIgnoreCase</code>
          </li>
          <li>
            <code>endsWithIgnoreCase</code>
          </li>
          <li>
            <code>containsIgnoreCase</code>
          </li>
          <li>
            <code>matchesIgnoreCase</code>
          </li>
        </ul>
        {{site.data.alerts.note}}

        For example:
        <ul>
          <li><code>&#123;&#123;application&#125;&#125; equalsIgnoreCase "beachshirts"</code> is equal to <code>beachshirts</code> and <code>beachShirts</code>.
          </li>

          <li><code>&#123;&#123;application&#125;&#125; matchesIgnoreCase "beachshirts123" </code> matches <code>beachshirts123</code> and <code>beachShirts123</code>.
          </li>
        </ul>
        {{site.data.alerts.end}}

    </td>
  </tr>
</table>

<p><span style="font-size: large; font-weight: 500">Advanced Example</span></p>

The following policy expression creates a sampling policy to keep all spans from the `beachshirts` application where the operation starts with `Shopping`, the source contains `prod`, and the status code is `400` or `404`.
<pre>
&#123;&#123;application&#125;&#125; = "beachshirts" and
&#123;&#123;spanName&#125;&#125; startsWith "Shopping." and
&#123;&#123;sourceName&#125;&#125; contains "prod" and
&#123;&#123;http.status_code&#125;&#125; in ("400", "404")
</pre>

## Edit a Sampling Policy

To edit a sampling policy:

1. Click the vertical ellipsis next to the policy name and click **Edit**.
    ![the screenshot described above, with the edit option highlighted with a red box.](images/tracing_edit_sampling_policy.png)

1. Update the details, and click **Update Policy**.

## Delete a Sampling Policy

To delete a sampling policy, click the vertical ellipsis next to the policy name and click **Delete**.

To see the policies you deleted, click **View Deleted Policies**.

## Restore a Sampling Policy

To restore a deleted policy:

1. Click **View Deleted Policies**.
1. Click the vertical ellipsis next to the policy name and click **Restore**.

## Deactivate or Activate Sampling Policy

### Deactivate a Sampling Policy

To deactivate a sampling policy, Click the vertical ellipsis next to the policy name and click **Deactivate**.

When the policy is deactivated, it changes to an inactive state. By default, you don't see inactive policies. Enable the **Show Inactive** toggle to see the deactivate policies in the sampling policies list.

Example:
![Shows the how inactive sampling policies toggle is enabled and as a result how you see the inactive sampling policy in the list of policies.](images/tracing_incative_sampling_policies.png)

### Activate a Sampling Policy

To activate a sampling policy:

1.  Enable the **Show Inactive** toggle to see the deactivate policies.
1.  Click the vertical ellipsis next to the inactive policy name, and click **Activate**.

## Learn More

To learn more about our trace data sampling strategies, see [Trace Sampling](trace_data_sampling.html).
