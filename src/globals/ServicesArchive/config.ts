import type { GlobalConfig } from 'payload'

import { revalidateServicesArchive } from './hooks/revalidateServicesArchive'

export const ServicesArchive: GlobalConfig = {
  slug: 'servicesArchive',
  label: 'Página de Servicios',
  admin: {
    description: 'Título e introducción de la página que lista todos los servicios (/servicios).',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Título',
      defaultValue: 'Servicios',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Introducción',
      defaultValue:
        'Consultoría, capacitación y relatoría para desarrollar habilidades y obtener mejores resultados en seguridad, calidad, productividad y clima laboral.',
      admin: {
        description: 'Opcional. Texto corto debajo del título.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateServicesArchive],
  },
}
