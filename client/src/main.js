/*
* Powered by David Z. Wang
*
*
*  */

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import { router } from './common/routers'
import { createPinia } from 'pinia';
import axios from 'axios'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import { AdminStore } from './stores/AdminStore'


const pinia = createPinia()
//default base url
axios.defaults.baseURL = "http://localhost:1235"
const {message, notification, dialog} = createDiscreteApi(
    [
        "message",
        "notification",
        "dialog"
    ]
);

const app = createApp(App)
app.provide("axios", axios)
app.provide("message", message)
app.provide("notification", notification)
app.provide("dialog", dialog)
app.provide("server_url", axios.defaults.baseURL)
app.use(naive)
app.use(pinia)
app.use(router)


const adminStore = AdminStore()
//axios barrier
axios.interceptors.request.use((config)=>{
    config.headers.token = adminStore.token
    return config
})



app.mount('#app')