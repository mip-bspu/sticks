<template>
  <div class="card">
    <h4>
      <span></span>
      <button>+ деталь</button>
    </h4>

    <hr />
    <div class="scrollable">
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Высота</th>
            <th>Длина</th>
            <th>Ширина</th>
            <th>Кол-во</th>
            <th>Возможность увеличить</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" name="name" v-model="eName" /></td>
            <td><input type="number" name="height" v-model="eHeight" /></td>
            <td><input type="number" name="length" v-model="eLength" /></td>
            <td><input type="number" name="width" v-model="eWidgth" /></td>
            <td><input type="number" name="count" v-model="eCount" /></td>
            <td><input type="checkbox" name="check" v-model="eInc" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { getItem } from "./Item";

let { item, arrayItems } = $(getItem());
let eName = $ref(null);
let eHeight = $ref(null);
let eLength = $ref(null);
let eWidgth = $ref(null);
let eCount = $ref(null);
let eInc = $ref(null);

function setnNewComponent() {}
</script>

<style>
</style>