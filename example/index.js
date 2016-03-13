import { Router } from '../src'
import './style.scss'

function handle404 () {
  console.log('404')
}
function renderIndex () {
  console.log('index')
}
function renderArticle ({ id }) {
  console.log('article ' + id)
}

// 扁平配置（组件嵌套式的路由配置可以最终转化为扁平配置？）
const routerConfig = {
  '/': renderIndex,
  '/article/:id': renderArticle,
  '*': handle404
}

Router.init({
  routerConfig,
  useH5Mode: false
}).start()
