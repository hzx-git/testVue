module.exports = {
    // publicPath: '/vue-pro',
    devServer: {
        overlay: { //eslint报错，前端取消遮罩层
          warnings: false,
          errors: false
        },

        proxy:{
          "/info":{
            target:"http://47.96.0.211:3000",
            changeOrigin:true,
            pathRewrite:{
              "^/info":""
            }
          }
        }
    },
    
    
    lintOnSave:false, //直接关闭eslint检查
    configureWebpack: {
      resolve: {
          alias: {
            'assets': '@/assets',
            'com': '@/components',  
            'views': '@/views',
          }
      }
    }
}