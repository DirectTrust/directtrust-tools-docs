---
title: IMAP
---

# IMAP Edge

The IMAP testing tools verify an IMAP server implementation, including IMAPS/STLS connections, authentication, mailbox access, and secure retrieval of S/MIME-encrypted messages. This test suite exercises a HISP’s ability to receive messages from an edge over the IMAP transport protocol. The tests validate STARTTLS negotiation, server certificates, authentication, and inbound message retrieval. It also includes negative-path tests such as invalid credentials. In each of the tests, the testing tools will connect to your HISP over IMAP.

::: tip
**NOTE:** Before you can perform these tests, you must first create an IMAP configuration profile with information that tells the testing tools how to connect and authenticate to your HISP using IMAP. See the Server Configuration documentation for how to create an IMAP configuration profile.
:::

![IMAP Transport Test configuration profile selection and timeout settings.](/images/imap-edge/1.png)

*IMAP Transport Test configuration profile selection and timeout settings.*

## Workflow

-   Navigate to HISP Tools > Edge Protocols > IMAP.
-   Select an IMAP configuration profile for the IMAP server that you would like to test.
-   Select a timeout value (1 – 5 minutes). A longer timeout allows more time for your system to receive messages from the testing tool’s HISP.
-   Click Run Tests. The tool immediately begins connecting to your HISP using IMAP to attempt to retrieve messages from the configured IMAP email account. It monitors IMAP command responses and, when applicable, retrieves messages from your HISP that have been sent from the testing tool’s HISP. Monitoring continues until the timeout threshold is exceeded.
-   Results are displayed in real time as each test scenario completes, with status indicators for running, success, failed, and aborted.

![IMAP Edge Protocol test suite in progress, with each scenario shown as RUNNING.](/images/imap-edge/2.png)

*IMAP Edge Protocol test suite in progress, with each scenario shown as RUNNING.*

-   Once all scenarios finish, the overall suite status is shown (SUCCESS, FAILED, or ABORTED).
-   The tool will generate a report indicating a success or failure and will report any scenarios that failed. The results can be viewed in the Results and Reports section of the tool under Management > Results and Reports.

![Completed IMAP Edge Protocol test suite showing SUCCESS with per-scenario results.](/images/imap-edge/3.png)

*Completed IMAP Edge Protocol test suite showing SUCCESS with per-scenario results.*

Each of the tests maps to a specific IMAP Direct messaging scenario. The following table lists all tests and the scenario they cover:

## Test Scenarios

| Test Name | Scenario Description |
| --- | --- |
| ExceptionPathBadSyntax | The tool connects to the IMAP server and successfully authenticates. The tool then sends an invalid IMAP command that the IMAP server is expected to reject, responding with an appropriate error code. This will result in NO Direct message being retrieved. |
| ExceptionPathInvalidLogin | The tool connects to the IMAP server but sends an invalid password during authentication. The IMAP server is expected to reject the authentication request. This will result in NO Direct message being retrieved. |
| ExceptionPathInvalidState | The tool connects to the IMAP server and then sends a SELECT INBOX command before authentication is complete. The IMAP server is expected to reject the command and respond with an appropriate error code. This will result in NO Direct message being retrieved. |
| HappyPathMiscellaneousCommand | The tool connects to the IMAP server and successfully authenticates. The tool then sends a series of various IMAP commands such as SELECT, SEARCH, and FETCH, and the IMAP server is expected to accept the commands and respond with appropriate success codes. This may result in Direct messages being retrieved if there were previously any messages in the mailbox. |
| HappyPathNOOPCommand | The tool connects to the IMAP server and does NOT attempt to authenticate. The tool then sends IMAP CAPABILITY and NOOP commands, and the IMAP server is expected to accept the commands and respond with appropriate success codes. This will result in NO Direct message being retrieved. |
| HappyPathRetrieveDirectMessage | The tool first sends a Direct message from the testing tool’s HISP to the configured Direct address under test. The tool then connects to the IMAP server and successfully authenticates. The tool then sends IMAP commands to select an inbox and search/retrieve the message from the inbox, and the IMAP server is expected to accept the commands and respond with an appropriate success code. This will result in a Direct message being retrieved. |
