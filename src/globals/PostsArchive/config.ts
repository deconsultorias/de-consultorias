import type { GlobalConfig } from 'payload'

import { revalidatePostsArchive } from './hooks/revalidatePostsArchive'

export const PostsArchive: GlobalConfig = {
  slug: 'postsArchive',
  label: 'Página de Recursos (Artículos)',
  admin: {
    description: 'Título e introducción de la página que lista todos los artículos (/posts).',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Título',
      defaultValue: 'Experiencias y Artículos',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Introducción',
      admin: {
        description: 'Opcional. Texto corto debajo del título.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePostsArchive],
  },
}
