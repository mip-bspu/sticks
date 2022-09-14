<script setup>
import Navbar from "./components/Nav.vue";
</script>

<template>
  <navbar></navbar>
  <div class="page"><router-view></router-view></div>
</template>

<style scoped>
.page {
  display: flex;
  flex: 1 1 0;
  min-height: 0;
}
</style>
