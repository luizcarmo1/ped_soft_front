import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/pedidos',
			component: () => import('../views/Pedidos.vue')
		},
		{
			path: '/cadastrar',
			component: () => import('../views/Cadastrar.vue')
		},
		{
			path: '/sobre',
			component: () => import('../views/Sobre.vue')
		},
	],
})

export default router
