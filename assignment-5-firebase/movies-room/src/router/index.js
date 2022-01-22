import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home'
import Whish from '../views/Whishlist'
import LogIn from '../views/LogIn'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/Whish',
        name: 'whish',
        component: Whish
    },
    {
        path: '/LogIn',
        name: 'login',
        component: LogIn
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), 
    routes
})

export default router