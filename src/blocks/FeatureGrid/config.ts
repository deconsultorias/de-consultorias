import type { Block } from 'payload'

import { link } from '@/fields/link'

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  labels: {
    plural: 'Grillas de Conceptos',
    singular: 'Grilla de Conceptos',
  },
  fields: [
    {
      name: 'background',
      type: 'select',
      label: 'Fondo de la sección',
      defaultValue: 'light',
      options: [
        { label: 'Claro', value: 'light' },
        { label: 'Oscuro', value: 'dark' },
      ],
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
    },
    {
      name: 'titleHighlight',
      type: 'text',
      label: 'Palabra/frase del título en amarillo',
      admin: {
        description: 'Debe coincidir textualmente con una parte del título.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Introducción',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Conceptos',
      minRows: 1,
      maxRows: 8,
      labels: {
        plural: 'Conceptos',
        singular: 'Concepto',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: 'Imagen',
          relationTo: 'media',
          admin: {
            description:
              'Opcional. Si se sube una imagen, la tarjeta se muestra como foto en vez de ícono.',
          },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Ícono',
          defaultValue: 'sparkles',
          options: [
            { label: 'Ojo (señales)', value: 'eye' },
            { label: 'Mensaje (comunicación)', value: 'message-circle' },
            { label: 'Escudo (supervisión/seguridad)', value: 'shield' },
            { label: 'Brújula (liderazgo)', value: 'compass' },
            { label: 'Raíz (cultura)', value: 'sprout' },
            { label: 'Libro (aprendizaje)', value: 'book-open' },
            { label: 'Repetición (ciclos)', value: 'repeat' },
            { label: 'Balanza (responsabilidad)', value: 'scale' },
            { label: 'Megáfono (reporte)', value: 'megaphone' },
            { label: 'Engranaje (producción)', value: 'settings' },
            { label: 'Destello (general)', value: 'sparkles' },
          ],
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
      ],
    },
    link({
      overrides: {
        admin: {
          condition: () => true,
          description: 'Opcional. Botón que aparece centrado debajo de la grilla.',
        },
      },
    }),
  ],
}
