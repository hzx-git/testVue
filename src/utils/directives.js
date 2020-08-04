import Vue from "vue"
Vue.directive("title",{
    //插入到dom的时候就会执行
    inserted(el,binding){
        el.style.opacity = 0
        window.onscroll = function(){
            let stop = document.body.scrollTop || document.documentElement.scrollTop;
            if(stop> (binding.value || 40)){
                el.style.opacity = 1
            }else{
                el.style.opacity = 0
            }
        }
    },
    unbind(){
        window.onscroll = null 
    }
})