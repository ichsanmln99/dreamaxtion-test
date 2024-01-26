import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'swiper/css'
import 'swiper/css/navigation'

const app = createApp(App)

app.use(router)

app.mount('#app')
