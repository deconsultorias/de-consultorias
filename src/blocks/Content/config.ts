import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    label: 'Ancho de columna',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'Un tercio',
        value: 'oneThird',
      },
      {
        label: 'Mitad',
        value: 'half',
      },
      {
        label: 'Dos tercios',
        value: 'twoThirds',
      },
      {
        label: 'Completo',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
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
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: 'Mostrar enlace',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    plural: 'Bloques de Contenido',
    singular: 'Bloque de Contenido',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Texto superior',
      admin: {
        description: 'Opcional. Texto pequeño en amarillo arriba del contenido.',
      },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Columnas',
      labels: {
        plural: 'Columnas',
        singular: 'Columna',
      },
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
