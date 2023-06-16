import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './buildConfig/environments',
  VITE_CLIENT_KEY: process.env.VITE_CLIENT_KEY,
  VITE_USER_ID: process.env.VITE_USER_ID,
})