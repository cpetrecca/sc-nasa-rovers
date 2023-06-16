/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        moveHorizontal: {
          '0%%': { transform: 'rotate(-2deg) translate(0rem, -2em)' },
          '50%': { transform: 'rotate(2deg) translate(10rem, -2.5em) scale(0.5)' },
          '100%%': { transform: 'rotate(-2deg) translate(0rem, -2em)' },
        }
      },
      animation: {
        moveRover: 'moveHorizontal 20s ease-in-out 4s 1'
      },
      colors:{
        nasa:{blue:"#0B3D91"},
        mars:{land:"#FF5F40"},
      }


    },
  },
  plugins: [],
}
