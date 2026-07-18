import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: {
    plural: 'Secciones de Estadísticas',
    singular: 'Sección de Estadísticas',
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      label: 'Estadísticas',
      minRows: 1,
      maxRows: 4,
      labels: {
        plural: 'Estadísticas',
        singular: 'Estadística',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Valor',
          required: true,
          admin: {
            description: 'Ej: 40%, +120, 8 semanas',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Etiqueta',
          required: true,
        },
      ],
    },
  ],
}
