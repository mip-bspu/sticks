import { createRouter, createWebHashHistory } from "vue-router/dist/vue-router";
import Sticks from "../components/Sticks.vue"
import dTable from "../components/Table.vue"
import dListItems from "../components/ListItems.vue"
import mListItems from "../components/mobile/ListItems-m.vue"
import dSticks from "../components/Sticks.vue";
import mSticks from "../components/mobile/Sticks-m.vue";

const routes = [
  { path: '/sticks', components: { dSticks: dSticks, mSticks: mSticks, }, name: 'Материалы' },
  {
    path: '/',
    components: {
      dTable: dTable,
      dListItems: dListItems,
      mListItems: mListItems
    },
    name: 'Изделия'
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})