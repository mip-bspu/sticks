import { createRouter, createWebHashHistory } from "vue-router/dist/vue-router";
import PageItems from "../view/PageItems.vue"
import PageMaterials from "../view/PageMaterials.vue"

const routes = [
  { path: '/sticks', component: PageMaterials, name: 'Материалы' },
  { path: '/', component: PageItems, name: 'Изделия' }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})