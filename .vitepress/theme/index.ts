import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import HeaderInstall from './HeaderInstall.vue'
import SiteFooter from './SiteFooter.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'nav-bar-title-after': () => h('span', { class: 'parity-brand-context' }, 'docs'),
    'nav-bar-content-after': () => h(HeaderInstall),
    'nav-screen-content-after': () => h(HeaderInstall, { mobile: true }),
    'layout-bottom': () => h(SiteFooter),
  }),
}
