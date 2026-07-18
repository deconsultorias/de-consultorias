import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), ['.env', '.vercel-production'].join('')) })

const socialLinks = [
  {
    platform: 'linkedin' as const,
    url: 'https://www.linkedin.com/company/de-consultorias/',
  },
  {
    platform: 'instagram' as const,
    url: 'https://www.instagram.com/deconsultorias?igsh=MXg5ZGowcWR3eWZwaw%3D%3D&utm_source=qr',
  },
]

async function run() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: configPromise })

  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: { socialLinks },
  })

  payload.logger.info('Footer actualizado con LinkedIn e Instagram reales.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
