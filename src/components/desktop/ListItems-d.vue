<template>
  <div class="card" style="flex: 0 1 20%">
    <h3>Изделия</h3>

    <div class="card-in">
      <ul>
        <div
          v-for="(item, i) in arrayItems"
          :key="item.name"
          class="item-list-m"
        >
          <li
            :class="{
              selected: item === chosenItem,
              borderList: i + 1 !== arrayItems.length,
              liLast: i + 1 == arrayItems.length,
              liFirst: i == 0,
              liAlong: arrayItems.length === 1,
            }"
            @click="selectItem(item)"
          >
            {{ item.name }}
          </li>
          <button @click="deleteItem(item)">
            <icon class="i-close" :path="mdiClose" />
          </button>
        </div>
      </ul>
    </div>

    <button class="b-plus" @click="addItem">
      <icon class="i-plus" :path="mdiPlus" />
    </button>
  </div>
</template>

<script setup>
import { useItems } from "../../composables/useItems";
import { mdiClose, mdiPlus } from "@mdi/js";

let { chosenItem, arrayItems } = $(useItems());

let item = $ref({
  name: "Новое изделие",
  saw: 0,
  components: [],
});

function addItem() {
  arrayItems.push(JSON.parse(JSON.stringify(item)));
}

function selectItem(item) {
  chosenItem = item;
}

function deleteItem(item) {
  if (chosenItem === item) chosenItem = null;
  arrayItems.splice(arrayItems.indexOf(item), 1);
}
</script>

<style scoped>
ul {
  width: 100%;
}
li {
  width: 100%;
}
.card-in {
  padding: 0;
}
</style>