import Vue from 'vue'
import App from './App'
import store from './store'

import '@/scss/index.scss'
import '@/utils/registerBaseStyle.js'
import '@/utils/filters.js'

import jump from '@/utils/globalJump'
Vue.prototype.$jump = jump
Vue.prototype.$toast = (title, cb) => {
  if (!title) throw new Error('title不能为空');
  return uni.showToast({
    title,
    icon: 'none',
    success: () => {
      cb && 'function' === typeof cb && cb();
    }
  })
}

import uView from 'uview-ui'
Vue.use(uView)
uni.$u.config.unit = 'rpx'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
