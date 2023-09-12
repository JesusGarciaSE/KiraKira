import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        fontColor: '#e7e7e7',
        backgroundColor: '#131313',
        ZeroOnePrimary: '#dcf600',
        ZeroOneSecondary: '#ff000',
        ZeroOneFont: '#131313',
        SaberPrimary: '#ff0000',
        SaberSecondary: '#d2c3c3',
        SaberFont: '#e7e7e7',
        oldWhite: '#e7e7e7',
        oldBlack: '#131313',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        font: 'var(font)',
        navIcon: 'var(--nav-icon)',
        navClose: 'var(--nav-close)',
        displayLabel: 'var(--nav-icon)',
        saleHighlight: 'var(--sale)',
        saleMarkdown: 'var(--strike)',
        favoriteFill: 'var(--favorite-fill)'
      },
      fontFamily: {
        custom: ['Share Tech','Roboto', 'sans-serif']
      },
      dropShadow: {
        'custom': '0 0 5px var(--primary)'
      },
      maxWidth: {
        'half': '50%',
        'screen': '100vw'
      },
      minWidth: {
        'half': '50%'
      },
      gradientColorStops: {
        'kira-bg-start': 'var(--bg-start)',
        'kira-bg-through': 'var(--bg-via)',
        'kira-bg-end': 'var(--bg-end)',
        'kira-hlogo-start': 'var(--h-logo-start)',
        'kira-hlogo-through': 'var(--h-logo-via)',
        'kira-hlogo-end': 'var(--h-logo-end)',
        'kira-slogo-start': 'var(--s-logo-start)',
        'kira-slogo-through': 'var(--s-logo-via)',
        'kira-slogo-end': 'var(--s-logo-end)',
      }
    },
  },
  plugins: [],
} satisfies Config

