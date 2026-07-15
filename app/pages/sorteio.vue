<script setup lang="ts">
import type { EventLead } from '~~/shared/types/lead'

definePageMeta({ middleware: 'pin' })

const pool = ref<EventLead[]>([])
const phase = ref<'idle' | 'spinning' | 'revealed'>('idle')
const winner = ref<EventLead | null>(null)
const loading = ref(true)
const logoUrl = useLogoUrl()

async function loadPool() {
  loading.value = true
  try {
    const leads = await $fetch<EventLead[]>('/api/leads')
    pool.value = leads.filter(l => !l.won)
  } finally {
    loading.value = false
  }
}

function randInt(n: number): number {
  const a = new Uint32Array(1)
  crypto.getRandomValues(a)
  return a[0]! % n
}

function sortear() {
  if (!pool.value.length) return
  winner.value = pool.value[randInt(pool.value.length)]!
  phase.value = 'spinning'
}

async function onRevealed() {
  phase.value = 'revealed'
  const w = winner.value
  if (!w) return
  // Remove da piscina em memória ANTES do request: garante "sem repetir" mesmo se a rede falhar.
  pool.value = pool.value.filter(l => l.id !== w.id)
  await $fetch(`/api/leads/${w.id}/win`, { method: 'POST' }).catch(() => {})
}

function proximo() {
  winner.value = null
  phase.value = 'idle'
}

const names = computed(() => pool.value.map(l => l.name))

onMounted(loadPool)
</script>

<template>
  <main class="flex min-h-screen flex-col px-4 py-6">
    <!-- Cabeçalho -->
    <header class="mx-auto flex w-full max-w-2xl items-center justify-between gap-4">
      <img
        :src="logoUrl"
        alt="PaintGo"
        class="h-6 w-auto shrink-0"
      >
      <div class="flex items-center gap-3">
        <span class="text-sm text-zinc-500">
          <span class="font-bold text-zinc-950">{{ pool.length }}</span> na disputa
        </span>
        <UButton
          class="cursor-pointer"
          size="sm"
          color="neutral"
          variant="ghost"
          icon="i-lucide-refresh-cw"
          :loading="loading"
          aria-label="Atualizar lista"
          @click="loadPool"
        />
        <AdminConfig @cleared="loadPool" />
      </div>
    </header>

    <!-- Palco do sorteio -->
    <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 py-8">
      <template v-if="loading">
        <div class="flex justify-center py-20 text-zinc-500">
          <UIcon
            name="i-lucide-loader-circle"
            class="size-8 animate-spin"
          />
        </div>
      </template>

      <!-- Sem ninguém elegível -->
      <template v-else-if="!pool.length && phase !== 'revealed'">
        <div class="rounded-2xl bg-white shadow-lg ring-1 ring-zinc-200 p-10 text-center">
          <UIcon
            name="i-lucide-party-popper"
            class="mx-auto mb-3 size-10 text-orange-500"
          />
          <p class="text-xl font-bold text-zinc-950">
            Todos os prêmios sorteados!
          </p>
          <p class="mt-1 text-zinc-500">
            Não há mais participantes na disputa.
          </p>
        </div>
      </template>

      <!-- Reel girando -->
      <template v-else-if="phase === 'spinning' && winner">
        <RaffleReel
          :names="names"
          :winner-name="winner.name"
          @done="onRevealed"
        />
      </template>

      <!-- Ganhador revelado -->
      <template v-else-if="phase === 'revealed' && winner">
        <WinnerCard
          :name="winner.name"
          :company="winner.company"
        />
        <div class="flex flex-col gap-4 sm:flex-row mt-6">
          <UButton
            v-if="pool.length"
            class="flex-1 cursor-pointer justify-center text-lg font-bold !rounded-2xl"
            size="xl"
            color="primary"
            icon="i-lucide-refresh-cw"
            label="Sortear próximo"
            @click="proximo"
          />
          <UButton
            class="flex-1 cursor-pointer justify-center text-lg font-bold bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/60 hover:bg-zinc-50 !rounded-2xl"
            size="xl"
            variant="solid"
            color="neutral"
            to="/leads"
            icon="i-lucide-list"
            label="Ver lista"
          />
        </div>
      </template>

      <!-- Pronto pra sortear -->
      <template v-else>
        <div class="flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-16 shadow-sm ring-1 ring-zinc-200/60">
          <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
            <UIcon
              name="i-lucide-shuffle"
              class="size-7"
            />
          </div>
          <p class="text-xl text-zinc-600">
            Pronto para sortear
          </p>
          <p class="text-sm text-zinc-400 mt-3">
            Clique no botão abaixo para iniciar
          </p>
        </div>
        <UButton
          class="cursor-pointer justify-center text-lg font-bold mt-6 !rounded-2xl"
          size="xl"
          block
          icon="i-lucide-sparkles"
          label="Sortear"
          @click="sortear"
        />
      </template>
    </div>
  </main>
</template>
