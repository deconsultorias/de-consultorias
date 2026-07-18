import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const SRC_DIR = path.resolve('tmp-photos/converted')
const OUT_DIR = path.resolve('tmp-photos/processed')

const MAX_DIMENSION = 2400

const files = [
  'photo-01.jpg',
  'photo-06.jpg',
  'photo-08.jpg',
  'photo-12.jpg',
  'photo-14.jpg',
  'photo-15.jpg',
  'photo-19.jpg',
  'photo-24.jpg',
  'photo-26.jpg',
  'photo-33.jpg',
  'photo-34.jpg',
  'photo-40.jpg',
  'photo-42.jpg',
  'photo-44.jpg',
  'photo-45.jpg',
  'photo-47.jpg',
]

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  for (const file of files) {
    const input = path.join(SRC_DIR, file)
    const output = path.join(OUT_DIR, file)

    const image = sharp(input).rotate()
    const metadata = await image.metadata()

    const needsResize = (metadata.width ?? 0) > MAX_DIMENSION || (metadata.height ?? 0) > MAX_DIMENSION

    await image
      .resize(
        needsResize
          ? { width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true }
          : undefined,
      )
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(output)

    const beforeSize = fs.statSync(input).size
    const afterSize = fs.statSync(output).size
    console.log(
      `${file}: ${(beforeSize / 1024 / 1024).toFixed(1)}MB -> ${(afterSize / 1024 / 1024).toFixed(1)}MB`,
    )
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
