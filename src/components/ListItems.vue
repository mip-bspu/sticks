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
          :class="{ selected: item === chosenItem }"
          @click="selectItem(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="setName">
      <input
        type="text"
        v-model="item.name"
        @keydown.enter="addItem"
        placeholder="Введите название"
        autofocus
      />
      <button :disabled="!item.name" @click="addItem">+</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import { useItems } from "../composables/useItems";

let { chosenItem, arrayItems, sPaint } = $(useItems());

onMounted(() => {
  chosenItem = arrayItems[0];
});

let item = $ref({
  name: "",
  saw: 0,
  components: {},
});

function addItem() {
  arrayItems.push(JSON.parse(JSON.stringify(item)));
  item.name = "";
}

function selectItem(item) {
  chosenItem = item;
}
</script>

<style>
</style>