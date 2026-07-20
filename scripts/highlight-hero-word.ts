import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), ['.env', '.vercel-production'].join('')) })

const TARGET_WORD = 'importantes'
const STATE_KEY = 'color'
const STATE_VALUE = 'accent'

async function run() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const home = pages.docs[0]
  if (!home) throw new Error('No se encontró la página home')

  const richText = home.hero?.richText as
    { root: { children: Array<{ children?: Array<Record<string, unknown>> }> } } | undefined
  if (!richText) throw new Error('El hero de home no tiene richText')

  let updated = false

  for (const node of richText.root.children) {
    if (!node.children) continue
    for (const child of node.children) {
      if (child.type === 'text' && child.text === TARGET_WORD) {
        child.$ = { ...(child.$ as Record<string, string> | undefined), [STATE_KEY]: STATE_VALUE }
        updated = true
      }
    }
  }

  if (!updated) {
    throw new Error(`No se encontró un nodo de texto exacto "${TARGET_WORD}" en el heading`)
  }

  await payload.update({
    collection: 'pages',
    id: home.id,
    context: { disableRevalidate: true },
    data: {
      hero: {
        ...home.hero,
        richText,
      },
    },
  })

  payload.logger.info(`Palabra "${TARGET_WORD}" marcada con color "${STATE_VALUE}".`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
