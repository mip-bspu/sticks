<template>
  <div class="card">
    <h3>{{ chosenItem?.name }}</h3>

    <div class="card-in">
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Название</th>
            <th style="text-align: right">Высота</th>
            <th style="text-align: right">Длина</th>
            <th style="text-align: right">Ширина</th>
            <th style="text-align: right">Кол-во</th>
            <th>Увеличить</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in components" :key="item.name">
            <td style="text-align: left">
              <input
                class="inputFill"
                type="text"
                name="name"
                v-model="item.name"
              />
            </td>
            <td>
              <input
                class="number inputFill"
                type="number"
                name="height"
                v-model="item.height"
              />
            </td>
            <td>
              <input
                class="number inputFill"
                type="number"
                name="length"
                v-model="item.length"
              />
            </td>
            <td>
              <input
                class="number inputFill"
                type="number"
                name="width"
                v-model="item.width"
              />
            </td>
            <td>
              <input
                class="number inputFill"
                type="number"
                name="count"
                v-model="item.count"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="check"
                :checked="item.inc"
                class="checkbox inputFill"
              />
            </td>
            <td>
              <button @click="deleteComponent(item)" style="color: red">
                x
              </button>
            </td>
          </tr>

          <tr class="newRow">
            <td>
              <input
                placeholder="Введите название"
                type="text"
                name="name"
                v-model="eName"
              />
            </td>
            <td>
              <input
                class="number"
                type="number"
                name="height"
                v-model="eHeight"
              />
            </td>
            <td>
              <input
                class="number"
                type="number"
                name="length"
                v-model="eLength"
              />
            </td>
            <td>
              <input
                class="number"
                type="number"
                name="width"
                v-model="eWidgth"
              />
            </td>
            <td>
              <input
                class="number"
                type="number"
                name="count"
                v-model="eCount"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="check"
                v-model="eInc"
                class="checkbox"
              />
            </td>
            <td>
              <button
                @click="
                  addComponent(eName, eHeight, eLength, eWidgth, eCount, eInc)
                "
              >
                +
              </button>
            </td>
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
let eHeight = $ref(0);
let eLength = $ref(0);
let eWidgth = $ref(0);
let eCount = $ref(0);
let eInc = $ref(null);

let components = $ref([]);

watch(
  () => chosenItem,
  (chosenItem) => {
    components = chosenItem.components;
  }
);

function addComponent(name, height, length, width, count, inc) {
  let newComponent = {
    name: name,
    length: length,
    height: height,
    width: width,
    count: count,
    inc: inc,
  };
  chosenItem.components.push(newComponent);
}

function deleteComponent(item) {
  const id = chosenItem.components.indexOf(item);
  chosenItem.components.splice(id, 1);
}
</script>

<style scoped>
</style>