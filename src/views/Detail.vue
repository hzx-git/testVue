<template>
    <div class="detail" v-if="filmInfo">
        <!-- <div class="detailtitle" v-title='100'>
            <i class="iconfont icon-back"></i>
            <span>阿凡达2</span>
        </div> -->

        <!--调用全局组件 m-title-->
        <m-title @handleback='back' v-title>
            {{filmInfo.name}}
        </m-title>

        <img :src="filmInfo.poster" width='100%' alt="">
        <div class="filmInfo-con">
            <h4>{{filmInfo.name}} <span>{{filmInfo.filmType.name}}</span></h4>
            <p>{{filmInfo.category}}</p>
            <p>{{filmInfo.premiereAt | filterDate}}上映</p>
            <p>{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</p>
            <p class='grade'>{{filmInfo.grade}}</p>
            <p class="synopsis" :class="{hidden:flag}">{{filmInfo.synopsis}}</p>
            <i @click='flag=!flag' class="iconfont" :class="flag?'icon-moreunfold':'icon-less'"></i>
            <h4>演职人员</h4>
            <SwiperCom cName='actors-banner'>
                <div 
                    class="swiper-slide"
                    v-for="(data) in filmInfo.actors"
                    :key='data.name'
                >
                    <img class="actor-img" :src="data.avatarAddress" alt="">
                </div>
            </SwiperCom>
            <h4 @click="isShow=true">剧照</h4>
            <SwiperCom cName='photos-banner'>
                <div 
                    class="swiper-slide"
                    v-for="(data,index) in filmInfo.photos"
                    :key='index'
                    @click="preview(index)"
                >
                    <img class="photo-img" :src="data" alt="">
                </div>
            </SwiperCom>
        </div> 
        <!--显示剧照-->
        <Photos @change="preview" v-show="isShow" :photos="filmInfo.photos">
            <m-title @handleback='cancel'>剧照 （{{filmInfo.photos.length}}）</m-title>
        </Photos>
    </div>
    <img v-else width='100%' src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1777865821,2489327269&fm=26&gp=0.jpg" alt="">
</template>

<script>
import {instance} from "@/utils/http"
import Swiper from "swiper"
import SwiperCom from "@/components/Swiper"
import Photos from "./detail/Photos"
import { ImagePreview } from 'vant';
export default {
    methods:{
        preview(index){
           ImagePreview({
                images: this.filmInfo.photos,
                startPosition: index,
                closeable: true,
                closeIconPosition:"top-left"
           })
        },
        back(){
            this.$router.back()
        },
        cancel(){
            this.isShow = false
        }
    },
    components:{
        SwiperCom,
        Photos
    },
    data(){
        return {
            filmInfo:null,
            flag:true,
            isShow:false //控制剧照是否出现
        }
    },
    created(){
        instance(`/gateway?filmId=${this.$route.params.id}&k=3449323`,{
            headers:{
                'X-Host': 'mall.film-ticket.film.info'
            }
        }).then(res=>{
            this.filmInfo = res.data.data.film
            //实例化演员轮播图
            this.$nextTick(()=>{
                new Swiper(".actors-banner",{
                    slidesPerView: 4, //显示几张图片
                    spaceBetween: 10, //图片的间隙
                })
            })
            //实例化剧照轮播图
            this.$nextTick(()=>{
                new Swiper(".photos-banner",{
                    slidesPerView: 2.3, //显示几张图片
                    spaceBetween: 10,
                })
            })
        })
    }
}
</script>

<style lang="scss" scoped>
    .detail{
        padding-bottom: 60px;
    }
    // .detailtitle{
    //     height: .44rem;
    //     line-height: .44rem;
    //     text-align: center;
    //     position: fixed;
    //     width: 100%;
    //     top: 0;
    //     left: 0;
    //     background: #fff;
    //     transition: all .5s ease;
    //     i{
    //         position: absolute;
    //         left:0px;
    //     }
    // }
    .filmInfo-con{
        padding: .12rem .15rem .15rem;
        position: relative;
        .actor-img,.photo-img{
            width:100%;
        }
        h4{
            color: #191a1b;
            font-size: 18px;
            height: 24px;
            line-height: 24px;
            margin-right: 7px;
            span{
                font-size: 9px;
                color: #fff;
                background-color: #d2d6dc;
                height: 14px;
                line-height: 14px;
                padding: 0 2px;
                border-radius: 2px;
                display: inline-block;
            }
        }
        .grade{
            position: absolute;
            top:22px;
            right:17px;
            font-size: 18px;
            font-style: italic;
            color: #ffb232;
        }
        .synopsis{
            height:211px;
            overflow:hidden;
            transition: all .5s ease; //只要这个p标签的高度改变了，就会触发transition
        }
        i{
            position: absolute;
            left:50%;
            transform: translateX(-50%);
        }
        .hidden{
            height:38px!important;
            background:pink;
        }
    }
</style>
