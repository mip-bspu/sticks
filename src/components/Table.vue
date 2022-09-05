<template>
  <div class="card">
    <h3 style="color: #0077e6">{{ chosenItem?.name }}</h3>

    <div class="card-in scrollable">
      <div>
        <h4>Ширина спила, мм</h4>
        <input type="number" class="number" v-model="chosenItem.saw" />
      </div>
      <h4>Детали</h4>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Название</th>
            <th style="text-align: right">Высота хлыста, мм</th>
            <th style="text-align: right">Длина хлыста, мм</th>
            <th style="text-align: right">Ширина хлыста, мм</th>
            <th style="text-align: right">Высота детали, мм</th>
            <th style="text-align: right">Кол-во деталей</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in chosenItem.components" :key="i">
            <td v-for="(value, k) in item" :key="k">
              <input v-model="item[k]" />
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
                v-model="eWidth"
              />
            </td>
            <td>
              <input
                class="number"
                type="number"
                name="height"
                :max="eHeight"
                v-model="eHeightSelf"
              />
            </td>
            <td>
              <input
                class="number"
                type="number"
                name="count"
                v-model="eCount"
                @keydown.enter="
                  addComponent(
                    eName,
                    eHeight,
                    eLength,
                    eWidth,
                    eHeightSelf,
                    eCount
                  )
                "
              />
            </td>
            <td>
              <button
                @click="
                  addComponent(
                    eName,
                    eHeight,
                    eLength,
                    eWidth,
                    eHeightSelf,
                    eCount
                  )
                "
              >
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h3 style="color: #0077e6">
        Общая площадь окраски: {{ sPaint }} м <sub>2</sub>
      </h3>

      <div v-for="s in countSticks" :key="s.name">
        <h3 style="color: #0077e6">Хлыст {{ s.name }}</h3>
        <br />

        <table class="resultTable">
          <thead>
            <tr>
              <th style="text-align: left">Название детали</th>
              <th style="text-align: right">Длина детали с учётом спила, мм</th>
              <th style="text-align: right">Кол-во деталей</th>
            </tr>
          </thead>

          <tbody v-for="(stick, i) in s.stick" :key="i">
            <tr>
              <th colspan="4" class="nStick">{{ i + 1 }} хлыст</th>
            </tr>
            <tr v-for="(detail, j) in stick.details" :key="j">
              <td>{{ detail.name }}</td>
              <td class="number">{{ detail.heightSelf }}</td>
              <td class="number">{{ detail.countInStick }}</td>
            </tr>
            <tr>
              <th :colspan="4" style="text-align: left">
                <b>Остаток: {{ stick.tail }} мм</b>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useItems } from "../composables/useItems";

let { chosenItem, arrayItems, sPaint, countSticks, errors } = $(useItems());

let eName = $ref("");
let eHeight = $ref(null);
let eLength = $ref(null);
let eWidth = $ref(null);
let eCount = $ref(null);
let eHeightSelf = $ref(null);

let errorss = {
  1: {
    name: "такая деталь уже существует",
  },
};

watch(() => errors);

function addComponent(name, height, length, width, heightSelf, count) {
  let newComponent = {
    name: name,
    length: length,
    height: height,
    heightSelf: heightSelf,
    width: width,
    count: count,
  };
  chosenItem.components.push(newComponent);
  eName = eHeight = eLength = eWidth = eCount = eHeightSelf = null;
}

function deleteComponent(item) {
  const id = chosenItem.components.indexOf(item);
  chosenItem.components.splice(id, 1);
}
</script>

<style scoped>
.nStick {
  background-color: rgb(239, 239, 239);
}

.resultTable {
  border: 1px solid rgb(185, 185, 185);
  border-spacing: 0px;
}

.warning {
  background-color: crimson;
  color: white;
}
</style>