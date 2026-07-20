import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const ServiceAreas: CollectionConfig = {
  slug: 'service-areas',
  labels: {
    plural: 'Pilares de Intervención',
    singular: 'Pilar de Intervención',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    description:
      'Los pilares bajo los que se agrupan los servicios (ej. "Cultura Preventiva"). Agrega uno nuevo aquí si el servicio que quieres crear no encaja en los pilares existentes.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nombre del pilar',
      required: true,
      admin: {
        description: 'Ej. "Cultura Preventiva", "Liderazgo Adaptativo".',
      },
    },
    slugField({
      position: undefined,
    }),
  ],
}
