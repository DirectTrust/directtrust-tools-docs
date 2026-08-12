---
title: IMAP Server Configuration
---

# IMAP Server Configuration

The IMAP Server Configuration manages profiles for connecting to a HISP’s IMAP server.

![IMAP Server Configuration](/images/server-configuration-imap/1.png)

*IMAP Server Configuration*

**Configuration Fields**

| Field | Description |
| --- | --- |
| Hostname / IP Address | The FQDN or IP address of the IMAP server (e.g., imap.direct.example.org). |
| Port | The TCP port the server listens on (e.g., 143). |
| Receiver Direct Address | The Direct address from which the test messages will be retrieved. |
| Receiver Username | The IMAP account username used for authentication. |
| Receiver Password | The IMAP account password. |
| Wire Level Encryption | None, STARTTLS (opportunistic TLS upgrade), or TLS (explicit TLS). |
| Configuration Profile Name | A user-defined label for this profile (e.g., "Production IMAP"). |
