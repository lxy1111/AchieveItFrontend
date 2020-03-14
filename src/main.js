// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import http from 'vue-resource'
import VueResource from "vue-resource"
import jquery from "jquery"
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel'
import Viewer from 'v-viewer'
import store from './store'
import 'viewerjs/dist/viewer.css'

//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

var axios = require('axios')
Vue.prototype.$axios = axios

Vue.use(VueResource)
Vue.use(http)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
