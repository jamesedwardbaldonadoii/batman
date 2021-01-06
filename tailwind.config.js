const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    enabled: false,
    content: [
      './src/pages/**/*.vue',
      './src/layout/**/*.vue',
      './src/components/**/*.vue',
      './src/scss/**/*.scss'
    ]
  },
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      gray: colors.blueGray,
      green: colors.emerald,
      red: colors.rose,
      blue: colors.lightBlue,
      orange: colors.orange,
      teal: colors.teal
    },
    extend: {
      borderWidth: {
        5: '5px'
      },
      zIndex: {
        '-1': -1
      },
      transitionDuration: {
        0: '0ms'
      },
      transitionProperty: {
        borderRadius: 'border-radius',
        background: 'background'
      },
      animation: {
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: 1
          },
          '50%': {
            opacity: 0
          }
        }
      }
    }
  },
  variants: {
  },
  plugins: []
};
