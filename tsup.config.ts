import { defineConfig } from 'tsup'

import nodeLibPlugin from 'node-stdlib-browser/helpers/esbuild/plugin'
import stdLibBrowser from 'node-stdlib-browser'

export default defineConfig({
  entry: ['src/uni-media.ts'],
  outDir: 'dist',
  dts: true,
  bundle: true,
  clean: true,
  format: ['iife', 'cjs', 'esm'],
  platform: 'browser',
  define: {
    global: 'window',
    Buffer: 'Buffer',
  },
  inject: ['./node_modules/node-stdlib-browser/helpers/esbuild/shim.js'],
  esbuildPlugins: [nodeLibPlugin(stdLibBrowser)],
})
