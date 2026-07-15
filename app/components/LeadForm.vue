<script setup lang="ts">
import type { FormError } from '@nuxt/ui'

interface FormState {
  name: string
  phone: string
  email: string
  company: string
  website: string // honeypot
}

const state = reactive<FormState>({ name: '', phone: '', email: '', company: '', website: '' })
const loading = ref(false)
const submitted = ref(false)
const toast = useToast()
const logoUrl = useLogoUrl()

// Máscara progressiva de telefone BR: (11) 91234-5678 (celular) ou (11) 1234-5678 (fixo).
function formatPhone(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return d.replace(/(\d{2})(\d+)/, '($1) $2')
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3')
  return d.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3')
}

function validate(s: FormState): FormError[] {
  const errors: FormError[] = []
  if (s.name.trim().length < 3) errors.push({ name: 'name', message: 'Informe seu nome completo.' })
  const digits = s.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 11) errors.push({ name: 'phone', message: 'WhatsApp com DDD. Ex: (11) 91234-5678' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim())) errors.push({ name: 'email', message: 'E-mail inválido.' })
  return errors
}

async function onSubmit() {
  loading.value = true
  try {
    const res = await $fetch<{ success: boolean, duplicate?: boolean }>('/api/leads', { method: 'POST', body: { ...state } })
    if (res.duplicate) {
      toast.add({
        title: 'Já cadastrado!',
        description: 'Este WhatsApp ou e-mail já está participando do sorteio.',
        color: 'warning',
        icon: 'i-lucide-triangle-alert'
      })
      return
    }
    submitted.value = true
  } catch (e) {
    const message = (e as { data?: { message?: string } })?.data?.message ?? 'Não foi possível cadastrar. Tente novamente.'
    toast.add({ title: 'Ops!', description: message, color: 'error', icon: 'i-lucide-triangle-alert' })
  } finally {
    loading.value = false
  }
}

function cadastrarOutra() {
  state.name = ''
  state.phone = ''
  state.email = ''
  state.company = ''
  state.website = ''
  submitted.value = false
}
</script>

<template>
  <!-- Tela de sucesso -->
  <div
    v-if="submitted"
    class="rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-zinc-200"
  >
    <div class="mb-6 flex justify-center">
      <img
        :src="logoUrl"
        alt="PaintGo"
        class="h-5 w-auto"
      >
    </div>
    <hr class="mb-8 border-t border-orange-500">

    <div class="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-orange-50">
      <UIcon
        name="i-lucide-party-popper"
        class="size-8 text-orange-500"
      />
    </div>
    <h2 class="text-2xl font-bold text-zinc-950">
      Cadastro feito!
    </h2>
    <p class="mt-2 text-zinc-500">
      Você está concorrendo ao sorteio. Boa sorte!
    </p>
    <UButton
      class="mt-8 cursor-pointer justify-center"
      size="xl"
      color="neutral"
      variant="outline"
      block
      icon="i-lucide-user-plus"
      label="Cadastrar outra pessoa"
      @click="cadastrarOutra"
    />
  </div>

  <!-- Formulário -->
  <div
    v-else
    class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-zinc-200 sm:p-8"
  >
    <div class="mb-5 flex justify-center">
      <img
        :src="logoUrl"
        alt="PaintGo"
        class="h-8 w-auto"
      >
    </div>
    <hr class="mb-8 border-t border-orange-500">

    <div class="mb-6 text-center">
      <h1 class="text-xl font-bold text-zinc-950 sm:text-2xl">
        Cadastre-se e concorra ao sorteio
      </h1>
      <p class="mt-1 text-sm text-zinc-500">
        Deixe seus dados para participar.
      </p>
    </div>

    <UForm
      :state="state"
      :validate="validate"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField
        label="Nome completo"
        name="name"
        required
      >
        <UInput
          v-model="state.name"
          size="xl"
          class="w-full"
          autocomplete="name"
          autocapitalize="words"
          placeholder="Seu nome"
        />
      </UFormField>

      <UFormField
        label="WhatsApp"
        name="phone"
        required
      >
        <UInput
          :model-value="state.phone"
          size="xl"
          class="w-full"
          type="tel"
          inputmode="tel"
          autocomplete="tel"
          placeholder="(11) 91234-5678"
          @update:model-value="state.phone = formatPhone(String($event))"
        />
      </UFormField>

      <UFormField
        label="E-mail"
        name="email"
        required
      >
        <UInput
          v-model="state.email"
          size="xl"
          class="w-full"
          type="email"
          inputmode="email"
          autocomplete="email"
          autocapitalize="off"
          placeholder="voce@email.com"
        />
      </UFormField>

      <UFormField
        label="Empresa / Oficina"
        name="company"
        hint="Opcional"
      >
        <UInput
          v-model="state.company"
          size="xl"
          class="w-full"
          autocomplete="organization"
          placeholder="Nome da oficina"
        />
      </UFormField>

      <!-- Honeypot anti-bot: fora da tela e do fluxo de tab; humano nunca preenche. -->
      <div
        class="absolute left-[-9999px]"
        aria-hidden="true"
      >
        <label>Não preencha
          <input
            v-model="state.website"
            type="text"
            tabindex="-1"
            autocomplete="off"
          >
        </label>
      </div>

      <UButton
        type="submit"
        class="mt-2 cursor-pointer justify-center"
        size="xl"
        block
        :loading="loading"
        label="Participar do sorteio"
      />

      <p class="text-center text-xs text-zinc-500">
        Ao cadastrar, você concorda em participar do sorteio e receber contato da PaintGo.
      </p>
    </UForm>
  </div>
</template>
