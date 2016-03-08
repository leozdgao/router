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

    hash = '#' + hash
  }
  else hash = ''

  // 接下来是 search 和 query
  ;([ pathname, search ] = pathname.split('?'))
  if (search) {
    search.replace(/[&]?(.+?)=([^&]+)/g, (_, k, v) => {
      // 除了做 decode，不做其他处理
      query[k] = decodeURIComponent(v)
    })
    search = '?' + search // 这边不做 decode
  }
  else search = ''

  return {
    protocol, host, hostname, port, pathname, query, search,
    hash, hashbangPath, isInnerLink
  }
}
