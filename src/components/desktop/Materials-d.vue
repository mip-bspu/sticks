<script setup>
import { useItems } from "../../composables/useItems";
import { useId } from "../../composables/useId";
import { mdiClose, mdiPlus } from "@mdi/js";

let { getId } = $(useId());
let { sticks } = $(useItems());

let eHeight = $ref(null);
let eLength = $ref(null);
let eWidth = $ref(null);

function addStick() {
  sticks.push({
    id: getId(),
    height: eHeight,
    length: eLength,
    width: eWidth,
  });

  eHeight = eLength = eWidth = null;
}

function deleteStick(s) {
  sticks.splice(sticks.indexOf(s), 1);
}
</script>

<template>
  <div class="card">
    <h3>Параметры хлыстов</h3>
    <div class="card-in">
      <table>
        <thead>
          <tr>
            <th>Высoта хлыста, мм</th>
            <th>Длина хлыста, мм</th>
            <th>Ширина хлыста, мм</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sticks" :key="item.id">
            <td>
              <input
                type="number"
                v-model="item.height"
                class="inputFill number"
              />
            </td>
            <td>
              <input
                type="number"
                v-model="item.length"
                class="inputFill number"
              />
            </td>
            <td>
              <input
                type="number"
                v-model="item.width"
                class="inputFill number"
              />
            </td>
            <td>
              <button
                style="background-color: unset"
                @click="deleteStick(item)"
              >
                <icon style="fill: crimson" :path="mdiClose" />
              </button>
            </td>
          </tr>
          <tr class="newRow">
            <td><input type="number" v-model="eHeight" class="number" /></td>
            <td><input type="number" v-model="eLength" class="number" /></td>
            <td><input type="number" v-model="eWidth" class="number" /></td>
            <td>
              <button class="b-plus" @click="addStick()">
                <icon class="i-plus" :path="mdiPlus" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
th {
  text-align: right;
}
</style>