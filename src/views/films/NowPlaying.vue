<template>
    <div> 
      正在热映
      <ul>
        <router-link
          tag="li"
          v-for='data in datalist'
          :key="data.filmId"
          :to="'/detail/'+data.filmId"
        >
          <img :src="data.poster" alt="">
          <div class="content">
            <h4>{{data.name}}</h4>
            <p>观众评分：<span class='grade'>{{data.grade}}</span></p>
            <!-- <p>主演：<span v-for='item in data.actors' :key='item.name'>{{item.name}}</span></p> -->
            <p>主演： {{data.actors | actorFilter}}</p>
            <p>{{data.nation}} | {{data.runtime}}分钟</p>
          </div>
        </router-link>
      </ul>
    </div>
</template>

<script>
import {instance} from "@/utils/http"
import {mapState} from "vuex"
export default {
  data(){
    return {
      datalist:[]
    }
  },
  computed:{
     ...mapState("city",["cityId"]),
  },
  created(){
   
    instance.get(`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=4358982`,{
      headers:{
       
        'X-Host':'mall.film-ticket.film.list'
      }
    }).then(res=>{
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
    })
  }
}
</script>

<style lang="scss" scoped>
  li{
    display: flex;
    padding: 10px;
    img{
      width:.66rem;
      height:.9rem;
    }
    .content{
      margin-left:14px;
    }
    h4{
      color: #191a1b;
      font-size: 16px;
    }
    .grade{
      color: #ffb232;
      font-size: 14px;
    }
  }
</style>
