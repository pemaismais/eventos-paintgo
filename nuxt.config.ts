// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/supabase'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // Tema claro fixo (sem alternância de dark mode), igual ao site.
  ui: {
    colorMode: false
  },

  // Nuxt sobrescreve automaticamente via env NUXT_EVENT_ADMIN_PIN (não precisa de process.env aqui).
  runtimeConfig: {
    eventAdminPin: ''
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // redirect:false → a página de cadastro é pública; a proteção da área da equipe é por PIN próprio.
  supabase: {
    redirect: false
  }
})
