import { createRouter, createWebHashHistory } from "vue-router/dist/vue-router";
import Sticks from "../components/Sticks.vue"
import Product from "../components/Product.vue"


const routes = [
  { path: '/sticks', component: Sticks, name: 'Материалы' },
  { path: '/', component: Product, name: 'Изделия' }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})