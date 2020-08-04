import axios from "axios"

const instance = axios.create({
    baseURL: 'https://m.maizuo.com',
    headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15894678874376571676907","bc":"310100"}'
    }
});


//axios中的拦截器有两个： 请求之前的拦截 | 响应之后的拦截

const instance2 = axios.create({
    baseURL:"/info"
})

//需要在接口发送请求到达后端之前进行一个拦截操作
//每次请求数据的时候都会在header上面携带 X-Access-Token 发送给后端了
instance2.interceptors.request.use(config=>{
    if(localStorage.getItem("token")){
        config.headers["X-Access-Token"]  = localStorage.getItem("token")
    }
    return config
})



//获取后端给我们的数据之前做一个响应后的拦截操作
instance2.interceptors.response.use(res=>{
    if(res.data.flag){
        return res.data.data
    }else{
        return Promise.reject("出错了...")
    }
})




export  {instance,instance2}

