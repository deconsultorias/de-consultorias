'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { Menu, SearchIcon, X } from 'lucide-react'

const collectionPathPrefixes: Record<string, string> = {
  pages: '',
  posts: '/posts',
  services: '/servicios',
}

const resolveHref = (link: NonNullable<HeaderType['navItems']>[number]['link']): string | null => {
  if (
    link.type === 'reference' &&
    link.reference &&
    typeof link.reference.value === 'object' &&
    link.reference.value
  ) {
    const slug = (link.reference.value as { slug?: string }).slug
    if (!slug) return null
    return `${collectionPathPrefixes[link.reference.relationTo] ?? ''}/${slug}`
  }
  return link.url || null
}

const isLinkActive = (pathname: string, href: string | null): boolean => {
  if (!href || href.includes('#')) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <nav className="hidden md:flex gap-6 items-center">
        {navItems.map(({ link }, i) => {
          const active = isLinkActive(pathname, resolveHref(link))
          return (
            <CMSLink
              className={cn(
                'relative pb-1 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent after:transition-transform after:duration-300',
                active
                  ? 'text-accent after:scale-x-100'
                  : 'after:scale-x-0 hover:after:scale-x-100',
              )}
              key={i}
              {...link}
              appearance="link"
            />
          )
        })}
        <Link href="/search">
          <span className="sr-only">Buscar</span>
          <SearchIcon className="w-5 text-primary" />
        </Link>
      </nav>

      <button
        aria-expanded={open}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        className="md:hidden"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {open ? <X className="w-6" /> : <Menu className="w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="md:hidden absolute left-0 right-0 top-full bg-background border-b border-border shadow-lg overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container flex flex-col gap-4 py-6">
              {navItems.map(({ link }, i) => {
                const active = isLinkActive(pathname, resolveHref(link))
                return (
                  <CMSLink
                    className={cn('text-lg', active && 'text-accent')}
                    key={i}
                    {...link}
                    appearance="link"
                  />
                )
              })}
              <Link className="text-lg" href="/search">
                Buscar
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
