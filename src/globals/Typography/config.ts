import type { GlobalConfig } from 'payload'

import { revalidateTypography } from './hooks/revalidateTypography'

export const Typography: GlobalConfig = {
  slug: 'typography',
  label: 'Tipografía y Estilo',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Controla la fuente, el tamaño del texto y el estilo de los títulos en todo el sitio.',
  },
  fields: [
    {
      name: 'fontFamily',
      type: 'select',
      label: 'Tipografía',
      defaultValue: 'manrope',
      options: [
        { label: 'Manrope (predeterminada, marca DE Consultorías)', value: 'manrope' },
        { label: 'Geist (moderna y neutra)', value: 'geist' },
        { label: 'Inter (clásica para sitios corporativos)', value: 'inter' },
        { label: 'Poppins (redondeada y cercana)', value: 'poppins' },
        { label: 'Lato (equilibrada y legible)', value: 'lato' },
        { label: 'Montserrat (geométrica, fuerte en títulos)', value: 'montserrat' },
        { label: 'Merriweather (serif, más tradicional)', value: 'merriweather' },
      ],
      admin: {
        description: 'Se aplica a todo el texto del sitio (no afecta al panel de administración).',
      },
    },
    {
      name: 'baseFontSize',
      type: 'select',
      label: 'Tamaño de texto',
      defaultValue: 'normal',
      options: [
        { label: 'Pequeño', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Grande', value: 'large' },
      ],
      admin: {
        description: 'Escala el tamaño de todos los textos del sitio de forma proporcional.',
      },
    },
    {
      name: 'headingWeight',
      type: 'select',
      label: 'Grosor de los títulos',
      defaultValue: 'semibold',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Semi-negrita', value: 'semibold' },
        { label: 'Negrita', value: 'bold' },
      ],
      admin: {
        description: 'Afecta a todos los títulos (h1, h2, h3, etc.) del sitio.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateTypography],
  },
}
