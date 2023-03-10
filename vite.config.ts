import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'Module',
      fileName: (format) => `module.${format}.js`,
    }
  }
})
