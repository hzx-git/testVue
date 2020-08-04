<template>
    <div>
         <van-index-bar :index-list="indexList">
            <div
              v-for="(data,index) in dataList"
              :key="index"
            >
                <van-index-anchor :index="data.index" />
                <van-cell 
                    v-for="(item,index) in data.list" 
                    :key="index" 
                    :title="item.name"
                    @click="clickCity(item)"
                />
            </div>
        </van-index-bar>
    </div>
</template>
<script>
import Vue from 'vue';
import { IndexBar, IndexAnchor,Cell, Form } from 'vant';
import {instance} from "@/utils/http";
import {mapMutations} from "vuex";
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell)
export default {
    data(){
        return{
            dataList:[],
            indexList:[]
        }
    },
    created(){
        instance("/gateway?k=637166",{
          headers:{
              'X-Host': 'mall.film-ticket.city.list'
          }
        }).then(res=>{
            // console.log(res.data.data.cities)
            // this.dataList = res.data.data.cities
            this.filterDataList(res.data.data.cities)
        })
    },
    methods:{
      ...mapMutations("city",["setCityName","setCityId"]),

      clickCity(item){
         //更改vuex中城市共享状态
          this.setCityName(item.name)
          this.setCityId(item.cityId)
          //跳转到上一个页面
          this.$router.back()
      },
      
      filterDataList(cities){
        // console.log(cities)
        let letterArr = []
        //创建letterArr放置26个字母
        for(var i =65;i<91;i++){
          letterArr.push(String.fromCharCode(i))
        }
        //  console.log(letterArr)
        let cityArr = []
        //遍历城市，获取每个对象的‘pinyin’
        for(var i=0;i<letterArr.length;i++){
            var tempArr =  cities.filter(item=>item.pinyin.substring(0,1).toUpperCase() === letterArr[i])
            // console.log(temper)
              //判断有没有城市数据
                if(tempArr.length>0){
                    cityArr.push({
                    index:letterArr[i],
                    list:tempArr
                })
                this.indexList.push(letterArr[i])
            }
            
        }

        //设置dataList
        this.dataList = cityArr
      }
    },

}
</script>
<style lang="scss" scoped>

</style>
