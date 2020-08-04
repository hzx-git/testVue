<template>
    <div class="login">
        <form @submit.prevent="login">
            <p><van-field ref="username" v-model="username" label="用户：" placeholder="请输入用户名" /></p>
            <p><van-field ref="password" v-model="password" label="密码：" placeholder="请输入密码" /></p>
            <van-button style='width:100%;' type="primary">登录</van-button>
        </form>

        <!--dialog的调用方式二-->
        <!-- <van-dialog v-model="show" title="标题" show-cancel-button>
            <img width='100%' src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        </van-dialog> -->
    </div>
</template>

<script>
import {instance2} from "@/utils/http"
import Vue from 'vue';
import { Button,Field,Dialog  } from 'vant';
Vue.use(Button);
Vue.use(Field)
Vue.use(Dialog);
export default {
    data(){
        return {
            username:"",
            password:"",
            show: true,
        }
    },
    methods:{
        login(){
            if(!this.username.trim() || !this.password.trim()){
                //dialog的调用方式一：函数调用
                // Dialog({ message: "请输入用户名或者密码！" });
                Dialog.alert({
                    title:"警告！",
                    message:"请输入用户名或者密码！",
                    confirmButtonText:"对了嘛"
                }).then(()=>{
                    console.log("弹出框关闭了哦...")
                })
                return false 
            }
            //请求接口 http://47.96.0.211:3000/api/user/loginin  post请求 需要携带username,password
            instance2.post("/api/user/loginin",{  //  /info/api/user/loginin ==> post
                username:this.username,
                password:this.password
            }).then(res=>{
                //前端携带用户名与密码请求后端，后端产生token令牌给前端返回
                localStorage.setItem("token",res.token)
                //需要跳转到center里面去
                this.$router.push("/center")
            }).catch(err=>{
                // console.log("err===>",err)
                Dialog.confirm({
                    title: '标题',
                    message: err,
                })
                .then(() => {
                    // on confirm
                    console.log("点击了确定按钮")
                })
                .catch(() => {
                    // on cancel
                    console.log("点击了取消按钮")
                })
                .finally(()=>{
                    // console.log("总会执行...",this)
                    this.$refs.username.value = ""
                    this.$refs.password.value = ""
                    this.$refs.username.focus()
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    form{
        background: #cccccc;
        position: fixed;
        width: 100%;
        top: 30%;
        padding: 12px;
        p{
            margin-bottom:10px;
        }
    }

</style>
