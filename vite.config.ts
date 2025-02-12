import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import postcssPxtorem from 'postcss-pxtorem'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [IconsResolver()],
      dts: 'src/components.d.ts',
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssPxtorem({
          rootValue: 75,
          propList: ['*'],
          selectorBlackList: ['html', 'body'],
          exclude: /node_modules/i
        })
      ]
    }
  }
})
