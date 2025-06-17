<script setup lang="ts">
  import type { Cell, DisplayMode } from '../type';

  const { cell, displayMode } = defineProps<{
    cell: Cell | null,
    displayMode: DisplayMode
  }>()

</script>

<template>
  <div class="flex-1 text-6 xy-center">
    <span v-if="(displayMode === 'hiragana' || displayMode === 'both')">
      {{ cell?.hiragana }}
    </span>
    <span v-if="(displayMode === 'katakana' || displayMode === 'both')" class="text-gray-500">
      {{ cell?.katakana }}
    </span>
  </div>
</template>