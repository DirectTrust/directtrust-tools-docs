---
title: SMTP Server Configuration
---

# SMTP Server Configuration

The SMTP Server Configuration manages profiles for connecting to a HISP’s SMTP server.

![SMTP Server Configuration](/images/server-configuration-smtp/1.png)

*SMTP Server Configuration*

**Configuration Fields**

| Field | Description |
| --- | --- |
| Hostname / IP Address | The FQDN or IP address of the SMTP server (e.g., smtp.direct.example.org). |
| Port | The TCP port the server listens on (e.g., 25, 587). |
| Sender Direct Address | The Direct address from which the test messages will be sent. |
| Sender Username | The SMTP account username used for authentication. |
| Sender Password | The SMTP account password. |
| Wire Level Encryption | None, STARTTLS (opportunistic TLS upgrade), or TLS (explicit TLS). |
| Configuration Profile Name | A user-defined label for this profile (e.g., "Production SMTP"). |
