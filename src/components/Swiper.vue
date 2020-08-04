<template>
    <div :class='cName' class="swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
export default {
    props:["cName"]
}
</script>

<style>

</style>
