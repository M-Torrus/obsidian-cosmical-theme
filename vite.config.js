import { defineConfig } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'

export default defineConfig(({ mode }) => {
  const isSnippetsBuild = mode === 'snippets'

  // Build snippets: cada feature por separado
  if (isSnippetsBuild) {
    const featureFiles = glob.sync('src/features/**/*.css')
    const entries = {}

    featureFiles.forEach(file => {
      const name = file
        .replace('src/features/', '')
        .replace('.css', '')
        .replace(/\//g, '-')
      entries[name] = file
    })

    return {
      build: {
        outDir: 'dist/snippets',
        rollupOptions: {
          input: entries,
          output: {
            assetFileNames: '[name].css'
          }
        },
        cssMinify: false,
        emptyOutDir: true
      }
    }
  }

  // Build normal y development: genera theme.css en la raíz
  // Esto permite que Obsidian lo detecte automáticamente
  return {
    build: {
      outDir: 'dist',  // Directorio temporal
      watch: mode === 'development' ? {} : null,
      rollupOptions: {
        input: resolve(process.cwd(), 'src/theme.css'),
        output: {
          dir: '.',  // Output real en la raíz
          assetFileNames: 'theme.css'
        }
      },
      // No usar cssMinify de Vite, dejar que PostCSS + cssnano lo maneje
      cssMinify: false,
      emptyOutDir: false  // No borrar!
    }
  }
})
