import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: {
    plural: 'Secciones de Equipo',
    singular: 'Sección de Equipo',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Texto superior',
      defaultValue: 'Quiénes somos',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      defaultValue: 'Nuestro equipo',
    },
    {
      name: 'titleHighlight',
      type: 'text',
      label: 'Palabra/frase del título en amarillo',
      defaultValue: 'equipo',
      admin: {
        description: 'Debe coincidir textualmente con una parte del título.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Introducción',
      defaultValue:
        'Somos un equipo diverso y complementario, unidos por el propósito de transformar organizaciones a través de las personas y sus conversaciones.',
    },
    {
      name: 'members',
      type: 'array',
      label: 'Integrantes',
      minRows: 1,
      maxRows: 12,
      labels: {
        plural: 'Integrantes',
        singular: 'Integrante',
      },
      admin: {
        components: {
          RowLabel: '@/blocks/Team/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'photo',
          type: 'upload',
          label: 'Foto',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Nombre',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Cargo',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Descripción',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn',
          admin: {
            description: 'Opcional. URL completa del perfil de LinkedIn.',
          },
        },
      ],
    },
  ],
}
