import { Linkedin } from 'lucide-react'
import React from 'react'

import type { TeamBlock as TeamBlockProps } from '@/payload-types'

import { HighlightedText } from '@/components/HighlightedText'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Motion/Reveal'
import { StaggerGrid, StaggerItem } from '@/components/Motion/StaggerGrid'

export const TeamBlock: React.FC<TeamBlockProps> = ({
  eyebrow,
  title,
  titleHighlight,
  intro,
  members,
}) => {
  if (!members || members.length === 0) return null

  return (
    <section className="bg-background py-14 md:py-20">
      <div className="container">
        <Reveal className="max-w-2xl mb-12">
          {eyebrow && (
            <p className="uppercase tracking-widest text-sm text-accent mb-3">{eyebrow}</p>
          )}
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <HighlightedText highlight={titleHighlight} text={title} />
            </h2>
          )}
          {intro && <p className="text-muted-foreground">{intro}</p>}
        </Reveal>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <StaggerItem key={index}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-4">
                {member.photo && typeof member.photo !== 'string' && (
                  <Media resource={member.photo} fill imgClassName="object-cover" size="25vw" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                {member.linkedin && (
                  <a
                    aria-label={`LinkedIn de ${member.name}`}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
                    href={member.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              <p className="text-sm text-accent font-medium mb-2">{member.role}</p>
              {member.bio && (
                <p className="text-sm text-muted-foreground leading-snug">{member.bio}</p>
              )}
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}
