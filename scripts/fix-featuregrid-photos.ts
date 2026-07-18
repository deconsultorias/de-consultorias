import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), ['.env', '.vercel-production'].join('')) })

// IDs already uploaded by update-real-photos.ts — reused here to avoid duplicate uploads.
const problemMediaIds = [137, 138, 139, 140, 141, 142]

async function run() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: configPromise })

  const homeResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  const home = homeResult.docs[0]
  if (!home) throw new Error('No se encontró la página Home')

  let sawPhotoGrid = false

  const layout = (home.layout || []).map((block: any) => {
    if (block.blockType !== 'featureGrid') return block

    // Identify the photo-variant grid by its eyebrow, set in the seed script.
    const isProblemGrid = block.eyebrow === '¿Qué problemas resolvemos?'

    if (isProblemGrid) {
      sawPhotoGrid = true
      const items = block.items.map((item: any, index: number) => ({
        ...item,
        image: problemMediaIds[index] ?? item.image,
      }))
      return { ...block, items }
    }

    // Any other featureGrid (the icon grid) must NOT carry an image.
    const items = block.items.map((item: any) => ({ ...item, image: null }))
    return { ...block, items }
  })

  if (!sawPhotoGrid) {
    payload.logger.warn('No se encontró la grilla de fotos "¿Qué problemas resolvemos?"')
  }

  await payload.update({
    collection: 'pages',
    id: home.id,
    context: { disableRevalidate: true },
    data: { layout },
  })

  payload.logger.info(
    'FeatureGrid corregido: grilla de íconos sin fotos, grilla de problemas con fotos reales.',
  )
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
