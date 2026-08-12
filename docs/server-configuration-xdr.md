---
title: XDR Server Configuration
---

# XDR Server Configuration

The XDR Server Configuration manages profiles for connecting to a HISP’s XDR server.

![XDR Server Configuration](/images/server-configuration-xdr/1.png)

*XDR Server Configuration*

**Configuration Fields**

| Field | Description |
| --- | --- |
| HISP XDR Endpoint | The full URL to the XDR server’s document repository endpoint. |
| Sender Direct Address | The Direct address from which the test messages will be sent. |
| Configuration Profile Name | A user-defined label for this profile (e.g., "Production XDR"). |

::: tip
**Note:** If the URL uses https and your XDR server uses mutual TLS authentication, you will need to include the testing tool’s XDR client certificate into your XDR server’s store of trusted certificates. You can obtain the testing tool’s XDR client certificate from the prerequisites section of the testing tool’s home page.
:::
