import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateService, revalidateServiceDelete } from './hooks/revalidateService'

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: {
    plural: 'Servicios',
    singular: 'Servicio',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    pilar: true,
    summary: true,
    coverImage: true,
  },
  admin: {
    defaultColumns: ['title', 'pilar', 'updatedAt'],
    useAsTitle: 'title',
    description:
      'Las intervenciones que se muestran en "Servicios" y en la portada. Cada una necesita una foto de portada.',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'services',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'services',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
      admin: {
        description:
          'Nombre corto del servicio (ej. "Liderazgo Adaptativo"). Se usa para generar la URL automáticamente, evita caracteres especiales.',
      },
    },
    {
      // Campo legado, reemplazado por `pilar`. Se mantiene sin uso visible para no perder
      // los datos existentes hasta completar la migración; no se elimina de la config para
      // evitar que Payload interprete el cambio como un rename de columna ambiguo.
      name: 'area',
      type: 'select',
      label: 'Pilar de intervención (legado)',
      required: false,
      admin: {
        hidden: true,
      },
      options: [
        { label: 'Cultura Preventiva', value: 'cultura-preventiva' },
        { label: 'Liderazgo Adaptativo', value: 'liderazgo-adaptativo' },
        { label: 'Aprendizaje Organizacional', value: 'aprendizaje-organizacional' },
      ],
    },
    {
      name: 'pilar',
      type: 'relationship',
      relationTo: 'service-areas',
      label: 'Pilar de intervención',
      required: true,
      admin: {
        position: 'sidebar',
        description:
          'Elige el pilar que mejor describe esta intervención. Si no existe el que necesitas, crea uno nuevo en "Pilares de Intervención" y vuelve a esta pantalla.',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden',
      admin: {
        position: 'sidebar',
        description: 'Orden en el que aparece dentro del listado de servicios (menor = primero).',
      },
      defaultValue: 0,
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Foto de portada',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Se recorta en horizontal y vertical según dónde aparezca. Subí una foto de al menos 1200px de ancho para que no se vea pixelada.',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Resumen',
      required: true,
      admin: {
        description: 'Descripción corta que se muestra en la tarjeta del listado de servicios.',
      },
    },
    {
      name: 'content',
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
      label: 'Contenido completo',
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateService],
    afterDelete: [revalidateServiceDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
}
