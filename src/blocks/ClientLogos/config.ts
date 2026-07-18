import type { Block } from 'payload'

export const ClientLogosBlock: Block = {
  slug: 'clientLogos',
  interfaceName: 'ClientLogosBlock',
  labels: {
    plural: 'Secciones de Clientes',
    singular: 'Sección de Clientes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      defaultValue: 'Organizaciones que confían en nosotros',
    },
    {
      name: 'clients',
      type: 'array',
      label: 'Clientes',
      minRows: 1,
      maxRows: 24,
      labels: {
        plural: 'Clientes',
        singular: 'Cliente',
      },
      admin: {
        description: 'Hasta 24 clientes.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nombre',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          label: 'Logo',
          relationTo: 'media',
          admin: {
            description:
              'Opcional. Si no se sube un logo, se muestra el nombre del cliente en texto.',
          },
        },
      ],
    },
  ],
}
