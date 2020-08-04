import Vue from 'vue'
import App from './App.vue'
//引入router/index.js
import router from "./router"
import store from "./store"
//引入swiper.min.css样式文件
import "swiper/css/swiper.min.css"
import "./stylesheets/main.scss"

import VueSource from 'vue-source'
Vue.use(VueSource)
//引入rem.js文件
import "./utils/rem"

//引入filters文件
import "./utils/filters"

import "./utils/directives"

import "./utils/globalCom"

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router, 
  store,  //目的就是组件可以通过this.$store访问vuex相关的api
}).$mount('#app')
