import type { Block } from 'payload'

export const ComparisonBlock: Block = {
  slug: 'comparison',
  interfaceName: 'ComparisonBlock',
  labels: {
    plural: 'Secciones de Comparación',
    singular: 'Sección de Comparación',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Texto superior',
      defaultValue: 'Más que capacitación',
    },
    {
      name: 'titleNormal',
      type: 'text',
      label: 'Título (parte normal)',
      defaultValue: 'No capacitamos.',
    },
    {
      name: 'titleAccent',
      type: 'text',
      label: 'Título (parte destacada)',
      defaultValue: 'Intervenimos organizaciones.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'traditionalLabel',
      type: 'text',
      label: 'Encabezado columna izquierda',
      defaultValue: 'Capacitación tradicional',
    },
    {
      name: 'approachLabel',
      type: 'text',
      label: 'Encabezado columna derecha',
      defaultValue: 'Nuestro enfoque',
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Filas de comparación',
      minRows: 1,
      maxRows: 6,
      labels: {
        plural: 'Filas',
        singular: 'Fila',
      },
      fields: [
        {
          name: 'traditional',
          type: 'text',
          label: 'Capacitación tradicional',
          required: true,
        },
        {
          name: 'approach',
          type: 'text',
          label: 'Nuestro enfoque',
          required: true,
        },
      ],
    },
    {
      name: 'diagramTopLabel',
      type: 'text',
      label: 'Diagrama: etiqueta superior',
      defaultValue: 'Capacitación',
    },
    {
      name: 'diagramBottomLabel',
      type: 'text',
      label: 'Diagrama: etiqueta inferior',
      defaultValue: 'Intervención organizacional',
    },
  ],
}
