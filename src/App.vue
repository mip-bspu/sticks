<script setup>
import Navbar from "./components/Nav.vue";
import { useSize } from "./composables/useSize";

let { checkSize } = $(useSize());
</script>

<template>
  <navbar />

  <router-view v-if="checkSize" name="dListItems" />
  <router-view v-else name="mListItems" />

  <router-view v-if="checkSize" name="dTable" />

  <router-view v-if="checkSize" name="dSticks" />
  <router-view v-else name="mSticks" />
</template>

<style scoped>
</style>
