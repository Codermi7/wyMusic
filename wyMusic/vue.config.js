const webpack = require("webpack");
module.exports = {
    lintOnSave: false,
    configureWebpack: {
        //支持jquery
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
    devServer: {
        proxy: {
            '/':{
                target:'http://10.168.1.77:3000',
                changeOrigin: true,
                // pathRewrite:{'/':''}
            }
        }
    }
};