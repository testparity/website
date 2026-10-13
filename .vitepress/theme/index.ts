import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import HeaderInstall from './HeaderInstall.vue'
import HomeLanding from './HomeLanding.vue'
import SiteFooter from './SiteFooter.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeLanding', HomeLanding)
  },
  Layout: () => h(DefaultTheme.Layout, null, {
    'nav-bar-content-after': () => h(HeaderInstall),
    'nav-screen-content-after': () => h(HeaderInstall, { mobile: true }),
    'layout-bottom': () => h(SiteFooter),
  }),
}
