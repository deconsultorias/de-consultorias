import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), ['.env', '.vercel-production'].join('')) })

const message = {
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Recibiste un nuevo contacto desde el sitio web de DE Consultorías:',
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        textFormat: 0,
        version: 1,
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '{{*:table}}',
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
}

async function run() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: configPromise })

  const forms = await payload.find({ collection: 'forms', limit: 1 })
  const form = forms.docs[0]
  if (!form) throw new Error('No se encontró el formulario de contacto')

  await payload.update({
    collection: 'forms',
    id: form.id,
    context: { disableRevalidate: true },
    data: {
      emails: [
        {
          emailTo: 'aescobar@deconsultorias.cl',
          emailFrom: '"DE Consultorías — Sitio Web" <no-reply@deconsultorias.cl>',
          subject: 'Nuevo contacto desde el sitio web',
          message,
        },
      ],
    },
  })

  payload.logger.info('Formulario actualizado con el email de notificación.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
