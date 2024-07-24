/*
* Powered by David Z. Wang
*
*
*  */

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import { createPinia } from 'pinia';
import {router} from './common/routers'
import axios from 'axios'

//default base url
axios.defaults.baseURL = "http://localhost:5174"

const app = createApp(App)
app.use(naive)
app.use(router)
app.use(createPinia())
app.mount('#app')
