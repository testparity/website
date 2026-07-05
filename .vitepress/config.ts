import { defineConfig } from 'vitepress'
import { resolve } from 'path'

const websiteRoot = resolve(__dirname, '..')
const privateDocRoute = /^\/(?:CLAUDE|README)(?:\.html)?(?:$|[?#])/

export default defineConfig({
  title: 'Parity',
  description: 'Structural test parity for PHP projects',
  cleanUrls: true,
  ignoreDeadLinks: true,
  srcExclude: ['README.md', 'CLAUDE.md', '.claude/**'],

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  vite: {
    plugins: [
      {
        name: 'parity-private-doc-guard',
        enforce: 'pre',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (privateDocRoute.test(req.url ?? '')) {
              res.statusCode = 404
              res.end('Not found')
              return
            }

            next()
          })
        },
      },
    ],
    resolve: {
      preserveSymlinks: true,
    },
    server: {
      allowedHosts: ['u.diderichsen.com'],
      fs: {
        allow: [websiteRoot],
      },
    },
  },

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Specs', link: '/specs/' },
      { text: 'Samples', link: 'https://github.com/testparity/samples' },
      { text: 'GitHub', link: 'https://github.com/testparity/cli' },
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
            { text: 'Implementation Reference', link: '/guide/reference' },
            { text: 'Plugins', link: '/guide/plugins' },
            { text: 'Specs Overview', link: '/guide/specs' },
          ],
        },
      ],
      '/specs/': [
        {
          text: 'Specs',
          items: [
            { text: 'Index', link: '/specs/' },
            { text: 'Traceability', link: '/specs/TRACEABILITY' },
          ],
        },
        {
          text: 'S001 CLI Commands',
          items: [
            { text: 'Overview', link: '/specs/001-cli-commands/' },
            { text: 'Functional Requirements', link: '/specs/001-cli-commands/functional-requirements' },
            { text: 'Interface Requirements', link: '/specs/001-cli-commands/interface-requirements' },
            { text: 'Acceptance Scenarios', link: '/specs/001-cli-commands/acceptance-scenarios' },
            { text: 'Edge Cases', link: '/specs/001-cli-commands/edge-cases' },
            { text: 'Success Criteria', link: '/specs/001-cli-commands/success-criteria' },
          ],
        },
        {
          text: 'S002 Rules System',
          items: [
            { text: 'Overview', link: '/specs/002-rules-system/' },
            { text: 'Functional Requirements', link: '/specs/002-rules-system/functional-requirements' },
            { text: 'Interface Requirements', link: '/specs/002-rules-system/interface-requirements' },
            { text: 'Acceptance Scenarios', link: '/specs/002-rules-system/acceptance-scenarios' },
            { text: 'Edge Cases', link: '/specs/002-rules-system/edge-cases' },
            { text: 'Success Criteria', link: '/specs/002-rules-system/success-criteria' },
          ],
        },
        {
          text: 'S003 Coverage Readers',
          items: [
            { text: 'Overview', link: '/specs/003-coverage-readers/' },
            { text: 'Functional Requirements', link: '/specs/003-coverage-readers/functional-requirements' },
            { text: 'Interface Requirements', link: '/specs/003-coverage-readers/interface-requirements' },
            { text: 'Acceptance Scenarios', link: '/specs/003-coverage-readers/acceptance-scenarios' },
            { text: 'Edge Cases', link: '/specs/003-coverage-readers/edge-cases' },
            { text: 'Success Criteria', link: '/specs/003-coverage-readers/success-criteria' },
          ],
        },
        {
          text: 'S004 Coverage Linkers',
          items: [
            { text: 'Overview', link: '/specs/004-coverage-linkers/' },
            { text: 'Functional Requirements', link: '/specs/004-coverage-linkers/functional-requirements' },
            { text: 'Interface Requirements', link: '/specs/004-coverage-linkers/interface-requirements' },
            { text: 'Acceptance Scenarios', link: '/specs/004-coverage-linkers/acceptance-scenarios' },
            { text: 'Edge Cases', link: '/specs/004-coverage-linkers/edge-cases' },
            { text: 'Success Criteria', link: '/specs/004-coverage-linkers/success-criteria' },
          ],
        },
        {
          text: 'S005 Plugin System',
          items: [
            { text: 'Overview', link: '/specs/005-plugin-system/' },
            { text: 'Functional Requirements', link: '/specs/005-plugin-system/functional-requirements' },
            { text: 'Interface Requirements', link: '/specs/005-plugin-system/interface-requirements' },
            { text: 'Acceptance Scenarios', link: '/specs/005-plugin-system/acceptance-scenarios' },
            { text: 'Edge Cases', link: '/specs/005-plugin-system/edge-cases' },
            { text: 'Success Criteria', link: '/specs/005-plugin-system/success-criteria' },
          ],
        },
        {
          text: 'S006 Configuration',
          items: [
            { text: 'Overview', link: '/specs/006-configuration/' },
            { text: 'Functional Requirements', link: '/specs/006-configuration/functional-requirements' },
            { text: 'Interface Requirements', link: '/specs/006-configuration/interface-requirements' },
            { text: 'Acceptance Scenarios', link: '/specs/006-configuration/acceptance-scenarios' },
            { text: 'Edge Cases', link: '/specs/006-configuration/edge-cases' },
            { text: 'Success Criteria', link: '/specs/006-configuration/success-criteria' },
          ],
        },
        {
          text: 'S007 Path Mapping',
          items: [
            { text: 'Overview', link: '/specs/007-path-namespace-mapping/' },
            { text: 'Functional Requirements', link: '/specs/007-path-namespace-mapping/functional-requirements' },
            { text: 'Interface Requirements', link: '/specs/007-path-namespace-mapping/interface-requirements' },
            { text: 'Acceptance Scenarios', link: '/specs/007-path-namespace-mapping/acceptance-scenarios' },
            { text: 'Edge Cases', link: '/specs/007-path-namespace-mapping/edge-cases' },
            { text: 'Success Criteria', link: '/specs/007-path-namespace-mapping/success-criteria' },
          ],
        },
        {
          text: 'S008 Output Formats',
          items: [
            { text: 'Overview', link: '/specs/008-output-formats/' },
            { text: 'Functional Requirements', link: '/specs/008-output-formats/functional-requirements' },
            { text: 'Interface Requirements', link: '/specs/008-output-formats/interface-requirements' },
            { text: 'Acceptance Scenarios', link: '/specs/008-output-formats/acceptance-scenarios' },
            { text: 'Edge Cases', link: '/specs/008-output-formats/edge-cases' },
            { text: 'Success Criteria', link: '/specs/008-output-formats/success-criteria' },
          ],
        },
        {
          text: 'S009 Documentation',
          items: [
            { text: 'Overview', link: '/specs/009-documentation/' },
            { text: 'Functional Requirements', link: '/specs/009-documentation/functional-requirements' },
            { text: 'Acceptance Scenarios', link: '/specs/009-documentation/acceptance-scenarios' },
            { text: 'Edge Cases', link: '/specs/009-documentation/edge-cases' },
            { text: 'Success Criteria', link: '/specs/009-documentation/success-criteria' },
          ],
        },
        {
          text: 'S010 Testing and Binary',
          items: [
            { text: 'Overview', link: '/specs/010-testing-ci-binary/' },
            { text: 'Functional Requirements', link: '/specs/010-testing-ci-binary/functional-requirements' },
            { text: 'Non-Functional Requirements', link: '/specs/010-testing-ci-binary/non-functional-requirements' },
            { text: 'Acceptance Scenarios', link: '/specs/010-testing-ci-binary/acceptance-scenarios' },
            { text: 'Edge Cases', link: '/specs/010-testing-ci-binary/edge-cases' },
            { text: 'Success Criteria', link: '/specs/010-testing-ci-binary/success-criteria' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/testparity/cli' },
    ],
  },
})
