<template>
  <div class="card" v-if="chosenItem === null">
    <h3>ИЗДЕЛИЯ</h3>

    <div class="card-in">
      <ul>
        <li
          v-for="item in arrayItems"
          :key="item.name"
          :class="{ selected: item === chosenItem }"
          @click="selectItem(item)"
        >
          {{ item.name }}
          <button
            style="color: crimson; background-color: unset"
            @click="deleteItem(item)"
          >
            x
          </button>
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

  <table-m v-else />
</template>
<script setup>
import { useItems } from "../../composables/useItems";
import TableM from "./Table-m.vue";

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

function deleteItem(item) {
  arrayItems.splice(arrayItems.indexOf(item), 1);
  console.log(arrayItems);
}
</script>
  
<style scoped>
.card-in {
  align-items: center;
}
ul {
  width: 100%;
}
li {
  display: flex;
  justify-content: space-between;
}
h3 {
  margin-top: 0;
}
</style>