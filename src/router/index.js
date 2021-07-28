import VueRouter from "vue-router"
import Login from "views/Login"
import authRoutes from "router/modules/auth"
import chatRoutes from "router/modules/chat"

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Login
        },
        ...authRoutes,
        ...chatRoutes
    ]
})
