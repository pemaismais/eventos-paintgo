<script setup lang="ts">
useHead({
  title: 'PaintGo Eventos',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'robots', content: 'noindex' } // app de estande, fora de indexação
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'pt-BR'
  }
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
