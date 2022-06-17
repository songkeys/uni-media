<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import './../style/global.css'
import { getHighlighter, setCDN } from 'shiki'

let currentExampleTabIndex = ref(0)

let examples = ref([
  {
    tab: 'Image (HTML)',
    code: `<uni-media
    alt="A cat"
    title="I'm a cat"
    src="https://placekitten.com/200/300"
  >
    <div slot="loading">Loading</div>
  </uni-media>`,
    codeToHightlight: `<uni-media
    alt="A cat"
    title="I'm a cat"
    src="https://placekitten.com/200/300"
  />`,
    lang: 'html',
    codeHighlighted: '',
    lineOptions: [{ line: 4, classes: ['bg-gray-700'] }],
  },
  {
    tab: 'Video (React.js + IPFS)',
    code: `<uni-media
      src="ipfs://bafybeigg55zmqvfouox64ljpiqrt4lscacgcf77chmz4evgqlmicfk2rni/BigBuckBunny.mp4"
      width="500"
      height="350"
    />`,
    codeToHightlight: `function MyComponent() {
    return (
      <div>
        <uni-media
          src="ipfs://bafybeigg55zmqvfouox64ljpiqrt4lscacgcf77chmz4evgqlmicfk2rni/BigBuckBunny.mp4"
          width="500"
          height="350"
        />
      </div>
    );
  }`,
    lang: 'jsx',
    codeHighlighted: '',
    lineOptions: [{ line: 5, classes: ['bg-gray-700'] }],
  },
  {
    tab: '3D Model (Vue.js)',
    code: `<uni-media
    src="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"
    camera-controls
    enable-pan
    poster="https://modelviewer.dev/shared-assets/models/NeilArmstrong.webp"
    seamless-poster
    style="height: 300px; width: 300px"
  />`,
    codeToHightlight: `<template>
    <uni-media
      src="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"
      camera-controls
      enable-pan
      poster="https://modelviewer.dev/shared-assets/models/NeilArmstrong.webp"
      seamless-poster
      style="height: 300px; width: 300px"
    />
  </template>`,
    lang: 'vue',
    codeHighlighted: '',
    lineOptions: [{ line: 3, classes: ['bg-gray-700'] }],
  },
  {
    tab: 'HTML (IPFS)',
    code: `<uni-media
    src="ipfs://bafybeichjzix3m6m3wa24m5ukxnkzouiyp67kqle7gscfeisrgdgarqfva/a.html"
  />`,
    codeToHightlight: `<uni-media
    src="ipfs://bafybeichjzix3m6m3wa24m5ukxnkzouiyp67kqle7gscfeisrgdgarqfva/a.html"
  />`,
    lang: 'html',
    codeHighlighted: '',
    lineOptions: [{ line: 2, classes: ['bg-gray-700'] }],
  },
])

let currentRenderingCode = computed(
  () => examples.value[currentExampleTabIndex.value].codeHighlighted,
)

onMounted(async () => {
  setCDN('./../../node_modules/shiki/')
  const highlighter = await getHighlighter({ theme: 'dark-plus' })

  examples.value = examples.value.map((example) => ({
    ...example,
    codeHighlighted: highlighter.codeToHtml(example.codeToHightlight, {
      lang: example.lang,
      lineOptions: example.lineOptions,
    }),
  }))
})
</script>

<template>
  <div class="divider"></div>

  <div class="content mx-auto">
    <main class="main">
      <h2 class="text-center font-medium leading-tight text-5xl my-5">
        Take a Glance
      </h2>
      <div class="vp-doc flex flex-col items-center mt-10">
        <div class="tabs tabs-boxed">
          <a
            v-for="(example, index) in examples"
            :key="index"
            class="tab tab-lg"
            :class="currentExampleTabIndex === index ? 'tab-active' : ''"
            @click="currentExampleTabIndex = index"
          >
            {{ example.tab }}
          </a>
        </div>

        <div
          class="mockup-code my-5 max-w-3xl"
          v-html="examples[currentExampleTabIndex].codeHighlighted"
        ></div>

        <div v-html="examples[currentExampleTabIndex].code"></div>

        <a href="/guide/getting-started">
          <button class="btn btn-lg btn-primary my-10">
            Try {{"<uni-media />"}}
          </button>
        </a>
      </div>
    </main>
  </div>
</template>
