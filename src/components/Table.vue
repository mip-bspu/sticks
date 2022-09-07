<template>
  <div class="card">
    <h3 style="color: #0077e6">{{ chosenItem?.name }}</h3>

    <div class="card-in scrollable">
      <div>
        <h4>Ширина спила, мм</h4>
        <input
          type="number"
          class="number"
          style="width: 15%"
          v-model="chosenItem.saw"
        />
      </div>
      <h4>Детали</h4>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Название</th>
            <th style="text-align: right">Параметры хлыста, мм</th>
            <th style="text-align: right">Высота детали, мм</th>
            <th style="text-align: right">Кол-во деталей</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in chosenItem.components" :key="i">
            <td style="text-align: left">
              <input
                class="inputFill"
                type="text"
                name="name"
                v-model="item.name"
              />
            </td>
            <td>
              <select v-model="item.stickId" class="inputFill">
                <option v-for="s in sticks" :key="s.id">
                  {{ s.length + "x" + s.width + "x" + s.height }}
                </option>
              </select>
            </td>
            <td>
              <input
                class="number inputFill"
                type="number"
                name="heightS"
                v-model="item.heightSelf"
                :max="item.height"
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
              <button @click="deleteComponent(item)" style="color: crimson">
                x
              </button>
            </td>
          </tr>

          <tr class="newRow">
            <td>
              <input
                placeholder="Введите название..."
                type="text"
                name="name"
                v-model="eName"
              />
            </td>
            <td>
              <select>
                <option v-for="s in sticks" :key="s.id">
                  {{ s.length + "x" + s.width + "x" + s.height }}
                </option>
              </select>
            </td>
            <td>
              <input
                class="number"
                type="number"
                name="height"
                v-model="eHeightSelf"
              />
            </td>
            <td>
              <input
                class="number"
                type="number"
                name="count"
                v-model="eCount"
                @keydown.enter="addComponent(eName, eHeightSelf, eCount)"
              />
            </td>
            <td>
              <button @click="addComponent(eName, eHeightSelf, eCount)">
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

let { chosenItem, arrayItems, sPaint, countSticks, errors, sticks } = $(
  useItems()
);

let eName = $ref("");
let eCount = $ref(null);
let eHeightSelf = $ref(null);

let errorss = {
  1: {
    name: "такая деталь уже существует",
  },
};

watch(() => errors);

function addComponent(name, heightSelf, count) {
  chosenItem.components.push({
    name: name,
    heightSelf: heightSelf,
    count: count,
  });

  eName = eCount = eHeightSelf = null;
}

function deleteComponent(item) {
  chosenItem.components.splice(chosenItem.components.indexOf(item), 1);
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