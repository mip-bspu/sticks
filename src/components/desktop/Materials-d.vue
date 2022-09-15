<script setup>
import { useItems } from "../../composables/useItems";
import { useId } from "../../composables/useId";
import { mdiClose, mdiPlus } from "@mdi/js";

let { getId } = $(useId());
let { sticks, useStick, errorsMaterial } = $(useItems());

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
    <h3>Параметры профильных труб</h3>
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
                :class="{
                  number: true,
                  inputFill:
                    !errorsMaterial[item.id].height && item.height !== '',
                  error: errorsMaterial[item.id].height || item.height === '',
                }"
                :title="errorsMaterial[item.id].height"
              />
            </td>
            <td>
              <input
                type="number"
                v-model="item.length"
                :class="{
                  number: true,
                  inputFill:
                    !errorsMaterial[item.id].length && item.length !== '',
                  error: errorsMaterial[item.id].length || item.length === '',
                }"
                :title="errorsMaterial[item.id].length"
              />
            </td>
            <td>
              <input
                type="number"
                v-model="item.width"
                :class="{
                  number: true,
                  inputFill:
                    !errorsMaterial[item.id].width && item.width !== '',
                  error: errorsMaterial[item.id].width || item.width === '',
                }"
                :title="errorsMaterial[item.id].width"
              />
            </td>

            <td v-if="useStick(item.id)">
              <button
                style="background-color: unset"
                title="деталь используется"
                disabled
              >
                <icon style="fill: lightgrey" :path="mdiClose" />
              </button>
            </td>

            <td v-else>
              <button @click="deleteStick(item)">
                <icon class="i-close" :path="mdiClose" />
              </button>
            </td>
          </tr>
          <tr class="newRow">
            <td>
              <input
                type="number"
                v-model="eHeight"
                class="number"
                placeholder="Высота"
              />
            </td>
            <td>
              <input
                type="number"
                v-model="eLength"
                class="number"
                placeholder="Длина"
              />
            </td>
            <td>
              <input
                type="number"
                v-model="eWidth"
                class="number"
                placeholder="Ширина"
              />
            </td>
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
input {
  width: 90%;
}
</style>