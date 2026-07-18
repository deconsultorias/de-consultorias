import type { Block } from 'payload'

export const CarouselBlock: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  labels: {
    plural: 'Carruseles',
    singular: 'Carrusel',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Imágenes',
      minRows: 1,
      labels: {
        plural: 'Imágenes',
        singular: 'Imagen',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: 'Imagen',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Leyenda',
        },
      ],
    },
    {
      name: 'autoplayMs',
      type: 'number',
      label: 'Tiempo entre imágenes (ms)',
      defaultValue: 5000,
      admin: {
        description:
          'Tiempo en milisegundos entre cada cambio automático de imagen. Dejar en 0 para desactivar el autoplay.',
      },
    },
  ],
}
