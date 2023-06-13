import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// PrimeVue components
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';
import "primevue/resources/primevue.min.css"; 
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(PrimeVue)
app.use(ToastService);
app.use(router)

app.mount('#app')