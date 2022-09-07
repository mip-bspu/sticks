import { createRouter, createWebHashHistory } from "vue-router/dist/vue-router";
import Sticks from "../components/Sticks.vue"
import Product from "../components/Product.vue"


const routes = [
  { path: '/sticks', component: Sticks },
  { path: '/', component: Product }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})