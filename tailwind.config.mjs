/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--foreground)',
              '--tw-prose-headings': 'var(--foreground)',
              '--tw-prose-bold': 'var(--foreground)',
              '--tw-prose-links': 'var(--foreground)',
              '--tw-prose-bullets': 'var(--muted-foreground)',
              lineHeight: '1.4',
              h1: {
                fontWeight: '700',
                lineHeight: '1.15',
                marginBottom: '0.25em',
              },
              h2: {
                fontWeight: '700',
                lineHeight: '1.2',
              },
              h3: {
                fontWeight: '600',
                lineHeight: '1.25',
              },
              h4: {
                fontWeight: '600',
                lineHeight: '1.3',
              },
              p: {
                lineHeight: '1.4',
              },
            },
          ],
        },
        base: {
          css: [
            {
              fontSize: '1.05rem',
              h1: {
                fontSize: '2.75rem',
              },
              h2: {
                fontSize: '2rem',
              },
              h3: {
                fontSize: '1.5rem',
              },
              h4: {
                fontSize: '1.25rem',
              },
            },
          ],
        },
        md: {
          css: [
            {
              fontSize: '1.25rem',
              h1: {
                fontSize: '4rem',
              },
              h2: {
                fontSize: '3rem',
              },
              h3: {
                fontSize: '2.125rem',
              },
              h4: {
                fontSize: '1.625rem',
              },
            },
          ],
        },
      },
    },
  },
}

export default config
