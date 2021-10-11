module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      yellow: {
        dark: '#FFEC51'
      },
      'text-color': {
        paragraf: '#717171',
        title: '#383638'
      },
      box: {
        default: '#FDFDFD',
        success: '#51FF77',
        danger: '#FF5151'
      },
      button: {
        dark: '#393638',
        'dark-alt': '#5F5C5F',
        white: '#fff'
      },
      white: '#fff'
    },
    boxShadow: {
      trakteer: '9px 8px 0px -1px rgba(56,54,56, 1)',
      'btn-trakteer': '8px 7px 0px -1px rgba(56,54,56, 1)',
      'btn-trakteer-alt': '6px 5px 0px -1px rgba(56,54,56, 1)',
      'trakteer-alt': '0px 0px 0px -1px rgba(56,54,56, 1)'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
  ],
}
