import type { Metadata } from 'next'

import type { Media, Page, Post, Service, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

type MetaCapableDoc = {
  title?: string | null
  slug?: string | string[] | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: Media | Config['db']['defaultIDType'] | null
  } | null
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Service> | null
}): Promise<Metadata> => {
  const doc = args.doc as MetaCapableDoc | null

  const meta = doc?.meta

  const ogImage = getImageURL(meta?.image)

  const fallbackTitle = doc?.title ? `${doc.title} | DE Consultorías` : 'DE Consultorías'

  const title = meta?.title ? `${meta.title} | DE Consultorías` : fallbackTitle

  return {
    description: meta?.description,
    openGraph: mergeOpenGraph({
      description: meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
