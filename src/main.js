import { createApp } from "vue"
// import "./style.css"
import "ant-design-vue/es/message/style/css";
import axios from 'axios';

import App from "./App.vue"
import router from  "./router"

import { createPinia } from 'pinia'


createApp(App).use(router).use(createPinia()).mount('#app')

// use(VueAxios,axios)
// axios.defaults.baseURL = 'http://localhost'
