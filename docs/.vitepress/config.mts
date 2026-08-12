import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DirectTrust Tools',
  description: 'Documentation for the DirectTrust Accreditation Testing Toolset',
  base: '/directtrust-tools-docs/',
  cleanUrls: true,

  themeConfig: {
    logo: '/directtrust-logo.png',
    siteTitle: false,

    nav: [
      { text: 'Overview', link: '/overview' },
      { text: 'Getting Started', link: '/getting-started' }
    ],

    sidebar: [
      { text: 'Overview', link: '/overview' },
      { text: 'Getting Started', link: '/getting-started' },
      {
        text: 'HISP Tools',
        link: '/hisp-tools',
        collapsed: true,
        items: [
          { text: 'Certificate Hosting', link: '/certificate-hosting' },
          { text: 'Certificate Discovery', link: '/certificate-discovery' },
          { text: 'Direct Receive Messages', link: '/direct-receive-message' },
          { text: 'Direct Send Messages', link: '/direct-send-message' },
          {
            text: 'Edge Protocols',
            link: '/edge-protocols',
            collapsed: true,
            items: [
              {
                text: 'XDR',
                link: '/xdr-edge',
                collapsed: true,
                items: [
                  { text: 'HISP To Edge', link: '/xdr-hisp-to-edge' },
                  {
                    text: 'Edge to HISP',
                    link: '/xdr-edge-to-hisp',
                    collapsed: true,
                    items: [
                      { text: 'XDR To XDM Conversion', link: '/xdr-to-xdm-conversion' },
                      { text: 'Delivery Notification', link: '/xdr-edge-delivery-notification' }
                    ]
                  }
                ]
              },
              {
                text: 'SMTP',
                link: '/smtp-edge',
                collapsed: true,
                items: [
                  { text: 'SMTP Transport', link: '/smtp-edge-transport' },
                  { text: 'Delivery Notification', link: '/smtp-edge-delivery-notification' }
                ]
              },
              { text: 'POP3', link: '/pop3-edge' },
              { text: 'IMAP', link: '/imap-edge' }
            ]
          }
        ]
      },
      {
        text: 'Directory Tools',
        link: '/directory-tools',
        collapsed: true,
        items: [
          { text: 'Directory Search', link: '/directory-search' },
          { text: 'Compliance Checking', link: '/compliance-checking' }
        ]
      },
      {
        text: 'Management',
        link: '/management',
        collapsed: true,
        items: [
          { text: 'User Settings', link: '/user-settings' },
          {
            text: 'Server Configuration',
            link: '/server-configuration',
            collapsed: true,
            items: [
              { text: 'SMTP', link: '/server-configuration-smtp' },
              { text: 'POP3', link: '/server-configuration-pop3' },
              { text: 'IMAP', link: '/server-configuration-imap' },
              { text: 'XDR', link: '/server-configuration-xdr' }
            ]
          },
          { text: 'Results and Reports', link: '/results-and-reports' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    }
  }
})
