import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DirectTrust Tools',
  description: 'Documentation for the DirectTrust Accreditation Testing Toolset',
  base: '/directtrust-tools-docs/',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    logo: undefined,

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
        items: [
          { text: 'Certificate Hosting', link: '/certificate-hosting' },
          { text: 'Certificate Discovery', link: '/certificate-discovery' },
          { text: 'Direct Receive Messages', link: '/direct-receive-message' },
          { text: 'Direct Send Messages', link: '/direct-send-message' },
          {
            text: 'Edge Protocols',
            link: '/edge-protocols',
            items: [
              {
                text: 'XDR',
                link: '/xdr-edge',
                items: [
                  { text: 'HISP To Edge', link: '/xdr-hisp-to-edge' },
                  {
                    text: 'Edge to HISP',
                    link: '/xdr-edge-to-hisp',
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
        text: 'Management',
        link: '/management',
        items: [{ text: 'User Settings', link: '/user-settings' }]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/DirectTrust' }],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    }
  }
})
