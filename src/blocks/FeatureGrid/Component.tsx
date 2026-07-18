import React from 'react'
import {
  BookOpen,
  Compass,
  Eye,
  Megaphone,
  MessageCircle,
  Repeat,
  Scale,
  Settings,
  Shield,
  Sparkles,
  Sprout,
  type LucideIcon,
} from 'lucide-react'

import type { FeatureGridBlock as FeatureGridBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { HighlightedText } from '@/components/HighlightedText'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Motion/Reveal'
import { StaggerGrid, StaggerItem } from '@/components/Motion/StaggerGrid'
import { cn } from '@/utilities/ui'

const icons: Record<string, LucideIcon> = {
  eye: Eye,
  'message-circle': MessageCircle,
  shield: Shield,
  compass: Compass,
  sprout: Sprout,
  'book-open': BookOpen,
  repeat: Repeat,
  scale: Scale,
  megaphone: Megaphone,
  settings: Settings,
  sparkles: Sparkles,
}

export const FeatureGridBlock: React.FC<FeatureGridBlockProps> = ({
  background,
  eyebrow,
  title,
  titleHighlight,
  intro,
  items,
  link,
}) => {
  if (!items || items.length === 0) return null

  const isDark = background === 'dark'
  const hasPhotoItems = items.some((item) => item.image && typeof item.image !== 'string')

  const content = (
    <div className="container">
      <Reveal className="max-w-2xl mb-10">
        {eyebrow && (
          <p
            className={cn(
              'uppercase tracking-widest text-sm mb-3',
              isDark ? 'text-accent' : 'text-accent',
            )}
          >
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <HighlightedText highlight={titleHighlight} text={title} />
          </h2>
        )}
        {intro && (
          <p className={cn(isDark ? 'text-brand-dark-foreground/70' : 'text-muted-foreground')}>
            {intro}
          </p>
        )}
      </Reveal>

      <StaggerGrid
        className={cn(
          'grid gap-4',
          hasPhotoItems
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
        )}
      >
        {items.map((item, index) => {
          if (item.image && typeof item.image !== 'string') {
            return (
              <StaggerItem
                className="group relative overflow-hidden rounded-lg aspect-[4/5] text-white"
                key={index}
              >
                <Media
                  resource={item.image}
                  fill
                  imgClassName="object-cover transition-opacity duration-300 group-hover:opacity-90"
                  size="33vw"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/90 via-black/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  {item.description && <p className="text-sm text-white/75">{item.description}</p>}
                </div>
              </StaggerItem>
            )
          }

          const Icon = icons[item.icon ?? 'sparkles'] ?? Sparkles

          return (
            <StaggerItem
              className={cn(
                'group rounded-xl p-5 border transition-colors duration-300',
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                  : 'bg-card border-border hover:border-accent/50',
              )}
              key={index}
            >
              <div
                className={cn(
                  'mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-300',
                  isDark
                    ? 'border-accent/40 bg-transparent group-hover:bg-accent/10'
                    : 'border-accent/30 bg-transparent group-hover:bg-accent/10',
                )}
              >
                <Icon className={cn('h-5 w-5', isDark ? 'text-accent' : 'text-accent')} />
              </div>
              <h3 className="font-semibold text-[0.95rem] mb-1.5">{item.title}</h3>
              {item.description && (
                <p
                  className={cn(
                    'text-sm leading-snug',
                    isDark ? 'text-brand-dark-foreground/60' : 'text-muted-foreground',
                  )}
                >
                  {item.description}
                </p>
              )}
            </StaggerItem>
          )
        })}
      </StaggerGrid>

      {link && (
        <div className="mt-10 flex justify-center">
          <CMSLink
            appearance="outline"
            className={cn(
              isDark &&
                'border-white/25 bg-transparent text-white hover:bg-accent hover:text-accent-foreground hover:border-accent',
            )}
            {...link}
          />
        </div>
      )}
    </div>
  )

  if (!isDark) return <div className="py-14 md:py-20">{content}</div>

  return <div className="bg-brand-dark text-brand-dark-foreground py-14 md:py-20">{content}</div>
}
