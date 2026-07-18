import dotenv from 'dotenv'
import path from 'path'
import sharp from 'sharp'

dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), ['.env', '.vercel-production'].join('')) })

type RGB = { r: number; g: number; b: number }

const hexToRgb = (hex: string): RGB => {
  const clean = hex.replace('#', '')
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

const makePlaceholder = async (width: number, height: number, hex: string): Promise<Buffer> => {
  const { r, g, b } = hexToRgb(hex)
  return sharp({
    create: { width, height, channels: 3, background: { r, g, b } },
  })
    .jpeg({ quality: 82 })
    .toBuffer()
}

type LexicalNode = { [k: string]: unknown; type: string; version: number }

const heading = (text: string, tag: 'h1' | 'h2' | 'h3' = 'h2'): LexicalNode => ({
  type: 'heading',
  children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  version: 1,
})

const paragraph = (text: string): LexicalNode => ({
  type: 'paragraph',
  children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const richText = (children: LexicalNode[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

async function run() {
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('../src/payload.config')
  const payload = await getPayload({ config: configPromise })

  payload.logger.info('Generando imágenes placeholder...')

  const [
    heroImg,
    mediaTextImg,
    coverCulturaPreventiva,
    coverLiderazgo,
    coverAprendizaje,
    postImg1,
    postImg2,
    postImg3,
    postImg4,
    flagshipImg,
    problemImg1,
    problemImg2,
    problemImg3,
    problemImg4,
    problemImg5,
    problemImg6,
  ] = await Promise.all([
    makePlaceholder(1920, 1080, '#cdbfa5'),
    makePlaceholder(1400, 1050, '#c2a68c'),
    makePlaceholder(1200, 900, '#5c4326'),
    makePlaceholder(1200, 900, '#3a5a67'),
    makePlaceholder(1200, 900, '#4d5c3a'),
    makePlaceholder(1600, 1000, '#a3846a'),
    makePlaceholder(1600, 1000, '#8a9c8d'),
    makePlaceholder(1600, 1000, '#ab8b93'),
    makePlaceholder(1600, 1000, '#9a9186'),
    makePlaceholder(1920, 1080, '#8a7a63'),
    makePlaceholder(900, 1100, '#7d6a52'),
    makePlaceholder(900, 1100, '#6f7d6a'),
    makePlaceholder(900, 1100, '#8a6f6f'),
    makePlaceholder(900, 1100, '#c9a227'),
    makePlaceholder(900, 1100, '#6a7d8a'),
    makePlaceholder(900, 1100, '#7d6a8a'),
  ])

  const upload = async (data: Buffer, name: string, alt: string) => {
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data, mimetype: 'image/jpeg', name, size: data.length },
    })
    return doc
  }

  payload.logger.info('Subiendo imágenes...')

  const mediaHero = await upload(heroImg, 'hero-home.jpg', 'Equipo de DE Consultorías en terreno')
  const mediaMediaText = await upload(
    mediaTextImg,
    'intervenciones.jpg',
    'Equipo trabajando cultura preventiva en terreno',
  )
  const mediaCulturaPreventiva = await upload(
    coverCulturaPreventiva,
    'intervencion-cultura-preventiva.jpg',
    'Intervención en Cultura Preventiva',
  )
  const mediaLiderazgo = await upload(
    coverLiderazgo,
    'intervencion-liderazgo-adaptativo.jpg',
    'Intervención en Liderazgo Adaptativo',
  )
  const mediaAprendizaje = await upload(
    coverAprendizaje,
    'intervencion-aprendizaje-organizacional.jpg',
    'Intervención en Aprendizaje Organizacional',
  )
  const mediaPost1 = await upload(postImg1, 'post-1.jpg', 'Experiencia con cliente 1')
  const mediaPost2 = await upload(postImg2, 'post-2.jpg', 'Experiencia con cliente 2')
  const mediaPost3 = await upload(postImg3, 'post-3.jpg', 'Artículo de interés 1')
  const mediaPost4 = await upload(postImg4, 'post-4.jpg', 'Artículo de interés 2')
  const mediaFlagship = await upload(
    flagshipImg,
    'programa-transformacion.jpg',
    'Programa de Transformación de Cultura Preventiva',
  )
  const mediaProblem1 = await upload(problemImg1, 'problema-1.jpg', 'Incidentes que se repiten')
  const mediaProblem2 = await upload(problemImg2, 'problema-2.jpg', 'Supervisión debilitada')
  const mediaProblem3 = await upload(problemImg3, 'problema-3.jpg', 'Silencio organizacional')
  const mediaProblem4 = await upload(problemImg4, 'problema-4.jpg', 'Producción sobre seguridad')
  const mediaProblem5 = await upload(problemImg5, 'problema-5.jpg', 'Responsabilidad compartida')
  const mediaProblem6 = await upload(problemImg6, 'problema-6.jpg', 'Aprendizaje organizacional')

  payload.logger.info('Creando categorías...')

  const categoryData = [
    { title: 'Cultura Preventiva', slug: 'cultura-preventiva' },
    { title: 'Liderazgo Adaptativo', slug: 'liderazgo-adaptativo' },
    { title: 'Aprendizaje Organizacional', slug: 'aprendizaje-organizacional' },
    { title: 'Casos de Éxito', slug: 'casos-de-exito' },
  ]

  const categories: Record<string, number> = {}
  for (const cat of categoryData) {
    const doc = await payload.create({ collection: 'categories', data: cat })
    categories[cat.slug] = doc.id as number
  }

  payload.logger.info('Creando servicios (intervenciones)...')

  const services = [
    {
      title: 'Intervención en Cultura Preventiva',
      area: 'cultura-preventiva' as const,
      order: 1,
      coverImage: mediaCulturaPreventiva.id,
      summary:
        'Trabajamos las condiciones que hoy normalizan el riesgo, mucho antes de que se conviertan en un incidente.',
      content: richText([
        heading('Qué incluye', 'h2'),
        paragraph(
          'Diagnosticamos cómo tu organización entiende realmente el riesgo, más allá de lo que dicen los procedimientos escritos, e identificamos las señales tempranas que hoy pasan desapercibidas.',
        ),
        paragraph(
          'A partir de ahí diseñamos una intervención concreta: fortalecemos el reporte, trabajamos el silencio organizacional y acompañamos a los equipos en terreno hasta que el cambio se sostiene solo.',
        ),
      ]),
      slug: 'intervencion-en-cultura-preventiva',
      _status: 'published' as const,
    },
    {
      title: 'Intervención en Liderazgo Adaptativo',
      area: 'liderazgo-adaptativo' as const,
      order: 2,
      coverImage: mediaLiderazgo.id,
      summary:
        'No todos los problemas de seguridad se resuelven con un procedimiento nuevo. Desarrollamos líderes capaces de responder a lo que cada situación realmente exige.',
      content: richText([
        heading('Qué incluye', 'h2'),
        paragraph(
          'Trabajamos con supervisores y jefaturas para fortalecer su rol como la capa crítica entre la estrategia y la operación diaria.',
        ),
        paragraph(
          'El foco está en decisiones reales bajo presión, no en teoría de liderazgo: cómo priorizar seguridad cuando la producción aprieta, cómo sostener una conversación difícil, cómo construir confianza con el equipo.',
        ),
      ]),
      slug: 'intervencion-en-liderazgo-adaptativo',
      _status: 'published' as const,
    },
    {
      title: 'Intervención en Aprendizaje Organizacional',
      area: 'aprendizaje-organizacional' as const,
      order: 3,
      coverImage: mediaAprendizaje.id,
      summary:
        'Las organizaciones que más avanzan son las que aprenden de lo que ocurre antes de volver a equivocarse.',
      content: richText([
        heading('Qué incluye', 'h2'),
        paragraph(
          'Instalamos procesos reales de análisis post-incidente y post-casi incidente, orientados a entender causas de fondo y no solo a llenar un formulario.',
        ),
        paragraph(
          'Ese aprendizaje se traduce en cambios concretos en procesos, supervisión y liderazgo, con seguimiento medible en el tiempo.',
        ),
      ]),
      slug: 'intervencion-en-aprendizaje-organizacional',
      _status: 'published' as const,
    },
  ]

  for (const service of services) {
    await payload.create({
      collection: 'services',
      context: { disableRevalidate: true },
      data: service,
    })
  }

  payload.logger.info('Creando posts (experiencias y artículos)...')

  const posts = [
    {
      title: 'Cómo una constructora redujo su accidentabilidad en un 40%',
      slug: 'constructora-reduce-accidentabilidad',
      postType: 'experiencia' as const,
      client: 'Constructora Andina S.A.',
      heroImage: mediaPost1.id,
      categories: [categories['cultura-preventiva'], categories['casos-de-exito']],
      content: richText([
        paragraph(
          'Nos buscaron después de una serie de incidentes menores en sus obras que se repetían pese a tener procedimientos escritos. El diagnóstico mostró que el problema no era la falta de protocolos, sino señales tempranas que nadie estaba mirando.',
        ),
        paragraph(
          'Trabajamos seis meses fortaleciendo la supervisión y el reporte temprano. El resultado: una reducción del 40% en incidentes reportados, sostenida en las mediciones posteriores.',
        ),
      ]),
      _status: 'published' as const,
    },
    {
      title: 'Cuando la producción domina todas las decisiones de seguridad',
      slug: 'produccion-domina-decisiones-seguridad',
      postType: 'experiencia' as const,
      client: 'Operación minera (nombre reservado)',
      heroImage: mediaPost2.id,
      categories: [categories['liderazgo-adaptativo'], categories['casos-de-exito']],
      content: richText([
        paragraph(
          'En esta operación, cada vez que la producción se atrasaba, la seguridad terminaba cediendo terreno en la práctica, aunque nadie lo dijera en voz alta.',
        ),
        paragraph(
          'Trabajamos con las jefaturas de turno un programa de liderazgo adaptativo enfocado en sostener decisiones de seguridad bajo presión real, no en un aula.',
        ),
      ]),
      _status: 'published' as const,
    },
    {
      title: 'Las señales que anteceden a un incidente (y por qué nadie las ve)',
      slug: 'senales-que-anteceden-a-un-incidente',
      postType: 'articulo' as const,
      heroImage: mediaPost3.id,
      categories: [categories['cultura-preventiva']],
      content: richText([
        paragraph(
          'La mayoría de las organizaciones investiga lo que ya ocurrió. Muy pocas trabajan con lo que todavía no se ve, aunque ahí es donde realmente se puede intervenir a tiempo.',
        ),
        heading('El costo del silencio', 'h3'),
        paragraph(
          'Cuando reportar tiene consecuencias negativas, las personas dejan de hacerlo, y la organización pierde justo la información que más necesita.',
        ),
        heading('La supervisión como capa crítica', 'h3'),
        paragraph(
          'El supervisor está en la mejor posición para notar señales tempranas. Si esa capa se debilita, la prevención se debilita con ella.',
        ),
      ]),
      _status: 'published' as const,
    },
    {
      title: 'Por qué el aprendizaje organizacional importa más que el próximo procedimiento',
      slug: 'aprendizaje-organizacional-importa-mas',
      postType: 'articulo' as const,
      heroImage: mediaPost4.id,
      categories: [categories['aprendizaje-organizacional']],
      content: richText([
        paragraph(
          'Cada incidente deja información valiosa. El problema es que la mayoría de las organizaciones la usa solo para llenar un formulario, no para aprender de verdad.',
        ),
        paragraph(
          'Las organizaciones que logran instalar aprendizaje real después de cada evento son las que más reducen su repetición en el tiempo.',
        ),
      ]),
      _status: 'published' as const,
    },
  ]

  for (const post of posts) {
    await payload.create({
      collection: 'posts',
      context: { disableRevalidate: true },
      data: post,
    })
  }

  payload.logger.info('Creando página Quiénes Somos...')

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Quiénes Somos',
      slug: 'quienes-somos',
      _status: 'published',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'content',
          columns: [
            {
              size: 'full',
              richText: richText([
                heading('Quiénes Somos', 'h1'),
                paragraph(
                  'DE Consultorías nace de la experiencia directa en terreno junto a organizaciones que necesitaban algo más que procedimientos nuevos: necesitaban entender por qué los riesgos seguían pasando desapercibidos.',
                ),
                paragraph(
                  'Trabajamos con un enfoque de intervención, no de capacitación aislada: acompañamos a nuestros clientes desde el diagnóstico hasta que el cambio se sostiene en el día a día de la operación.',
                ),
                heading('Nuestro enfoque', 'h2'),
                paragraph(
                  'Creemos que la prevención real se juega en las personas, las decisiones y el contexto, no en el papel. Por eso combinamos diagnóstico en terreno, desarrollo de liderazgo y seguimiento medible en cada intervención.',
                ),
              ]),
            },
          ],
        },
      ],
    },
  })

  payload.logger.info('Creando formulario de contacto...')

  const contactForm = await payload.create({
    collection: 'forms',
    context: { disableRevalidate: true },
    data: {
      title: 'Formulario de Contacto',
      submitButtonLabel: 'Enviar',
      confirmationType: 'message',
      confirmationMessage: richText([
        paragraph('Gracias por escribirnos. Te vamos a contactar a la brevedad.'),
      ]),
      fields: [
        {
          blockType: 'text',
          name: 'nombre',
          label: 'Nombre',
          required: true,
          width: 50,
        },
        {
          blockType: 'email',
          name: 'email',
          label: 'Email',
          required: true,
          width: 50,
        },
        {
          blockType: 'text',
          name: 'empresa',
          label: 'Empresa',
          required: false,
          width: 100,
        },
        {
          blockType: 'textarea',
          name: 'mensaje',
          label: 'Cuéntanos tu desafío',
          required: true,
          width: 100,
        },
      ],
    },
  })

  payload.logger.info('Creando página de Contacto...')

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Contacto',
      slug: 'contacto',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: richText([
          heading('Hablemos de tu desafío', 'h1'),
          paragraph(
            'Cuéntanos qué está pasando en tu organización y te contactamos para conversarlo.',
          ),
        ]),
      },
      layout: [
        {
          blockType: 'formBlock',
          form: contactForm.id,
          enableIntro: false,
        },
      ],
    },
  })

  payload.logger.info('Creando página de inicio (Home)...')

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      hero: {
        type: 'highImpact',
        media: mediaHero.id,
        richText: richText([
          heading(
            'Construir una cultura preventiva real no es cuestión de más procedimientos',
            'h1',
          ),
          paragraph(
            'Trabajamos el liderazgo, la supervisión y las señales tempranas que hoy pasan desapercibidas, para que la prevención deje de depender solo del papel.',
          ),
        ]),
        links: [
          {
            link: {
              type: 'custom',
              url: '/contacto',
              label: 'Hablemos de tu desafío',
              appearance: 'default',
              newTab: false,
            },
          },
          {
            link: {
              type: 'custom',
              url: '/servicios',
              label: 'Conoce nuestras intervenciones',
              appearance: 'outline',
              newTab: false,
            },
          },
        ],
      },
      layout: [
        {
          blockType: 'featureGrid',
          background: 'dark',
          eyebrow: 'El problema',
          title: 'Los riesgos que nadie ve a tiempo',
          intro:
            'La mayoría de las organizaciones investiga lo que ya ocurrió. Nosotros trabajamos con lo que todavía no se ve.',
          items: [
            {
              icon: 'eye',
              title: 'Señales Tempranas',
              description:
                'Hay indicios de que algo no funciona mucho antes de que se convierta en incidente. La clave es aprender a identificarlos.',
            },
            {
              icon: 'message-circle',
              title: 'Silencio Organizacional',
              description:
                'Cuando reportar tiene costo, las personas dejan de hacerlo, y la organización pierde la información que más necesita.',
            },
            {
              icon: 'shield',
              title: 'Supervisión Debilitada',
              description:
                'El supervisor es el punto de contacto real entre la estrategia y el trabajo diario. Si esa capa se debilita, también lo hace la prevención.',
            },
            {
              icon: 'compass',
              title: 'Liderazgo Adaptativo',
              description:
                'No todos los problemas de seguridad se resuelven con un procedimiento nuevo. Algunos requieren un liderazgo distinto.',
            },
            {
              icon: 'sprout',
              title: 'Cultura Preventiva',
              description:
                'Los incidentes rara vez comienzan el día que ocurren. Empiezan mucho antes, en decisiones pequeñas y repetidas.',
            },
            {
              icon: 'book-open',
              title: 'Aprendizaje Organizacional',
              description:
                'Las organizaciones que más avanzan son las que logran aprender de lo que pasa, no solo reaccionar.',
            },
          ],
          link: {
            type: 'custom',
            url: '/servicios',
            label: 'Ver cómo lo transformamos',
            appearance: 'outline',
            newTab: false,
          },
        },
        {
          blockType: 'mediaText',
          eyebrow: 'Lo que hacemos',
          media: mediaMediaText.id,
          imagePosition: 'left',
          richText: richText([
            heading('No hacemos capacitaciones sueltas. Trabajamos la cultura de fondo', 'h2'),
            paragraph(
              'Acompañamos a las organizaciones a repensar cómo entienden el riesgo, cómo lideran y cómo deciden, porque ahí es donde realmente se juega la prevención.',
            ),
          ]),
          enableLink: true,
          link: {
            type: 'custom',
            url: '/servicios',
            label: 'Conoce nuestras intervenciones',
            newTab: false,
          },
        },
        {
          blockType: 'servicesShowcase',
          populateBy: 'collection',
          limit: 3,
        },
        {
          blockType: 'methodology',
          eyebrow: 'Nuestra forma de trabajar',
          title: 'Una metodología construida en terreno, no en una planilla',
          steps: [
            {
              icon: 'search',
              title: 'Diagnóstico',
              description: 'Entendemos el contexto real de tu organización antes de proponer nada.',
            },
            {
              icon: 'layers',
              title: 'Capas Invisibles',
              description:
                'Identificamos las condiciones que hoy normalizan el riesgo sin que nadie lo note.',
            },
            {
              icon: 'users',
              title: 'Liderazgo',
              description:
                'Desarrollamos líderes capaces de adaptarse a lo que cada situación realmente exige.',
            },
            {
              icon: 'hard-hat',
              title: 'Supervisión',
              description:
                'Fortalecemos a los supervisores como el punto crítico entre la estrategia y la operación.',
            },
            {
              icon: 'repeat',
              title: 'Hábitos',
              description:
                'Instalamos prácticas concretas que cambian el día a día, no solo el discurso.',
            },
            {
              icon: 'shield-check',
              title: 'Cultura Preventiva',
              description:
                'Consolidamos una cultura que anticipa los riesgos en vez de solo reaccionar a ellos.',
            },
          ],
        },
        {
          blockType: 'flagshipBanner',
          media: mediaFlagship.id,
          eyebrow: 'Nuestra intervención insignia',
          title: 'Programa de Transformación de Cultura Preventiva',
          description:
            'Un programa integral para construir organizaciones más seguras, adaptativas y con mejor desempeño.',
          steps: [
            { label: 'Diagnóstico' },
            { label: 'Señales débiles' },
            { label: 'Supervisión' },
            { label: 'Liderazgo adaptativo' },
            { label: 'Comunicación efectiva' },
            { label: 'Aprendizaje organizacional' },
          ],
          link: {
            type: 'custom',
            url: '/contacto',
            label: 'Solicitar propuesta',
            newTab: false,
          },
        },
        {
          blockType: 'featureGrid',
          eyebrow: '¿Qué problemas resolvemos?',
          items: [
            {
              image: mediaProblem1.id,
              title: 'Los mismos incidentes se repiten',
              description:
                'Ayudamos a romper el ciclo de fallas que vuelven a ocurrir una y otra vez.',
            },
            {
              image: mediaProblem2.id,
              title: 'La supervisión perdió peso',
              description:
                'Formamos supervisores que construyen cultura, no solo controlan tareas.',
            },
            {
              image: mediaProblem3.id,
              title: 'Las personas dejaron de reportar',
              description: 'Intervenimos el silencio organizacional que oculta información clave.',
            },
            {
              image: mediaProblem4.id,
              title: 'La producción prima sobre todo lo demás',
              description: 'Fortalecemos un liderazgo capaz de sostener la seguridad bajo presión.',
            },
            {
              image: mediaProblem5.id,
              title: 'La seguridad depende de una sola persona',
              description: 'Construimos responsabilidad compartida en toda la línea de mando.',
            },
            {
              image: mediaProblem6.id,
              title: 'No se aprende de lo que ya pasó',
              description: 'Instalamos procesos reales de aprendizaje organizacional.',
            },
          ],
        },
        {
          blockType: 'cta',
          richText: richText([heading('Conoce al equipo detrás de DE Consultorías', 'h3')]),
          links: [
            {
              link: {
                type: 'custom',
                url: '/quienes-somos',
                label: 'Sobre Nosotros',
                appearance: 'default',
                newTab: false,
              },
            },
          ],
        },
        {
          blockType: 'archive',
          populateBy: 'collection',
          limit: 3,
          introContent: richText([
            heading('Ideas que compartimos', 'h2'),
            paragraph('Reflexiones y casos reales sobre cultura preventiva y liderazgo.'),
          ]),
        },
        {
          blockType: 'clientLogos',
          title: 'Organizaciones que confían en nosotros',
          clients: [
            { name: 'CMPC' },
            { name: 'KOMATSU' },
            { name: 'BHP' },
            { name: 'JOHNSON CONTROLS' },
            { name: 'EQUIFAX' },
            { name: 'THIESS' },
            { name: 'HOTEL SOMMELIER' },
            { name: '3M' },
            { name: 'ALBEMARLE' },
            { name: 'CSI' },
            { name: 'POLYDECK' },
            { name: 'THM' },
          ],
        },
        {
          blockType: 'cta',
          backgroundImage: mediaHero.id,
          richText: richText([
            heading('¿Hablamos de tu desafío?', 'h3'),
            paragraph('Cuéntanos qué está pasando en tu organización y lo conversamos.'),
          ]),
          links: [
            {
              link: {
                type: 'custom',
                url: '/contacto',
                label: 'Hablemos de tu desafío',
                appearance: 'default',
                newTab: false,
              },
            },
          ],
        },
      ],
    },
  })

  payload.logger.info('Actualizando navegación (Header y Footer)...')

  const navItems = [
    { link: { type: 'custom' as const, url: '/', label: 'Inicio', newTab: false } },
    {
      link: { type: 'custom' as const, url: '/servicios', label: 'Intervenciones', newTab: false },
    },
    {
      link: {
        type: 'custom' as const,
        url: '/quienes-somos',
        label: 'Nosotros',
        newTab: false,
      },
    },
    { link: { type: 'custom' as const, url: '/posts', label: 'Ideas', newTab: false } },
    { link: { type: 'custom' as const, url: '/contacto', label: 'Contacto', newTab: false } },
  ]

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: { navItems },
  })
  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      navItems,
      description:
        'Ayudamos a organizaciones a transformar su cultura preventiva, desarrollando liderazgo adaptativo y aprendizaje organizacional.',
      contactEmail: 'aescobar.deconsultoria@gmail.com',
      socialLinks: [{ platform: 'linkedin', url: 'https://www.linkedin.com' }],
    },
  })

  payload.logger.info('¡Listo! Contenido nuevo creado.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
