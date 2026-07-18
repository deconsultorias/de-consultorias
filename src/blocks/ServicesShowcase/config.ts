import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const ServicesShowcase: Block = {
  slug: 'servicesShowcase',
  interfaceName: 'ServicesShowcaseBlock',
  labels: {
    plural: 'Vitrinas de Servicios',
    singular: 'Vitrina de Servicios',
  },
  fields: [
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
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Contenido introductorio',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        { label: 'Todos los servicios', value: 'collection' },
        { label: 'Selección manual', value: 'selection' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 6,
      label: 'Cantidad a mostrar',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Servicios seleccionados',
      relationTo: 'services',
    },
    link({
      overrides: {
        name: 'viewAllLink',
        admin: {
          condition: () => true,
          description: 'Opcional. Enlace arriba a la derecha (ej: Ver todos los servicios).',
        },
      },
    }),
  ],
}
