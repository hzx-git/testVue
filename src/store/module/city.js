export default {
    namespaced: true,
    state: {
        cityName: "长沙" , //城市名字,
        cityId:"430100"   //城市ID

    },
    mutations: {
        //更改城市名字的方法
        setCityName(state, cityName) {
            state.cityName = cityName
        },
        //更改城市ID的方法
        setCityId(state, cityId){
            state.cityId = cityId
        }
    }
}