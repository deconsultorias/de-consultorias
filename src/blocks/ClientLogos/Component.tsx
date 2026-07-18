import React from 'react'

import type { ClientLogosBlock as ClientLogosBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { Reveal } from '@/components/Motion/Reveal'

type Client = NonNullable<ClientLogosBlockProps['clients']>[number]

const LogoItem: React.FC<{ client: Client }> = ({ client }) => {
  if (client.logo && typeof client.logo !== 'string') {
    return (
      <div className="relative h-12 w-32 shrink-0">
        <Media resource={client.logo} fill imgClassName="object-contain" size="150px" />
      </div>
    )
  }

  return (
    <span className="shrink-0 text-lg font-semibold text-foreground/70 tracking-tight whitespace-nowrap">
      {client.name}
    </span>
  )
}

export const ClientLogosBlock: React.FC<ClientLogosBlockProps> = ({ title, clients }) => {
  if (!clients || clients.length === 0) return null

  return (
    <div className="bg-muted border-y border-border/60 py-10">
      {title && (
        <Reveal className="container" direction="none">
          <p className="uppercase tracking-widest text-sm text-muted-foreground text-center mb-8">
            {title}
          </p>
        </Reveal>
      )}
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16 hover:[animation-play-state:paused]">
          {[...clients, ...clients].map((client, index) => (
            <LogoItem client={client} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
