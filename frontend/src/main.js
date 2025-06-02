import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import styles in correct order
import './assets/main.css' // Tailwind directives
import 'leaflet/dist/leaflet.css'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
