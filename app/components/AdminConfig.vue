<script setup lang="ts">
const emit = defineEmits<{ cleared: [] }>()
const open = ref(false)
const loading = ref(false)
const toast = useToast()

async function apagarTudo() {
  loading.value = true
  try {
    await $fetch('/api/leads', { method: 'DELETE' })
    toast.add({ title: 'Leads apagados', description: 'A tabela foi zerada.', color: 'success', icon: 'i-lucide-check' })
    open.value = false
    emit('cleared')
  } catch {
    toast.add({ title: 'Erro', description: 'Não foi possível apagar os leads.', color: 'error', icon: 'i-lucide-triangle-alert' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Configurações"
    description="Ações de administração do evento."
  >
    <UButton
      class="cursor-pointer"
      size="sm"
      color="neutral"
      variant="ghost"
      icon="i-lucide-settings"
      aria-label="Configurações"
    />

    <template #body>
      <div class="rounded-xl bg-red-50 p-4 ring-1 ring-red-200">
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-triangle-alert"
            class="mt-0.5 size-5 shrink-0 text-red-500"
          />
          <div>
            <p class="font-semibold text-zinc-950">
              Apagar todos os leads
            </p>
            <p class="mt-1 text-sm text-zinc-600">
              Remove <strong>todos</strong> os cadastros da tabela. Use para zerar antes ou depois de um teste. Esta ação não pode ser desfeita.
            </p>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex w-full justify-end gap-3">
        <UButton
          class="cursor-pointer"
          color="neutral"
          variant="ghost"
          label="Cancelar"
          @click="open = false"
        />
        <UButton
          class="cursor-pointer"
          color="error"
          icon="i-lucide-trash-2"
          label="Apagar todos os leads"
          :loading="loading"
          @click="apagarTudo"
        />
      </div>
    </template>
  </UModal>
</template>
