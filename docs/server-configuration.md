---
title: Server Configuration
---

# Server Configuration

Server Configuration, only available to users with access to HISP tools, manages the connection profiles used by the Edge Protocol tests (SMTP, POP3, IMAP, and XDR). Before running any edge protocol test, at least one profile for that protocol must be configured here.

Multiple named profiles can be saved for each protocol, which is useful if the same user tests against several different server environments (e.g., a development server and a production server). Each edge protocol test run will prompt the user to select which profile to use.

To manage profiles:

- **Create** — Select New Profile from the Configuration Profile dropdown, fill in all fields, and click Save Configuration.
- **Edit** — Select an existing profile from the dropdown. The form populates with its saved values. Make changes and click Save Configuration.
- **Remove** — Select a profile from the dropdown and click Remove Profile.

Each protocol has its own set of configuration fields:

- [SMTP Server Configuration](/server-configuration-smtp)
- [POP3 Server Configuration](/server-configuration-pop3)
- [IMAP Server Configuration](/server-configuration-imap)
- [XDR Server Configuration](/server-configuration-xdr)
