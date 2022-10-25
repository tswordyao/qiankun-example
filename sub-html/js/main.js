const render = (options) => {
  // options是基座下发的参数，可以保存到全局的状态管理或其他地方，用于后面与基座进行通信
  
  // 可通过 options.getGlobalState() 获取基座下发的数据
  // options.setGlobalState({user: {name: ''}}) 改变全局的数据
  // options.onGlobalStateChange 监听全局数据的变化

  
  document.querySelector('#current-env').innerHTML = 'qiankun'
  
  const globalState = options?.getGlobalState? options.getGlobalState() : {}

  // 展示基座下发的状态
  const node = document.createElement('div')
  node.innerHTML = `基座下发的globalState： <code>${JSON.stringify(globalState)}</code>。<a target="_blank" href="${window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__}">打开独立运行环境</a>`

  document.querySelector('.container').appendChild(node)

  return Promise.resolve();
};

// 很诡异，这里的名字随便取，也没有export， 只要对象里有bootstrap、mount、unmount，就会被找到并调用。经过测试，如果window下多一层级就识别不到，必须把对象直接挂在window下
window['pre222html222'] = {
    bootstrap: () => {
      console.warn('pre222html222 bootstrap');
      return Promise.resolve();
    },
    mount: (options) => {
      console.log(alert('purehtml mount', options));
      return render(options);
    },
    unmount: () => {
      console.log(alert('-------purehtml unmount'));
      return Promise.resolve();
    },
    unmount2: () => {
      console.log(alert('-------purehtml unmoun2'));
      return Promise.resolve();
    },
  };
