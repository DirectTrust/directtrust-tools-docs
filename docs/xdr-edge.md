---
title: XDR
---

# XDR

The XDR testing tools verify XDR edge implementations for Direct messaging, including document submission, metadata conformance, SOAP/MTOM transport compliance, notification messaging, and bidirectional conversion between XDR and SMTP+XDM. The tools include the following tests:

-   **HISP to Edge** — Tests the HISP’s ability to deliver XDR documents to an edge system. The tool receives the XDR messages from the HISP and validates them against XDR compliance standards.
-   **Edge to HISP** — Tests the HISP’s ability to receive XDR messages from the edge. The tests break down into two sub-tests:
    1.  **XDR To XDM Conversion** — Tests XDR to XDM conversion and the ability to attach XDM to an SMTP message.
    2.  **Delivery Notification** — Tests a sending HISP’s responsibility defined in the Implementation Guide for Delivery Notification when using XDR as the edge protocol.
