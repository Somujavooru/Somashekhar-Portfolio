import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

function photosPlugin(): Plugin {
  const syncToPublic = () => {
    try {
      const publicPhotosDir = path.resolve(process.cwd(), 'public', 'photos')
      if (!fs.existsSync(publicPhotosDir)) {
        fs.mkdirSync(publicPhotosDir, { recursive: true })
      }
      for (const folder of ['Photos', 'photos']) {
        const dir = path.resolve(process.cwd(), folder)
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir)
          for (const file of files) {
            const src = path.join(dir, file)
            const dest = path.join(publicPhotosDir, file)
            try {
              if (fs.statSync(src).isFile() && path.resolve(src) !== path.resolve(dest)) {
                fs.copyFileSync(src, dest)
              }
            } catch {
              // Ignore temporary file locks
            }
          }
        }
      }
    } catch (e) {
      console.warn('[photos-plugin] Sync warning:', e)
    }
  }

  // Initial sync at startup
  syncToPublic()

  return {
    name: 'photos-sync-plugin',
    configureServer(server) {
      // Watch root Photos and photos directories for live additions
      server.watcher.add([
        path.resolve(process.cwd(), 'Photos'),
        path.resolve(process.cwd(), 'photos'),
      ])

      server.watcher.on('all', (_event, filePath) => {
        if (/photos[\\/]/i.test(filePath)) {
          syncToPublic()
          server.ws.send({ type: 'full-reload' })
        }
      })

      server.middlewares.use((req, res, next) => {
        const decodedUrl = decodeURIComponent(req.url || '')
        if (/^\/(photos|Photos)\//i.test(decodedUrl)) {
          const rawBasename = path.basename(decodedUrl.split('?')[0])
          const nameWithoutExt = rawBasename.replace(/\.[^/.]+$/, '')

          const searchDirs = [
            path.resolve(process.cwd(), 'Photos'),
            path.resolve(process.cwd(), 'photos'),
            path.resolve(process.cwd(), 'public', 'photos'),
          ]

          // 1. Check exact match
          // 2. Check candidate extensions if requested base is "profile" or similar
          const candidateExtensions = ['', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.PNG', '.JPG', '.JPEG', '.WEBP']

          for (const dir of searchDirs) {
            if (!fs.existsSync(dir)) continue

            // Direct check
            const exactPath = path.join(dir, rawBasename)
            if (fs.existsSync(exactPath) && fs.statSync(exactPath).isFile()) {
              return sendFile(res, exactPath)
            }

            // Fallback extensions check
            for (const ext of candidateExtensions) {
              const testPath = path.join(dir, `${nameWithoutExt}${ext}`)
              if (fs.existsSync(testPath) && fs.statSync(testPath).isFile()) {
                return sendFile(res, testPath)
              }
            }

            // Check if any file starts with "profile."
            const dirFiles = fs.readdirSync(dir)
            const matchedFile = dirFiles.find((f) =>
              f.toLowerCase().startsWith(`${nameWithoutExt.toLowerCase()}.`)
            )
            if (matchedFile) {
              return sendFile(res, path.join(dir, matchedFile))
            }
          }
        }
        next()
      })
    },
    closeBundle() {
      const candidates = ['Photos', 'photos']
      const distDir = path.resolve(process.cwd(), 'dist', 'photos')
      for (const dirName of candidates) {
        const srcDir = path.resolve(process.cwd(), dirName)
        if (fs.existsSync(srcDir)) {
          if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true })
          }
          const files = fs.readdirSync(srcDir)
          for (const file of files) {
            const src = path.join(srcDir, file)
            if (fs.statSync(src).isFile()) {
              fs.copyFileSync(src, path.join(distDir, file))
            }
          }
        }
      }
    },
  }
}

function sendFile(res: any, filePath: string) {
  const ext = path.extname(filePath).toLowerCase()
  const mimeTypes: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.svg': 'image/svg+xml',
  }
  res.setHeader('Content-Type', mimeTypes[ext] || 'image/jpeg')
  res.setHeader('Cache-Control', 'no-cache, must-revalidate')
  return fs.createReadStream(filePath).pipe(res)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    photosPlugin(),
  ],
})


