<template>
    <div class="detailtitle">
        <i @click="back" class="iconfont icon-back"></i>
        <span><slot></slot></span>
    </div>
</template>

<script>
export default {
    methods:{
        back(){
            // this.$router.back()
            // 需要触发绑定在自身上的自定义事件   <m-title @handleback>
            this.$emit('handleback')
        }
    }
}
</script>

<style lang="scss" scoped>
    .detailtitle{
        height: .44rem;
        line-height: .44rem;
        text-align: center;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        background: #fff;
        transition: all .5s ease;
        z-index: 10000;
        i{
            position: absolute;
            left:0px;
        }
    }
</style>
