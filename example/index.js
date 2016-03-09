const Router = require('../src')
require('./style.scss')

function handle404 () {

}
function renderIndex () {

}
function renderArticle ({ id }) {

}

// 扁平配置（组件嵌套式的路由配置可以最终转化为扁平配置？）
const routerConfig = {
  '/': renderIndex,
  '/article/:id': renderArticle,
  '*': handle404
}

const router = Router.init({
  routers: routerConfig,
  history: true // default
})
router.start()
