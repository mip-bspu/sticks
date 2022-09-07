<template>
  <div class="card" style="flex: 0 1 20%">
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
        placeholder="Введите название..."
        autofocus
      />
      <button :disabled="!item.name" @click="addItem">+</button>
    </div>
  </div>
</template>

<script setup>
import { useItems } from "../composables/useItems";

let { chosenItem, arrayItems } = $(useItems());

let item = $ref({
  name: "",
  saw: 0,
  components: [],
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