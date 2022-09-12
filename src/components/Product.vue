<script setup>
import TableC from "../components/Table.vue";
import ListItems from "../components/ListItems.vue";

import ListItemsM from "../components/ListItems-m.vue";
import { useSize } from "../composables/useSize";

let { checkSize } = $(useSize());
</script>

<template>
  <list-items v-if="checkSize"></list-items>
  <list-items-m v-else></list-items-m>

  <table-c v-if="checkSize"></table-c>
</template>