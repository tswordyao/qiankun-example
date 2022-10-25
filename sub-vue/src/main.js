import './public-path'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import { store as commonStore } from 'common'
import store from './store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
let instance = null

function render (props = {}) {
  const { container, routerBase } = props
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 如果是子应用独立运行的环境
if (!window.__POWERED_BY_QIANKUN__) {
  // 独立运行时，也注册一个名为global的store module，看起来是为了统一state的调用
  commonStore.globalRegister(store) // 把自己用vuex生成的store给到commonStore

  // 或许也可以在这里appStore = inQiankun? globalStore : appStore?  // todo 状态管理是一个点

  // 模拟登录，存储用户信息到global module
  const userInfo = { name: '我是独立运行时名字叫张三' } // 假设登录后取到的用户信息
  store.commit('global/setGlobalState', { user: userInfo })

  render()
}

// 子应用接入核心：导出bootstrap、mount、unmount三大方法给qiankun调用
export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  alert('--------vue sub app mount!!!')
  console.log('[vue] props from main framework', props)

  commonStore.globalRegister(store, props)

  render(props)
}

export async function unmount () {
  alert('------------------vue sub app unmount!!!')
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
