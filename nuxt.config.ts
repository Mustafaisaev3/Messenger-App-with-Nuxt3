// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss', 
    'shadcn-nuxt',
    '@sidebase/nuxt-auth',
    'nuxt-icon',
    '@davestewart/nuxt-scrollbar',
    '@pinia/nuxt',
  ],
  extends: ['nuxt-emoji'],
  components: [
    {
      path: '~/components/ui',
      extensions: ['.vue'],
      prefix: ''
    },
  ],
  auth: {
    provider: {
      type: 'authjs'
    }
  },
  runtimeConfig: {
    authSecret: '',
    githubId: 'e0042b98bdde6545ee56',
    githubSecret: '31c2c8c698a268acf2d09e22d95166e7d23959b6',
    googleId: '333101147983-09em4huvbaid9sgdb54eg69caqfdukgi.apps.googleusercontent.com',
    googleSecret: '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',
    authOrigin: ''
  }
})
