<script setup>
import { useItems } from "../../composables/useItems";
let { sticks, chosenStick, errorsMaterial } = $(useItems());
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
            errorsMaterial[chosenStick.id].height || chosenStick.height === '',
        }"
      />
      <label class="labelWarn" v-if="errorsMaterial[chosenStick.id].height">
        {{ errorsMaterial[chosenStick.id].height }}
      </label>
      <label><span>Длина, мм</span></label>
      <input
        type="number"
        v-model="chosenStick.length"
        :class="{
          number: true,
          error:
            errorsMaterial[chosenStick.id].length || chosenStick.length === '',
        }"
      />
      <label class="labelWarn" v-if="errorsMaterial[chosenStick.id].length">
        {{ errorsMaterial[chosenStick.id].length }}
      </label>
      <label><span>Ширина, мм</span></label>
      <input
        type="number"
        v-model="chosenStick.width"
        :class="{
          number: true,
          error:
            errorsMaterial[chosenStick.id].width || chosenStick.width === '',
        }"
      />
      <label class="labelWarn" v-if="errorsMaterial[chosenStick.id].width">
        {{ errorsMaterial[chosenStick.id].width }}
      </label>
    </div>
  </div>
</template>