import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home'
import Whish from '../views/Whishlist'
import LogIn from '../views/LogIn'

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/Whish',
        name: 'whish',
        component: Whish,
        meta: {requiresAuth: true}
    },
    {
        path: '/',
        name: 'login',
        component: LogIn
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), 
    routes
})

router.beforeEach((to, from, next) => {

    let user = JSON.parse(sessionStorage.getItem('user'));
    console.log( to.path == '/' && user != null) 
    console.log(to.path == '/' && user == null) 
    console.log(to.path != '/' && user == null) 
    console.log(to.path != '/' && user != null) 
    console.log(to.path != '/whish' && to.path != '/' && to.path != '/home') 
    console.log("\n");
    //console.log(from)
    //console.log(to)

    //to login, user not null => same page
    if ( to.path == '/' && user != null) next({path: "/home"})
    // to login, user null => to login
    else if ( to.path == '/' && user == null) next()
    // to not login, user null => to login
    else if (to.path != '/' && user == null) next({path: '/', name: 'login'})
    // not a page in the website
    else if (to.path != '/whish' && to.path != '/' && to.path != '/home') next({path: "/home"})
    //to not login, user not null => you can go 
    else if (to.path != '/' && user != null) next()




    });

export default router