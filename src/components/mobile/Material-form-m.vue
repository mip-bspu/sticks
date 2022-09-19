<script setup>
import { useItems } from "../../composables/useItems";
let { sticks, chosenStick, errorsMaterial } = $(useItems());

function findIndex() {
  return sticks.indexOf(chosenStick);
}
</script>
<template>
  <div class="card">
    <h3>Параметры трубы</h3>
    <div class="card-in">
      <label><span>Высота, мм</span></label>
      <input
        type="number"
        v-model="chosenStick.height"
        :class="{
          number: true,
          error:
            errorsMaterial[findIndex()].height || chosenStick.height === '',
        }"
      />
      <label class="labelWarn" v-if="errorsMaterial[findIndex()].height">
        {{ errorsMaterial[findIndex()].height }}
      </label>
      <label><span>Длина, мм</span></label>
      <input
        type="number"
        v-model="chosenStick.length"
        :class="{
          number: true,
          error:
            errorsMaterial[findIndex()].length || chosenStick.length === '',
        }"
      />
      <label class="labelWarn" v-if="errorsMaterial[findIndex()].length">
        {{ errorsMaterial[findIndex()].length }}
      </label>
      <label><span>Ширина, мм</span></label>
      <input
        type="number"
        v-model="chosenStick.width"
        :class="{
          number: true,
          error: errorsMaterial[findIndex()].width || chosenStick.width === '',
        }"
      />
      <label class="labelWarn" v-if="errorsMaterial[findIndex()].width">
        {{ errorsMaterial[findIndex()].width }}
      </label>
    </div>
  </div>
</template>