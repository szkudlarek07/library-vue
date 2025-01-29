import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import SelectedTheme from '@primevue/themes/lara'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: SelectedTheme,
    },
})

app.use(router)

app.mount('#app')
