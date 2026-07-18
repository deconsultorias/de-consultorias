import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
}

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const resourceItems = footerData?.resourceItems || []
  const socialLinks = footerData?.socialLinks || []
  const ctaLink = footerData?.ctaLink

  return (
    <footer className="mt-auto bg-brand-dark text-brand-dark-foreground">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Logo />
          {footerData?.description && (
            <p className="mt-4 text-sm text-brand-dark-foreground/60 max-w-xs">
              {footerData.description}
            </p>
          )}
          {socialLinks.length > 0 && (
            <div className="flex gap-3 mt-5">
              {socialLinks.map((social, i) => {
                const Icon = social.platform ? socialIcons[social.platform] : null
                if (!Icon || !social.url) return null
                return (
                  <a
                    aria-label={social.platform}
                    className="text-brand-dark-foreground/60 hover:text-accent transition-colors duration-300"
                    href={social.url}
                    key={i}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <p className="uppercase tracking-widest text-xs text-brand-dark-foreground/50 mb-4">
            Navegación
          </p>
          <nav className="flex flex-col gap-3">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink
                  className="text-sm text-brand-dark-foreground/80 hover:text-accent transition-colors duration-300"
                  key={i}
                  {...link}
                />
              )
            })}
          </nav>
        </div>

        {resourceItems.length > 0 && (
          <div>
            <p className="uppercase tracking-widest text-xs text-brand-dark-foreground/50 mb-4">
              Recursos
            </p>
            <nav className="flex flex-col gap-3">
              {resourceItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="text-sm text-brand-dark-foreground/80 hover:text-accent transition-colors duration-300"
                    key={i}
                    {...link}
                  />
                )
              })}
            </nav>
          </div>
        )}

        <div>
          <p className="uppercase tracking-widest text-xs text-brand-dark-foreground/50 mb-4">
            Conversemos
          </p>
          {footerData?.ctaText && (
            <p className="text-sm text-brand-dark-foreground/80 mb-4">{footerData.ctaText}</p>
          )}
          {ctaLink && <CMSLink appearance="default" {...ctaLink} />}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-6 text-xs text-brand-dark-foreground/50 flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} DE Consultorías. Todos los derechos reservados.</p>
          <Link className="hover:text-accent transition-colors duration-300" href="/admin">
            Acceso administradores
          </Link>
        </div>
      </div>
    </footer>
  )
}
