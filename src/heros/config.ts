import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  TextStateFeature,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Tipo de encabezado',
      options: [
        {
          label: 'Ninguno',
          value: 'none',
        },
        {
          label: 'Foto grande de fondo',
          value: 'highImpact',
        },
        {
          label: 'Foto mediana',
          value: 'mediumImpact',
        },
        {
          label: 'Solo texto',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            TextStateFeature({
              state: {
                color: {
                  accent: {
                    label: 'Amarillo (Acento)',
                    css: { color: 'var(--accent)' },
                  },
                },
              },
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      label: 'Imagen de fondo',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
