import Vuex from "vuex"
import Vue from "vue"
import {instance} from "@/utils/http"
import cinema from "./module/cinemaHome"
import tabbar from "./module/tabbarHome"
Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        isTabbarShow:true,
        cinemaList:[]   
    },
    actions:{ //actions时进行异步请求获取数据的
        getCinemaListAction(context){
            //https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=1508703
            instance("/gateway?cityId=110100&ticketFlag=1&k=1508703",{
                headers:{
                    'X-Host': 'mall.film-ticket.cinema.list'
                }
            }).then(res=>{
                // 如何调用mutations的setCinemaList?
                context.commit("setCinemaList",res.data.data.cinemas)
            })
        }
    },
    getters:{
        getCinemaListFive(state){
           return  state.cinemaList.slice(0,5)
        },
    },
    mutations:{ //只有mtations的方法才可以同步的更改vuex的状态！ 目的就是devtools可以看到状态
        setCinemaList(state,cinemaList){
            state.cinemaList = cinemaList
        },
        show(state){
            state.isTabbarShow = true
        },
        hide(state){
            state.isTabbarShow = false
        }
    }
})

export default store;