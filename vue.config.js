'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        port: 2020, // 端口
        disableHostCheck: true, // 跳过host检查
        proxy: {
            '/shop_api': {
                target: 'http://192.168.1.34',
                changeOrigin: true, // target是域名的话，需要这个参数，
                secure: false, // 设置支持https协议的代理
                pathRewrite: { '^/shop_api': '' }
            }
        }
    }
}
