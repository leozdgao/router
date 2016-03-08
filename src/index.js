class Router {
  constructor () {

  }
}

// 两种模式：
// - hashbang
// - history

/**
 * 基于base获取当前的path，用于匹配路由配置
 * @param  {String} base 应用于path的base
 * @param  {String} url  完整路径
 * @return {String}      返回一个相对于base的路径
 */
function getCurrentPath (base, url) {

}

// 处理 a 标签的策略（认为是应用外链接）
// - 完整路径
// - target值非空时

/**
 * 判断链接是否为应用内链接
 * @param  {String} base 应用于path的base
 * @param  {String} link 链接
 * @return {Boolean}     判断结果
 */
function isInAppLink (base, link) {

}
