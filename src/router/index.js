import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import menu_items from "@/data/menu_items"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
]

if (menu_items.length > 0) {
    menu_items.forEach(({ isActive, path, name, component }) => {
        if(isActive) {
            routes.push({
                path,
                name,
                component: () => import(/* webpackChunkName: "[request]" */ `@/views/${component}.vue`)
            })
        }
    })
}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
