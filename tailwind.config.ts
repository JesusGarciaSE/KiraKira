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
        font: 'var(font)'
      },
      fontFamily: {
        custom: ['Share Tech','Roboto', 'sans-serif']
      },
      dropShadow: {
        'custom': '0 0 5px var(--primary)'
      },
      maxWidth: {
        'half': '50%'
      },
      minWidth: {
        'half': '50%'
      }
    },
  },
  plugins: [],
} satisfies Config

