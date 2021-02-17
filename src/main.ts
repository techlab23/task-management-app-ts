import { createApp } from 'vue'
import "./assets/app.scss"
import App from './App.vue'
import store from "./store"
import router from "./router"
import { bus } from './utils'

const app = createApp(App)

app.config.globalProperties.bus = bus

app.use(store)
app.use(router)
app.mount('#app')