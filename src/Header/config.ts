import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Encabezado',
  admin: {
    description: 'El menú de navegación que aparece arriba en todas las páginas del sitio.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Enlaces del menú',
      labels: {
        plural: 'Enlaces',
        singular: 'Enlace',
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      minRows: 1,
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description: 'Debe quedar al menos un enlace: es la navegación principal del sitio.',
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
