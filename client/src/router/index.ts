import { createRouter, createWebHistory } from 'vue-router'
import Produit from '../components/Produit.vue'
import NotFound from '../components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Produit
    },
    {
      path: '/:id',
      name: 'detail2',
      component: () => import('../components/ProduitDetail.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'Not Found',
      component: NotFound
    }
  ]
})

export default router
