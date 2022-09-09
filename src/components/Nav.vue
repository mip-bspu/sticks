<script setup>
import { router } from "../router/router";
</script>
<template>
  <ul class="nav">
    <router-link class="router" to="/" custom v-slot="{ navigate }">
      <li
        :class="{
          selected: router.currentRoute.value.name === 'Изделия',
          firstLi: true,
        }"
        @click="navigate"
      >
        Изделия
      </li>
    </router-link>
    <router-link class="router" to="/sticks" custom v-slot="{ navigate }">
      <li
        :class="{ selected: router.currentRoute.value.name === 'Материалы' }"
        @click="navigate"
      >
        Материалы
      </li>
    </router-link>
  </ul>
</template>

<style scoped>
.router {
  text-decoration: none;
  color: aliceblue;
}

ul {
  list-style-type: none;
  margin-bottom: 1rem;
  padding-left: 2rem;
  padding: 0;
  overflow: hidden;
  background-color: #0077e6;
  position: fixed;
  top: 0;
  width: 100%;
}

.firstLi {
  margin-left: 2rem;
}

li {
  float: left;
  color: #f6f6f6;
  border-radius: 0;
}

li:hover {
  color: #f6f6f6;
  background-color: rgba(240, 248, 255, 0.137);
}

.selected {
  background-color: rgba(241, 243, 253, 0.422);
}
</style>