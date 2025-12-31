/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fbf6f3',
        warmgray: '#efebe8',
        forest: '#213a2f',
        navy: '#162836',
        oxblood: '#5a2e2a',
        mutedgold: '#bfa67a',
        brand: '#213a2f'
      },
        boxShadow: {
          'lux': '0 10px 30px rgba(0,0,0,0.45)',
          'soft': '0 6px 18px rgba(33,58,47,0.06)'
        },
        borderRadius: {
          'lg-xl': '1rem'
        },
      fontFamily: {
        heading: ['Cinzel', 'Playfair Display', 'Garamond', 'Georgia', 'serif'],
        body: ['Libre Franklin', 'Inter', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
}
