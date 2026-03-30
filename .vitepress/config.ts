import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Parity',
  description: 'Structural test parity for PHP projects',
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'GitHub', link: 'https://github.com/ulties/parity' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Rules', link: '/guide/rules' },
            { text: 'Coverage', link: '/guide/coverage' },
          ],
        },
        {
          text: 'Integrations',
          items: [
            { text: 'Pest Support', link: '/guide/pest-support' },
            { text: 'PHPUnit Support', link: '/guide/phpunit-support' },
            { text: 'CI Integration', link: '/guide/ci-integration' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Plugins', link: '/guide/plugins' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ulties/parity' },
    ],
  },
})
