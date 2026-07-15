<script setup lang="ts">
const pin = ref('')
const loading = ref(false)
const toast = useToast()
const route = useRoute()
const logoUrl = useLogoUrl()

async function onSubmit() {
  loading.value = true
  try {
    await $fetch('/api/equipe/login', { method: 'POST', body: { pin: pin.value } })
    await navigateTo((route.query.redirect as string) || '/sorteio')
  } catch {
    toast.add({ title: 'PIN incorreto', description: 'Tente novamente.', color: 'error', icon: 'i-lucide-lock' })
    pin.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center px-4 py-8">
    <div class="w-full max-w-sm">
      <div class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-zinc-200 sm:p-8">
        <div class="mb-5 flex justify-center">
          <img
            :src="logoUrl"
            alt="PaintGo"
            class="h-8 w-auto"
          >
        </div>
        <hr class="mb-8 border-t border-orange-500">

        <div class="mb-6 text-center">
          <h1 class="text-xl font-bold text-zinc-950">
            Acesso Restrito
          </h1>
          <p class="mt-1 text-sm text-zinc-500">
            Digite o PIN para acessar o sorteio.
          </p>
        </div>

        <UForm
          :state="{ pin }"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField
            label="PIN"
            name="pin"
          >
            <UInput
              v-model="pin"
              size="xl"
              class="w-full"
              type="password"
              inputmode="numeric"
              autocomplete="off"
              placeholder="••••"
            />
          </UFormField>

          <UButton
            type="submit"
            class="cursor-pointer justify-center"
            size="xl"
            block
            :loading="loading"
            :disabled="!pin"
            label="Entrar"
          />
        </UForm>
      </div>

      <div class="mt-8 text-center">
        <a
          href="https://www.paintgobrasil.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-slate-400 hover:text-slate-500 transition-colors"
        >
          www.paintgobrasil.com
        </a>
      </div>
    </div>
  </main>
</template>
