import Vue from 'vue'
import App from './App.vue'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
import microApps from './micro-app'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

const container = new Vue({
  render: h => h(App)
}).$mount('#app')

const mainApp = container.$children[0]

// 定义loader方法
function loader (loading) {
  console.log('---------------', loading)
  mainApp.isLoading = loading
}

// 给子应用配置加上loader方法
const apps = microApps.map(app => {
  // console.warn('micro app:', app, app.name)
  return {
    ...app,
    loader // 总感觉不太对，在子应用的周期里关心基座的loading状态，应该loading保持在子应用使用就足够了
  }
})

// 注册各个子应用，及生命周期事件（加载前、挂载前、挂载后）
registerMicroApps(apps, {
  beforeLoad: app => {
    console.log('before load app.name====>>>>>', app.name, app, app.activeRule) // 此处app.activeRule属性没有
    console.log('app beforeLoad:' + window.__POWERED_BY_QIANKUN__) // true
  },
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      console.log('app beforeMount:' + window.__POWERED_BY_QIANKUN__) // app.name
    }
  ],
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
      console.log('app afterMount:' + window.__POWERED_BY_QIANKUN__) // app.name
    }
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      console.log('app afterUnmount:' + window.__POWERED_BY_QIANKUN__) // app.name
    }
  ]
})
// console.log('after registerMicroApps:' + window.__POWERED_BY_QIANKUN__) // undefined

// 默认启动的子应用
setDefaultMountApp('/sub-vue')
// console.log('after setDefault:' + window.__POWERED_BY_QIANKUN__) // undefined

// qiankun启动
start()
// console.log('after qiankun start:' + window.__POWERED_BY_QIANKUN__) // undefined

/*
一般来说，通过setDefaultMountApp('/sub-app')和history.pushState(null, '/sub-app','/sub-app') 即可完成子应用默认加载和切换
qiankun还可以用loadMicroApp这种手动加载子应用的方式
this.microApp = loadMicroApp(
  {
    name: 'app',
    entry: '//localhost:8081',
    container: '#yourContainer'
  }
);
*/
