<script setup>
import { useItems } from "../../composables/useItems";
let { sticks, chosenStick } = $(useItems());
</script>
<template>
  <div class="card">
    <h3>Параметры трубы</h3>
    <div class="card-in">
      <label><span>Высота, мм</span></label>
      <input type="number" v-model="chosenStick.height" class="number" />
      <label><span>Длина, мм</span></label>
      <input type="number" v-model="chosenStick.length" class="number" />
      <label><span>Ширина, мм</span></label>
      <input type="number" v-model="chosenStick.width" class="number" />
    </div>
  </div>
</template>