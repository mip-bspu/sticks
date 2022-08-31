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
          <tr v-for="item in chosenItem.components" :key="item.name">
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
    </div>
    <div class="card-in scrollable">
      <h4 style="color: #0077e6">Площадь окраски: {{ sPaint }} м^2</h4>
      <h4 style="color: #0077e6">Хлысты с учетом спила:</h4>
      <h4 style="color: #0077e6" v-for="s in countSticks" :key="s.name">
        Хлыст {{ s.name }}
        <p v-for="(stick, index) in s.stick" :key="index">  {{ index+1 }}. Детали, мм: {{ stick.details }} <br> Остаток, мм: {{stick.tail}}</p>
      </h4>
    </div>
  </div>
</template>

<script setup>
import { useItems } from "../composables/useItems";

let { chosenItem, arrayItems, sPaint, countSticks, findTail } = $(useItems());

let eName = $ref(null);
let eHeight = $ref(null);
let eLength = $ref(null);
let eWidth = $ref(null);
let eCount = $ref(null);
let eHeightSelf = $ref(null);

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
</style>