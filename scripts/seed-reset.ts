import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), ['.env', '.vercel-production'].join('')) })

async function run() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: configPromise })

  for (const collection of [
    'services',
    'posts',
    'categories',
    'pages',
    'media',
    'form-submissions',
    'forms',
  ] as const) {
    const found = await payload.find({ collection, limit: 1000, pagination: false })
    for (const doc of found.docs) {
      await payload.delete({
        collection,
        id: doc.id,
        context: { disableRevalidate: true },
      })
    }
    payload.logger.info(`Borrados ${found.docs.length} docs de ${collection}`)
  }

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: { navItems: [] },
  })
  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: { navItems: [] },
  })

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
