import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: [
      {
        find: 'consts',
        replacement: '/src/consts',
      },
      {
        find: 'components',
        replacement: '/src/components',
      },
      {
        find: 'libs',
        replacement: '/src/libs',
      },
      {
        find: 'hooks',
        replacement: '/src/hooks',
      },
      {
        find: 'types',
        replacement: '/src/types',
      },
      {
        find: 'stores',
        replacement: '/src/stores',
      },
    ],
  },
})
