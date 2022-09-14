<script setup>
import { useSize } from "../composables/useSize";
import TableD from "./desktop/Table-d.vue";

let { checkSize } = $(useSize());
</script>

<template>
  <table-d v-if="checkSize" />
</template>