import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Pie de página',
  admin: {
    description: 'El pie de página: descripción, enlaces, contacto y redes sociales.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      admin: {
        description: 'Texto corto debajo del logo en el footer.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navegación',
      labels: {
        plural: 'Enlaces de navegación',
        singular: 'Enlace de navegación',
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      minRows: 1,
      maxRows: 8,
      admin: {
        initCollapsed: true,
        description: 'Columna "Navegación" del footer.',
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'resourceItems',
      type: 'array',
      label: 'Recursos',
      labels: {
        plural: 'Enlaces de recursos',
        singular: 'Enlace de recurso',
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        description: 'Columna "Recursos" del footer. Opcional.',
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaText',
      type: 'textarea',
      label: 'Texto de la columna "Conversemos"',
      defaultValue: 'Cuéntanos sobre tu desafío y conversemos.',
    },
    link({
      overrides: {
        name: 'ctaLink',
        admin: {
          description: 'Botón de la columna "Conversemos" (ej: Escríbenos).',
        },
      },
    }),
    {
      name: 'contactEmail',
      type: 'text',
      label: 'Correo de contacto',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Teléfono de contacto',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Redes sociales',
      maxRows: 5,
      labels: {
        plural: 'Redes Sociales',
        singular: 'Red Social',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Plataforma',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Facebook', value: 'facebook' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Enlace',
          required: true,
          admin: {
            description: 'Pegá el enlace completo, incluyendo https:// (ej: https://instagram.com/tu-cuenta).',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
