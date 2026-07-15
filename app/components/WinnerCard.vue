<script setup lang="ts">
defineProps<{ name: string, company: string }>()
</script>

<template>
  <div class="animate-[pulse_0.6s_ease-out_1]">
    <div class="text-center mb-4">
      <span class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-orange-500">
        <UIcon
          name="i-lucide-party-popper"
          class="size-4"
        />
        GANHADOR
      </span>
    </div>
    <div class="flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-zinc-200/60 border-t-[4px] border-orange-500">
      <div class="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500">
        <UIcon
          name="i-lucide-trophy"
          class="size-8"
        />
      </div>

      <p class="text-4xl font-extrabold break-words text-zinc-950 sm:text-5xl">
        {{ name }}
      </p>
      <p
        v-if="company"
        class="mt-3 text-lg text-zinc-500"
      >
        {{ company }}
      </p>
    </div>
  </div>
</template>
