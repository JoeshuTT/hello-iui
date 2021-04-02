import Vue from 'vue'
import App from './App'
import { myIui } from './components/i-ui'
Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(myIui, {
  themeColor: '#42b983',
})

const app = new Vue({
  ...App,
})
app.$mount()
