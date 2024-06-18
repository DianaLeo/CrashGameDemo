// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [['nuxt-plotly', { inject: true }]],
  vite: {
    optimizeDeps: {
      include: ['plotly.js-dist-min'],
    },
  },
})
