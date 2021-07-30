import VueRouter from "vue-router"
import authRoutes from "router/modules/auth"
import chatRoutes from "router/modules/chat"
import store from "store"

const protectedRoutes = ['chat']

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: 'login'
        },
        ...authRoutes,
        ...chatRoutes
    ]
})

router.beforeEach((to, from, next) => {
    if(to.name === 'login' && from.name !== 'register')
        next(async vm => await vm.$store.dispatch('checkAuth'))
    else if(protectedRoutes.includes(to.name) && !store.getters.user)
        next({name: 'login'})
    else {
        next()
    }
})

export default router