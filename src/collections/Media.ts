import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    plural: 'Imágenes',
    singular: 'Imagen',
  },
  folders: true,
  admin: {
    description:
      'Todas las imágenes del sitio. Antes de borrar una, revisar "Dónde se usa" en su ficha.',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true,
      admin: {
        description:
          'Describe brevemente la imagen (para accesibilidad y SEO). Ejemplo: "Equipo trabajando en una sesión de cultura preventiva".',
      },
    },
    {
      name: 'caption',
      label: 'Leyenda',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      type: 'collapsible',
      label: 'Dónde se usa',
      admin: {
        initCollapsed: false,
        description:
          'Páginas, servicios y artículos que usan esta imagen. Las imágenes del carrusel no aparecen aquí todavía.',
      },
      fields: [
        {
          name: 'usedInPages',
          type: 'join',
          collection: 'pages',
          on: 'hero.media',
          label: 'Usada como hero en estas páginas',
        },
        {
          name: 'usedInServices',
          type: 'join',
          collection: 'services',
          on: 'coverImage',
          label: 'Usada como portada en estos servicios',
        },
        {
          name: 'usedInPosts',
          type: 'join',
          collection: 'posts',
          on: 'heroImage',
          label: 'Usada como portada en estos posts',
        },
      ],
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
