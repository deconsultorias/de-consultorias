export type FontFamilyValue =
  'manrope' | 'geist' | 'inter' | 'poppins' | 'lato' | 'montserrat' | 'merriweather'
export type BaseFontSizeValue = 'small' | 'normal' | 'large'
export type HeadingWeightValue = 'normal' | 'semibold' | 'bold'

type FontDefinition = {
  /** Google Fonts CSS2 API family param, e.g. "Inter:wght@400;500;600;700" */
  googleFontParam?: string
  /** CSS font-family value applied via the --font-sans custom property */
  cssStack: string
}

export const fontDefinitions: Record<FontFamilyValue, FontDefinition> = {
  manrope: {
    googleFontParam: 'Manrope:wght@300;400;500;600;700',
    cssStack: '"Manrope", ui-sans-serif, system-ui, sans-serif',
  },
  geist: {
    cssStack: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
  },
  inter: {
    googleFontParam: 'Inter:wght@400;500;600;700',
    cssStack: '"Inter", ui-sans-serif, system-ui, sans-serif',
  },
  poppins: {
    googleFontParam: 'Poppins:wght@400;500;600;700',
    cssStack: '"Poppins", ui-sans-serif, system-ui, sans-serif',
  },
  lato: {
    googleFontParam: 'Lato:wght@400;700;900',
    cssStack: '"Lato", ui-sans-serif, system-ui, sans-serif',
  },
  montserrat: {
    googleFontParam: 'Montserrat:wght@400;500;600;700',
    cssStack: '"Montserrat", ui-sans-serif, system-ui, sans-serif',
  },
  merriweather: {
    googleFontParam: 'Merriweather:wght@400;700;900',
    cssStack: '"Merriweather", ui-serif, Georgia, serif',
  },
}

export const baseFontSizePercent: Record<BaseFontSizeValue, string> = {
  small: '93.75%',
  normal: '100%',
  large: '112.5%',
}

export const headingWeightValue: Record<HeadingWeightValue, string> = {
  normal: '500',
  semibold: '600',
  bold: '700',
}

export const getGoogleFontsHref = (font: FontFamilyValue): string | null => {
  const definition = fontDefinitions[font]
  if (!definition.googleFontParam) return null
  return `https://fonts.googleapis.com/css2?family=${definition.googleFontParam}&display=swap`
}
