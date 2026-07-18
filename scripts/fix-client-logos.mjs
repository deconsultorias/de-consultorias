import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const DIR = path.resolve('public/brand/clients-raw')

async function svgToTransparentPng(svgFile, outFile) {
  let svg = fs.readFileSync(path.join(DIR, svgFile), 'utf-8')
  // Strip the first full-canvas white background rect/path so only the mark remains.
  svg = svg.replace(/<path fill="#fff" d="M0 0h[^"]*"\/>/, '')
  svg = svg.replace(/<rect[^>]*fill="#fff(?:fff)?"[^>]*\/>/, '')

  await sharp(Buffer.from(svg))
    .resize({ width: 800, height: 800, fit: 'inside' })
    .png()
    .trim({ threshold: 10 })
    .toFile(path.join(DIR, outFile))
}

async function run() {
  await svgToTransparentPng('komatsu.svg', 'komatsu-clean.png')
  await svgToTransparentPng('johnsoncontrols.svg', 'johnsoncontrols-clean.png')
  console.log('done')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
