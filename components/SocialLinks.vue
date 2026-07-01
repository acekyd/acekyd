<template>
  <div class="flex flex-wrap items-center gap-1">
    <a
      v-for="social in socials"
      :key="social.label"
      :href="social.href"
      :aria-label="`Adewale on ${social.label}`"
      target="_blank"
      rel="noopener"
      class="grid place-items-center rounded-full border border-border bg-surface text-ink-soft no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
      :class="size === 'sm' ? 'h-9 w-9 text-sm' : 'h-11 w-11 text-base'"
    >
      <font-awesome-icon :icon="['fab', social.icon]" />
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{ size?: 'sm' | 'md' }>()
const socials = useAppConfig().socials
</script>
