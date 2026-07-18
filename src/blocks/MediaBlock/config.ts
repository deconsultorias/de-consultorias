import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    plural: 'Bloques de Imagen',
    singular: 'Bloque de Imagen',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      label: 'Imagen',
      relationTo: 'media',
      required: true,
    },
  ],
}
