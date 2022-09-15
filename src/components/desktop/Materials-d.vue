<script setup>
import { useItems } from "../../composables/useItems";
import { useId } from "../../composables/useId";
import { mdiClose, mdiPlus } from "@mdi/js";
import { watch } from "vue";

let { getId } = $(useId());
let { sticks, useStick, errorsMaterial } = $(useItems());

let eHeight = $ref("");
let eLength = $ref("");
let eWidth = $ref("");

let check = $ref(true);

watch(
  () => [eHeight, eLength, eWidth],
  () => {
    if (eHeight === "" || eLength === "" || eWidth === "") {
      return (check = true);
    } else {
      return (check = false);
    }
  }
);

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
          <tr v-for="(item, i) in sticks" :key="i">
            <td>
              <input
                type="number"
                v-model="item.height"
                :class="{
                  number: true,
                  inputFill: !errorsMaterial[i].height && item.height !== '',
                  error: errorsMaterial[i].height || item.height === '',
                }"
                :title="errorsMaterial[i].height"
              />
            </td>
            <td>
              <input
                type="number"
                v-model="item.length"
                :class="{
                  number: true,
                  inputFill: !errorsMaterial[i].length && item.length !== '',
                  error: errorsMaterial[i].length || item.length === '',
                }"
                :title="errorsMaterial[i].length"
              />
            </td>
            <td>
              <input
                type="number"
                v-model="item.width"
                :class="{
                  number: true,
                  inputFill: !errorsMaterial[i].width && item.width !== '',
                  error: errorsMaterial[i].width || item.width === '',
                }"
                :title="errorsMaterial[i].width"
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
                autofocus
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
                @keydown.enter="addStick()"
              />
            </td>
            <td>
              <button :disabled="check" class="b-plus" @click="addStick()">
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