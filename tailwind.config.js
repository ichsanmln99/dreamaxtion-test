/** @type {import('tailwindcss').Config} */
import daisyUi from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [daisyUi],
  daisyui: {
    themes: [
      {
        cinema: {
          primary: '#e00d33',
          'primary-focus': '#c70a30',
          'primary-content': '#ffffff',

          secondary: '#ebebeb',
          'secondary-focus': '#cfcfcf',
          'secondary-content': '#211d37',

          accent: '#f0bd33',
          'accent-focus': '#e1a523',
          'accent-content': '#532d09',

          neutral: '#211d37',
          'neutral-focus': '#1a172c',
          'neutral-content': '#ffffff',

          'base-100': '#09090b',
          'base-200': '#0e0e11',
          'base-300': '#131317',
          'base-content': '#ffffff',

          info: '#71a5ea',
          success: '#3db25a',
          warning: '#e1d356',
          error: '#ff6b6b',

          '--rounded-box': '1rem',
          '--rounded-btn': '5rem',
          '--rounded-badge': '1.9rem',

          '--animation-btn': '.25s',
          '--animation-input': '.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px'
        }
      }
    ]
  }
}
