import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/cofre_do_dragao/' : '/',
  server: {
    host: true, // Permite acesso pela rede local
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Cofre do Dragão',
        short_name: 'CofreDragao',
        description: 'Gerenciador D&D 5E',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: 'avatars/tank.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'avatars/tank.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
}))
