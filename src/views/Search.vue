<template>
    <div class="search">
        <div class="query">
            <van-search
                v-model="searchVal"
                show-action
                placeholder="请输入搜索关键词"
                @cancel="back"
            />
            <div v-show="searchVal">
                <ul v-if="searchCinemaData.length>0">
                    <li
                        v-for="data in searchCinemaData"
                        :key="data.cinemaId"
                       
                    >{{data.name}}</li>
                </ul>
                <van-empty 
                    description="暂无影院信息" 
                    
                />
            </div>
        </div>
       <van-list>
            <van-cell 
                v-for="data in getCinemaListFive" 
                :key="data.cinemaId" 
                :title="data.name" 
                :label="data.address"
                :to="'/cinema/'+data.cinemaId"
                v-show="!searchVal"

            />
        </van-list>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from "vuex"
import Vue from 'vue';
import { Search,List,Cell,Empty } from 'vant';
Vue.use(Empty);
Vue.use(Search);
Vue.use(List)
Vue.use(Cell)
export default {
    data(){
        return {
            searchVal:"",
            isShow:true
        }
    },
    methods:{
        ...mapActions("cinema",["getCinemaListAction"]),
        ...mapMutations("tabbar",["show","hide"]),
        back(){
            this.$router.back()
        }
    },
    created(){
        if(this.cinemaList.length === 0){ //vuex中没有数据
            // this.$store.dispatch("cinema/getCinemaListAction")
            this.getCinemaListAction()
        }else{

        }
        // this.$store.commit("tabbar/hide")
        this.hide()
    },
    computed:{
        ...mapState("cinema",["cinemaList"]),  //这个就是从vuex中取出状态
        ...mapGetters("cinema",["getCinemaListFive"]), //这个就是从vuex中取出getters
        searchCinemaData(){
            let searchCon = this.cinemaList.filter(
                item=>item.name.includes(this.searchVal) || item.name.toUpperCase().includes(this.searchVal.toUpperCase()) ||
                item.address.includes(this.searchVal) || item.address.toUpperCase().includes(this.searchVal.toUpperCase())
            )
            return searchCon
        }
    },
    beforeDestroy(){
        // this.$store.commit("tabbar/show")
        this.show()
    }
}
</script>

<style lang="scss" scoped>
    .distance{
        padding-left:10px;
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                height: 30px;
                background-color: hsla(0,0%,96%,.6);
                line-height: 14px;
                border-radius: 3px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                font-size: 13px;
                padding: 8px 12px;
                margin-bottom: 10px;
                margin-right:10px;
            }
        }
    }
</style>
