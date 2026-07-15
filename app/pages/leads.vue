<script setup lang="ts">
import type { EventLead } from '~~/shared/types/lead'

definePageMeta({ middleware: 'pin' })

const { data: leads, refresh } = await useFetch<EventLead[]>('/api/leads', { default: () => [] })
const { download } = useCsvExport()
const logoUrl = useLogoUrl()

const search = ref('')
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return leads.value
  return leads.value.filter(l => `${l.name} ${l.email} ${l.phone} ${l.company}`.toLowerCase().includes(q))
})
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6">
    <!-- Cabeçalho -->
    <header class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <img
          :src="logoUrl"
          alt="PaintGo"
          class="h-6 w-auto"
        >
        <span class="text-sm text-zinc-500">
          <span class="font-bold text-zinc-950">{{ leads.length }}</span> leads
        </span>
      </div>
      <div class="flex items-center gap-2">
        <AdminConfig @cleared="() => refresh()" />
        <UButton
          class="cursor-pointer"
          color="neutral"
          variant="ghost"
          icon="i-lucide-refresh-cw"
          aria-label="Atualizar"
          @click="() => refresh()"
        />
        <UButton
          class="cursor-pointer"
          icon="i-lucide-download"
          label="Exportar CSV"
          :disabled="!leads.length"
          @click="download(leads)"
        />
      </div>
    </header>

    <UInput
      v-model="search"
      class="mt-4 w-full"
      size="lg"
      icon="i-lucide-search"
      placeholder="Buscar por nome, empresa, e-mail ou telefone..."
    />

    <!-- Tabela -->
    <div class="mt-4 overflow-x-auto rounded-2xl bg-white shadow-lg ring-1 ring-zinc-200">
      <table class="w-full text-left text-sm">
        <thead class="bg-zinc-50 text-zinc-500">
          <tr>
            <th class="px-4 py-3 font-medium">
              Nome
            </th>
            <th class="px-4 py-3 font-medium">
              WhatsApp
            </th>
            <th class="px-4 py-3 font-medium">
              E-mail
            </th>
            <th class="px-4 py-3 font-medium">
              Empresa
            </th>
            <th class="px-4 py-3 font-medium">
              Cadastrado
            </th>
            <th class="px-4 py-3 font-medium" />
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-100">
          <tr
            v-for="lead in filtered"
            :key="lead.id"
            class="text-zinc-600"
          >
            <td class="px-4 py-3 font-medium text-zinc-950">
              {{ lead.name }}
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              {{ lead.phone }}
            </td>
            <td class="px-4 py-3">
              {{ lead.email }}
            </td>
            <td class="px-4 py-3">
              {{ lead.company }}
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-zinc-500">
              {{ new Date(lead.created_at).toLocaleDateString('pt-BR') }}
            </td>
            <td class="px-4 py-3">
              <UIcon
                v-if="lead.won"
                name="i-lucide-trophy"
                class="size-4 text-orange-500"
              />
            </td>
          </tr>
          <tr v-if="!filtered.length">
            <td
              colspan="6"
              class="px-4 py-12 text-center text-zinc-500"
            >
              Nenhum lead {{ search ? 'encontrado' : 'cadastrado ainda' }}.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
