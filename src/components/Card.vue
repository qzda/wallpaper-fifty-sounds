<script setup lang="ts">
  import type { Cell, DisplayMode } from '../type';

  const { cell, displayMode } = defineProps<{
    cell: Cell | null,
    displayMode: DisplayMode
  }>()

</script>

<template>
  <div class="w-full xy-center gap-1 px-2 ws-nowrap">
    <span v-if="(displayMode === 'hiragana' || displayMode === 'both')">
      {{ cell?.hiragana }}
    </span>
    <span v-if="(displayMode === 'katakana' || displayMode === 'both')"
      :class="displayMode === 'both' ? 'text-gray-500' : null">
      {{ cell?.katakana }}
    </span>
  </div>
</template>