const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports={
    publicPath: process.env.NODE_ENV === 'production'? '/user_system/': '/', // 基本路径
    devServer:{
        port:8081,
    },
    pluginOptions:{
        CleanWebpackPlugin
    }
}