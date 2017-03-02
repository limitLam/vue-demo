import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuexStore'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

new Vue({
	store,
	router,
	template: `<div id="app"><router-view /></div>`,
}).$mount('#app')