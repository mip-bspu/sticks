<template>
  <div class="card">
    <h3>
      <span>ИЗДЕЛИЯ</span>
    </h3>

    <div class="card-in">
      <ul>
        <li
          v-for="item in arrayItems"
          :key="item.name"
          @click="selectItem(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="setName">
      <input type="text" v-model="eName" placeholder="Введите название" />
      <button :disabled="!eName" @click="addItem(eName)">+</button>
    </div>
  </div>
</template>

<script setup>
import { getItem } from "./Item";

let { arrayItems, chosenItem } = $(getItem());
let eName = $ref(null);

function addItem(eName) {
  let item = {
    name: eName,
    saw: 0,
    components: {
      name: "",
      length: 0,
      height: 0,
      width: 0,
      count: 0,
      inc: false,
    },
  };
  arrayItems.push(item);
  eName = null;
}

function selectItem(item) {
  chosenItem = item;
}
</script>

<style>
</style>