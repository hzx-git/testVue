<template>
    <div class="films">
        <SwiperCom cName='films-banner'>
            <div 
                class="swiper-slide"
                v-for="banner in banners"
                :key="banner.bannerId"
            >
                <img width='100%' :src="banner.imgUrl" alt="">
            </div>
        </SwiperCom>

        <div class="nav">
            <router-link
                v-for="nav in navs"
                :key="nav.id"
                :to='nav.path'
                active-class="active"
            >{{nav.title}}</router-link>
        </div>
        <!--通过router-view来去指明二级路由组件显示的位置-->
        <router-view></router-view>
    </div>
</template>

<script>
import Swiper from "swiper"
import SwiperCom from "@/components/Swiper"
import {instance,instance2} from "@/utils/http"
export default {
    name:"films",
    components:{
        SwiperCom  //注册为子组件
    },
    data(){
        return {
            banners:[],
            navs:[
                {id:1,title:"正在热映",path:"/films/nowplaying"},
                {id:2,title:"即将上映",path:"/films/comingsoon"}
            ]
        }
    },
    created(){
        //进行请求卖座banner的数据
        instance.get("/gateway?type=2&cityId=310100&k=2003706",{
            headers:{ //配置请求头
                'X-Host': 'mall.cfg.common-banner'
            }
        }).then(res=>{
            this.banners = [...res.data.data,{bannerId:300,imgUrl:"https://static.maizuo.com/v5/upload/4a8da56010356705571f85b345165ed8.jpg?x-oss-process=image/quality,Q_70"}]
            this.$nextTick(()=>{  //会在updated钩子函数之后执行，相当于数据改变了，页面中的真实dom结构都已经出来了
                new Swiper(".films-banner",{
                    
                    loop:true,
                    pagination:{
                        el:".swiper-pagination"
                    }
                })
            })
        })

        //请求职位数据
        // instance2.get("/api/position/find").then(res=>{
        //     console.log(res)
        //     this.positions = res
        // }).catch(err=>{
        //     console.log("position==>",err)
        // })
    }
}
</script>

<style lang="scss" scoped>
    .nav{
        height:40px;
        line-height: 40px;
        display: flex;
        justify-content: space-around;
        a{
            border-bottom: 1px solid transparent;
            transition: all .5s ease;
        }
        .active{
            color:orange;
            border-color:orange;
        }
    }
    .films-banner{
        width:100%;
        height:2rem;
        img{
            height:100%;
        }
    }
    /deep/ .swiper-pagination-bullet-active{
        background: #88da56de!important;
    }
</style>
