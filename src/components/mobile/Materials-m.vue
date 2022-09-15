<script setup>
import { useItems } from "../../composables/useItems";
import { useId } from "../../composables/useId";
import { mdiClose, mdiPlus } from "@mdi/js";
import MaterialForm from "./Material-form-m.vue";

let { getId } = $(useId());
let { sticks, chosenStick, useStick } = $(useItems());

let eHeight = $ref(0);
let eLength = $ref(0);
let eWidth = $ref(0);

function addStick() {
  sticks.push({
    id: getId(),
    height: eHeight,
    length: eLength,
    width: eWidth,
  });

  eHeight = eLength = eWidth = 0;
  chosenStick = sticks[sticks.length - 1];
}

function deleteStick(s) {
  sticks.splice(sticks.indexOf(s), 1);
}

function selectStick(s) {
  chosenStick = s;
}
</script>
  
<template>
  <div class="card" v-if="chosenStick === null">
    <h3>Добавленные трубы</h3>
    <div class="card-in">
      <ul>
        <div v-for="(item, i) in sticks" :key="item.id" class="item-list-m">
          <li
            @click="selectStick(item)"
            :class="{
              selected: item === chosenStick,
              borderList: i + 1 !== sticks.length,
            }"
          >
            {{ `${item.length} x ${item.width} x ${item.height}` }}
          </li>
          <button v-if="!useStick(item.id)" @click="deleteStick(item)">
            <icon class="i-close" :path="mdiClose" />
          </button>
          <button
            v-else
            title="деталь используется"
            style="background-color: unset"
            disabled
          >
            <icon style="fill: lightgrey" :path="mdiClose" />
          </button>
        </div>
      </ul>
    </div>

    <button class="b-plus" @click="addStick()">
      <icon class="i-plus" :path="mdiPlus" />
    </button>
  </div>

  <material-form v-else />
</template>
  
<style scoped>
ul {
  width: 100%;
}
li {
  width: 100%;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  /* position: absolute; */
  width: 100%;
  z-index: 1;
}
.dropdown:hover .dropdown-content {
  display: inline-flex;
  flex-direction: column;
}
.dropdown:hover .dropbtn {
  visibility: hidden;
}

.card-in > input {
  border: 1px solid rgb(86, 86, 86);
}

.dropbtn,
.addBtn {
  display: flex;
  justify-content: right;
}

h3 {
  margin-top: 0;
}
.dropbtn > button {
  text-align: center;
  width: 10%;
}
.card-in {
  align-items: center;
  padding: 0;
}
.newStick {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  align-items: flex-end;
}
</style>