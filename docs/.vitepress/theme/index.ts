import { h } from 'vue'
import Theme from 'vitepress/theme'
import HomePage from '../components/HomePage.vue'

export default {
  ...Theme,
  async enhanceApp({ app }) {
    if (typeof window === 'undefined') {
      return
    }

    const UniMedia = (await import('./../../../')).UniMedia
    app.component('uni-media', UniMedia)
  },
  Layout() {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(HomePage),
    })
  },
}
