/**
 * 根据当前环境是开发环境还是生产环境，动态进行配置
 */
const config = {
    development: {
        appName: 'Hello Iui',
        appVersionCode: '',
        appVersionName: '',
        base_api: '',
        socket_api: '',
        themeColor: '#42b983'
    },
    production: {
        appName: 'Hello Iui',
        appVersionCode: '',
        appVersionName: '',
        base_api: '',
        socket_api: '',
        themeColor: '#42b983'
    }
}
export default config[process.env.NODE_ENV]
