import { ClientHistory, createHashbangHistory } from '../histories'
import routeParser from './routeParser'
import { isObject } from '../utils/typeof'
import { isBrowser, canUseH5HistoryAPI } from '../utils/env'

// Router 具备的属性
const RouterProps = {
  isInited: false, // 表示 Router 是否已经初始化过
  routerMap: { }, // 路由配置
  isH5Mode: false, // 是否使用 H5 History Api 还是 hashbang 模式
  history: null // 负责管理 history 堆栈的对象
}

// 单例 Router 对象
const Router = {
  init, start,
  match: _ => { },
  props: RouterProps
}

function init ({ routerConfig, useH5Mode = true, base = '/' }) {
  if (!isObject(routerConfig)) return this

  RouterProps.isInited = true
  RouterProps.routerMap = routerConfig
  RouterProps.isH5Mode = canUseH5HistoryAPI() && !!useH5Mode
  RouterProps.history = RouterProps.isH5Mode ?
    ClientHistory.create(base) :
    createHashbangHistory(base)
  Router.match = match(routerConfig)

  return this
}

function match (routerConfig) {
  return path => { // 这个 path 应该是通过 history 对象分析过后的 path
    for (let mount in routerConfig) {
      if (!routerConfig.hasOwnProperty(mount)) continue
      const params = routeParser(path, mount)
      // 成功匹配
      if (params) {
        RouterProps.history.go(path)
        routerConfig[mount].call(null, params)
      }
    }
  }
}

/**
 * 路由组件启动
 * @return {Function} 一个用于终止路由组件的函数
 */
function start () {
  // 路由组件启动
  // - 根据配置获取当前应用内路径（根据history base / hashbang path）
  // -
  if (!isBrowser()) {
    console.warn('This method should be only called in the browser environment')
    return _ => { }
  }

  // 路由没有被初始化，return noop
  if (!RouterProps.isInited) {
    console.warn('Router haven\'t been inited yet, and it will not start.')
    return _ => { }
  }

  RouterProps.history.init() // 初始化当前路径，比如加上 /#!/

  const clickEvent = 'ontouchstart' in document ? 'touchstart' : 'click'
  // 全局处理 a 标签的点击事件
  document.addEventListener('click', globalAnchorHandler)

  const currentPath = RouterProps.history.getPathFromBase(location.href)
  // 试着匹配当前路径
  Router.match(currentPath)

  // dispose function
  return _ => {
    RouterProps.history.dispose()
    document.removeEventListener('click', globalAnchorHandler)
  }
}

/**
 * 全局 a 标签点击事件处理函数
 * @param  {Object} e 点击事件对象
 */
function globalAnchorHandler (e) {
  // 处理 a 标签的策略（认为是应用外链接）
  // - 完整路径
  // - target值非空时
  const el = e.target
  if (
    el.href === location.href ||
    e.defaultPrevented || // 默认点击事件处理已经被阻止
    el.nodeName !== 'A' || // 被点击的不是 a 标签
    el.hasAttribute('download') || // a 标签表明是下载
    !el.hasAttribute('href') || // 没有 href 属性
    el.hasAttribute('target') && el.target != '_self' || // 在另一个标签页打开
    el.host !== location.host || // 外链
    !RouterProps.history.isInAppLink(el.href) // 不在 base 范围内
  ) return

  const to = RouterProps.history.getPathFromBase(el.href)
  Router.match(to)

  e.preventDefault()
}

export default Router
