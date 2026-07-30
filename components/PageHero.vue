<template>
  <section class="relative isolate overflow-hidden border-b border-border">
    <ClientOnly>
      <HeroAurora class="absolute inset-0 -z-10" />
    </ClientOnly>

    <div class="container-wide py-14 md:py-20">
      <header class="animate-fade-up max-w-3xl">
        <p class="eyebrow mb-4">{{ eyebrow }}</p>
        <h1 class="text-balance text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.02em] text-ink">
          {{ title }}
        </h1>
        <p v-if="description" class="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {{ description }}
        </p>
        <slot />
      </header>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
}>()
</script>
