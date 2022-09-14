<script setup>
defineProps({
  path: String,
});
</script>

<template>
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path :d="path" />
  </svg>
</template>

<style scoped>
svg {
  width: 1.5rem;
}
</style>