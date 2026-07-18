import type { Block } from 'payload'

import { link } from '@/fields/link'

export const MethodologyBlock: Block = {
  slug: 'methodology',
  interfaceName: 'MethodologyBlock',
  labels: {
    plural: 'Secciones de Metodología',
    singular: 'Sección de Metodología',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Texto superior',
      defaultValue: 'Cómo trabajamos',
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
      name: 'steps',
      type: 'array',
      label: 'Pasos',
      minRows: 1,
      maxRows: 6,
      labels: {
        plural: 'Pasos',
        singular: 'Paso',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Ícono',
          defaultValue: 'sparkles',
          options: [
            { label: 'Lupa (diagnóstico)', value: 'search' },
            { label: 'Capas (condiciones invisibles)', value: 'layers' },
            { label: 'Personas (liderazgo)', value: 'users' },
            { label: 'Casco (supervisión)', value: 'hard-hat' },
            { label: 'Repetición (hábitos)', value: 'repeat' },
            { label: 'Escudo (cultura preventiva)', value: 'shield-check' },
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
          description:
            'Opcional. Botón debajo de la introducción (ej: Conoce nuestra metodología).',
        },
      },
    }),
  ],
}
