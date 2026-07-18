import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const MediaTextBlock: Block = {
  slug: 'mediaText',
  interfaceName: 'MediaTextBlock',
  labels: {
    plural: 'Secciones de Imagen + Texto',
    singular: 'Sección de Imagen + Texto',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Texto superior',
      admin: {
        description: 'Texto corto sobre el título, con acento de color (opcional).',
      },
    },
    {
      name: 'media',
      type: 'upload',
      label: 'Imagen',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Posición de la imagen',
      defaultValue: 'left',
      options: [
        { label: 'Imagen a la izquierda', value: 'left' },
        { label: 'Imagen a la derecha', value: 'right' },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
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
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
  ],
}
