import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getCachedGlobal } from '@/utilities/getGlobals'
import {
  baseFontSizePercent,
  fontDefinitions,
  getGoogleFontsHref,
  headingWeightValue,
  type BaseFontSizeValue,
  type FontFamilyValue,
  type HeadingWeightValue,
} from '@/utilities/typographyOptions'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const typography = await getCachedGlobal('typography', 0)()

  const fontFamily = (typography?.fontFamily || 'geist') as FontFamilyValue
  const baseFontSize = (typography?.baseFontSize || 'normal') as BaseFontSizeValue
  const headingWeight = (typography?.headingWeight || 'semibold') as HeadingWeightValue

  const googleFontHref = getGoogleFontsHref(fontFamily)

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang="es"
      style={
        {
          '--font-sans': fontDefinitions[fontFamily].cssStack,
          fontSize: baseFontSizePercent[baseFontSize],
        } as React.CSSProperties
      }
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/brand/logo-icon.png" rel="icon" sizes="512x512" type="image/png" />
        {googleFontHref && (
          <>
            <link href="https://fonts.googleapis.com" rel="preconnect" />
            <link href={googleFontHref} rel="stylesheet" />
          </>
        )}
        <style>{`h1, h2, h3, h4, h5, h6 { font-weight: ${headingWeightValue[headingWeight]}; }`}</style>
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
