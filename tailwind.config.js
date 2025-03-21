/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    safelist: [
      {
        pattern: /(bg||border|ring|outline|text)-(gray-dark|gray-text-light|accent-1|accent-2|accent-3|accent-4|accent-5)/,
        variants: ['before', 'after'],
      },
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'primary': 'Inter, Arial, sans-serif'
    },
    colors : {
      black: '#18181B',
      'black-hover': '#343434',
      white: '#FFFFFF',
      bg: '#FAFAFA',
      'line-color': '#E4E4E7',
      'gray-text': '#71717A',
      'gray-text-light': '#B3B3B3',
      'gray-light': '#F5F5F5',
      'gray-dark': '#DCDCDC',
      error : '#F58771',
      transparent: 'transparent',
      'accent-1': '#FFC52D',
      'accent-2': '#F58771',
      'accent-3': '#B58EFF',
      'accent-4': '#7FB0FB',
      'accent-5': '#CCE93B',
    },
    extend: {
      spacing: {
        'button-x': '1rem',
        'button-y': '0.5rem',
      },
      strokeWidth: {
        'icon-width': '1.33px',
      },
      borderRadius: {
        'button-rounded': '0.375rem',
        'card-rounded': '1rem',
        'full': '9999px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

