import Vue from 'vue'
import ElementUI from 'element-ui'
import App from 'PAGES/layouts/index.vue'
import store from 'store'

Vue.use(ElementUI)

new Vue({
	el: '#app',
	render: h => h(App)
})