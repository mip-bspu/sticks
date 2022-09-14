<script setup>
import { router } from "../router/router";
import { useSize } from "../composables/useSize";
import { useItems } from "../composables/useItems";
import { computed } from "@vue/runtime-core";
import { mdiArrowLeft } from "@mdi/js";

let { chosenItem, chosenStick } = $(useItems());
let { checkSize } = $(useSize());
let viewBack = computed(() => {
  if (router.currentRoute.value.name === "Изделия")
    return chosenItem && !checkSize;
  else return chosenStick && !checkSize;
});

function back() {
  chosenItem = null;
  chosenStick = null;
}
</script>
<template>
  <ul class="mUl" v-if="viewBack">
    <li class="mLi, iLi" @click="back">
      <icon style="fill: white" :path="mdiArrowLeft" />
    </li>
  </ul>

  <ul :class="{ mUl: !checkSize, dUl: checkSize }" v-else>
    <router-link to="/" custom v-slot="{ navigate }">
      <li
        :class="{
          selected: router.currentRoute.value.name === 'Изделия',
          firstLi: checkSize,
          mLi: !checkSize,
          dLi: checkSize,
        }"
        @click="navigate"
      >
        Изделия
      </li>
    </router-link>
    <router-link to="/sticks" custom v-slot="{ navigate }">
      <li
        :class="{
          selected: router.currentRoute.value.name === 'Материалы',
          mLi: !checkSize,
          dLi: checkSize,
        }"
        @click="navigate"
      >
        Материалы
      </li>
    </router-link>
  </ul>
</template>

<style scoped>
.dUl,
.mUl {
  list-style-type: none;
  width: 100%;
  background-color: #0077e6;
  overflow: hidden;
  position: sticky;
  padding: 0;
}
.dUl {
  margin-bottom: 1rem;
  top: 0;
  flex: 0 0 3rem;
}

.mUl {
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.firstLi {
  margin-left: 2rem;
}

.dLi {
  float: left;
  color: #f6f6f6;
  border-radius: 0;
}

.mLi {
  float: left;
  color: #f6f6f6;
  border-radius: 0;
  width: 100%;
  text-align: center;
}

.iLi {
  padding: 0.75rem;
}

li:hover {
  color: #f6f6f6;
  background-color: rgba(240, 248, 255, 0.137);
}

.selected {
  background-color: rgba(241, 243, 253, 0.422);
}
</style>