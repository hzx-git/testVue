<template>
    <div class="center">
        我的
    </div>
</template>

<script>
import {instance2} from "@/utils/http"
export default {
    //进入组件之前
    beforeRouteEnter(to,from,next){
        instance2({
            method:"post",
            url:"/api/user/isloginin",
        }).then(res=>{
            next()
        }).catch(err=>{
            //说明token已经失效了
            next("/login")
        })
    }
}
</script>

<style>

</style>
