import {instance} from "@/utils/http"
import city from "./city"
const cinema = {
    namespaced: true, 
    state:{
        cinemaList:[]  
    },
    mutations:{
        setCinemaList(state,cinemaList){
            state.cinemaList = cinemaList
        }
    },
    actions:{
        getCinemaListAction(context,cityId){
            //请求具体ID
            instance(`/gateway?cityId=${cityId}&ticketFlag=1&k=7088199`,{
                headers:{
                    'X-Host': 'mall.film-ticket.cinema.list'
                    //X-Host: mall.film-ticket.cinema.list
                }
            }).then(res=>{
                // 如何调用mutations的setCinemaList?
                context.commit("setCinemaList",res.data.data.cinemas)
            })
        }
    },
    getters:{
        getCinemaListFive(state){
            return state.cinemaList.slice(0,5)
        }
    }
}
export default cinema;