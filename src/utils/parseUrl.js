/**
 * url 解析模块
 * @param  {String} url 需要被解析的 url 字符串
 * @return {Object}     解析出来的 url 对象，类似于 node.js 中 url.parse 的结果
 */
export default function parseUrl (url) {
  let protocol, host, hostname, port, query = {}, search,
      hash, pathname, hashbangPath, isInnerLink

  // 以 '//' 开头，认为是继承 scheme 的链接，仅在client端
  if (/^\/\//.test(url)) url = location.protocol + url

  // 判断是否为完整url
  const regex = /^(\w+:)\/\/([^/]+)(.*)/
  const m = regex.exec(url)
  isInnerLink = !Boolean(m)

  if (!isInnerLink) {
    protocol = m[1]
    host = m[2]
    pathname = m[3]
    ;([ hostname, port ] = host.split(':'))
    port = Number(port)
  }
  else { // 认为是域内跳转
    ;({ protocol, host, hostname, port } = location)
    pathname = url
  }

  // 率先分离 hash，顺便分析是否是 hashbang 链接
  ;([ pathname, hash ] = pathname.split('#'))
  if (hash) {
    if (/\!\//.test(hash)) {
      hashbangPath = hash.slice(1)
    }
    else hashbangPath = ''
  }
  else hash = ''

  // 接下来是 search 和 query
  ;([ pathname, search ] = pathname.split('?'))
  if (search) {
    // search 本身不做 decode
    search.replace(/[&]?(.+?)=([^&]+)/g, (_, k, v) => {
      // 除了做 decode，不做其他处理
      query[k] = decodeURIComponent(v)
    })
  }
  else search = ''

  return {
    protocol, host, hostname, port, pathname, query, search,
    hash, hashbangPath, isInnerLink
  }
}
