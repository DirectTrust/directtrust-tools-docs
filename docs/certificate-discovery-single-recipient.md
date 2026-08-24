---
title: Single Recipient Per Message
---

# Single Recipient Per Message

This Certificate Discovery testing option is executed by sending a **separate** Direct message to one test address at a time rather than a single message addressed to every test address at once. Each address represents a different discovery scenario, and each message you send produces its own test result covering only that address’s scenario.

This option is intended for HISPs whose edge system sends to one recipient at a time, or whose edge system abandons the entire message when certificate discovery fails for any one of its recipients.

::: tip
**Note:** This option uses its own set of Direct addresses — `d1single@…` through `d18single@…`. These are not the same addresses used by the [Single Message, Multiple Recipients](/certificate-discovery-multiple-recipients) option, and the two sets cannot be mixed.
:::

## Workflow

-   The user selects a test address from the Test Scenario dropdown. The scenario the address represents is described directly below the selected address, along with the certificate that the tool expects your HISP to discover and use when a certificate is expected to be found.

![The Single Recipient Per Message testing option before a test address is selected](/images/certificate-discovery-single-recipient/1.png)

*The Single Recipient Per Message testing option before a test address is selected*

![A selected test address, showing the discovery scenario and the expected certificate below it](/images/certificate-discovery-single-recipient/2.png)

*A selected test address, showing the discovery scenario and the expected certificate below it*

-   The user will send a test Direct message to that one address using their HISP’s edge system. The Direct address that the message is sent from must be registered in the User Settings.

**Important:** Each Direct message MUST be addressed to exactly one of the test addresses. If a message addresses more than one of the `…single@…` test addresses, the test will fail.

-   The user’s HISP performs certificate discovery for that address, either discovering and using a valid certificate, rejecting an invalid certificate, or finding no certificate at all.
-   If a valid certificate is discovered, the Direct message is encrypted with it and sent to the tool’s HISP. Once received, the tool inspects the message’s encryption envelope and verifies that the expected certificate — and only the expected certificate — was used. If the expected certificate is missing or an unexpected certificate was used, the test will fail.
-   The tool generates a result for that address indicating a success or failure, along with any unexpected certificates found in the message. The results can be viewed in the Results and Reports section of the tool under Management → Results and Reports.
-   Repeat for each of the remaining test addresses.

![A Single Recipient Per Message test result for one address](/images/certificate-discovery-single-recipient/4.png)

*A Single Recipient Per Message test result for one address*

## Negative Scenarios

Eight of the 18 scenarios are negative scenarios: no valid certificate should be discovered for the address, so **your HISP should never send the message at all**. These addresses are called out in the Message Sent by Your HISP? column of the table below, and their scenario descriptions state that the message should NOT be successfully sent.

![A negative scenario, where no certificate should be discovered and no message should be sent](/images/certificate-discovery-single-recipient/3.png)

*A negative scenario, where no certificate should be discovered and no message should be sent*

::: tip
**Important:** The testing tool cannot track a message that it never receives, so it cannot produce a result for a negative scenario that behaves correctly. **You are responsible for tracking these send failures yourself.** You will likely need to produce evidence — such as edge system logs, bounce messages, or delivery failure notifications — showing that your HISP failed to send the message for each negative certificate discovery test.
:::

If the tool *does* receive a message for one of these addresses, that is itself the failure: the tool records a failed result for that address stating that a message was received when none was expected.

## Discovery Scenarios

Each of the 18 Direct addresses maps to a specific discovery scenario. The following table lists all 18 addresses, whether your HISP is expected to successfully send a message to that address, and the scenario the address covers:

| Direct Address | Message Sent by Your HISP? | Scenario |
| --- | --- | --- |
| d1single@directcertdisc1.directtrust.org | Yes | Discovers a valid address bound certificate using DNS. The HISP MUST select a discovered address bound certificate over a domain bound certificate. This will result in the discovered address bound certificate being used to encrypt the message, and the message will be successfully sent. |
| d2single@directcertdisc1.directtrust.org | Yes | Discovers a valid domain bound certificate using DNS. This will result in the discovered domain bound certificate being used to encrypt the message, and the message will be successfully sent. |
| d3single@directcertdisc2.directtrust.org | Yes | Discovers a valid address bound certificate using LDAP. The HISP MUST select a discovered address bound certificate over a domain bound certificate. This will result in the discovered address bound certificate being used to encrypt the message, and the message will be successfully sent. |
| d4single@directcertdisc2.directtrust.org | Yes | Discovers a valid domain bound certificate using LDAP. This will result in the discovered domain bound certificate being used to encrypt the message, and the message will be successfully sent. |
| d5single@directcertdisc1.directtrust.org | **No** | Discovers an expired address bound certificate via DNS and rejects it due to being expired. The discovery process stops at this point and no other discovery attempts are made (it will not fall back to try to discover a domain bound certificate). This will result in the message NOT being encrypted with a certificate bound to this address, and the message should NOT be successfully sent. |
| d6single@directcertdisc4.directtrust.org | **No** | Discovers an expired domain bound certificate via DNS and rejects it due to being expired. The discovery process stops at this point and no other discovery attempts are made. This will result in the message NOT being encrypted with a certificate bound to this address, and the message should NOT be successfully sent. |
| d7single@directcertdisc2.directtrust.org | **No** | Discovers an expired address bound certificate via LDAP and rejects it due to being expired. The discovery process stops at this point and no other discovery attempts are made (it will not fall back to try to discover a domain bound certificate). This will result in the message NOT being encrypted with a certificate bound to this address, and the message should NOT be successfully sent. |
| d8single@directcertdisc5.directtrust.org | **No** | Discovers an expired domain bound certificate via LDAP and rejects it due to being expired. The discovery process stops at this point and no other discovery attempts are made. This will result in the message NOT being encrypted with a certificate bound to this address, and the message should NOT be successfully sent. |
| d9single@directcertdisc1.directtrust.org | Yes | Discovers two address bound certificates via DNS where one certificate is valid and the other certificate is expired. The HISP will use the valid certificate and reject the expired certificate. This will result in the discovered valid address bound certificate being used to encrypt the message, and the message will be successfully sent. |
| d10single@directcertdisc3.directtrust.org | Yes | Discovers a valid address bound certificate via LDAP when there are multiple LDAP servers found using SRV records. Some of the LDAP servers will not be reachable, and the HISP MUST continue iterating through the list of LDAP servers until it can successfully query an LDAP server. This will result in the discovered address bound certificate being used to encrypt the message, and the message will be successfully sent. |
| d11single@directcertdisc6.directtrust.org | **No** | Attempts to discover a certificate using both DNS and LDAP where there are no certificates available via DNS and no SRV records exist for LDAP. This will result in the message NOT being encrypted with a certificate bound to this address, and the message should NOT be successfully sent. |
| d12single@directcertdisc7.directtrust.org | **No** | Attempts to discover a certificate using both DNS and LDAP where there are no certificates available via DNS and the SRV records point to LDAP servers that are not reachable. This will result in the message NOT being encrypted with a certificate bound to this address, and the message should NOT be successfully sent. |
| d13single@directcertdisc8.directtrust.org | **No** | Attempts to discover a certificate using both DNS and LDAP where there are no certificates available via DNS and no certificates available in the LDAP servers. This will result in the message NOT being encrypted with a certificate bound to this address, and the message should NOT be successfully sent. |
| d14single@directcertdisc1.directtrust.org | Yes | Discovers a valid address bound certificate using DNS where the DNS record size is larger than what will fit into a UDP packet, resulting in a truncated UDP packet. The HISP MUST fall back to using TCP to query the DNS server. This will result in the discovered address bound certificate being used to encrypt the message, and the message will be successfully sent. |
| d15single@directcertdisc2.directtrust.org | Yes | Discovers a valid address bound certificate via LDAP when there are multiple LDAP servers found using SRV records. The HISP will query the LDAP servers in order of the SRV records’ priority value (lower value to highest). Each LDAP server contains a valid address bound certificate, and the HISP will select the valid address bound certificate found at the first LDAP server that it queries. This will result in the discovered address bound certificate being used to encrypt the message, and the message will be successfully sent. If the HISP queries the LDAP servers in the wrong order, then it will select the wrong certificate and the test will fail. |
| d16single@directcertdisc5.directtrust.org | Yes | Discovers a valid address bound certificate via LDAP when there are multiple LDAP servers found using SRV records. The HISP will query the LDAP servers in order of the SRV records’ weight value (highest value to lowest) when each SRV record has the same priority value. Each LDAP server contains a valid address bound certificate, and the HISP will select the valid address bound certificate found at the first LDAP server that it queries. This will result in the discovered address bound certificate being used to encrypt the message, and the message will be successfully sent. If the HISP queries the LDAP servers in the wrong order, then it will select the wrong certificate and the test will fail. |
| d17single@directcertdisc9.directtrust.org | Yes | Discovers a valid address bound certificate via DNS where the certificate does not directly chain to a trust anchor in the HISP trust store. The HISP MUST use the discovered certificate’s AIA extension to download an intermediate certificate in order to create a valid chain to a trust anchor. This will result in the discovered address bound certificate being used to encrypt the message, and the message will be successfully sent. |
| d18single@directcertdisc10.directtrust.org | **No** | Discovers a revoked address bound certificate via DNS and rejects it due to being revoked. The HISP MUST validate the certificate against the CRL listed in the discovered certificate’s CRL URL, where it will find that the certificate has been revoked. The discovery process stops at this point and no other discovery attempts are made. This will result in the message NOT being encrypted with a certificate bound to this address, and the message should NOT be successfully sent. |
