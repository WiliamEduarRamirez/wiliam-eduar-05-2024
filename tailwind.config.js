import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Poppins"', ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      'extra-light': '200',
      light: '300',
      normal: '400',
      medium: '500',
      'semi-bold': '600',
      bold: '700',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          500: '#FF6B6B',
          600: '#FF4A4A',
          700: '#FF3030',
        },
        secondary: {
          DEFAULT: '#3B4CCA',
          500: '#3B4CCA',
          600: '#2D3A9F',
          700: '#1E2A73',
        },
        tertiary: '#FFCB05',
      },
      screens: {
        sm: '360px',
        md: '480px',
        lg: '1024px',
        xl: '1440px',
      },
      padding: {
        'spacing-sm-x': '10px',
        'spacing-md-x': '16px',
        'spacing-lg-x': '32px',
        'spacing-xl-x': '48px',
      },
      maxWidth: {
        'dialog-sm': '360px',
        'dialog-md': '480px',
        'dialog-lg': '1024px',
        'dialog-xl': '1440px',
      },
    },
  },
  plugins: [],
};
