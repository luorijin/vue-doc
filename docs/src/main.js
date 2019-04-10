// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/ionicons.css';
import './assets/atom-one-light.css';
import router from './router'
import demoBlock from '@/src/components/demo-block';
import mVue from '#/index'
Vue.config.productionTip = false
Vue.use(mVue);
/* eslint-disable no-new */
Vue.component('demoBlock',demoBlock);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
