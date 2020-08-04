<template>
    <div>
        <m-title></m-title>
        影院详情！jdkasjdk
        <p>{{dataList.name}}</p>
        <div class="tab-cine">
            <ul>
                <li
                    v-for="data in dataList.services"
                    :key= "data.name"
                >
                    {{data.name}}
                </li>
            </ul>
        </div>
        
        
    </div>
</template>

<script>
import {instance} from "@/utils/http"
import {mapState} from "vuex"
export default {
    data(){
        return{
            dataList:[]
        }
    },
    created(){
        instance.get("/gateway/?cinemaId="+this.$route.params.id+"&k=7580118",{
            headers:{
                'X-Host': 'mall.film-ticket.cinema.info'
            }
        }).then(res=>{
            console.log(res.data.data.cinema)
            this.dataList = res.data.data.cinema
        })

        instance.get("/gateway/?cinemaId="+this.$route.params.id+"&k=9940068",{
            headers:{
                'X-Host': 'mall.film-ticket.film.cinema-show-film'
            }
        }).then(res=>{
            // console.log(res)
        })

        this.$store.commit("tabbar/hide")
    },
    computed:{
        // ...mapState("city",[cityId])
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    p{
        position: relative;
        text-align: center;
        font-size: 17px;
        color: #191a1b;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        padding: 0 15px;
        background: #fff;
        top: 30px;
        height: 44px;
        line-height: 44px;
        z-index: 302;
    }
    .tab-cine{
        position: absolute;
        top: 94px;
        left: 87px;
    }
</style>
