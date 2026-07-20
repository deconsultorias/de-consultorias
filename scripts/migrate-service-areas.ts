import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), ['.env', '.vercel-production'].join('')) })

const LEGACY_AREAS = [
  { legacyValue: 'cultura-preventiva', title: 'Cultura Preventiva' },
  { legacyValue: 'liderazgo-adaptativo', title: 'Liderazgo Adaptativo' },
  { legacyValue: 'aprendizaje-organizacional', title: 'Aprendizaje Organizacional' },
] as const

// Snapshot tomado con scripts/snapshot-services-area.ts antes de este cambio de schema.
// El id 15 se corrige a "aprendizaje-organizacional" (coincide con su título) en lugar del
// valor guardado ("liderazgo-adaptativo"), por decisión explícita del usuario.
const SERVICE_ID_TO_LEGACY_AREA: Record<number, string> = {
  13: 'cultura-preventiva',
  14: 'liderazgo-adaptativo',
  15: 'aprendizaje-organizacional',
}

async function run() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: configPromise })

  const legacyValueToAreaId = new Map<string, number>()

  for (const { legacyValue, title } of LEGACY_AREAS) {
    const existing = await payload.find({
      collection: 'service-areas',
      where: { title: { equals: title } },
      limit: 1,
    })

    const areaDoc =
      existing.docs[0] ??
      (await payload.create({
        collection: 'service-areas',
        data: { title },
        context: { disableRevalidate: true },
      }))

    legacyValueToAreaId.set(legacyValue, areaDoc.id as number)
    payload.logger.info(`Pilar listo: "${title}" -> id ${areaDoc.id}`)
  }

  for (const [idStr, legacyValue] of Object.entries(SERVICE_ID_TO_LEGACY_AREA)) {
    const serviceId = Number(idStr)
    const newAreaId = legacyValueToAreaId.get(legacyValue)

    if (!newAreaId) {
      payload.logger.warn(
        `Valor legacy desconocido "${legacyValue}" para el servicio id ${serviceId}. Requiere revisión manual.`,
      )
      continue
    }

    await payload.update({
      collection: 'services',
      id: serviceId,
      context: { disableRevalidate: true },
      data: { pilar: newAreaId },
    })

    payload.logger.info(`Servicio id ${serviceId} migrado a pilar id ${newAreaId}.`)
  }

  payload.logger.info('Migración de pilares completada.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
