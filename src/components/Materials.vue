<script setup>
import { useSize } from "../composables/useSize";
import MaterialsD from "./desktop/Materials-d.vue";
import MaterialsM from "./mobile/Materials-m.vue";

let { checkSize } = $(useSize());
</script>
    
<template>
  <materials-d v-if="checkSize" />
  <materials-m v-else />
</template>