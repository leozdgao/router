// import each from 'lodash/filter'
import parseUrl from './utils/parseUrl'

let isInited = false
let routerConfig, isH5Mode

function init ({ routerConfig, history = true }) {
  if (routerConfig)
  isInited = true

  function isValidRouterConfig (config) {
    return config && typeof config === 'object'
  }
}

function start () {
  // 路由组件启动
  // - 根据配置获取当前应用内路径（根据history base / hashbang path）
  // -

  // 路由没有被初始化，return noop
  if (!isInited) return _ => { }

  return _ => {
    // dispose function
  }
}

export default {
  init, start
}
