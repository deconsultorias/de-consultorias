import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), ['.env', '.vercel-production'].join('')) })

const logoFiles: Record<string, string> = {
  KOMATSU: 'komatsu.png',
  '3M': '3m-final.png',
  EQUIFAX: 'equifax.png',
  'JOHNSON CONTROLS': 'johnsoncontrols.png',
  BHP: 'bhp.png',
  'HOTEL SOMMELIER': 'sommelier.png',
}

async function run() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: configPromise })

  const logoIds: Record<string, number> = {}

  for (const [name, filename] of Object.entries(logoFiles)) {
    const filePath = path.resolve('public/brand/clients-raw', filename)
    const data = fs.readFileSync(filePath)
    const doc = await payload.create({
      collection: 'media',
      context: { disableRevalidate: true },
      data: { alt: `Logo de ${name}` },
      file: { data, mimetype: 'image/png', name: `client-official-${filename}`, size: data.length },
    })
    logoIds[name] = doc.id as number
    payload.logger.info(`Subido logo oficial de ${name} (id ${doc.id})`)
  }

  const home = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const homeDoc = home.docs[0]
  if (!homeDoc) throw new Error('No se encontró la página Home')

  const layout = (homeDoc.layout || []).map((block: any) => {
    if (block.blockType !== 'clientLogos') return block

    const clients = block.clients.map((client: any) => {
      const logoId = logoIds[client.name]
      return logoId ? { ...client, logo: logoId } : client
    })

    return { ...block, clients }
  })

  await payload.update({
    collection: 'pages',
    id: homeDoc.id,
    context: { disableRevalidate: true },
    data: { layout },
  })

  payload.logger.info(
    'Home actualizado con logos oficiales sin fondo (incluye BHP y Hotel Sommelier).',
  )
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
