
import { fileURLToPath, URL } from 'node:url'
import eslint from '@rollup/plugin-eslint'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

const ResolveVueTablerIcons = componentName => {
  if (componentName.endsWith('Icon')) {
    return {
      name: componentName,
      from: 'vue-tabler-icons'
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  const isDev = process.env.NODE_ENV === 'development'
  console.log('Is linting enabled?', isDev)

  return {
    build: {
      outDir: './deploy/public'
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        include: [/\.js$/, /\.jsx$/],
        imports: ['vue', 'vue-router', 'pinia'],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json'
        }
      }),
      Components({
        extensions: ['js', 'jsx'],
        include: [/\.js$/, /\.jsx$/],
        resolvers: [
          ResolveVueTablerIcons
        ]
      }),
      isDev && eslint({
        fix: true,
        exclude: ['./src/**/*.css']
      })
    ],
    server: {
      port: 5000
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
