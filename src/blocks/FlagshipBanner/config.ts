import type { Block } from 'payload'

import { link } from '@/fields/link'

export const FlagshipBannerBlock: Block = {
  slug: 'flagshipBanner',
  interfaceName: 'FlagshipBannerBlock',
  labels: {
    plural: 'Banners de Intervención Insignia',
    singular: 'Banner de Intervención Insignia',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      label: 'Imagen de fondo',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Texto superior',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Puntos del proceso',
      minRows: 2,
      maxRows: 8,
      labels: {
        plural: 'Puntos del proceso',
        singular: 'Punto del proceso',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Etiqueta',
          required: true,
        },
      ],
    },
    link(),
  ],
}
