<template>
  <div id="app">
    <transition name='app' mode="out-in">
      <router-view></router-view>
    </transition>
  
    <Tabbar v-show="isTabbarShow"></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar"
import {mapState} from "vuex"
export default {
  computed:mapState("tabbar",["isTabbarShow"]),
  components:{
    Tabbar
  }
}
</script>

<style lang="scss">
  .app-enter-active{
    animation: move .6s;
  }
  .app-leave-active{
    animation: move .6s reverse;
  }
  @keyframes move{
    0%{
      transform: translateY(40px);
      opacity: 0;
    }
    100%{
      transform: translateY(0px);
      opacity: 1;
    }
  }
</style>
