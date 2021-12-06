import { createApp } from 'vue'
import VueFeather from 'vue-feather';
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar';
import vSelect from 'vue-select'
// import VueNextSelect from 'vue-next-select'

import "./sass/app.scss"
import "bootstrap"
// import "../node_modules/vue-next-select/dist/index.min.css"

const app = createApp(App);

app.component(VueFeather.name, VueFeather);
app.component('v-select', vSelect);

// app.component('vue-select', VueNextSelect)
app.use(VCalendar, {})
app.use(router)
app.use(store)

app.mount('#app')
