/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from 'pinia'
import { createApp } from 'vue'

loadFonts()

const options = {
    // You can set your default options here
    bodyClassName: ["custom-class-1", "custom-class-2"],
    icon: false,
  };

// Create vue app
const app = createApp(App)


// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(Toast, options);

// Mount vue app
app.mount('#app')
