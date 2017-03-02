import VueRouter from 'vue-router'

import Layout from 'PAGES/layouts'
import Index from 'PAGES/index'
import TodoList from 'PAGES/todoList'
import ErrorPage from 'PAGES/error'
import Crement from 'PAGES/crement'

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [{
		path: '/',
		component: Layout,
		children: [{
			// 当 / 匹配成功，
			// Index 会被渲染在 Layout 的 <router-view> 中
			path: '',
			component: Index
		}, {
			path: 'index',
			redirect: '/'
		}, {
			// 当 /todoList 匹配成功，
			// Index 会被渲染在 Layout 的 <router-view> 中
			path: 'todoList',
			component: TodoList
		}, {
			path: 'crement',
			component: Crement
		}, {

			path: '*',
			component: ErrorPage
		}]
	}]
});

export default router;