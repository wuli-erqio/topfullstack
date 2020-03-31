import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import './plugins/avue'
import EleForm from 'vue-ele-form'
import router from './router'
import axios from 'axios'

// 注册组件
Vue.use(EleForm)

const http = axios.create({
  // baseURL: 'http://localhost:3009'
  baseURL: process.env.VUE_APP_API_URL
})
Vue.prototype.$httpajax= http
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
