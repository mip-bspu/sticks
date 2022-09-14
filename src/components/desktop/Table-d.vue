<template>
  <div class="card" v-if="chosenItem">
    <h3 style="color: #0077e6">{{ chosenItem?.name }}</h3>

    <div class="card-in scrollable">
      <div>
        <h4>Название изделия</h4>
        <input
          type="text"
          style="width: 20%"
          placeholder="Введите название..."
          v-model="chosenItem.name"
        />
      </div>

      <div>
        <h4>Ширина спила, мм</h4>
        <input
          type="number"
          class="number"
          style="width: 20%"
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
            <td v-for="(value, k) in item" :key="k">
              <input
                v-if="k != 'stickId'"
                v-model="item[k]"
                :type="getType(chosenItem.components[0], k)"
                :class="{
                  nameField: k == 'name',
                  number: getType(chosenItem.components[0], k) == 'number',
                  inputFill: true,
                  error: errors[i][k],
                }"
                :title="errors[i][k]"
              />

              <select v-else v-model="item.stickId" class="inputFill number">
                <option v-for="s in sticks" :key="s.id" :value="s.id">
                  {{ s.length + "x" + s.width + "x" + s.height }}
                </option>
              </select>
            </td>
            <td>
              <button @click="deleteComponent(item)">
                <icon class="i-close" :path="mdiClose" />
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
              <select v-model="eStick">
                <option v-for="s in sticks" :key="s.id" :value="s.id">
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
              <button class="b-plus" :disabled="check" @click="addComponent()">
                <icon class="i-plus" :path="mdiPlus" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />
      <h3 style="color: #0077e6">
        Общая площадь окраски: {{ sPaint }} м <sub>2</sub>
      </h3>

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
              <th style="text-align: left">Название детали</th>
              <th style="text-align: right">Длина детали с учётом спила, мм</th>
              <th style="text-align: right">Кол-во деталей</th>
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

<script setup>
import { watch } from "vue";
import { useItems } from "../../composables/useItems";
import { mdiClose, mdiPlus } from "@mdi/js";

let { chosenItem, arrayItems, sPaint, countSticks, errors, sticks, getType } =
  $(useItems());

let eName = $ref(null);
let eCount = $ref(null);
let eHeightSelf = $ref(null);
let eStick = $ref(null);
let check = $ref(true);

watch(
  () => [eName, eCount, eHeightSelf, eStick],
  () => {
    if (
      eName === null ||
      eCount === null ||
      eHeightSelf === null ||
      eStick === null
    ) {
      return (check = true);
    } else {
      return (check = false);
    }
  }
);

function addComponent() {
  chosenItem.components.push({
    name: eName,
    stickId: eStick,
    heightSelf: eHeightSelf,
    count: eCount,
  });

  eName = eCount = eHeightSelf = eStick = null;
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

.error {
  background-color: crimson;
  color: white;
}
</style>