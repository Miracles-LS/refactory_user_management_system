import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
import VueAxios from 'vue-axios'
// import Bmob from "hydrogen-js-sdk";

Vue.config.productionTip = false

// Vue.use(VueAxios,axios)
// Vue.prototype.$axios=axios
// axios.defaults.baseURL = "http://localhost:3000/"

// 初始化
// Bmob.initialize("3b705a939a6acde67bc6a7517446c8a7", "b2470f5c3615f3d77cd8ce7e1915a2c8");
// // 挂载到全局使用
// Vue.prototype.Bmob = Bmob

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
