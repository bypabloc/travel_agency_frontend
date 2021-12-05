import { createApp } from 'vue'
import VueFeather from 'vue-feather';
import App from './App.vue'
import router from './router'
import store from './store'

import "./sass/app.scss"
import "bootstrap"

const app = createApp(App);

app.component(VueFeather.name, VueFeather);
app.use(router)
app.use(store)

app.mount('#app')
