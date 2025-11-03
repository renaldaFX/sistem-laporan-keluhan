import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validate'
import router from './router/routes'
import './style.css'
import './firebase/firebase'
import App from './App.vue'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VeeValidatePlugin)
app.use(router)

app.mount('#app')
