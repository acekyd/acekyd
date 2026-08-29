<template>
  <figure v-if="alt" class="my-6">
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :sizes="sizes"
      :srcset="srcset"
      :class="['w-full rounded-xl border border-border', $props.class]"
      loading="lazy"
    />
    <figcaption class="mt-3 text-center text-sm text-ink-faint leading-relaxed">
      {{ alt }}
    </figcaption>
  </figure>
  <img
    v-else
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :sizes="sizes"
    :srcset="srcset"
    :class="['w-full rounded-xl border border-border', $props.class]"
    loading="lazy"
  />
</template>

<script setup lang="ts">
defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: null },
  height: { type: [String, Number], default: null },
  class: { type: String, default: null },
  sizes: { type: String, default: null },
  srcset: { type: String, default: null },
  fit: { type: String, default: null },
})
</script>
