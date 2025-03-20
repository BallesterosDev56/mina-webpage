import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Permite acceder desde otras redes
    port: 5174, // Asegura que el puerto sea correcto
    strictPort: true, // Evita que Vite cambie el puerto automáticamente
    hmr: {
      protocol: 'ws', // Asegura que use WebSocket
      host: 'localhost',
      port: 5173, // Asegura que HMR use el mismo puerto
    },
  },
  plugins: [react()],
})
