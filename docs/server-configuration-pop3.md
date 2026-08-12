---
title: POP3 Server Configuration
---

# POP3 Server Configuration

The POP3 Server Configuration manages profiles for connecting to a HISP’s POP3 server.

![POP3 Server Configuration](/images/server-configuration-pop3/1.png)

*POP3 Server Configuration*

**Configuration Fields**

| Field | Description |
| --- | --- |
| Hostname / IP Address | The FQDN or IP address of the POP3 server (e.g., pop3.direct.example.org). |
| Port | The TCP port the server listens on (e.g., 110). |
| Receiver Direct Address | The Direct address from which the test messages will be retrieved. |
| Receiver Username | The POP3 account username used for authentication. |
| Receiver Password | The POP3 account password. |
| Wire Level Encryption | None, STARTTLS (opportunistic TLS upgrade), or TLS (explicit TLS). |
| Configuration Profile Name | A user-defined label for this profile (e.g., "Production POP3"). |
