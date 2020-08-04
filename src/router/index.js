import VueRouter from "vue-router"
import Vue from "vue"

//让Vue使用VueRouter
Vue.use(VueRouter)

//路由相关的配置
const routes = [
    {
        path:"/films",    //path指明了url地址栏里面输入的路径
        component:()=>import("@/views/Films"),  //component指明了对应的路由组件
        children:[        //通过children配置二级路由（路由嵌套）
            {
                path:"",
                redirect:"/films/nowplaying"
            },
            {
                name:'films',    
                path:"/films/nowplaying",
                component:()=>import("@/views/films/NowPlaying")
            },
            {
                path:"comingsoon", //二级路由前面一定不要加/
                component:()=>import("@/views/films/ComingSoon")
            }
        ]
    },
    {
        name:'cinema',
        path:"/cinema",
        component:()=>import("@/views/Cinema")
    },
    {
        name:'center',
        path:"/center",
        component:()=>import("@/views/Center"),
    },
    {
        path:"/detail/:id",
        component:()=>import("@/views/Detail"),
        // props:true
    },
    {
        path:"/login",
        component:()=>import("@/views/Login")
    },
    {
        path:"/cinema/search",
        component:()=>import("@/views/Search")
    },
    {
        path:"/cinema/:id",
        component:()=>import("@/views/CinemaHome")
    },
    {
        path: "/city",
        component: () => import("@/views/City")
    },
    {
        path:"/",
        redirect:"/films"
    },
    {
        path:"*",//代表上路路径都没有匹配上
        redirect:"/films"
    }
]

let router = new VueRouter({
    mode:"hash", //默认就是hash模式
    routes
})

//全局路由守卫钩子  beforeEach  afterEach
router.beforeEach((to,from,next)=>{
    if(to.path === "/center"){
        if(localStorage.getItem("token")){ //判断本地存储里面是否存了token令牌
            next()
        }else{ //说明用户没有登录
            next("/login")
        }
    }else{
        next()
    }
})


export default router