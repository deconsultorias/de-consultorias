import React from 'react'
import { ArrowRight, Users } from 'lucide-react'

import type { ComparisonBlock as ComparisonBlockProps } from '@/payload-types'

import { Reveal } from '@/components/Motion/Reveal'

export const ComparisonBlock: React.FC<ComparisonBlockProps> = ({
  eyebrow,
  titleNormal,
  titleAccent,
  description,
  traditionalLabel,
  approachLabel,
  rows,
  diagramTopLabel,
  diagramBottomLabel,
}) => {
  if (!rows || rows.length === 0) return null

  return (
    <section className="bg-background py-14 md:py-20">
      <div className="container grid grid-cols-1 lg:grid-cols-[0.8fr_1fr_0.5fr] gap-10 items-center">
        <Reveal>
          {eyebrow && (
            <p className="uppercase tracking-widest text-sm text-accent mb-3">{eyebrow}</p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-foreground">
            {titleNormal && <span className="block">{titleNormal}</span>}
            {titleAccent && <span className="block text-accent">{titleAccent}</span>}
          </h2>
          {description && <p className="text-muted-foreground max-w-lg">{description}</p>}
        </Reveal>

        <Reveal delay={0.05} className="rounded-xl border border-border overflow-hidden bg-card">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center bg-muted text-xs uppercase tracking-widest text-muted-foreground">
            <div className="px-3 py-3 sm:px-5">{traditionalLabel}</div>
            <div className="w-6 sm:w-8" />
            <div className="px-3 py-3 sm:px-5">{approachLabel}</div>
          </div>
          {rows.map((row, index) => (
            <div
              className="grid grid-cols-[1fr_auto_1fr] items-center border-t border-border text-xs sm:text-sm"
              key={index}
            >
              <div className="px-3 py-4 text-muted-foreground sm:px-5">{row.traditional}</div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted sm:h-7 sm:w-7">
                <ArrowRight className="h-3 w-3 text-accent sm:h-3.5 sm:w-3.5" />
              </div>
              <div className="px-3 py-4 font-medium text-foreground sm:px-5">{row.approach}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">{diagramTopLabel}</span>
          </div>

          <div className="h-8 w-px border-l border-dashed border-border" />

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <span className="text-sm font-semibold text-foreground text-center max-w-[8rem]">
              {diagramBottomLabel}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
