import Vue from 'vue'
import ElementUI from 'element-ui'
import store from 'store'
import VueRouter from 'vue-router'
import router from './router';

Vue.use(ElementUI)
Vue.use(VueRouter)



new Vue({
	router,
	template: `<div id="app"><router-view /></div>`,
}).$mount('#app')