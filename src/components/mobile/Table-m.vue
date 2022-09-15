<script setup>
import { watch } from "vue";
import { useItems } from "../../composables/useItems";
import { mdiClose, mdiPlus } from "@mdi/js";

let {
  chosenItem,
  arrayItems,
  sPaint,
  countSticks,
  errors,
  sticks,
  getType,
  getLabel,
  errorsSaw,
  errorsMaterial,
} = $(useItems());

function addComponent() {
  chosenItem.components.push({
    name: "Новая деталь",
    stickId: 0,
    heightSelf: 0,
    count: 0,
  });
}

function deleteComponent(item) {
  chosenItem.components.splice(chosenItem.components.indexOf(item), 1);
}
</script>
  
<template>
  <div class="card">
    <h3 style="color: #0077e6">{{ chosenItem?.name }}</h3>

    <div class="card-in">
      <h4>Название изделия</h4>
      <input
        type="text"
        placeholder="Введите название..."
        v-model="chosenItem.name"
      />
      <h4>Ширина спила, мм</h4>
      <input
        type="number"
        :class="{ number: true, error: errorsSaw || chosenItem === '' }"
        v-model="chosenItem.saw"
      />
    </div>

    <h4>Детали</h4>
    <div class="card-in" v-for="(item, i) in chosenItem.components" :key="i">
      <div class="d-input" v-for="(value, k) in item" :key="k">
        <label
          ><span>{{ getLabel(k) }}</span></label
        >
        <input
          v-if="k != 'stickId'"
          v-model="item[k]"
          :type="getType(chosenItem.components[i], k)"
          :class="{
            nameField: k == 'name',
            number: getType(chosenItem.components[i], k) == 'number',
            error: errors[i][k] || item[k] === '',
          }"
        />
        <select
          v-else
          v-model="item.stickId"
          :class="{
            number: true,
          }"
        >
          <option value="" disabled selected>Выберите трубу</option>
          <option v-for="s in sticks" :key="s.id" :value="s.id">
            {{ s.length + "x" + s.width + "x" + s.height }}
          </option>
        </select>
        <label class="labelWarn" v-if="errors[i][k]">{{ errors[i][k] }}</label>
      </div>
      <button @click="deleteComponent(item)">
        <icon class="i-close" :path="mdiClose" />
      </button>
    </div>
    <button class="b-plus" @click="addComponent()">
      <icon class="i-plus" :path="mdiPlus" />
    </button>

    <hr />
    <div class="card-in">
      <div>
        <h3 style="color: #0077e6">Общая площадь окраски:</h3>
        <h4>{{ sPaint }} м <sup>2</sup></h4>
      </div>
      <div v-for="s in countSticks" :key="s.stickObj.id">
        <h3 style="color: #0077e6">
          Хлыст
          {{
            s.stickObj.length + "x" + s.stickObj.width + "x" + s.stickObj.height
          }}
        </h3>
        <br />
        <table class="resultTable">
          <thead>
            <tr>
              <th style="text-align: left">Название</th>
              <th style="text-align: right">Длина со спилом, мм</th>
              <th style="text-align: right">Кол-во</th>
            </tr>
          </thead>
          <tbody v-for="(s, i) in s.sticks" :key="i">
            <tr>
              <th colspan="4" class="nStick">{{ i + 1 }} хлыст</th>
            </tr>
            <tr v-for="(detail, j) in s.details" :key="j">
              <td>{{ detail.name }}</td>
              <td class="number">{{ detail.heightSelf }}</td>
              <td class="number">{{ detail.countInStick }}</td>
            </tr>
            <tr>
              <th :colspan="4" style="text-align: left">
                <b>Остаток: {{ s.tail }} мм</b>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>



<style scoped>
.nStick {
  background-color: rgb(239, 239, 239);
}

.resultTable {
  border: 1px solid rgb(185, 185, 185);
  border-spacing: 0px;
}

.d-input {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.error {
  background-color: crimson;
  color: white;
}

h4 {
  margin: 0.5rem 0;
}
.i-close {
  background-color: rgba(255, 227, 227, 0.532);
  border-radius: 0.5rem;
}
</style>