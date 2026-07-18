import React from 'react'

import { FeatureGridBlock } from '@/blocks/FeatureGrid/Component'

export const dynamic = 'force-static'

export default function TestPage() {
  return (
    <main className="pt-[92px]">
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-2">Página de comparación /test</h1>
        <p className="text-muted-foreground">
          Vista aislada del bloque &quot;Problemas&quot; con fondo oscuro (Design System 1.0). No
          afecta el home real.
        </p>
      </div>

      <FeatureGridBlock
        blockType="featureGrid"
        background="dark"
        eyebrow="Qué problemas resolvemos"
        title="Los riesgos que nadie ve a tiempo"
        intro="Identificamos las señales tempranas que anticipan incidentes, antes de que se conviertan en costos, sanciones o pérdidas humanas."
        items={[
          {
            icon: 'eye',
            title: 'Falta de visibilidad',
            description: 'Las señales de riesgo existen, pero nadie las está mirando a tiempo.',
          },
          {
            icon: 'message-circle',
            title: 'Comunicación rota',
            description: 'La información no fluye entre terreno y liderazgo cuando más importa.',
          },
          {
            icon: 'shield',
            title: 'Cultura reactiva',
            description: 'Se actúa después del incidente, no antes de que ocurra.',
          },
          {
            icon: 'compass',
            title: 'Liderazgo sin dirección',
            description: 'Los equipos no saben qué comportamiento se espera de ellos.',
          },
          {
            icon: 'sprout',
            title: 'Cambios que no perduran',
            description: 'Las iniciativas se apagan apenas termina el programa.',
          },
          {
            icon: 'book-open',
            title: 'Aprendizaje disperso',
            description: 'Cada área aprende sola, sin traspasar el conocimiento a la organización.',
          },
        ]}
        link={{
          type: 'custom',
          url: '#',
          label: 'Ver cómo lo transformamos',
          appearance: 'outline',
        }}
      />

      <div className="container py-16">
        <h2 className="text-xl font-semibold mb-4">Versión clara (para comparar)</h2>
      </div>

      <FeatureGridBlock
        blockType="featureGrid"
        background="light"
        eyebrow="Qué problemas resolvemos"
        title="Los riesgos que nadie ve a tiempo"
        intro="Identificamos las señales tempranas que anticipan incidentes, antes de que se conviertan en costos, sanciones o pérdidas humanas."
        items={[
          {
            icon: 'eye',
            title: 'Falta de visibilidad',
            description: 'Las señales de riesgo existen, pero nadie las está mirando a tiempo.',
          },
          {
            icon: 'message-circle',
            title: 'Comunicación rota',
            description: 'La información no fluye entre terreno y liderazgo cuando más importa.',
          },
          {
            icon: 'shield',
            title: 'Cultura reactiva',
            description: 'Se actúa después del incidente, no antes de que ocurra.',
          },
        ]}
      />
    </main>
  )
}
