import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire } from 'vuefire'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';
import "primevue/resources/primevue.min.css"; 

import App from './App.vue'
import router from './router'
import { firebaseApp } from './firebase'

const app = createApp(App)
app.use(createPinia())
app.use(VueFire, {firebaseApp});
app.use(PrimeVue)
app.use(router)

app.mount('#app')