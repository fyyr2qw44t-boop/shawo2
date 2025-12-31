module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
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
      fontFamily: {
        heading: ['Playfair Display', 'Garamond', 'Georgia', 'serif'],
        body: ['Libre Franklin', 'Inter', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: [],
}
