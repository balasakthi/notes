// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-primevue", "@pinia/nuxt"],
  primevue: {
    options: { ripple: true },
  },
  css: [
    "primevue/resources/themes/aura-light-green/theme.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
    "assets/css/normalize.css",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
