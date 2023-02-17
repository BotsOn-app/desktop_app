/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'original-dark': '#202225',
        'original-purple': '#5865F2',
        'original-light-purple': '#949CF7',
        'original-red': '#ED4245',
        'original-yellow': '#F7DE52',
        'original-nitro-pink': '#FF6BFA',
        'original-gray': '#23272B',
        'original-light-gray': '#40444B'
      },
      fontFamily: {
        'prompt': ['Prompt']
      }
    },

  },
  plugins: [],
}
