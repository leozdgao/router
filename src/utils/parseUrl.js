export default function parseUrl (url) {
  var protocol, host, hostname, port, query,
      hash, path, pathname, hashbangPath

  // 以 '//' 开头，认为是继承 scheme 的链接，仅在client端
  if (/^\/\//.test(url)) url = location.protocol + url

  // 判断是否为完整url
  var regex = /^(\w+:)\/\/([^/]+)(.*)/
  var m = regex.exec(url)
  if (m) {
    protocol = m[1]
    host = m[2]
    pathname = m[3]
    ;([ hostname, port ] = host.split(':'))
    port = Number(port)
  }
  else { // 认为是域内跳转
    ;({ protocol, host, hostname, pathname, port } = location.protocol)
  }

  return {
    protocol, host, hostname, port, query, hash, path, pathname,
    hashbangPath
  }
}
