1. Download [wavefront-telegraf-64-setup.exe](https://s3-us-west-2.amazonaws.com/wavefront-cdn/windows/wavefront-telegraf-64-setup.exe). Only 64-bit Windows is supported.
2. Double click the `wavefront-telegraf-64-setup.exe` file and follow the instructions in the setup dialog to install Telegraf.

   **Note:** Steps 3-5 are only required if the Wavefront proxy is installed on a different host.
3. Edit the `telegraf.conf` file located in `Program Files\Telegraf`.

   _**Warning**: Do not use **notepad** to modify the file. Use an editor that supports Unix style line endings, such as **Notepad++** or **EditPlus**._
4. Configure the outputs section to communicate with your Wavefront proxy:
   ```
   [[outputs.wavefront]]
      url = "WAVEFRONT_PROXY_HOSTNAME:2878"
   ```
    **Note:**  In the default `telegraf.conf`, the `host` property is set to `localhost`.
5. Restart the Telegraf service using the Windows Services Management Console or from the  command prompt:
   ```
   net stop telegraf
   net start telegraf
   ```
6. Check `Program Files\Telegraf\telegraf.log` to verify the installation.
