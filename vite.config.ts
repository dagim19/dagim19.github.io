import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    // Add this: replacing 'your-repo-name' with your actual github repository name!
    base: '/',
    plugins: [react(), tailwindcss()]
})