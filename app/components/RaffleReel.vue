<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ names: string[], winnerName: string }>()
const emit = defineEmits<{ done: [] }>()

const items = ref<string[]>([])
const steps = 45 // número de blocos para rolar antes do ganhador
const spinning = ref(false)
const currentOffset = ref(0)
const blurAmount = ref(0)

// Aleatoriedade honesta (não Math.random) — é um sorteio de verdade na frente do público.
function randInt(n: number): number {
  const a = new Uint32Array(1)
  crypto.getRandomValues(a)
  return a[0]! % n
}

onMounted(() => {
  // Gerar a fita (tape) de nomes aleatórios com o ganhador no final
  const tape: string[] = []
  for (let i = 0; i < steps; i++) {
    tape.push(props.names.length ? props.names[randInt(props.names.length)]! : props.winnerName)
  }
  tape.push(props.winnerName)
  items.value = tape

  // Aguardar a renderização inicial
  setTimeout(() => {
    const itemHeight = 64 // 4rem correspondente a h-16
    const totalDistance = steps * itemHeight

    spinning.value = true
    currentOffset.value = -totalDistance
    blurAmount.value = 1.5

    // Retira o blur suavemente perto do fim (aos 4.5s de 6.5s)
    setTimeout(() => {
      blurAmount.value = 0
    }, 4500)

    // Finaliza quando a transição CSS acabar
    setTimeout(() => {
      spinning.value = false
      emit('done')
    }, 6500)
  }, 50)
})
</script>

<template>
  <div class="relative flex h-44 w-full overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-zinc-200">
    <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent" />
    <div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent" />

    <!-- Reel Container com Animação CSS Pura (Deslizamento Vertical) -->
    <div
      class="absolute left-0 right-0 w-full pt-[56px]"
      :style="{
        transform: `translateY(${currentOffset}px)`,
        filter: `blur(${blurAmount}px)`,
        transitionProperty: 'transform, filter',
        transitionDuration: spinning ? '6.5s, 1.5s' : '0s, 0s',
        transitionTimingFunction: 'cubic-bezier(0.15, 1.0, 0.0, 1.0), ease-out'
      }"
    >
      <div
        v-for="(name, idx) in items"
        :key="idx"
        class="flex h-16 w-full items-center justify-center px-4"
      >
        <span class="truncate text-center text-3xl font-extrabold text-orange-500 sm:text-5xl">
          {{ name }}
        </span>
      </div>
    </div>
  </div>
</template>
