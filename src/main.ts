import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { DatePicker } from 'ant-design-vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@arcgis/core/assets/esri/themes/dark/main.css'

createApp(App)
  .use(router)
  .use(Antd)
  .mount('#app')
