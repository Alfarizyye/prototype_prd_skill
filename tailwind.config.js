/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kai: {
          blue: '#1D3F7A',
          dark: '#132B54',
          navy: '#0E1F3D',
          orange: '#ED6B23',
          lightBlue: '#E8F0FE',
          subtle: '#F4F7FC',
          border: '#D8E2F0',
          accent: '#FF7300',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
