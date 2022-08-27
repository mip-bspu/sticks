<template>
  <div class="card">
    <h3>{{ chosenItem.name }}</h3>

    <div class="scrollable card-in">
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Высота</th>
            <th>Длина</th>
            <th>Ширина</th>
            <th>Кол-во</th>
            <th>Возможность увеличить</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in components" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.height }}</td>
            <td>{{ item.length }}</td>
            <td>{{ item.width }}</td>
            <td>{{ item.count }}</td>
            <td>
              <input
                type="checkbox"
                name="check"
                :checked="item.inc"
                disabled
              />
            </td>
          </tr>

          <tr class="newRow">
            <td><input type="text" name="name" v-model="eName" /></td>
            <td><input type="number" name="height" v-model="eHeight" /></td>
            <td><input type="number" name="length" v-model="eLength" /></td>
            <td><input type="number" name="width" v-model="eWidgth" /></td>
            <td><input type="number" name="count" v-model="eCount" /></td>
            <td><input type="checkbox" name="check" v-model="eInc" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { getItem } from "./Item";
import { computed, watch } from "vue";

let { chosenItem, arrayItems } = $(getItem());
let eName = $ref(null);
let eHeight = $ref(null);
let eLength = $ref(null);
let eWidgth = $ref(null);
let eCount = $ref(null);
let eInc = $ref(null);

let components = $ref([]);

watch(
  () => chosenItem,
  (chosenItem) => {
    components = chosenItem.components;
  }
);

function addNewComponent() {}
</script>

<style scoped>
</style>