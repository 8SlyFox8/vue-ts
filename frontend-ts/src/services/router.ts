import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/MainView.vue'
import ShopView from '@/views/ShopView.vue'
import TheProductList from '@/components/TheShop/TheProductList.vue'
import TheCart from '@/components/TheShop/TheCart.vue'

const routes = [
    { path: '/', component: HomeView },
    {
        path: '/shop',
        name: 'shop',
        component: ShopView,
        children: [
            { path: 'productList', name: 'productList', component: TheProductList },
            { path: 'cart', name: 'cart', component: TheCart },
        ]
    },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})