import React from 'react'
import {
  HardHat,
  Layers,
  Repeat,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'

import type { MethodologyBlock as MethodologyBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { HighlightedText } from '@/components/HighlightedText'
import { Reveal } from '@/components/Motion/Reveal'

const icons: Record<string, LucideIcon> = {
  search: Search,
  layers: Layers,
  users: Users,
  'hard-hat': HardHat,
  repeat: Repeat,
  'shield-check': ShieldCheck,
  sparkles: Sparkles,
}

const positions = [
  'top-0 left-1/2 -translate-x-1/2 text-center items-center',
  'top-1/2 right-0 -translate-y-1/2 text-left items-start',
  'bottom-0 left-1/2 -translate-x-1/2 text-center items-center',
  'top-1/2 left-0 -translate-y-1/2 text-right items-end',
]

export const MethodologyBlock: React.FC<MethodologyBlockProps> = ({
  eyebrow,
  title,
  titleHighlight,
  intro,
  steps,
  link,
}) => {
  if (!steps || steps.length === 0) return null

  const visibleSteps = steps.slice(0, 4)

  return (
    <section className="bg-card py-14 md:py-20 scroll-mt-24" id="metodologia">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <Reveal className="max-w-xl">
          {eyebrow && (
            <p className="uppercase tracking-widest text-sm text-accent mb-3">{eyebrow}</p>
          )}
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-foreground">
              <HighlightedText highlight={titleHighlight} text={title} />
            </h2>
          )}
          {intro && <p className="text-muted-foreground mb-6">{intro}</p>}
          {link && <CMSLink className="font-semibold" {...link} appearance="link" />}
        </Reveal>

        {/* Mobile: simple 2x2 grid, no absolute positioning */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:hidden">
          {visibleSteps.map((step, index) => {
            const Icon = icons[step.icon ?? 'sparkles'] ?? Sparkles

            return (
              <div className="flex flex-col" key={index}>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg border border-accent/40 bg-background">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold text-sm mb-1 text-foreground">{step.title}</h3>
                {step.description && (
                  <p className="text-xs text-muted-foreground leading-snug">{step.description}</p>
                )}
              </div>
            )
          })}
        </div>

        {/* Tablet and up: circular diagram */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-xs sm:block md:max-w-sm">
          <svg
            className="absolute inset-0 h-full w-full text-border"
            fill="none"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="currentColor"
              strokeDasharray="1 5"
              strokeLinecap="round"
              strokeWidth="1"
            />
          </svg>

          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent/10 border border-accent/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="h-8 w-8 object-contain" src="/brand/logo-icon.png" />
          </div>

          {visibleSteps.map((step, index) => {
            const Icon = icons[step.icon ?? 'sparkles'] ?? Sparkles

            return (
              <div
                className={`group absolute flex w-28 md:w-32 flex-col ${positions[index % 4]}`}
                key={index}
              >
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg border border-accent/40 bg-background transition-colors duration-300 group-hover:bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold text-sm mb-1 text-foreground">{step.title}</h3>
                {step.description && (
                  <p className="text-xs text-muted-foreground leading-snug">{step.description}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
