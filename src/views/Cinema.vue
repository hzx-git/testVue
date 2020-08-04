<template>
    <div class="cinema">
        
        <div class="title">
            <div class="left" @click="toPage('/city')">{{cityName}}</div>
            <div class="center">影院</div>
            <div @click="toPage('/cinema/search')" class="right"><i class="iconfont icon-search"></i></div>
        </div>

        <div class="select">
            <div :class="isAreaShow?'active':''" @click="isAreaShow=!isAreaShow">{{currentArea}}</div>
            <div>App订票</div>
            <div>最近去过</div>
        </div>

        <!--显示影院的区域--->
        <div class="area" v-show="isAreaShow">
            <ul>
                <li
                    v-for="data in cinemaArea"
                    :key="data"
                    @click="handleArea(data)"
                    :class="{active:data === currentArea}"
                >{{data}}</li>
            </ul>
        </div>


        <!--遍历影院数据-->
        <div class="cinemaList">
            <router-link
                v-for="data in filterCinemaArea"
                :key="data.cinemaId"
                :to="'/cinema/'+data.cinemaId"
                tag="li"
            >
                <h4>{{data.name}}</h4>
                <p>{{data.address}}</p>

            </router-link>
        </div>
    </div>
</template>

<script>
import {instance} from "@/utils/http"
import {mapState,mapActions,mapMutations} from "vuex"
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
export default {
    data(){
        return {
            //cinemaList:[],  //影院列表
            isAreaShow:false, //区域默认不显示
            currentArea:"全城" //初始选中的区域
        }
    },
    methods:{
        //注册mapActions  调用了cinema模块下面的getCinemaListAction
        //使cinemaList=[]
       
        ...mapActions("cinema",["getCinemaListAction"]),
        ...mapMutations("cinema",["setCinemaList"]),
        toPage(path){
            //如果点击的是切换城市，需要将 cinemaList=[]
            if(path === "/city") {this.setCinemaList([])}
            this.$router.push(path)
        },
        handleArea(data){ 
            this.currentArea=data     //更改currentArea标志
            this.isAreaShow = false   //选择完毕区域后，关闭区域展示
        }
    },  
    computed:{
        //需要注册一下 (一旦分模块了，必须namespaced: true,)
        ...mapState("cinema",["cinemaList"]),  
        ...mapState("city",["cityName","cityId"]),
        
        cinemaArea(){
            let newArr = this.cinemaList.map(item=>{
                return item.districtName
            })
            return ["全城",...Array.from(new Set(newArr))]  
        },
        //过滤不同地域的影院
        filterCinemaArea(){
            if(this.currentArea === "全城") return this.cinemaList;
            return this.cinemaList.filter(item=>{
                if(item.districtName === this.currentArea){
                    return true
                }
                return false
            })
        }
    },
    //需要请求影院列表数据了
    created(){
        //需要调用Toast显示loading
        const toast = Toast({
            message: '加载中...',
            icon: 'https://t7.baidu.com/it/u=2855891343,496362186&fm=193',
            duration:0,
            overlay:true
        });

        if(this.cinemaList.length>0){
            toast.clear() //关闭弹窗
        }else{
            this.getCinemaListAction(this.cityId).then(res=>{
                toast.clear()
            })
        }
        
        
    }
}
</script>

<style lang="scss" scoped>
    .title{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        background: #fff;
        padding: 0 10px;
        z-index: 10;
        div{
            flex:1;
        }
        .center{
            text-align: center;
        }
        .right{
            text-align: right;
        }
    }
    .select{
        position: fixed;
        z-index: 10;
        top:40px;
        width:100%;
        height: 40px;
        line-height: 40px;
        background: #fff;
        display: flex;
        .active{
            color:orange;
        }
        div{
            flex:1;
            text-align: center;
        }
    }
    .cinemaList{
        position: relative;
        top: 80px;
        li{
            padding: .15rem;
            p{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    .area{
        position: fixed;
        width: 100%;
        left: 0;
        top: 80px;
        background: #fff;
        z-index: 10;
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                width:22%;
                border:1px solid #e5dcdc;
                padding: 0.06rem 0;
                text-align: center;
                margin:0.05rem;
                &.active{
                    border-color: orange;
                    color:orange;
                }
            }
        }
    }
</style>
