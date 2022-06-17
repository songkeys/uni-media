import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'uni-media',
  description:
    'Easily embed any types of media (images, videos, audios, pdfs, 3d-models...) in your web app',
  themeConfig: {
    siteTitle: '<uni-media />',

    logo: '/hero.png',

    nav: [
      { text: 'Guide', link: '/guide/introduction', activeMatch: '/guide' },
      {
        text: 'Releases',
        link: 'https://github.com/Songkeys/uni-media/releases',
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Songkeys/uni-media' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Media List', link: '/guide/media-list' },
            { text: 'Mechanism', link: '/guide/mechanism' },
          ],
        },
      ],
    },

    editLink: {
      pattern: 'https://github.com/Songkeys/uni-media/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Songkeys',
    },
  },
})
