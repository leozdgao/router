import parseUrl from '../utils/parseUrl'

function createHashbangHistory (base, getUrl = (_ => location.href)) {
  let currentUrlObj
  if (base[0] === '/') base = base.slice(1)
  base = '#!/' + base
  return {
    base,
    init () {
      currentUrlObj = parseUrl(getUrl())
      // 查看当前路径是否满足 hashbang 的格式
      // location.href = location.href + '/#!/'
      if (!currentUrlObj.hashbangPath) {
        location.href = location.href + '#!/'
        currentUrlObj = parseUrl(getUrl())
      }

      setTimeout(_ => {
        window.addEventListener('hashchange', go)
      })
    },
    isInAppLink (path) {
      const urlObj = parseUrl(path)
      if (urlObj.host !== currentUrlObj.host ||
        urlObj.pathname !== currentUrlObj.pathname ||
        !urlObj.hashbangPath) return false

      return RegExp('^' + base).test('#!' + urlObj.hashbangPath)
    },
    getPathFromBase (path) {
      const i = path.indexOf(base)
      if (i < 0) return '' // 判断为非应用内跳转

      return '/' + path.slice(i + base.length)
    },
    go (to) {
      if (to[0] === '/') to = to.slice(1)
      location.hash = '!/' + to
    },
    dispose () {
      window.removeEventListener('hashchange', go)
    }
  }
}

function go (e) {
  // console.log('hashchange')
}

export default createHashbangHistory
