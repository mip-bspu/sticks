<script setup>
import { useSize } from "../composables/useSize";
import TableD from "./desktop/Table-d.vue";
import TableM from "./mobile/Table-m.vue";

let { checkSize } = $(useSize());
</script>

<template>
  <table-d v-if="checkSize" />
  <table-m v-else />
</template>