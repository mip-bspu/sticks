<template>
  <div class="card">
    <h3>
      <span>ИЗДЕЛИЯ</span>
    </h3>

    <div class="card-in">
      <ul>
        <li v-for="item in arrayItems" :key="item.name">{{ item.name }}</li>
      </ul>
    </div>

    <div class="setName">
      <input type="text" v-model="eName" />
      <button @click="setItem(eName)">+</button>
    </div>
  </div>
</template>

<script setup>
import { getItem } from "./Item";

let { item, arrayItems } = $(getItem());
let eName = $ref(null);

function setItem(eName) {
  item.name = eName;
  arrayItems.push(item);
}
</script>

<style>
</style>