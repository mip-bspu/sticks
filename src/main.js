import { createApp } from 'vue'
import './style.css'
import Icon from "./components/Icon.vue";
import App from './App.vue'
import { router } from './router/router'

createApp(App)

  .use(router)
  .component("Icon", Icon).mount('#app')