import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), ['.env', '.vercel-production'].join('')) })

const PROCESSED_DIR = path.resolve('tmp-photos/processed')

const photos: Record<string, string> = {
  homeHero: 'photo-01.jpg',
  homeMediaText: 'photo-08.jpg',
  homeFlagship: 'photo-34.jpg',
  problem1: 'photo-45.jpg',
  problem2: 'photo-19.jpg',
  problem3: 'photo-40.jpg',
  problem4: 'photo-26.jpg',
  problem5: 'photo-15.jpg',
  problem6: 'photo-42.jpg',
  serviceCulturaPreventiva: 'photo-33.jpg',
  serviceLiderazgo: 'photo-47.jpg',
  serviceAprendizaje: 'photo-12.jpg',
  postConstructora: 'photo-24.jpg',
  postProduccion: 'photo-44.jpg',
  postSenales: 'photo-06.jpg',
  postAprendizaje: 'photo-14.jpg',
}

const alts: Record<string, string> = {
  homeHero: 'Equipo de DE Consultorías facilitando una jornada de trabajo con clientes',
  homeMediaText: 'Grupo de trabajo conversando en círculo durante una intervención en terreno',
  homeFlagship:
    'Equipo participando en una sesión del programa de transformación de cultura preventiva',
  problem1: 'Facilitador presentando la pirámide de aprendizaje a un grupo de trabajo',
  problem2: 'Supervisor conversando con su equipo en una sesión de trabajo',
  problem3: 'Facilitador exponiendo sobre personas que cuidan personas',
  problem4: 'Equipo de trabajo en sesión de cultura preventiva con cliente industrial',
  problem5: 'Conversación uno a uno entre consultor y colaborador',
  problem6: 'Grupo revisando la pirámide de aprendizaje organizacional',
  serviceCulturaPreventiva: 'Presentación del programa de Cultura Preventiva a un grupo de trabajo',
  serviceLiderazgo:
    'Equipo reunido en torno al mensaje Liderazgo en acción, al servicio de las personas',
  serviceAprendizaje: 'Grupo analizando la pirámide de aprendizaje en una sesión de trabajo',
  postConstructora:
    'Trabajadores con equipo de protección personal conversando en una sesión de seguridad',
  postProduccion: 'Sesión de liderazgo desde el vínculo con equipo de una operación minera',
  postSenales: 'Grupo de trabajo en círculo conversando sobre señales tempranas',
  postAprendizaje: 'Grupo revisando la pirámide de aprendizaje junto a un facilitador',
}

async function run() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: configPromise })

  const mediaIds: Record<string, number> = {}

  for (const [key, filename] of Object.entries(photos)) {
    const filePath = path.join(PROCESSED_DIR, filename)
    const data = fs.readFileSync(filePath)
    const doc = await payload.create({
      collection: 'media',
      context: { disableRevalidate: true },
      data: { alt: alts[key] },
      file: { data, mimetype: 'image/jpeg', name: `real-${filename}`, size: data.length },
    })
    mediaIds[key] = doc.id as number
    payload.logger.info(`Subida ${key} (${filename}) -> id ${doc.id}`)
  }

  // --- Home page: hero, mediaText, flagshipBanner, featureGrid "problemas" ---
  const homeResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  const home = homeResult.docs[0]
  if (!home) throw new Error('No se encontró la página Home')

  const problemOrder = ['problem1', 'problem2', 'problem3', 'problem4', 'problem5', 'problem6']
  let problemIndex = 0

  const layout = (home.layout || []).map((block: any) => {
    if (block.blockType === 'mediaText') {
      return { ...block, media: mediaIds.homeMediaText }
    }
    if (block.blockType === 'flagshipBanner') {
      return { ...block, media: mediaIds.homeFlagship }
    }
    if (block.blockType === 'featureGrid' && block.items?.some((item: any) => 'image' in item)) {
      const items = block.items.map((item: any) => {
        if (!('image' in item)) return item
        const key = problemOrder[problemIndex]
        problemIndex += 1
        return { ...item, image: mediaIds[key] }
      })
      return { ...block, items }
    }
    return block
  })

  await payload.update({
    collection: 'pages',
    id: home.id,
    context: { disableRevalidate: true },
    data: {
      hero: { ...home.hero, media: mediaIds.homeHero },
      layout,
    },
  })
  payload.logger.info('Home actualizado con fotos reales.')

  // --- Services ---
  const serviceCoverBylSlug: Record<string, string> = {
    'intervencion-en-cultura-preventiva': 'serviceCulturaPreventiva',
    'intervencion-en-liderazgo-adaptativo': 'serviceLiderazgo',
    'intervencion-en-aprendizaje-organizacional': 'serviceAprendizaje',
  }

  for (const [slug, key] of Object.entries(serviceCoverBylSlug)) {
    const found = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const doc = found.docs[0]
    if (!doc) {
      payload.logger.warn(`No se encontró el servicio ${slug}`)
      continue
    }
    await payload.update({
      collection: 'services',
      id: doc.id,
      context: { disableRevalidate: true },
      data: { coverImage: mediaIds[key] },
    })
    payload.logger.info(`Servicio ${slug} actualizado con foto real.`)
  }

  // --- Posts ---
  const postHeroBySlug: Record<string, string> = {
    'constructora-reduce-accidentabilidad': 'postConstructora',
    'produccion-domina-decisiones-seguridad': 'postProduccion',
    'senales-que-anteceden-a-un-incidente': 'postSenales',
    'aprendizaje-organizacional-importa-mas': 'postAprendizaje',
  }

  for (const [slug, key] of Object.entries(postHeroBySlug)) {
    const found = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const doc = found.docs[0]
    if (!doc) {
      payload.logger.warn(`No se encontró el post ${slug}`)
      continue
    }
    await payload.update({
      collection: 'posts',
      id: doc.id,
      context: { disableRevalidate: true },
      data: { heroImage: mediaIds[key] },
    })
    payload.logger.info(`Post ${slug} actualizado con foto real.`)
  }

  payload.logger.info('Fotos reales integradas en todo el sitio.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
